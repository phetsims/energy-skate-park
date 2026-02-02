// Copyright 2018-2026, University of Colorado Boulder

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

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkSaveSampleModel from '../model/EnergySkateParkSaveSampleModel.js';
import EnergySkateParkCheckboxItem, { EnergySkateParkCheckboxItemOptions } from './EnergySkateParkCheckboxItem.js';

const controlsPathStringProperty = EnergySkateParkStrings.visibilityControls.pathStringProperty;
const controlsReferenceHeightStringProperty = EnergySkateParkStrings.visibilityControls.referenceHeightStringProperty;
const controlsShowGridStringProperty = EnergySkateParkStrings.visibilityControls.gridStringProperty;
const controlsStickToTrackStringProperty = EnergySkateParkStrings.trackControls.stickToTrackStringProperty;
const pieChartStringProperty = EnergySkateParkStrings.plots.pieChart.labelStringProperty;
const propertiesSpeedStringProperty = EnergySkateParkStrings.visibilityControls.speedStringProperty;

// constants
const TEXT_OPTIONS = {
  font: EnergySkateParkConstants.CHECKBOX_LABEL_FONT,
  maxWidth: 117
};

const CHECKBOX_SPACING = 6; // spacing between checkbox and its icon content

type SelfOptions = {
  // whether Checkboxes for these Properties are included in the controls
  showPieChartCheckbox?: boolean;
  showGridCheckbox?: boolean;
  showSpeedCheckbox?: boolean;
  showReferenceHeightCheckbox?: boolean;
  showSkaterPathCheckbox?: boolean;
  showStickToTrackCheckbox?: boolean;

  // if specified, the desired width for all checkboxes and icons so that the control can be aligned
  // with other items in a control panel. This will be used to calculate the spacing between the label and icon
  // portion of the Checkbox content
  checkboxWidth?: number | null;

  // options that are passed to each EnergySkateParkCheckboxItem in this group of controls
  itemOptions?: EnergySkateParkCheckboxItemOptions | null;
};

export type EnergySkateParkVisibilityControlsOptions = SelfOptions & VBoxOptions;

export default class EnergySkateParkVisibilityControls extends VBox {
  // Used to align labels and icons so that every box in the group has the same dimensions
  private readonly textAlignGroup: AlignGroup;
  private readonly iconAlignGroup: AlignGroup;

  // List of contents containing icon nodes and Properties that will be used to create checkboxes
  private readonly checkboxContents: CheckboxContent[];

  public constructor( model: EnergySkateParkModel, tandem: Tandem, providedOptions?: EnergySkateParkVisibilityControlsOptions ) {
    const options = optionize<SelfOptions>()( {
      showPieChartCheckbox: true,
      showGridCheckbox: false,
      showSpeedCheckbox: true,
      showReferenceHeightCheckbox: false,
      showSkaterPathCheckbox: false,
      showStickToTrackCheckbox: false,
      checkboxWidth: null,
      itemOptions: null
    }, providedOptions );

    super( {
      align: 'left',
      spacing: 5
    } );

    this.textAlignGroup = new AlignGroup();
    this.iconAlignGroup = new AlignGroup();
    this.checkboxContents = [];

    // {EnergySkateParkCheckboxItem[]}
    const checkboxItems: EnergySkateParkCheckboxItem[] = [];

    if ( options.showPieChartCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createPieChartIcon( tandem.createTandem( 'pieChartIcon' ) );
      this.addCheckboxContent( pieChartStringProperty, iconNode, model.pieChartVisibleProperty, tandem.createTandem( 'pieChartCheckbox' ) );
    }

    if ( options.showGridCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createGridIcon( tandem.createTandem( 'gridIcon' ) );
      this.addCheckboxContent( controlsShowGridStringProperty, iconNode, model.gridVisibleProperty, tandem.createTandem( 'gridCheckbox' ) );
    }

    if ( options.showSpeedCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createSpeedometerIcon( tandem.createTandem( 'speedIcon' ) );
      this.addCheckboxContent( propertiesSpeedStringProperty, iconNode, model.speedometerVisibleProperty, tandem.createTandem( 'speedCheckbox' ) );
    }

    if ( options.showSkaterPathCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createSamplesIcon( tandem.createTandem( 'pathIcon' ) );
      affirm( model instanceof EnergySkateParkSaveSampleModel, 'Skater path checkbox requires EnergySkateParkSaveSampleModel' );
      this.addCheckboxContent( controlsPathStringProperty, iconNode, model.saveSamplesProperty, tandem.createTandem( 'pathCheckbox' ) );
    }

    if ( options.showReferenceHeightCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createReferenceHeightIcon();
      this.addCheckboxContent( controlsReferenceHeightStringProperty, iconNode, model.referenceHeightVisibleProperty, tandem.createTandem( 'referenceHeightCheckbox' ) );
    }

    if ( options.showStickToTrackCheckbox ) {
      const iconNode = EnergySkateParkCheckboxItem.createStickingToTrackIcon();

      // this is the only checkbox that controls model physics, if it gets changed
      // by the user we may need to clear saved data or do other things
      const userControlledProperty = model.userControlledPropertySet.stickingToTrackControlledProperty;
      this.addCheckboxContent( controlsStickToTrackStringProperty, iconNode, model.stickingToTrackProperty, tandem.createTandem( 'stickingCheckbox' ), {
        userControlledProperty: userControlledProperty
      } );
    }

    // set spacing of contents for layout
    if ( options.checkboxWidth ) {
      this.checkboxContents.forEach( content => {
        content.setContentWidthForCheckbox( options.checkboxWidth! );
      } );
    }

    if ( options.itemOptions ) {
      assert && assert( options.itemOptions.boxWidth === undefined, 'EnergySkateParkVisibilityControls sets boxWidth' );
      assert && assert( options.itemOptions.spacing === undefined, 'EnergySkateParkVisibilityControls sets spacing' );
    }
    options.itemOptions = merge( {}, options.itemOptions, {
      boxWidth: EnergySkateParkConstants.CHECKBOX_WIDTH,
      spacing: CHECKBOX_SPACING
    } );

    this.checkboxContents.forEach( content => {
      options.itemOptions = merge( {}, options.itemOptions, {
        userControlledProperty: content.userControlledProperty
      } );

      checkboxItems.push( new EnergySkateParkCheckboxItem( content.property, content.checkboxIcon, content.tandem, options.itemOptions ) );
    } );

    this.children = checkboxItems;
  }

