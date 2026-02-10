// Copyright 2026, University of Colorado Boulder

/**
 * EnergySkateParkKeyboardHelpContent is the content for the keyboard-help dialog in Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import energySkatePark from '../../energySkatePark.js';
import SimShortcutsKeyboardHelpSection from './SimShortcutsKeyboardHelpSection.js';
import SkaterKeyboardHelpSection from './SkaterKeyboardHelpSection.js';

export default class EnergySkateParkKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column
    const leftSections = [
      new SkaterKeyboardHelpSection()
    ];

    // Sections in the right column
    const rightSections = [
      new SimShortcutsKeyboardHelpSection(),
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
