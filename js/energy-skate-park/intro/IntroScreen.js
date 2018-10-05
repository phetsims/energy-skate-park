// Copyright 2018, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/model/IntroModel' );
  var IntroScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/view/IntroScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );

  // images
  var iconIntroHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-intro-homescreen.png' );

  // strings
  var screenIntroductionString = require( 'string!ENERGY_SKATE_PARK/screen.introduction' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroScreen( tandem ) {

    var options = _.extend( {
      name: screenIntroductionString,
      tandem: tandem,
      homeScreenIcon: new Image( iconIntroHomescreen )
    }, options );

    Screen.call( this,
      function() { return new IntroModel( tandem.createTandem( 'introModel' ) ); },
      function( model ) { return new IntroScreenView( model, tandem.createTandem( 'introScreenView' ) ); },
      options
    );
  }

  energySkatePark.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );