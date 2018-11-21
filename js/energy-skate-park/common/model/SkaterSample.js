// Copyright 2018, University of Colorado Boulder

/**
 * A collection of physical values associated with the skater at a given time. Taken from the skaterState,
 * which will be up to date when this is generated (at some sample rate in the model step).
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

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
    this.thermalEnergyProperty = skaterState.thermalEnergy;
    this.totalEnergyProperty = skaterState.getTotalEnergy();
    this.referenceHeight = skaterState.referenceHeight;
    this.positionX = skaterState.positionX;
    this.positionY = skaterState.positionY;
  }

  energySkatePark.register( 'SkaterSample', SkaterSample  );

  return inherit( Object, SkaterSample , {} );
} );
