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

  // constants
  // in seconds, how frequently we will sample the state of the skater and add to the list of SkaterSamples.
  const SAVE_REFRESH_RATE = 0.1;

  // maximum number of saved samples at one time so to reduce memory and performance stress when sim runs for a long
  // time without a case that clears existing samples
  const MAX_SAVED_SAMPLES = 50;

  class MeasureModel extends EnergySkateParkFullTrackSetModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      // a track set model, with friction allowed
      super( true, tandem, {
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

      // initiate sample fadeaway when the skater direction changes
      this.skater.directionProperty.link( direction => {
        this.initiateSampleRemoval();
      } );

      // immediately clear samples in these cases
      const clearSamplesProperties = [ this.sampleSkaterProperty, this.skater.draggingProperty, this.sceneProperty ];
      const boundClearSamples = this.clearSavedSamples.bind( this );
      Property.multilink( clearSamplesProperties, boundClearSamples );
      this.skater.returnedEmitter.addListener( boundClearSamples );
      this.trackChangedEmitter.addListener( boundClearSamples );

      // when the reference height changes, update energies for all skater samples
      this.skater.referenceHeightProperty.link( referenceHeight => {
        for ( let i = 0; i < this.skaterSamples.length; i++ ) {
          this.skaterSamples.get( i ).setNewReferenceHeight( referenceHeight );
        }
      } );
    }

    /**
     * Begin to remove all samples, indicating that all existing samples should fade away.
     * @private
     */
    initiateSampleRemoval() {
      for ( let i = 0; i < this.skaterSamples.length; i++ ) {
        if ( !this.skaterSamples.get( i ).removeInitiated ) {
          this.skaterSamples.get( i ).initiateRemove();
        }
      }
    }

    /**
     * Reset the measure model, calling the supertype function and clearing all skater samples.
     * @public
     */
    reset() {
      super.reset();

      this.clearSavedSamples();

      this.sensorProbePositionProperty.reset();
      this.sampleSkaterProperty.reset();
    }

    /**
     * Clear all saved samples and reset time variables responsible for controlling rate of saving samples.
     */
    clearSavedSamples() {
      this.skaterSamples.clear();
      this.timeSinceSave = 0;
    }

    /**
     * Updates a SkaterState object with a time step, but also saves a sample of the skaterSate under the right
     * conditions. The individual sample is stored for later inspection.
     *
     * @param {number} dt
     * @param {SkaterSate} skaterState - modified by this function
     *
     * @returns {SkaterState} - returned, may update the model Skater
     */
    stepModel( dt, skaterState ) {
      const updatedState = super.stepModel(  dt, skaterState );

      if ( this.sampleSkaterProperty.get() ) {

        // don't save any points if the skater is out of bounds (and therefore not visible)
        if ( this.skaterInBoundsProperty.get() ) {
          this.timeSinceSave = this.timeSinceSave + dt;

          if ( this.timeSinceSave > SAVE_REFRESH_RATE ) {
            this.timeSinceSave = 0;
            const newSample = new SkaterSample( updatedState );

            // add a listener that removes this sample from the list - removes this listener on removal as well
            const removalListener = () => {
              newSample.removalEmitter.removeListener( removalListener );
              this.skaterSamples.remove( newSample );
            };
            newSample.removalEmitter.addListener( removalListener );

            this.skaterSamples.add( newSample );
          }
        }

        // remove oldest samples if we have collected too many
        if ( this.skaterSamples.length > MAX_SAVED_SAMPLES ) {
          const numberToRemove = this.skaterSamples.length - MAX_SAVED_SAMPLES;
          for ( let i = 0; i < numberToRemove; i++ ) {
            const sample = this.skaterSamples.get( i );
            if ( !sample.removeInitiated ) {
              sample.initiateRemove();
            }
          }
        }
      }

      // step all samples - use ObservableArray.forEach to do on a copy of the array because this may involve array
      // modification
      this.skaterSamples.forEach( sample => {
        sample.step( dt );
      } );

      return updatedState;
    }

  }

  return energySkatePark.register( 'MeasureModel', MeasureModel );
} );
