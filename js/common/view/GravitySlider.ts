// Copyright 2019-2025, University of Colorado Boulder

/**
 * A slider that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalSlider from './PhysicalSlider.js';

export default class GravitySlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, tandem: Tandem ) {
    super(
      EnergySkateParkStrings.physicalControls.gravityControls.gravityStringProperty,
      property,
      new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ),
      userControlledProperty,
      tandem, {
        minLabelProperty: EnergySkateParkStrings.physicalControls.tinyStringProperty,
        sliderOptions: {
          constrainValue: value => Utils.roundToInterval( value, 1 )
        }
      } );
  }
}

energySkatePark.register( 'GravitySlider', GravitySlider );