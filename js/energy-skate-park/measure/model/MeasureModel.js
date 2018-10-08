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
  var EnergySkateParkTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkTrackSetModel' );

  // constants
  function MeasureModel( tandem ) {

    // a track set model, with friction allowed
    EnergySkateParkTrackSetModel.call( this, true, tandem );
  }

  energySkatePark.register( 'MeasureModel', MeasureModel );

  return inherit( EnergySkateParkTrackSetModel, MeasureModel, {} );
} );
