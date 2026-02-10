// Copyright 2026, University of Colorado Boulder

/**
 * SimShortcutsKeyboardHelpSection is the keyboard-help section that describes global hotkeys for Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

// HotkeyData for keyboard help dialog rows
const RETURN_TOOL_TO_TOOLBOX_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'delete', 'backspace' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.returnToolToToolboxStringProperty
} );

export default class SimShortcutsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor( options?: { includeReturnToolToToolbox?: boolean } ) {

    const rows: KeyboardHelpSectionRow[] = [
      KeyboardHelpSectionRow.fromHotkeyData( EnergySkateParkScreenView.RESTART_SKATER_HOTKEY_DATA )
    ];

    if ( options?.includeReturnToolToToolbox ) {
      rows.push( KeyboardHelpSectionRow.fromHotkeyData( RETURN_TOOL_TO_TOOLBOX_HOTKEY_DATA ) );
    }

    super( EnergySkateParkFluent.keyboardHelpDialog.simShortcutsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'SimShortcutsKeyboardHelpSection', SimShortcutsKeyboardHelpSection );
