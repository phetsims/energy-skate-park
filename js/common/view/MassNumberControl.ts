// Copyright 2019-2026, University of Colorado Boulder

/**
 * A NumberControl that controls the skater mass Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

// Mass is constrained to this interval (kg) for arrow keys, mouse, and touch.
const MASS_INTERVAL = 5;

// Finer interval (kg) used for shift+arrow key presses.
const MASS_SHIFT_INTERVAL = 1;

export default class MassNumberControl extends PhysicalNumberControl {

  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkFluent.physicalControls.massControls.massStringProperty, massProperty, massRange, userControlledProperty, tandem, {
      delta: MASS_SHIFT_INTERVAL,
      numberDisplayOptions: {
        valuePattern: {
          visualPattern: EnergySkateParkFluent.physicalControls.massControls.massKilogramsPatternStringProperty,
          accessiblePattern: EnergySkateParkFluent.a11y.massControl.accessibleValuePattern
        }
      },
      sliderOptions: {
        keyboardStep: MASS_INTERVAL,
        shiftKeyboardStep: MASS_SHIFT_INTERVAL,
        pageKeyboardStep: MASS_INTERVAL * 2,

        // Use a finer interval when shift is held so that shift+arrow can change the value rather than
        // being rounded back to the previous value. See https://github.com/phetsims/sun/issues/698.
        constrainValue: value => roundToInterval( value, this.slider.shiftKeyDown ? MASS_SHIFT_INTERVAL : MASS_INTERVAL )
      }
    } );
  }
}
