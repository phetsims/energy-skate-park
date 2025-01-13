// Copyright 2019-2025, University of Colorado Boulder

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
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import PhysicalSlider from './PhysicalSlider.js';

export default class MassSlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkStrings.physicalControls.massControls.massStringProperty, property, massRange, userControlledProperty, tandem, {
      minLabel: EnergySkateParkStrings.physicalControls.smallStringProperty,
      maxLabel: EnergySkateParkStrings.physicalControls.largeStringProperty,
      sliderOptions: {

        // @ts-expect-error
        constrainValue: value => Utils.roundToInterval( value, 5 )
      }
    } );
  }
}

energySkatePark.register( 'MassSlider', MassSlider );