// Copyright 2022, University of Colorado Boulder

/**
 * The node that is shown in the Preferences dialog of Energy Skate Park to control simulation
 * specific settings.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import PreferencesToggleSwitch from '../../../../joist/js/preferences/PreferencesToggleSwitch.js';
import { Node, RichText, Text } from '../../../../scenery/js/imports.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';

class EnergySkateParkPreferencesNode extends Node {

  /**
   * @param {EnergySkateParkPreferencesModel} preferencesModel
   * @param {Tandem} tandem
   */
  constructor( preferencesModel, tandem ) {
    super();

    const metersPerSecondSquaredLabel = new RichText( 'm/s<sup>2</sup>', {
      font: PreferencesDialog.CONTENT_FONT
    } );

    const newtonsPerKilogramLabel = new Text( 'N/kg', {
      font: PreferencesDialog.CONTENT_FONT
    } );

    const accelerationUnitsSwitch = new PreferencesToggleSwitch(
      preferencesModel.accelerationUnitsProperty,
      EnergySkateParkPreferencesModel.AccelerationUnits.METERS_PER_SECOND_SQUARED,
      EnergySkateParkPreferencesModel.AccelerationUnits.NEWTONS_PER_KILOGRAM,
      {
        labelNode: new Text( 'Acceleration Units', { font: PreferencesDialog.CONTENT_FONT } ),
        labelSpacing: 20,
        leftValueLabel: metersPerSecondSquaredLabel,
        rightValueLabel: newtonsPerKilogramLabel
      }
    );

    this.addChild( accelerationUnitsSwitch );
  }
}

energySkatePark.register( 'EnergySkateParkPreferencesNode', EnergySkateParkPreferencesNode );
export default EnergySkateParkPreferencesNode;
