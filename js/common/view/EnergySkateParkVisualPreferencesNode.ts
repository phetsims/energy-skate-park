// Copyright 2026, University of Colorado Boulder

/**
 * The node shown in the Visual tab of the Preferences dialog, containing a toggle for energy patterns.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ToggleSwitch, { type ToggleSwitchOptions } from '../../../../sun/js/ToggleSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';

export default class EnergySkateParkVisualPreferencesNode extends Node {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super();

    const labelText = new Text( EnergySkateParkFluent.preferences.patternsStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS );

    const descriptionText = new RichText( EnergySkateParkFluent.preferences.patternsDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS );

    const preferencesControlTandem = tandem.createTandem( 'patternsControl' );

    const patternsToggleSwitch = new ToggleSwitch( preferencesModel.showPatternsProperty, false, true, combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
      tandem: preferencesControlTandem.createTandem( 'patternsToggleSwitch' ),
      phetioVisiblePropertyInstrumented: false
    } ) );

    const patternsControl = new PreferencesControl( {
      labelNode: labelText,
      controlNode: patternsToggleSwitch,
      descriptionNode: descriptionText,
      labelSpacing: 20,
      phetioFeatured: true,
      phetioVisiblePropertyInstrumented: true,
      tandem: preferencesControlTandem
    } );

    this.addChild( patternsControl );
  }
}

energySkatePark.register( 'EnergySkateParkVisualPreferencesNode', EnergySkateParkVisualPreferencesNode );
