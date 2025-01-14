// Copyright 2018-2025, University of Colorado Boulder

/**
 * EnergySkateParkConstants related to the skater in Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Range from '../../../dot/js/Range.js';
import energySkatePark from '../energySkatePark.js';

// constants
const MIN_MASS = 5;
const MAX_MASS = 100;

const SkaterMasses = {

  // masses of skater objects in the intro screen, in kg
  SKATER_1_MASS: 60,

  // min/max masses for the skater when a range of masses is allowed
  MIN_MASS: MIN_MASS,
  MAX_MASS: MAX_MASS,
  MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
};

energySkatePark.register( 'SkaterMasses', SkaterMasses );

export default SkaterMasses;