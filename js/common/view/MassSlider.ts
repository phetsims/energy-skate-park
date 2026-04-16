// Copyright 2019-2026, University of Colorado Boulder

/**
 * A slider that controls the mass Property of the skater in energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import PhysicalSlider from './PhysicalSlider.js';

// Mass is constrained to this interval (kg) for arrow keys, mouse, and touch.
const MASS_INTERVAL = 5;

// Finer interval (kg) used for shift+arrow key presses.
const MASS_SHIFT_INTERVAL = 1;

export default class MassSlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkFluent.physicalControls.massControls.massStringProperty, property, massRange, userControlledProperty, tandem, {
      minLabelProperty: EnergySkateParkFluent.physicalControls.smallStringProperty,
      maxLabelProperty: EnergySkateParkFluent.physicalControls.largeStringProperty,
      sliderOptions: {
        keyboardStep: MASS_INTERVAL,
        shiftKeyboardStep: MASS_SHIFT_INTERVAL,
        pageKeyboardStep: MASS_INTERVAL * 2,

        // Use a finer interval when shift is held so that shift+arrow can change the value rather than
        // being rounded back to the previous value. See https://github.com/phetsims/sun/issues/698.
        constrainValue: value => Utils.roundToInterval( value, this.slider.shiftKeyDown ? MASS_SHIFT_INTERVAL : MASS_INTERVAL ),
        createAriaValueText: ( value: number ) => EnergySkateParkFluent.a11y.massControl.accessibleValuePattern.format( {
          value: toFixed( value, 0 )
        } )
      }
    } );

  }
}
