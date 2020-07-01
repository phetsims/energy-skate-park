// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the "Measure" screen of this sim. The measure screen allows the user to inspect physical values
 * of the skater through time.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkTrackSetModel from '../../common/model/EnergySkateParkTrackSetModel.js';

class MeasureModel extends EnergySkateParkTrackSetModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    super( tandem, {
      tracksConfigurable: true
    } );

    const trackSet = EnergySkateParkTrackSetModel.createFullTrackSet( this, tandem );

    // NOTE: It would have been nice to pass the tracks to EnergySkateParkTrackSetModel, but tracks require knowledge
    // of the model they are being added to so this isn't possible.
    this.addTrackSet( trackSet );

    // @public - the position of the sensor, in model coordinates (meters)
    this.sensorProbePositionProperty = new Vector2Property( new Vector2( -4, 1.5 ) );

    // @public - the position of the sensor body in model coordinates, set later because it will be relative to other
    // panels in the view, and this similarly should not be reset on reset(). This is meant to be the origin of the
    // body (top left)
    this.sensorBodyPositionProperty = new Vector2Property( new Vector2( 0, 0 ) );

    // the speed value is visible on the speedometer for the MeasureModel
    this.speedValueVisibleProperty.set( true );

    // when the reference height changes, update energies for all skater samples
    this.skater.referenceHeightProperty.link( referenceHeight => {
      for ( let i = 0; i < this.dataSamples.length; i++ ) {
        this.dataSamples.get( i ).setNewReferenceHeight( referenceHeight );
      }
    } );

    // Don't save any EnergySkateParkDataSamples while control points are being dragged. This can be done during construction
    // because MeasureModel tracks are static and no new tracks are introduced. For the same reason disposal
    // of these listeners is not necessary.
    this.tracks.forEach( track => {
      track.controlPointDraggingProperty.link( anyPointDragging => {
        this.preventSampleSave = anyPointDragging;
      } );
    } );

    // attach listeners that clear skater path when Properties like direction and dragging change
    this.attachPathRemovalListeners();
  }

  /**
   * @public
   */
  reset() {
    super.reset();

    this.sensorProbePositionProperty.reset();
  }
}

energySkatePark.register( 'MeasureModel', MeasureModel );
export default MeasureModel;