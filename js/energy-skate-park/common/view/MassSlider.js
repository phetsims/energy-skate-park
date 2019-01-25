// Copyright 2018, University of Colorado Boulder

/**
 * A slider that controls the mass Property of the skater in energy skate park.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhysicalSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalSlider' );

  // strings
  const controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );
  const smallString = require( 'string!ENERGY_SKATE_PARK/small' );
  const largeString = require( 'string!ENERGY_SKATE_PARK/large' );

  class MassSlider extends PhysicalSlider {
    constructor( property, massRange, tandem ) {
      super( property, massRange, controlsMassString, tandem, {
        minLabel: smallString,
        maxLabel: largeString
      } );
    }
  }

  return energySkatePark.register( 'MassSlider', MassSlider );
} );
