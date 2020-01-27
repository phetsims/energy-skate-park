// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the "Measure" screen of this sim. The measure screen allows the user to inspect physical values
 * of the skater through time.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkSaveSampleModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkSaveSampleModel' );
  const EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  const Property = require( 'AXON/Property' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  class MeasureModel extends EnergySkateParkSaveSampleModel {

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
        for ( let i = 0; i < this.skaterSamples.length; i++ ) {
          this.skaterSamples.get( i ).setNewReferenceHeight( referenceHeight );
        }
      } );

      // existing data fades away before removal when the skater direction changes
      this.skater.directionProperty.link( direction => {
        this.initiateSampleRemoval();
      } );

      // Don't save any SkaterSamples while control points are being dragged. This can be done during construction
      // because MeasureModel tracks are static and no new tracks are introduced. For the same reason disposal
      // of these listeners is not necessary.
      this.tracks.forEach( track => {
        track.controlPointDraggingProperty.link( anyPointDragging => {
          this.preventSampleSave = anyPointDragging;
        } );
      } );

      // existing data is removed immediately when any of these Properties change
      const clearSampleProperties = [ this.saveSkaterSamplesProperty, this.skater.draggingProperty, this.sceneProperty ];
      const boundClearSamples = this.clearEnergyData.bind( this );

      Property.multilink( clearSampleProperties, boundClearSamples );
      this.skater.returnedEmitter.addListener( boundClearSamples );
      this.trackChangedEmitter.addListener( boundClearSamples );
    }

    /**
     * @public
     */
    reset() {
      super.reset();

      this.sensorProbePositionProperty.reset();
    }
  }

  return energySkatePark.register( 'MeasureModel', MeasureModel );
} );
