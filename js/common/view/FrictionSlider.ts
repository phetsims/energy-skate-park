// Copyright 2019-2026, University of Colorado Boulder

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
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

// Friction is constrained to this interval.
const FRICTION_INTERVAL = 0.005;

export default class FrictionSlider extends PhysicalSlider {

  /**
   * @param property - Property for friction
   * @param userControlledProperty - is the user actively controlling friction?
   * @param tandem
   */
  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem ) {
    const range = new Range( EnergySkateParkConstants.MIN_FRICTION, EnergySkateParkConstants.MAX_FRICTION );
    super( EnergySkateParkFluent.physicalControls.frictionStringProperty, property, range, userControlledProperty, tandem, {
      sliderOptions: {
        constrainValue: value => roundToInterval( value, FRICTION_INTERVAL )
      },
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: ( range.getLength() / FRICTION_INTERVAL ) - 1
      },
      accessibleHelpText: EnergySkateParkFluent.a11y.frictionSlider.accessibleHelpTextStringProperty
    } );

    this.slider.addMinorTick( range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 2 * range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 3 * range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 4 * range.getLength() / 5 + range.min );
  }
}

energySkatePark.register( 'FrictionSlider', FrictionSlider );