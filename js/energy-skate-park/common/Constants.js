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

  // for zoom buttons for bar graphs, pressing button will increase/decrease scale by this much
  var ZOOM_FACTOR_DELTA = 1 / 60;

  var Constants = {
    SLIDER_OPTIONS: {
      thumbSize: new Dimension2( 13, 30 ),
      tickLabelSpacing: 0,
      majorTickLength: 15
    },

    // for the bar graphs, factors multiplied by physical values to produce heights in view coordinates
    ZOOM_FACTOR_DELTA: ZOOM_FACTOR_DELTA,
    MAX_ZOOM_FACTOR: 8 * ZOOM_FACTOR_DELTA,
    MIN_ZOOM_FACTOR: ZOOM_FACTOR_DELTA / 3,

    DEFAULT_MASS: (minMass + maxMass) / 2,
    MIN_MASS: minMass,
    MAX_MASS: maxMass,

    // in m/s^2, including direction (naming aligned with magnitude for readability at usages)
    MAX_GRAVITY: -15,
    MIN_GRAVITY: -0.1,

    REFERENCE_HEIGHT_RANGE: new Range( 0, 8 ) // in meters
  };

  energySkatePark.register( 'Constants', Constants );

  return Constants;
} );