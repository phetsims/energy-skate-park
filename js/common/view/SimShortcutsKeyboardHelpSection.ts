// Copyright 2026, University of Colorado Boulder

/**
 * SimShortcutsKeyboardHelpSection is the keyboard-help section that describes global hotkeys for Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

export default class SimShortcutsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( EnergySkateParkScreenView.RESTART_SKATER_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.simShortcutsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'SimShortcutsKeyboardHelpSection', SimShortcutsKeyboardHelpSection );
