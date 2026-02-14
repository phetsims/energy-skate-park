// Copyright 2020-2026, University of Colorado Boulder

/**
 * A collection of controls for EnergySkateParkControlPanel that pertain to gravity.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import { SliderOptions } from '../../../../sun/js/Slider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPreferencesModel, { AccelerationUnits } from '../model/EnergySkateParkPreferencesModel.js';
import GravityComboBox from './GravityComboBox.js';
import GravityNumberControl from './GravityNumberControl.js';
import GravitySlider from './GravitySlider.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

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
      const gravityControlInMetersPerSecondSquared = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityInMetersPerSecondSquaredControl' ), options.gravityNumberControlOptions || undefined );
      const gravityControlInNewtonsPerKilogram = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityInNewtonsPerKilogramControl' ), merge( {}, options.gravityNumberControlOptions, {
          numberDisplayOptions: {
            valuePattern: EnergySkateParkFluent.physicalControls.gravityControls.gravityNewtonsPerKilogramPatternStringProperty
          }
        } )
      );

      gravityControlInMetersPerSecondSquared.accessibleHelpText = EnergySkateParkFluent.a11y.gravityControl.accessibleHelpTextStringProperty;
      gravityControlInNewtonsPerKilogram.accessibleHelpText = EnergySkateParkFluent.a11y.gravityControl.accessibleHelpTextStringProperty;

      children.push( gravityControlInMetersPerSecondSquared );
      children.push( gravityControlInNewtonsPerKilogram );

      // the units of acceleration determine which control is visible
      accelerationUnitsProperty.link( accelerationUnits => {
        const inMetersPerSecond = accelerationUnits === EnergySkateParkPreferencesModel.AccelerationUnits.METERS_PER_SECOND_SQUARED;
        gravityControlInMetersPerSecondSquared.visible = inMetersPerSecond;
        gravityControlInNewtonsPerKilogram.visible = !inMetersPerSecond;
      } );
    }

    if ( options.includeGravitySlider ) {
      const gravitySlider = new GravitySlider( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityControl' ) );
      gravitySlider.accessibleHelpText = EnergySkateParkFluent.a11y.gravitySlider.accessibleHelpTextStringProperty;
      children.push( gravitySlider );
    }

    if ( options.includeGravityComboBox ) {
      const gValueStringProperty = new DerivedProperty( [ gravityMagnitudeProperty ],
        g => `${Utils.toFixed( g, 1 )} meters per second squared`
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

energySkatePark.register( 'EnergySkateParkGravityControls', EnergySkateParkGravityControls );