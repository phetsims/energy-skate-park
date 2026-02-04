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
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

export default class GravitySlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem ) {
    const range = new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) );
    super(
      EnergySkateParkStrings.physicalControls.gravityControls.gravityStringProperty,
      property,
      range,
      userControlledProperty,
      tandem, {
        minLabelProperty: EnergySkateParkStrings.physicalControls.tinyStringProperty,
        sliderOptions: {
          constrainValue: value => roundToInterval( value, 1 )
        }
      } );

    this.slider.addMinorTick( range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 2 * range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 3 * range.getLength() / 5 + range.min );
    this.slider.addMinorTick( 4 * range.getLength() / 5 + range.min );
  }
}

energySkatePark.register( 'GravitySlider', GravitySlider );