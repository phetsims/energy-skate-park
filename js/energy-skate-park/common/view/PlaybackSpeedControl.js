// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node for the speed controls, with "normal" and "slow motion" radio buttons.
 *
 * @author Sam Reid
 */

import merge from '../../../../../phet-core/js/merge.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import AquaRadioButton from '../../../../../sun/js/AquaRadioButton.js';
import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';

const normalString = energySkateParkStrings.normal;
const slowMotionString = energySkateParkStrings.slow.motion;

// constants
const X_DILATION = 5;
const Y_DILATION = 2;
const RADIO_BUTTON_RADIUS = 7.1;

const LABEL_OPTIONS = {
  font: new PhetFont( 15 ),
  maxWidth: 90
};

class PlaybackSpeedControl extends VBox {

  /**
   * @param {Property<Number>} speedProperty the instantaneous speed of the skater (magnitude of the velocity vector)
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( speedProperty, tandem, options ) {

    options = merge( {
      align: 'left',
      spacing: 4
    }, options );
    assert && assert( options.children === undefined, 'PlaybackSpeedControl sets children' );

    const slowMotionRadioButton = new AquaRadioButton( speedProperty, 'slow', new Text( slowMotionString, merge( {
        tandem: tandem.createTandem( 'slowMotionTextNode' )
      }, LABEL_OPTIONS )
    ), {
      radius: RADIO_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'slowMotionRadioButton' )
    } );
    const normalSpeedRadioButton = new AquaRadioButton( speedProperty, 'normal', new Text( normalString, merge( {
        tandem: tandem.createTandem( 'normalSpeedTextNode' )
      }, LABEL_OPTIONS )
    ), {
      radius: RADIO_BUTTON_RADIUS,
      x: 130,
      tandem: tandem.createTandem( 'normalSpeedButton' )
    } );
    slowMotionRadioButton.touchArea = slowMotionRadioButton.localBounds.dilatedXY( X_DILATION, Y_DILATION );
    normalSpeedRadioButton.touchArea = normalSpeedRadioButton.localBounds.dilatedXY( X_DILATION, Y_DILATION );

    options.children = [ slowMotionRadioButton, normalSpeedRadioButton ];

    super( options );
  }
}

energySkatePark.register( 'PlaybackSpeedControl', PlaybackSpeedControl );
export default PlaybackSpeedControl;