// Copyright 2018-2019, University of Colorado Boulder

/**
 * Model for the "Measure" screen of this sim. The measure screen allows the user to inspect physical values
 * of the skater through time.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  const Property = require( 'AXON/Property' );
  const SkaterSample = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterSample' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );
  const inherit = require( 'PHET_CORE/inherit' );

  // constants
  // in seconds, how frequently we will sample the state of the skater and add to the list of SkaterSamples.
  const SAVE_REFRESH_RATE = 0.1;

  /**
   * @constructor
   *s
   * @param {Tandem} tandem
   */
  function MeasureModel( tandem ) {

    // a track set model, with friction allowed
    EnergySkateParkFullTrackSetModel.call( this, true, tandem, {
      tracksConfigurable: true
    } );

    // @public - whether or not the model should store samples of skater data as the skater moves along the track
    this.sampleSkaterProperty = new BooleanProperty( true, { tandem: tandem.createTandem( 'sampleSkaterProperty' ) } );

    // @public - the position of the sensor, in model coordinates (meters)
    this.sensorProbePositionProperty = new Vector2Property( new Vector2( -4, 1.5 ) );

    // @public - the position of the sensor body in model coordinates, set later because it will be relative to other
    // panels in the view, and this similarly should not be reset on reset(). This is meant to be the origin of the
    // body (top left)
    this.sensorBodyPositionProperty = new Vector2Property( new Vector2( 0, 0 ) );

    // @public {ObservableArray.<SkaterSample>} - list of all samples of skater physical values at a particular time
    this.skaterSamples = new ObservableArray();

    // @private {number} - in seconds, time elapsed since the last time we saved a sample
    this.timeSinceSave = 0;

    // the speed value is visible on the speedometer for the MeasureModel
    this.speedValueVisibleProperty.set( true );

    // TODO: Probably more Properties here
    const resetSamplesProperties = [
      this.skater.directionProperty,
      this.skater.trackProperty,
      this.skater.referenceHeightProperty,
      this.sampleSkaterProperty,
      this.skater.draggingProperty
    ];

    const self = this;
    Property.multilink( resetSamplesProperties, function() {
      for ( let i = 0; i < self.skaterSamples.length; i++ ) {
        if ( !self.skaterSamples.get( i ).removeInitiated ) {
          self.skaterSamples.get( i ).initiateRemove();
        }
      }
    } );

    // when the scene changes, remove all points immediately so they don't persist
    this.sceneProperty.link( scene => {
      this.clearSavedSamples();
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

      this.clearSavedSamples();

      this.sensorProbePositionProperty.reset();
      this.sampleSkaterProperty.reset();
    },

    /**
     * Clear all saved samples and reset time variables responsible for controlling rate of saving samples.
     */
    clearSavedSamples: function() {
      this.skaterSamples.clear();
      this.timeSinceSave = 0;
    },

    /**
     * Updates a SkaterState object with a time step, but also saves a sample of the skaterSate under the right
     * conditions. The individual sample is stored for later inspection.
     *
     * @param {number} dt
     * @param {SkaterSate} skaterState - modified by this function
     *
     * @returns {SkaterState} - returned, may update the model Skater
     */
    stepModel: function( dt, skaterState ) {
      const updatedState = EnergySkateParkFullTrackSetModel.prototype.stepModel.call( this, dt, skaterState );

      if ( this.sampleSkaterProperty.get() ) {
        if ( this.skater.trackProperty.get() ) {
          this.timeSinceSave = this.timeSinceSave + dt;

          if ( this.timeSinceSave > SAVE_REFRESH_RATE ) {
            this.timeSinceSave = 0;
            const newSample = new SkaterSample( updatedState );

            // add a listener that removes this sample from the list - removes this listener on removal as well
            const self = this;
            var removalListener = function() {
              newSample.removalEmitter.removeListener( removalListener );
              self.skaterSamples.remove( newSample );
            };
            newSample.removalEmitter.addListener( removalListener );

            this.skaterSamples.add( newSample );
          }
        }
      }

      // determine if it is time fo any skater samples to be removed - use forEach to do on a copy of the array
      // because this may involve array modification
      this.skaterSamples.forEach( function( sample ) {
        sample.step( dt );
      } );

      return updatedState;
    }
  } );
} );
