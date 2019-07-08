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
  const controlsStickToTrackString = require( 'string!ENERGY_SKATE_PARK/controls.stickToTrack' );

  /**
   * @constructor
   * @param {Array.<EnergySkateParkCheckboxItem>} checkboxItems
   * @param {object} options
   */
  function EnergySkateParkVisibilityControls( model, tandem, options ) {

    options = _.extend( {

      // {boolean} - whether or not Checkboxes for these Properties are included in the controls
      showPieChartCheckbox: true,
      showBarGraphCheckbox: true,
      showGridCheckbox: true,
      showSpeedCheckbox: true,
      showReferenceHeightCheckbox: false,
      showSkaterPathCheckbox: false,
      showStickToTrackCheckbox: false
    }, options );

    var itemAlignGroup = new AlignGroup();
    var checkboxItems = [];

    if ( options.showSkaterPathCheckbox ) {
      assert && assert( model.sampleSkaterProperty, 'no Property for measuring samples, add to model or dont show this' );

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

    if ( options.showPieChartCheckbox ) {
      checkboxItems.push(
        new EnergySkateParkCheckboxItem(
          pieChartString,
          EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ), { scale: 0.8 } ),
          itemAlignGroup,
          model.pieChartVisibleProperty,
          tandem.createTandem( 'pieChartCheckbox' )
        ),
      );  
    }
 

    if ( options.showBarGraphCheckbox ) {
      checkboxItems.push( new EnergySkateParkCheckboxItem(
        plotsBarGraphString,
        EnergySkateParkCheckboxItem.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.barGraphVisibleProperty,
        tandem.createTandem( 'barGraphCheckbox' )
      ), );
    }

    if ( options.showGridCheckbox ) {
      checkboxItems.push( new EnergySkateParkCheckboxItem(
        controlsShowGridString,
        EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.gridVisibleProperty,
        tandem.createTandem( 'gridCheckbox' )
      ) );
    }

    if ( options.showSpeedCheckbox ) {
      checkboxItems.push( new EnergySkateParkCheckboxItem(
        propertiesSpeedString,
        EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ), { scale: 0.8 } ),
        itemAlignGroup,
        model.speedometerVisibleProperty,
        tandem.createTandem( 'speedometerCheckbox' )
      ) );
    }

    if ( options.showReferenceHeightCheckbox ) {
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

    if ( options.showStickToTrackCheckbox ) {
      checkboxItems.push( new EnergySkateParkCheckboxItem( 
        controlsStickToTrackString,
        EnergySkateParkCheckboxItem.createStickingToTrackIcon(),
        itemAlignGroup,
        model.stickingToTrackProperty,
        tandem.createTandem( 'stickToTrackCheckbox' )
      ) );
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
