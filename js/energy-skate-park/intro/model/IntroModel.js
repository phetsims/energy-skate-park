// Copyright 2018-2019, University of Colorado Boulder

/**
 * Model for the Intro screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  const Range = require( 'DOT/Range' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );

  // constants
  function IntroModel( tandem ) {

    // track set model with friction
    EnergySkateParkFullTrackSetModel.call( this, true, tandem, {
      skaterOptions: {
        defaultMass: SkaterMasses.PHET_SKATER_MASS,
        massRange: new Range( SkaterMasses.BUG_MASS, SkaterMasses.PHET_SKATER_MASS )
      }
    } );
  }

  energySkatePark.register( 'IntroModel', IntroModel );

  return inherit( EnergySkateParkFullTrackSetModel, IntroModel, {} );
} );
