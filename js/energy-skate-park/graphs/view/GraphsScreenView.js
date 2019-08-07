// Copyright 2018-2019, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkTrackSetScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkTrackSetScreenView' );
  var EnergyGraphAccordionBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/EnergyGraphAccordionBox' );
  var FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  const GraphsVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/GraphsVisibilityControls' );
  var GravityNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityNumberControl' );
  const Node = require( 'SCENERY/nodes/Node' );
  const GravityComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityComboBox' );
  var MassNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassNumberControl' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {GraphsModel} model
   */
  function GraphsScreenView( model, tandem ) {


    // parent layer for ComboBox, would use "this" but it is not available until after super
    const comboBoxParent = new Node();

    var graphsControls = [
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
      new MassNumberControl( model.skater.massProperty, model.skater.massRange, tandem.createTandem( 'massNumberControl' ) ),
      new GravityNumberControl( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) ),
      new GravityComboBox( model.skater.gravityMagnitudeProperty, comboBoxParent, tandem.createTandem( 'gravityComboBox' ) )
    ];

    EnergySkateParkTrackSetScreenView.call( this, model, graphsControls, tandem.createTandem( 'graphsScreenView' ), {
      visibilityControlsOptions: {
        showPieChartCheckbox: false,
        showBarGraphCheckbox: false,
        showGridCheckbox: false,
        showSpeedCheckbox: true,
        showStickToTrackCheckbox: true
      }
    } );

    this.addChild( comboBoxParent );

    // @private - for layout
    this.graphAccordionBox = new EnergyGraphAccordionBox( model, this.modelViewTransform, tandem.createTandem( 'graphAccordionBox' ) );
    this.addChild( this.graphAccordionBox );

    // grid and reference height visibility are controlled from a separate area in the "graphs" screen
    this.graphsVisibilityControls = new GraphsVisibilityControls( model, tandem.createTandem( 'graphsVisibilityControls' ), {
      centerY: this.resetAllButton.centerY
    } );
    this.addChild( this.graphsVisibilityControls );
  }

  energySkatePark.register( 'GraphsScreenView', GraphsScreenView );

  return inherit( EnergySkateParkTrackSetScreenView, GraphsScreenView, {

    /**
     * Special layout for the energy-skate-park, contents can float to the available bounds.
     * @override
     */
    layout: function( width, height ) {
      EnergySkateParkTrackSetScreenView.prototype.layout.call( this, width, height );

      // the graph within the accordion box needs to line up with the track so that skater positions on the
      // track align perfectly with positions along the graph
      this.graphAccordionBox.right = this.trackLayer.right + EnergyGraphAccordionBox.GRAPH_OFFSET;
      this.graphAccordionBox.top = this.controlPanel.top;

      this.graphsVisibilityControls.left = this.graphAccordionBox.left;
      this.graphsVisibilityControls.centerY = this.resetAllButton.centerY;
    }
  } );
} );
