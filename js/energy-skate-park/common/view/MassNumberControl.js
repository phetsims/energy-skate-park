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
  var controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );

  class MassNumberControl extends PhysicalNumberControl {
    constructor( massProperty, massRange, tandem ) {
      super( controlsMassString, massProperty, massRange, tandem );
    }
  }

  return energySkatePark.register( 'MassNumberControl', MassNumberControl );
} );
