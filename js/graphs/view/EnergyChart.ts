// Copyright 2019-2026, University of Colorado Boulder

/**
 * The energy chart in the Graphs screen of energy skate park. Plots Energy against time OR energy against position
 * depending on the selected independent variable. Uses bamboo ChartTransform with a custom cursor that can be
 * dragged to control playback and restore the model to a previous point in time.
 *
 * TODO: There is a lot of extra white space above the graph, see https://github.com/phetsims/energy-skate-park/issues/417
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import CanvasLinePlot from '../../../../bamboo/js/CanvasLinePlot.js';
import ChartCanvasNode from '../../../../bamboo/js/ChartCanvasNode.js';
import CanvasPainter from '../../../../bamboo/js/CanvasPainter.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import EnergySkateParkDataSample from '../../common/model/EnergySkateParkDataSample.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
import energySkatePark from '../../energySkatePark.js';
import GraphsConstants from '../GraphsConstants.js';
import GraphsModel from '../model/GraphsModel.js';
import EnergyChartCursor from './EnergyChartCursor.js';

// constants
// determines properties of the chart that may depend on the independent variable
const TIME_MAX_X = 20; // in seconds
const TIME_STEP_X = 2; // in seconds
const POSITION_MAX_X = 10; // in meters
const POSITION_STEP_X = 1; // in meters

// Origin in the model is at center of screen, but plots align 0 meters at the left edge of the track, 5 meters
// left of origin
const POSITION_PLOT_OFFSET = 5;

/**
 * Custom CanvasPainter that renders scatter points with per-point opacity.
 */
class EnergyScatterPainter extends CanvasPainter {
  private readonly chartTransform: ChartTransform;
  public dataSet: { point: Vector2; opacity: number }[];
  private readonly colorCSS: string;
  private readonly radius: number;

  public constructor( chartTransform: ChartTransform, color: Color | string, radius = 2 ) {
    super();
    this.chartTransform = chartTransform;
    this.dataSet = [];
    this.colorCSS = color instanceof Color ? color.toCSS() : color;
    this.radius = radius;
  }

  public paintCanvas( context: CanvasRenderingContext2D ): void {
    for ( let i = 0; i < this.dataSet.length; i++ ) {
      const entry = this.dataSet[ i ];
      const viewPosition = this.chartTransform.modelToViewPosition( entry.point );
      context.globalAlpha = entry.opacity;
      context.fillStyle = this.colorCSS;
      context.beginPath();
      context.arc( viewPosition.x, viewPosition.y, this.radius, 0, 2 * Math.PI );
      context.fill();
    }
    context.globalAlpha = 1;
  }

  public dispose(): void {
    assert && assert( !this.isDisposed, 'already disposed' );
    this.isDisposed = true;
  }
}

export default class EnergyChart extends Node {

  // Public for layout in EnergyGraphAccordionBox
  public readonly chartPanel: ChartRectangle;

  private readonly chartTransform: ChartTransform;
  private readonly chartWidth: number;
  private readonly chartHeight: number;

  // Grid line sets
  private readonly horizontalGridLineSet: GridLineSet;
  private readonly verticalGridLineSet: GridLineSet;

  // Tick label sets
  private readonly verticalTickLabelSet: TickLabelSet;
  private readonly horizontalTickLabelSet: TickLabelSet;

  // Data arrays replace DynamicSeries
  private readonly kineticEnergyData: Vector2[];
  private readonly potentialEnergyData: Vector2[];
  private readonly thermalEnergyData: Vector2[];
  private readonly totalEnergyData: Vector2[];

  // Scatter data includes opacity
  private readonly kineticScatterData: { point: Vector2; opacity: number }[];
  private readonly potentialScatterData: { point: Vector2; opacity: number }[];
  private readonly thermalScatterData: { point: Vector2; opacity: number }[];
  private readonly totalScatterData: { point: Vector2; opacity: number }[];

  // Line plots (for time mode)
  private readonly kineticLinePlot: CanvasLinePlot;
  private readonly potentialLinePlot: CanvasLinePlot;
  private readonly thermalLinePlot: CanvasLinePlot;
  private readonly totalLinePlot: CanvasLinePlot;
  private readonly lineChartCanvasNode: ChartCanvasNode;

