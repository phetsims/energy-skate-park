// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const GraphsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/model/GraphsModel' );
  const GraphsScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/GraphsScreenView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );

  // images
  const iconFrictionHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-friction-homescreen.png' );
  const iconFrictionNavbar = require( 'image!ENERGY_SKATE_PARK/icon-friction-navbar.png' );

  // strings
  const screenGraphsString = require( 'string!ENERGY_SKATE_PARK/screen.graphs' );

  class GraphsScreen extends Screen {

    /**
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( tandem ) {
      var options = merge( {
        name: screenGraphsString,
        homeScreenIcon: new Image( iconFrictionHomescreen ),
        navigationBarIcon: new Image( iconFrictionNavbar ),
        tandem: tandem
      }, options );

      super(
        () => new GraphsModel( tandem.createTandem( 'graphsModel' ) ),
        model => new GraphsScreenView( model, tandem.createTandem( 'graphsScreenView' ) ),
        options
      );
    }
  }

  return energySkatePark.register( 'GraphsScreen', GraphsScreen );
} );