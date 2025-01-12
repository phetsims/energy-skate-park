// Copyright 2019-2022, University of Colorado Boulder

/**
 * A NumberControl that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

class GravityNumberControl extends PhysicalNumberControl {

  public constructor( property: PhetioProperty<number>, userControlledProperty: PhetioProperty<boolean>, tandem: Tandem, options?: IntentionalAny ) {
    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      decimalPlaces: 1,
      numberDisplayOptions: {
        valuePattern: EnergySkateParkStrings.physicalControls.gravityControls.gravityMetersPerSecondSquaredPatternStringProperty,
        useRichText: true // for the superscript on units
      },
      delta: 0.1,
      sliderOptions: {

        // @ts-expect-error
        constrainValue: value => Utils.roundToInterval( value, 1 )
      }
    }, options );
    // @ts-expect-error
    super( EnergySkateParkStrings.physicalControls.gravityControls.gravityStringProperty, property, new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ), userControlledProperty, tandem, options );
  }
}

energySkatePark.register( 'GravityNumberControl', GravityNumberControl );
export default GravityNumberControl;