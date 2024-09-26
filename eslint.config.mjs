// Copyright 2024, University of Colorado Boulder

/**
 * ESlint configuration for energy-skate-park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import parent from '../chipper/eslint/sim.eslint.config.mjs';

export default [
  ...parent,
  {
    languageOptions: {
      globals: {
        numeric: 'readonly'
      }
    }
  }
];