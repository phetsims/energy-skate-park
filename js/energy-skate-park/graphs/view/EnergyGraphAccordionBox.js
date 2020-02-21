// Copyright 2019-2020, University of Colorado Boulder

/**
 * The accordion box in the "Graphs" screen that contains the energy graphs, as well as controls for
 * controlling the data.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const ABSwitch = require( 'SUN/ABSwitch' );
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const EnergyGraphZoomButton = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/EnergyGraphZoomButton' );
  const EnergyPlot = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/EnergyPlot' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  const GraphsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/model/GraphsModel' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  const kineticEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/kineticEnergyLabel' );
  const potentialEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/potentialEnergyLabel' );
  const thermalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/thermalEnergyLabel' );
  const totalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/totalEnergyLabel' );
  const timeSwitchLabelString = require( 'string!ENERGY_SKATE_PARK/timeSwitchLabel' );
  const positionSwitchLabelString = require( 'string!ENERGY_SKATE_PARK/positionSwitchLabel' );
  const plotsEnergyGraphString = require( 'string!ENERGY_SKATE_PARK/plots.energy-graph' );
  const plotsPositionLabelString = require( 'string!ENERGY_SKATE_PARK/plots.positionLabel' );
  const plotsEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/plots.energyLabel' );
  const plotsTimeLabelString = require( 'string!ENERGY_SKATE_PARK/plots.timeLabel' );

  // constants
  const GRAPH_HEIGHT = 115;

  // margin for content within the panel
  const CONTENT_X_MARGIN = 4;

  // size of the ABSwitch that changes from plotting position vs time
  const SWITCH_SIZE = new Dimension2( 30, 15 );

  const LABEL_FONT = new PhetFont( { size: 12 } );

  class EnergyGraphAccordionBox extends AccordionBox {

    /**
     * @param {EnergySkateParkModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( model, modelViewTransform, tandem ) {

      // the parent for all content of the accordion box
      const contentNode = new Node();

      // check boxes for visibility of energy data
      const checkboxGroup = new VerticalCheckboxGroup( [
        EnergyGraphAccordionBox.createCheckboxItem( model.kineticEnergyDataVisibleProperty, kineticEnergyLabelString, EnergySkateParkColorScheme.kineticEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.potentialEnergyDataVisibleProperty, potentialEnergyLabelString, EnergySkateParkColorScheme.potentialEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.thermalEnergyDataVisibleProperty, thermalEnergyLabelString, EnergySkateParkColorScheme.thermalEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.totalEnergyDataVisibleProperty, totalEnergyLabelString, EnergySkateParkColorScheme.totalEnergy )
      ] );
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

      super( contentNode, {
        titleNode: titleNode,
        titleAlignX: 'left',
        titleXSpacing: 7,
        buttonXMargin: 5,
        buttonYMargin: 5,
        contentYMargin: 2,
        contentXMargin: 4,
        contentYSpacing: 0,
        stroke: EnergySkateParkColorScheme.panelFill,
        expandedProperty: model.energyPlotVisibleProperty,
        tandem: tandem.createTandem( 'accordionBox' )
      } );

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
     */
    clearEnergyData() {
      this.model.clearEnergyData();
      this.energyPlot.clearEnergyDataSeries();
    }

    /**
     * Create an "item" for a checkbox of the VerticalCheckboxGroup, with the label and controlling Property.
     *
     * @param {Property} property
     * @param {string} labelString
     * @param {PaintDef} labelFill
     *
     * @returns {*} - Conforms to the item object of VerticalCheckboxGroup
     */
    static createCheckboxItem( property, labelString, labelFill ) {
      return {
        node: new Text( labelString, {
          fill: labelFill,
          font: new PhetFont( { size: 11 } ),
          maxWidth: 50
        } ),
        property: property
      };
    }
  }

  // for layout of the accordion box within a screen view, the spacing of the graph from the right edge of the
  // accordion box is the x content margin
  EnergyGraphAccordionBox.GRAPH_OFFSET = CONTENT_X_MARGIN;

  return energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
} );