// Copyright 2018, University of Colorado Boulder

/**
 * A node that shows the potential energy reference height in energy-skate-park. The line is a dashed
 * line that extends horizontally across the screen. The line can be dragged by clicking on a "laser pointer" that is
 * shooting the line into the view like a laser. The origin for this node is t the left edge of the line
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   * @param {ModelViewTransform2} modelViewTransform
   * @param {NumberProperty} referenceHeightProperty
   * @param {object} options
   */
  function ReferenceHeightLine( modelViewTransform, referenceHeightProperty, referenceHeightVisibleProperty, options ) {

    options = _.extend( {}, options );
    assert && assert( options.children === undefined, 'ReferenceHeightLine sets its own children' );

    // the line will extend from 
    var lineWidth = 500;
    var referenceLine = new Line( new Vector2( 0, 0 ), new Vector2( lineWidth, 0 ), {
      lineWidth: 2,
      lineDash: [ 2, 2 ],
      stroke: 'black'
    } );

    // the draggable part looks like a laser pointer body, shooting the reference height line across the view    
    var laserPointerNode = new LaserPointerNode( new BooleanProperty( false ), {
      hasButton: false,
      topColor: EnergySkateParkColorScheme.potentialEnergy,
      bottomColor: EnergySkateParkColorScheme.potentialEnergy,
      cursor: 'pointer'
    } );

    // pointing to the left, with shading maintained, made a bit more narrow vertically
    laserPointerNode.setScaleMagnitude( -0.25, 0.15 );
    laserPointerNode.setLeft( lineWidth );

    Node.call( this, {
      children: [ referenceLine, laserPointerNode ]
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

    // add a drag listener to the laser pointer to allow user to drag it vertically
    laserPointerNode.addInputListener( new DragListener( {
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
