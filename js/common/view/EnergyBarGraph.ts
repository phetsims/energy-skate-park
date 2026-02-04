// Copyright 2019-2026, University of Colorado Boulder

/**
 * Bar graph that displays the distribution of energy for this simulation.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import MoveToTrashLegendButton from '../../../../scenery-phet/js/buttons/MoveToTrashLegendButton.js';
import ZoomButton from '../../../../scenery-phet/js/buttons/ZoomButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ManualConstraint from '../../../../scenery/js/layout/constraints/ManualConstraint.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import TPaint from '../../../../scenery/js/util/TPaint.js';
import ColorConstants from '../../../../sun/js/ColorConstants.js';
import Panel from '../../../../sun/js/Panel.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import Skater from '../model/Skater.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

// constants
const ZOOM_BUTTON_TOUCH_DILATION = 5;
const BAR_WIDTH = 18.5;
const BAR_BORDER_WIDTH = 1;
const BAR_BORDER_COLOR = 'black';
const BAR_SPACING = 15;

// TODO: Can we use existing bamboo bars here? See https://github.com/phetsims/energy-skate-park/issues/417

/**
 * Sets a rectangle's y and height such that it goes between the two y values given.
 * Note: bars are in the "mathematical" coordinate frame (rotated by Math.PI), where +y is up.
 */
function setBarYValues( rectangle: Rectangle, y1: number, y2: number ): void {
  rectangle.rectY = Math.min( y1, y2 );
  rectangle.rectHeight = Math.abs( y1 - y2 );
}

/**
 * EnergyBarNode represents a single bar in the bar chart. Simplified from griddle's BarNode for single-entry
 * (non-stacked) bars.
 */
class EnergyBarNode extends Node {
  private readonly barEntry: { property: TReadOnlyProperty<number>; color: TColor };
  private readonly totalRangeProperty: Property<Range>;
  private readonly borderWidth: number;
  private readonly scaleProperty: NumberProperty;
  private readonly offScaleArrowOffset: number;
  private readonly bar: Rectangle;
  private readonly borderRectangle: Rectangle;
  private readonly offScaleArrow: ArrowNode;

  public constructor( barEntry: { property: TReadOnlyProperty<number>; color: TColor }, totalRangeProperty: Property<Range>, scaleProperty: NumberProperty, offScaleArrowFill: TPaint ) {
    super( {
      rotation: Math.PI // vertical orientation: +y up in mathematical coordinates
    } );

    this.barEntry = barEntry;
    this.totalRangeProperty = totalRangeProperty;
    this.borderWidth = BAR_BORDER_WIDTH;
    this.scaleProperty = scaleProperty;
    this.offScaleArrowOffset = 5;

    this.bar = new Rectangle( 0, 0, BAR_WIDTH, 0, { centerX: 0 } );

    this.borderRectangle = new Rectangle( 0, 0, BAR_WIDTH + 2 * BAR_BORDER_WIDTH, 0, {
      fill: BAR_BORDER_COLOR,
      centerX: 0
    } );

    this.offScaleArrow = new ArrowNode( 0, 0, 0, BAR_WIDTH, {
      fill: offScaleArrowFill,
      stroke: 'black',
      headHeight: BAR_WIDTH / 2,
      headWidth: BAR_WIDTH,
      tailWidth: BAR_WIDTH * 3 / 5,
      centerX: 0
    } );

    this.children = [ this.borderRectangle, this.bar, this.offScaleArrow ];

    this.update();

    // Update the values when the PhET-iO state is set
    phetioStateSetEmitter.addListener( () => this.update() );
  }

