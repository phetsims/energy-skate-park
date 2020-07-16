// Copyright 2018-2020, University of Colorado Boulder

/**
 * A node that shows the potential energy reference height in energy-skate-park. The line is a dashed
 * line that extends horizontally across the screen. The line can be dragged by clicking on a double headed arrow.
 * The origin for this node is the left edge of the line.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import TextPanel from './TextPanel.js';

const heightEqualsZeroString = energySkateParkStrings.heightLabels.heightEqualsZero;

class ReferenceHeightLine extends Node {

  /**
   * @param {ModelViewTransform2} modelViewTransform
   * @param {NumberProperty} referenceHeightProperty
   * @param {BooleanProperty} referenceHeightVisibleProperty
   * @param {Tandem} tandem
   */
  constructor( modelViewTransform, referenceHeightProperty, referenceHeightVisibleProperty, tandem ) {

    // line will extend 9.5 meters through along the grid in model coordinates
    const lineLength = modelViewTransform.modelToViewDeltaX( 9.5 );

    // the line will be composed of two lines on top of each other to assist with line visibility but still look like
    // a dashed line - a taller black line to mimic stroke behind a shorter blue line
    const lineDash = [ 12, 9 ];
    const lineStart = new Vector2( 0, 0 );
    const lineEnd = new Vector2( lineLength, 0 );
    const frontLine = new Line( lineStart, lineEnd, {

      // strokes are not generally pickable, this allows the line itself to be dragged
      strokePickable: true,
      lineWidth: 4,
      lineDash: lineDash,
      stroke: 'rgb(74,133,208)'
    } );
    const backLine = new Line( lineStart, lineEnd, {
      lineWidth: 6,
      lineDash: lineDash,
      stroke: 'black'
    } );

    // make the front line a bit easier to pick up
    frontLine.mouseArea = frontLine.bounds.dilated( 5 );
    frontLine.touchArea = frontLine.mouseArea;

    // double headed arrow indicates this line is draggable
    const doubleArrowNode = new ArrowNode( 0, -14, 0, 14, {
      doubleHead: true,
      headWidth: 15,
      tailWidth: 7,

      left: 30,
      fill: EnergySkateParkColorScheme.referenceArrowFill
    } );

    // label for the reference line, surround by a transparent panel for better visibility
    const textPanel = new TextPanel( heightEqualsZeroString, { textMaxWidth: 125 } );

    textPanel.setLeftCenter( doubleArrowNode.rightTop );

    super( {
      children: [ backLine, frontLine, doubleArrowNode, textPanel ],

      // so it is clear that it can be picked up
      cursor: 'pointer'
    } );

    // listeners, no need to dispose as the ReferenceHeightLine is never destroyed
    referenceHeightProperty.link( height => {

      // position the reference height line, model value in meters
      this.y = modelViewTransform.modelToViewY( height );
    } );

    // update visibility with model Property and reset reference height when node is no longer visible to avoid
    // confusion
    referenceHeightVisibleProperty.link( visible => {
      referenceHeightProperty.reset();

      this.visible = visible;
    } );

    // a Vector2Property for DragListener so we can update the NumberProperty ReferenceHeightProperty with dragging
    const dragPositionProperty = new Vector2Property( new Vector2( 0, referenceHeightProperty.value ) );

    this.addInputListener( new DragListener( {
      transform: modelViewTransform,
      positionProperty: dragPositionProperty,
      tandem: tandem.createTandem( 'dragListener' )
    } ) );

    dragPositionProperty.link( dragPosition => {
      referenceHeightProperty.set( referenceHeightProperty.range.constrainValue( dragPositionProperty.get().y ) );
    } );
  }
}

energySkatePark.register( 'ReferenceHeightLine', ReferenceHeightLine );
export default ReferenceHeightLine;