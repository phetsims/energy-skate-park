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
  var FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  var GravitySlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravitySlider' );
  var EnergySkateParkControlPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  function LabScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem.createTandem( 'graphsScreenView' ) );

    var graphsControls = [
      new GravitySlider( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) ),
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) )
    ];
    this.controlPanel = new EnergySkateParkControlPanel( model, this, graphsControls, tandem.createTandem( 'controlPanel' ) );
    this.addToBottomLayer( this.controlPanel );
  }

  energySkatePark.register( 'LabScreenView', LabScreenView );

  return inherit( EnergySkateParkScreenView, LabScreenView, {} );
} );
