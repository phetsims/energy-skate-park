// Copyright 2019, University of Colorado Boulder

/**
 * A slider that controls the friction Property of energy skate park.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhysicalSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalSlider' );
  const Range = require( 'DOT/Range' );

  // strings
  var controlsFrictionTitleString = require( 'string!ENERGY_SKATE_PARK/controls.friction.title' );

  class FrictionSlider extends PhysicalSlider {
    constructor( property, tandem ) {
      super( controlsFrictionTitleString, property, new Range( Constants.MIN_FRICTION, Constants.MAX_FRICTION ), tandem );
    }
  }

  return energySkatePark.register( 'FrictionSlider', FrictionSlider );
} );
