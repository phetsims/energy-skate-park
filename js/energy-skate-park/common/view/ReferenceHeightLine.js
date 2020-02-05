// Copyright 2018-2019, University of Colorado Boulder

/**
 * A node that shows the potential energy reference height in energy-skate-park. The line is a dashed
 * line that extends horizontally across the screen. The line can be dragged by clicking on a double headed arrow.
 * The origin for this node is the left edge of the line.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const TextPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/TextPanel' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const heightEqualsZeroString = require( 'string!ENERGY_SKATE_PARK/heightEqualsZero' );

  class ReferenceHeightLine extends Node {

    /**
     * @constructor
     * @param {ModelViewTransform2} modelViewTransform
     * @param {NumberProperty} referenceHeightProperty
     * @param {Tandem} tandem
     */
    constructor( modelViewTransform, referenceHeightProperty, referenceHeightVisibleProperty, tandem )  {

      // line will extend 9.5 meters through along the grid in model coordinates
      const lineLength = modelViewTransform.modelToViewDeltaX( 9.5 );

      // the line will be composed of two lines on top of each other to assist with line visibility but still look like
      // a dashed line - a taller black line to mimic stroke behind a shorter blue line
      const lineDash = [ 10, 8 ];
      const lineStart = new Vector2( 0, 0 );
      const lineEnd = new Vector2( lineLength, 0 );
      const frontLine = new Line( lineStart, lineEnd, {

        // strokes are not generally pickable, this allows the line itself to be dragged
        strokePickable: true,
        lineWidth: 3,
        lineDash: lineDash,
        stroke: 'rgb(74,133,208)'
      } );
      const backLine = new Line( lineStart, lineEnd, {
        lineWidth: 5,
        lineDash: lineDash,
        stroke: 'black'
      } );

      // make the front line a bit easier to pick up
      frontLine.mouseArea = frontLine.bounds.dilated( 5 );
      frontLine.touchArea = frontLine.mouseArea;

      // double headed arrow indicates this line is draggable
      const doubleArrowNode = new ArrowNode( 0, -12, 0, 12, {
        doubleHead: true,
        headWidth: 13,
        tailWidth: 5,

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
      const self = this;
      referenceHeightProperty.link( height => {

        // position the reference height line, model value in meters
        self.y = modelViewTransform.modelToViewY( height );
      } );

      // update visibility with model Property and reset reference height when node is no longer visible to avoid
      // confusion
      referenceHeightVisibleProperty.link( visible => {
        referenceHeightProperty.reset();

        self.visible = visible;
      } );

      this.addInputListener( new DragListener( {
        transform: modelViewTransform,
        drag: ( event, listener ) => {

          // mouse in view coordinates
          const pMouse = self.globalToParentPoint( event.pointer.point );

          // mouse in model coordinates
          const modelMouse = modelViewTransform.viewToModelPosition( pMouse );

          // limit to reference height range
          const modelY = modelMouse.y;
          const constrainedValue = referenceHeightProperty.range.constrainValue( modelY );
          referenceHeightProperty.set( constrainedValue );
        },
        tandem: tandem.createTandem( 'dragListener' )
      } ) );
    }
  }

  return energySkatePark.register( 'ReferenceHeightLine', ReferenceHeightLine );
} );
