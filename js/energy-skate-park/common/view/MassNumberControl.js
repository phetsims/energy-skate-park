// Copyright 2019, University of Colorado Boulder

/**
 * A NumberControl that controls the skater mass Property of energy skate park.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhysicalNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalNumberControl' );

  // strings
  const controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );
  const massKilogramsPatternString = require( 'string!ENERGY_SKATE_PARK/massKilogramsPattern' );

  class MassNumberControl extends PhysicalNumberControl {
    constructor( massProperty, massRange, tandem ) {
      super( controlsMassString, massProperty, massRange, tandem, {
        numberDisplayOptions: {
          valuePattern: massKilogramsPatternString
        }
      } );
    }
  }

  return energySkatePark.register( 'MassNumberControl', MassNumberControl );
} );
