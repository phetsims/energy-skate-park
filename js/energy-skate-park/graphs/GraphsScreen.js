// Copyright 2018, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var GraphsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/model/GraphsModel' );
  var GraphsScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/GraphsScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images

  // strings
  var screenGraphsString = require( 'string!ENERGY_SKATE_PARK/screen.graphs' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GraphsScreen( tandem ) {

    var options = _.extend( {
      name: screenGraphsString,
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