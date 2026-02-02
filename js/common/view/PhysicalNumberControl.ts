// Copyright 2019-2026, University of Colorado Boulder

/**
 * A NumberControl that controls a physical value of the model in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import NumberControl, { NumberControlOptions, NumberControlSliderOptions } from '../../../../scenery-phet/js/NumberControl.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import Slider from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';

type SelfOptions = {

  // decimal places for the ticks and (by default) the NumberControl's NumberDisplay
  decimalPlaces?: number;

  // if true, the tweaker buttons and number display will be hidden (but rest of NumberControl title
  // and layout will be preserved)
  sliderOnly?: boolean;
};

export type PhysicalNumberControlOptions = SelfOptions & NumberControlOptions;

export default class PhysicalNumberControl extends NumberControl {

  public constructor( titleString: TReadOnlyProperty<string>, property: NumberProperty, valueRange: Range, userControlledProperty: BooleanProperty, tandem: Tandem, providedOptions?: PhysicalNumberControlOptions ) {
    providedOptions = providedOptions || {};
    assert && assert( providedOptions.layoutFunction === undefined, 'PhysicalNumberControl sets layoutFunction' );
    assert && assert( providedOptions.tandem === undefined, 'PhysicalNumberControl shouldn\'t set tandem in options' );
    assert && assert( providedOptions.arrowButtonOptions === undefined, 'PhysicalNumberControl sets arrowButtonOptions' );

    if ( providedOptions.numberDisplayOptions ) {
      if ( providedOptions.numberDisplayOptions.textOptions ) {
        assert && assert( providedOptions.numberDisplayOptions.textOptions.font === undefined, 'PhysicalNumberControl sets font' );
      }
      assert && assert( providedOptions.numberDisplayOptions.xMargin === undefined, 'PhysicalNumberControl sets xMargin' );
      assert && assert( providedOptions.numberDisplayOptions.yMargin === undefined, 'PhysicalNumberControl sets yMargin' );
    }

    const options = optionize<PhysicalNumberControlOptions, SelfOptions, NumberControlOptions>()( {
      decimalPlaces: 0,
      startCallback: () => {
        userControlledProperty.set( true );
      },
      endCallback: () => {
        userControlledProperty.set( false );
      },
      sliderOnly: false
    }, providedOptions );

    options.sliderOptions = combineOptions<NumberControlSliderOptions>( {
      majorTicks: [
        {
          value: valueRange.min,
          label: new Text( Utils.toFixed( valueRange.min, options.decimalPlaces ), EnergySkateParkConstants.CONTROL_TICK_LABEL_OPTIONS )
        },
        {
          value: valueRange.max,
          label: new Text( Utils.toFixed( valueRange.max, options.decimalPlaces ), EnergySkateParkConstants.CONTROL_TICK_LABEL_OPTIONS )
        }
      ]
    }, EnergySkateParkConstants.SLIDER_OPTIONS, options.sliderOptions );

    if ( options.sliderOnly ) {

      // if we are not including tweaker buttons, don't constrain slider value to tweaker deltas
      options.sliderOptions.constrainValue = options.sliderOptions.constrainValue || _.identity;
    }

    options.numberDisplayOptions = merge( {
      decimalPlaces: options.decimalPlaces
    }, options.numberDisplayOptions );

    // look and feel for all PhysicalNumberControls (not set in normal options extend calls because they cannot be
    // changed with options!)
    merge( options, {
      arrowButtonOptions: {
        scale: 0.61
      },

      /**
       * Custom layout for the NumberControl - if the slider is the only form of input for the control the tweaker
       * and number display are hidden. But we still have the same layout for the title so that this matches other
       * NumberControls used in energy-skate-park.
       */
      layoutFunction: ( titleNode: Node, numberDisplay: NumberDisplay, slider: Slider, leftArrowButton: ArrowButton, rightArrowButton: ArrowButton ): Node => {

        // default layout, once done we will hide extra components if this is only meant to display the slider
        const defaultLayoutFunction = NumberControl.createLayoutFunction4( {

          // arrow buttons a bit tighter than default to provide more room for content in screens
          arrowButtonSpacing: 2,

          // can be multiple physical controls in a panel, need to make some extra space
          verticalSpacing: 2,

          layoutInvisibleButtons: true
        } );
        const children = defaultLayoutFunction( titleNode, numberDisplay, slider, leftArrowButton, rightArrowButton );

        if ( options.sliderOnly ) {
          leftArrowButton.visible = false;
          rightArrowButton.visible = false;
          numberDisplay.visible = false;
        }

        return children;
      },
      sliderOptions: options.sliderOptions,
      numberDisplayOptions: merge( options.numberDisplayOptions, {
        xMargin: 2,
        yMargin: 2,
        textOptions: {
          font: new PhetFont( 12 ),
          maxWidth: 61
        }
      } ),
      titleNodeOptions: {
        font: EnergySkateParkConstants.CONTROL_TITLE_FONT,
        maxWidth: 61
      },

      // phet-io
      tandem: tandem
    } );

    super( titleString, property, valueRange, options );
  }
}

energySkatePark.register( 'PhysicalNumberControl', PhysicalNumberControl );