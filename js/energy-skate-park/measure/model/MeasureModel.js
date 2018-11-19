// Copyright 2018, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  function MeasureModel( tandem ) {

    // a track set model, with friction allowed
    EnergySkateParkFullTrackSetModel.call( this, true, tandem );
  }

  energySkatePark.register( 'MeasureModel', MeasureModel );

  return inherit( EnergySkateParkFullTrackSetModel, MeasureModel, {} );
} );
