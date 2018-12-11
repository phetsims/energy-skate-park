// Copyright 2018, University of Colorado Boulder

/**
 * Dashed outline for a circle using WebGLNode. Many portions of this file are quite similar to PieChartWebGLSliceNode,
 * so we could consider turning into a single type in the near future. (Like adding a glLineDash option to that node
 * and moving the implementation there?)
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShaderProgram = require( 'SCENERY/util/ShaderProgram' );
  var Util = require( 'DOT/Util' );
  var WebGLNode = require( 'SCENERY/nodes/WebGLNode' );

  // constants
  // specific to the vertex data implementation
  var POINTS_PER_VERTEX = 2;
  var scratchFloatArray = new Float32Array( 9 );

  /**
   * @constructor
   * @param {Color} color
   * @param {NumberProperty} radiusProperty
   */
  function CircularOutlineWebGLNode( color, radiusProperty ) {
    var self = this;

    // @private (inner-type) assign color, to be used in the painter
    this.color = Color.toColor( color );
    this.radiusProperty = radiusProperty;

    WebGLNode.call( this, OutlinePainter, {
      canvasBounds: new Bounds2( 0, 0, 100, 100 )
    } );

    // when radius changes, set the scale accordingly and repaint
    this.radiusProperty.link( function( radius ) {
      if ( radius > 0 ) {
        self.setScaleMagnitude( radius * 2, radius * 2 );
      }
      else {
        self.setScaleMagnitude( Math.sqrt( 2 ) / 2, Math.sqrt( 2 ) / 2 );
      }
      self.invalidatePaint();
    } );

    this.invalidatePaint();
  }

  energySkatePark.register( 'CircularOutlineWebGLNode', CircularOutlineWebGLNode );

  inherit( WebGLNode, CircularOutlineWebGLNode, {

    /**
     * Mark the WebGL flag as dirty, to ensure that it will render.
     *
     * @param {number} dt
     */
    step: function( dt ) {
      this.invalidatePaint();
    }
  } );

  /**
   * Painter used by the WebGLNode.
   *
   * @constructor
   * @param {WebGLRenderingContext} gl
   * @param {Node} node - WebGLNode using this painter
   */
  function OutlinePainter( gl, node ) {
    this.gl = gl;
    this.node = node;

    // basic vertex shader with position and color
    var vertexShaderSource = [
      // Position
      'attribute vec2 aPosition;',
      'uniform vec4 uColor;',
      'varying vec4 vColor;',
      'uniform mat3 uModelViewMatrix;',
      'uniform mat3 uProjectionMatrix;',

      'void main( void ) {',
      '  vColor = uColor;',
      // homogeneous model-view transformation
      '  vec3 view = uModelViewMatrix * vec3( aPosition.xy, 1 );',
      // homogeneous map to to normalized device coordinates
      '  vec3 ndc = uProjectionMatrix * vec3( view.xy, 1 );',
      // combine with the z coordinate specified
      '  gl_Position = vec4( ndc.xy, 0.2, 1.0 );',
      '}'
    ].join( '\n' );

    // basic fragment shader receiving color
    var fragmentShaderSource = [
      'precision mediump float;',
      'varying vec4 vColor;',

      // Returns the color from the vertex shader
      'void main( void ) {',
      '  gl_FragColor = vColor;',

      // Use premultipled alpha, see https://github.com/phetsims/energy-skate-park/issues/39
      '  gl_FragColor.rgb *= gl_FragColor.a;',
      '}'
    ].join( '\n' );

    this.shaderProgram = new ShaderProgram( gl, vertexShaderSource, fragmentShaderSource, {
      attributes: [ 'aPosition' ],
      uniforms: [ 'uModelViewMatrix', 'uProjectionMatrix', 'uColor' ]
    } );

    this.vertexBuffer = gl.createBuffer();

    // we will use  gl.TRIANGLES to draw sections of triangles that create
    // a dashed outline
    var outerRadius = 0.5;
    var innerRadius = 0.46;

    var fullCircle = Math.PI * 2;
    var numSections = 40;
    var delta = fullCircle / numSections;

    // samples used to create a smooth looking circle
    var numSamples = 400;

    this.vertices = [];
    for ( var i = 0; i < numSamples; i++ ) {
      var angle = fullCircle / numSamples * i;

      // vertex to the inner radius
      var x = innerRadius * Math.cos( angle );
      var y = innerRadius * Math.sin( angle );
      this.vertices.push( x );
      this.vertices.push( y );

      // round angle to nearest section
      var section = Math.floor( angle / delta ) * delta;

      // determine if section is even out of the total sections - if so we will include this triangle
      var evenSection = Util.roundSymmetric( ( section / fullCircle ) * numSections ) % 2 === 0;

      if ( evenSection ) {

        // vertex to the outer radius
        x = outerRadius * Math.cos( angle );
        y = outerRadius * Math.sin( angle );
        this.vertices.push( x );
        this.vertices.push( y );
      }
      else {

        // duplicate of the innner radius to produce stroke of 0 height along the parts where we don't want to see
        // a dash
        this.vertices.push( x );
        this.vertices.push( y );
      }
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertices ), gl.STATIC_DRAW );
  }

  energySkatePark.register( 'OutlinePainter', OutlinePainter );

  inherit( Object, OutlinePainter, {

    /**
     * Called from within the swirling depths of scenery.
     *
     * @param {Matrix3} modelViewMatrix
     * @param {Matrix3} projectionMatrix
     *
     * @return {number} - flag describing purpose of this function.
     */
    paint: function( modelViewMatrix, projectionMatrix ) {
      var gl = this.gl;
      var shaderProgram = this.shaderProgram;

      shaderProgram.use();

      gl.uniformMatrix3fv( shaderProgram.uniformLocations.uModelViewMatrix, false, modelViewMatrix.copyToArray( scratchFloatArray ) );
      gl.uniformMatrix3fv( shaderProgram.uniformLocations.uProjectionMatrix, false, projectionMatrix.copyToArray( scratchFloatArray ) );

      gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
      gl.vertexAttribPointer( shaderProgram.attributeLocations.aPosition, 2, gl.FLOAT, false, 0, 0 );

      var color = this.node.color;
      gl.uniform4f( shaderProgram.uniformLocations.uColor, color.r / 255, color.g / 255, color.b / 255, color.a );

      // draw, one triangle per vertex and subtract one triangle so we don't overflow
      gl.drawArrays( gl.TRIANGLE_STRIP, 0, ( this.vertices.length / POINTS_PER_VERTEX ) );
      shaderProgram.unuse();

      return WebGLNode.PAINTED_SOMETHING;
    },

    /**
     * Clear the painter and WebGL resources.
     */
    dispose: function() {
      this.shaderProgram.dispose();
      this.gl.deleteBuffer( this.vertexBuffer );
      this.shaderProgram = null;
    }
  } );

  return CircularOutlineWebGLNode;
} );
