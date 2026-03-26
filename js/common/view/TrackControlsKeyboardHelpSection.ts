// Copyright 2026, University of Colorado Boulder

/**
 * TrackControlsKeyboardHelpSection is the keyboard-help section that describes track interactions
 * in the Playground screen of Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import ControlPointNode from './ControlPointNode.js';
import TrackToolboxPanel from './TrackToolboxPanel.js';
import TrackNode from './TrackNode.js';

export default class TrackControlsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( TrackToolboxPanel.REMOVE_FROM_TOOLBOX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( TrackNode.REMOVE_TRACK_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( ControlPointNode.SPLIT_VERTEX_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( ControlPointNode.DELETE_CONTROL_POINT_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.trackControlsStringProperty, rows, {
      isDisposable: false
    } );
  }
}
