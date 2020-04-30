// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model in Energy Skate park with a premade set of tracks. Does not include any configurable or movable tracks.
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import PropertyIO from '../../../../../axon/js/PropertyIO.js';
import merge from '../../../../../phet-core/js/merge.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import PremadeTracks from './PremadeTracks.js';

class EnergySkateParkTrackSetModel extends EnergySkateParkModel {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    super( tandem.createTandem( 'trackSetModel' ), options );

    // @public {number} - Indicates the currently selected scene. There can be any number of scenes, do we need
    // to pass this in as a param
    this.sceneProperty = new Property( 0, {
      tandem: tandem.createTandem( 'sceneProperty' ),
      validValues: [ 0, 1, 2, 3 ],
      phetioType: PropertyIO( NumberIO )
    } );

    // When the scene changes, also change the tracks.
    this.sceneProperty.link( this.updateActiveTrack.bind( this ) );
  }

  /**
   * When the scene changes or tracks are added to the track set, update which track is visible and physically
   * interactive.
   * @private
   *
   * @param {number} sceneIndex - index identifying the scene
   */
  updateActiveTrack( sceneIndex ) {
    for ( let i = 0; i < this.tracks.length; i++ ) {
      const track = this.tracks.get( i );
      track.physicalProperty.value = ( i === sceneIndex );

      // Reset the skater when the track is changed, see #179
      this.skater.returnToInitialPosition();

      // make sure that the entire track is above ground - points should be, but this makes sure that the
      // entire curve is fully above ground
      if ( track.physicalProperty.get() ) {

        // wait to bump until the model bounds are defined, which doesn't happen until the first view layout since
        // available model bounds are determined by the size of the screen for this sim
        const bumpListener = bounds => {
          if ( bounds.hasNonzeroArea() ) {
            this.tracks.get( i ).bumpAboveGround();
            this.availableModelBoundsProperty.unlink( bumpListener );
          }
        };
        this.availableModelBoundsProperty.link( bumpListener );
      }
    }

    // The skater should detach from track when the scene changes.  Code elsewhere also resets the position of the skater.
    this.skater.trackProperty.value = null;
  }

  /**
   * Add all tracks in the set. In addition to adding all to the ObservableArray, this will initialize which track
   * should be visible, physical, and interactive depending on the model sceneProperty.
   * @public
   *
   * @param {Track[]} tracks
   */
  addTrackSet( tracks ) {
    this.tracks.addAll( tracks );
    this.updateActiveTrack( this.sceneProperty.get() );
  }

  /**
   * Reset all of the tracks in this model's track set, if they are configurable. Otherwise, identical to
   * super function.
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.tracks.forEach( track => {
      if ( track.configurable ) {
        track.reset();
      }
    } );

    this.sceneProperty.reset();

    this.updateActiveTrack( this.sceneProperty.get() );
  }

  /**
   *
   * @private
   *
   * @param {EnergySkateParkTrackSetModel} model
   * @param {ControlPoint[]}controlPoints
   * @param {Object} [options]
   * @returns {Track}
   */
  static createPremadeTrack( model, controlPoints, options ) {
    options = merge( {
      configurable: model.tracksConfigurable,
      phetioState: false
    }, options );

    return PremadeTracks.createTrack( model, controlPoints, options );
  }

  /**
   * The "basic" track set includes the parabola, slope, and double well.
   * @public
   *
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   * @returns {Array.<Track>}
   */
  static createBasicTrackSet( model, tandem ) {
    assert && assert( model instanceof EnergySkateParkTrackSetModel, 'PremadeTracks should be used with an EnergySkateParkTrackSetModel' );
    assert && assert( model.tracksDraggable === false, 'tracks should not be draggable in EnergySkateParkTrackSetModels' );

    const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( model.controlPointGroupTandem );
    const parabolaTrack = EnergySkateParkTrackSetModel.createPremadeTrack( model, parabolaControlPoints, {
      tandem: tandem.createTandem( 'parabolaTrack' )
    } );

    const slopeControlPoints = PremadeTracks.createSlopeControlPoints( model.controlPointGroupTandem );
    const slopeTrack = EnergySkateParkTrackSetModel.createPremadeTrack( model, slopeControlPoints, {

      // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
      // see #164
      slopeToGround: true,
      tandem: tandem.createTandem( 'slopeTrack' )
    } );

    const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( model.controlPointGroupTandem );
    const doubleWellTrack = EnergySkateParkTrackSetModel.createPremadeTrack( model, doubleWellControlPoints, {
      tandem: tandem.createTandem( 'doubleWellTrack' )
    } );

    return [ parabolaTrack, slopeTrack, doubleWellTrack ];
  }

  /**
   * The "full" track set has all of the premade tracks - a parabola, slope, double well, and loop.
   *
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @returns {Array.<Track>}
   * @public
   */
  static createFullTrackSet( model, tandem ) {

    // the "full" track set has all of the premade tracks - a parabola,  slope, double well, and loop.
    const trackSet = EnergySkateParkTrackSetModel.createBasicTrackSet( model, tandem );

    const loopControlPoints = PremadeTracks.createLoopControlPoints( model.controlPointGroupTandem );
    const loopTrack = EnergySkateParkTrackSetModel.createPremadeTrack( model, loopControlPoints, {
      draggable: model.tracksDraggable,
      tandem: tandem.createTandem( 'loopTrack' )
    } );
    trackSet.push( loopTrack );

    return trackSet;
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );
export default EnergySkateParkTrackSetModel;