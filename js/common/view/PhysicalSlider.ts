// Copyright 2018-2025, University of Colorado Boulder

/**
 * Controls a physical value of the model. This is just a slider with a label and labeled tick marks. It extends
 * NumberControl to leverage the layout of the label and slider so that it conveniently matches the layout
 * with other NumberControls used in this sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { SliderOptions } from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl, { PhysicalNumberControlOptions } from './PhysicalNumberControl.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

const controlsValueLotsStringProperty = EnergySkateParkStrings.physicalControls.lotsStringProperty;
const controlsValueNoneStringProperty = EnergySkateParkStrings.physicalControls.noneStringProperty;

type SelfOptions = {
  // labels for the min and max values of this control
  maxLabelProperty?: TReadOnlyProperty<string>;
  minLabelProperty?: TReadOnlyProperty<string>;

  // passed to the Slider of this NumberControl
  sliderOptions?: SliderOptions;
};

type PhysicalSliderOptions = SelfOptions & PhysicalNumberControlOptions;

export default class PhysicalSlider extends PhysicalNumberControl {

  public constructor( titleString: TReadOnlyProperty<string>, property: NumberProperty, valueRange: Range, userControlledProperty: BooleanProperty, tandem: Tandem, providedOptions?: PhysicalSliderOptions ) {

    const options = optionize<PhysicalSliderOptions, SelfOptions>()( {
      maxLabelProperty: controlsValueLotsStringProperty,
      minLabelProperty: controlsValueNoneStringProperty,
      sliderOptions: {}
    }, providedOptions );

    // don't include any arrow buttons or the NumberDisplay for this control
    affirm( options.sliderOnly === undefined, 'The PhysicalSlider sets sliderOnly option' );
    options.sliderOnly = true;

    affirm( options.sliderOptions.majorTicks === undefined, 'The PhysicalSlider sets its own major ticks' );
    options.sliderOptions.majorTicks = [
      createTickEntry( valueRange.min, options.minLabelProperty, tandem, 'minLabelText' ),
      createTickEntry( valueRange.max, options.maxLabelProperty, tandem, 'maxLabelText' )
    ];

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