  /**
   * Create and add to the list of checkbox contents. These are created eagerly so that layout can complete before
   * creating checkboxes, as checkboxes do not support icons with variable dimensions.
   */
  private addCheckboxContent( labelString: TReadOnlyProperty<string>, iconNode: Node, property: BooleanProperty, tandem: Tandem, options?: { userControlledProperty: BooleanProperty } ): void {
    this.checkboxContents.push( new CheckboxContent( labelString, iconNode, this.textAlignGroup, this.iconAlignGroup, property, tandem, options ) );
  }
}

/**
 * Inner type that collects the contents for a checkbox, and assigns icons and labels to align groups for layout.
 * This is done BEFORE passing content to checkboxes as checkboxes do not support label nodes with varying dimensions.
 */
class CheckboxContent {
  // Contents for the checkbox
  public readonly checkboxIcon: HBox;

  // Property for the checkbox
  public readonly property: BooleanProperty;

  // Property indicating that the checkbox Property has been changed by the user
  public readonly userControlledProperty: BooleanProperty | null;

  public readonly tandem: Tandem;

  public constructor( labelString: TReadOnlyProperty<string>, iconNode: Node, textAlignGroup: AlignGroup, iconAlignGroup: AlignGroup, property: BooleanProperty, tandem: Tandem, options?: {

    // {BooleanProperty} - Property indicating that the checkbox Property has been
    // changed by the user (rather than internally by the sim), allowing us
    // to do extra work if user changes directly
    userControlledProperty: BooleanProperty;
  } ) {

    // create the text and assign to an AlignBox
    const text = new Text( labelString, merge( { tandem: tandem.createTandem( 'text' ) }, TEXT_OPTIONS ) );
    const textBox = textAlignGroup.createBox( text, { xAlign: 'left' } );

    const iconBox = iconAlignGroup.createBox( iconNode, { xAlign: 'center' } );

    this.checkboxIcon = new HBox( {
      children: [ textBox, iconBox ],
      spacing: 10
    } );

    this.tandem = tandem;
    this.property = property;
    this.userControlledProperty = options ? options.userControlledProperty : null;
  }

  /**
   * Set width of the content by modifying spacing between items. Includes width of the checkbox and its spacing so
   * that width can be specified when it is used as Checkbox content. This must be done BEFORE content is passed to
   * a Checkbox because Checkbox does not support content with variable dimensions.
   *
   * @param width
   */
  public setContentWidthForCheckbox( width: number ): void {
    this.checkboxIcon.spacing = this.checkboxIcon.spacing + ( width - this.checkboxIcon.width ) - EnergySkateParkConstants.CHECKBOX_WIDTH - CHECKBOX_SPACING;
  }
}

energySkatePark.register( 'EnergySkateParkVisibilityControls', EnergySkateParkVisibilityControls );