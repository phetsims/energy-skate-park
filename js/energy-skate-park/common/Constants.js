// Copyright 2013-2019, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Range = require( 'DOT/Range' );

  // Must accommodate all values in SkaterMasses
  const minMass = 0.2;// kg
  const maxMass = 100;

  // for zoom buttons for bar graphs, pressing button will increase/decrease scale by this much
  const ZOOM_FACTOR_DELTA = 1 / 60;

  const EARTH_GRAVITY = 9.8;
  const MOON_GRAVITY = 1.62;
  const JUPITER_GRAVITY = 25.96;

  const massRange = new Range( minMass, maxMass );

  Object.keys( SkaterMasses ).forEach( key => {
    assert && assert( massRange.contains( SkaterMasses[ key ] ), 'mass range should accommodate all SkaterMasses values' );
  } );

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

    // for the bar graphs, factors multiplied by physical values to produce heights in view coordinates
    ZOOM_FACTOR_DELTA: ZOOM_FACTOR_DELTA,
    MAX_ZOOM_FACTOR: 9 * ZOOM_FACTOR_DELTA,
    MIN_ZOOM_FACTOR: ZOOM_FACTOR_DELTA / 3,

    DEFAULT_MASS: SkaterMasses.STAR_SKATER_MASS,
    MIN_MASS: minMass,
    MAX_MASS: maxMass,
    MASS_RANGE: massRange,

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