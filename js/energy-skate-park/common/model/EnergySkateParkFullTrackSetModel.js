// Copyright 2018, University of Colorado Boulder

/**
 * A model for track sets in Energy Skate Park "Full", which has a parabola, slope, loop, and double well tracks.
 * Tracks are not draggable, and may support friction.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {boolean} frictionAllowed
   * @param {Tandem} tandem
   * @param {Object} options
   */
  function EnergySkateParkFullTrackSetModel( frictionAllowed, tandem, options ) {
    EnergySkateParkTrackSetModel.call( this, frictionAllowed, tandem, options );

    // NOTE: It would have been nice to pass the tracks to EnergySkateParkTrackSetModel, but tracks require knowledge
    // of the model they are being added to so this isn't possible.
    this.addTrackSet( EnergySkateParkTrackSetModel.createFullTrackSet( this, tandem ) );
  }

  energySkatePark.register( 'EnergySkateParkFullTrackSetModel', EnergySkateParkFullTrackSetModel );

  return inherit( EnergySkateParkTrackSetModel, EnergySkateParkFullTrackSetModel );
} );
