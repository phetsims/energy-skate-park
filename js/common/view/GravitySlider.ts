// Copyright 2019-2022, University of Colorado Boulder

/**
 * A slider that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

class GravitySlider extends PhysicalSlider {

  public constructor( property: PhetioProperty<number>, userControlledProperty: PhetioProperty<boolean>, tandem: Tandem ) {
    super(
      EnergySkateParkStrings.physicalControls.gravityControls.gravityStringProperty,
      property,
      // @ts-expect-error
      new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ),
      userControlledProperty,
      tandem, {
        minLabel: EnergySkateParkStrings.physicalControls.tinyStringProperty,
        sliderOptions: {

          // @ts-expect-error
          constrainValue: value => Utils.roundToInterval( value, 1 )
        }
      } );
  }
}

energySkatePark.register( 'GravitySlider', GravitySlider );
export default GravitySlider;