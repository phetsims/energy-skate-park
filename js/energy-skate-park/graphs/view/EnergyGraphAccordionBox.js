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
import AlignGroup from '../../../../../scenery/js/nodes/AlignGroup.js';
import Circle from '../../../../../scenery/js/nodes/Circle.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import ABSwitch from '../../../../../sun/js/ABSwitch.js';
import AccordionBox from '../../../../../sun/js/AccordionBox.js';
import VerticalCheckboxGroup from '../../../../../sun/js/VerticalCheckboxGroup.js';
import energySkatePark from '../../../energySkatePark.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import Constants from '../../common/Constants.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
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

    const labelAlignGroup = new AlignGroup( { matchVertical: false } );

    // check boxes for visibility of energy data
    const checkboxGroup = new VerticalCheckboxGroup( [
      EnergyGraphAccordionBox.createCheckboxItem( model.kineticEnergyDataVisibleProperty, kineticEnergyLabelString, EnergySkateParkColorScheme.kineticEnergy, labelAlignGroup ),
      EnergyGraphAccordionBox.createCheckboxItem( model.potentialEnergyDataVisibleProperty, potentialEnergyLabelString, EnergySkateParkColorScheme.potentialEnergy, labelAlignGroup ),
      EnergyGraphAccordionBox.createCheckboxItem( model.thermalEnergyDataVisibleProperty, thermalEnergyLabelString, EnergySkateParkColorScheme.thermalEnergy, labelAlignGroup ),
      EnergyGraphAccordionBox.createCheckboxItem( model.totalEnergyDataVisibleProperty, totalEnergyLabelString, EnergySkateParkColorScheme.totalEnergy, labelAlignGroup )
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
      iconWidth: 18,
      listener: () => {
        this.clearEnergyData();
      },

      tandem: tandem.createTandem( 'eraserButton' )
    } );

    // ABSwitch to change plotting variables
    const switchLabelOptions = {
      font: LABEL_FONT,
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
    const touchAreaShift = 3;
    const zoomInButton = new EnergyGraphZoomButton( model.energyPlotScaleIndexProperty, {
      touchAreaYShift: -touchAreaShift,
      tandem: tandem.createTandem( 'zoomInButton' )
    } );
    const zoomOutButton = new EnergyGraphZoomButton( model.energyPlotScaleIndexProperty, {
      in: false,
      touchAreaYShift: touchAreaShift,
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

    const titleNode = new Text( plotsEnergyGraphString, {
      font: new PhetFont( { size: 16 } ),
      maxWidth: energyPlot.width / 3
    } );

    yLabel.rightCenter = energyPlot.leftCenter.minusXY( 10, 0 );
    xLabelText.centerTop = energyPlot.centerBottom.plusXY( 0, 10 );
    checkboxGroup.rightCenter = yLabel.leftCenter.minusXY( 10, 0 );

    const buttonYMargin = 5;
    const contentYMargin = 3;
    super( contentNode, merge( {
      titleNode: titleNode,
      titleAlignX: 'left',
      titleXSpacing: 7,
      buttonXMargin: 5,
      buttonYMargin: buttonYMargin,
      contentYMargin: contentYMargin,
      contentXMargin: 5,
      contentYSpacing: 0,

      // clicking doesn't expand since the title contains other controls
      titleBarExpandCollapse: false,

      expandedProperty: model.energyPlotVisibleProperty,
      tandem: tandem.createTandem( 'accordionBox' )
    }, Constants.PANEL_OPTIONS ) );

    // decorate this Node with additional controls that are positioned along the title
    this.addChild( variableSwitch );
    this.addChild( eraserButton );

    variableSwitch.centerBottom = variableSwitch.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.plotPath.centerTop ) ).minusXY( 0, buttonYMargin + contentYMargin );
    eraserButton.right = eraserButton.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.plotPath.rightCenter ) ).x;
    eraserButton.centerY = variableSwitch.centerY;

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

    model.energyPlotScaleIndexProperty.link( scaleIndex => {
      const range = model.energyPlotScaleIndexProperty.range;
      assert && assert( model.energyPlotScaleIndexProperty.range, 'please define a range for energyPlotScaleIndexProperty' );
      zoomInButton.enabled = scaleIndex > range.min;
      zoomOutButton.enabled = scaleIndex < range.max;
    } );
  }

  /**
   * Clear all data, removing saved EnergySkateParkDataSamples and removing all data from the series attached to the XYPlotNode.
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
   * @param {PaintDef|Color} energyColor
   * @param {AlignGroup} labelAlignGroup - for icon layout, so all lable Text has the same dimensions
   *
   * @returns {*} - Conforms to the item object of VerticalCheckboxGroup
   */
  static createCheckboxItem( property, labelString, energyColor, labelAlignGroup ) {
    const labelText = new Text( labelString, {
      font: Constants.CHECKBOX_LABEL_FONT,
      maxWidth: 50
    } );
    const labelBox = labelAlignGroup.createBox( labelText, { xAlign: 'left' } );

    // filled circle identifying the energy this label represents
    const iconNode = new Circle( 5, {
      lineWidth: 0.5,
      stroke: 'black',
      fill: energyColor,
      leftCenter: labelBox.rightCenter.plusXY( 5, 0 )
    } );

    return {
      node: new HBox( { children: [ labelBox, iconNode ], spacing: 5 } ),
      property: property
    };
  }
}

// for layout of the accordion box within a screen view, the spacing of the graph from the right edge of the
// accordion box is the x content margin
EnergyGraphAccordionBox.GRAPH_OFFSET = CONTENT_X_MARGIN;

energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
export default EnergyGraphAccordionBox;