// Copyright 2026, University of Colorado Boulder

/**
 * ToolboxControlsKeyboardHelpSection is the keyboard-help section that describes how to use the
 * stopwatch and measuring tape from the toolbox.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';

// HotkeyData for keyboard help dialog rows
const REMOVE_FROM_TOOLBOX_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.removeFromToolboxStringProperty
} );

const RETURN_TO_TOOLBOX_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'delete', 'backspace' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.returnToToolboxStringProperty
} );

export default class ToolboxControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( REMOVE_FROM_TOOLBOX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( RETURN_TO_TOOLBOX_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.stopwatchAndMeasuringTapeControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'ToolboxControlsKeyboardHelpSection', ToolboxControlsKeyboardHelpSection );
