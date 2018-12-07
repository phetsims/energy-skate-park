// Copyright 2018, University of Colorado Boulder

/**
 * The "Lab" screen.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LabModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/model/LabModel' );
  var LabScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/view/LabScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images
  var iconPlaygroundHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-playground-homescreen.png' );
  var iconPlaygroundNavbar = require( 'image!ENERGY_SKATE_PARK/icon-playground-navbar.png' );

  // strings
  var screenLabString = require( 'string!ENERGY_SKATE_PARK/screen.lab' );

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