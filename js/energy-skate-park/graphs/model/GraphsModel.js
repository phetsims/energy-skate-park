// Copyright 2018, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var Enumeration = require( 'PHET_CORE/Enumeration' );
  var EnumerationProperty = require( 'AXON/EnumerationProperty' );
  var EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  var GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Range = require( 'DOT/Range' );
  var SkaterState = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterState' );
  var PremadeTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/PremadeTracks' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function GraphsModel( tandem ) {

    // track set model with no friction
    EnergySkateParkTrackSetModel.call( this, false, tandem.createTandem( 'graphsModel' ),  {
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
    this.lineGraphScaleProperty = new NumberProperty( 1 / 100 );

    // @public - sets the independent variable for the graph display
    this.independentVariables = new Enumeration( [ 'POSITION', 'TIME' ] );
    this.independentVariableProperty = new EnumerationProperty( this.independentVariables, this.independentVariables.POSITION );

    // samples of skater data to record and potentially play back
    this.skaterSamples = new ObservableArray();

    // @public - in seconds, how much time has passed since beginning to record skater states
    this.runningTimeProperty = new NumberProperty( 0 );

    this.sampleIndexProperty = new NumberProperty( 0, {
      range: new Range( 0, GraphsConstants.MAX_SAMPLES )
    } );

    this.sampleIndexProperty.link( ( index ) => {

      // index points to the new skater state we wish to set from skaterSamples
      if ( this.skaterSamples.length > 0 ) {
        this.skaterSamples.get( index ).setToSkater( this.skater );
        this.skater.updatedEmitter.emit();
      }
    } );
  }

  energySkatePark.register( 'GraphsModel', GraphsModel );

  return inherit( EnergySkateParkFullTrackSetModel, GraphsModel, {

    step: function( dt ) {
      EnergySkateParkFullTrackSetModel.prototype.step.call( this, dt );

      // for the "Graphs" screen we want to update energies 
      if ( this.skater.draggingProperty.get() ) {
        var initialStateCopy = new SkaterState( this.skater );
        this.stepModel( dt, initialStateCopy );
      }
    },

    /**
     * When the model is stepped, save skater sample data so that we can scrub states for playback.
     *
     * @param {number} dt
     * @param {SkaterState} skaterState
     */
    stepModel: function( dt, skaterState ) {
      var updatedState = EnergySkateParkFullTrackSetModel.prototype.stepModel.call( this, dt, skaterState );

      // for the graphs screen, we need 
      this.runningTimeProperty.set( this.runningTimeProperty.get() + dt );
      updatedState.setTime( this.runningTimeProperty.get() );

      if ( this.runningTimeProperty.get() < GraphsConstants.MAX_TIME ) {
        this.skaterSamples.push( updatedState );
      }

      // index was moved off of old value, clear old samples
      // TODO:  Can this be deleted?
      // if ( this.sampleIndexProperty.get() < this.skaterSamples.length - 1 ) {
        // this.skaterSamples.splice( this.sampleIndexProperty.get() + 1, this.skaterSamples.length - this.sampleIndexProperty.get() );
      // }

      // add the new sample
      // this.skaterSamples.push( updatedState );
      // this.sampleIndexProperty.set( this.skaterSamples.length - 1 );

      // we have collected more samples than we want to show, clear old samples
      // TODO: Can this be deleted? It will be based on time
      // if ( this.skaterSamples.length > GraphsConstants.MAX_SAMPLES ) {
        // this.skaterSamples.shift();
      // }

      return updatedState;
    },

    /**
     * Clear all energy data, and reset the running time since we will begin recording at zero.
     */
    clearEnergyData() {
      this.runningTimeProperty.reset();
      this.skaterSamples.clear();
    },

    /**
     * Create the custom set of tracks for the "graphs" screen. The "graphs" screen includes a parabola and a 
     * double well with unique shapes where only certain control points are draggable.
     *
     * @param {Tandem} tandem
     * @return
     */
    createGraphsTrackSet: function( tandem ) {
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
  } );
} );
