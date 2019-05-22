// Copyright 2018, University of Colorado Boulder

/**
 * Just for prototyping saving states of the skater. Griddle can't be used because it
 * doesn't support the layering requirements with WebGL. And I don't know what the graph
 * will eventually look like.
 *
 * This will display relative energies against time and allow one to scrub through
 * SkaterStates.
 *  
 * @author Jesse Greenberg
 */
define( ( require ) => {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var GraphLines = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/GraphLines' );
  var GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  var DragListener = require( 'SCENERY/listeners/DragListener' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Util = require( 'DOT/Util' );

  /**
   * @constructors
   * @param {NumberProperty} indexProperty - index of the selected SkaterState in all saved samples
   * @param {} pausedProperty - whether or not model is playing
   * @param {} samples - ObservableArray
   * @param {} width - width of the graph in view coordinates
   * @param {} height - height of the graph in view coordinates
   * @param {Tandem} tandem
   */
  function TestGraph( indexProperty, pausedProperty, samples, width, height, tandem ) {
    Node.call( this );

    // @private
    this.indexProperty = indexProperty;
    this.samples = samples;

    var background = new Rectangle( 0, 0, width, height, { fill: 'white' } );
    this.addChild( background );

    var xAxis = new Line( 0, 0, width, 0, { stroke: 'black' } );
    var yAxis = new Line( 0, 0, 0, height, { stroke: 'black' } );
    xAxis.leftCenter = background.leftCenter;
    yAxis.centerTop = background.leftTop;

    var dataLines = new GraphLines( samples, this.bounds );

    var indexLine = new Rectangle( 0, 0, 5, height, {
      fill: 'purple',
      cursor: 'pointer'
    } );
    indexLine.touchArea = indexLine.bounds.dilated( 20 );
    indexLine.mouseArea = indexLine.bounds.dilated( 20 );

    background.children = [ xAxis, yAxis, dataLines, indexLine ];

    // position the index line with the selected SkaterState sample
    indexProperty.link( ( index ) => {
      indexLine.centerTop = background.leftTop.plusXY( ( index ) / GraphsConstants.MAX_SAMPLES * width, 0 );
    } );

    let pausedOnDrag = false;
    indexLine.addInputListener( new DragListener( {
      tandem: tandem.createTandem( 'dragListener' ),
      start: ( listener ) => {
        if ( samples.length > 0 ) {
          if ( !pausedProperty.get() ) {
            pausedOnDrag = true;
            pausedProperty.set( true );
          }
        }
      },

      /**
       * Update the selected index indicating that we want to restore from a previous SkaterState.
       *
       * @param {Event} event
       * @param {function} listener
       */
      drag: ( event, listener ) => {

        if ( samples.length > 0 ) {

          // pointer in view parent coordinates
          var pMouse = this.globalToLocalPoint( event.pointer.point );
          var x = pMouse.x;

          // map x to an index of samples
          let sampleIndex = Util.roundSymmetric( x / this.bounds.width * GraphsConstants.MAX_SAMPLES );
          sampleIndex = Math.min( sampleIndex, samples.length - 1 );
          sampleIndex = Math.max( 0, sampleIndex );
          assert && assert( sampleIndex < this.samples.length, 'no skater state for sample!' );
          assert && assert( sampleIndex >= 0, 'negative index for sample' );

          indexProperty.set( sampleIndex );
        }
      },

      /**
       * Resume the sim if we paused while dragging the index line.
       *
       * @param {function} listener
       */
      end: ( listener ) => {
        if ( pausedOnDrag ) {
          pausedProperty.set( false );
        }
        pausedOnDrag = false;
      }
    } ) );
  }

  energySkatePark.register( 'TestGraph', TestGraph );

  return inherit( Node, TestGraph, {} );
} );
