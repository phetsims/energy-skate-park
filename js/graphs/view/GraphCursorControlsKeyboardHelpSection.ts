// Copyright 2026, University of Colorado Boulder

/**
 * GraphCursorControlsKeyboardHelpSection is the keyboard-help section that describes graph cursor interactions
 * in the Graphs screen of Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';

// HotkeyData for keyboard help dialog rows
// REVIEW: This hotkey data should probably be created in the location its used for the listener.
const SCRUB_DATA_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'arrowLeft', 'arrowRight' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.scrubThroughDataStringProperty
} );

export default class GraphCursorControlsKeyboardHelpSection extends KeyboardHelpSection {

// REVIEW: This hotkey data should probably be created in the location its used for the listener.
  public static readonly TOGGLE_PAUSE_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'space', 'enter' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.togglePauseStringProperty
  } );

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( GraphCursorControlsKeyboardHelpSection.TOGGLE_PAUSE_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( SCRUB_DATA_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.graphCursorControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}
