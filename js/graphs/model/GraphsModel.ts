// Copyright 2018-2026, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkDataSample from '../../common/model/EnergySkateParkDataSample.js';
import EnergySkateParkPreferencesModel from '../../common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkTrackSetModel from '../../common/model/EnergySkateParkTrackSetModel.js';
import PremadeTracks from '../../common/model/PremadeTracks.js';
import SkaterState from '../../common/model/SkaterState.js';
import Track from '../../common/model/Track.js';
import energySkatePark from '../../energySkatePark.js';
import GraphsConstants from '../GraphsConstants.js';

export default class GraphsModel extends EnergySkateParkTrackSetModel {

  // properties for visibility and settings for the graph
  public readonly kineticEnergyDataVisibleProperty: BooleanProperty;
  public readonly potentialEnergyDataVisibleProperty: BooleanProperty;
  public readonly thermalEnergyDataVisibleProperty: BooleanProperty;
  public readonly totalEnergyDataVisibleProperty: BooleanProperty;

  // index pointing to the range plotted on the energy plot, see GraphsConstants.PLOT_RANGES
  public readonly energyPlotScaleIndexProperty: NumberProperty;

  // sets the independent variable for the graph display
  public readonly independentVariableProperty: StringUnionProperty<'position' | 'time'>;

