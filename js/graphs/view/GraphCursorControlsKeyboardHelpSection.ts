// Copyright 2026, University of Colorado Boulder

/**
 * GraphCursorControlsKeyboardHelpSection is the keyboard-help section that describes graph cursor interactions
 * in the Graphs screen of Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergyChart from './EnergyChart.js';

export default class GraphCursorControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( EnergyChart.TOGGLE_PAUSE_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( EnergyChart.SCRUB_DATA_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.graphCursorControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}
