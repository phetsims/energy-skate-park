// Copyright 2018, University of Colorado Boulder

/**
 * Circles showing locations of skater samples, collections of data that can be inspected with a meter in the 
 * measure screen.
 *
 * NOTE: I expect that this will have to change for performance reasons, possibly using Canvas or WebGL. But I am
 * also concerned about the memory requirements in this sim for tablets. Rendering to a canvas seems like it
 * would add to the memory footprint. But I am already starting to see "Too many WebGL" context errors, so I am
 * concerned about adding these circles to the WebGL layer too. So starting with SVG to see how far that gets us.
 * 
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @constructor
   */
  function SkaterSamplesNode( model, modelViewTransform ) {

    Node.call( this );

    var self = this;
    model.skaterSamples.addItemAddedListener( function( addedSample ) {

      var viewX = modelViewTransform.modelToViewX( addedSample.positionX );
      var viewY = modelViewTransform.modelToViewY( addedSample.positionY );

      // this should probably be a new type with knowledge of how to show probe data and such
      var sampleCircle = new Circle( 3, {
        fill: EnergySkateParkColorScheme.pathFill,
        stroke: EnergySkateParkColorScheme.pathStroke,
        x: viewX,
        y: viewY
      } );
      self.addChild( sampleCircle );

      model.skaterSamples.addItemRemovedListener( function removalListener( removedSample ) {
        if ( addedSample === removedSample ) {
          self.removeChild( sampleCircle );
          model.skaterSamples.removeItemRemovedListener( removalListener );
        }
      } );
    } );
  }

  energySkatePark.register( 'SkaterSamplesNode', SkaterSamplesNode );

  return inherit( Node, SkaterSamplesNode, {} );
} );
