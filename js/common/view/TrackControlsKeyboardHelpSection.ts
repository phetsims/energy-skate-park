// Copyright 2026, University of Colorado Boulder

/**
 * TrackControlsKeyboardHelpSection is the keyboard-help section that describes track interactions
 * in the Playground screen of Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import ControlPointNode from './ControlPointNode.js';

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

const DELETE_CONTROL_POINT_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'delete', 'backspace' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.deleteControlPointStringProperty
} );

export default class TrackControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( REMOVE_FROM_TOOLBOX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( RETURN_TO_TOOLBOX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( ControlPointNode.SPLIT_VERTEX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( DELETE_CONTROL_POINT_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.trackControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'TrackControlsKeyboardHelpSection', TrackControlsKeyboardHelpSection );
