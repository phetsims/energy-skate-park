// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node that shows animating bar chart bars as rectangles.  Should be shown in front of the
 * BarGraphBackground.  This was split into separate layers in order to keep the animation fast on iPad.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * Constructor for the BarGraph
   * @param {Skater} skater the model's skater model
   * @param {Node} barGraphBackground - the background for the Bar Graph, to coordinate locations
   * @param {Property<Boolean>} barGraphVisibleProperty property that indicates whether the bar graph is visible
   * @param {string} barRenderer the renderer type to use for the bars.  For some reason it is not currently inherited.
   * @param {Tandem} tandem
   * @constructor
   */
  function BarGraphForeground( skater, barGraphBackground, barGraphVisibleProperty, graphScaleProperty, barRenderer, tandem ) {

    var barWidth = barGraphBackground.barWidth;
    var getBarX = barGraphBackground.getBarX;
    var originY = barGraphBackground.originY;

    // Create an energy bar that animates as the skater moves. Composed of 2 rectangles, one solid and one that
    // is semi-transparent in case energy is negative. The semi transparent rectangle will extend up to the width
    // of the bar label.
    // @return {Node}
    var createBar = function( index, color, property, showSmallValuesAsZero ) {
      var bar = new Node( { renderer: barRenderer } );

      var label = barGraphBackground.labelMap[ index ];

      // semi-transparent rectangle, so that the label is visible when the bar goes negative
      var labelRectangle = new Rectangle( label.bounds.dilated( 2 ), { fill: EnergySkateParkColorScheme.transparentPanelFill } );
      labelRectangle.addChild( label );

      // label text image includes the background rectangle to reduce the number of nodes using WebGL as a renderer,
      // resolution high enough to improve text quality, but not consume too many resources
      var imageNode = labelRectangle.rasterized( { resolution: 8, wrap: false } );

      // Convert to graph coordinates
      // However, do not floor for values less than 1 otherwise a nonzero value will show up as zero, see #159
      var barHeightProperty = new DerivedProperty( [ property, graphScaleProperty ], function( value, scale ) {
        var result = value * scale;
        var absResult = Math.abs( result );

        // Floor and protect against duplicates.
        // Make sure that nonzero values
        // For thermal and total energy, make sure they are big enough to be visible, see #307
        // For kinetic and potential, they must go to zero at the endpoints to reach learning goals like
        //   "The kinetic energy is zero at the top of the trajectory (turning point)
        var smallValueThreshold = showSmallValuesAsZero ? 1 : 1E-6;
        var answer = absResult > 1 ? Math.floor( result ) :
                     absResult < smallValueThreshold ? 0 :
                     1;

        return answer;
      } );
      var barX = getBarX( index );
      var solidBar = new Rectangle( barX, 0, barWidth, 100, { fill: color, pickable: false, stroke: 'black', lineWidth: 0.5 } );

      // update the bars when the graph becomes visible, and skip update when they are invisible
      Property.multilink( [ barHeightProperty, barGraphVisibleProperty ], function( barHeight, visible ) {
        if ( visible ) {
          // PERFORMANCE/ALLOCATION: Possible performance improvement to avoid allocations in Rectangle.setRect

          // // max height of the bar graph, in view coordinates
          var absBarHeight = Math.abs( barHeight );
          var maxHeight = barGraphBackground.getMaximumBarHeight( index, barHeight >= 0 );

          // update visibility of arrow nodes if bar goes beyond graph
          barGraphBackground.getUpArrowNode( index ).visible = barHeight > maxHeight;

          // down arrow nodes only  only supported for potential and total energies, so only do this for indices
          // that correspond to those energy types. TODO: Can we reference by enum or something else?
          if ( index === 1 || index === 3 ) {
            barGraphBackground.getDownArrowNode( index ).visible = absBarHeight > maxHeight && barHeight < 0;
          }

          var limitHeight = Math.min( absBarHeight, maxHeight );
          if ( barHeight >= 0 ) {
            solidBar.setRect( barX, originY - limitHeight, barWidth, limitHeight );
          }
          else {
            var solidHeight = limitHeight;
            solidBar.setRect( barX, originY, barWidth, solidHeight ); 
          }
        }
      } );

      bar.children = [ solidBar, imageNode ];
      return bar;
    };

    var kineticBar = createBar( 0, EnergySkateParkColorScheme.kineticEnergy, skater.kineticEnergyProperty, true );
    var potentialBar = createBar( 1, EnergySkateParkColorScheme.potentialEnergy, skater.potentialEnergyProperty, true );
    var thermalBar = createBar( 2, EnergySkateParkColorScheme.thermalEnergy, skater.thermalEnergyProperty, false );
    var totalBar = createBar( 3, EnergySkateParkColorScheme.totalEnergy, skater.totalEnergyProperty, false );

    Node.call( this, {
      tandem: tandem,

      // Manually align with the baseline of the bar chart.
      x: 24, y: 15,

      children: [
        kineticBar,
        potentialBar,
        thermalBar,
        totalBar
      ],

      // fixes a bug where adding strokes to the bars in the graph cause the webgl rectangles to jiggle as values
      // change, see https://github.com/phetsims/energy-skate-park/issues/39, but also for general performance
      preventFit: true
    } );

    // When the bar graph is shown, update the bars (because they do not get updated when invisible for performance reasons)
    barGraphVisibleProperty.linkAttribute( this, 'visible' );
  }

  energySkatePark.register( 'BarGraphForeground', BarGraphForeground );

  return inherit( Node, BarGraphForeground );
} );