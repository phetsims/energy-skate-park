// Copyright 2018, University of Colorado Boulder

/**
 * A collection of traks used in the EnergySkateParkTrackSet models of energy-skate-park and energy-skate-park-basics.
 * Premade tracks are not interactive, and are isolated so they have no parent tracks.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  const Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );

  // constants
  var PARENT_TRACKS = null;

  var CREATOR_OPTIONS = {

    // {boolean} - premade tracks can have draggable control points, and setting this to true will limit
    // the drag bounds of control points for each track. Each control point can have unique bounds so limiting
    // bounds are created in each creator function
    limitPointBounds: false
  };

  var PremadeTracks = {

    // create a set of control points which create a parabola shaped track
    createParabolaControlPoints: function( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      var p1 = new Vector2( -4, 6 );
      var p2 = new Vector2( 0, 0 );
      var p3 = new Vector2( 4, 6 );

      // limiting dimensions for the end points
      var endHalfWidth = 0.5;
      var endHalfHeight = 0.5;

      var p1Bounds = new Bounds2( p1.x - endHalfWidth, p1.y - endHalfHeight, p1.x + endHalfWidth, p1.y + endHalfHeight );
      var p2Bounds = new Bounds2( -2, 0, 2, 2 );
      var p3Bounds = new Bounds2( p3.x - endHalfWidth, p3.y - endHalfHeight, p3.x + endHalfWidth, p3.y + endHalfHeight );

      return [
        new ControlPoint( p1.x, p1.y, { limitBounds: p1Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p2.x, p2.y, { limitBounds: p2Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( p3.x, p3.y, { limitBounds: p3Bounds, tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];
    },

    // create a set of control points which create a slope shaped track
    createSlopeControlPoints: function( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      return [
        new ControlPoint( -4, 6, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( -2, 1.2, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( 2, 0, { tandem: groupTandem.createNextTandem(), phetioState: false } )
      ];
    },

    // create a set of control points which create a double well
    // For the double well, move the left well up a bit since the interpolation moves it down by that much, and we
    // don't want the skater to go to y<0 while on the track.  Numbers determined by trial and error.
    createDoubleWellControlPoints: function( groupTandem, options ) {
      options = _.extend( CREATOR_OPTIONS, options );

      return [
        new ControlPoint( -4, 5, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( -2, 0.0166015, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( 0, 2, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( 2, 1, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( 4, 5, { tandem: groupTandem.createNextTandem(), phetioState: false } )
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
      var loopWidth = 6; // adjust to make the loop more or less wide
      var innerLoopWidth = 1; // roughly adjusts the width of the innerloop
      var innerLoopHeight = 1.5; // roughly adjust inner loop height (for control points, actual loop will be higher)

      return [
        new ControlPoint( -loopWidth / 2, trackTop, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( -innerLoopWidth, trackBottom, {
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( innerLoopWidth, innerLoopHeight, {
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( 0, loopTop, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( -innerLoopWidth, innerLoopHeight, {
          tandem: groupTandem.createNextTandem(),
          phetioState: false
        } ),
        new ControlPoint( innerLoopWidth, trackBottom, { tandem: groupTandem.createNextTandem(), phetioState: false } ),
        new ControlPoint( loopWidth / 2, trackTop, { tandem: groupTandem.createNextTandem(), phetioState: false } )
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
