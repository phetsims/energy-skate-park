// Copyright 2019-2022, University of Colorado Boulder

/**
 * A slider that controls the friction Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Range from '../../../../dot/js/Range.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

class FrictionSlider extends PhysicalSlider {

  /**
   * @param property - Property for friction
   * @param userControlledProperty - is the user actively controlling friction?
   * @param tandem
   */
  public constructor( property: PhetioProperty<number>, userControlledProperty: PhetioProperty<boolean>, tandem: Tandem ) {
    super( EnergySkateParkStrings.physicalControls.frictionStringProperty, property, new Range( EnergySkateParkConstants.MIN_FRICTION, EnergySkateParkConstants.MAX_FRICTION ), userControlledProperty, tandem );
  }
}

energySkatePark.register( 'FrictionSlider', FrictionSlider );
export default FrictionSlider;