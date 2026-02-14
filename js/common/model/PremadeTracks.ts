// Copyright 2018-2026, University of Colorado Boulder

/**
 * A collection of tracks used in the EnergySkateParkTrackSet models of energy-skate-park and energy-skate-park-basics.
 * Premade tracks are not draggable but they can sometimes be "configurable", meaning that control points can be moved.
 * For configurable premade tracks, the control points can only be dragged within a smaller set of bounds. These
 * bounds are specified for all premade tracks, but will only apply to the track if the model tracks are "configurable".
 *
 * Premade tracks are all isolated so they have no "parent" tracks, see Track.js for definition of parent.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import ControlPoint from './ControlPoint.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import Track, { TrackOptions } from './Track.js';

// limiting bounds for dragging control points
const END_BOUNDS_WIDTH = 2.5;
const END_BOUNDS_HEIGHT = 4;

// the supported premade tracks, used in EnergySkateParkTrackSetModels
export const TrackTypes = [ 'PARABOLA', 'RAMP', 'DOUBLE_WELL', 'LOOP' ];
export type TrackType = typeof TrackTypes[number];

/**
 * Create a set of limiting drag bounds for a control point of a premade track. The control point is at the
 * CENTER of the limiting bounds.
 *
 * @param point - position of control point, CENTER of the bounds
 * @param width
 * @param height
 */
const createCenteredLimitBounds = ( point: Vector2, width: number, height: number ) => {
  return new Bounds2( point.x - width / 2, point.y - height / 2, point.x + width / 2, point.y + height / 2 );
};

/**
 * Create a set of limiting drag bounds for a control point of a premade track. The control point is at the BOTTOM
 * CENTER of the limiting bounds.
 *
 * @param point - position of control point, BOTTOM CENTER of the bounds
 * @param width
 * @param height
 */
const createBottomLimitBounds = ( point: Vector2, width: number, height: number ) => {
  return new Bounds2( point.x - width / 2, point.y, point.x + width / 2, point.y + height );
};

/**
 * Create a set of limiting drag bounds for a control point. The spacing args are relative to provided point,
 * which is presumably the position of the control point.
 *
 * @param point - spacing in each direction relative to this point
 * @param leftSpace - space to the left of point for bounds
 * @param rightSpace - space to the right of point for bounds
 * @param upSpace - space to the up of point for bounds
 * @param downSpace - space to the down of point for bounds
 */
const createRelativeSpaceBounds = ( point: Vector2, leftSpace: number, rightSpace: number, upSpace: number, downSpace: number ) => {
  return new Bounds2( point.x - leftSpace, point.y - downSpace, point.x + rightSpace, point.y + upSpace );
};

export type ParabolaOptions = {
  trackHeight?: number;
  trackWidth?: number;
  p1Visible?: boolean;
  p2Visible?: boolean;
  p3Visible?: boolean;
};

export type SlopeOptions = {
  trackWidth?: number;
  trackHeight?: number;
};

export type DoubleWellOptions = {
  trackHeight?: number;
  trackWidth?: number;
  trackMidHeight?: number;
  p1Visible?: boolean;
  p2Visible?: boolean;
  p3Visible?: boolean;
  p4Visible?: boolean;
  p5Visible?: boolean;
  p1UpSpacing?: number;
  p1DownSpacing?: number;
  p3UpSpacing?: number;
  p3DownSpacing?: number;
  p5UpSpacing?: number;
  p5DownSpacing?: number;
};

