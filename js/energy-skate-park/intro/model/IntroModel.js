// Copyright 2018, University of Colorado Boulder

/**
 * Model for the Intro screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/IntroConstants' );

  // constants
  function IntroModel( tandem ) {

    // track set model with friction
    EnergySkateParkFullTrackSetModel.call( this, true, tandem, {
      skaterOptions: {
        defaultMass: IntroConstants.PHET_SKATER_MASS
      }
    } );
  }

  energySkatePark.register( 'IntroModel', IntroModel );

  return inherit( EnergySkateParkFullTrackSetModel, IntroModel, {} );
} );
