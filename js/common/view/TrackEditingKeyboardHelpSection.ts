// Copyright 2026, University of Colorado Boulder

/**
 * TrackEditingKeyboardHelpSection is the keyboard-help section that describes track editing interactions
 * in the Playground screen of Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import KeyboardHelpIconFactory from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import ControlPointNode from './ControlPointNode.js';

// HotkeyData for keyboard help dialog rows
const MOVE_CONTROL_POINT_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.moveControlPointStringProperty
} );

const REMOVE_FROM_PLAY_AREA_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'delete', 'backspace' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.removeFromPlayAreaStringProperty
} );

const CONNECT_TRACK_ENDPOINTS_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'space', 'enter' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpointsStringProperty
} );

export default class TrackEditingKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    const rows = [
      KeyboardHelpSectionRow.fromHotkeyData( MOVE_CONTROL_POINT_HOTKEY_DATA, {
        icon: KeyboardHelpIconFactory.arrowKeysRowIcon()
      } ),
      KeyboardHelpSectionRow.fromHotkeyData( REMOVE_FROM_PLAY_AREA_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( CONNECT_TRACK_ENDPOINTS_HOTKEY_DATA ),
      KeyboardHelpSectionRow.fromHotkeyData( ControlPointNode.SPLIT_VERTEX_HOTKEY_DATA )
    ];

    super( EnergySkateParkFluent.keyboardHelpDialog.trackEditingStringProperty, rows, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'TrackEditingKeyboardHelpSection', TrackEditingKeyboardHelpSection );
