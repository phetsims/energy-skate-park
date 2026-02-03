// Copyright 2019-2025, University of Colorado Boulder

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
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl, { PhysicalNumberControlOptions } from './PhysicalNumberControl.js';

export default class GravityNumberControl extends PhysicalNumberControl {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem, providedOptions?: PhysicalNumberControlOptions ) {
    const options = combineOptions<PhysicalNumberControlOptions>( {
      decimalPlaces: 1,
      numberDisplayOptions: {
        valuePattern: EnergySkateParkStrings.physicalControls.gravityControls.gravityMetersPerSecondSquaredPatternStringProperty,
        useRichText: true
      },
      delta: 0.1,
      sliderOptions: {
        constrainValue: ( value: number ) => roundToInterval( value, 1 )
      }
    }, providedOptions );

    super( EnergySkateParkStrings.physicalControls.gravityControls.gravityStringProperty, property, new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ), userControlledProperty, tandem, options );
  }
}

energySkatePark.register( 'GravityNumberControl', GravityNumberControl );