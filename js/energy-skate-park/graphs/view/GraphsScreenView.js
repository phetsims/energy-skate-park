// Copyright 2017, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );

  /**
   * @constructor
   * @param {GraphsModel} model
   */
  function GraphsScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem.createTandem( 'graphsScreenView' ) );
  }

  energySkatePark.register( 'GraphsScreenView', GraphsScreenView );

  return inherit( EnergySkateParkScreenView, GraphsScreenView, {} );
} );
