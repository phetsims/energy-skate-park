// Copyright 2018-2025, University of Colorado Boulder

/**
 * A model in Energy Skate park with a premade set of tracks. Does not include any configurable or movable tracks.
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import ControlPoint from './ControlPoint.js';
import EnergySkateParkPreferencesModel from './EnergySkateParkPreferencesModel.js';
import EnergySkateParkSaveSampleModel from './EnergySkateParkSaveSampleModel.js';
import PremadeTracks from './PremadeTracks.js';
import Track from './Track.js';

class EnergySkateParkTrackSetModel extends EnergySkateParkSaveSampleModel {

  // Indicates the currently selected scene. There can be any number of scenes, do we need to pass this in as a param
  public readonly sceneProperty: NumberProperty;
  public readonly trackTypes: IntentionalAny[];

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem, options: IntentionalAny ) {
    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {PremadeTracks.TrackType[]} - list of the premade tracks used in this model. Currently,
      // the default list includes all of the possible premade tracks. Remove items from
      // this list to remove premade tracks from the model. This order will also be the
      // order of track selection buttons in the view.
      trackTypes: [
        // @ts-expect-error
        PremadeTracks.TrackType.PARABOLA,
        // @ts-expect-error
        PremadeTracks.TrackType.SLOPE,
        // @ts-expect-error
        PremadeTracks.TrackType.DOUBLE_WELL,
        // @ts-expect-error
        PremadeTracks.TrackType.LOOP
      ],

      // {Object} Options passed to initializePremadeTracks, with options for control points and tracks for each of
      // the provided TrackType listed above. See initializePremadeTracks() for more information.
      initializePremadeTracksOptions: null
    }, options );

    super( preferencesModel, tandem.createTandem( 'trackSetModel' ), options );

    this.sceneProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'sceneProperty' ),
      validValues: [ 0, 1, 2, 3 ]
    } );

    // When the scene changes, also change the tracks.
    this.sceneProperty.link( this.updateActiveTrack.bind( this ) );

    this.trackTypes = options.trackTypes;

    // initialize and add the desired tracks for this EnergySkateParkTrackSetModel
    this.initializePremadeTracks( tandem, options.initializePremadeTracksOptions );
  }

  /**
   * When the scene changes or tracks are added to the track set, update which track is visible and physically
   * interactive.
   *
   * @param sceneIndex - index identifying the scene
   */
  private updateActiveTrack( sceneIndex: number ): void {
    for ( let i = 0; i < this.tracks.length; i++ ) {
      const track = this.tracks.get( i );
      track.physicalProperty.value = ( i === sceneIndex );

      // Reset the skater position when the track is changed, see #179
      this.skater.resetPosition();

      // make sure that the entire track is above ground - points should be, but this makes sure that the
      // entire curve is fully above ground
      if ( track.physicalProperty.get() ) {

        // wait to bump until the model bounds are defined, which doesn't happen until the first view layout since
        // available model bounds are determined by the size of the screen for this sim
        const bumpListener = ( bounds: Bounds2 ) => {
          if ( bounds.hasNonzeroArea() ) {

            // During state set, nodes can temporarily go below ground, but it will be above ground after the state is
            // fully set.
            if ( !isSettingPhetioStateProperty.value ) {
              this.tracks.get( i ).bumpAboveGround();
            }
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
   * Create and add the premade tracks for this model, tracks are defined by options for this class.
   *
   * @param tandem
   * @param options
   */
  private initializePremadeTracks( tandem: Tandem, options?: IntentionalAny ): void {
    const tracks: Track[] = [];

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      parabolaControlPointOptions: null,
      parabolaTrackOptions: null,

      slopeControlPointOptions: null,
      slopeTrackOptions: null,

      doubleWellControlPointOptions: null,
      doubleWellTrackOptions: null,

      loopControlPointOptions: null,
      loopTrackOptions: null
    }, options );

    this.trackTypes.forEach( trackType => {
      // @ts-expect-error
      if ( trackType === PremadeTracks.TrackType.PARABOLA ) {
        const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( this, options.parabolaControlPointOptions );
        const parabolaTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, parabolaControlPoints, merge( {
          tandem: tandem.createTandem( 'parabolaTrack' )
        }, options.parabolaTrackOptions ) );

        tracks.push( parabolaTrack );
      }
      // @ts-expect-error
      else if ( trackType === PremadeTracks.TrackType.SLOPE ) {
        const slopeControlPoints = PremadeTracks.createSlopeControlPoints( this, options.slopeControlPointOptions );
        const slopeTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, slopeControlPoints, merge( {

          // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
          // see #164
          slopeToGround: true,
          tandem: tandem.createTandem( 'slopeTrack' )
        }, options.slopeTrackOptions ) );
        tracks.push( slopeTrack );
      }
      // @ts-expect-error
      else if ( trackType === PremadeTracks.TrackType.DOUBLE_WELL ) {
        const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( this, options.doubleWellControlPointOptions );
        const doubleWellTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, doubleWellControlPoints, merge( {
          tandem: tandem.createTandem( 'doubleWellTrack' )
        }, options.doubleWellTrackOptions ) );
        tracks.push( doubleWellTrack );
      }
      // @ts-expect-error
      else if ( trackType === PremadeTracks.TrackType.LOOP ) {
        const loopControlPoints = PremadeTracks.createLoopControlPoints( this, options.loopControlPointOptions );
        const loopTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, loopControlPoints, merge( {
          draggable: this.tracksDraggable,
          tandem: tandem.createTandem( 'loopTrack' )
        }, options.loopTrackOptions ) );
        tracks.push( loopTrack );
      }
    } );

    this.addTrackSet( tracks );
  }

  /**
   * Add all tracks in the set. In addition to adding all to the ObservableArrayDef, this will initialize which track
   * should be visible, physical, and interactive depending on the model sceneProperty.
   *
   * @param tracks - The tracks to add.
   */
  public addTrackSet( tracks: Track[] ): void {
    this.tracks.addAll( tracks );
    this.updateActiveTrack( this.sceneProperty.get() );
  }

  /**
   * Reset all of the tracks in this model's track set, if they are configurable. Otherwise, identical to
   * super function.
   */
  public override reset(): void {
    super.reset();
    this.tracks.forEach( track => {
      if ( track.configurable ) {
        track.reset();
      }
    } );

    this.sceneProperty.reset();

    this.updateActiveTrack( this.sceneProperty.get() );
  }

  private static createPremadeTrack( model: IntentionalAny, controlPoints: ControlPoint[], options: IntentionalAny ): Track {
    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      configurable: model.tracksConfigurable,
      phetioState: false
    }, options );

    return PremadeTracks.createTrack( model, controlPoints, options );
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );
export default EnergySkateParkTrackSetModel;