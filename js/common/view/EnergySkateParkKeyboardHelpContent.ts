// Copyright 2026, University of Colorado Boulder

/**
 * EnergySkateParkKeyboardHelpContent is the content for the keyboard-help dialog in Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import SimShortcutsKeyboardHelpSection from './SimShortcutsKeyboardHelpSection.js';
import SkaterKeyboardHelpSection from './SkaterKeyboardHelpSection.js';

// HotkeyData for the reference height line row
const MOVE_REFERENCE_HEIGHT_HOTKEY_DATA = new HotkeyData( {
  keys: [ 'arrowUp', 'arrowDown' ],
  repoName: energySkatePark.name,
  keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.moveReferenceHeightStringProperty
} );

type EnergySkateParkKeyboardHelpContentOptions = {

  // Additional sections to include in the left column (e.g. graph or track editing sections)
  additionalLeftSections?: KeyboardHelpSection[];

  // Whether this screen has tools that can be returned to a toolbox
  includeReturnToolToToolbox?: boolean;
};

export default class EnergySkateParkKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor( providedOptions?: EnergySkateParkKeyboardHelpContentOptions ) {

    const options = providedOptions || {};

    // Reference height line section: a single-row section
    const referenceHeightSection = new KeyboardHelpSection(
      EnergySkateParkFluent.keyboardHelpDialog.moveReferenceHeightStringProperty, [
        KeyboardHelpSectionRow.fromHotkeyData( MOVE_REFERENCE_HEIGHT_HOTKEY_DATA )
      ], {
        isDisposable: false
      } );

    // Sections in the left column
    const leftSections: KeyboardHelpSection[] = [
      new SkaterKeyboardHelpSection(),
      referenceHeightSection,
      ...( options.additionalLeftSections || [] )
    ];

    // Sections in the right column
    const rightSections = [
      new TimeControlsKeyboardHelpSection(),
      new SimShortcutsKeyboardHelpSection( {
        includeReturnToolToToolbox: options.includeReturnToolToToolbox
      } ),
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

energySkatePark.register( 'EnergySkateParkKeyboardHelpContent', EnergySkateParkKeyboardHelpContent );
