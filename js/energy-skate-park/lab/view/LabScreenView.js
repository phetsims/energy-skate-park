// Copyright 2018, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  function LabScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem.createTandem( 'graphsScreenView' ) );
  }

  energySkatePark.register( 'LabScreenView', LabScreenView );

  return inherit( EnergySkateParkScreenView, LabScreenView, {} );
} );
