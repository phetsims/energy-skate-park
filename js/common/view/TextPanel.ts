// Copyright 2018-2026, University of Colorado Boulder

/**
 * Much of the text in this sim is surrounded by a transparent white panel to assist with visibility. This type
 * handles that for you.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

type SelfOptions = {
  font?: Font;
  textMaxWidth?: number;
};
type TextPanelOptions = SelfOptions & PanelOptions;

export default class TextPanel extends Panel {

  /**
   * @param stringProperty - text to fill the panel
   * @param [providedOptions]
   */
  public constructor( stringProperty: TReadOnlyProperty<string>, providedOptions?: TextPanelOptions ) {

    const options = optionize<TextPanelOptions, SelfOptions, PanelOptions>()( {

      // Text options
      font: new PhetFont( 15 ),
      textMaxWidth: 180,

      // panel options
      fill: EnergySkateParkColorScheme.transparentPanelFill,
      cornerRadius: 0,
      lineWidth: 0,
      xMargin: 2,
      yMargin: 0
    }, providedOptions );

    const text = new Text( stringProperty, {
      font: options.font,
      maxWidth: options.textMaxWidth
    } );

    super( text, options );
  }
}

energySkatePark.register( 'TextPanel', TextPanel );