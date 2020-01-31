// Copyright 2018-2019, University of Colorado Boulder

/**
 * Checkboxes that control visibility of items in energy-skate-park, including the pie chart, bar graph, grid,
 * speedometer, and reference height control. Even though the model may support changing a particular Property of this
 * control group, that doesn't mean it will be included in this control group. A single ScreenView might contain
 * more than one of these groups with different sets of Checkboxes, so it is important that each check box can be
 * specifically included/excluded with an option.
 *
 * At the moment, order of checkboxes cannot be controlled.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const EnergyBarGraph = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraph' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkCheckboxItem = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkCheckboxItem' );
  const merge = require( 'PHET_CORE/merge' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const controlsPathString = require( 'string!ENERGY_SKATE_PARK/controls.path' );
  const controlsReferenceHeightString = require( 'string!ENERGY_SKATE_PARK/controls.referenceHeight' );
  const controlsShowGridString = require( 'string!ENERGY_SKATE_PARK/controls.show-grid' );
  const controlsStickToTrackString = require( 'string!ENERGY_SKATE_PARK/controls.stickToTrack' );
  const pieChartString = require( 'string!ENERGY_SKATE_PARK/pieChart' );
  const plotsBarGraphString = require( 'string!ENERGY_SKATE_PARK/plots.bar-graph' );
  const propertiesSpeedString = require( 'string!ENERGY_SKATE_PARK/properties.speed' );

  class EnergySkateParkVisibilityControls extends VBox {

    /**
     * @constructor
     * @param {Array.<EnergySkateParkCheckboxItem>} checkboxItems
     * @param {object} options
     */
    constructor( model, tandem, options ) {
      options = merge( {

        // {boolean} - whether or not Checkboxes for these Properties are included in the controls
        showPieChartCheckbox: true,
        showBarGraphCheckbox: false,
        showGridCheckbox: false,
        showSpeedCheckbox: true,
        showReferenceHeightCheckbox: false,
        showSkaterPathCheckbox: false,
        showStickToTrackCheckbox: false,

        // {*|null} options that are passed to each EnergySkateParkCheckboxItem in this group of controls
        itemOptions: null
      }, options );

      const itemAlignGroup = new AlignGroup();
      const checkboxItems = [];

      if ( options.showSkaterPathCheckbox ) {
        assert && assert( model.saveSkaterSamplesProperty, 'no Property for measuring samples, add to model or dont show this' );

        checkboxItems.push(
          new EnergySkateParkCheckboxItem(
            controlsPathString,
            EnergySkateParkCheckboxItem.createSamplesIcon( tandem.createTandem( 'pathIcon' ) ),
            itemAlignGroup,
            model.saveSkaterSamplesProperty,
            tandem.createTandem( 'pathCheckbox' ),
            options.itemOptions
          )
        );
      }

      if ( options.showPieChartCheckbox ) {
        checkboxItems.push(
          new EnergySkateParkCheckboxItem(
            pieChartString,
            EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ), { scale: 0.8 } ),
            itemAlignGroup,
            model.pieChartVisibleProperty,
            tandem.createTandem( 'pieChartCheckbox' ),
            options.itemOptions
          )
        );
      }

      if ( options.showBarGraphCheckbox ) {
        checkboxItems.push( new EnergySkateParkCheckboxItem(
          plotsBarGraphString,
          EnergyBarGraph.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale: 0.8 } ),
          itemAlignGroup,
          model.barGraphVisibleProperty,
          tandem.createTandem( 'barGraphCheckbox' ),
          options.itemOptions
        ) );
      }

      if ( options.showGridCheckbox ) {
        checkboxItems.push( new EnergySkateParkCheckboxItem(
          controlsShowGridString,
          EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ), { scale: 0.8 } ),
          itemAlignGroup,
          model.gridVisibleProperty,
          tandem.createTandem( 'gridCheckbox' ),
          options.itemOptions
        ) );
      }

      if ( options.showSpeedCheckbox ) {
        checkboxItems.push( new EnergySkateParkCheckboxItem(
          propertiesSpeedString,
          EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ), { scale: 0.8 } ),
          itemAlignGroup,
          model.speedometerVisibleProperty,
          tandem.createTandem( 'speedometerCheckbox' ),
          options.itemOptions
        ) );
      }

      if ( options.showReferenceHeightCheckbox ) {
        checkboxItems.push(
          new EnergySkateParkCheckboxItem(
            controlsReferenceHeightString,
            EnergySkateParkCheckboxItem.createReferenceHeightIcon( tandem.createTandem( 'referenceHeightIcon' ) ),
            itemAlignGroup,
            model.referenceHeightVisibleProperty,
            tandem.createTandem( 'referenceHeightCheckbox' ),
            options.itemOptions
          )
        );
      }

      if ( options.showStickToTrackCheckbox ) {
        checkboxItems.push( new EnergySkateParkCheckboxItem(
          controlsStickToTrackString,
          EnergySkateParkCheckboxItem.createStickingToTrackIcon(),
          itemAlignGroup,
          model.stickingToTrackProperty,
          tandem.createTandem( 'stickToTrackCheckbox' ),
          options.itemOptions
        ) );
      }

      super( {
        children: checkboxItems,
        align: 'left',
        spacing: 6.5
      } );

    }
  }

  return energySkatePark.register( 'EnergySkateParkVisibilityControls', EnergySkateParkVisibilityControls );
} );
