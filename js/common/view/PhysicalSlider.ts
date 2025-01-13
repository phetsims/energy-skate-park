// Copyright 2018-2025, University of Colorado Boulder

/**
 * Controls a physical value of the model. This is just a slider with a label and labeled tick marks. It extends
 * NumberControl to leverage the layout of the label and slider so that it conveniently matches the layout
 * with other NumberControls used in this sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

const controlsValueLotsStringProperty = EnergySkateParkStrings.physicalControls.lotsStringProperty;
const controlsValueNoneStringProperty = EnergySkateParkStrings.physicalControls.noneStringProperty;

export default class PhysicalSlider extends PhysicalNumberControl {

  public constructor( titleString: TReadOnlyProperty<string>, property: PhetioProperty<number>, valueRange: Range, userControlledProperty: PhetioProperty<boolean>, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      // {string} - labels for the min and max values of this control
      maxLabel: controlsValueLotsStringProperty,
      minLabel: controlsValueNoneStringProperty,

      // {*} - passed to the Slider of this NumberControl
      sliderOptions: {}
    }, options );

    // don't include any arrow buttons or the NumberDisplay for this control
    assert && assert( options.sliderOnly === undefined, 'The PhysicalSlider sets sliderOnly option' );
    options.sliderOnly = true;

    assert && assert( options.sliderOptions.majorTicks === undefined, 'The PhysicalSlider sets its own major ticks' );
    options.sliderOptions.majorTicks = [
      createTickEntry( valueRange.min, options.minLabel, tandem, 'minLabelText' ),
      createTickEntry( valueRange.max, options.maxLabel, tandem, 'maxLabelText' )
    ];

    // @ts-expect-error
    super( titleString, property, valueRange, userControlledProperty, tandem, options );
  }
}

/**
 * Create a tick entry for the slider to be added with addMajorTick.
 * @param value - value on the slider to add the tick
 * @param label - label for the tick
 * @param tandem
 * @param tandemName
 * @returns - conforms to { value: {number}, label: Node }, required by NumberControl options
 */
const createTickEntry = ( value: number, label: TReadOnlyProperty<string>, tandem: Tandem, tandemName: string ): { value: number; label: Text } => {
  return {
    value: value,
    label: new Text( label, merge( {
      tandem: tandem.createTandem( tandemName )
    }, EnergySkateParkConstants.CONTROL_TICK_LABEL_OPTIONS ) )
  };
};

energySkatePark.register( 'PhysicalSlider', PhysicalSlider );