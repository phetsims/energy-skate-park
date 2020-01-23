// Copyright 2018-2019, University of Colorado Boulder

/**
 * A model for track sets in Energy Skate Park "Full", which has a parabola, slope, loop, and double well tracks.
 * Tracks are not draggable, and may support friction.
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );

  class EnergySkateParkFullTrackSetModel extends EnergySkateParkTrackSetModel {

    /**
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( tandem, options ) {
      super( tandem, options );

      const trackSet = EnergySkateParkTrackSetModel.createFullTrackSet( this, tandem );

      // NOTE: It would have been nice to pass the tracks to EnergySkateParkTrackSetModel, but tracks require knowledge
      // of the model they are being added to so this isn't possible.
      this.addTrackSet( trackSet );
    }
  }

  return energySkatePark.register( 'EnergySkateParkFullTrackSetModel', EnergySkateParkFullTrackSetModel );
} );
