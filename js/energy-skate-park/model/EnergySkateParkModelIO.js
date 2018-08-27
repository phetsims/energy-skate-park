// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for EnergySkateParkModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {EnergySkateParkModel} energySkateParkModel
   * @param {string} phetioID
   * @constructor
   */
  function EnergySkateParkModelIO( energySkateParkModel, phetioID ) {
    assert && assertInstanceOf( energySkateParkModel, phet.energySkatePark.EnergySkateParkModel );
    ObjectIO.call( this, energySkateParkModel, phetioID );
  }

  phetioInherit( ObjectIO, 'EnergySkateParkModelIO', EnergySkateParkModelIO, {}, {
    documentation: 'The model for the Skate Park.',

    /**
     * Remove all instances of the model's dynamic children.
     * This will remove all of the tracks from the model.
     * The ControlPoints are contained in the tracks, and each track will remove its ControlPoints.
     *
     * @param {EnergySkateParkModel} energySkateParkModel
     */
    clearChildInstances: function( energySkateParkModel ) {
      assert && assertInstanceOf( energySkateParkModel, phet.energySkatePark.energySkateParkModel );
      energySkateParkModel.removeAllTracks();
    },

    /**
     * Adds a Track as specified by the phetioID and state.
     * A Track will create its own ControlPoints
     * @param {EnergySkateParkModel} EnergySkateParkModel
     * @param {Tandem} tandem
     * @param {Object} stateObject
     */
    addChildInstance: function( EnergySkateParkModel, tandem, stateObject ) {
      assert && assertInstanceOf( EnergySkateParkModel, phet.energySkatePark.EnergySkateParkModel );
      var isControlPoint = tandem.phetioID.indexOf( 'model.controlPoint' ) >= 0;

      // Control Points are already being created when the tracks are made, so if the tandem is a controlPoint it's a no-op
      if ( isControlPoint ) {
        return false;
      }
      
      // If it isn't a ControlPoint, then it is a Track
      return EnergySkateParkModel.addTrack( tandem, stateObject.interactive, stateObject.controlPointTandemIDs );
    }
  } );

  energySkatePark.register( 'EnergySkateParkModelIO', EnergySkateParkModelIO );

  return EnergySkateParkModelIO;
} );