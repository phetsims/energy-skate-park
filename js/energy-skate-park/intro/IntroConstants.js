// Copyright 2018, University of Colorado Boulder

/**
 * Constants used in the intro screen.
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

  const IntroConstants = {

    // masses of skater objects in the intro screen, in kg
    PHET_SKATER_MASS: 75,
    STAR_SKATER_MASS: 60,
    BULLDOG_MASS: 20,
    BUG_MASS: 0.2,
    BALL_MASS: 5
  };

  energySkatePark.register( 'IntroConstants', IntroConstants );

  return IntroConstants;
} );