  // Scatter painters (for position mode)
  private readonly kineticScatterPainter: EnergyScatterPainter;
  private readonly potentialScatterPainter: EnergyScatterPainter;
  private readonly thermalScatterPainter: EnergyScatterPainter;
  private readonly totalScatterPainter: EnergyScatterPainter;
  private readonly scatterChartCanvasNode: ChartCanvasNode;

  // Cursor
  private readonly chartCursor: EnergyChartCursor;
  private cursorValue: number;
  private minRecordedXValue: number;
  private maxRecordedXValue: number;
  private _cursorVisibleOverride: boolean | null;

  public constructor( model: GraphsModel, graphWidth: number, graphHeight: number, tandem: Tandem ) {
    super();

    this.chartWidth = graphWidth;
    this.chartHeight = graphHeight;

    const dragEndedEmitter = new Emitter();
    const dragStartedEmitter = new Emitter();

    // whether the sim was paused when dragging started
    let pausedOnDragStart = false;

    const plotRange = GraphsConstants.PLOT_RANGES[ model.energyPlotScaleIndexProperty.get() ];

    // Create ChartTransform
    this.chartTransform = new ChartTransform( {
      viewWidth: graphWidth,
      viewHeight: graphHeight,
      modelXRange: new Range( 0, TIME_MAX_X ),
      modelYRange: plotRange
    } );

    // Chart background panel
    this.chartPanel = new ChartRectangle( this.chartTransform, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      cornerRadius: 0,
      pickable: true
    } );
    this.addChild( this.chartPanel );

    // Clipped content node
    const clippedContent = new Node( {
      clipArea: Shape.rectangle( 0, 0, graphWidth, graphHeight )
    } );
    this.chartPanel.addChild( clippedContent );

