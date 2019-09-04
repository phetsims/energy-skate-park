// Copyright 2019, University of Colorado Boulder

/**
 * A NumberControl that controls the gravity Property of energy skate park.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhysicalNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalNumberControl' );
  const Range = require( 'DOT/Range' );

  // strings
  const controlsGravityString = require( 'string!ENERGY_SKATE_PARK/controls.gravity' );
  const gravityMetersPerSecondSquaredPatternString = require( 'string!ENERGY_SKATE_PARK/gravityMetersPerSecondSquaredPattern' );

  class GravityNumberControl extends PhysicalNumberControl {

    /**
     * @param {NumberProperty} property
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( property, tandem, options ) {

      options = _.extend( {
        decimalPlaces: 1,
        numberDisplayOptions: {
          valuePattern: gravityMetersPerSecondSquaredPatternString,
          useRichText: true // for the superscript on units
        }
      }, options );
      super( controlsGravityString, property, new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ), tandem, options );
    }
  }

  return energySkatePark.register( 'GravityNumberControl', GravityNumberControl );
} );
