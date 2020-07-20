// Copyright 2019-2020, University of Colorado Boulder

/**
 * A slider that controls the friction Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Range from '../../../../dot/js/Range.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsFrictionTitleString = energySkateParkStrings.physicalControls.friction;

class FrictionSlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property - Property for friction
   * @param {BooleanProperty} userControlledProperty - is the user actively controlling friction?
   * @param {Tandem} tandem
   */
  constructor( property, userControlledProperty, tandem ) {
    super( controlsFrictionTitleString, property, new Range( Constants.MIN_FRICTION, Constants.MAX_FRICTION ), userControlledProperty, tandem );
  }
}

energySkatePark.register( 'FrictionSlider', FrictionSlider );
export default FrictionSlider;