// Copyright 2022-2025, University of Colorado Boulder

/**
 * The node that is shown in the Preferences dialog of Energy Skate Park to control simulation
 * specific settings.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';

export default class EnergySkateParkPreferencesNode extends Node {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super();

    const metersPerSecondSquaredLabel = new RichText( EnergySkateParkStrings.preferences.metersPerSecondSquaredStringProperty,
      PreferencesDialogConstants.TOGGLE_SWITCH_LABEL_OPTIONS
    );

    const newtonsPerKilogramLabel = new Text( EnergySkateParkStrings.preferences.newtonsPerKilogramStringProperty,
      PreferencesDialogConstants.TOGGLE_SWITCH_LABEL_OPTIONS );

    const accelarationUnitsSwitch = new ABSwitch( preferencesModel.accelerationUnitsProperty,
      EnergySkateParkPreferencesModel.AccelerationUnits.METERS_PER_SECOND_SQUARED,
      metersPerSecondSquaredLabel,
      EnergySkateParkPreferencesModel.AccelerationUnits.NEWTONS_PER_KILOGRAM,
      newtonsPerKilogramLabel,
      { toggleSwitchOptions: PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS }
      );

    const accelerationUnitsControl = new PreferencesControl(
      {
        labelNode: new Text( EnergySkateParkStrings.preferences.accelerationUnitsStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS ),
        labelSpacing: 20,
        controlNode: accelarationUnitsSwitch
      }
    );

    this.addChild( accelerationUnitsControl );
  }
}

energySkatePark.register( 'EnergySkateParkPreferencesNode', EnergySkateParkPreferencesNode );