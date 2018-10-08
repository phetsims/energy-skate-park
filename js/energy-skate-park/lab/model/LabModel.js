// Copyright 2017, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkPlaygroundModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkPlaygroundModel' );

  // constants
  function LabModel( tandem ) {

    // Playground model, with friction
    EnergySkateParkPlaygroundModel.call( this, true, tandem.createTandem( 'introModel' ) );
  }

  energySkatePark.register( 'LabModel', LabModel );

  return inherit( EnergySkateParkPlaygroundModel, LabModel, {} );
} );
