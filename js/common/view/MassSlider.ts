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
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import PhysicalSlider from './PhysicalSlider.js';

export default class MassSlider extends PhysicalSlider {

  public constructor( property: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem ) {

    super( EnergySkateParkFluent.physicalControls.massControls.massStringProperty, property, massRange, userControlledProperty, tandem, {
      minLabelProperty: EnergySkateParkFluent.physicalControls.smallStringProperty,
      maxLabelProperty: EnergySkateParkFluent.physicalControls.largeStringProperty,
      sliderOptions: {
        constrainValue: value => Utils.roundToInterval( value, 5 )
      }
    } );

    this.slider.addMinorTick( massRange.getLength() / 5 + massRange.min );
    this.slider.addMinorTick( 2 * massRange.getLength() / 5 + massRange.min );
    this.slider.addMinorTick( 3 * massRange.getLength() / 5 + massRange.min );
    this.slider.addMinorTick( 4 * massRange.getLength() / 5 + massRange.min );

  }
}

energySkatePark.register( 'MassSlider', MassSlider );