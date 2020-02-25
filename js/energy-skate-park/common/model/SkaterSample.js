// Copyright 2018-2020, University of Colorado Boulder

/**
 * A collection of physical values and data about the Skater at a particular time. This data can be plotted visually
 * or individually inspected by the user.
 *
 * Generally this information is static, but energy values for sample CAN change. For example, when the reference height
 * line moves, energy data updates according to this line.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Emitter = require( 'AXON/Emitter' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  // samples will fade out to this opacity before being fully removed from the model
  const MIN_OPACITY = 0.05;

  class SkaterSample {

    /**
     * @constructor
     *
     * @param {SkaterState} skaterState
     * @param {number} time - in seconds
     */
    constructor( skaterState, time ) {

      // @public (read-only)
      this.speed = skaterState.getSpeed();
      this.kineticEnergy = skaterState.getKineticEnergy();
      this.potentialEnergy = skaterState.getPotentialEnergy();
      this.thermalEnergy = skaterState.thermalEnergy;
      this.totalEnergy = skaterState.getTotalEnergy();
      this.referenceHeight = skaterState.referenceHeight;
      this.position = new Vector2( skaterState.positionX, skaterState.positionY );
      this.time = time;

      // @public (read-only)
      this.skaterState = skaterState;

      // @public - in seconds, time since this sample was added to the model
      this.timeSinceAdded = 0;

      // @public - whether or not this sample is being inspected by the probe
      this.inspectedProperty = new BooleanProperty( false );

      // @public - the opacity of this skater sample, tied to visual representation
      this.opacityProperty = new NumberProperty( 1 );

      // @public - emits an event when the skater sample has been removed from the model
      this.removalEmitter = new Emitter();

      // @public - emits an event when this SkaterSample has updated in some way, like when energies change
      // due to a change in reference height
      this.updatedEmitter = new Emitter();

      // @private {boolean} - indicates that this sample should begin removal, and will fade out
      this._initiateRemove = false;
    }

    /**
     * Calculate new energies for this SkaterSample with the new reference height. Potential energy will be recalculated
     * and total energy will be adjusted accordingly to conserve energy. Thermal and kinetic energies should not change.
     *
     * @param {number} referenceHeight
     */
    setNewReferenceHeight( referenceHeight ) {

      this.referenceHeight = referenceHeight;

      const oldPotentialEnergy = this.potentialEnergy;
      this.potentialEnergy = this.getPotentialEnergyAtReferenceHeight( referenceHeight );

      const energyChange = this.potentialEnergy - oldPotentialEnergy;
      this.totalEnergy = this.totalEnergy + energyChange;

      this.updatedEmitter.emit();

      if ( assert ) {
        const totalEnergy = this.potentialEnergy + this.kineticEnergy + this.thermalEnergy;
        assert( Utils.equalsEpsilon( totalEnergy, this.totalEnergy, 1E-10 ), 'energy should be conserved' );
      }
    }

    /**
     * Get the potential energy a particular reference height, using the other physical properties of the SkaterState
     * unchanged.
     *
     * @param {number} referenceHeight
     * @returns {number}
     */
    getPotentialEnergyAtReferenceHeight( referenceHeight ) {
      return -this.skaterState.mass * this.skaterState.gravity * ( this.skaterState.positionY - referenceHeight );
    }

    /**
     * @param {number} dt - in seconds
     */
    step( dt ) {
      if ( this._initiateRemove ) {
        this.opacityProperty.set( this.opacityProperty.get() * 0.95 );
      }

      this.timeSinceAdded += dt;
    }

    /**
     * Indicate that this skater sample is about to be removed. Opacity immediately is reduced, and after a short time
     * this sample will be completely removed.
     *
     * @returns {}
     */
    initiateRemove() {
      assert && assert( !this._initiateRemove, 'removal should only be initiated once' );
      this._initiateRemove = true;
    }

    get removeInitiated() {
      return this._initiateRemove;
    }
  }

  // @public
  // @static
  SkaterSample.MIN_OPACITY = MIN_OPACITY;

  return energySkatePark.register( 'SkaterSample', SkaterSample );
} );
