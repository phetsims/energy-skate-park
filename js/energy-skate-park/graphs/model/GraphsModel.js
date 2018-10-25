// Copyright 2017, University of Colorado Boulder

/**
 * Model for the Graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  function GraphsModel( tandem ) {

    // track set model with no friction
    EnergySkateParkFullTrackSetModel.call( this, false, tandem.createTandem( 'graphsModel' ) );
  }

  energySkatePark.register( 'GraphsModel', GraphsModel );

  return inherit( EnergySkateParkFullTrackSetModel, GraphsModel, {} );
} );
