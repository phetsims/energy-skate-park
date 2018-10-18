// Copyright 2013-2017, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Range = require( 'DOT/Range' );

  var minMass = 25;// kg
  var maxMass = 100;

  var Constants = {
    SLIDER_OPTIONS: {
      thumbSize: new Dimension2( 13, 30 ),
      tickLabelSpacing: 0,
      majorTickLength: 15
    },

    DEFAULT_MASS: (minMass + maxMass) / 2,
    MIN_MASS: minMass,
    MAX_MASS: maxMass,

    REFERENCE_HEIGHT_RANGE: new Range( 0, 8 ) // in meters
  };

  energySkatePark.register( 'Constants', Constants );

  return Constants;
} );