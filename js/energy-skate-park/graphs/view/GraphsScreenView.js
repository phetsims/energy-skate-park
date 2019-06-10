// Copyright 2018-2019, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var EnergyGraphAccordionBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/EnergyGraphAccordionBox' );
  var FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  var GravitySlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravitySlider' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {GraphsModel} model
   */
  function GraphsScreenView( model, tandem ) {

    var graphsControls = [
      new GravitySlider( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) ),
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) )
    ];

    EnergySkateParkScreenView.call( this, model, graphsControls, tandem.createTandem( 'graphsScreenView' ) );

    // @private - for layout
    this.graphAccordionBox = new EnergyGraphAccordionBox( model );
    this.addChild( this.graphAccordionBox );
  }

  energySkatePark.register( 'GraphsScreenView', GraphsScreenView );

  return inherit( EnergySkateParkScreenView, GraphsScreenView, {} );
} );
