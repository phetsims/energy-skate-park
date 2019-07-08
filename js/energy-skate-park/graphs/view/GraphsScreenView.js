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
  const GraphsVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/GraphsVisibilityControls' );
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

    EnergySkateParkScreenView.call( this, model, graphsControls, tandem.createTandem( 'graphsScreenView' ), {
      visibilityControlsOptions: {
        showPieChartCheckbox: false,
        showBarGraphCheckbox: false,
        showGridCheckbox: false,
        showSpeedCheckbox: true,
        showStickToTrackCheckbox: true
      }
    } );

    // @private - for layout
    this.graphAccordionBox = new EnergyGraphAccordionBox( model, tandem.createTandem( 'graphAccordionBox' ) );
    this.addChild( this.graphAccordionBox );

    // grid and reference height visibility are controlled from a separate area in the "graphs" screen
    this.graphsVisibilityControls = new GraphsVisibilityControls( model, tandem.createTandem( 'graphsVisibilityControls' ), {
      centerY: this.resetAllButton.centerY
    } );
    this.addChild( this.graphsVisibilityControls );
  }

  energySkatePark.register( 'GraphsScreenView', GraphsScreenView );

  return inherit( EnergySkateParkScreenView, GraphsScreenView, {

    /**
     * Special layout for the energy-skate-park, contents can float to the available bounds.
     * @override
     */
    layout: function( width, height ) {
      EnergySkateParkScreenView.prototype.layout.call( this, width, height );

      this.graphAccordionBox.top = this.controlPanel.top;
      this.graphAccordionBox.left = this.availableViewBounds.minX + 5;

      this.graphsVisibilityControls.left = this.graphAccordionBox.left;
      this.graphsVisibilityControls.centerY = this.resetAllButton.centerY;
    }
  } );
} );
