// Copyright 2013-2020, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Range = require( 'DOT/Range' );

  // for zoom buttons for bar graphs, pressing button will increase/decrease scale by this much
  const ZOOM_FACTOR_DELTA = 1 / 60;

  const EARTH_GRAVITY = 9.8;
  const MOON_GRAVITY = 1.62;
  const JUPITER_GRAVITY = 25.96;

  const Constants = {
    SLIDER_OPTIONS: {
      thumbSize: new Dimension2( 10, 20 ),
      trackSize: new Dimension2( 80, 3 ),
      tickLabelSpacing: 0,
      majorTickLength: 10
    },

    // font for labels of physical controls
    CONTROL_TITLE_FONT: new PhetFont( { weight: 'bold', size: 12 } ),
    CONTROL_TICK_LABEL_OPTIONS: {
      font: new PhetFont( 10 ),
      maxWidth: 25 // selected by choosing the length of widest English string in ?stringTest=doubl
    },

    // options for the ComboBoxes in this sim
    COMBO_BOX_OPTIONS: {
      xMargin: 10,
      yMargin: 6
    },
    COMBO_BOX_ITEM_OPTIONS: { font: new PhetFont( 11 ), maxWidth: 80 },

    // Control points are replenished in the toolbox as they are destroyed (by connecting) in the play area
    // This is the maximum number of control points available to the user.
    MAX_NUMBER_CONTROL_POINTS: 15,

    // for the bar graphs, factors multiplied by physical values to produce heights in view coordinates
    ZOOM_FACTOR_DELTA: ZOOM_FACTOR_DELTA,
    MAX_ZOOM_FACTOR: 9 * ZOOM_FACTOR_DELTA,
    MIN_ZOOM_FACTOR: ZOOM_FACTOR_DELTA / 3,

    // coefficients of friction, default values are not common
    MIN_FRICTION: 0,
    MAX_FRICTION: 0.05 * 2,
    DEFAULT_FRICTION: 0.05,

    // in m/s^2, including direction (naming aligned with magnitude for readability at usages)
    MAX_GRAVITY: -JUPITER_GRAVITY,
    MIN_GRAVITY: -1,

    // pre-determined gravities
    EARTH_GRAVITY: EARTH_GRAVITY,
    MOON_GRAVITY: MOON_GRAVITY,
    JUPITER_GRAVITY: JUPITER_GRAVITY,

    REFERENCE_HEIGHT_RANGE: new Range( 0, 8 ) // in meters
  };

  energySkatePark.register( 'Constants', Constants );

  return Constants;
} );