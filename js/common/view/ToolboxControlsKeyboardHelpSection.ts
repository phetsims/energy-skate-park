// Copyright 2026, University of Colorado Boulder

/**
 * ToolboxControlsKeyboardHelpSection is the keyboard-help section that describes how to use the
 * stopwatch and measuring tape from the toolbox.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import TrackToolboxPanel from './TrackToolboxPanel.js';

export default class ToolboxControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( TrackToolboxPanel.REMOVE_FROM_TOOLBOX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( EnergySkateParkScreenView.RETURN_TO_TOOLBOX_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.stopwatchAndMeasuringTapeControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}
