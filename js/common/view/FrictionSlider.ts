// Copyright 2019-2025, University of Colorado Boulder

/**
 * A slider that controls the friction Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

export default class FrictionSlider extends PhysicalSlider {

  /**
   * @param property - Property for friction
   * @param userControlledProperty - is the user actively controlling friction?
   * @param tandem
   */
  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem ) {
    super( EnergySkateParkStrings.physicalControls.frictionStringProperty, property, new Range( EnergySkateParkConstants.MIN_FRICTION, EnergySkateParkConstants.MAX_FRICTION ), userControlledProperty, tandem, {
      sliderOptions: {
        constrainValue: value => roundToInterval( value, 0.005 )
      }
    } );
  }
}

energySkatePark.register( 'FrictionSlider', FrictionSlider );