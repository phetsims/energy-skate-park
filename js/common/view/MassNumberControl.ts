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
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

export default class MassNumberControl extends PhysicalNumberControl {

  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkFluent.physicalControls.massControls.massStringProperty, massProperty, massRange, userControlledProperty, tandem, {
      numberDisplayOptions: {
        valuePattern: EnergySkateParkFluent.physicalControls.massControls.massKilogramsPatternStringProperty
      },
      sliderOptions: {
        // round to nearest 5 kg, as requested by design team
        constrainValue: value => roundToInterval( value, 5 )
      }
    } );
  }
}

energySkatePark.register( 'MassNumberControl', MassNumberControl );