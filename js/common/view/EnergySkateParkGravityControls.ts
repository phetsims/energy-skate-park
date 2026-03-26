// Copyright 2020-2026, University of Colorado Boulder

/**
 * A collection of controls for EnergySkateParkControlPanel that pertain to gravity.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import { SliderOptions } from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import { AccelerationUnits } from '../model/EnergySkateParkPreferencesModel.js';
import GravityComboBox from './GravityComboBox.js';
import GravityNumberControl from './GravityNumberControl.js';
import GravitySlider from './GravitySlider.js';

type SelfOptions = {

  // whether a GravitySlider is included in this set of controls, only GravitySlider or GravityNumberControl can be used at one time
  includeGravitySlider?: boolean;

  // whether a GravityNumberControl is included in this set of controls, only GravitySlider or GravityNumberControl can be used at one time
  includeGravityNumberControl?: boolean;

  // whether a GravityComboBox is included in this set of controls
  includeGravityComboBox?: boolean;

  // options passed to the GravityNumberControl, if one is included
  gravityNumberControlOptions?: NumberControlOptions | null;

  // options passed to the GravityComboBox, if one is included
  gravityComboBoxOptions?: ComboBoxOptions | null;

  // options passed to the GravitySlider, if one is included
  gravitySliderOptions?: SliderOptions | null;
};

export type EnergySkateParkGravityControlsOptions = SelfOptions & VBoxOptions;

export default class EnergySkateParkGravityControls extends VBox {

  /**
   * @param gravityMagnitudeProperty
   * @param userControlledProperty
   * @param accelerationUnitsProperty - controls the units to display acceleration
   * @param resetEmitter - broadcasts a message when the EnergySkateParkModel is reset
   * @param listParent - parent Node for the ComboBox, if one is included
   * @param tandem
   * @param [providedOptions]
   */
  public constructor( gravityMagnitudeProperty: NumberProperty, userControlledProperty: BooleanProperty, accelerationUnitsProperty: EnumerationProperty<AccelerationUnits>, resetEmitter: Emitter,
                      listParent: Node, tandem: Tandem, providedOptions?: EnergySkateParkGravityControlsOptions ) {

    const options = optionize<EnergySkateParkGravityControlsOptions, SelfOptions, VBoxOptions>()( {
      includeGravitySlider: false,
      includeGravityNumberControl: true,
      includeGravityComboBox: false,
      gravityNumberControlOptions: null,
      gravityComboBoxOptions: null,
      gravitySliderOptions: null
    }, providedOptions );

    affirm( !( options.includeGravitySlider && options.includeGravityNumberControl ), 'only GravitySlider OR GravityNumberControl can be used at one time' );

    const children = [];

    if ( options.includeGravityNumberControl ) {

      // The user is able to control the units of gravity with query parameter and checkbox. NumberControl/NumberDisplay
      // does not support changing the valuePattern so we need to create two NumberControls and swap visibility.
      if ( options.gravityNumberControlOptions && options.gravityNumberControlOptions.numberDisplayOptions ) {
        affirm( !options.gravityNumberControlOptions.numberDisplayOptions.valuePattern,
          'valuePattern of the gravity number control is set by EnergySkateParkGravityControls' );
      }
      const unitsStringProperty = accelerationUnitsProperty.derived(
        units => units === AccelerationUnits.METERS_PER_SECOND_SQUARED ? 'metersPerSecondSquared' : 'newtonsPerKilogram'
      );
      const createAriaValueText = () => EnergySkateParkFluent.a11y.gravityControl.accessibleValuePattern.format( {
        value: toFixed( gravityMagnitudeProperty.value, 1 ),
        units: unitsStringProperty.value
      } );

      const isMetersPerSecondSquaredProperty = accelerationUnitsProperty.derived( units => units === AccelerationUnits.METERS_PER_SECOND_SQUARED );
      const isNewtonsPerKilogramProperty = accelerationUnitsProperty.derived( units => units === AccelerationUnits.NEWTONS_PER_KILOGRAM );

      const metersPerSecondSquaredTandem = tandem.createTandem( 'gravityInMetersPerSecondSquaredControl' );
      const newtonsPerKilogramTandem = tandem.createTandem( 'gravityInNewtonsPerKilogramControl' );

      const gravityControlInMetersPerSecondSquared = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, metersPerSecondSquaredTandem, merge( {}, options.gravityNumberControlOptions, {
        visibleProperty: new GatedVisibleProperty( isMetersPerSecondSquaredProperty, metersPerSecondSquaredTandem ),
        sliderOptions: { createAriaValueText: createAriaValueText }
      } ) );
      const gravityControlInNewtonsPerKilogram = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, newtonsPerKilogramTandem, merge( {}, options.gravityNumberControlOptions, {
          visibleProperty: new GatedVisibleProperty( isNewtonsPerKilogramProperty, newtonsPerKilogramTandem ),
          numberDisplayOptions: {
            valuePattern: EnergySkateParkFluent.physicalControls.gravityControls.gravityNewtonsPerKilogramPatternStringProperty
          },
          sliderOptions: { createAriaValueText: createAriaValueText }
        } )
      );

      gravityControlInMetersPerSecondSquared.slider.descriptionDependencies = [ accelerationUnitsProperty ];
      gravityControlInNewtonsPerKilogram.slider.descriptionDependencies = [ accelerationUnitsProperty ];

      gravityControlInMetersPerSecondSquared.accessibleHelpText = EnergySkateParkFluent.a11y.gravityControl.accessibleHelpTextStringProperty;
      gravityControlInNewtonsPerKilogram.accessibleHelpText = EnergySkateParkFluent.a11y.gravityControl.accessibleHelpTextStringProperty;

      children.push( gravityControlInMetersPerSecondSquared );
      children.push( gravityControlInNewtonsPerKilogram );
    }

    if ( options.includeGravitySlider ) {
      const gravitySlider = new GravitySlider( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityControl' ) );
      gravitySlider.accessibleHelpText = EnergySkateParkFluent.a11y.gravitySlider.accessibleHelpTextStringProperty;

      const sliderUnitsStringProperty = accelerationUnitsProperty.derived(
        units => units === AccelerationUnits.METERS_PER_SECOND_SQUARED ? 'metersPerSecondSquared' : 'newtonsPerKilogram'
      );
      gravitySlider.slider.createAriaValueText = () => EnergySkateParkFluent.a11y.gravityControl.accessibleValuePattern.format( {
        value: toFixed( gravityMagnitudeProperty.value, 1 ),
        units: sliderUnitsStringProperty.value
      } );
      gravitySlider.slider.descriptionDependencies = [ accelerationUnitsProperty ];

      children.push( gravitySlider );
    }

    if ( options.includeGravityComboBox ) {

      const gValueStringProperty = gravityMagnitudeProperty.derived( g =>
        EnergySkateParkFluent.a11y.gravityComboBox.gravityValuePattern.format( { value: toFixed( g, 1 ) } )
      );
      const gravityContextResponseProperty = EnergySkateParkFluent.a11y.gravityComboBox.accessibleContextResponse.createProperty( {
        gravityValue: gValueStringProperty
      } );

      const gravityComboBox = new GravityComboBox( gravityMagnitudeProperty, userControlledProperty, resetEmitter, listParent, tandem.createTandem( 'gravityComboBox' ), {
        accessibleName: EnergySkateParkFluent.a11y.gravityComboBox.accessibleNameStringProperty,
        accessibleHelpText: EnergySkateParkFluent.a11y.gravityComboBox.accessibleHelpTextStringProperty,
        accessibleContextResponse: gravityContextResponseProperty
      } );

      children.push( gravityComboBox );
    }

    super( { spacing: 8, children: children } );
  }
}
