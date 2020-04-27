// Copyright 2018-2020, University of Colorado Boulder

/**
 * Checkboxes that control visibility of items in energy-skate-park, including the pie chart, bar graph, grid,
 * speedometer, and reference height control. Even though the model may support changing a particular Property of this
 * control group, that doesn't mean it will be included in this control group. A single ScreenView might contain
 * more than one of these groups with different sets of Checkboxes, so it is important that each check box can be
 * specifically included/excluded with an option.
 *
 * At the moment, order of checkboxes cannot be controlled.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../../phet-core/js/merge.js';
import AlignGroup from '../../../../../scenery/js/nodes/AlignGroup.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import energySkatePark from '../../../energySkatePark.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import Constants from '../Constants.js';
import EnergyBarGraph from './EnergyBarGraph.js';
import EnergySkateParkCheckboxItem from './EnergySkateParkCheckboxItem.js';

const controlsPathString = energySkateParkStrings.visibilityControls.path;
const controlsReferenceHeightString = energySkateParkStrings.visibilityControls.referenceHeight;
const controlsShowGridString = energySkateParkStrings.visibilityControls.grid;
const controlsStickToTrackString = energySkateParkStrings.trackControls.stickToTrack;
const pieChartString = energySkateParkStrings.plots.pieChart.label;
const plotsBarGraphString = energySkateParkStrings.plots.barGraph.label;
const propertiesSpeedString = energySkateParkStrings.visibilityControls.speed;

// constants
const TEXT_OPTIONS = {
  font: Constants.CHECKBOX_LABEL_FONT,
  maxWidth: 95
};

const CHECKBOX_SPACING = 5; // spacing between checkbox and its icon content

class EnergySkateParkVisibilityControls extends VBox {

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
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

      // {number|null} if specified, the desired width for all checkboxes and icons so that the control can be aligned
      // with other items in a control panel. This will be used to calculate the spacing between the label and icon
      // portion of the Checkox content
      checkboxWidth: null,

      // {*|null} options that are passed to each EnergySkateParkCheckboxItem in this group of controls
      itemOptions: null
    }, options );

    super( {
      align: 'left',
      spacing: 6.5
    } );

    // @private {AlignGroup} - Used to align labels and icons so that every box in the group has the same dimensions
    this.textAlignGroup = new AlignGroup();
    this.iconAlignGroup = new AlignGroup();

    // @private {CheckboxContent[]} - list of contents containing icon nodes and Properties that will be used to
    // create checkboxes
    this.checkboxContents = [];

    // {EnergySkateParkCheckboxItem[]}
    const checkboxItems = [];

    if ( options.showSkaterPathCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createSamplesIcon( tandem.createTandem( 'pathIcon' ) );
      this.addCheckboxContent( controlsPathString, iconNode, model.saveSkaterSamplesProperty, tandem.createTandem( 'pathCheckboxContent' ) );
    }

    if ( options.showPieChartCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ), { scale: 0.8 } );
      this.addCheckboxContent( pieChartString, iconNode, model.pieChartVisibleProperty, tandem.createTandem( 'pieChartCheckboxContent' ) );
    }

    if ( options.showBarGraphCheckbox ) {
      const iconNode = EnergyBarGraph.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale: 0.8 } );
      this.addCheckboxContent( plotsBarGraphString, iconNode, model.barGraphVisibleProperty, tandem.createTandem( 'barGraphCheckboxContent' ) );
    }

    if ( options.showGridCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ), { scale: 0.8 } );
      this.addCheckboxContent( controlsShowGridString, iconNode, model.gridVisibleProperty, tandem.createTandem( 'gridCheckboxContent' ) );
    }

    if ( options.showSpeedCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ), { scale: 0.8 } );
      this.addCheckboxContent( propertiesSpeedString, iconNode, model.speedometerVisibleProperty, tandem.createTandem( 'speedCheckboxContent' ) );
    }

    if ( options.showReferenceHeightCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createReferenceHeightIcon( tandem.createTandem( 'referenceHeightIcon' ) );
      this.addCheckboxContent( controlsReferenceHeightString, iconNode, model.referenceHeightVisibleProperty, tandem.createTandem( 'referenceHeightCheckboxContent' ) );
    }

    if ( options.showStickToTrackCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createStickingToTrackIcon();
      this.addCheckboxContent( controlsStickToTrackString, iconNode, model.stickingToTrackProperty, tandem.createTandem( 'stickingCheckboxContent' ) );
    }

    // set spacing of contents for layout
    if ( options.checkboxWidth ) {
      this.checkboxContents.forEach( content => {
        content.setContentWidthForCheckbox( options.checkboxWidth );
      } );
    }

    if ( options.itemOptions ) {
      assert && assert( options.itemOptions.boxWidth === undefined, 'EnergySkateParkVisibilityControls sets boxWidth' );
      assert && assert( options.itemOptions.spacing === undefined, 'EnergySkateParkVisibilityControls sets spacing' );
    }
    options.itemOptions = merge( {}, options.itemOptions, {
      boxWidth: Constants.CHECKBOX_WIDTH,
      spacing: CHECKBOX_SPACING
    } );

    this.checkboxContents.forEach( content => {
      checkboxItems.push( new EnergySkateParkCheckboxItem( content.checkboxIcon, content.property, content.tandem, options.itemOptions ) );
    } );

    this.children = checkboxItems;
  }

  /**
   * Create and add to the list of checkbox contents. These are created eagerly so that layout can complete before
   * creating checkboxes, as checkboxes do not support icons with variable dimensions.
   * @public
   *
   * @param {string} labelString
   * @param {Node} iconNode
   * @param {BooleanProperty} property
   * @param {Tandem} tandem
   */
  addCheckboxContent( labelString, iconNode, property, tandem ) {
    this.checkboxContents.push( new CheckboxContent( labelString, iconNode, this.textAlignGroup, this.iconAlignGroup, property, tandem ) );
  }
}

