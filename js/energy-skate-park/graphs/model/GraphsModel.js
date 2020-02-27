// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 *
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Range from '../../../../../dot/js/Range.js';
import Utils from '../../../../../dot/js/Utils.js';
import Enumeration from '../../../../../phet-core/js/Enumeration.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkSaveSampleModel from '../../common/model/EnergySkateParkSaveSampleModel.js';
import PremadeTracks from '../../common/model/PremadeTracks.js';
import SkaterState from '../../common/model/SkaterState.js';
import GraphsConstants from '../GraphsConstants.js';

class GraphsModel extends EnergySkateParkSaveSampleModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // track set model with no friction
    super( tandem.createTandem( 'graphsModel' ), {

      includeFriction: false,

      // limited reference height range for this Screen because the graph takes up so much space
      skaterOptions: {
        referenceHeightRange: new Range( 0, 4.5 )
      },

      // premade tracks can be modified
      tracksConfigurable: true,

      // interval at which we save skater samples
      saveSampleInterval: 0.01,

      // graph samples will fade more quicly, partly because it looks nicer, but mostly because
      // it is better for perfomance to have fewer transparent points
      sampleFadeDecay: 0.5,

      // to prevent a memory leak if we run for a long time without clearing
      maxNumberOfSamples: 1000
    } );

    // the 'graphs' screen uses a unique set of premade tracks
    const trackSet = this.createGraphsTrackSet( tandem );
    this.addTrackSet( trackSet );

    // @public - properties for visibility and settings for the graph
    this.kineticEnergyDataVisibleProperty = new BooleanProperty( true );
    this.potentialEnergyDataVisibleProperty = new BooleanProperty( true );
    this.thermalEnergyDataVisibleProperty = new BooleanProperty( true );
    this.totalEnergyDataVisibleProperty = new BooleanProperty( true );

    // @public - scale for the graph
    this.lineGraphScaleProperty = new NumberProperty( 3, {
      range: new Range( 1, 5 )
    } );

    // @public - sets the independent variable for the graph display
    this.independentVariableProperty = new EnumerationProperty( GraphsModel.IndependentVariable, GraphsModel.IndependentVariable.POSITION );

    // @public - whether or not the energy plot is visible
    this.energyPlotVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'energyPlotVisibleProperty' )
    } );

    // existing data fades away before removal when the skater direction changes
    this.skater.directionProperty.link( direction => {
      if ( this.independentVariableProperty.get() === GraphsModel.IndependentVariable.POSITION ) {
        this.initiateSampleRemoval();
      }
    } );

    // there are far more points required for the Energy vs Time plot, so we don't limit the number of
    // saved samples in this case
    this.independentVariableProperty.link( independentVariable => {
      this.limitNumberOfSamples = independentVariable === GraphsModel.IndependentVariable.POSITION;
    } );

    // clear all data when the track changes
    this.sceneProperty.link( scene => {
      this.clearEnergyData();
    } );

    this.skater.draggingProperty.link( isDragging => {
      if ( this.independentVariableProperty.get() === GraphsModel.IndependentVariable.POSITION ) {

        // if plotting against position don't save any skater samples while dragging, but if plotting against time
        // it is still useful to see data as potential energy changes
        this.clearEnergyData();
        this.preventSampleSave = isDragging;
      }
      else {

        // if plotting against time, it is still useful to see changing data as potentiala energy changes, but prevent
        // sample saving while paused and dragging so that we don't add data while puased, but still save data
        // while manually stepping
        this.preventSampleSave = isDragging && this.pausedProperty.get();
      }
    } );

    // stop saving samples after the time limit if we are plotting against time
    this.sampleTimeProperty.link( time => {
      const plottingTime = this.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME;
      const overTime = time > GraphsConstants.MAX_PLOTTED_TIME;
      if ( plottingTime && overTime ) {
        this.preventSampleSave = true;
      }
      else {
        this.preventSampleSave = false;
      }
    } );

    // if plotting against position we want to clear data when skater returns, but it is useful to
    // see previous data when plotting against time so don't clear in that case
    this.skater.returnedEmitter.addListener( () => {
      if ( this.independentVariableProperty.get() === GraphsModel.IndependentVariable.POSITION ) {
        this.clearEnergyData();
      }
    } );

  }

  /**
   * Resets the screen and Properties specific to this model.
   *
   * @public
   * @override
   */
  reset() {
    super.reset();

    this.energyPlotVisibleProperty.reset();

    this.kineticEnergyDataVisibleProperty.reset();
    this.potentialEnergyDataVisibleProperty.reset();
    this.thermalEnergyDataVisibleProperty.reset();
    this.totalEnergyDataVisibleProperty.reset();

    this.lineGraphScaleProperty.reset();
    this.independentVariableProperty.reset();

    this.clearEnergyData();

    // after reset, restart timer for next saved state
    this.timeSinceSkaterSaved = 0;
  }

  /**
   * @override
   * @param {number} dt - in seconds
   */
  step( dt ) {
    super.step( dt );

    // for the "Graphs" screen we want to update energies while dragging so that they are recorded on the graph
    if ( this.skater.draggingProperty.get() ) {
      const initialStateCopy = new SkaterState( this.skater );
      this.stepModel( dt, initialStateCopy );
    }
  }

  /**
   * Get the closest SkaterState that was saved at the time provided.
   * @public
   *
   * @param {number} time (in seconds)
   * @returns {}
   */
  getClosestSkaterSample( time ) {
    assert && assert( this.skaterSamples.length > 0, 'model has no saved SkaterSamples to retrieve' );

    let nearestIndex = _.sortedIndexBy( this.skaterSamples.getArray(), { time: time }, entry => entry.time );
    nearestIndex = Utils.clamp( nearestIndex, 0, this.skaterSamples.length - 1 );

    return this.skaterSamples.get( nearestIndex );
  }

  /**
   * Create the custom set of tracks for the "graphs" screen. The "graphs" screen includes a parabola and a
   * double well with unique shapes where only certain control points are draggable.
   *
   * @param {Tandem} tandem
   * @return
   */
  createGraphsTrackSet( tandem ) {
    const groupTandem = this.controlPointGroupTandem;

    // all tracks in graphs screen are bound by these dimensions (in meters)
    const trackHeight = GraphsConstants.TRACK_HEIGHT;
    const trackWidth = GraphsConstants.TRACK_WIDTH;

    const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( groupTandem, {
      trackHeight: trackHeight,
      trackWidth: trackWidth,
      p1Draggable: false,
      p3Draggable: false
    } );

    const parabolaTrack = PremadeTracks.createTrack( this, this.tracks, parabolaControlPoints, this.availableModelBoundsProperty, {
      configurable: this.tracksConfigurable,
      tandem: tandem.createTandem( 'parabolaTrack' ),
      phetioState: false
    } );

    const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( groupTandem, {
      trackHeight: 4,
      trackWidth: 10,
      trackMidHeight: 1.5,

      p1Draggable: false,
      p5Draggable: false,

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
    const doubleWellTrack = PremadeTracks.createTrack( this, this.tracks, doubleWellControlPoints, this.availableModelBoundsProperty, {
      configurable: this.tracksConfigurable,
      tandem: tandem.createTandem( 'doubleWellTrack' ),
      phetioState: false
    } );

    return [ parabolaTrack, doubleWellTrack ];
  }
}

GraphsModel.IndependentVariable = Enumeration.byKeys( [ 'POSITION', 'TIME' ] );

energySkatePark.register( 'GraphsModel', GraphsModel );
export default GraphsModel;