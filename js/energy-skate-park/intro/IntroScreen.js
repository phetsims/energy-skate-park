// Copyright 2018-2019, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const IntroModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/model/IntroModel' );
  const IntroScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/view/IntroScreenView' );
  const Screen = require( 'JOIST/Screen' );

  // images
  const iconIntroHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-intro-homescreen.png' );
  const iconIntroNavbar = require( 'image!ENERGY_SKATE_PARK/icon-intro-navbar.png' );

  // strings
  const screenIntroductionString = require( 'string!ENERGY_SKATE_PARK/screen.introduction' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroScreen( tandem ) {

    var options = _.extend( {
      name: screenIntroductionString,
      tandem: tandem,
      homeScreenIcon: new Image( iconIntroHomescreen ),
      navigationScreenIcon: new Image( iconIntroNavbar )
    }, options );

    Screen.call( this,
      function() { return new IntroModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new IntroScreenView( model, tandem.createTandem( 'view' ) ); },
      options
    );
  }

  energySkatePark.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );