// Copyright 2018, University of Colorado Boulder

/**
 * A node that shows the potential energy reference height in energy-skate-park. The line is a dashed
 * line that extends horizontally across the screen. The line can be dragged by clicking on a double headed arrow.
 * The origin for this node is the left edge of the line.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var TextPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/TextPanel' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var heightEqualsZeroString = require( 'string!ENERGY_SKATE_PARK/heightEqualsZero' );

  /**
   * @constructor
   * @param {ModelViewTransform2} modelViewTransform
   * @param {NumberProperty} referenceHeightProperty
   * @param {object} options
   */
  function ReferenceHeightLine( modelViewTransform, referenceHeightProperty, referenceHeightVisibleProperty, options ) {

    options = _.extend( {}, options );
    assert && assert( options.children === undefined, 'ReferenceHeightLine sets its own children' );

    // line will extend 9.5 meters through along the grid in model coordinates
    var lineLength = modelViewTransform.modelToViewDeltaX( 9.5 );

    // the line will be composed of two lines on top of each other to assist with line visibility but still look like
    // a dashed line - a taller black line to mimic stroke behind a shorter blue line
    var lineDash = [ 10, 8 ];
    var lineStart = new Vector2( 0, 0 );
    var lineEnd = new Vector2( lineLength, 0 );
    var frontLine = new Line( lineStart, lineEnd, {
      lineWidth: 3,
      lineDash: lineDash,
      stroke: 'rgb(74,133,208)'
    } );
    var backLine = new Line( lineStart, lineEnd, {
      lineWidth: 5,
      lineDash: lineDash,
      stroke: 'black'
    } );

    // double headed arrow indicates this line is draggable
    var doubleArrowNode = new ArrowNode( 0, -12, 0, 12, {
      doubleHead: true,
      headWidth: 13,
      tailWidth: 5,

      left: 30,
      cursor: 'pointer',
      fill: EnergySkateParkColorScheme.referenceArrowFill 
    } );

    // label for the reference line, surround by a transparent panel for better visibility
    var textPanel = new TextPanel( heightEqualsZeroString );

    textPanel.setLeftCenter( doubleArrowNode.rightTop );

    Node.call( this, {
      children: [ backLine, frontLine, doubleArrowNode, textPanel ]
    } );

    // listeners, no need to dispose as the ReferenceHeightLine is never destroyed
    var self = this;
    referenceHeightProperty.link( function( height ) {

      // position the reference height line, model value in meters
      self.y = modelViewTransform.modelToViewY( height );
    } );

    // update visibility with model Property and reset reference height when node is no longer visible to avoid
    // confusion
    referenceHeightVisibleProperty.link( function( visible ) {
      referenceHeightProperty.reset();

      self.visible = visible;
    } );

    this.addInputListener( new DragListener( {
      transform: modelViewTransform,
      drag: function( event, listener ) {

        // mouse in view coordinates
        var pMouse = self.globalToParentPoint( event.pointer.point );

        // mouse in model coordinates
        var modelMouse = modelViewTransform.viewToModelPosition( pMouse );

        // limit to reference height range
        var modelY = modelMouse.y;
        var constrainedValue = Constants.REFERENCE_HEIGHT_RANGE.constrainValue( modelY );
        referenceHeightProperty.set( constrainedValue );
      }
    } ) );
  }

  energySkatePark.register( 'ReferenceHeightLine', ReferenceHeightLine );

  return inherit( Node, ReferenceHeightLine, {} );
} );
