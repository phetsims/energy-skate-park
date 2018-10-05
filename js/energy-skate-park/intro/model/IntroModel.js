// Copyright 2017, University of Colorado Boulder

/**
 * Model for the Intro screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModel' );

  // constants
  function IntroModel( tandem ) {
    EnergySkateParkModel.call( this, false, false, tandem.createTandem( 'introModel' ) );
  }

  energySkatePark.register( 'IntroModel', IntroModel );

  return inherit( EnergySkateParkModel, IntroModel, {} );
} );
