// Copyright 2018-2019, University of Colorado Boulder

/**
 * Much of the text in this sim is surrounded by a transparent white panel to assist with visibility. This type
 * handles that for you.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  class TextPanel extends Panel {

    /**
     * @param {string} textContent - text to fill the panel
     * @param  {Object} options
     */
    constructor( textContent, options ) {

      options = _.extend( {

        // Text options
        font: new PhetFont( 10 ),
        textMaxWidth: 150,

        // panel options
        fill: EnergySkateParkColorScheme.transparentPanelFill,
        cornerRadius: 0,
        lineWidth: 0,
        xMargin: 2,
        yMargin: 0,
        resize: false // assumes the text content is static
      }, options );

      const text = new Text( textContent, {
        font: options.font,
        maxWidth: options.textMaxWidth
      } );

      super( text, options );
    }
  }

  return energySkatePark.register( 'TextPanel', TextPanel );
} );
