// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard help section for connecting track endpoints in the Playground screen.
 *
 * This documents the "Transient ComboBox Pattern" (see AttachmentKeyboardListener in scenery-phet).
 * The key bindings shown here (Space/Enter, Arrow Up/Down, Enter, Escape) are handled internally
 * by the ComboBox/ListBox common code — there are no sim-level KeyboardListeners for these actions.
 * Therefore, the HotkeyData instances below are created solely for keyboard help dialog display,
 * not pulled from any runtime listener. This is inherent to the pattern: the ComboBox provides
 * the keyboard interaction for free, but the help dialog must describe it explicitly.
 *
 * Uses a numbered list pattern modeled after ChooseJunctionConnectionKeyboardHelpSection in CCK.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import HotkeyDescriptionBuilder from '../../../../scenery-phet/js/keyboard/help/HotkeyDescriptionBuilder.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';

export default class ConnectTrackEndpointsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    // Helper to create a section row with separate visual and accessible labels.
    // NOTE: The HotkeyData instances created here are for display only. The actual key bindings
    // (arrow navigation, Enter to select, Escape to cancel) are handled internally by the ComboBox
    // component in common code, not by any sim-level KeyboardListener. There is no runtime listener
    // to pull HotkeyData from — this is inherent to the Transient ComboBox Pattern used by
    // ControlPointAttachmentKeyboardListener (see AttachmentKeyboardListener in scenery-phet).
    const createSectionRow = (
      keys: OneKeyStroke[],
      visualLabelStringProperty: TReadOnlyProperty<string>,
      accessibleLabelStringProperty: TReadOnlyProperty<string>
    ) => {
      const hotkeyData = new HotkeyData( {
        keys: keys,
        repoName: energySkatePark.name,
        keyboardHelpDialogLabelStringProperty: visualLabelStringProperty
      } );

      return KeyboardHelpSectionRow.fromHotkeyData( hotkeyData, {
        accessibleRowDescriptionProperty: HotkeyDescriptionBuilder.createDescriptionProperty(
          accessibleLabelStringProperty,
          hotkeyData.keyDescriptorsProperty
        )
      } );
    };

    const showOptions = createSectionRow(
      [ 'space', 'enter' ],
      EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty,
      EnergySkateParkFluent.a11y.keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty
    );

    const moveThroughOptions = createSectionRow(
      [ 'arrowUp', 'arrowDown' ],
      EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty,
      EnergySkateParkFluent.a11y.keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty
    );

    const selectOption = createSectionRow(
      [ 'enter' ],
      EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty,
      EnergySkateParkFluent.a11y.keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty
    );

    const cancel = createSectionRow(
      [ 'escape' ],
      EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty,
      EnergySkateParkFluent.a11y.keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty
    );

    const rows = [ showOptions, moveThroughOptions, selectOption, cancel ];

    super(
      EnergySkateParkFluent.keyboardHelpDialog.connectTrackEndpoints.labelStringProperty,
      rows, {
        a11yContentTagName: 'ol',
        vBoxOptions: {
          spacing: 8
        }
      }
    );
  }
}
