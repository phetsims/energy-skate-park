// Copyright 2018, University of Colorado Boulder

/**
 * Energ
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var SkaterSamplesNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterSamplesNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   */
  function MeasureScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem );

    // TODO: Does it matter which layer?
    this.addToTopLayer( new SkaterSamplesNode( model, this.modelViewTransform ) );
  }

  energySkatePark.register( 'MeasureScreenView', MeasureScreenView );

  return inherit( EnergySkateParkScreenView, MeasureScreenView, {} );
} );
