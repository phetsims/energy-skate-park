// Copyright 2026, University of Colorado Boulder

/**
 * SkaterKeyboardHelpSection is the keyboard-help section that describes how to interact with the skater.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import SkaterKeyboardListener from './SkaterKeyboardListener.js';
import SkaterNode from './SkaterNode.js';

// HotkeyData for grab/release row (not attached to any runtime listener)
const GRAB_OR_RELEASE_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.grabOrReleaseStringProperty
} );

export default class SkaterKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [

      // Grab or release
      KeyboardHelpSectionRow.fromHotkeyData( GRAB_OR_RELEASE_HOTKEY_DATA ),

      // Attach to nearest track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterNode.ATTACH_TO_TRACK_HOTKEY_DATA ),

      // Move along track
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_ALONG_TRACK_HOTKEY_DATA ),

      // Jump to track start
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_TO_START_OF_TRACK_HOTKEY_DATA ),

      // Jump to track end
      KeyboardHelpSectionRow.fromHotkeyData( SkaterKeyboardListener.MOVE_TO_END_OF_TRACK_HOTKEY_DATA )
    ];

    // 'Skater Controls' title
    super( EnergySkateParkFluent.keyboardHelpDialog.skaterControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'SkaterKeyboardHelpSection', SkaterKeyboardHelpSection );
