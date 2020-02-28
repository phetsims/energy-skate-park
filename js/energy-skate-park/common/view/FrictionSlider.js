// Copyright 2019-2020, University of Colorado Boulder

/**
 * A slider that controls the friction Property of energy skate park.
 * @author Jesse Greenberg
 */

import Range from '../../../../../dot/js/Range.js';
import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsFrictionTitleString = energySkateParkStrings.controls.friction.title;

class FrictionSlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property - Property for friction
   * @param {Tandem} tandem
   */
  constructor( property, tandem ) {
    super( controlsFrictionTitleString, property, new Range( Constants.MIN_FRICTION, Constants.MAX_FRICTION ), tandem );
  }
}

energySkatePark.register( 'FrictionSlider', FrictionSlider );
export default FrictionSlider;