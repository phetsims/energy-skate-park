// Copyright 2019-2020, University of Colorado Boulder

/**
 * The accordion box in the "Graphs" screen that contains the energy graphs, as well as controls for
 * controlling the data.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import merge from '../../../../../phet-core/js/merge.js';
import EraserButton from '../../../../../scenery-phet/js/buttons/EraserButton.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import ABSwitch from '../../../../../sun/js/ABSwitch.js';
import AccordionBox from '../../../../../sun/js/AccordionBox.js';
import VerticalCheckboxGroup from '../../../../../sun/js/VerticalCheckboxGroup.js';
import energySkatePark from '../../../energySkatePark.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import Constants from '../../common/Constants.js';
import GraphsConstants from '../GraphsConstants.js';
import GraphsModel from '../model/GraphsModel.js';
import EnergyGraphZoomButton from './EnergyGraphZoomButton.js';
import EnergyPlot from './EnergyPlot.js';

const kineticEnergyLabelString = energySkateParkStrings.energies.kinetic;
const potentialEnergyLabelString = energySkateParkStrings.energies.potential;
const thermalEnergyLabelString = energySkateParkStrings.energies.thermal;
const totalEnergyLabelString = energySkateParkStrings.energies.total;
const timeSwitchLabelString = energySkateParkStrings.plots.timeSwitchLabel;
const positionSwitchLabelString = energySkateParkStrings.plots.positionSwitchLabel;
const plotsEnergyGraphString = energySkateParkStrings.plots.energyGraph.label;
const plotsPositionLabelString = energySkateParkStrings.plots.positionLabel;
const plotsEnergyLabelString = energySkateParkStrings.plots.energyLabel;
const plotsTimeLabelString = energySkateParkStrings.plots.timeLabel;

// constants
const GRAPH_HEIGHT = 115;

// margin for content within the panel
const CONTENT_X_MARGIN = 4;

// size of the ABSwitch that changes from plotting position vs time
const SWITCH_SIZE = new Dimension2( 30, 15 );

const LABEL_FONT = new PhetFont( { size: 12 } );

class EnergyGraphAccordionBox extends AccordionBox {

  /**
   * @param {GraphsModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   */
  constructor( model, modelViewTransform, tandem ) {

    // the parent for all content of the accordion box
    const contentNode = new Node();

    // check boxes for visibility of energy data
    const checkboxGroup = new VerticalCheckboxGroup( [
      EnergyGraphAccordionBox.createCheckboxItem( model.kineticEnergyDataVisibleProperty, kineticEnergyLabelString ),
      EnergyGraphAccordionBox.createCheckboxItem( model.potentialEnergyDataVisibleProperty, potentialEnergyLabelString ),
      EnergyGraphAccordionBox.createCheckboxItem( model.thermalEnergyDataVisibleProperty, thermalEnergyLabelString ),
      EnergyGraphAccordionBox.createCheckboxItem( model.totalEnergyDataVisibleProperty, totalEnergyLabelString )
    ], {
      checkboxOptions: {
        boxWidth: Constants.CHECKBOX_WIDTH
      }
    } );
    contentNode.addChild( checkboxGroup );

    // the graph is as long as the tracks in the Graphs screen so that position of the skater matches
    // with position along the plot
    const graphWidth = modelViewTransform.modelToViewDeltaX( GraphsConstants.TRACK_WIDTH );

    const energyPlot = new EnergyPlot( model, graphWidth, GRAPH_HEIGHT, tandem.createTandem( 'energyPlot' ) );
    contentNode.addChild( energyPlot );

    // eraser button to clear all data from the graph
    const eraserButton = new EraserButton( {
      listener: () => {
        this.clearEnergyData();
      },

      tandem: tandem.createTandem( 'eraserButton' )
    } );

    // ABSwitch to change plotting variables
    const switchLabelOptions = {
      font: new PhetFont( { size: 11 } ),
      maxWidth: 100
    };
    const variables = GraphsModel.IndependentVariable;
    const variableSwitchTandem = tandem.createTandem( 'variableSwitch' );
    const positionLabel = new Text( positionSwitchLabelString, merge( {
      tandem: variableSwitchTandem.createTandem( 'positionLabel' )
    }, switchLabelOptions ) );
    const timeLabel = new Text( timeSwitchLabelString, merge( {
      tandem: variableSwitchTandem.createTandem( 'timeLabel' )
    }, switchLabelOptions ) );
    const variableSwitch = new ABSwitch( model.independentVariableProperty, variables.POSITION, positionLabel, variables.TIME, timeLabel, {
      toggleSwitchOptions: { size: SWITCH_SIZE },
      tandem: variableSwitchTandem
    } );

    // zoom buttons
    const zoomInButton = new EnergyGraphZoomButton( model.lineGraphScaleProperty, {
      tandem: tandem.createTandem( 'zoomInButton' )
    } );
    const zoomOutButton = new EnergyGraphZoomButton( model.lineGraphScaleProperty, {
      in: false,
      tandem: tandem.createTandem( 'zoomOutButton' )
    } );
    const zoomButtons = new VBox( {
      children: [ zoomInButton, zoomOutButton ],
      spacing: 5
    } );

    // graph labels - y axis includes zoom buttons as part of the label
    const yLabelText = new Text( plotsEnergyLabelString, {
      rotation: -Math.PI / 2,
      font: LABEL_FONT,
      maxWidth: energyPlot.height / 2
    } );
    const xLabelText = new Text( '', { font: LABEL_FONT, maxWidth: energyPlot.width } );
    const yLabel = new VBox( {
      children: [ yLabelText, zoomButtons ],
      spacing: 10
    } );
    contentNode.addChild( yLabel );
    contentNode.addChild( xLabelText );

    const labelNode = new Text( plotsEnergyGraphString, {
      font: new PhetFont( { size: 16 } ),
      maxWidth: energyPlot.width / 3
    } );
    const titleNode = new Node( {
      children: [
        labelNode,
        variableSwitch,
        eraserButton
      ]
    } );

    // initial positioning for titleNode and content before passing to AccordionBox
    variableSwitch.left = labelNode.right;
    variableSwitch.centerY = labelNode.centerY;
    eraserButton.centerY = labelNode.centerY;

    yLabel.rightCenter = energyPlot.leftCenter.minusXY( 10, 0 );
    xLabelText.centerTop = energyPlot.centerBottom.plusXY( 0, 10 );
    checkboxGroup.rightCenter = yLabel.leftCenter.minusXY( 10, 0 );

    super( contentNode, merge( {
      titleNode: titleNode,
      titleAlignX: 'left',
      titleXSpacing: 7,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentYMargin: 2,
      contentXMargin: 5,
      contentYSpacing: 0,

      // clicking doesn't expand since the title contains other controls
      titleBarExpandCollapse: false,

      expandedProperty: model.energyPlotVisibleProperty,
      tandem: tandem.createTandem( 'accordionBox' )
    }, Constants.PANEL_OPTIONS ) );

    // position the elements of the titleNode using global positioning after AccordionBox positions its titleNode
    variableSwitch.centerX = variableSwitch.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.plotPath.center ) ).x;
    eraserButton.right = eraserButton.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.plotPath.rightCenter ) ).x;

    // The variable switch and eraser button are part of the title layout but should only be visible when
    // expanded
    this.expandedProperty.link( expanded => {
      variableSwitch.visible = expanded;
      eraserButton.visible = expanded;
    } );

    // @public
    this.energyPlot = energyPlot;

    // @private {GraphsModel}
    this.model = model;

    // listeners - when the independent variable changes, clear all data and update labels
    model.independentVariableProperty.link( independentVariable => {
      xLabelText.text = independentVariable === GraphsModel.IndependentVariable.TIME ? plotsTimeLabelString : plotsPositionLabelString;
      xLabelText.centerX = xLabelText.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.plotPath.center ) ).x;
      this.clearEnergyData();
    } );

    model.lineGraphScaleProperty.link( scale => {
      const range = model.lineGraphScaleProperty.range;
      assert && assert( model.lineGraphScaleProperty.range, 'please define a range for lineGraphScaleProperty' );
      zoomInButton.enabled = scale > range.min;
      zoomOutButton.enabled = scale < range.max;
    } );
  }

  /**
   * Clear all data, removing saved SkaterSamples and removing all data from the series attached to the XYPlot.
   * @private
   */
  clearEnergyData() {
    this.model.clearEnergyData();
    this.energyPlot.clearEnergyDataSeries();
  }

  /**
   * Create an "item" for a checkbox of the VerticalCheckboxGroup, with the label and controlling Property.
   * @private
   *
   * @param {Property} property
   * @param {string} labelString
   *
   * @returns {*} - Conforms to the item object of VerticalCheckboxGroup
   */
  static createCheckboxItem( property, labelString ) {
    return {
      node: new Text( labelString, {
        font: Constants.CHECKBOX_LABEL_FONT,
        maxWidth: 50
      } ),
      property: property
    };
  }
}

// for layout of the accordion box within a screen view, the spacing of the graph from the right edge of the
// accordion box is the x content margin
EnergyGraphAccordionBox.GRAPH_OFFSET = CONTENT_X_MARGIN;

energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
export default EnergyGraphAccordionBox;