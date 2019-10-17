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
  const Image = require( 'SCENERY/nodes/Image' );
  const LabModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/model/LabModel' );
  const LabScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/view/LabScreenView' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );

  // images
  const iconPlaygroundHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-playground-homescreen.png' );
  const iconPlaygroundNavbar = require( 'image!ENERGY_SKATE_PARK/icon-playground-navbar.png' );

  // strings
  const screenLabString = require( 'string!ENERGY_SKATE_PARK/screen.lab' );
  class LabScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( tandem ) {

      var options = merge( {
        name: screenLabString,
        homeScreenIcon: new Image( iconPlaygroundHomescreen ),
        navigationBarIcon: new Image( iconPlaygroundNavbar ),

        tandem: tandem
      }, options );

      super(
        () => { return new LabModel( tandem.createTandem( 'labModel' ) ); },
        model => { return new LabScreenView( model, tandem.createTandem( 'labScreenView' ) ); },
        options
      );
    }
  }

  return energySkatePark.register( 'LabScreen', LabScreen );
} );