  // or not the energy plot is visible
  public energyPlotVisibleProperty: BooleanProperty;
  private timeSinceSkaterSaved?: number;

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {

    // all tracks in the Graphs screen are configurable
    const tracksConfigurable = true;

    // all tracks in graphs screen are bound by these dimensions (in meters)
    const trackHeight = GraphsConstants.TRACK_HEIGHT;
    const trackWidth = GraphsConstants.TRACK_WIDTH;

    // track set model with no friction
    super( preferencesModel, tandem.createTandem( 'graphsModel' ), {

      // the Graphs screen contains a parabola and double well premade track
      trackTypes: [
        'PARABOLA',
        'DOUBLE_WELL'
      ],

      // the Graphs screen has a double well and parabola track, but they look and act a bit different from the other
      // screens, these options define the differences
      initializePremadeTracksOptions: {
        doubleWellControlPointOptions: {
          trackHeight: 4,
          trackWidth: 10,
          trackMidHeight: 1.5,

          p1Visible: false,
          p5Visible: false,

          // limit vertical bounds for points 1 and 5 so that the track can never overlap with other UI components, including
          // when it is bumped above ground
          p1UpSpacing: 0,
          p1DownSpacing: 0,
          p5UpSpacing: 0,
          p5DownSpacing: 0,

          // spacing for the limiting drag bounds of the third control point
          p3UpSpacing: 2.5,
          p3DownSpacing: 1.5
        },
        doubleWellTrackOptions: {
          configurable: tracksConfigurable,
          tandem: tandem.createTandem( 'doubleWellTrack' )
        },

        parabolaControlPointOptions: {
          trackHeight: trackHeight,
          trackWidth: trackWidth,
          p1Visible: false,
          p3Visible: false
        },
        parabolaTrackOptions: {
          configurable: tracksConfigurable,
          tandem: tandem.createTandem( 'parabolaTrack' )
        }
      },

      // limited reference height range for this Screen because the graph takes up so much space
      skaterOptions: {
        referenceHeightRange: new Range( 0, 4.5 )
      },

      // premade tracks can be modified
      tracksConfigurable: tracksConfigurable,

      // interval at which we save skater samples
      saveSampleInterval: 0.01,

      // graph samples will fade more quickly, partly because it looks nicer, but mostly because
      // it is better for performance to have fewer transparent points
      sampleFadeDecay: 0.5,

      // to prevent a memory leak if we run for a long time without clearing
      maxNumberOfSamples: 1000
    } );

    this.kineticEnergyDataVisibleProperty = new BooleanProperty( true );
    this.potentialEnergyDataVisibleProperty = new BooleanProperty( true );
    this.thermalEnergyDataVisibleProperty = new BooleanProperty( true );
    this.totalEnergyDataVisibleProperty = new BooleanProperty( true );

    this.energyPlotScaleIndexProperty = new NumberProperty( 11, {
      range: new Range( 0, GraphsConstants.PLOT_RANGES.length - 1 )
    } );

    this.independentVariableProperty = new StringUnionProperty( 'position', {
      validValues: [ 'position', 'time' ]
    } );

    this.energyPlotVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'energyPlotVisibleProperty' )
    } );

    // existing data fades away before removal when the skater direction changes
    this.skater.directionProperty.link( direction => {

      if ( this.independentVariableProperty.get() === 'position' ) {
        this.initiateSampleRemoval();
      }
    } );

    // there are far more points required for the Energy vs Time plot, so we don't limit the number of
    // saved samples in this case
    this.independentVariableProperty.link( independentVariable => {
      this.limitNumberOfSamples = independentVariable === 'position';
    } );

    // clear all data when the track changes
    this.sceneProperty.link( scene => {
      this.clearEnergyData();
    } );

    this.skater.draggingProperty.link( isDragging => {

      if ( this.independentVariableProperty.get() === 'position' ) {

        // if plotting against position don't save any skater samples while dragging, but if plotting against time
        // it is still useful to see data as potential energy changes
        this.clearEnergyData();
        this.preventSampleSave = isDragging;
      }
      else {

        // if plotting against time, it is still useful to see changing data as potential energy changes, but prevent
        // sample saving while paused and dragging so that we don't add data while paused, but still save data
        // while manually stepping
        this.preventSampleSave = isDragging && this.pausedProperty.get();
      }
    } );

    // clear old samples if we are plotting for longer than the range
    this.sampleTimeProperty.link( time => {

      const plottingTime = this.independentVariableProperty.get() === 'time';
      const overTime = time > GraphsConstants.MAX_PLOTTED_TIME;
      if ( plottingTime && overTime ) {

        // clear all samples prior to time - maxTime (the horizontal range of the data)
        const samplesToRemove = [];
        const minSavedTime = time - GraphsConstants.MAX_PLOTTED_TIME;
        for ( let i = 0; i < this.dataSamples.length; i++ ) {
          if ( this.dataSamples.get( i ).time < minSavedTime ) {
            samplesToRemove.push( this.dataSamples.get( i ) );
          }
          else {
            break;
          }
        }

        this.batchRemoveSamples( samplesToRemove );
        assert && assert( this.dataSamples.get( 0 ).time >= minSavedTime, 'data still exists that is less than plot min' );
      }
    } );

    // if any of the UserControlledPropertySet changes, the user is changing something that would modify the
    // physical system and changes everything in saved EnergySkateParkDataSamples
    Multilink.lazyMultilinkAny( this.userControlledPropertySet.properties, () => {

      if ( this.independentVariableProperty.get() === 'time' ) {
        if ( this.dataSamples.length > 0 ) {

          // only remove data if the cursor time is earlier than the last saved sample
          if ( this.sampleTimeProperty.get() < this.dataSamples.get( this.dataSamples.length - 1 ).time ) {
            const closestSample = this.getClosestSkaterSample( this.sampleTimeProperty.get() );
            const indexOfSample = this.dataSamples.indexOf( closestSample );

            assert && assert( indexOfSample >= 0, 'time of cursor needs to align with a skater sample' );
            this.batchRemoveSamples( this.dataSamples.slice( indexOfSample ) );
          }
        }
      }
    } );

    // if plotting against position we want to clear data when skater returns, but it is useful to
    // see previous data when plotting against time so don't clear in that case
    this.skater.returnedEmitter.addListener( () => {

      if ( this.independentVariableProperty.get() === 'position' ) {
        this.clearEnergyData();
      }
    } );
  }

  /**
   * Resets the screen and Properties specific to this model.
   */
  public override reset(): void {
    super.reset();

    this.energyPlotVisibleProperty.reset();

    this.kineticEnergyDataVisibleProperty.reset();
    this.potentialEnergyDataVisibleProperty.reset();
    this.thermalEnergyDataVisibleProperty.reset();
    this.totalEnergyDataVisibleProperty.reset();

    this.energyPlotScaleIndexProperty.reset();
    this.independentVariableProperty.reset();

    this.clearEnergyData();

    // after reset, restart timer for next saved state
    this.timeSinceSkaterSaved = 0;
  }

  /**
   * @param dt - in seconds
   */
  public override step( dt: number ): void {
    super.step( dt );

    // for the "Graphs" screen we want to update energies while dragging so that they are recorded on the graph
    if ( this.skater.draggingProperty.get() && !this.pausedProperty.get() ) {
      const initialStateCopy = new SkaterState( this.skater );
      this.stepModel( dt, initialStateCopy );
    }
  }

  /**
   * Custom stepModel for the SaveSampleModel. If the sampleTimeProperty is *older* than the most recent saved
   * sample, we are playing back through saved data and stepping through saved samples rather than stepping
   * the model. If we are actually stepping the model physics, we are also recording new EnergySkateParkDataSamples
   * in the supertype function.
   */
  protected override stepModel( dt: number, skaterState: SkaterState ): SkaterState {
    const hasData = this.dataSamples.length > 0;

    // only if we have data, so that we don't try to get a data sample if length is 0
    const cursorOlderThanNewestSample = hasData && ( this.sampleTimeProperty.get() < this.dataSamples.get( this.dataSamples.length - 1 ).time );

    const plottingTime = this.independentVariableProperty.get() === 'time';

    // we are playing back through data if plotting against time and the cursor is older than the
    if ( cursorOlderThanNewestSample && plottingTime ) {

      // skater samples are updated not by step, but by setting model to closest skater sample at time
      const closestSample = this.getClosestSkaterSample( this.sampleTimeProperty.get() );
      this.setFromSample( closestSample );
      this.skater.updatedEmitter.emit();

      this.sampleTimeProperty.set( this.sampleTimeProperty.get() + dt );
      this.stopwatch.step( dt );

      return closestSample.skaterState;
    }
    else {
      return super.stepModel( dt, skaterState );
    }
  }

  /**
   * Get the closest SkaterState that was saved at the time provided.
   *
   * @param time (in seconds)
   */
  public getClosestSkaterSample( time: number ): EnergySkateParkDataSample {
    assert && assert( this.dataSamples.length > 0, 'model has no saved EnergySkateParkDataSamples to retrieve' );

    let nearestIndex = _.sortedIndexBy( this.dataSamples as Array<{ time: number }>, { time: time }, entry => entry.time );
    nearestIndex = Utils.clamp( nearestIndex, 0, this.dataSamples.length - 1 );

    return this.dataSamples.get( nearestIndex );
  }

  /**
   * Create the custom set of tracks for the "graphs" screen. The "graphs" screen includes a parabola and a
   * double well with unique shapes where only certain control points are draggable.
   */
  private createGraphsTrackSet( tandem: Tandem ): Track[] {

    // all tracks in graphs screen are bound by these dimensions (in meters)
    const trackHeight = GraphsConstants.TRACK_HEIGHT;
    const trackWidth = GraphsConstants.TRACK_WIDTH;

    const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( this, tandem.createTandem( 'parabolaTrack' ), {
      trackHeight: trackHeight,
      trackWidth: trackWidth,
      p1Visible: false,
      p3Visible: false
    } );

    const parabolaTrack = PremadeTracks.createTrack( this, parabolaControlPoints, {
      configurable: this.tracksConfigurable,
      tandem: tandem.createTandem( 'parabolaTrack' )
    } );

    const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( this, tandem.createTandem( 'doubleWellTrack' ), {
      trackHeight: 4,
      trackWidth: 10,
      trackMidHeight: 1.5,

      p1Visible: false,
      p5Visible: false,

      // limit vertical bounds for points 1 and 5 so that the track can never overlap with other UI components, including
      // when it is bumped above ground
      p1UpSpacing: 0,
      p1DownSpacing: 0,
      p5UpSpacing: 0,
      p5DownSpacing: 0,

      // spacing for the limiting drag bounds of the third control point
      p3UpSpacing: 2.5,
      p3DownSpacing: 1.5
    } );
    const doubleWellTrack = PremadeTracks.createTrack( this, doubleWellControlPoints, {
      configurable: this.tracksConfigurable,
      tandem: tandem.createTandem( 'doubleWellTrack' )
    } );

    return [ parabolaTrack, doubleWellTrack ];
  }
}

energySkatePark.register( 'GraphsModel', GraphsModel );