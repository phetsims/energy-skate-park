// Copyright 2019, University of Colorado Boulder

/**
 * "Line" for the graph node, just a bunch of circles drawn with canvas for now.
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );

  // constants
  var MAX_ENERGY = 3000; // because why not, in Joules

  function GraphLines( samples, bounds ) {
    CanvasNode.call( this, {
      canvasBounds: bounds,
      preventFint: true
    } );

    this.samples = samples;

    var self = this;
    this.samples.addItemAddedListener( function( item ) {
      self.invalidatePaint();
    } );

    this.samples.addItemRemovedListener( function( item ) {
      self.invalidatePaint();
    } );
  }

  energySkatePark.register( 'GraphLines', GraphLines );

  return inherit( CanvasNode, GraphLines, {

    /**
     * Redraw the canvas content.
     * 
     * @param {CanvasContext2D} context
     */
    paintCanvas: function( context ) {
      var points = this.samples.getArray();

      if ( points.length > 0 ) {
        this.drawLine( context, points, 'kinetic', EnergySkateParkColorScheme.kineticEnergy );
        this.drawLine( context, points, 'potential', EnergySkateParkColorScheme.potentialEnergy );
        this.drawLine( context, points, 'thermal', EnergySkateParkColorScheme.thermalEnergy );
      }
    },

    /**
     * Draw a line with color.
     * @private
     *
     * @param {[type]} context
     * @param {function} energyGetter
     * @param {[type]} color
     */
    drawLine: function( context, points, energyType, color ) {
      var bounds = this.canvasBounds;

      var pWidth = 2;
      var pHeight = pWidth;

      // draw potential energy
      context.fillStyle = color.toCSS();
      context.beginPath();

      for ( let i = 0; i < points.length; i++ ) {
        var point = points[ i ];

        // this involves a calculation for the energy,
        // that is way too many calculations!!
        // Use SkaterSamples or something with this information stored>
        var energy;        
        if ( energyType === 'thermal' ) {
          energy = point.thermalEnergy;
        }
        else if ( energyType === 'potential' ) {
          energy = point.getPotentialEnergy();
        }
        else if ( energyType === 'kinetic' ) {
          energy = point.getKineticEnergy();
        }
        assert && assert( energy !== undefined, 'wrong kind of energy bro' );

        // so that 0 is the bottom of the graph
        var y = bounds.height / 2 - ( energy / MAX_ENERGY * bounds.height / 2 );

        // this is based on width...it should be temporal
        var x = i / GraphsConstants.MAX_SAMPLES * bounds.width;

        context.moveTo( x + pWidth, y + pHeight );
        context.lineTo( x - pWidth, y + pHeight );
        context.lineTo( x - pWidth, y - pHeight );
        context.lineTo( x + pWidth, y - pHeight );
        context.closePath();
      }

      context.fill();
    }
  } );
} );
