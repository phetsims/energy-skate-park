// Copyright 2018-2019, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Image = require( 'SCENERY/nodes/Image' );
  const MeasureModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/model/MeasureModel' );
  const MeasureScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/MeasureScreenView' );
  const Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images
  const iconFrictionHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-friction-homescreen.png' );
  const iconFrictionNavbar = require( 'image!ENERGY_SKATE_PARK/icon-friction-navbar.png' );

  // strings
  const screenMeasureString = require( 'string!ENERGY_SKATE_PARK/screen.measure' );

  class MeasureScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( tandem ) {
      const options = {
        name: screenMeasureString,
        homeScreenIcon: new Image( iconFrictionHomescreen ),
        navigationBarIcon: new Image( iconFrictionNavbar ),

        tandem: tandem
      };

      super(
        () => { return new MeasureModel( tandem.createTandem( 'measureModel' ) ); },
        model => { return new MeasureScreenView( model, tandem.createTandem( 'measureScreenView' ) ); },
        options
      );

    }
  }

  return energySkatePark.register( 'MeasureScreen', MeasureScreen );
} );