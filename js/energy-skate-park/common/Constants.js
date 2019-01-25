// Copyright 2013-2018, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Range = require( 'DOT/Range' );

  var minMass = 5;// kg
  var maxMass = 100;

  // for zoom buttons for bar graphs, pressing button will increase/decrease scale by this much
  var ZOOM_FACTOR_DELTA = 1 / 60;

  var Constants = {
    SLIDER_OPTIONS: {
      thumbSize: new Dimension2( 10, 22 ),
      trackSize: new Dimension2( 100, 4 ),
      tickLabelSpacing: 0,
      majorTickLength: 10
    },

    // font for labels of physical controls
    CONTROL_TITLE_FONT: new PhetFont( { weight: 'bold', size: 12 } ),
    CONTROL_TICK_LABEL_OPTIONS: {
      font: new PhetFont( 10 ),
      maxWidth: 54 // selected by choosing the length of widest English string in ?stringTest=doubl
    },

    // for the bar graphs, factors multiplied by physical values to produce heights in view coordinates
    ZOOM_FACTOR_DELTA: ZOOM_FACTOR_DELTA,
    MAX_ZOOM_FACTOR: 9 * ZOOM_FACTOR_DELTA,
    MIN_ZOOM_FACTOR: ZOOM_FACTOR_DELTA / 3,

    DEFAULT_MASS: (minMass + maxMass) / 2,
    MIN_MASS: minMass,
    MAX_MASS: maxMass,
    MASS_RANGE: new Range( minMass, maxMass ),

    // coefficients of friction, default values are not common
    MIN_FRICTION: 0,
    MAX_FRICTION: 0.05 * 2,
    DEFAULT_FRICTION: 0.05,

    // in m/s^2, including direction (naming aligned with magnitude for readability at usages)
    MAX_GRAVITY: -20,
    MIN_GRAVITY: -1,

    REFERENCE_HEIGHT_RANGE: new Range( 0, 8 ) // in meters
  };

  energySkatePark.register( 'Constants', Constants );

  return Constants;
} );