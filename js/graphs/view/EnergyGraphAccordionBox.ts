// Copyright 2019-2026, University of Colorado Boulder

/**
 * The accordion box in the "Graphs" screen that contains the energy graphs, as well as controls for
 * controlling the data.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import MagnifyingGlassZoomButtonGroup from '../../../../scenery-phet/js/MagnifyingGlassZoomButtonGroup.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem } from '../../../../sun/js/VerticalCheckboxGroup.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkConstants from '../../common/EnergySkateParkConstants.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import GraphsConstants from '../GraphsConstants.js';
import GraphsModel from '../model/GraphsModel.js';
import EnergyChart from './EnergyChart.js';

const kineticEnergyLabelStringProperty = EnergySkateParkFluent.energies.kineticStringProperty;
const potentialEnergyLabelStringProperty = EnergySkateParkFluent.energies.potentialStringProperty;
const thermalEnergyLabelStringProperty = EnergySkateParkFluent.energies.thermalStringProperty;
const totalEnergyLabelStringProperty = EnergySkateParkFluent.energies.totalStringProperty;
const timeSwitchLabelStringProperty = EnergySkateParkFluent.plots.timeSwitchLabelStringProperty;
const positionSwitchLabelStringProperty = EnergySkateParkFluent.plots.positionSwitchLabelStringProperty;
const plotsEnergyGraphStringProperty = EnergySkateParkFluent.plots.energyGraph.labelStringProperty;
const plotsPositionLabelStringProperty = EnergySkateParkFluent.plots.positionLabelStringProperty;
const plotsEnergyLabelStringProperty = EnergySkateParkFluent.plots.energyLabelStringProperty;
const plotsTimeLabelStringProperty = EnergySkateParkFluent.plots.timeLabelStringProperty;

// constants
const GRAPH_HEIGHT = 141;

// margin for content within the panel
const CONTENT_X_MARGIN = 4;

// size of the ABSwitch that changes from plotting position vs time
const SWITCH_SIZE = new Dimension2( 37, 18 );

const LABEL_FONT = new PhetFont( { size: 15 } );

export default class EnergyGraphAccordionBox extends AccordionBox {
  private readonly energyPlot: EnergyChart;
  public readonly variableSwitch: ABSwitch<'position' | 'time'>;
  public readonly eraserButton: EraserButton;

  public constructor( private readonly model: GraphsModel, modelViewTransform: ModelViewTransform2, tandem: Tandem, parentLayer: Node ) {

    // the parent for all content of the accordion box
    const contentNode = new Node();

    const labelAlignGroup = new AlignGroup( { matchVertical: false } );

    // check boxes for visibility of energy data
    const checkboxGroup = new VerticalCheckboxGroup( [
      EnergyGraphAccordionBox.createCheckboxItem( model.kineticEnergyDataVisibleProperty, kineticEnergyLabelStringProperty, EnergySkateParkColorScheme.kineticEnergy, labelAlignGroup, {
        accessibleContextResponseChecked: EnergySkateParkFluent.a11y.energyGraph.kineticCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.energyGraph.kineticCheckbox.accessibleContextResponseUncheckedStringProperty
      } ),
      EnergyGraphAccordionBox.createCheckboxItem( model.potentialEnergyDataVisibleProperty, potentialEnergyLabelStringProperty, EnergySkateParkColorScheme.potentialEnergy, labelAlignGroup, {
        accessibleContextResponseChecked: EnergySkateParkFluent.a11y.energyGraph.potentialCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.energyGraph.potentialCheckbox.accessibleContextResponseUncheckedStringProperty
      } ),
      EnergyGraphAccordionBox.createCheckboxItem( model.thermalEnergyDataVisibleProperty, thermalEnergyLabelStringProperty, EnergySkateParkColorScheme.thermalEnergy, labelAlignGroup, {
        accessibleContextResponseChecked: EnergySkateParkFluent.a11y.energyGraph.thermalCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.energyGraph.thermalCheckbox.accessibleContextResponseUncheckedStringProperty
      } ),
      EnergyGraphAccordionBox.createCheckboxItem( model.totalEnergyDataVisibleProperty, totalEnergyLabelStringProperty, EnergySkateParkColorScheme.totalEnergy, labelAlignGroup, {
        accessibleContextResponseChecked: EnergySkateParkFluent.a11y.energyGraph.totalCheckbox.accessibleContextResponseCheckedStringProperty,
        accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.energyGraph.totalCheckbox.accessibleContextResponseUncheckedStringProperty
      } )
    ], {
      checkboxOptions: {
        boxWidth: EnergySkateParkConstants.CHECKBOX_WIDTH
      },
      spacing: 12
    } );
    contentNode.addChild( checkboxGroup );

    // Dynamic graph description paragraph
    const variableStringProperty = new DerivedProperty(
      [ model.independentVariableProperty, EnergySkateParkFluent.a11y.energyGraph.variablePositionStringProperty, EnergySkateParkFluent.a11y.energyGraph.variableTimeStringProperty ],
      ( independentVariable, positionString, timeString ) => independentVariable === 'position' ? positionString : timeString
    );
    const unitsStringProperty = new DerivedProperty(
      [ model.independentVariableProperty, EnergySkateParkFluent.a11y.energyGraph.unitsMetersStringProperty, EnergySkateParkFluent.a11y.energyGraph.unitsSecondsStringProperty ],
      ( independentVariable, metersString, secondsString ) => independentVariable === 'position' ? metersString : secondsString
    );
    const checkedEnergiesListProperty = new DerivedProperty( [
      model.kineticEnergyDataVisibleProperty,
      model.potentialEnergyDataVisibleProperty,
      model.thermalEnergyDataVisibleProperty,
      model.totalEnergyDataVisibleProperty,
      EnergySkateParkFluent.a11y.energyGraph.energyKineticStringProperty,
      EnergySkateParkFluent.a11y.energyGraph.energyPotentialStringProperty,
      EnergySkateParkFluent.a11y.energyGraph.energyThermalStringProperty,
      EnergySkateParkFluent.a11y.energyGraph.energyTotalStringProperty,
      EnergySkateParkFluent.a11y.energyGraph.energyNoneStringProperty
    ], ( kinetic, potential, thermal, total, kineticName, potentialName, thermalName, totalName, noneName ) => {
      const names: string[] = [];
      if ( kinetic ) { names.push( kineticName ); }
      if ( potential ) { names.push( potentialName ); }
      if ( thermal ) { names.push( thermalName ); }
      if ( total ) { names.push( totalName ); }
      if ( names.length === 0 ) { return noneName; }
      if ( names.length === 1 ) { return names[ 0 ]; }
      if ( names.length === 2 ) { return `${names[ 0 ]} and ${names[ 1 ]}`; }
      return `${names.slice( 0, -1 ).join( ', ' )}, and ${names[ names.length - 1 ]}`;
    } );

    const graphDescriptionProperty = EnergySkateParkFluent.a11y.energyGraph.graphDescriptionParagraph.createProperty( {
      variable: variableStringProperty,
      units: unitsStringProperty,
      checkedEnergiesList: checkedEnergiesListProperty
    } );
    const graphDescriptionNode = new Node( {
      accessibleParagraph: graphDescriptionProperty
    } );
    contentNode.addChild( graphDescriptionNode );

    // Static checkbox group help paragraph
    const checkboxHelpNode = new Node( {
      accessibleParagraph: EnergySkateParkFluent.a11y.energyGraph.checkboxGroupParagraphStringProperty
    } );
    contentNode.addChild( checkboxHelpNode );

    // the graph is as long as the tracks in the Graphs screen so that position of the skater matches
    // with position along the plot
    const graphWidth = modelViewTransform.modelToViewDeltaX( GraphsConstants.TRACK_WIDTH );

    const energyPlot = new EnergyChart( model, graphWidth, GRAPH_HEIGHT, tandem.createTandem( 'energyPlot' ) );
    contentNode.addChild( energyPlot );

    // eraser button to clear all data from the graph
    const eraserButton = new EraserButton( {
      iconWidth: 22,
      touchAreaXDilation: 8,
      touchAreaYDilation: 8,
      listener: () => {
        this.clearEnergyData();
      },
      accessibleName: EnergySkateParkFluent.a11y.energyGraph.eraserButton.accessibleNameStringProperty,
      accessibleContextResponse: () => {
        return model.independentVariableProperty.value === 'position'
          ? EnergySkateParkFluent.a11y.energyGraph.eraserButton.positionResponseStringProperty
          : EnergySkateParkFluent.a11y.energyGraph.eraserButton.timeResponseStringProperty;
      },

      tandem: tandem.createTandem( 'eraserButton' )
    } );

    // ABSwitch to change plotting variables
    const switchLabelOptions = {
      font: LABEL_FONT,
      maxWidth: 100
    };
    const variableSwitchTandem = tandem.createTandem( 'variableSwitch' );
    const positionLabelText = new Text( positionSwitchLabelStringProperty, merge( {
      tandem: variableSwitchTandem.createTandem( 'positionLabelText' )
    }, switchLabelOptions ) );
    const timeLabelText = new Text( timeSwitchLabelStringProperty, merge( {
      tandem: variableSwitchTandem.createTandem( 'timeLabelText' )
    }, switchLabelOptions ) );

    const variableSwitch = new ABSwitch( model.independentVariableProperty, 'position', positionLabelText, 'time', timeLabelText, {
      toggleSwitchOptions: { size: SWITCH_SIZE },
      accessibleHelpText: EnergySkateParkFluent.a11y.energyGraph.variableSwitch.accessibleHelpTextStringProperty,
      tandem: variableSwitchTandem
    } );

    const rangeMinProperty = new DerivedProperty( [ model.energyPlotScaleIndexProperty ],
      index => GraphsConstants.PLOT_RANGES[ index ].min
    );
    const rangeMaxProperty = new DerivedProperty( [ model.energyPlotScaleIndexProperty ],
      index => GraphsConstants.PLOT_RANGES[ index ].max
    );
    const zoomLevelResponseProperty = EnergySkateParkFluent.a11y.energyGraph.zoomButtonGroup.zoomLevelResponse.createProperty( {
      min: rangeMinProperty,
      max: rangeMaxProperty
    } );

    const zoomButtonGroup = new MagnifyingGlassZoomButtonGroup( model.energyPlotScaleIndexProperty, {
      magnifyingGlassNodeOptions: {
        glassRadius: 6
      },
      buttonOptions: {
        xMargin: 4,
        yMargin: 4,
        touchAreaXDilation: 3,
        touchAreaYDilation: 3,

        baseColor: PhetColorScheme.PHET_LOGO_BLUE
      },
      zoomInButtonOptions: {
        accessibleName: EnergySkateParkFluent.a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleNameStringProperty,
        accessibleHelpText: EnergySkateParkFluent.a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty,
        accessibleContextResponse: zoomLevelResponseProperty
      },
      zoomOutButtonOptions: {
        accessibleName: EnergySkateParkFluent.a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleNameStringProperty,
        accessibleHelpText: EnergySkateParkFluent.a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty,
        accessibleContextResponse: zoomLevelResponseProperty
      },

      spacing: 7,
      orientation: 'vertical',
      tandem: tandem.createTandem( 'zoomButtonGroup' )
    } );

    // graph labels - y-axis includes zoom buttons as part of the label
    const yLabelText = new Text( plotsEnergyLabelStringProperty, {
      rotation: -Math.PI / 2,
      font: LABEL_FONT,
      maxWidth: energyPlot.height / 2
    } );

    // Label the x-axis with the independent variable.
    const xLabelStringProperty = new DerivedProperty( [ model.independentVariableProperty, plotsTimeLabelStringProperty, plotsPositionLabelStringProperty ],

      ( independentVariable, timeLabelString, positionLabelString ) => ( independentVariable === 'time' ) ? timeLabelString : positionLabelString
    );
    const xLabelText = new Text( xLabelStringProperty, { font: LABEL_FONT, maxWidth: energyPlot.width } );

    const yLabel = new VBox( {
      children: [ yLabelText, zoomButtonGroup ],
      spacing: 10
    } );
    contentNode.addChild( yLabel );
    contentNode.addChild( xLabelText );

    const titleNode = new Text( plotsEnergyGraphStringProperty, {
      font: new PhetFont( { size: 20 } ),
      maxWidth: energyPlot.width / 3
    } );

    yLabel.rightCenter = energyPlot.leftCenter.minusXY( 10, 0 );
    xLabelText.centerTop = energyPlot.centerBottom.plusXY( 0, 10 );
    checkboxGroup.rightCenter = yLabel.leftCenter.minusXY( 10, 0 );

    // PDOM ordering within the accordion box content
    contentNode.pdomOrder = [ graphDescriptionNode, checkboxHelpNode, checkboxGroup, energyPlot, yLabel ];

    const buttonYMargin = 5;
    const contentYMargin = 3;

    super( contentNode, combineOptions<AccordionBoxOptions>( {
      accessibleHelpTextCollapsed: EnergySkateParkFluent.a11y.energyGraph.accessibleHelpTextCollapsedStringProperty,
      titleNode: titleNode,
      titleAlignX: 'left',
      titleXSpacing: 7,
      buttonXMargin: 6,
      buttonYMargin: buttonYMargin,
      contentYMargin: contentYMargin,
      contentXMargin: 7,
      contentYSpacing: 0,

      // clicking doesn't expand since the title contains other controls in the parentLayer
      titleBarExpandCollapse: false,

      expandCollapseButtonOptions: {
        sideLength: 19,
        touchAreaXDilation: 8,
        touchAreaXShift: 2,
        touchAreaYDilation: 6
      },

      expandedProperty: model.energyPlotVisibleProperty,
      tandem: tandem.createTandem( 'accordionBox' )
    }, EnergySkateParkConstants.PANEL_OPTIONS ) );

    this.variableSwitch = variableSwitch;
    this.eraserButton = eraserButton;

    // decorate the parent layer with additional controls that are positioned along the title
    parentLayer.addChild( variableSwitch );
    parentLayer.addChild( eraserButton );

    ManualConstraint.create( parentLayer, [ this, variableSwitch, eraserButton, energyPlot, energyPlot.chartPanel ], ( thisProxy, variableSwitchProxy, eraserButtonProxy, energyPlotProxy, chartPanelProxy ) => {
      variableSwitchProxy.centerY = ( chartPanelProxy.top + thisProxy.top ) / 2;
      variableSwitchProxy.centerX = chartPanelProxy.centerX;
      eraserButtonProxy.rightBottom = chartPanelProxy.rightTop.plusXY( 0, -buttonYMargin );
    } );

    // The variable switch and eraser button are part of the title layout but should only be visible when
    // expanded
    this.expandedProperty.link( expanded => {
      variableSwitch.visible = expanded;
      eraserButton.visible = expanded;
    } );

    this.energyPlot = energyPlot;

    // Keep xLabelText horizontally centered.
    xLabelText.boundsProperty.link( () => {
      xLabelText.centerX = xLabelText.globalToParentPoint( energyPlot.parentToGlobalPoint( energyPlot.center ) ).x;
    } );

    // listeners - when the independent variable changes, clear all data and update labels
    model.independentVariableProperty.link( independentVariable => {
      if ( isSettingPhetioStateProperty.value ) { return; }
      this.clearEnergyData();
    } );

    // listeners - when the reference height is changed, clear all data (otherwise the graph will be incorrect, not inertial)
    model.skater.referenceHeightProperty.link( referenceHeight => {
      if ( isSettingPhetioStateProperty.value ) { return; }
      this.clearEnergyData();
    } );
  }

  /**
   * Clear all data, removing saved EnergySkateParkDataSamples and removing all data from the series rendered by the chart.
   */
  private clearEnergyData(): void {
    this.model.clearEnergyData();
    this.energyPlot.clearEnergyDataSeries();
  }

  /**
   * Gets the spacing in view coordinates between the right edge of the panel and the right most
   * content within the panel. Useful for layout since we want the grid lines in the ScreenView to
   * perfectly align with grid lines in the plot.
   */
  public getContentRight(): number {
    const localContentRight = this.globalToLocalBounds( this.energyPlot.localToGlobalBounds( this.energyPlot.chartPanel.localBounds ) ).right;
    const localPanelRight = this.localBounds.right;
    return localPanelRight - localContentRight;
  }

  /**
   * Create an "item" for a checkbox of the VerticalCheckboxGroup, with the label and controlling Property.
   *
   * @param property
   * @param labelString
   * @param energyColor
   * @param labelAlignGroup - for icon layout, so all label Text has the same dimensions
   *
   * @returns - Conforms to the item object of VerticalCheckboxGroup
   */
  private static createCheckboxItem( property: Property<boolean>, labelString: TReadOnlyProperty<string>, energyColor: TColor, labelAlignGroup: AlignGroup, checkboxOptions?: StrictOmit<CheckboxOptions, 'tandem'> ): VerticalCheckboxGroupItem {
    const labelText = new Text( labelString, {
      font: EnergySkateParkConstants.CHECKBOX_LABEL_FONT,
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
      createNode: () => new HBox( { children: [ labelBox, iconNode ], spacing: 5 } ),
      property: property,
      options: checkboxOptions
    };
  }

  // for layout of the accordion box within a screen view, the spacing of the graph from the right edge of the
  // accordion box is the x content margin
  private static readonly GRAPH_OFFSET = CONTENT_X_MARGIN;
}

energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
