// Copyright 2018-2019, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LabModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/model/LabModel' );
  const LabScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/view/LabScreenView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Screen = require( 'JOIST/Screen' );

  // images
  const iconPlaygroundHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-playground-homescreen.png' );
  const iconPlaygroundNavbar = require( 'image!ENERGY_SKATE_PARK/icon-playground-navbar.png' );

  // strings
  const screenLabString = require( 'string!ENERGY_SKATE_PARK/screen.lab' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function LabScreen( tandem ) {

    var options = _.extend( {
      name: screenLabString,
      homeScreenIcon: new Image( iconPlaygroundHomescreen ),
      navigationBarIcon: new Image( iconPlaygroundNavbar ),

      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new LabModel( tandem.createTandem( 'labModel' ) ); },
      function( model ) { return new LabScreenView( model, tandem.createTandem( 'labScreenView' ) ); },
      options
    );
  }

  energySkatePark.register( 'LabScreen', LabScreen );

  return inherit( Screen, LabScreen );
} );