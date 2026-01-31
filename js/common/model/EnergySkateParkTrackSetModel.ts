// Copyright 2018-2026, University of Colorado Boulder

/**
 * A model in Energy Skate park with a premade set of tracks. Does not include any configurable or movable tracks.
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import ControlPoint from './ControlPoint.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import EnergySkateParkPreferencesModel from './EnergySkateParkPreferencesModel.js';
import EnergySkateParkSaveSampleModel, { EnergySkateParkSaveSampleModelOptions } from './EnergySkateParkSaveSampleModel.js';
import PremadeTracks, { DoubleWellOptions, LoopOptions, ParabolaOptions, SlopeOptions, TrackType } from './PremadeTracks.js';
import Track, { TrackOptions } from './Track.js';

type InitializePremadeTracksOptions = {
  parabolaControlPointOptions?: ParabolaOptions;
  parabolaTrackOptions?: TrackOptions;
  slopeControlPointOptions?: SlopeOptions;
  slopeTrackOptions?: TrackOptions;
  doubleWellControlPointOptions?: DoubleWellOptions;
  doubleWellTrackOptions?: TrackOptions;
  loopControlPointOptions?: LoopOptions;
  loopTrackOptions?: TrackOptions;
};

type SelfOptions = {
  trackTypes?: TrackType[];
  initializePremadeTracksOptions?: InitializePremadeTracksOptions | null;
};

export type EnergySkateParkTrackSetModelOptions = SelfOptions & EnergySkateParkSaveSampleModelOptions;

export default class EnergySkateParkTrackSetModel extends EnergySkateParkSaveSampleModel {

  // Indicates the currently selected scene. There can be any number of scenes, do we need to pass this in as a param
  public readonly sceneProperty: NumberProperty;
  public readonly trackTypes: TrackType[];

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem, providedOptions: EnergySkateParkTrackSetModelOptions ) {
    const options = optionize<EnergySkateParkSaveSampleModelOptions, SelfOptions, EnergySkateParkSaveSampleModelOptions>()( {

      // {PremadeTracks.TrackType[]} - list of the premade tracks used in this model. Currently,
      // the default list includes all of the possible premade tracks. Remove items from
      // this list to remove premade tracks from the model. This order will also be the
      // order of track selection buttons in the view.
      trackTypes: [
        'PARABOLA',
        'SLOPE',
        'DOUBLE_WELL',
        'LOOP'
      ],

      // {Object} Options passed to initializePremadeTracks, with options for control points and tracks for each of
      // the provided TrackType listed above. See initializePremadeTracks() for more information.
      initializePremadeTracksOptions: null
    }, providedOptions );

    super( preferencesModel, tandem, options );

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
   */
  private initializePremadeTracks( tandem: Tandem, providedOptions?: InitializePremadeTracksOptions | null ): void {
    const tracks: Track[] = [];

    const options = combineOptions<InitializePremadeTracksOptions>( {}, providedOptions ?? undefined );

    this.trackTypes.forEach( trackType => {
      if ( trackType === 'PARABOLA' ) {
        const parabolaTrackTandem = tandem.createTandem( 'tracks' ).createTandem( 'parabolaTrack' );
        const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( this, parabolaTrackTandem, options.parabolaControlPointOptions ?? {} );
        const parabolaTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, parabolaControlPoints, combineOptions<TrackOptions>( {
          tandem: parabolaTrackTandem
        }, options.parabolaTrackOptions ) );

        tracks.push( parabolaTrack );
      }
      else if ( trackType === 'SLOPE' ) {
        const slopeTrackTandem = tandem.createTandem( 'tracks' ).createTandem( 'slopeTrack' );
        const slopeControlPoints = PremadeTracks.createSlopeControlPoints( this, slopeTrackTandem, options.slopeControlPointOptions ?? {} );
        const slopeTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, slopeControlPoints, combineOptions<TrackOptions>( {

          // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
          // see #164
          slopeToGround: true,
          tandem: slopeTrackTandem
        }, options.slopeTrackOptions ) );
        tracks.push( slopeTrack );
      }
      else if ( trackType === 'DOUBLE_WELL' ) {
        const doubleWellTandem = tandem.createTandem( 'tracks' ).createTandem( 'doubleWellTrack' );
        const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( this, doubleWellTandem, options.doubleWellControlPointOptions ?? {} );
        const doubleWellTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, doubleWellControlPoints, combineOptions<TrackOptions>( {
          tandem: doubleWellTandem
        }, options.doubleWellTrackOptions ) );
        tracks.push( doubleWellTrack );
      }
      else if ( trackType === 'LOOP' ) {
        const loopTrackTandem = tandem.createTandem( 'tracks' ).createTandem( 'loopTrack' );
        const loopControlPoints = PremadeTracks.createLoopControlPoints( this, loopTrackTandem, options.loopControlPointOptions ?? {} );
        const loopTrack = EnergySkateParkTrackSetModel.createPremadeTrack( this, loopControlPoints, combineOptions<TrackOptions>( {
          draggable: this.tracksDraggable,
          tandem: loopTrackTandem
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
   * Attach listeners that will remove and clear samples in response to Skater and model Properties. These are attached
   * for some EnergySkateParkSaveSampleModels but not all of them. They are generally useful when EnergySkateParkDataSamples are
   * used to draw the skater path.
   */
  public attachPathRemovalListeners(): void {

    // existing data fades away before removal when the skater direction changes
    this.skater.directionProperty.link( direction => {
      this.initiateSampleRemoval();
    } );

    // existing data is removed immediately when any of these Properties change
    const boundClearSamples = this.clearEnergyData.bind( this );
    Multilink.multilink( [ this.saveSamplesProperty, this.skater.draggingProperty, this.sceneProperty ], boundClearSamples );
    this.skater.returnedEmitter.addListener( boundClearSamples );
    this.trackChangedEmitter.addListener( boundClearSamples );
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

  public static createPremadeTrack( model: EnergySkateParkModel, controlPoints: ControlPoint[], options?: TrackOptions ): Track {
    options = combineOptions<TrackOptions>( {
      configurable: model.tracksConfigurable
    }, options );

    return PremadeTracks.createTrack( model, controlPoints, options );
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );