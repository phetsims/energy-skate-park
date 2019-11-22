// Copyright 2018-2019, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkSaveSampleModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkSaveSampleModel' );
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Range = require( 'DOT/Range' );
  const SkaterState = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterState' );
  const Util = require( 'DOT/Util' );
  const PremadeTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/PremadeTracks' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  class GraphsModel extends EnergySkateParkSaveSampleModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // track set model with no friction
      super( false, tandem.createTandem( 'graphsModel' ), {

        //
        tracksConfigurable: true,
        saveSampleInterval: 0.01,
        maxNumberOfSamples: 1000
      } );

      // the 'graphs' screen uses a unique set of premade tracks
      const trackSet = this.createGraphsTrackSet( tandem );
      this.addTrackSet( trackSet );

      // @public - properties for visibility and settings of the graph
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
      // saved samples in this case - trust that
      this.independentVariableProperty.link( independentVariable => {
        this.limitNumberOfSamples = independentVariable === GraphsModel.IndependentVariable.POSITION;
      } );

      // listeners, no need for disposal as the model exists forever
      this.sceneProperty.link( scene => {
        this.clearEnergyData();
      } );

      this.skater.draggingProperty.link( isDragging => {
        if ( this.independentVariableProperty.get() === GraphsModel.IndependentVariable.POSITION ) {
          this.clearEnergyData();
        }
      } );

      this.sampleTimeProperty.link( time => {
        const plottingTime = this.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME;
        const overTime = time > GraphsConstants.MAX_PLOTTED_TIME;
        if ( plottingTime && overTime) {
          this.preventSampleSave = true;
        }
        else {
          this.preventSampleSave = false;
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
     * @param {number} dt
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
      nearestIndex = Util.clamp( nearestIndex, 0, this.skaterSamples.length - 1 );

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

  GraphsModel.IndependentVariable = new Enumeration( [ 'POSITION', 'TIME' ] );

  return energySkatePark.register( 'GraphsModel', GraphsModel );

} );
