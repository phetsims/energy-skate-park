// Copyright 2018-2019, University of Colorado Boulder

/**
 * A collection of traks used in the EnergySkateParkTrackSet models of energy-skate-park and energy-skate-park-basics.
 * Premade tracks are not draggable but they can sometimes be "configurable", meaning that control points can be moved.
 * For configurable premade tracks, the control points can only be dragged within a smaller set of bounds. These
 * bounds are specified for all premade tracks, but will only apply to the track if the model tracks are "configurable".
 * 
 * Premade tracks are all isolated so they have no "parent" tracks, see Track.js for definition of parent.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );

  // constants
  var PARENT_TRACKS = null;

  // limiting bounds for dragging control points
  var END_BOUNDS_WIDTH = 2;
  var END_BOUNDS_HEIGHT = END_BOUNDS_WIDTH;

  var CREATOR_OPTIONS = {

    // {boolean} - premade tracks can have draggable control points, and setting this to true will limit
    // the drag bounds of control points for each track. Each control point can have unique bounds so limiting
    // bounds are created in each creator function
    limitPointBounds: false
  };

  /**
   * Create a set of limiting drag bounds for a control point of a premade track. The control point is at the
   * CENTER of the limiting bounds.
   * @param  {Vector2} point - location of control point, CENTER of the bounds 
   * @param  {number} width
   * @param  {number} height
   * @returns {Bounds2}       
   */
  var createCenteredLimitBounds = function( point, width, height ) {
    return new Bounds2( point.x - width / 2, point.y - height / 2, point.x + width / 2, point.y + height / 2 );
  };

  var PremadeTracks = {

    /**
     * Create a set of limiting drag bounds for a control point of a premade track. The control point is at the BOTTOM
     * CENTER of the limiting bounds
     * @param  {Vector2} point - location of control point, BOTTOM CENTER of the bounds 
     * @param  {number} width
     * @param  {number} height
     * @returns {Bounds2}       
     */
    createBottomLimitBounds: function( point, width, height ) {
      return new Bounds2( point.x - width / 2, point.y, point.x + width / 2, point.y + height );
    },

    // create a set of control points which create a parabola shaped track
    createParabolaControlPoints: function( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      var p1 = new Vector2( -4, 6 );
      var p2 = new Vector2( 0, 0 );
      var p3 = new Vector2( 4, 6 );

      var p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );
      var p2Bounds = PremadeTracks.createBottomLimitBounds( p2, 4, 2 );
      var p3Bounds = createCenteredLimitBounds( p3, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

      return [
        new ControlPoint( p1.x, p1.y, { limitBounds: p1Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p2.x, p2.y, { limitBounds: p2Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p3.x, p3.y, { limitBounds: p3Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];
    },

    // create a set of control points which create a slope shaped track
    createSlopeControlPoints: function( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      var p1 = new Vector2( -4, 6 );
      var p2 = new Vector2( -2, 1.2 );
      var p3 = new Vector2( 2, 0 );

      var p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

      // createBottomLimitBounds because dragging any lower will cause track to go below ground
      var p2Bounds = PremadeTracks.createBottomLimitBounds( p2, 2, 2 );
      var p3Bounds = PremadeTracks.createBottomLimitBounds( p3, 1, 1 );

      return [
        new ControlPoint( p1.x, p1.y, { limitBounds: p1Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p2.x, p2.y, { limitBounds: p2Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p3.x, p3.y, { limitBounds: p3Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];
    },

    // create a set of control points which create a double well
    // For the double well, move the left well up a bit since the interpolation moves it down by that much, and we
    // don't want the skater to go to y<0 while on the track.  Numbers determined by trial and error.
    createDoubleWellControlPoints: function( groupTandem, options ) {
      options = _.extend( {
        trackHeight: 5, // largest height for the well
        trackWidth: 8, // width from the left most control point to the right most control point
        trackMidHeight: 2, // height of the mid control point that creates the double well

        p1Draggable: true,
        p2Draggable: true, 
        p3Draggable: true, 
        p4Draggable: true, 
        p5Draggable: true
      }, CREATOR_OPTIONS, options );

      var p1 = new Vector2( -options.trackWidth / 2, options.trackHeight );
      var p2 = new Vector2( -2, 0.0166015 );
      var p3 = new Vector2( 0, options.trackMidHeight );
      var p4 = new Vector2( 2, 1 );
      var p5 = new Vector2( options.trackWidth / 2, options.trackHeight );

      var p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );
      var p2Bounds = PremadeTracks.createBottomLimitBounds( p2, 1, 1 );
      var p3Bounds = createCenteredLimitBounds( p3, 1, 1 );
      var p4Bounds = createCenteredLimitBounds( p4, 1, 1 );
      var p5Bounds = createCenteredLimitBounds( p5, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

      return [
        new ControlPoint( p1.x, p1.y, {
          limitBounds: p1Bounds,
          draggable: options.p1Draggable,
          phetioState: false,
          tandem: groupTandem.createNextTandem()
        } ),
        new ControlPoint( p2.x, p2.y, {
          limitBounds: p2Bounds,
          draggable: options.p2Draggable,
          phetioState: false,
          tandem: groupTandem.createNextTandem()
        } ),
        new ControlPoint( p3.x, p3.y, {
          limitBounds: p3Bounds,
          draggable: options.p3Draggable,
          phetioState: false,
          tandem: groupTandem.createNextTandem()
        } ),
        new ControlPoint( p4.x, p4.y, {
          limitBounds: p4Bounds,
          draggable: options.p4Draggable,
          phetioState: false,
          tandem: groupTandem.createNextTandem()
        } ),
        new ControlPoint( p5.x, p5.y, {
          limitBounds: p5Bounds,
          draggable: options.p5Draggable,
          phetioState: false,
          tandem: groupTandem.createNextTandem()
        } )
      ];
    },

    /**
     * Create a set of control points that will form a track that takes the shape of a loop.
     * @param  {Tandem} groupTandem
     * @returns {Array.<ControlPoint>}
     */
    createLoopControlPoints: function ( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      // top of the left and right endpoints of the loop, higher than loopTop so that it is easy for the skater to go
      // all the way around the loop
      var trackTop = 5;

      var trackBottom = 0.08; // bottom points, so that the skater doesn't go below y = 0
      var loopTop = 3; // adjust to make the loop top point higher or lower
      var loopWidth = 7; // adjust to make the loop more or less wide
      var innerLoopWidth = 1; // roughly adjusts the width of the innerloop
      var innerLoopHeight = 1.5; // roughly adjust inner loop height (for control points, actual loop will be higher)

      var p1 = new Vector2( -loopWidth / 2, trackTop );
      var p2 = new Vector2( -innerLoopWidth, trackBottom );
      var p3 = new Vector2( innerLoopWidth, innerLoopHeight );
      var p4 = new Vector2( 0, loopTop );
      var p5 = new Vector2( -innerLoopWidth, innerLoopHeight );
      var p6 = new Vector2( innerLoopWidth, trackBottom );
      var p7 = new Vector2( loopWidth / 2, trackTop );

      var p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );
      var p2Bounds = PremadeTracks.createBottomLimitBounds( p2, 0.5, 0.5 );
      var p3Bounds = createCenteredLimitBounds( p3, 1, 1 );
      var p4Bounds = createCenteredLimitBounds( p4, 1, 1 );
      var p5Bounds = createCenteredLimitBounds( p5, 1, 1 );
      var p6Bounds = PremadeTracks.createBottomLimitBounds( p6, 0.5, 0.5 );
      var p7Bounds = createCenteredLimitBounds( p7, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

      return [
        new ControlPoint( p1.x, p1.y, { limitBounds: p1Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p2.x, p2.y, {
          limitBounds: p2Bounds,
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( p3.x, p3.y, {
          limitBounds: p3Bounds,
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( p4.x, p4.y, { limitBounds: p4Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p5.x, p5.y, { limitBounds: p5Bounds,
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( p6.x, p6.y, { limitBounds: p6Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p7.x, p7.y, { limitBounds: p7Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];
    },

    /**
     * Create a track from the control points, 
     * @param  {EnergySkateParkModel} model
     * @param  {Array.<Track>} modelTracks
     * @param  {Array.<ControlPoint>} controlPoints
     * @param  {Property.<Bounds2>} availableBoundsProperty 
     * @param  {object} options
     * @returns {Track}
     */
    createTrack:function( model, modelTracks, controlPoints, availableBoundsProperty, options ) {
      var track = new Track( model, modelTracks, controlPoints, PARENT_TRACKS, availableBoundsProperty, options );

      // none of the premade tracks are draggable, or created from a toolbox, so set the dropped Property so that
      // the control points can be used if the track is configurable
      if ( options.configurable ) {
        // track.droppedProperty.value = true;
      }

      return track;
    }
  };

  energySkatePark.register( 'PremadeTracks', PremadeTracks );

  return PremadeTracks;
} );
