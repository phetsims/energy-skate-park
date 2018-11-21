// Copyright 2018, University of Colorado Boulder

/**
 * Model for the "Measure" screen of this sim. The measure screen allows the user to inspect physical values
 * of the skater through time.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var SkaterSample = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterSample' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  // in seconds, how frequently we will sample the state of the skater and add to teh list of SkaterSamples.
  var SAVE_REFRESH_RATE = 0.5;

  /**
   * @constructor
   *s
   * @param {Tandem} tandem
   */
  function MeasureModel( tandem ) {

    // a track set model, with friction allowed
    EnergySkateParkFullTrackSetModel.call( this, true, tandem );

    // @public - whether or not the model should store samples of skater data as the skater moves along the track
    this.sampleSkaterProperty = new BooleanProperty( true );

    // @public {ObservableArray.<SkaterSample>} - list of all samples of skater physical values at a particular time
    this.skaterSamples = new ObservableArray();

    // @private {number} - in seconds, time elapsed since the last time we saved a sample
    this.timeSinceSave = 0;

    // when the skater changes directions, all samples are cleared so that more than a half period of samples
    // don't occlude each other
    var self = this;
    this.skater.directionProperty.link( function() {
      self.skaterSamples.clear();
    } );
  }

  energySkatePark.register( 'MeasureModel', MeasureModel );

  return inherit( EnergySkateParkFullTrackSetModel, MeasureModel, {

    /**
     * Reset the measure model, calling the supertype function and clearing all skater samples.
     * @public
     */
    reset: function() {
      EnergySkateParkFullTrackSetModel.prototype.reset.call( this );

      this.skaterSamples.clear();
      this.timeSinceSave =  0;
    },


    stepModel: function( dt, skaterState ) {
      var updatedState = EnergySkateParkFullTrackSetModel.prototype.stepModel.call( this, dt, skaterState );

      if ( this.sampleSkaterProperty.get() ) {
        if ( this.skater.trackProperty.get() ) {
          this.timeSinceSave = this.timeSinceSave + dt;

          if ( this.timeSinceSave > SAVE_REFRESH_RATE ) {
            this.timeSinceSave = 0;
            this.skaterSamples.add( new SkaterSample( updatedState ) );
            console.log( this.skaterSamples.length );
          }
        }
      }

      return updatedState;
    }
  } );
} );
