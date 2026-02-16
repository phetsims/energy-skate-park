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
const TOGGLE_PAUSE_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.togglePauseStringProperty
} );

const SCRUB_DATA_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'arrowLeft', 'arrowRight' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.scrubThroughDataStringProperty
} );

export default class GraphCursorControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( TOGGLE_PAUSE_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( SCRUB_DATA_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.graphCursorControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'GraphCursorControlsKeyboardHelpSection', GraphCursorControlsKeyboardHelpSection );
