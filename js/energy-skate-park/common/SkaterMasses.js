// Copyright 2018-2020, University of Colorado Boulder

/**
 * Constants related to the skater in Energy Skate Park.
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Range from '../../../../dot/js/Range.js';
import energySkatePark from '../../energySkatePark.js';

// constants
const MIN_MASS = 1;
const MAX_MASS = 100;

const SkaterMasses = {

  // masses of skater objects in the intro screen, in kg
  SKATER_1_MASS: 60,
  SKATER_2_MASS: 35,
  SKATER_3_MASS: 40,
  SKATER_4_MASS: 65,
  SKATER_5_MASS: 80,
  DOG_MASS: 30,

  // min/max masses for the skater when a range of masses is allowed
  MIN_MASS: 1,
  MAX_MASS: 100,
  MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
};

energySkatePark.register( 'SkaterMasses', SkaterMasses );

export default SkaterMasses;