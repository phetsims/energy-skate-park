// Copyright 2019-2026, University of Colorado Boulder

/**
 * ChartCursor is a rectangular cursor that indicates the current or selected value on the chart.
 * Adapted from griddle's XYCursorChartNode ChartCursor for use with bamboo's ChartTransform.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import energySkatePark from '../../energySkatePark.js';

// constants
const WIDTH_PROPORTION = 0.013; // empirically determined
const CURSOR_FILL_COLOR = new Color( 50, 50, 200, 0.2 );
const CURSOR_STROKE_COLOR = Color.DARK_GRAY;
const ARROW_CUE_FILL_COLOR = new Color( 180, 180, 230 );
const ARROW_CUE_STROKE_COLOR = Color.DARK_GRAY;

const NOOP = () => { /* no-op */ };

type SelfOptions = {
  startDrag?: () => void;
  endDrag?: () => void;
  drag?: () => void;
  includeDragCue?: boolean;
};

type EnergyChartCursorOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

/**
 * GrippyIndentNode is a small round indentation on a surface. This is a modern user interface paradigm that
 * is intended to convey the concept of "gripability", i.e. something that the user can grab.
 */
class GrippyIndentNode extends Circle {

  public constructor( diameter: number, baseColor: Color ) {
    const baseDarkerColor = baseColor.darkerColor( 0.9 );
    const translucentDarkerColor = new Color( baseDarkerColor.getRed(), baseDarkerColor.getGreen(),
      baseDarkerColor.getBlue(), baseColor.getAlpha() );
    const baseLighterColor = baseColor.brighterColor( 0.9 );
    const translucentBrighterColor = new Color( baseLighterColor.getRed(), baseLighterColor.getGreen(),
      baseLighterColor.getBlue(), baseColor.getAlpha() );
    const lineWidth = 0.5;
    const radius = diameter / 2 - lineWidth;

    super( radius, {
      fill: translucentDarkerColor,
      stroke: translucentBrighterColor,
      lineWidth: lineWidth
    } );
  }
}

export default class EnergyChartCursor extends Rectangle {

  private readonly chartTransform: ChartTransform;
  private readonly includeDragCue: boolean;
  private readonly dragCueArrowNode: ArrowNode | null;
  private readonly dragListener: DragListener;

  // Callbacks for cursor interactions
  private readonly hasDataCallback: () => boolean;
  private readonly setCursorValueCallback: ( value: number ) => void;
  private readonly getMinRecordedXValue: () => number;
  private readonly getMaxRecordedXValue: () => number;

  public constructor(
    chartWidth: number,
    chartHeight: number,
    chartTransform: ChartTransform,
    hasDataCallback: () => boolean,
    setCursorValueCallback: ( value: number ) => void,
    getMinRecordedXValue: () => number,
    getMaxRecordedXValue: () => number,
    providedOptions: EnergyChartCursorOptions
  ) {

    const options = optionize<EnergyChartCursorOptions, SelfOptions, PickRequired<PhetioObjectOptions, 'tandem'>>()( {
      startDrag: NOOP,
      endDrag: NOOP,
      drag: NOOP,
      includeDragCue: false
    }, providedOptions );

    const width = chartWidth * WIDTH_PROPORTION;
    const height = chartHeight;

    // Set the shape. Origin is at the center top of the rectangle.
    super( 0, -height, width, height, 0, 0, {
      cursor: 'ew-resize',
      fill: CURSOR_FILL_COLOR,
      stroke: CURSOR_STROKE_COLOR,
      lineWidth: 0.4,
      lineDash: [ 4, 4 ]
    } );

    this.chartTransform = chartTransform;
    this.hasDataCallback = hasDataCallback;
    this.setCursorValueCallback = setCursorValueCallback;
    this.getMinRecordedXValue = getMinRecordedXValue;
    this.getMaxRecordedXValue = getMaxRecordedXValue;

    // Make it easier to grab this cursor by giving it expanded mouse and touch areas.
    this.mouseArea = this.localBounds.dilatedX( 12 );
    this.touchArea = this.localBounds.dilatedX( 12 );

    this.includeDragCue = options.includeDragCue;
    this.dragCueArrowNode = null;

    if ( this.includeDragCue ) {
      this.dragCueArrowNode = new ArrowNode( -width * 2, 0, width * 2, 0, {
        doubleHead: true,
        headWidth: 12,
        headHeight: 10,
        fill: ARROW_CUE_FILL_COLOR,
        stroke: ARROW_CUE_STROKE_COLOR,
        center: this.center.plusXY( 0, height * 0.4 )
      } );

      this.addChild( this.dragCueArrowNode );
    }

    // Add the indentations that are intended to convey the idea of "gripability".
    const grippyNode = new Node();
    const indentSpacing = height * 0.05;
    for ( let i = 0; i < 3; i++ ) {
      const indentNode = new GrippyIndentNode( width / 2, CURSOR_FILL_COLOR );
      indentNode.top = i * ( indentNode.height + indentSpacing );
      grippyNode.addChild( indentNode );
    }
    grippyNode.center = this.center;
    this.addChild( grippyNode );

    this.dragListener = new DragListener( {
      start: () => {
        assert && assert( this.hasDataCallback(), 'chart should have data for the cursor to be draggable' );
        options.startDrag();
      },
      drag: ( event, listener ) => {
        const parentX = listener.parentPoint.x;
        let newValue = this.chartTransform.viewToModelX( parentX );

        // limit cursor to the domain of recorded values
        newValue = Utils.clamp( newValue, this.getMinRecordedXValue(), this.getMaxRecordedXValue() );

        // TODO: Dragging the cursor changes the layout of the position/time toggle, see https://github.com/phetsims/energy-skate-park/issues/417
        // TODO: Dragging the cursor does not set the time for a playback value, see https://github.com/phetsims/energy-skate-park/issues/417
        this.setCursorValueCallback( newValue );

        options.drag();
      },
      end: () => {
        options.endDrag();

        // no need to show arrow after user successfully drags the cursor
        if ( this.includeDragCue && this.dragCueArrowNode ) {
          this.dragCueArrowNode.visible = false;
        }
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( this.dragListener );
  }

  /**
   * Interrupts dragging of the cursor, useful when ChartCursor visibility changes.
   */
  public interruptDrag(): void {
    this.dragListener.interrupt();
  }

  /**
   * Resets the ChartCursor to its initial state. Note that this does not modify data
   * or the cursor position (cursorValue), only aspects of the view for the cursor itself.
   */
  public reset(): void {
    if ( this.includeDragCue && this.dragCueArrowNode ) {
      this.dragCueArrowNode.visible = true;
    }
  }
}

energySkatePark.register( 'EnergyChartCursor', EnergyChartCursor );
