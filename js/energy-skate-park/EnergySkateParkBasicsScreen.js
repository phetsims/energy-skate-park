// Copyright 2013-2017, University of Colorado Boulder

/**
 * A single screen for the Energy Skate Park: Basics sim.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkBasicsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/model/EnergySkateParkBasicsModel' );
  var EnergySkateParkBasicsScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkBasicsScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  /**
   *
   * @param name
   * @param homescreenIcon
   * @param draggableTracks
   * @param friction
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkBasicsScreen( name, homescreenIcon, draggableTracks, friction, tandem ) {

    var options = {
      name: name,
      homeScreenIcon: new Image( homescreenIcon, {
        tandem: tandem.createTandem( 'homescreenIcon' )
      } ),
      tandem: tandem
    };

    Screen.call( this,
      function() {
        return new EnergySkateParkBasicsModel( draggableTracks, friction, tandem.createTandem( 'model' ) );
      },
      function( model ) {
        return new EnergySkateParkBasicsScreenView( model, tandem.createTandem( 'view' ) );
      },
      options );
  }

  energySkatePark.register( 'EnergySkateParkBasicsScreen', EnergySkateParkBasicsScreen );

  return inherit( Screen, EnergySkateParkBasicsScreen );
} );