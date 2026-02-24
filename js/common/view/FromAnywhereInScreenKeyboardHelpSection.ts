// Copyright 2026, University of Colorado Boulder

/**
 * FromAnywhereInScreenKeyboardHelpSection covers global hotkeys available regardless of focus in Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PlayControlButton from '../../../../scenery-phet/js/buttons/PlayControlButton.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

export default class FromAnywhereInScreenKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {
    super( EnergySkateParkFluent.keyboardHelpDialog.fromAnywhereInScreenStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData( EnergySkateParkScreenView.RESTART_SKATER_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( PlayControlButton.TOGGLE_PLAY_HOTKEY_DATA )
    ], {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'FromAnywhereInScreenKeyboardHelpSection', FromAnywhereInScreenKeyboardHelpSection );
