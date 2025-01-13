// Copyright 2018-2025, University of Colorado Boulder

/**
 * Much of the text in this sim is surrounded by a transparent white panel to assist with visibility. This type
 * handles that for you.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

export default class TextPanel extends Panel {

  /**
   * @param stringProperty - text to fill the panel
   * @param [options]
   */
  public constructor( stringProperty: TReadOnlyProperty<string>, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // Text options
      font: new PhetFont( 15 ),
      textMaxWidth: 180,

      // panel options
      fill: EnergySkateParkColorScheme.transparentPanelFill,
      cornerRadius: 0,
      lineWidth: 0,
      xMargin: 2,
      yMargin: 0,
      resize: false // assumes the text content is static
    }, options );

    const text = new Text( stringProperty, {
      font: options.font,
      maxWidth: options.textMaxWidth
    } );

    super( text, options );
  }
}

energySkatePark.register( 'TextPanel', TextPanel );