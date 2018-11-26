// Copyright 2018, University of Colorado Boulder

/**
 * Checkboxes that control visibility of items in energy-skate-park, including the pie chart, bar graph, grid,
 * speedometer, and reference height control.
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

      // include a checkbox that enables/disables samples? If true, this is the first checkbox in the set
      includeSamplesCheckbox: false
    }, options );

    var itemAlignGroup = new AlignGroup();
    var checkboxItems = [
      new EnergySkateParkCheckboxItem(
        pieChartString,
        EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.pieChartVisibleProperty,
        tandem
      ),
      new EnergySkateParkCheckboxItem(
        plotsBarGraphString,
        EnergySkateParkCheckboxItem.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale:0.8 } ),
        itemAlignGroup,
        model.barGraphVisibleProperty,
        tandem
      ),
      new EnergySkateParkCheckboxItem( 
        controlsShowGridString,
        EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.gridVisibleProperty,
        tandem
      ),
      new EnergySkateParkCheckboxItem(
        propertiesSpeedString,
        EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.speedometerVisibleProperty,
        tandem
      ),
      new EnergySkateParkCheckboxItem(
        controlsReferenceHeightString,
        EnergySkateParkCheckboxItem.createReferenceHeightIcon( tandem.createTandem( 'referenceHeightIcon' ) ),
        itemAlignGroup,
        model.referenceHeightVisibleProperty,
        tandem
      )
    ];

    if ( options.includeSamplesCheckbox ) {
      assert && assert( model.sampleSkaterProperty, 'no Property for measuring samples, add to model or don\'t use options' );

      checkboxItems.unshift(
        new EnergySkateParkCheckboxItem(
          controlsPathString,
          EnergySkateParkCheckboxItem.createSamplesIcon( tandem.createTandem( 'pathIcon' ) ),
          itemAlignGroup,
          model.sampleSkaterProperty,
          tandem
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
