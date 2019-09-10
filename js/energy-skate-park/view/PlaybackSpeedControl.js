// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node for the speed controls, with "normal" and "slow motion" radio buttons.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var normalString = require( 'string!ENERGY_SKATE_PARK/normal' );
  var slowMotionString = require( 'string!ENERGY_SKATE_PARK/slow.motion' );

  // constants
  var X_DILATION = 5;
  var Y_DILATION = 2;
  var RADIO_BUTTON_RADIUS = 7.1;

  const LABEL_OPTIONS = {
    font: new PhetFont( 15 ),
    maxWidth: 90
  };

  /**
   * @param {Property<Number>} speedProperty the instantaneous speed of the skater (magnitude of the velocity vector)
   * @param {Tandem} tandem
   * @constructor
   */
  function PlaybackSpeedControl( speedProperty, tandem, options ) {

    options = _.extend( {
      align: 'left',
      spacing: 4
    }, options );
    assert && assert( options.children === undefined, 'PlaybackSpeedControl sets children' );

    var slowMotionRadioButton = new AquaRadioButton( speedProperty, 'slow', new Text( slowMotionString, _.extend( {
      tandem: tandem.createTandem( 'slowMotionTextNode' ) }, LABEL_OPTIONS )
    ), {
      radius: RADIO_BUTTON_RADIUS,
      tandem: tandem.createTandem( 'slowMotionRadioButton' )
    } );
    var normalSpeedRadioButton = new AquaRadioButton( speedProperty, 'normal', new Text( normalString, _.extend( {
      tandem: tandem.createTandem( 'normalSpeedTextNode' ) }, LABEL_OPTIONS )
    ), {
      radius: RADIO_BUTTON_RADIUS,
      x: 130,
      tandem: tandem.createTandem( 'normalSpeedButton' )
    } );
    slowMotionRadioButton.touchArea = slowMotionRadioButton.localBounds.dilatedXY( X_DILATION, Y_DILATION );
    normalSpeedRadioButton.touchArea = normalSpeedRadioButton.localBounds.dilatedXY( X_DILATION, Y_DILATION );

    options.children = [ slowMotionRadioButton, normalSpeedRadioButton ];
    VBox.call( this, options );
  }

  energySkatePark.register( 'PlaybackSpeedControl', PlaybackSpeedControl );

  return inherit( VBox, PlaybackSpeedControl );
} );