  public update(): void {
    const scale = this.scaleProperty.value;

    // How much of our "range" we need to take away, to be able to show an out-of-scale arrow.
    const arrowPadding = this.offScaleArrow.height + this.offScaleArrowOffset;

    // How far our actual bar rectangle can go (minimum and maximum).
    let effectiveRange = this.totalRangeProperty.value;
    effectiveRange = new Range(
      effectiveRange.min < 0 ? effectiveRange.min + this.borderWidth : effectiveRange.min,
      effectiveRange.max - this.borderWidth
    );
    effectiveRange = new Range(
      effectiveRange.min < 0 ? effectiveRange.min + arrowPadding : effectiveRange.min,
      effectiveRange.max - arrowPadding
    );

    const barValue = this.barEntry.property.value * scale;
    const currentY = effectiveRange.constrainValue( barValue );

    this.bar.fill = this.barEntry.color;

    if ( currentY !== 0 ) {
      setBarYValues( this.bar, 0, currentY );
      this.bar.visible = true;
    }
    else {
      this.bar.visible = false;
    }

    // Off-scale arrow visible on the top (max)
    if ( currentY === effectiveRange.max ) {
      this.offScaleArrow.visible = true;
      this.offScaleArrow.rotation = 0;
      this.offScaleArrow.y = effectiveRange.max + this.offScaleArrowOffset;
    }
    else if ( currentY === effectiveRange.min && currentY < 0 ) {
      this.offScaleArrow.visible = true;
      this.offScaleArrow.rotation = Math.PI;
      this.offScaleArrow.y = effectiveRange.min - this.offScaleArrowOffset;
    }
    else {
      this.offScaleArrow.visible = false;
    }

    setBarYValues( this.borderRectangle, 0, currentY + this.borderWidth * Math.sign( currentY ) );
    this.borderRectangle.visible = currentY !== 0;
  }
}

type SelfOptions = {
  // include buttons that increase/decrease the scale of the graph?
  showBarGraphZoomButtons?: boolean;

  // The range for the visible portion of the graph, in joules - note this is somewhat arbitrary
  // because the bars will have difference scales, but size should be about 1.5 times larger than the energy would
  // extend bars at default scale. A negative min value will allow some space to represent negative energies.
  graphRange?: Range;
};

export type EnergyBarGraphOptions = SelfOptions & NodeOptions;

export default class EnergyBarGraph extends Node {
  private readonly barNodes: EnergyBarNode[];

