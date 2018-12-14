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
  const Circle = require( 'SCENERY/nodes/Circle' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );

  /**
   * @constructor
   */
  function SkaterSamplesNode( model, modelViewTransform ) {

    Node.call( this );

    var self = this;
    model.skaterSamples.addItemAddedListener( function( addedSample ) {

      var sampleNode = new SampleNode( modelViewTransform.modelToViewPosition( addedSample.position ), addedSample.inspectedProperty, addedSample.opacityProperty );
      self.addChild( sampleNode );

      model.skaterSamples.addItemRemovedListener( function removalListener( removedSample ) {
        if ( addedSample === removedSample ) {
          model.skaterSamples.removeItemRemovedListener( removalListener );

          // this will detach the node from the scene graph
          sampleNode.dispose();
        }
      } );
    } );
  }

  energySkatePark.register( 'SkaterSamplesNode', SkaterSamplesNode );

  inherit( Node, SkaterSamplesNode, {} );

  /**
   * A single sample along the path. When the sample is being inspected by a probe, a highlight shows up underneath
   * the sample to indicate that it is selected.
   * @param {Vector2} center - center for this node in view coordinates
   * @param {BooleanProperty} inspectedProperty - whether or not this SkaterSample is being inspected
   * @param {NumberProperty} opacityProperty
   */
  function SampleNode( center, inspectedProperty, opacityProperty ) {

    // @private
    this.inspectedProperty = inspectedProperty;
    this.opacityProperty = opacityProperty;

    const sampleCircle = new Circle( 3, {
      fill: EnergySkateParkColorScheme.pathFill,
      stroke: EnergySkateParkColorScheme.pathStroke
    } );

    const haloCircle = new Circle( 7, {
      fill: EnergySkateParkColorScheme.haloFill,
      visible: false
    } );

    Node.call( this, {
      center: center,
      children: [ haloCircle, sampleCircle ]
    } );

    // @private - to be removed on dispose
    this.inspectedListener = ( inspected ) => {
      haloCircle.visible = inspected;
    };
    this.inspectedProperty.link( this.inspectedListener );

    this.opacityListener = ( opacity ) => {
      this.opacity = opacity;
    };
    this.opacityProperty.link( this.opacityListener );
  }

  inherit( Node, SampleNode, {

    /**
     * Make eligible for garbage collection.
     * @public
     */
    dispose: function() {
      this.inspectedProperty.unlink( this.inspectedListener );
      this.opacityProperty.unlink( this.opacityListener );
      Node.prototype.dispose.call( this );
    }
  } );

  energySkatePark.register( 'SkaterSamplesNode.SampleNode', SkaterSamplesNode );

  return SkaterSamplesNode;
} );
