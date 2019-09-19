// Copyright 2018, University of Colorado Boulder

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
  const inherit = require( 'PHET_CORE/inherit' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images
  const iconFrictionHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-friction-homescreen.png' );
  const iconFrictionNavbar = require( 'image!ENERGY_SKATE_PARK/icon-friction-navbar.png' );

  // strings
  const screenGraphsString = require( 'string!ENERGY_SKATE_PARK/screen.graphs' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GraphsScreen( tandem ) {

    var options = _.extend( {
      name: screenGraphsString,
      homeScreenIcon: new Image( iconFrictionHomescreen ),
      navigationBarIcon: new Image( iconFrictionNavbar ),

      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new GraphsModel( tandem.createTandem( 'graphsModel' ) ); },
      function( model ) { return new GraphsScreenView( model, tandem.createTandem( 'graphsScreenView' ) ); },
      options
    );
  }

  energySkatePark.register( 'GraphsScreen', GraphsScreen );

  return inherit( Screen, GraphsScreen );
} );