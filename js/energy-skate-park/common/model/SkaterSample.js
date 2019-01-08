// Copyright 2018, University of Colorado Boulder

/**
 * A collection of physical values associated with the skater at a given time. Taken from the skaterState,
 * which will be up to date when this is generated (at some sample rate in the model step).
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Emitter = require( 'AXON/Emitter' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  // time (s) between initiation of removal and removal from the model - a short delay allows samples to still be
  // inspected a short time after a new set of samples is tracked
  var REMOVAL_DELAY = 0.2;

  /**
   * @constructor
   *
   * @param {SkaterState} skaterState
   */
  function SkaterSample( skaterState ) {

    // @public (read-only)
    this.speed = skaterState.getSpeed();
    this.kineticEnergy = skaterState.getKineticEnergy();
    this.potentialEnergy = skaterState.getPotentialEnergy();
    this.thermalEnergy = skaterState.thermalEnergy;
    this.totalEnergy = skaterState.getTotalEnergy();
    this.referenceHeight = skaterState.referenceHeight;
    this.position = new Vector2( skaterState.positionX, skaterState.positionY );

    // @public - whether or not this sample is being inspected by the probe
    this.inspectedProperty = new BooleanProperty( false );

    // @public - the opacity of this skater sample, tied to visual representation
    this.opacityProperty = new NumberProperty( 1 );

    // @public - emits an event when the skater sample is old enough to be removed from the model
    this.removalEmitter = new Emitter();

    // @private {boolean} - indicates that this sample should begin removal, and will fade out
    this._initiateRemove = false;

    // @private {number} - in seconds, sample removed from model once this time is greater than REMOVAL_DELAY
    this.timeSinceRemovalInitiated = 0;
  }

  energySkatePark.register( 'SkaterSample', SkaterSample  );

  return inherit( Object, SkaterSample, {

    /**
     * @param {} dt - in seconds
     */
    step: function( dt ) {
      if ( this._initiateRemove ) {
        this.timeSinceRemovalInitiated += dt;
        this.opacityProperty.set( this.opacityProperty.get() * 0.95 );

        if ( this.timeSinceRemovalInitiated > REMOVAL_DELAY ) {
          this.removalEmitter.emit();
        }
      }
    },

    /**
     * Indicate that this skater sample is about to be removed. Opacity immediately is reduced, and after a short time
     * this sample will be completedly removed.
     *
     * @returns {}
     */
    initiateRemove: function() {
      assert && assert( !this._initiateRemove, 'removal should only be initiated once' );
      this._initiateRemove = true;
    },

    get removeInitiated() {
      return this._initiateRemove;
    }
  } );
} );
