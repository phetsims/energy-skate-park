// Copyright 2018, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Range = require( 'DOT/Range' );
  var EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
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

    // samples of skater data to play back in time
    this.skaterSamples = new ObservableArray();

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
    /**
     * When the model is stepped, save skater sample data so that we can scrub states for playback.
     *
     * @param {number} dt
     * @param {SkaterState} skaterState
     */
    stepModel: function( dt, skaterState ) {
      var updatedState = EnergySkateParkFullTrackSetModel.prototype.stepModel.call( this, dt, skaterState );

      if ( this.skater.trackProperty.get() ) {

        // index was moved off of old value, clear old samples
        if ( this.sampleIndexProperty.get() < this.skaterSamples.length - 1 ) {
          this.skaterSamples.splice( this.sampleIndexProperty.get() + 1, this.skaterSamples.length - this.sampleIndexProperty.get() );
        }

        // add the new sample
        this.skaterSamples.push( updatedState );
        this.sampleIndexProperty.set( this.skaterSamples.length - 1 );
      }

      // we have collected more samples than we want to show, clear old samples
      if ( this.skaterSamples.length > GraphsConstants.MAX_SAMPLES ) {
        this.skaterSamples.shift();
      }

      return updatedState;
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
