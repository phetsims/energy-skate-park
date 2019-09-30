// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node for the speed controls, with "normal" and "slow motion" radio buttons.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const normalString = require( 'string!ENERGY_SKATE_PARK/normal' );
  const slowMotionString = require( 'string!ENERGY_SKATE_PARK/slow.motion' );

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

      options = _.extend( {
        align: 'left',
        spacing: 4
      }, options );
      assert && assert( options.children === undefined, 'PlaybackSpeedControl sets children' );

      const slowMotionRadioButton = new AquaRadioButton( speedProperty, 'slow', new Text( slowMotionString, _.extend( {
        tandem: tandem.createTandem( 'slowMotionTextNode' ) }, LABEL_OPTIONS )
      ), {
        radius: RADIO_BUTTON_RADIUS,
        tandem: tandem.createTandem( 'slowMotionRadioButton' )
      } );
      const normalSpeedRadioButton = new AquaRadioButton( speedProperty, 'normal', new Text( normalString, _.extend( {
        tandem: tandem.createTandem( 'normalSpeedTextNode' ) }, LABEL_OPTIONS )
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

  return energySkatePark.register( 'PlaybackSpeedControl', PlaybackSpeedControl );
} );