// Copyright 2026, University of Colorado Boulder

/**
 * SkaterKeyboardHelpSection is the keyboard-help section that describes how to interact with the skater.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import SkaterKeyboardListener from './SkaterKeyboardListener.js';
import SkaterNode from './SkaterNode.js';

export default class SkaterKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Move skater (off track - 2D movement)
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_SKATER_HOTKEY_DATA ),

      // Move along track (when on track)
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_ALONG_TRACK_HOTKEY_DATA ),

      // Detach from track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.DETACH_FROM_TRACK_HOTKEY_DATA ),

      // Move to start of track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_TO_START_OF_TRACK_HOTKEY_DATA ),

      // Move to end of track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_TO_END_OF_TRACK_HOTKEY_DATA ),

      // Attach to nearest track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterNode.ATTACH_TO_TRACK_HOTKEY_DATA )
    ];

    // 'Skater Controls' title
    super( EnergySkateParkFluent.keyboardHelpDialog.skaterControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'SkaterKeyboardHelpSection', SkaterKeyboardHelpSection );
