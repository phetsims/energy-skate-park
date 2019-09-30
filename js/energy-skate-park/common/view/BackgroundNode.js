// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node that shows the background, including the mountains, sky, ground and grass.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Image = require( 'SCENERY/nodes/Image' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Pattern = require( 'SCENERY/util/Pattern' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  const cementImg = require( 'image!ENERGY_SKATE_PARK/cement-texture-dark.jpg' );
  const mountainImage = require( 'image!ENERGY_SKATE_PARK/mountains.png' );

  // constants
  const earthHeight = 70;
  const cementWidth = 4;

  class BackgroundNode extends Node {

    /**
     * @param {Bounds2} layoutBounds
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( layoutBounds, tandem, options ) {
      super( {
        pickable: false,
        tandem: tandem
      } );

      this.sky = new Rectangle( 0, 0, 0, 0 );
      this.addChild( this.sky );

      // Wait for bounds to fill in the grass
      this.earth = new Rectangle( 0, 0, 0, 0, { fill: '#93774c' } );
      this.addChild( this.earth );

      this.cementY = layoutBounds.height - earthHeight;

      this.mountain = new Image( mountainImage, {
        bottom: this.cementY,
        tandem: tandem.createTandem( 'mountainImage' )
      } );
      this.addChild( this.mountain );

      this.cement = new Rectangle( 0, 0, 0, cementWidth, { fill: new Pattern( cementImg ) } );
      this.addChild( this.cement );

      if ( options ) {
        this.mutate( options );
      }
    }

    /**
     * Exactly fit the geometry to the screen so  no matter what aspect ratio it will always show something.
     * Perhaps it will improve performance too?
     * @public
     * 
     * @param  {number} offsetX
     * @param  {number} offsetY    
     * @param  {number} width      
     * @param  {number} height     
     * @param  {number} layoutScale
     */
    layout( offsetX, offsetY, width, height, layoutScale ) {
      const cementY = this.cementY;
      this.earth.setRect( -offsetX, cementY, width / layoutScale, earthHeight );

      // Work around scenery horizontal line pattern problem, see https:// github.com/phetsims/scenery/issues/196
      this.cement.setRect( -offsetX, cementY, width / layoutScale, cementWidth );
      this.sky.setRect( -offsetX, -offsetY, width / layoutScale, height / layoutScale - earthHeight );
      this.sky.fill = new LinearGradient( 0, 0, 0, height / 2 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
    }
  }

  // @static
  BackgroundNode.earthHeight = earthHeight;

  return energySkatePark.register( 'BackgroundNode', BackgroundNode );
} );