  public constructor( skater: Skater, barGraphScaleProperty: NumberProperty, barGraphVisibleProperty: BooleanProperty, tandem: Tandem, providedOptions: EnergyBarGraphOptions ) {

    const options = optionize<SelfOptions, SelfOptions, NodeOptions>()( {
      showBarGraphZoomButtons: true,
      graphRange: new Range( -122.8, 325 )
    }, providedOptions );

    super( options );

    // the range for the visible portion of the graph, in joules
    const graphRangeProperty = new Property( options.graphRange, {
      valueType: Range
    } );

    // button to remove thermal energy will be below the "thermal" energy label
    const clearThermalButton = new MoveToTrashLegendButton( {
      arrowColor: EnergySkateParkColorScheme.thermalEnergy,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: skater.clearThermal.bind( skater ),
      scale: 0.86
    } );

    // For kinetic and potential, they must go to zero at the endpoints to reach learning goals
    const createHideSmallValuesProperty = ( energyProperty: TReadOnlyProperty<number> ) => {
      return new DerivedProperty( [ energyProperty ], energy => {
        const height = energy * barGraphScaleProperty.get();
        const absHeight = Math.abs( height );
        if ( absHeight < 0.1 ) {
          return 0;
        }
        return energy;
      } );
    };

    // For thermal and total energy, make sure they are big enough to be visible
    const createShowSmallValuesProperty = ( energyProperty: TReadOnlyProperty<number> ) => {
      return new DerivedProperty( [ energyProperty ], energy => {
        let resultantEnergy = energy;
        const scale = barGraphScaleProperty.get();
        const height = energy * scale;
        const absHeight = Math.abs( height );
        if ( absHeight < 1 && absHeight > 1E-6 ) {
          const valueSign = energy < 0 ? -1 : 1;
          resultantEnergy = valueSign / scale;
        }
        return resultantEnergy;
      } );
    };

    const kineticEntry = {
      property: createHideSmallValuesProperty( skater.kineticEnergyProperty ),
      color: EnergySkateParkColorScheme.kineticEnergy
    };
    const potentialEntry = {
      property: createHideSmallValuesProperty( skater.potentialEnergyProperty ),
      color: EnergySkateParkColorScheme.potentialEnergy
    };
    const thermalEntry = {
      property: createShowSmallValuesProperty( skater.thermalEnergyProperty ),
      color: EnergySkateParkColorScheme.thermalEnergy
    };
    const totalEntry = {
      property: createShowSmallValuesProperty( skater.totalEnergyProperty ),
      color: EnergySkateParkColorScheme.totalEnergy
    };

    const barLabelOptions = {
      font: new PhetFont( 14.5 ),
      rotation: -Math.PI / 2,
      maxWidth: 61.4 // i18n, by inspection
    };

    // Create bar nodes
    const bars = [
      { entry: kineticEntry, labelString: EnergySkateParkStrings.energies.kineticStringProperty, labelNode: null as Node | null },
      { entry: potentialEntry, labelString: EnergySkateParkStrings.energies.potentialStringProperty, labelNode: null as Node | null },
      { entry: thermalEntry, labelString: EnergySkateParkStrings.energies.thermalStringProperty, labelNode: clearThermalButton as Node | null },
      { entry: totalEntry, labelString: EnergySkateParkStrings.energies.totalStringProperty, labelNode: null as Node | null }
    ];

    this.barNodes = bars.map( bar => new EnergyBarNode(
      bar.entry,
      graphRangeProperty,
      barGraphScaleProperty,
      bar.entry.color
    ) );

    // Create bar label nodes
    const barLabelNodes = bars.map( bar => {
      const barLabelVBox = new VBox( { spacing: 4 } );

      const labelText = new RichText( bar.labelString, merge( {}, barLabelOptions, { fill: 'black' } ) );
      const valuePanel = new Panel( labelText, {
        stroke: null,
        fill: EnergySkateParkColorScheme.transparentPanelFill,
        cornerRadius: 3,
        xMargin: 0,
        yMargin: 2
      } );
      barLabelVBox.addChild( valuePanel );

      if ( bar.labelNode ) {
        barLabelVBox.addChild( bar.labelNode );
      }
      return barLabelVBox;
    } );

    // Adding barNodes into HBox
    const barBox = new HBox( {
      spacing: BAR_SPACING,
      align: 'origin',
      children: this.barNodes
    } );

    // Adding barNode labels into Node
    const labelBox = new Node( {
      children: barLabelNodes
    } );

    const barChartContent = new Node();
    barChartContent.addChild( barBox );
    barChartContent.addChild( labelBox );

    // Keep labels centered on their bars
    for ( let i = 0; i < bars.length; i++ ) {
      const barLabelNode = labelBox.children[ i ];
      if ( barLabelNode.children[ 0 ] !== undefined ) {
        const barNode = this.barNodes[ i ];
        ManualConstraint.create( barChartContent, [ barLabelNode, barNode ], ( labelProxy, barProxy ) => {
          labelProxy.centerX = barProxy.centerX;
          labelProxy.top = 3;
        } );
      }
    }

    // Initializing xAxis
    const xAxis = new Line( -8, 0, barBox.width + 5, 0, {
      stroke: 'black',
      lineWidth: 1
    } );
    barChartContent.addChild( xAxis );

    // Initializing yAxis
    const yAxis = new ArrowNode( -8, 0, -8, -graphRangeProperty.value.max, {
      tailWidth: 0.5,
      headHeight: 9,
      headWidth: 8
    } );
    barChartContent.addChild( yAxis );

    const rangeObserver = ( range: Range ) => {
      yAxis.setTailAndTip( -8, 0, -8, -range.max );
      barChartContent.localBounds = barChartContent.localBounds
        .withMinY( Math.min( yAxis.bottom, -range.max ) )
        .withMaxY( Math.max( 0.5, -range.min, labelBox.bottom ) );
    };
    graphRangeProperty.link( rangeObserver );

    // main content for the containing panel, assembly depends on whether zoom buttons are required
    let content: Node;
    if ( options.showBarGraphZoomButtons ) {

      const zoomButtonOptions = {
        baseColor: ColorConstants.LIGHT_BLUE,
        magnifyingGlassOptions: {
          glassRadius: 6
        },
        xMargin: 7,
        yMargin: 5,
        touchAreaXDilation: ZOOM_BUTTON_TOUCH_DILATION,
        touchAreaYDilation: ZOOM_BUTTON_TOUCH_DILATION
      };

      const zoomOutButton = new ZoomButton( merge( {
        in: false,
        listener: () => {
          barGraphScaleProperty.set( Math.max( barGraphScaleProperty.get() - EnergySkateParkConstants.ZOOM_FACTOR_DELTA, EnergySkateParkConstants.MIN_ZOOM_FACTOR ) );
        },
        touchAreaXShift: -ZOOM_BUTTON_TOUCH_DILATION,
        tandem: tandem.createTandem( 'zoomOutButton' )
      }, zoomButtonOptions ) );
      const zoomInButton = new ZoomButton( merge( {
        in: true,
        listener: () => {
          barGraphScaleProperty.set( Math.min( barGraphScaleProperty.get() + EnergySkateParkConstants.ZOOM_FACTOR_DELTA, EnergySkateParkConstants.MAX_ZOOM_FACTOR ) );
        },
        touchAreaXShift: ZOOM_BUTTON_TOUCH_DILATION,
        tandem: tandem.createTandem( 'zoomInButton' )
      }, zoomButtonOptions ) );

      const zoomButtons = new HBox( {
        children: [ zoomOutButton, zoomInButton ],
        spacing: 5
      } );

      content = new VBox( {
        children: [ barChartContent, zoomButtons ],
        spacing: 5,
        align: 'left'
      } );

      barGraphScaleProperty.link( scale => {
        zoomInButton.enabled = scale < EnergySkateParkConstants.MAX_ZOOM_FACTOR;
        zoomOutButton.enabled = scale > EnergySkateParkConstants.MIN_ZOOM_FACTOR;
      } );

      barGraphScaleProperty.link( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    }
    else {
      content = barChartContent;
    }

    this.addChild( content );

    // attach listeners - bar chart exists for life of sim, no need to dispose
    skater.energyChangedEmitter.addListener( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    barGraphVisibleProperty.link( this.updateWhenVisible.bind( this ) );

    skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    // this button is small and usability is improved by larger touch areas
    clearThermalButton.touchArea = clearThermalButton.localBounds.dilated( 10 );
  }

  /**
   * If model indicates that graph is visible, redraw the graph.
   */
  private updateWhenVisible( visible: boolean ): void {
    if ( visible ) {
      for ( let i = 0; i < this.barNodes.length; i++ ) {
        this.barNodes[ i ].update();
      }
    }
  }

  /**
   * Create the label for the bar graph, which can be added in various places depending on layout of the graph.
   */
  public static createLabel(): Text {
    return new Text( EnergySkateParkStrings.energies.energyStringProperty, {
      font: new PhetFont( { size: 17, weight: 'bold' } ),
      maxWidth: 90 // i18n, by inspection
    } );
  }

  /**
   * Create an icon of the bar graph, to be used in visibility or other controls.
   */
  public static createBarGraphIcon( tandem: Tandem ): Node {
    return new Node( {
      tandem: tandem,
      children: [
        new Rectangle( 0, 0, 20, 20, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ),
        new Rectangle( 3, 14, 5, 6, {
          fill: EnergySkateParkColorScheme.kineticEnergy,
          stroke: 'black',
          lineWidth: 0.5
        } ),
        new Rectangle( 11, 8, 5, 12, {
          fill: EnergySkateParkColorScheme.potentialEnergy,
          stroke: 'black',
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );
