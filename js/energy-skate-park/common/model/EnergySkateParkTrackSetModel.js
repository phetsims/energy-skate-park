// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model in Energy Skate park with a premade set of tracks. Does not include any configurable or movable tracks.
 * @author Jesse Greenberg
 */

import Property from '../../../../../axon/js/Property.js';
import PropertyIO from '../../../../../axon/js/PropertyIO.js';
import merge from '../../../../../phet-core/js/merge.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import PremadeTracks from './PremadeTracks.js';

// phetio types

class EnergySkateParkTrackSetModel extends EnergySkateParkModel {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {

      // if true, tracks created from PremadeTracks that are configurable will have limiting bounds for dragging
      // control points
      limitPointBounds: false
    }, options );

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
   */
  updateActiveTrack( scene ) {
    for ( let i = 0; i < this.tracks.length; i++ ) {
      const track = this.tracks.get( i );
      track.physicalProperty.value = ( i === scene );

      // Reset the skater when the track is changed, see #179
      this.skater.returnToInitialPosition();

      // make sure that the entire track is above ground - points should be, but this makes sure that the
      // entire curve is fully above ground
      if ( this.availableModelBoundsProperty.get().hasNonzeroArea() ) {
        this.tracks.get( i ).bumpAboveGround();
      }
    }

    // The skater should detach from track when the scene changes.  Code elsewhere also resets the position of the skater.
    this.skater.trackProperty.value = null;
  }

  /**
   * Add all tracks in the set. In addition to adding all to the ObservbleArray, this will initialize which track
   * should be visible, physical, and interactive depending on the model sceneProperty.
   * @public
   *
   * @param {Array.<Track>} tracks
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

    const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( model.controlPointGroupTandem, {
      limitPointBounds: model.limitPointBounds
    } );
    const parabolaTrack = PremadeTracks.createTrack( model, model.tracks, parabolaControlPoints, model.availableModelBoundsProperty, {
      configurable: model.tracksConfigurable,
      tandem: tandem.createTandem( 'parabolaTrack' ),
      phetioState: false
    } );

    const slopeControlPoints = PremadeTracks.createSlopeControlPoints( model.controlPointGroupTandem, {
      limitPointBounds: model.limitPointBounds
    } );
    const slopeTrack = PremadeTracks.createTrack( model, model.tracks, slopeControlPoints, model.availableModelBoundsProperty, {
      configurable: model.tracksConfigurable,
      tandem: tandem.createTandem( 'slopeTrack' ),
      phetioState: false
    } );

    // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
    // see #164
    slopeTrack.slopeToGround = true;

    const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( model.controlPointGroupTandem, {
      limitPointBounds: model.limitPointBounds
    } );
    const doubleWellTrack = PremadeTracks.createTrack( model, model.tracks, doubleWellControlPoints, model.availableModelBoundsProperty, {
      configurable: model.tracksConfigurable,
      tandem: tandem.createTandem( 'doubleWellTrack' ),
      phetioState: false
    } );

    return [ parabolaTrack, slopeTrack, doubleWellTrack ];
  }

  /**
   * The "full" track set has all of the premade tracks - a parabola, slope, double well, and loop.
   *
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @returns {Array.<Track>}
   */
  static createFullTrackSet( model, tandem ) {

    // the "full" track set has all of the premade tracks - a parabola,  slope, double well, and loop.
    const trackSet = EnergySkateParkTrackSetModel.createBasicTrackSet( model, tandem );

    const loopControlPoints = PremadeTracks.createLoopControlPoints( model.controlPointGroupTandem, {
      limitPointBounds: model.limitPointBounds
    } );
    const loopTrack = PremadeTracks.createTrack( model, model.tracks, loopControlPoints, model.availableModelBoundsProperty, {
      configurable: model.tracksConfigurable,
      draggable: model.tracksDraggable,
      tandem: tandem.createTandem( 'loopTrack' )
    } );
    trackSet.push( loopTrack );

    return trackSet;
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );
export default EnergySkateParkTrackSetModel;