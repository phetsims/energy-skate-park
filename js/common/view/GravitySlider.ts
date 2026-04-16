// Copyright 2019-2026, University of Colorado Boulder

/**
 * A slider that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

// Gravity is constrained to this interval (m/s^2) for arrow keys, mouse, and touch.
const GRAVITY_INTERVAL = 1;

// Finer interval (m/s^2) used for shift+arrow key presses.
const GRAVITY_SHIFT_INTERVAL = 0.1;

export default class GravitySlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem ) {
    const range = new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) );
    super(
      EnergySkateParkFluent.physicalControls.gravityControls.gravityStringProperty,
      property,
      range,
      userControlledProperty,
      tandem, {
        minLabelProperty: EnergySkateParkFluent.physicalControls.tinyStringProperty,
        sliderOptions: {
          keyboardStep: GRAVITY_INTERVAL,
          shiftKeyboardStep: GRAVITY_SHIFT_INTERVAL,
          pageKeyboardStep: GRAVITY_INTERVAL * 5,

          // Use a finer interval when shift is held so that shift+arrow can change the value rather than
          // being rounded back to the previous value. See https://github.com/phetsims/sun/issues/698.
          constrainValue: value => roundToInterval( value, this.slider.shiftKeyDown ? GRAVITY_SHIFT_INTERVAL : GRAVITY_INTERVAL ),
          createAriaValueText: ( value: number ) => EnergySkateParkFluent.a11y.gravityControl.accessibleValuePattern.format( {
            value: toFixed( value, 1 ),
            units: 'metersPerSecondSquared'
          } )
        },
        valueChangeSoundGeneratorOptions: {
          numberOfMiddleThresholds: ( range.getLength() / GRAVITY_INTERVAL ) - 1
        }
      } );

  }
}
