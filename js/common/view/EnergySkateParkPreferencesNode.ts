// Copyright 2022-2026, University of Colorado Boulder

/**
 * The node that is shown in the Preferences dialog of Energy Skate Park to control simulation
 * specific settings.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import type EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AquaRadioButtonGroup, { type AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import { AccelerationUnits } from '../model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';

const RADIO_BUTTON_LABEL_OPTIONS = {
  font: new PhetFont( 16 ),
  maxWidth: 200
};

export default class EnergySkateParkPreferencesNode extends Node {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super();

    const labelText = new Text( EnergySkateParkFluent.preferences.accelerationUnitsStringProperty,
      PreferencesDialogConstants.CONTROL_LABEL_OPTIONS );

    const descriptionText = new RichText( EnergySkateParkFluent.preferences.accelerationUnitsDescriptionStringProperty,
      PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS );

    const radioButtonGroup = new AccelerationUnitsRadioButtonGroup( preferencesModel.accelerationUnitsProperty,
      tandem.createTandem( 'accelerationUnitsRadioButtonGroup' ) );

    const accelerationUnitsControl = new PreferencesControl( {
      labelNode: labelText,
      controlNode: radioButtonGroup,
      descriptionNode: descriptionText,
      labelSpacing: 20,
      phetioFeatured: true,
      phetioVisiblePropertyInstrumented: false
    } );

    this.addChild( accelerationUnitsControl );
  }
}

/**
 * The radio button group for choosing acceleration units.
 */
class AccelerationUnitsRadioButtonGroup extends AquaRadioButtonGroup<AccelerationUnits> {

  public constructor( accelerationUnitsProperty: EnumerationProperty<AccelerationUnits>, tandem: Tandem ) {

    const items: AquaRadioButtonGroupItem<AccelerationUnits>[] = [
      {
        value: AccelerationUnits.METERS_PER_SECOND_SQUARED,
        createNode: () => new RichText( EnergySkateParkFluent.preferences.metersPerSecondSquaredStringProperty, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: EnergySkateParkFluent.a11y.preferences.metersPerSecondSquaredRadioButtonStringProperty
        },
        tandemName: 'metersPerSecondSquaredRadioButton'
      },
      {
        value: AccelerationUnits.NEWTONS_PER_KILOGRAM,
        createNode: () => new Text( EnergySkateParkFluent.preferences.newtonsPerKilogramStringProperty, RADIO_BUTTON_LABEL_OPTIONS ),
        options: {
          accessibleName: EnergySkateParkFluent.a11y.preferences.newtonsPerKilogramRadioButtonStringProperty
        },
        tandemName: 'newtonsPerKilogramRadioButton'
      }
    ];

    super( accelerationUnitsProperty, items, {
      orientation: 'horizontal',
      spacing: 25,
      radioButtonOptions: {
        phetioVisiblePropertyInstrumented: false
      },
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

energySkatePark.register( 'EnergySkateParkPreferencesNode', EnergySkateParkPreferencesNode );
