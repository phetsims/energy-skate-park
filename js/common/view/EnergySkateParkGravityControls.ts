// Copyright 2020-2025, University of Colorado Boulder

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
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';
import GravityComboBox from './GravityComboBox.js';
import GravityNumberControl from './GravityNumberControl.js';
import GravitySlider from './GravitySlider.js';

type SelfOptions = {

  // whether or not a GravitySlider is included in this set of controls, only GravitySlider or GravityNumberControl can be used at one time
  includeGravitySlider?: boolean;

  // whether or not a GravityNumberControl is included in this set of controls, only GravitySlider or GravityNumberControl can be used at one time
  includeGravityNumberControl?: boolean;

  // whether or not a GravityComboBox is included in this set of controls
  includeGravityComboBox?: boolean;

  // options passed to the GravityNumberControl, if one is included
  gravityNumberControlOptions?: IntentionalAny | null;

  // options passed to the GravityComboBox, if one is included
  gravityComboBoxOptions?: IntentionalAny | null;

  // options passed to the GravitySlider, if one is included
  gravitySliderOptions?: IntentionalAny | null;
};

type EnergySkateParkGravityControlsOptions = SelfOptions & VBoxOptions;

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
  public constructor( gravityMagnitudeProperty: NumberProperty, userControlledProperty: BooleanProperty, accelerationUnitsProperty: EnumerationProperty<IntentionalAny>, resetEmitter: Emitter,
                      listParent: Node, tandem: Tandem, providedOptions?: EnergySkateParkGravityControlsOptions ) {

    const options = optionize<EnergySkateParkGravityControlsOptions, SelfOptions, VBoxOptions>()( {
      includeGravitySlider: false,
      includeGravityNumberControl: true,
      includeGravityComboBox: false,
      gravityNumberControlOptions: null,
      gravityComboBoxOptions: null,
      gravitySliderOptions: null
    }, providedOptions );

    assert && assert( !( options.includeGravitySlider && options.includeGravityNumberControl ), 'only GravitySlider OR GravityNumberControl can be used at one time' );

    const children = [];

    if ( options.includeGravityNumberControl ) {

      // The user is able to control the units of gravity with query parameter and checkbox. NumberControl/NumberDisplay
      // does not support changing the valuePattern so we need to create two NumberControls and swap visibility.
      if ( options.gravityNumberControlOptions && options.gravityNumberControlOptions.numberDisplayOptions ) {
        assert && assert( !options.gravityNumberControlOptions.numberDisplayOptions.valuePattern,
          'valuePattern of the gravity number control is set by EnergySkateParkGravityControls' );
      }
      const gravityControlInMetersPerSecondSquared = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityInMetersPerSecondSquaredControl' ), options.gravityNumberControlOptions );
      const gravityControlInNewtonsPerKilogram = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityInNewtonsPerKilogramControl' ), merge( {}, options.gravityNumberControlOptions, {
          numberDisplayOptions: {
            valuePattern: EnergySkateParkStrings.physicalControls.gravityControls.gravityNewtonsPerKilogramPatternStringProperty
          }
        } )
      );

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
      children.push( gravitySlider );
    }

    if ( options.includeGravityComboBox ) {
      const gravityComboBox = new GravityComboBox( gravityMagnitudeProperty, userControlledProperty, resetEmitter, listParent, tandem.createTandem( 'gravityComboBox' ) );
      children.push( gravityComboBox );
    }

    super( { resize: true, spacing: 8, children: children } );
  }
}

energySkatePark.register( 'EnergySkateParkGravityControls', EnergySkateParkGravityControls );