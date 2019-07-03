// Copyright 2019, University of Colorado Boulder

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
  const EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Range = require( 'DOT/Range' );
  const SkaterState = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterState' );
  const SkaterSample = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterSample' );
  const Util = require( 'DOT/Util' );
  const PremadeTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/PremadeTracks' );

  // constants
  // in seconds, how frequently we will save SkaterStates when recording data for energy vs position plot
  const SAVE_REFRESH_RATE = 0.1;

  // how long to keep a SkaterSample when plotting energy vs position before removing it from the data series
  const SKATER_SAMPLE_LIFE_TIME = 2;

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  class GraphsModel extends EnergySkateParkTrackSetModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // track set model with no friction
      super( false, tandem.createTandem( 'graphsModel' ),  {
        tracksConfigurable: true
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

      // samples of skater data to record and potentially play back
      this.skaterSamples = new ObservableArray();

      // @private {number} - when plotting energy vs time, we only save SkaterStates at SAVE_REFRESH_RATE
      this.timeSinceSkaterSaved = 0;

      // @public - in seconds, how much time has passed since beginning to record skater states
      this.runningTimeProperty = new NumberProperty( 0 );
    }

    /**
     * @override
     * @param {number} dt
     */
    step( dt ) {

      EnergySkateParkTrackSetModel.prototype.step.call( this, dt );

      // for the "Graphs" screen we want to update energies while dragging so that they are recorded on the graph
      if ( this.skater.draggingProperty.get() ) {
        const initialStateCopy = new SkaterState( this.skater );
        this.stepModel( dt, initialStateCopy );
      }
    }

    /**
     * When the model is stepped, save skater sample data so that we can scrub states for playback.
     *
     * @override
     * @param {number} dt
     * @param {SkaterState} skaterState
     */
    stepModel( dt, skaterState ) {
      const updatedState = EnergySkateParkTrackSetModel.prototype.stepModel.call( this, dt, skaterState );

      const skaterSample = new SkaterSample( updatedState, this.runningTimeProperty.get() );

      // for the graphs screen, we need 
      this.runningTimeProperty.set( this.runningTimeProperty.get() + dt );

      if ( this.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME ) {
        if ( this.runningTimeProperty.get() < GraphsConstants.MAX_TIME ) {
          this.skaterSamples.push( skaterSample );
        }
      }
      else {
        if ( this.timeSinceSkaterSaved > SAVE_REFRESH_RATE ) {
          this.timeSinceSkaterSaved = 0;
          this.skaterSamples.push( skaterSample );
        }
        else {
          this.timeSinceSkaterSaved += dt;
        }

        // update time for each SkaterSample, and initiate remove for any that are too old
        for ( let i = 0; i < this.skaterSamples.length; i++ ) {
          const skaterSample = this.skaterSamples.get( i );

          if ( !skaterSample.removeInitiated && ( skaterSample.timeSinceAdded > SKATER_SAMPLE_LIFE_TIME ) ) {
            skaterSample.initiateRemove();
          }

          // now step the skater sample for opacity and removal
          this.skaterSamples.get( i ).step( dt );
        }
      }

      // handle removal of the SkaterSample, SkaterSample indicates when it is ready for removal from the model
      // after fading out
      const removalListener = () => {
        skaterSample.removalEmitter.removeListener( removalListener );
        this.skaterSamples.remove( skaterSample );
      };
      skaterSample.removalEmitter.addListener( removalListener );

      return updatedState;
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
      
      let nearestIndex = _.sortedIndexBy( this.skaterSamples.getArray(), { time: time }, entry => { return entry.time; } );
      nearestIndex = Util.clamp( nearestIndex, 0, this.skaterSamples.length - 1 );

      return this.skaterSamples.get( nearestIndex );
    }

    /**
     * Clear all energy data, and reset the running time since we will begin recording at zero.
     */
    clearEnergyData() {
      this.runningTimeProperty.reset();
      this.skaterSamples.clear();
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
      const trackHeight = 4;
      const trackWidth = 10;

      const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( groupTandem,  {
        trackHeight: trackHeight,
        trackWidth: trackWidth,
        p1Draggable: false,
        p3Draggable: false
      } );

      var parabolaTrack = PremadeTracks.createTrack( this, this.tracks, parabolaControlPoints, this.availableModelBoundsProperty, {
        configurable: this.tracksConfigurable,
        tandem: tandem.createTandem( 'parabolaTrack' ),
        phetioState: false
      } );

      const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( groupTandem, {
        trackHeight: 4,
        trackWidth: 10, 
        trackMidHeight: 1.5,

        p1Draggable: false,
        p5Draggable: false
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
