// Copyright 2013-2025, University of Colorado Boulder

/**
 * Model for one track in Energy Skate Park, which contains the control points and cubic splines for
 * interpolating between them.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { DragListener, SceneryEvent } from '../../../../scenery/js/imports.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import energySkatePark from '../../energySkatePark.js';
import SplineEvaluation, { Spline } from '../SplineEvaluation.js';
import ControlPoint from './ControlPoint.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';

// options for a track that is fully interactive - it can be dragged, control points can be moved, broken into
// different tracks, and combined with another track
const FULLY_INTERACTIVE_OPTIONS = {
  draggable: true,
  configurable: true,
  splittable: true,
  attachable: true
};

type TrackState = {
  controlPoints: Array<ReferenceIOState>;
  draggable: boolean;
  configurable: boolean;
  splittable: boolean;
  attachable: boolean;
};

type SelfOptions = {

  // can this track be dragged and moved in the play area?
  draggable?: boolean;

  // can this track be changed by dragging control points? Some tracks can have their
  // control points moved but cannot be dragged as a whole.
  configurable?: boolean;

  // can this track be changed or broken by removing control points? I so, clicking on a control
  // point will create a UI to split the track or delete the control point.
  splittable?: boolean;

  // can this track be attached with another track by dragging track or control points? When a track
  // is attachable control points at the end of the track have a different visualization to indicate that
  // the track can be attached to another.
  attachable?: boolean;

  // whether the skater transitions from the right edge of this track directly to the ground, see
  // this._slopeToGround for more information
  slopeToGround?: boolean;
};

export type TrackOptions = SelfOptions & PhetioObjectOptions;

export type Curvature = {
  r: number;
  x: number;
  y: number;
};

export default class Track extends PhetioObject {

  public readonly translatedEmitter = new Emitter();
  public readonly resetEmitter = new Emitter();
  public readonly smoothedEmitter = new Emitter();
  public readonly updateEmitter = new Emitter();
  public readonly removeEmitter = new Emitter();
  public readonly forwardingDragStartEmitter = new Emitter( { parameters: [ { valueType: SceneryEvent } ] } );
  public readonly model: EnergySkateParkModel;
  public readonly draggable: boolean;
  public readonly splittable: boolean;
  public readonly attachable: boolean;
  public readonly configurable: boolean;
  public dragSource: DragListener | null;
  private _slopeToGround: boolean;
  private _restoreSlopeToGroundOnReset: boolean;
  private _position: Vector2;
  public readonly physicalProperty: BooleanProperty;

  // Flag that shows whether the track has been dragged fully out of the panel
  public readonly leftThePanelProperty: BooleanProperty;

  // Keep track of whether the track is dragging, so performance can be optimized while dragging -
  // only true while track is in the Play Area (physical)
  public readonly draggingProperty: BooleanProperty;

  // Flag to indicate whether the user has dragged the track out of the toolbox.  If dragging from the toolbox,
  // then dragging translates the entire track instead of just a point.
  public readonly controlPoints: ControlPoint[];
  public readonly controlPointDraggingProperty: TReadOnlyProperty<boolean>;
  public readonly parametricPosition: Float64Array<ArrayBuffer>;
  public readonly x: Float64Array<ArrayBuffer>;
  public readonly y: Float64Array<ArrayBuffer>;

  // Sampling points, which will be initialized and updated in updateLinSpace.  These points are evenly spaced
  // in the track parametric coordinates from just before the track parameter space to just after. See updateLinSpace
  public searchLinSpace: number[] | null;
  public distanceBetweenSamplePoints: null | number;
  public xSplineDiff: Spline | null = null;
  public ySplineDiff: Spline | null = null;
  public xSpline: Spline | null = null;
  public ySpline: Spline | null = null;
  public xSearchPoints: Float64Array | null = null;
  public ySearchPoints: Float64Array | null = null;
  public xSplineDiffDiff: Spline | null = null;
  public ySplineDiffDiff: Spline | null = null;
  public minPoint!: number;
  public maxPoint!: number;

  /**
   * Model for a track, which has a fixed number of points.  If you added a point to a Track, you need a new track.
   *
   * @param model
   * @param controlPoints
   * @param [options] - required for tandem
   */
  public constructor( model: EnergySkateParkModel, controlPoints: ControlPoint[], providedOptions?: TrackOptions ) {

    const options = optionize<TrackOptions, SelfOptions, PhetioObjectOptions>()( {
      draggable: false,
      configurable: false,
      splittable: false,
      attachable: false,
      slopeToGround: false,
      tandem: Tandem.REQUIRED,
      phetioType: Track.TrackIO,
      phetioState: PhetioObject.DEFAULT_OPTIONS.phetioState
    }, providedOptions );

    options.phetioState = options.configurable || options.attachable || options.splittable;
    super( options );

    const tandem = options.tandem;

    this.model = model;
    this.draggable = options.draggable;
    this.configurable = options.configurable;
    this.splittable = options.splittable;
    this.attachable = options.attachable;

    // Keep track of what component (control point or track body) is dragging the track, so
    // that it can't be dragged by
    // two sources, which causes a flicker, see #282
    this.dragSource = null;

    // Flag to indicate whether the skater transitions from the right edge of this track directly to the
    // ground, if set to true, additional corrections to skater energy will be applied so that energy is conserved in
    // this case - see phetsims/energy-skate-park-basics#164. Also see the getters/setters for this below.
    this._slopeToGround = false;

    // if slopeToGround is set, and we will set slopeToGround to false if the Track is configurable
    // and a control point moves because the track presumably no longer slopes to the ground perfectly. But
    // the track should slope to ground again on reset.
    this._restoreSlopeToGroundOnReset = false;

    // Use an arbitrary position for translating the track during dragging.  Only used for deltas in relative
    // positioning and translation, so an exact "position" is irrelevant, see #260
    this._position = new Vector2( 0, 0 );

    // True if the track can be interacted with.  For screens 1-2 only one track will be physical
    // (and hence visible). For screen 3, tracks in the control panel are visible but non-physical until dragged to
    // the play area
    this.physicalProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'physicalProperty' ),
      phetioState: options.phetioState // Participate in state only if parent track is too
    } );

    this.leftThePanelProperty = new BooleanProperty( false );

    this.draggingProperty = new BooleanProperty( false );

    const trackChangedListener = () => { model.trackChangedEmitter.emit(); };
    this.physicalProperty.link( trackChangedListener );

    this.controlPoints = controlPoints;
    assert && assert( this.controlPoints, 'control points should be defined' );

    // boolean value that is true if any control point on this track is being dragged
    this.controlPointDraggingProperty = DerivedProperty.deriveAny( _.map( controlPoints, point => point.draggingProperty ), ( ...args ) => {
      return _.reduce( args, ( collapsed, value ) => collapsed || value )!;
    }, {
      valueType: 'boolean'
    } );

    this.parametricPosition = new Float64Array( this.controlPoints.length );
    this.x = new Float64Array( this.controlPoints.length );
    this.y = new Float64Array( this.controlPoints.length );

    this.searchLinSpace = null;
    this.distanceBetweenSamplePoints = null;

    this.updateLinSpace();
    this.updateSplines();

    // set fields that correct energy when skater transitions directly to ground, if defined on the track
    this.setSlopeToGround( options.slopeToGround );

    // In the state wrapper, when the state changes, we must update the skater node
    const stateListener = () => {
      this.updateLinSpace();
      this.updateSplines();
      model.trackChangedEmitter.emit();
      model.updateEmitter.emit();
    };
    phetioStateSetEmitter.addListener( stateListener );
    this.disposeEmitter.addListener( () => phetioStateSetEmitter.removeListener( stateListener ) );

    // when available bounds change, make sure that control points are within bounds - must be disposed
    const boundsListener = ( bounds: Bounds2 ) => {
      if ( this.physicalProperty.value && this.splittable ) {
        this.containControlPointsInAvailableBounds( bounds );
      }
    };
    this.model.availableModelBoundsProperty.link( boundsListener, { disposer: this } );

    this.addDisposable(
      this.physicalProperty,
      this.leftThePanelProperty,
      this.draggingProperty,
      this.controlPointDraggingProperty
    );
  }

  /**
   * When points change, update the spline instance.
   */
  public updateSplines(): void {

    // Arrays are fixed length, so just overwrite values, see #38
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      this.parametricPosition[ i ] = i / this.controlPoints.length;
      this.x[ i ] = this.controlPoints[ i ].positionProperty.value.x;
      this.y[ i ] = this.controlPoints[ i ].positionProperty.value.y;
    }

    // @ts-expect-error
    this.xSpline = numeric.spline( this.parametricPosition, this.x );
    // @ts-expect-error
    this.ySpline = numeric.spline( this.parametricPosition, this.y );

    // Mark search points as dirty
    this.xSearchPoints = null;
    this.ySearchPoints = null;

    // Mark derivatives as dirty
    this.xSplineDiff = null;
    this.ySplineDiff = null;

    this.xSplineDiffDiff = null;
    this.ySplineDiffDiff = null;
  }

  /**
   * Reset the track.
   */
  public reset(): void {
    this.physicalProperty.reset();
    this.leftThePanelProperty.reset();
    this.draggingProperty.reset();
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      this.controlPoints[ i ].reset();
    }

    // if track is configurable, "slope to ground" energy corrections are disabled when control points move - on reset
    // reapply those corrections
    if ( this._restoreSlopeToGroundOnReset ) {
      this.slopeToGround = true;
    }

    // Broadcast message so that TrackNode can update the shape
    this.updateSplines();
    this.resetEmitter.emit();
  }

  /**
   * Returns the closest point (Euclidean) and position (parametric) on the track, as an object with {u,point}
   * also checks 1E-6 beyond each side of the track to see if the skater is beyond the edge of the track
   * This currently does a flat search, but if more precision is needed, a finer-grained binary search could be done
   * afterwards. This code is used when dragging the skater (to see if he is dragged near the track) and while the
   * skater is falling toward the track (to see if he should bounce/attach).
   */
  public getClosestPositionAndParameter( point: Vector2 ): { parametricPosition: number; point: Vector2; distance: number } {

    // Compute the spline points for purposes of getting closest points.
    // keep these points around and invalidate only when necessary
    if ( !this.xSearchPoints ) {
      this.xSearchPoints = SplineEvaluation.atArray( this.xSpline!, this.searchLinSpace! );
      this.ySearchPoints = SplineEvaluation.atArray( this.ySpline!, this.searchLinSpace! );
    }

    let bestU = 0;
    let bestDistanceSquared = Number.POSITIVE_INFINITY;
    const bestPoint = new Vector2( 0, 0 );
    for ( let i = 0; i < this.xSearchPoints.length; i++ ) {
      const distanceSquared = point.distanceSquaredXY( this.xSearchPoints[ i ], this.ySearchPoints![ i ] );
      if ( distanceSquared < bestDistanceSquared ) {
        bestDistanceSquared = distanceSquared;
        bestU = this.searchLinSpace![ i ];
        bestPoint.x = this.xSearchPoints[ i ];
        bestPoint.y = this.ySearchPoints![ i ];
      }
    }

    // Binary search in the neighborhood of the best point, to refine the search
    const distanceBetweenSearchPoints = Math.abs( this.searchLinSpace![ 1 ] - this.searchLinSpace![ 0 ] );
    let topU = bestU + distanceBetweenSearchPoints / 2;
    let bottomU = bestU - distanceBetweenSearchPoints / 2;

    let topX = SplineEvaluation.atNumber( this.xSpline!, topU );
    let topY = SplineEvaluation.atNumber( this.ySpline!, topU );

    let bottomX = SplineEvaluation.atNumber( this.xSpline!, bottomU );
    let bottomY = SplineEvaluation.atNumber( this.ySpline!, bottomU );

    // Even at 400 binary search iterations, performance is smooth on iPad3, so this loop doesn't seem too invasive
    const maxBinarySearchIterations = 40;
    for ( let i = 0; i < maxBinarySearchIterations; i++ ) {

      const topDistanceSquared = point.distanceSquaredXY( topX, topY );
      const bottomDistanceSquared = point.distanceSquaredXY( bottomX, bottomY );

      if ( topDistanceSquared < bottomDistanceSquared ) {
        bottomU = bottomU + ( topU - bottomU ) / 4;  // move halfway up
        bottomX = SplineEvaluation.atNumber( this.xSpline!, bottomU );
        bottomY = SplineEvaluation.atNumber( this.ySpline!, bottomU );
        bestDistanceSquared = topDistanceSquared;
      }
      else {
        topU = topU - ( topU - bottomU ) / 4;  // move halfway down
        topX = SplineEvaluation.atNumber( this.xSpline!, topU );
        topY = SplineEvaluation.atNumber( this.ySpline!, topU );
        bestDistanceSquared = bottomDistanceSquared;
      }
    }
    bestU = ( topU + bottomU ) / 2;
    bestPoint.x = SplineEvaluation.atNumber( this.xSpline!, bestU );
    bestPoint.y = SplineEvaluation.atNumber( this.ySpline!, bestU );

    return { parametricPosition: bestU, point: bestPoint, distance: bestDistanceSquared };
  }

  /**
   * Get x position at the parametric position.
   */
  public getX( parametricPosition: number ): number { return SplineEvaluation.atNumber( this.xSpline!, parametricPosition ); }

  /**
   * Get y position at the parametric position.
   *
   * @param parametricPosition
   */
  public getY( parametricPosition: number ): number { return SplineEvaluation.atNumber( this.ySpline!, parametricPosition ); }

  /**
   * Get the model position at the parametric position.
   */
  public getPoint( parametricPosition: number ): Vector2 {
    const x = SplineEvaluation.atNumber( this.xSpline!, parametricPosition );
    const y = SplineEvaluation.atNumber( this.ySpline!, parametricPosition );
    return new Vector2( x, y );
  }

  /**
   * Translate the track by moving all control points by dx and dy.
   */
  private translate( dx: number, dy: number ): void {
    this._position = this._position.plusXY( dx, dy );

    // move all the control points
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const point = this.controlPoints[ i ];
      point.sourcePositionProperty.value = point.sourcePositionProperty.value.plusXY( dx, dy );
    }

    this.updateSplines();

    // Just observing the control points individually would lead to N expensive callbacks (instead of 1)
    // for each of the N points, So we use this broadcast mechanism instead
    this.translatedEmitter.emit();
  }

  /**
   * Set whether or not this Track slopes to the ground, and corrects energy on the transition from track to ground.
   * If the track is configurable, we do NOT want to maintain this correction when the control points move. But when
   * this track is reset, we should reapply this correction.
   */
  public setSlopeToGround( slopeToGround: boolean ): void {
    this._slopeToGround = slopeToGround;

    if ( slopeToGround ) {
      this._restoreSlopeToGroundOnReset = true;
    }
  }

  public set slopeToGround( slopeToGround: boolean ) { this.setSlopeToGround( slopeToGround ); }

  public get slopeToGround(): boolean { return this.getSlopeToGround(); }

  /**
   * Get whether or not the track "slopes to the ground", and skater energy state should apply additional corrections.
   */
  public getSlopeToGround(): boolean {
    return this._slopeToGround;
  }

  /**
   * For purposes of showing the skater angle, get the view angle of the track here. Note this means inverting the y
   * values, this is called every step while animating on the track, so it was optimized to avoid new allocations.
   *
   * @param parametricPosition
   */
  public getViewAngleAt( parametricPosition: number ): number {
    if ( this.xSplineDiff === null ) {
      this.xSplineDiff = this.xSpline!.diff();
      this.ySplineDiff = this.ySpline!.diff();
    }
    return Math.atan2( -SplineEvaluation.atNumber( this.ySplineDiff!, parametricPosition ), SplineEvaluation.atNumber( this.xSplineDiff, parametricPosition ) );
  }

  /**
   * Get the model angle at the specified position on the track.
   */
  public getModelAngleAt( parametricPosition: number ): number {

    // load xSplineDiff, ySplineDiff here if not already loaded
    if ( this.xSplineDiff === null ) {
      this.xSplineDiff = this.xSpline!.diff();
      this.ySplineDiff = this.ySpline!.diff();
    }
    return Math.atan2( SplineEvaluation.atNumber( this.ySplineDiff!, parametricPosition ), SplineEvaluation.atNumber( this.xSplineDiff, parametricPosition ) );
  }

  /**
   * Get the model unit vector at the specified position on the track.
   */
  public getUnitNormalVector( parametricPosition: number ): Vector2 {

    // load xSplineDiff, ySplineDiff here if not already loaded
    if ( this.xSplineDiff === null ) {
      this.xSplineDiff = this.xSpline!.diff();
      this.ySplineDiff = this.ySpline!.diff();
    }
    return new Vector2( -SplineEvaluation.atNumber( this.ySplineDiff!, parametricPosition ), SplineEvaluation.atNumber( this.xSplineDiff, parametricPosition ) ).normalize();
  }

  /**
   * Get the model parallel vector at the specified position on the track.
   */
  public getUnitParallelVector( parametricPosition: number ): Vector2 {

    // load xSplineDiff, ySplineDiff here if not already loaded
    if ( this.xSplineDiff === null ) {
      this.xSplineDiff = this.xSpline!.diff();
      this.ySplineDiff = this.ySpline!.diff();
    }
    return new Vector2( SplineEvaluation.atNumber( this.xSplineDiff, parametricPosition ), SplineEvaluation.atNumber( this.ySplineDiff!, parametricPosition ) ).normalize();
  }

  /**
   * Update the linspace, the evenly spaced vectors between the number of control points in the track.
   */
  private updateLinSpace(): void {
    this.minPoint = 0;
    this.maxPoint = ( this.controlPoints.length - 1 ) / this.controlPoints.length;
    const prePoint = this.minPoint - 1E-6;
    const postPoint = this.maxPoint + 1E-6;

    // Store for performance
    // made number of sample points depend on the length of the track, to make it smooth enough no matter how long it is
    const n = 20 * ( this.controlPoints.length - 1 );

    // @ts-expect-error
    this.searchLinSpace = numeric.linspace( prePoint, postPoint, n );
    this.distanceBetweenSamplePoints = ( postPoint - prePoint ) / n;
  }

  /**
   * Detect whether a parametric point is in bounds of this track, for purposes of telling whether the skater fell
   * past the edge of the track.
   */
  public isParameterInBounds( parametricPosition: number ): boolean {
    return parametricPosition >= this.minPoint && parametricPosition <= this.maxPoint;
  }

  /**
   * Track information as a string for debugging purposes.
   */
  public override toString(): string {
    let string = '';
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const point = this.controlPoints[ i ];
      string = `${string}(${point.positionProperty.value.x},${point.positionProperty.value.y})`;
    }
    return string;
  }

  /**
   * Get the snap target for a control point, if one is specified.
   */
  public getSnapTarget(): null | ControlPoint {
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const o = this.controlPoints[ i ];
      if ( o.snapTargetProperty.value ) {
        return o.snapTargetProperty.value;
      }
    }
    return null;
  }

  /**
   * Get the y position in meters of the bottom most control point.
   */
  public getBottomControlPointY(): number {
    let best = Number.POSITIVE_INFINITY;
    const length = this.controlPoints.length;
    for ( let i = 0; i < length; i++ ) {
      if ( this.controlPoints[ i ].sourcePositionProperty.value.y < best ) {
        best = this.controlPoints[ i ].sourcePositionProperty.value.y;
      }
    }
    return best;
  }

  /**
   * Get the y position in meters of the top most control point.
   */
  public getTopControlPointY(): number {
    let best = Number.NEGATIVE_INFINITY;
    const length = this.controlPoints.length;
    for ( let i = 0; i < length; i++ ) {
      if ( this.controlPoints[ i ].sourcePositionProperty.value.y > best ) {
        best = this.controlPoints[ i ].sourcePositionProperty.value.y;
      }
    }
    return best;
  }

  /**
   * Get the x position of the left most control point, in meters.
   */
  public getLeftControlPointX(): number {
    let best = Number.POSITIVE_INFINITY;
    const length = this.controlPoints.length;
    for ( let i = 0; i < length; i++ ) {
      if ( this.controlPoints[ i ].sourcePositionProperty.value.x < best ) {
        best = this.controlPoints[ i ].sourcePositionProperty.value.x;
      }
    }
    return best;
  }

  /**
   * Get the x position of the right most control point, in meters.
   */
  public getRightControlPointX(): number {
    let best = Number.NEGATIVE_INFINITY;
    const length = this.controlPoints.length;
    for ( let i = 0; i < length; i++ ) {
      if ( this.controlPoints[ i ].sourcePositionProperty.value.x > best ) {
        best = this.controlPoints[ i ].sourcePositionProperty.value.x;
      }
    }
    return best;
  }

  /**
   * Returns true if this track contains the provided control point.
   */
  public containsControlPoint( controlPoint: ControlPoint ): boolean {
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      if ( this.controlPoints[ i ] === controlPoint ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the arc length (in meters) between two points on a parametric curve.
   * This function is at the heart of many nested loops, so it must be heavily optimized
   */
  public getArcLength( u0: number, u1: number ): number {
    if ( u1 === u0 ) {
      return 0;
    }
    if ( u1 < u0 ) {
      return -this.getArcLength( u1, u0 );
    }

    // Discrepancy with original version: original version had 10 subdivisions here.  We have reduced it to improve
    // performance at the cost of numerical precision
    const numSegments = 4;
    const da = ( u1 - u0 ) / ( numSegments - 1 );
    let prevX = SplineEvaluation.atNumber( this.xSpline!, u0 );
    let prevY = SplineEvaluation.atNumber( this.ySpline!, u0 );
    let sum = 0;
    for ( let i = 1; i < numSegments; i++ ) {
      const a = u0 + i * da;
      const ptX = SplineEvaluation.atNumber( this.xSpline!, a );
      const ptY = SplineEvaluation.atNumber( this.ySpline!, a );

      const dx = prevX - ptX;
      const dy = prevY - ptY;

      sum += Math.sqrt( dx * dx + dy * dy );
      prevX = ptX;
      prevY = ptY;
    }
    return sum;
  }

  /**
   * Find the parametric distance along the track, starting at u0 and moving ds meters
   *
   * @param u0 the starting point along the track in parametric coordinates
   * @param ds meters to traverse along the track
   */
  public getParametricDistance( u0: number, ds: number ): number {
    let lowerBound = -1;
    let upperBound = 2;

    let guess = ( upperBound + lowerBound ) / 2.0;

    let metricDelta = this.getArcLength( u0, guess );
    const epsilon = 1E-8; // ORIGINAL ENERGY SKATE PARK BASICS HAD VALUE 1E-8

    let count = 0;
    while ( Math.abs( metricDelta - ds ) > epsilon ) {
      if ( metricDelta > ds ) {
        upperBound = guess;
      }
      else {
        lowerBound = guess;
      }
      guess = ( upperBound + lowerBound ) / 2.0;
      metricDelta = this.getArcLength( u0, guess );
      count++;
      if ( count > 100 ) {
        assert && assert( count <= 100, 'binary search failed' );
        break;
      }
    }
    return guess - u0;
  }

  /**
   * Compute the signed curvature as defined here: http://en.wikipedia.org/wiki/Curvature#Local_expressions
   * Used for centripetal force and determining whether the skater flies off the track
   * Curvature parameter is for storing the result as pass-by-reference.
   * Please see #50 regarding GC
   *
   * @param parametricPosition
   * @param curvature - object literal with { r: {number}, x: {number}, y: {number} }
   */
  public getCurvature( parametricPosition: number, curvature: IntentionalAny ): void {

    if ( this.xSplineDiff === null ) {
      this.xSplineDiff = this.xSpline!.diff();
      this.ySplineDiff = this.ySpline!.diff();
    }

    if ( this.xSplineDiffDiff === null ) {
      this.xSplineDiffDiff = this.xSplineDiff.diff();
      this.ySplineDiffDiff = this.ySplineDiff!.diff();
    }

    const xP = SplineEvaluation.atNumber( this.xSplineDiff, parametricPosition );
    const xPP = SplineEvaluation.atNumber( this.xSplineDiffDiff, parametricPosition );
    const yP = SplineEvaluation.atNumber( this.ySplineDiff!, parametricPosition );
    const yPP = SplineEvaluation.atNumber( this.ySplineDiffDiff!, parametricPosition );

    const k = ( xP * yPP - yP * xPP ) /
              Math.pow( ( xP * xP + yP * yP ), 3 / 2 );

    // Using component-wise math to avoid allocations, see #50
    const centerX = this.getX( parametricPosition );
    const centerY = this.getY( parametricPosition );

    const unitNormalVector = this.getUnitNormalVector( parametricPosition );
    const vectorX = unitNormalVector.x / k + centerX;
    const vectorY = unitNormalVector.y / k + centerY;

    curvature.r = 1 / k;
    curvature.x = vectorX;
    curvature.y = vectorY;
  }

  /**
   * Find the lowest y-point on the spline by sampling, used when dropping the track or a control point to ensure
   * it won't go below y=0.
   */
  public getLowestY(): number {
    if ( !this.xSearchPoints ) {
      this.xSearchPoints = SplineEvaluation.atArray( this.xSpline!, this.searchLinSpace! );
      this.ySearchPoints = SplineEvaluation.atArray( this.ySpline!, this.searchLinSpace! );
    }

    let min = Number.POSITIVE_INFINITY;
    let minIndex = -1;
    let y;
    for ( let i = 0; i < this.ySearchPoints!.length; i++ ) {
      y = this.ySearchPoints![ i ];
      if ( y < min ) {
        min = y;
        minIndex = i;
      }
    }

    // Increase resolution in the neighborhood of y
    const foundU = this.searchLinSpace![ minIndex ];

    const minBound = foundU - this.distanceBetweenSamplePoints!;
    const maxBound = foundU + this.distanceBetweenSamplePoints!;

    // @ts-expect-error
    const smallerSpace = numeric.linspace( minBound, maxBound, 200 );
    const refinedSearchPoints = SplineEvaluation.atArray( this.ySpline!, smallerSpace );

    min = Number.POSITIVE_INFINITY;
    for ( let i = 0; i < refinedSearchPoints.length; i++ ) {
      y = refinedSearchPoints[ i ];
      if ( y < min ) {
        min = y;
      }
    }

    return min;
  }

  /**
   * If any part of the track is below ground, move the whole track up so it rests at y=0 at its minimum, see #71
   * Called when user releases track or a control point after dragging.
   */
  public bumpAboveGround(): void {
    const lowestY = this.getLowestY();
    if ( lowestY < 0 ) {
      this.translate( 0, -lowestY );
    }

    // contain control points in limiting drag bounds (if control points have them specified) so that bumping above
    // ground doesn't push control points out of these bounds - do this without updating splines since we will
    // do that anyway in containControlPointsInAvailableBounds
    this.containControlPointsInLimitBounds( false );
    this.containControlPointsInAvailableBounds( this.model.availableModelBoundsProperty.get() );
  }

  /**
   * If any control points are out of the model available bounds (bounds of the entire simulation play area),
   * bump them back in. Useful when the model bounds change, or when bumping the track above ground.
   */
  private containControlPointsInAvailableBounds( bounds: IntentionalAny ): void {
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const currentPosition = this.controlPoints[ i ].positionProperty.get();
      if ( !bounds.containsPoint( currentPosition ) ) {
        const newPoint = bounds.getClosestPoint( currentPosition.x, currentPosition.y );

        // set the control point "source" position to the new point - this is the unsnapped position, see
        // ControlPoint.js
        this.controlPoints[ i ].sourcePositionProperty.value = newPoint;
      }
    }
    this.updateSplines();

    // It is possible that containing the control points has pushed a portion of the spline back
    // underground, if that is the case bump them back above ground. But only do this if no control points
    // are "snapping" as the spline *could* be underground  temporarily in this case
    const anyControlPointsSnapping = _.some( this.controlPoints, point => point.snapTargetProperty.get() );
    if ( !anyControlPointsSnapping ) {

      const lowestY = this.getLowestY();
      if ( lowestY < 0 ) {

        // push the track above ground by an amount that isn't prone to precision errors, see
        // https://github.com/phetsims/energy-skate-park/issues/191
        const correction = lowestY - 0.001;

        // translate updates splines for us
        this.translate( 0, -correction );
        assert && assert( this.getLowestY() >= 0, 'track should be above ground' );
      }
    }

    // assert && assert( this.getLowestY() >= 0, 'track should be above ground' );
    this.updateEmitter.emit();
  }

  /**
   * Make sure that all control points are contained within their limiting draggable bounds. The algorithm for keeping
   * the track above ground might push all control points up, so this will make sure that limiting bounds are
   * respected. Not all control points have limiting bounds for dragging.
   *
   * @param updateSplines optional, whether or not to update splines and redraw after this operation
   *                      (for performance, you might chose to wait and do this later)
   */
  public containControlPointsInLimitBounds( updateSplines?: boolean ): void {
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const controlPoint = this.controlPoints[ i ];
      const limitBounds = controlPoint.limitBounds;
      const currentPosition = controlPoint.positionProperty.get();

      if ( limitBounds ) {
        if ( !limitBounds.containsPoint( currentPosition ) ) {
          const newPoint = limitBounds.getClosestPoint( currentPosition.x, currentPosition.y );
          controlPoint.sourcePositionProperty.set( newPoint );
        }
      }

      if ( updateSplines ) {
        this.updateSplines();
        this.updateEmitter.emit();
      }
    }
  }

  /**
   * Smooth out the track so it doesn't have any sharp turns, see #177
   *
   * @param i - the index of the control point to adjust
   */
  public smooth( i: number ): boolean {
    assert && assert( i >= 0 && i < this.controlPoints.length );
    assert && assert( this.model.availableModelBoundsProperty );

    const availableModelBounds = this.model.availableModelBoundsProperty.value;
    assert && assert( availableModelBounds );

    let success = false;
    let numTries = 0;

    // Record the original control point position
    const originalX = this.controlPoints[ i ].sourcePositionProperty.value.x;
    const originalY = this.controlPoints[ i ].sourcePositionProperty.value.y;

    // Spiral outward, searching for a point that gives a smooth enough track.
    let distance = 0.01;
    let angle = 0;
    const MAX_TRIES = 80;
    const MAXIMUM_ACCEPTABLE_RADIUS_OF_CURVATURE = 0.03;

    while ( this.getMinimumRadiusOfCurvature() < MAXIMUM_ACCEPTABLE_RADIUS_OF_CURVATURE && numTries < MAX_TRIES ) {
      const delta = Vector2.createPolar( distance, angle );
      const proposedPosition = delta.plusXY( originalX, originalY );

      // Only search within the visible model bounds, see #195
      const containsPoint = availableModelBounds.containsPoint( proposedPosition );
      if ( containsPoint ) {
        this.controlPoints[ i ].sourcePositionProperty.value = proposedPosition;
        this.updateSplines();
      }
      angle = angle + Math.PI / 9;
      distance = distance + 0.07;
      numTries++;
    }

    // Could not find a better solution, leave the control point where it started.
    if ( numTries >= MAX_TRIES ) {
      this.controlPoints[ i ].sourcePositionProperty.value = new Vector2( originalX, originalY );
      this.updateSplines();
    }
    else {
      success = true;
    }

    this.smoothedEmitter.emit();
    return success;
  }

  /**
   * The user just released a control point with index (indexToIgnore) and the spline needs to be smoothed.
   * Choose the point closest to the sharpest turn and adjust it.
   *
   * @param indicesToIgnore indices which should not be adjusted (perhaps because the user just released them)
   */
  public smoothPointOfHighestCurvature( indicesToIgnore: IntentionalAny[] ): boolean {

    // Find the sharpest turn on the track
    const highestCurvatureU = this.getUWithHighestCurvature();

    // find the point closest (in parametric coordinates) to the sharpest turn, but not including the indexToIgnore
    // it looks like the control points are equally spaced in parametric coordinates (see the constructor)
    let bestDistance = Number.POSITIVE_INFINITY;
    let bestIndex = -1;
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      if ( !indicesToIgnore.includes( i ) ) {
        const controlPointU = i / this.controlPoints.length;
        const distanceFromHighestCurvature = Math.abs( highestCurvatureU - controlPointU );
        if ( distanceFromHighestCurvature < bestDistance ) {
          bestDistance = distanceFromHighestCurvature;
          bestIndex = i;
        }
      }
    }

    // If smoothing succeeded, all is well, otherwise try smoothing based on another point, see #198
    const success = this.smooth( bestIndex );
    if ( success ) {
      return true;
    }
    else {
      indicesToIgnore.push( bestIndex );
      if ( indicesToIgnore.length === this.controlPoints.length ) {
        return false;
      }
      else {
        return this.smoothPointOfHighestCurvature( indicesToIgnore );
      }
    }
  }

  /**
   * Get the spline position at the point of highest curvature.
   */
  private getUWithHighestCurvature(): number {
    // Below implementation copied from getMinimumRadiusOfCurvature.  It is a CPU demanding task, so kept separate to
    // keep the other one fast. Should be kept in sync manually
    const curvature = { r: 0, x: 0, y: 0 };
    let minRadius = Number.POSITIVE_INFINITY;
    let bestU = 0;

    // Search the entire space of the spline.  Larger number of divisions was chosen to prevent large curvatures at a
    // single sampling point.
    const numDivisions = 400;
    const du = ( this.maxPoint - this.minPoint ) / numDivisions;
    for ( let parametricPosition = this.minPoint; parametricPosition < this.maxPoint; parametricPosition += du ) {
      this.getCurvature( parametricPosition, curvature );
      const r = Math.abs( curvature.r );
      if ( r < minRadius ) {
        minRadius = r;
        bestU = parametricPosition;
      }
    }
    return bestU;
  }

  /**
   * Find the minimum radius of curvature along the track, in meters
   *
   * @returns the minimum radius of curvature along the track, in meters.
   */
  public getMinimumRadiusOfCurvature(): number {
    const curvature = { r: 0, x: 0, y: 0 };
    let minRadius = Number.POSITIVE_INFINITY;

    // Search the entire space of the spline.  Larger number of divisions was chosen to prevent large curvatures at a
    // single sampling point.
    const numDivisions = 400;
    const du = ( this.maxPoint - this.minPoint ) / numDivisions;
    for ( let parametricPosition = this.minPoint; parametricPosition < this.maxPoint; parametricPosition += du ) {
      this.getCurvature( parametricPosition, curvature );
      const r = Math.abs( curvature.r );
      if ( r < minRadius ) {
        minRadius = r;
      }
    }
    return minRadius;
  }

  /**
   * Use an arbitrary position for translating the track during dragging. Only used for deltas in relative positioning
   * and translation, so an exact "position" is irrelevant.
   */
  public get position(): Vector2 {
    return this._position.copy();
  }

  /**
   * Set the position of this Track.
   */
  public set position( newPosition: Vector2 ) {
    const delta = newPosition.minus( this.position );
    this.translate( delta.x, delta.y );
  }

  /**
   * Get an array of all control point sourcePositions - this is the position of all ControlPoint's if none had
   * snapped to a position in attempt to combine with another track.
   */
  public copyControlPointSources(): Vector2[] {
    return this.controlPoints.map( controlPoint => controlPoint.sourcePositionProperty.value.copy() );
  }

  /**
   * Debugging info.
   */
  public getDebugString(): string {
    let string = 'var controlPoints = [';
    for ( let i = 0; i < this.controlPoints.length; i++ ) {
      const controlPoint = this.controlPoints[ i ];
      string += `new ControlPoint(${controlPoint.positionProperty.value.x},${controlPoint.positionProperty.value.y})`;
      if ( i < this.controlPoints.length - 1 ) {
        string += ',';
      }
    }
    return `${string}];`;
  }

  /**
   * Dispose all of the control points of the track when they will not be reused in another track
   */
  public disposeControlPoints(): void {
    this.controlPoints.forEach( controlPoint => this.model.controlPointGroup.disposeElement( controlPoint ) );
  }

  public static readonly FULLY_INTERACTIVE_OPTIONS = FULLY_INTERACTIVE_OPTIONS;
  public static readonly TrackIO = new IOType<Track, TrackState>( 'TrackIO', {
    valueType: Track,
    documentation: 'A skate track',
    stateObjectToCreateElementArguments: stateObject => {

      const controlPoints = stateObject.controlPoints.map( x => ReferenceIO( ControlPoint.ControlPointIO ).fromStateObject( x ) );

      return [ controlPoints, {
        draggable: stateObject.draggable,
        configurable: stateObject.configurable,
        splittable: stateObject.splittable,
        attachable: stateObject.attachable
      } ];
    },
    stateSchema: {
      controlPoints: ArrayIO( ReferenceIO( ControlPoint.ControlPointIO ) ),
      draggable: BooleanIO,
      configurable: BooleanIO,
      splittable: BooleanIO,
      attachable: BooleanIO
    }
  } );
}

energySkatePark.register( 'Track', Track );