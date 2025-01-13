// Copyright 2019-2025, University of Colorado Boulder

/**
 * A NumberControl that controls the skater mass Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';
import Range from '../../../../dot/js/Range.js';

class MassNumberControl extends PhysicalNumberControl {

  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkStrings.physicalControls.massControls.massStringProperty, massProperty, massRange, userControlledProperty, tandem, {
      numberDisplayOptions: {
        valuePattern: EnergySkateParkStrings.physicalControls.massControls.massKilogramsPatternStringProperty
      },
      sliderOptions: {

        // round to nearest 5 kg, as requested by design team
        // @ts-expect-error
        constrainValue: value => Utils.roundToInterval( value, 5 )
      }
    } );
  }
}

energySkatePark.register( 'MassNumberControl', MassNumberControl );
export default MassNumberControl;