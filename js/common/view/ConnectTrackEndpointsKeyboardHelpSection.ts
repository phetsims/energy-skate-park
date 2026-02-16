// Copyright 2026, University of Colorado Boulder

/**
 * ConnectTrackEndpointsKeyboardHelpSection is the keyboard-help section that describes the workflow
 * for connecting track endpoints in the Playground screen of Energy Skate Park. Uses a numbered list
 * pattern modeled after ChooseJunctionConnectionKeyboardHelpSection in CCK.
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

    // Helper to create a section row with separate visual and accessible labels
    const createSectionRow = (
      keys: OneKeyStroke[],
      visualLabelStringProperty: TReadOnlyProperty<string>,
      accessibleLabelStringProperty: TReadOnlyProperty<string>
    ) => {

      // Synthesize dynamic/lazy HotkeyData here since the combo box interaction provides all the actions -- but we still must document them.
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

energySkatePark.register( 'ConnectTrackEndpointsKeyboardHelpSection', ConnectTrackEndpointsKeyboardHelpSection );
