// Copyright 2018, University of Colorado Boulder

/**
 * Checkboxes that control visibility of items in energy-skate-park, including the pie chart, bar graph, grid,
 * speedometer, and reference height control.
 *
 * At the moment, order of checkboxes cannot be controlled.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkCheckboxItem = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkCheckboxItem' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var controlsPathString = require( 'string!ENERGY_SKATE_PARK/controls.path' );
  var controlsReferenceHeightString = require( 'string!ENERGY_SKATE_PARK/controls.referenceHeight' );
  var controlsShowGridString = require( 'string!ENERGY_SKATE_PARK/controls.show-grid' );
  var pieChartString = require( 'string!ENERGY_SKATE_PARK/pieChart' );
  var plotsBarGraphString = require( 'string!ENERGY_SKATE_PARK/plots.bar-graph' );
  var propertiesSpeedString = require( 'string!ENERGY_SKATE_PARK/properties.speed' );

  /**
   * @constructor
   * @param {Array.<EnergySkateParkCheckboxItem>} checkboxItems
   * @param {object} options
   */
  function EnergySkateParkVisibilityControls( model, tandem, options ) {

    options = _.extend( {
      includeSamplesCheckbox: false,
      includeBarGraphCheckbox: true,
      includeReferenceHeightCheckbox: true
    }, options );

    var itemAlignGroup = new AlignGroup();
    var checkboxItems = [];

    if ( options.includeSamplesCheckbox ) {
      assert && assert( model.sampleSkaterProperty, 'no Property for measuring samples, add to model or don\'t use options' );

      checkboxItems.push(
        new EnergySkateParkCheckboxItem(
          controlsPathString,
          EnergySkateParkCheckboxItem.createSamplesIcon( tandem.createTandem( 'pathIcon' ) ),
          itemAlignGroup,
          model.sampleSkaterProperty,
          tandem.createTandem( 'pathCheckbox' )
        )
      );
    }

    checkboxItems.push(
      new EnergySkateParkCheckboxItem(
        pieChartString,
        EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.pieChartVisibleProperty,
        tandem.createTandem( 'pieChartCheckbox' )
      ),
    );

    if ( options.includeBarGraphCheckbox ) {
      checkboxItems.push( new EnergySkateParkCheckboxItem(
        plotsBarGraphString,
        EnergySkateParkCheckboxItem.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.barGraphVisibleProperty,
        tandem.createTandem( 'barGraphCheckbox' )
      ), );
    }

    checkboxItems = checkboxItems.concat( [
      new EnergySkateParkCheckboxItem(
        controlsShowGridString,
        EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.gridVisibleProperty,
        tandem.createTandem( 'gridCheckbox' )
      ),
      new EnergySkateParkCheckboxItem(
        propertiesSpeedString,
        EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.speedometerVisibleProperty,
        tandem.createTandem( 'speedometerCheckbox' )
      )
    ] );

    if ( options.includeReferenceHeightCheckbox ) {
      checkboxItems.push(
        new EnergySkateParkCheckboxItem(
          controlsReferenceHeightString,
          EnergySkateParkCheckboxItem.createReferenceHeightIcon( tandem.createTandem( 'referenceHeightIcon' ) ),
          itemAlignGroup,
          model.referenceHeightVisibleProperty,
          tandem.createTandem( 'referenceHeightCheckbox' )
        )
      );
    }

    VBox.call( this, {
      children: checkboxItems,
      align: 'left',
      spacing: 6.5
    } );
  }

  energySkatePark.register( 'EnergySkateParkVisibilityControls', EnergySkateParkVisibilityControls );

  return inherit( VBox, EnergySkateParkVisibilityControls, {} );
} );
