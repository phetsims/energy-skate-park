// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node for the track, which can be translated by dragging the track, or manipulated by dragging its control points.
 * If the track's length is changed (by deleting a control point or linking two tracks together) a new TrackNode is created.
 * Keep track of whether the track is dragging, so performance can be optimized while dragging
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import LineStyles from '../../../../kite/js/util/LineStyles.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import Track from '../model/Track.js';
import SplineEvaluation from '../SplineEvaluation.js';
import ControlPointNode from './ControlPointNode.js';
import TrackDragHandler from './TrackDragHandler.js';

// constants
export default class TrackNode extends Node {
  private readonly isIcon: boolean;
  public readonly model: EnergySkateParkModel;
  private readonly road: Path;
  private readonly centerLine: Path;

  // Reuse arrays to save allocations and prevent garbage collections, see #38
  private readonly xArray: Float64Array<ArrayBuffer>;
  private readonly yArray: Float64Array<ArrayBuffer>;

  // Store for performance
  private lastPoint: number;
  private lengthForLinSpace: number;

  // public so that ControlPointNodes so that dragging a control point can initiate
  // dragging a track and dragging from toolbox can forward input to this listener
  private readonly trackDragHandler: TrackDragHandler | null;
  private readonly disposeTrackNode: () => void;
  private linSpace: number[];

