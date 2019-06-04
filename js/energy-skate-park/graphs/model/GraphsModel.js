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
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Range = require( 'DOT/Range' );
  var EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  var PremadeTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/PremadeTracks' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

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

      const p1 = new Vector2( -5, 4 );
      const p2 = new Vector2( 0, 0 );
      const p3 = new Vector2( 5, 4 );

      // center point is draggable with specific bounds
      const p2Bounds = PremadeTracks.createBottomLimitBounds( p2, 3, 1 );

      const parabolaControlPoints = [
        new ControlPoint( p1.x, p1.y, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p2.x, p2.y, { limitBounds: p2Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p3.x, p3.y, { tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];

      var parabolaTrack = PremadeTracks.createTrack( this, this.tracks, parabolaControlPoints, this.availableModelBoundsProperty, {
        configurable: this.tracksConfigurable,
        tandem: tandem.createTandem( 'parabolaTrack' ),
        phetioState: false
      } );

      return [ parabolaTrack ];
    }
  } );
} );
