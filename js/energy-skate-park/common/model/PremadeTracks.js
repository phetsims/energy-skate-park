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
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );

  // constants
  var PREMADE_INTERACTIVE = false;
  var PARENT_TRACKS = null;

  var PremadeTracks = {

    // create a set of control points which create a parabola shaped track
    createParabolaControlPoints: function( groupTandem ) {
      return [
        new ControlPoint( -4, 6, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 0, 0, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 4, 6, { tandem: groupTandem.createNextTandem() } )
      ];
    },

    // create a set of control points which create a slope shaped track
    createSlopeControlPoints: function( groupTandem ) {
      return [
        new ControlPoint( -4, 6, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( -2, 1.2, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 2, 0, { tandem: groupTandem.createNextTandem() } )
      ];
    },

    // create a set of control points which create a double well
    // For the double well, move the left well up a bit since the interpolation moves it down by that much, and we
    // don't want the skater to go to y<0 while on the track.  Numbers determined by trial and error.
    createDoubleWellControlPoints: function( groupTandem ) {
      return [
        new ControlPoint( -4, 5, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( -2, 0.0166015, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 0, 2, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 2, 1, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 4, 5, { tandem: groupTandem.createNextTandem() } )
      ];
    },

    createLoopControlPoints: function ( groupTandem ) {

      // top of the left and right endpoints of the loop, higher than loopTop so that it is easy for the skater to go
      // all the way around the loop
      var trackTop = 5;

      var trackBottom = 0.08; // bottom points, so that the skater doesn't go below y = 0
      var loopTop = 3; // adjust to make the loop top point higher or lower
      var loopWidth = 6; // adjust to make the loop more or less wide
      var innerLoopWidth = 1; // roughly adjusts the width of the innerloop
      var innerLoopHeight = 1.5; // roughly adjust inner loop height (for control points, actual loop will be higher)

      return [
        new ControlPoint( -loopWidth / 2, trackTop, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( -innerLoopWidth, trackBottom, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( innerLoopWidth, innerLoopHeight, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( 0, loopTop, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( -innerLoopWidth, innerLoopHeight, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( innerLoopWidth, trackBottom, { tandem: groupTandem.createNextTandem() } ),
        new ControlPoint( loopWidth / 2, trackTop, { tandem: groupTandem.createNextTandem() } )
      ];
    },

    /**
     * Create a track from the control points, 
     * @param  {EnergySkateParkModel} model
     * @param  {Array.<Track>} modelTracks
     * @param  {Array.<ControlPoint>} controlPoints
     * @param  {Property.<Bounds2>} availableBoundsProperty 
     * @param  {object} options              
     * @return {Track}                         
     */
    createTrack:function( model, modelTracks, controlPoints, availableBoundsProperty, options ) {
      return new Track( model, modelTracks, controlPoints, PREMADE_INTERACTIVE, PARENT_TRACKS, availableBoundsProperty, options );
    }
  };

  energySkatePark.register( 'PremadeTracks', PremadeTracks );

  return PremadeTracks;
} );
