// Copyright 2018-2019, University of Colorado Boulder

/**
 * Constants related to the skater in Energy Skate Park.
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

  const SkaterMasses = {

    // masses of skater objects in the intro screen, in kg
    PHET_SKATER_MASS: 75,
    STAR_SKATER_MASS: 60,
    BULLDOG_MASS: 20,
    BUG_MASS: 1,
    BALL_MASS: 5
  };

  energySkatePark.register( 'SkaterMasses', SkaterMasses );

  return SkaterMasses;
} );