    // Grid lines - dashed gray, matching original gridNodeOptions
    this.horizontalGridLineSet = new GridLineSet( this.chartTransform, Orientation.VERTICAL, 500, {
      stroke: 'gray',
      lineDash: [ 4, 4 ]
    } );
    this.verticalGridLineSet = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, 1, {
      stroke: 'gray',
      lineDash: [ 4, 4 ]
    } );
    clippedContent.addChild( this.horizontalGridLineSet );
    clippedContent.addChild( this.verticalGridLineSet );

    // Data arrays
    this.kineticEnergyData = [];
    this.potentialEnergyData = [];
    this.thermalEnergyData = [];
    this.totalEnergyData = [];

    this.kineticScatterData = [];
    this.potentialScatterData = [];
    this.thermalScatterData = [];
    this.totalScatterData = [];

    // Line plots for time mode
    this.thermalLinePlot = new CanvasLinePlot( this.chartTransform, this.thermalEnergyData, {
      stroke: EnergySkateParkColorScheme.thermalEnergy instanceof Color ? EnergySkateParkColorScheme.thermalEnergy.toCSS() : EnergySkateParkColorScheme.thermalEnergy,
      lineWidth: 2
    } );
    this.potentialLinePlot = new CanvasLinePlot( this.chartTransform, this.potentialEnergyData, {
      stroke: EnergySkateParkColorScheme.potentialEnergy instanceof Color ? EnergySkateParkColorScheme.potentialEnergy.toCSS() : EnergySkateParkColorScheme.potentialEnergy,
      lineWidth: 2
    } );
    this.kineticLinePlot = new CanvasLinePlot( this.chartTransform, this.kineticEnergyData, {
      stroke: EnergySkateParkColorScheme.kineticEnergy instanceof Color ? EnergySkateParkColorScheme.kineticEnergy.toCSS() : EnergySkateParkColorScheme.kineticEnergy,
      lineWidth: 2
    } );
    this.totalLinePlot = new CanvasLinePlot( this.chartTransform, this.totalEnergyData, {
      stroke: EnergySkateParkColorScheme.totalEnergy instanceof Color ? EnergySkateParkColorScheme.totalEnergy.toCSS() : EnergySkateParkColorScheme.totalEnergy,
      lineWidth: 2
    } );

    this.lineChartCanvasNode = new ChartCanvasNode( this.chartTransform,
      [ this.thermalLinePlot, this.potentialLinePlot, this.kineticLinePlot, this.totalLinePlot ]
    );
    clippedContent.addChild( this.lineChartCanvasNode );

    // Scatter painters for position mode
    this.kineticScatterPainter = new EnergyScatterPainter( this.chartTransform,
      EnergySkateParkColorScheme.kineticEnergy instanceof Color ? EnergySkateParkColorScheme.kineticEnergy : new Color( EnergySkateParkColorScheme.kineticEnergy ) );
    this.potentialScatterPainter = new EnergyScatterPainter( this.chartTransform,
      EnergySkateParkColorScheme.potentialEnergy instanceof Color ? EnergySkateParkColorScheme.potentialEnergy : new Color( EnergySkateParkColorScheme.potentialEnergy ) );
    this.thermalScatterPainter = new EnergyScatterPainter( this.chartTransform,
      EnergySkateParkColorScheme.thermalEnergy instanceof Color ? EnergySkateParkColorScheme.thermalEnergy : new Color( EnergySkateParkColorScheme.thermalEnergy ) );
    this.totalScatterPainter = new EnergyScatterPainter( this.chartTransform,
      EnergySkateParkColorScheme.totalEnergy instanceof Color ? EnergySkateParkColorScheme.totalEnergy : new Color( EnergySkateParkColorScheme.totalEnergy ) );

    this.scatterChartCanvasNode = new ChartCanvasNode( this.chartTransform,
      [ this.thermalScatterPainter, this.potentialScatterPainter, this.kineticScatterPainter, this.totalScatterPainter ]
    );
    clippedContent.addChild( this.scatterChartCanvasNode );

    // Visibility for line plots is linked to model properties
    model.kineticEnergyDataVisibleProperty.link( visible => { this.kineticLinePlot.visible = visible; this.kineticScatterPainter.visible = visible; this.repaintPlots(); } );
    model.potentialEnergyDataVisibleProperty.link( visible => { this.potentialLinePlot.visible = visible; this.potentialScatterPainter.visible = visible; this.repaintPlots(); } );
    model.thermalEnergyDataVisibleProperty.link( visible => { this.thermalLinePlot.visible = visible; this.thermalScatterPainter.visible = visible; this.repaintPlots(); } );
    model.totalEnergyDataVisibleProperty.link( visible => { this.totalLinePlot.visible = visible; this.totalScatterPainter.visible = visible; this.repaintPlots(); } );

    // Tick label sets
    this.verticalTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.VERTICAL, 500, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( toFixed( value, 0 ), { font: new PhetFont( 12 ) } )
    } );
    this.horizontalTickLabelSet = new TickLabelSet( this.chartTransform, Orientation.HORIZONTAL, 1, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( toFixed( value, 0 ), { font: new PhetFont( 12 ) } )
    } );
    this.addChild( this.verticalTickLabelSet );
    this.addChild( this.horizontalTickLabelSet );

    // Front border on top so curves don't overlap it
    this.chartPanel.addChild( new Rectangle( 0, 0, graphWidth, graphHeight, 0, 0, {
      stroke: 'black',
      lineWidth: 1,
      pickable: false
    } ) );

    // Cursor state
    this.cursorValue = 0;
    this.minRecordedXValue = 0;
    this.maxRecordedXValue = 0;
    this._cursorVisibleOverride = null;

    // Create cursor
    this.chartCursor = new EnergyChartCursor(
      graphWidth, graphHeight, this.chartTransform,
      () => this.hasData(),
      ( value: number ) => this.setCursorValue( value ),
      () => this.minRecordedXValue,
      () => this.maxRecordedXValue,
      {
        includeDragCue: true,
        tandem: tandem.createTandem( 'chartCursor' ),
        startDrag: () => {
          pausedOnDragStart = model.pausedProperty.get();
          if ( !pausedOnDragStart ) {
            model.pausedProperty.set( true );
          }
          dragStartedEmitter.emit();
        },
        drag: () => {
          const closestSample = model.getClosestSkaterSample( this.getCursorValue() );
          model.setFromSample( closestSample );
          model.skater.updatedEmitter.emit();
        },
        endDrag: () => {
          if ( !pausedOnDragStart ) {
            model.pausedProperty.set( false );
          }
          dragEndedEmitter.emit();
        }
      }
    );
    this.chartPanel.addChild( this.chartCursor );

    // Initialize cursor
    this.updateCursor();

    // when cursor drag finishes, clear all data that has time greater than cursor time and set model time
    dragEndedEmitter.addListener( () => {
      if ( model.dataSamples.length > 0 ) {
        const timeOnEnd = this.getCursorValue();
        model.sampleTimeProperty.set( timeOnEnd );
        this.setCursorValue( timeOnEnd );
      }
    } );

    // update the transform for the plot so that recorded data is visible
    const updateChartTransform = () => {
      const newRange = GraphsConstants.PLOT_RANGES[ model.energyPlotScaleIndexProperty.get() ];

      const independentVariable = model.independentVariableProperty.get();
      const horizontalXRange = calculateDomain( independentVariable ).max;

      if ( model.dataSamples.length > 0 && independentVariable === 'time' ) {

        const minRecordedX = model.dataSamples.get( 0 ).time;
        const maxRecordedX = model.dataSamples.get( model.dataSamples.length - 1 ).time;
        const dataXRange = maxRecordedX - minRecordedX;
        const sampleTime = model.sampleTimeProperty.get();

        if ( dataXRange >= horizontalXRange ) {
          this.chartTransform.setModelXRange( new Range( sampleTime - horizontalXRange, sampleTime ) );
        }
        else {
          this.chartTransform.setModelXRange( new Range( minRecordedX, minRecordedX + horizontalXRange ) );
        }
      }
      else {
        this.chartTransform.setModelXRange( new Range( 0, horizontalXRange ) );
      }

      this.chartTransform.setModelYRange( newRange );
    };

    // update chart transform as time moves forward, so that we scroll forward in time
    model.sampleTimeProperty.link( time => {
      updateChartTransform();
      this.setCursorValue( time );
    } );

    // calculate new range of plot when zooming in or out
    model.energyPlotScaleIndexProperty.link( scaleIndex => {
      const newRange = GraphsConstants.PLOT_RANGES[ scaleIndex ];
      const horizontalLineSpacing = ( newRange.max - newRange.min ) / 4;
      const verticalLineSpacing = model.independentVariableProperty.get() === 'position' ? POSITION_STEP_X : TIME_STEP_X;

      updateChartTransform();
      this.horizontalGridLineSet.setSpacing( horizontalLineSpacing );
      this.verticalGridLineSet.setSpacing( verticalLineSpacing );
      this.verticalTickLabelSet.setSpacing( horizontalLineSpacing );
      this.horizontalTickLabelSet.setSpacing( verticalLineSpacing );
    } );

    // update range, domain, and plot style of plot when the independent variable changes
    model.independentVariableProperty.link( independentVariable => {
      const newRange = GraphsConstants.PLOT_RANGES[ model.energyPlotScaleIndexProperty.get() ];
      const horizontalLineSpacing = ( newRange.max - newRange.min ) / 4;

      let verticalLineSpacing;

      if ( independentVariable === 'position' ) {
        this.setCursorVisibleOverride( false );

        // Show scatter, hide line
        this.lineChartCanvasNode.visible = false;
        this.scatterChartCanvasNode.visible = true;
        verticalLineSpacing = POSITION_STEP_X;
      }
      else {
        this.setCursorVisibleOverride( null );

        // Show line, hide scatter
        this.lineChartCanvasNode.visible = true;
        this.scatterChartCanvasNode.visible = false;
        verticalLineSpacing = TIME_STEP_X;
      }

      updateChartTransform();
      this.horizontalGridLineSet.setSpacing( horizontalLineSpacing );
      this.verticalGridLineSet.setSpacing( verticalLineSpacing );
      this.verticalTickLabelSet.setSpacing( horizontalLineSpacing );
      this.horizontalTickLabelSet.setSpacing( verticalLineSpacing );
    } );

    // add data points when a EnergySkateParkDataSample is added to the model
    model.dataSamples.addItemAddedListener( addedSample => {

      const plotTime = model.independentVariableProperty.get() === 'time';
      const independentVariable = plotTime ? addedSample.time : addedSample.position.x + POSITION_PLOT_OFFSET;

      // For line mode data
      this.kineticEnergyData.push( new Vector2( independentVariable, addedSample.kineticEnergy ) );
      this.potentialEnergyData.push( new Vector2( independentVariable, addedSample.potentialEnergy ) );
      this.thermalEnergyData.push( new Vector2( independentVariable, addedSample.thermalEnergy ) );
      this.totalEnergyData.push( new Vector2( independentVariable, addedSample.totalEnergy ) );

      // For scatter mode data with opacity
      const kineticScatterEntry = { point: new Vector2( independentVariable, addedSample.kineticEnergy ), opacity: 1 };
      const potentialScatterEntry = { point: new Vector2( independentVariable, addedSample.potentialEnergy ), opacity: 1 };
      const thermalScatterEntry = { point: new Vector2( independentVariable, addedSample.thermalEnergy ), opacity: 1 };
      const totalScatterEntry = { point: new Vector2( independentVariable, addedSample.totalEnergy ), opacity: 1 };

      this.kineticScatterData.push( kineticScatterEntry );
      this.potentialScatterData.push( potentialScatterEntry );
      this.thermalScatterData.push( thermalScatterEntry );
      this.totalScatterData.push( totalScatterEntry );

      // add a listener that updates opacity with the EnergySkateParkDataSample Property
      const opacityListener = ( opacity: number ) => {
        kineticScatterEntry.opacity = opacity;
        potentialScatterEntry.opacity = opacity;
        thermalScatterEntry.opacity = opacity;
        totalScatterEntry.opacity = opacity;
        this.updateScatterPainters();
        this.scatterChartCanvasNode.update();
      };
      addedSample.opacityProperty.link( opacityListener );

      const removalListener = ( removedSample: EnergySkateParkDataSample ) => {
        if ( removedSample === addedSample ) {
          removedSample.opacityProperty.unlink( opacityListener );
          model.dataSamples.removeItemRemovedListener( removalListener );
        }
      };
      model.dataSamples.addItemRemovedListener( removalListener );

      this.updateMinMaxRecordedValues();
      this.updateCursor();
      this.repaintPlots();
    } );

    // remove a batch of EnergySkateParkDataSamples
    model.batchRemoveSamplesEmitter.addListener( samplesToRemove => {

      const plotTime = model.independentVariableProperty.get() === 'time';

      const xValuesToRemove = new Set( samplesToRemove.map( sampleToRemove => {
        return plotTime ? sampleToRemove.time : ( sampleToRemove.position.x + POSITION_PLOT_OFFSET );
      } ) );

      const filterData = ( dataArray: Vector2[] ) => {
        for ( let i = dataArray.length - 1; i >= 0; i-- ) {
          if ( xValuesToRemove.has( dataArray[ i ].x ) ) {
            dataArray.splice( i, 1 );
          }
        }
      };

      const filterScatterData = ( dataArray: { point: Vector2; opacity: number }[] ) => {
        for ( let i = dataArray.length - 1; i >= 0; i-- ) {
          if ( xValuesToRemove.has( dataArray[ i ].point.x ) ) {
            dataArray.splice( i, 1 );
          }
        }
      };

      filterData( this.kineticEnergyData );
      filterData( this.potentialEnergyData );
      filterData( this.thermalEnergyData );
      filterData( this.totalEnergyData );

      filterScatterData( this.kineticScatterData );
      filterScatterData( this.potentialScatterData );
      filterScatterData( this.thermalScatterData );
      filterScatterData( this.totalScatterData );

      this.updateMinMaxRecordedValues();
      this.updateCursor();
      this.repaintPlots();
    } );

    // reset the ChartCursor, making the drag cue visible again upon "Reset All"
    model.resetEmitter.addListener( () => this.resetCursor() );
  }

  /**
   * Update scatter painter data arrays.
   */
  private updateScatterPainters(): void {
    this.kineticScatterPainter.dataSet = this.kineticScatterData;
    this.potentialScatterPainter.dataSet = this.potentialScatterData;
    this.thermalScatterPainter.dataSet = this.thermalScatterData;
    this.totalScatterPainter.dataSet = this.totalScatterData;
  }

  /**
   * Repaint both line and scatter canvas nodes.
   */
  private repaintPlots(): void {
    this.updateScatterPainters();
    this.lineChartCanvasNode.update();
    this.scatterChartCanvasNode.update();
  }

  /**
   * Clear all energy data for the data series associated with this plot.
   */
  public clearEnergyDataSeries(): void {
    this.kineticEnergyData.length = 0;
    this.potentialEnergyData.length = 0;
    this.thermalEnergyData.length = 0;
    this.totalEnergyData.length = 0;

    this.kineticScatterData.length = 0;
    this.potentialScatterData.length = 0;
    this.thermalScatterData.length = 0;
    this.totalScatterData.length = 0;

    this.repaintPlots();
    this.setCursorValue( 0 );
  }

  /**
   * Returns true if any data series has data.
   */
  private hasData(): boolean {
    return this.kineticEnergyData.length > 0 ||
           this.potentialEnergyData.length > 0 ||
           this.thermalEnergyData.length > 0 ||
           this.totalEnergyData.length > 0;
  }

  /**
   * Sets the cursor value. The value of the cursor is constrained to be within chart bounds.
   */
  private setCursorValue( value: number ): void {
    const minX = this.chartTransform.viewToModelX( 0 );
    const maxX = this.chartTransform.viewToModelX( this.chartWidth + this.chartCursor.width / 2 );
    this.cursorValue = Utils.clamp( value, minX, maxX );
    this.updateCursor();
  }

  /**
   * Gets the value currently under the cursor.
   */
  public getCursorValue(): number {
    return this.cursorValue;
  }

  /**
   * Resets the cursor.
   */
  private resetCursor(): void {
    this.chartCursor.reset();
  }

  /**
   * Overrides the default behavior for setting cursor visibility.
   */
  private setCursorVisibleOverride( visible: boolean | null ): void {
    this._cursorVisibleOverride = visible;
    this.updateCursorVisibility();
  }

  /**
   * Updates the cursor visibility and position.
   */
  private updateCursor(): void {
    this.updateCursorVisibility();
    if ( this.chartCursor.isVisible() ) {
      this.updateCursorPosition();
    }
  }

  /**
   * Updates the cursor position.
   */
  private updateCursorPosition(): void {
    const viewPosition = this.chartTransform.modelToViewX( this.cursorValue );
    this.chartCursor.centerX = Utils.clamp( viewPosition, 0, this.chartWidth );
    this.chartCursor.centerY = this.chartHeight / 2;
  }

  /**
   * Updates the cursor visibility.
   */
  private updateCursorVisibility(): void {
    const wasVisible = this.chartCursor.visible;
    if ( typeof this._cursorVisibleOverride === 'boolean' ) {
      this.chartCursor.setVisible( this._cursorVisibleOverride );
    }
    else {
      const maxX = this.chartTransform.viewToModelX( this.chartWidth + this.chartCursor.width / 2 );
      const minX = this.chartTransform.viewToModelX( 0 );

      const isCurrentValueOnChart = ( this.cursorValue >= minX ) && ( this.cursorValue <= maxX );
      const hasData = this.hasData();
      const chartCursorVisible = isCurrentValueOnChart && hasData;

      this.chartCursor.setVisible( chartCursorVisible );
    }

    // if the cursor just became invisible, interrupt any active dragging
    if ( !this.chartCursor.visible && wasVisible ) {
      this.chartCursor.interruptDrag();
    }
  }

  /**
   * From the existing data, update the min and max recorded X values.
   */
  private updateMinMaxRecordedValues(): void {
    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;

    const allDataArrays = [ this.kineticEnergyData, this.potentialEnergyData, this.thermalEnergyData, this.totalEnergyData ];
    for ( const dataArray of allDataArrays ) {
      if ( dataArray.length > 0 ) {
        const seriesMinValue = dataArray[ 0 ].x;
        const seriesMaxValue = dataArray[ dataArray.length - 1 ].x;
        if ( seriesMinValue < minValue ) {
          minValue = seriesMinValue;
        }
        if ( seriesMaxValue > maxValue ) {
          maxValue = seriesMaxValue;
        }
      }
    }

    this.minRecordedXValue = minValue;
    this.maxRecordedXValue = maxValue;
  }
}

//--------------------------------------------------------------------------
// helper functions
//-------------------------------------------------------------------------
/**
 * Calculates the domain of the plot as a function of the independent variable.
 */
const calculateDomain = ( independentVariable: 'position' | 'time' ) => {

  const maxX = independentVariable === 'position' ? POSITION_MAX_X : TIME_MAX_X;
  return new Range( 0, maxX );
};

energySkatePark.register( 'EnergyChart', EnergyChart );
