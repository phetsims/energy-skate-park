// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node that shows the grid lines and labels, when enabled in the control panel.
 * Every other horizontal line is labeled and highlighted to make it easy to count.
 *
 * The grid will translate with the potential energy reference line, so that "0" line always aligns with
 * 0 potential energy.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BackgroundNode' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var zeroMetersString = require( 'string!ENERGY_SKATE_PARK/zeroMeters' );

  // constants
  var FONT = new PhetFont( 16 );

  // in meters, the grid will extend this far into the earth so that when potential energy reference line is moved the
  // grid can translte this far up
  var NEGATIVE_HEIGHT = 10;

  /**
   * @param {Property.<boolean>} gridVisibleProperty the axon property indicating whether the grid should be visible
   * @param {NumberProperty} referenceHeightProperty - Property in meters for height of zero potential energy
   * @param {ModelViewTransform2} modelViewTransform the main model-view transform
   * @param {Tandem} tandem
   * @constructor
   */
  function GridNode( gridVisibleProperty, referenceHeightProperty, modelViewTransform, tandem ) {

    Node.call( this, {
      pickable: false,
      tandem: tandem
    } );

    // @private
    this.gridNodeTandem = tandem;
    this.referenceHeightProperty = referenceHeightProperty;
    this.modelViewTransform = modelViewTransform;

    // @private {Node} - will contain the gridParent, and therefore most children of the grid except for the
    // "0 meters" label (which must be outside of the clip area). The clip area is everything above the earth, updated
    // in layout()
    this.clipParent = new Node();
    this.addChild( this.clipParent );

    // @private {Node} - will contain most children of the grid node (lines, text, and others), so that this node
    // can be transformed without moving the clip area.
    this.gridParent = new Node();
    this.clipParent.addChild( this.gridParent );

    // @private {Node} - parent for the "0 meters" label, outside of the clipParent because we want this text to
    // always be visible, even if outside of the clip shape (under the ground).
    this.zeroLabelParent = new Node();
    this.addChild( this.zeroLabelParent );

    gridVisibleProperty.linkAttribute( this, 'visible' );

    // @private
    this.thinLinePath = new Path( null, {
      stroke: '#686868',
      lineWidth: 0.8,
      tandem: tandem.createTandem( 'thinLinePath' )
    } );
    this.thickLinePath = new Path( null, {
      stroke: '#686868',
      lineWidth: 1.8,
      tandem: tandem.createTandem( 'thickLinePath' )
    } );

    // @private - keep references to all text created so that they can be disposed and removed from scene graph
    // when layout changes
    this.createdTexts = [];

    // transform the grid with the reference line - this should be faster than redrawing the grid every time it needs
    // to translate
    var self = this;
    referenceHeightProperty.lazyLink( function( height, oldHeight ) {
      var viewDelta = modelViewTransform.modelToViewDeltaY( height - oldHeight );

      // apply transform to grid and "0 meters" label, without translating the clip shape
      self.gridParent.translate( 0, viewDelta );
      self.zeroLabelParent.translate( 0, viewDelta );
    } );
  }

  energySkatePark.register( 'GridNode', GridNode );

  return inherit( Node, GridNode, {


    /**
     * Exactly fit the geometry to the screen so no matter what aspect ratio, the grid will fill the entire screen.
     * Perhaps it will improve performance too? Could performance optimize by using visible instead of add/remove child
     * if necessary (would only change performance on screen size change). For more performance improvements on screen size change,
     * only update when the graph is visible, then again when it becomes visible.
     * 
     * @param  {number} offsetX - offset applied to center horizontally
     * @param  {number} offsetY - offset applied to place bottom along the navigation bar
     * @param  {number} width - width of view, before any layout scale
     * @param  {number} height - height of view, before any layout scale
     * @param  {number} layoutScale - vertical or horizontal scale for sim, whichever is more limiting
     */
    layout: function( offsetX, offsetY, width, height, layoutScale ) {
      var scaledHeight = height / layoutScale; // height of the view

      var clipHeight = scaledHeight - BackgroundNode.earthHeight;
      this.clipParent.clipArea = Shape.rectangle( -offsetX, -offsetY, width / layoutScale, clipHeight );

      for ( var k = 0; k < this.createdTexts.length; k++ ) {
        this.createdTexts[ k ].dispose();
      }
      this.createdTexts.length = 0;

      var thickLines = [];
      var thinLines = [];
      var texts = [];

      var lineHeight = height / layoutScale - BackgroundNode.earthHeight - this.modelViewTransform.modelToViewDeltaY( NEGATIVE_HEIGHT );
      var lineY1 = -offsetY + this.modelViewTransform.modelToViewDeltaY( NEGATIVE_HEIGHT );
      for ( var x = 0; x < 100; x++ ) {
        var viewXPositive = this.modelViewTransform.modelToViewX( x );
        var viewXNegative = this.modelViewTransform.modelToViewX( -x );
        thinLines.push( { x1: viewXPositive, y1: lineY1, x2: viewXPositive, y2: lineHeight - lineY1 } );
        if ( x !== 0 ) {
          thinLines.push( { x1: viewXNegative, y1: lineY1, x2: viewXNegative, y2: lineHeight - lineY1 } );
        }
        if ( viewXNegative < -offsetX ) {
          break;
        }
      }

      // will replace the "0 meters" label at that height
      var replacementText;

      var separation = width / layoutScale;
      for ( var y = -NEGATIVE_HEIGHT; y < 100; y++ ) {
        var originX = this.modelViewTransform.modelToViewX( -4 );
        var viewY = this.modelViewTransform.modelToViewY( y );
        if ( viewY < lineY1 ) {
          break;
        }

        if ( y % 2 === 0 ) {
          thickLines.push( { x1: -offsetX, y1: viewY, x2: separation - offsetX, y2: viewY } );
        }
        else {
          thinLines.push( { x1: -offsetX, y1: viewY, x2: separation - offsetX, y2: viewY } );
        }

        if ( y % 2 === 0 ) {
          var gridLineLabel = new Text( '' + y, {
            font: FONT,
            top: viewY,
            right: originX - 2
          } );
          this.createdTexts.push( gridLineLabel );

          // For the "0 meters" readout, we still need the 0 to line up perfectly (while still using a single
          // internationalizable string), so use the 0 text bounds
          // And shift it down a bit so it isn't touching the concrete, see #134
          // It won't be added as a child of the gridParent because we don't want it to be clipped
          if ( y === 0 ) {
            replacementText = new Text( zeroMetersString, {
              font: FONT,
              top: viewY + 2,
              x: gridLineLabel.x
            } );
            this.createdTexts.push( replacementText );
          }
          else {
            texts.push( gridLineLabel );
          }
        }
      }

      var thinLineShape = new Shape();
      var thickLineShape = new Shape();
      for ( var i = 0; i < thinLines.length; i++ ) {
        var thinLine = thinLines[ i ];
        thinLineShape.moveTo( thinLine.x1, thinLine.y1 );
        thinLineShape.lineTo( thinLine.x2, thinLine.y2 );
      }
      for ( var m = 0; m < thickLines.length; m++ ) {
        var thickLine = thickLines[ m ];
        thickLineShape.moveTo( thickLine.x1, thickLine.y1 );
        thickLineShape.lineTo( thickLine.x2, thickLine.y2 );
      }
      this.thinLinePath.setShape( thinLineShape );
      this.thickLinePath.setShape( thickLineShape );
      this.gridParent.children = [
        this.thinLinePath,
        this.thickLinePath
      ].concat( texts );


      assert && assert( replacementText, 'at 0 height, a label should have been created' );
      this.zeroLabelParent.addChild( replacementText );
    }
  } );
} );