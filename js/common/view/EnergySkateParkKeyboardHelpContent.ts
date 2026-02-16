// Copyright 2026, University of Colorado Boulder

/**
 * EnergySkateParkKeyboardHelpContent is the content for the keyboard-help dialog in Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import energySkatePark from '../../energySkatePark.js';
import GraphCursorControlsKeyboardHelpSection from '../../graphs/view/GraphCursorControlsKeyboardHelpSection.js';
import ConnectTrackEndpointsKeyboardHelpSection from './ConnectTrackEndpointsKeyboardHelpSection.js';
import SkaterKeyboardHelpSection from './SkaterKeyboardHelpSection.js';
import ToolboxControlsKeyboardHelpSection from './ToolboxControlsKeyboardHelpSection.js';
import TrackControlsKeyboardHelpSection from './TrackControlsKeyboardHelpSection.js';

type EnergySkateParkKeyboardHelpContentOptions = {
  includeStopwatchAndMeasuringTapeControls?: boolean;
  includeGraphCursorControls?: boolean;
  includeTrackControls?: boolean;
  includeConnectTrackEndpoints?: boolean;
};

export default class EnergySkateParkKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor( providedOptions?: EnergySkateParkKeyboardHelpContentOptions ) {

    const options = providedOptions || {};

    // Left column sections
    const leftSections: KeyboardHelpSection[] = [
      new SkaterKeyboardHelpSection(),
      new MoveDraggableItemsKeyboardHelpSection()
    ];

    if ( options.includeStopwatchAndMeasuringTapeControls ) {
      leftSections.push( new ToolboxControlsKeyboardHelpSection() );
    }
    if ( options.includeGraphCursorControls ) {
      leftSections.push( new GraphCursorControlsKeyboardHelpSection() );
    }
    if ( options.includeTrackControls ) {
      leftSections.push( new TrackControlsKeyboardHelpSection() );
    }
    if ( options.includeConnectTrackEndpoints ) {
      leftSections.push( new ConnectTrackEndpointsKeyboardHelpSection() );
    }

    // Right column sections (always the same)
    const rightSections = [
      new TimeControlsKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection(),
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
