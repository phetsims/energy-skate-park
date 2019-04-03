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
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function GraphsModel( tandem ) {

    // track set model with no friction
    EnergySkateParkFullTrackSetModel.call( this, false, tandem.createTandem( 'graphsModel' ) );

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
    }
  } );
} );