/**
 * Inner type that collects the contents for a checkbox, and assigns icons and labels to align groups for layout.
 * This is done BEFORE passing content to checkboxes as checkboxes do not support label nodes with varying dimensions.
 */
class CheckboxContent {

  /**
   * @param {string} labelString
   * @param {Node} iconNode
   * @param {AlignGroup} textAlignGroup
   * @param {AlignGroup} iconAlignGroup
   * @param {BooleanProperty}property
   * @param {Tandem} tandem
   */
  constructor( labelString, iconNode, textAlignGroup, iconAlignGroup, property, tandem ) {

    // create the text and assign to an AlignBox
    const text = new Text( labelString, merge( { tandem: tandem.createTandem( 'text' ) }, TEXT_OPTIONS ) );
    const textBox = textAlignGroup.createBox( text, { xAlign: 'left' } );

    const iconBox = iconAlignGroup.createBox( iconNode, { xAlign: 'center' } );

    // @public {HBox} - contents for the checkbox
    this.checkboxIcon = new HBox( {
      children: [ textBox, iconBox ],
      spacing: 10
    } );

    this.tandem = tandem;

    // @public {BooleanProperty} - Property for the checkbox
    this.property = property;
  }

  /**
   * Set width of the content by modifying spacing between items. Includes width of the checkbox and its spacing so
   * that width can be specified when it is used as Checkbox content. This must be done BEFORE content is passed to
   * a Checkbox because Checkbox does not support content with variable dimensions.
   * @public
   *
   * @param width
   */
  setContentWidthForCheckbox( width ) {
    this.checkboxIcon.spacing = this.checkboxIcon.spacing + ( width - this.checkboxIcon.width ) - Constants.CHECKBOX_WIDTH - CHECKBOX_SPACING;
  }
}

energySkatePark.register( 'EnergySkateParkVisibilityControls', EnergySkateParkVisibilityControls );
export default EnergySkateParkVisibilityControls;