export type LoopOptions = {
  trackWidth?: number;
  trackHeight?: number;
  innerLoopWidth?: number;
  innerLoopTop?: number;
};
const PremadeTracks = {

  /**
   * Create a set of control points that create a parabola shaped track.
   */
  createParabolaControlPoints: ( model: EnergySkateParkModel, tandem: Tandem, options: ParabolaOptions ): ControlPoint[] => {
    options = combineOptions<ParabolaOptions>( {
      trackHeight: 6, // largest height for the parabola
      trackWidth: 8, // width from the left most control point to the right most control point

      // {boolean} - individual points may or may not be visible
      p1Visible: true,
      p2Visible: true,
      p3Visible: true
    }, options );

    const p1 = new Vector2( -options.trackWidth! / 2, options.trackHeight! );
    const p2 = new Vector2( 0, 0 );
    const p3 = new Vector2( options.trackWidth! / 2, options.trackHeight! );

    const p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );
    const p2Bounds = createBottomLimitBounds( p2, 5, 3 );
    const p3Bounds = createCenteredLimitBounds( p3, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

    return [
      new ControlPoint( p1.x, p1.y, {
        tandem: tandem.createTandem( 'controlPoint1' ),
        visible: options.p1Visible,
        limitBounds: p1Bounds
      } ),
      new ControlPoint( p2.x, p2.y, {
        tandem: tandem.createTandem( 'controlPoint2' ),
        visible: options.p2Visible,
        limitBounds: p2Bounds
      } ),
      new ControlPoint( p3.x, p3.y, {
        tandem: tandem.createTandem( 'controlPoint3' ),
        visible: options.p3Visible,
        limitBounds: p3Bounds
      } )
    ];
  },

  /**
   * Create a set of control points which create a slope shaped track, touching the ground on the right side.
   */
  createSlopeControlPoints: ( model: EnergySkateParkModel, tandem: Tandem, options: SlopeOptions ): ControlPoint[] => {

    options = combineOptions<SlopeOptions>( {
      trackWidth: 6,
      trackHeight: 6
    }, options );

    const p1 = new Vector2( -4, options.trackHeight! );
    const p2 = new Vector2( -2, 1.2 );
    const p3 = new Vector2( -4 + options.trackWidth!, 0 );

    const p1Bounds = createCenteredLimitBounds( p1, END_BOUNDS_WIDTH, END_BOUNDS_HEIGHT );

    // custom relative bounds so that bounds fall along the meter
    const p2Bounds = createRelativeSpaceBounds( p2, 0.5, 2.5, 1.8, 0.2 );
    const p3Bounds = createRelativeSpaceBounds( p3, 0.5, 2.5, 3, 0 );

    return [
      new ControlPoint( p1.x, p1.y, {
        tandem: tandem.createTandem( 'controlPoint1' ),
        limitBounds: p1Bounds
      } ),
      new ControlPoint( p2.x, p2.y, {
        tandem: tandem.createTandem( 'controlPoint2' ),
        limitBounds: p2Bounds
      } ),
      new ControlPoint( p3.x, p3.y, {
        tandem: tandem.createTandem( 'controlPoint3' ),
        limitBounds: p3Bounds
      } )
    ];
  },

  /**
   * Create a set of control points that will create a double well track. For the double well, move the left well up
   * a but since the interpolation moves it down by that much and we don't want the skater to go below ground
   * while on the track. Numbers determined by trial and error.
   */
  createDoubleWellControlPoints: ( model: EnergySkateParkModel, tandem: Tandem, options: DoubleWellOptions ): ControlPoint[] => {

    options = combineOptions<DoubleWellOptions>( {
      trackHeight: 5, // largest height for the well
      trackWidth: 8, // width from the left most control point to the right most control point
      trackMidHeight: 2, // height of the mid control point that creates the double well

      // {boolean} - individual points may or may not be visible
      p1Visible: true,
      p2Visible: true,
      p3Visible: true,
      p4Visible: true,
      p5Visible: true,

      // spacing for drag bounds of the first (left) control point for createRelativeSpaceBounds
      p1UpSpacing: 3,
      p1DownSpacing: 1,

      // Spacing for drag bounds of the third (center) control point for createRelativeSpaceBounds
      p3UpSpacing: 4,
      p3DownSpacing: 2,

      // spacing for the drag bounds of the fifth (right) control point for createRelativeSpaceBounds
      p5UpSpacing: 3,
      p5DownSpacing: 1

    }, options );

    const p1 = new Vector2( -options.trackWidth! / 2, options.trackHeight! );
    const p2 = new Vector2( -2, 0.0166015 );
    const p3 = new Vector2( 0, options.trackMidHeight! );
    const p4 = new Vector2( 2, 1 );
    const p5 = new Vector2( options.trackWidth! / 2, options.trackHeight! );

    const p1Bounds = createRelativeSpaceBounds( p1, 1.0, 1.5, options.p1UpSpacing!, options.p1DownSpacing! );
    const p2Bounds = createRelativeSpaceBounds( p2, 1.5, 0.5, 3, 0 );
    const p3Bounds = createRelativeSpaceBounds( p3, 1, 1, options.p3UpSpacing!, options.p3DownSpacing! );
    const p4Bounds = createRelativeSpaceBounds( p4, 0.5, 1.5, 2, 1 );
    const p5Bounds = createRelativeSpaceBounds( p5, 1.5, 1.0, options.p5UpSpacing!, options.p5DownSpacing! );

    return [
      new ControlPoint( p1.x, p1.y, {
        tandem: tandem.createTandem( 'controlPoint1' ),
        limitBounds: p1Bounds,
        visible: options.p1Visible
      } ),
      new ControlPoint( p2.x, p2.y, {
        tandem: tandem.createTandem( 'controlPoint2' ),
        limitBounds: p2Bounds,
        visible: options.p2Visible
      } ),
      new ControlPoint( p3.x, p3.y, {
        tandem: tandem.createTandem( 'controlPoint3' ),
        limitBounds: p3Bounds,
        visible: options.p3Visible
      } ),
      new ControlPoint( p4.x, p4.y, {
        tandem: tandem.createTandem( 'controlPoint4' ),
        limitBounds: p4Bounds,
        visible: options.p4Visible
      } ),
      new ControlPoint( p5.x, p5.y, {
        tandem: tandem.createTandem( 'controlPoint5' ),
        limitBounds: p5Bounds,
        visible: options.p5Visible
      } )
    ];
  },

  /**
   * Create a set of control points that will form a track that takes the shape of a loop.
   */
  createLoopControlPoints: ( model: EnergySkateParkModel, tandem: Tandem, options: LoopOptions ): ControlPoint[] => {

    options = combineOptions<LoopOptions>( {
      trackWidth: 9,
      trackHeight: 6,
      innerLoopWidth: 3,
      innerLoopTop: 4
    }, options );

    // top of the left and right endpoints of the loop, higher than loopTop so that it is easy for the skater to go
    // all the way around the loop
    const trackTop = options.trackHeight!;

    const trackBottom = 0.3; // bottom points, so that the skater doesn't go below y = 0
    const loopTop = options.innerLoopTop!; // adjust to make the loop top point higher or lower
    const loopWidth = options.trackWidth!; // adjust to make the loop more or less wide
    const innerLoopWidth = options.innerLoopWidth!; // roughly adjusts the width of the innerloop
    const innerLoopHeight = 2; // roughly adjust inner loop height (for control points, actual loop will be higher)

    const p1 = new Vector2( -loopWidth / 2, trackTop );
    const p2 = new Vector2( -innerLoopWidth / 2, trackBottom );
    const p3 = new Vector2( innerLoopWidth / 2, innerLoopHeight );
    const p4 = new Vector2( 0, loopTop );
    const p5 = new Vector2( -innerLoopWidth / 2, innerLoopHeight );
    const p6 = new Vector2( innerLoopWidth / 2, trackBottom );
    const p7 = new Vector2( loopWidth / 2, trackTop );

    const p1Bounds = createRelativeSpaceBounds( p1, 0.5, 1.5, 2, 3 );
    const p2Bounds = createRelativeSpaceBounds( p2, 1, 1, 1 - trackBottom, trackBottom );
    const p3Bounds = createCenteredLimitBounds( p3, 2, 1 );
    const p4Bounds = createRelativeSpaceBounds( p4, 1.5, 1.5, 2, 1 );
    const p5Bounds = createCenteredLimitBounds( p5, 2, 1 );
    const p6Bounds = createRelativeSpaceBounds( p6, 1, 1, 1 - trackBottom, trackBottom );
    const p7Bounds = createRelativeSpaceBounds( p7, 1.5, 0.5, 2, 3 );

    return [
      new ControlPoint( p1.x, p1.y, {
        tandem: tandem.createTandem( 'controlPoint1' ),
        limitBounds: p1Bounds
      } ),
      new ControlPoint( p2.x, p2.y, {
        tandem: tandem.createTandem( 'controlPoint2' ),
        limitBounds: p2Bounds
      } ),
      new ControlPoint( p3.x, p3.y, {
        tandem: tandem.createTandem( 'controlPoint3' ),
        limitBounds: p3Bounds
      } ),
      new ControlPoint( p4.x, p4.y, {
        tandem: tandem.createTandem( 'controlPoint4' ),
        limitBounds: p4Bounds
      } ),
      new ControlPoint( p5.x, p5.y, {
        tandem: tandem.createTandem( 'controlPoint5' ),
        limitBounds: p5Bounds
      } ),
      new ControlPoint( p6.x, p6.y, {
        tandem: tandem.createTandem( 'controlPoint6' ),
        limitBounds: p6Bounds
      } ),
      new ControlPoint( p7.x, p7.y, {
        tandem: tandem.createTandem( 'controlPoint7' ),
        limitBounds: p7Bounds
      } )
    ];
  },

  /**
   * Create a track from the provided control points.
   */
  createTrack( model: EnergySkateParkModel, controlPoints: ControlPoint[], options?: TrackOptions ): Track {
    return new Track( model, controlPoints, options );
  }
};

energySkatePark.register( 'PremadeTracks', PremadeTracks );

export default PremadeTracks;