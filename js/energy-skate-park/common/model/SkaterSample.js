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
  var Vector2 = require( 'DOT/Vector2' );

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
  }

  energySkatePark.register( 'SkaterSample', SkaterSample  );

  return inherit( Object, SkaterSample , {} );
} );
