// Copyright 2019-2026, University of Colorado Boulder

/**
 * A NumberControl that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl, { PhysicalNumberControlOptions } from './PhysicalNumberControl.js';

// Gravity is constrained to this interval (m/s^2) for arrow keys, mouse, and touch.
const GRAVITY_INTERVAL = 1;

// Finer interval (m/s^2) used for shift+arrow key presses.
const GRAVITY_SHIFT_INTERVAL = 0.1;

export default class GravityNumberControl extends PhysicalNumberControl {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem, providedOptions?: PhysicalNumberControlOptions ) {
    const options = combineOptions<PhysicalNumberControlOptions>( {
      decimalPlaces: 1,
      numberDisplayOptions: {
        valuePattern: EnergySkateParkFluent.physicalControls.gravityControls.gravityMetersPerSecondSquaredPatternStringProperty,
        useRichText: true
      },
      delta: GRAVITY_SHIFT_INTERVAL,
      sliderOptions: {
        keyboardStep: GRAVITY_INTERVAL,
        shiftKeyboardStep: GRAVITY_SHIFT_INTERVAL,
        pageKeyboardStep: GRAVITY_INTERVAL * 5,

        // Use a finer interval when shift is held so that shift+arrow can change the value (and produce sound)
        // rather than being rounded back to the previous value. See https://github.com/phetsims/sun/issues/698.
        constrainValue: ( value: number ) => {
          const shift = this.slider.shiftKeyDown;
          const interval = shift ? GRAVITY_SHIFT_INTERVAL : GRAVITY_INTERVAL;
          const result = roundToInterval( value, interval );
          return result;
        }
      }
    }, providedOptions );

    super( EnergySkateParkFluent.physicalControls.gravityControls.gravityStringProperty, property, new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ), userControlledProperty, tandem, options );
  }
}