  /**
   * @param track the track for this track node
   * @param modelViewTransform the model view transform for the view
   * @param availableBoundsProperty
   * @param tandem
   * @param [options]
   */
  public constructor(
    public readonly track: Track,
    public readonly modelViewTransform: ModelViewTransform2,
    public readonly availableBoundsProperty: Property<Bounds2>,
    tandem: Tandem,
    options?: IntentionalAny
  ) {
    const model = track.model;

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {null|string} - cursor for the Track road - by default it is a 'pointer' if only draggable, but for some icons
      //  we want a pointer even when not draggable (like in the toolbox).
      roadCursorOverride: null,

      // {boolean} - whether or not this TrackNode is being used as an icon - if so, its
      // representation is a little different, mostly it has no visible control points
      // and its road path is a bit thicker to be more visible since the track will likley
      // be smaller
      isIcon: false,

      tandem: tandem,
      visiblePropertyOptions: { phetioState: false }
    }, options );

    super( options );

    this.model = model;
    this.isIcon = options.isIcon;

    this.road = new Path( null, {
      fill: 'gray',
      cursor: options.roadCursorOverride || track.draggable ? 'pointer' : 'default'
    } );
    this.centerLine = new Path( null, {
      stroke: 'black',
      lineWidth: 1.2,
      lineDash: [ 11, 8 ]
    } );

    this.children = [ this.road, this.centerLine ];

    // must be unlinked in dispose
    const stickingToTrackListener = ( sticking: boolean ) => {
      this.centerLine.lineDash = sticking ? [ 11, 8 ] : [];
    };
    model.stickingToTrackProperty.link( stickingToTrackListener );

    this.xArray = new Float64Array( track.controlPoints.length );
    this.yArray = new Float64Array( track.controlPoints.length );

    this.lastPoint = ( track.controlPoints.length - 1 ) / track.controlPoints.length;

    // Sample space, which is recomputed if the track gets longer, to keep it looking smooth no matter how many control points
    // @ts-expect-error
    this.linSpace = numeric.linspace( 0, this.lastPoint, 20 * ( track.controlPoints.length - 1 ) );
    this.lengthForLinSpace = track.controlPoints.length;

    this.trackDragHandler = null;
    if ( track.draggable ) {
      this.trackDragHandler = new TrackDragHandler( this, tandem.createTandem( 'trackDragHandler' ) );
      this.road.addInputListener( this.trackDragHandler );
    }

    // only "configurable" tracks have draggable control points, and individual control points may have dragging
    // disabled - also, "icon" TrackNodes do not display ControlPoints
    if ( track.configurable && !options.isIcon ) {
      for ( let i = 0; i < track.controlPoints.length; i++ ) {
        const controlPoint = track.controlPoints[ i ];

        if ( controlPoint.visible ) {
          const isEndPoint = i === 0 || i === track.controlPoints.length - 1;
          const controlPointNode = new ControlPointNode( this, this.trackDragHandler, i, isEndPoint, tandem.createTandem( `controlPointNode${i}` ) );
          this.addChild( controlPointNode );

          if ( controlPoint.limitBounds ) {
            affirm( controlPointNode.boundsRectangle, 'bounds are limited but there is no bounding Rectangle' );
            this.addChild( controlPointNode.boundsRectangle );
          }
        }
      }
    }

    // Init the track shape
    this.updateTrackShape();

    // Update the track shape when the whole track is translated
    // Just observing the control points individually would lead to N expensive callbacks (instead of 1) for each of the N points
    // So we use this broadcast mechanism instead
    track.translatedEmitter.addListener( this.updateTrackShape.bind( this ) );

    track.draggingProperty.link( dragging => {
      if ( !dragging ) {
        this.updateTrackShape();
      }
    } );

    track.resetEmitter.addListener( this.updateTrackShape.bind( this ) );
    track.smoothedEmitter.addListener( this.updateTrackShape.bind( this ) );
    track.updateEmitter.addListener( this.updateTrackShape.bind( this ) );

    // track was pulled from the tool box, start drag event to the drag listener
    // @ts-expect-error
    track.forwardingDragStartEmitter.addListener( event => {
      this.trackDragHandler!.press( event );
    } );

    // In the state wrapper, when the state changes, we must update the skater node
    const stateListener = () => {
      this.updateTrackShape();
    };
    phetioStateSetEmitter.addListener( stateListener );

    this.disposeTrackNode = () => {
      model.stickingToTrackProperty.unlink( stickingToTrackListener );
      phetioStateSetEmitter.removeListener( stateListener );
      for ( let i = 0; i < this.children.length; i++ ) {
        const child = this.children[ i ];
        if ( child instanceof ControlPointNode ) {
          child.dispose();
          i--; // Child is removed, we must decrement index so wo don't miss the next child
        }
      }

      if ( track.draggable ) {
        this.trackDragHandler!.dispose();
      }
    };
  }

  /**
   * Make eligible for garbage collection.
   */
  public override dispose(): void {
    this.disposeTrackNode();
    super.dispose();
  }

  /**
   * When a control point has moved, or the track has moved, or the track has been reset, or on initialization
   * update the shape of the track.
   */
  public updateTrackShape(): void {

    const track = this.track;
    const model = this.model;

    let i;
    // Update the sample range when the number of control points has changed
    if ( this.lengthForLinSpace !== track.controlPoints.length ) {
      this.lastPoint = ( track.controlPoints.length - 1 ) / track.controlPoints.length;

      // @ts-expect-error
      this.linSpace = numeric.linspace( 0, this.lastPoint, 20 * ( track.controlPoints.length - 1 ) );
      this.lengthForLinSpace = track.controlPoints.length;
    }

    // Arrays are fixed length, so just overwrite values
    for ( i = 0; i < track.controlPoints.length; i++ ) {
      this.xArray[ i ] = track.controlPoints[ i ].positionProperty.value.x;
      this.yArray[ i ] = track.controlPoints[ i ].positionProperty.value.y;
    }

    // Compute points for lineTo
    const xPoints = SplineEvaluation.atArray( track.xSpline!, this.linSpace );
    const yPoints = SplineEvaluation.atArray( track.ySpline!, this.linSpace );

    const shape = new Shape().moveTo(
      this.modelViewTransform.modelToViewX( xPoints[ 0 ] ),
      this.modelViewTransform.modelToViewY( yPoints[ 0 ] )
    );

    // Show the track at reduced resolution while dragging so it will be smooth and responsive while dragging
    // (whether updating the entire track, some of the control points or both)
    const delta = track.draggingProperty.value ? 3 : 1;
    for ( i = 1; i < xPoints.length; i = i + delta ) {
      shape.lineTo( this.modelViewTransform.modelToViewX( xPoints[ i ] ), this.modelViewTransform.modelToViewY( yPoints[ i ] ) );
    }

    // If at reduced resolution, still make sure we draw to the end point
    if ( i !== xPoints.length - 1 ) {
      i = xPoints.length - 1;
      shape.lineTo( this.modelViewTransform.modelToViewX( xPoints[ i ] ), this.modelViewTransform.modelToViewY( yPoints[ i ] ) );
    }

    const strokeStyles = new LineStyles( {
      lineWidth: this.isIcon ? 30 : 12,
      lineCap: 'butt',
      lineJoin: 'miter',
      miterLimit: 10
    } );
    this.road.shape = shape.getStrokedShape( strokeStyles );
    this.centerLine.shape = shape;

    // Update the skater if the track is moved while the sim is paused, see #84
    if ( model.skater.trackProperty.value === track && model.pausedProperty.value ) {
      model.skater.positionProperty.value = track.getPoint( model.skater.parametricPositionProperty.value );
      model.skater.angleProperty.value = model.skater.trackProperty.value.getViewAngleAt( model.skater.parametricPositionProperty.value ) + ( model.skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );
      model.skater.updatedEmitter.emit();
    }
  }
}

energySkatePark.register( 'TrackNode', TrackNode );