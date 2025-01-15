// Copyright 2014-2025, University of Colorado Boulder

/**
 * The drag handler for moving the body of a track (not a control point).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListener, PressListenerDOMEvent, SceneryEvent } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import Track from '../model/Track.js';
import TrackNode from './TrackNode.js';

export default class TrackDragHandler extends DragListener {
  private readonly track: Track;
  private readonly model: EnergySkateParkModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly availableBoundsProperty: Property<Bounds2>;
  public readonly startOffset: Vector2 | null;

  /**
   * @param trackNode the track node that this listener will drag
   * @param tandem
   */
  public constructor( private readonly trackNode: TrackNode, tandem: Tandem ) {

    // Drag handler for dragging the track segment itself (not one of the control points)
    // Its bounds are determined by the shape of the track, so it cannot go below ground.
    // And so it can be dragged out of the toolbox but not back into it (so it won't be dragged below ground)
    super( {
      tandem: tandem.createTandem( 'dragListener' ),
      allowTouchSnag: true,

      start: event => this.handleDragStart( event ),
      drag: event => this.handleDrag( event ),

      // @ts-expect-error
      end: event => this.handleDragEnd( event )
    } );

    this.trackNode = trackNode;
    this.track = trackNode.track;
    this.model = trackNode.model;
    this.modelViewTransform = trackNode.modelViewTransform;
    this.availableBoundsProperty = trackNode.availableBoundsProperty;
    this.startOffset = null;
  }

  /**
   * Start of a drag interaction from an event. TODO: clean up overrideParentPoint usages? See https://github.com/phetsims/energy-skate-park/issues/385
   */
  public handleDragStart( event: SceneryEvent, overrideParentPoint: Vector2 | null = null ): void {

    // Move the track to the front when it starts dragging, see #296
    // The track is in a layer of tracks (without other nodes) so moving it to the front will work perfectly
    this.trackNode.moveToFront();

    this.calculateStartOffset( event, overrideParentPoint );
  }

  /**
   * Continuation of drag.
   */
  private handleDrag( event: SceneryEvent ): void {

    // @ts-expect-error
    this.trackDragged( event );
  }

  /**
   * End of a drag interaction.
   */
  private handleDragEnd( event: SceneryEvent ): void {
    this.trackDragEnded( event );
  }

  public trackDragged( event: SceneryEvent<PressListenerDOMEvent>, overrideParentPoint: Vector2 | null = null ): void {
    let snapTargetChanged = false;
    const model = this.model;
    const track = this.track;

    // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
    if ( !model.containsTrack( track ) ) { return; }

    track.draggingProperty.value = true;

    const myPt = overrideParentPoint || this.globalToParentPoint( event.pointer.point );
    // @ts-expect-error
    const parentPoint = myPt.minus( this.startOffset );
    const position = this.modelViewTransform.viewToModelPosition( parentPoint );

    // If the user moved it out of the toolbox above y=0, then make it physically interactive
    const bottomControlPointY = track.getBottomControlPointY();
    if ( !track.physicalProperty.value && bottomControlPointY > 0 ) {
      track.physicalProperty.value = true;
    }

    // When dragging track, make sure the control points don't go below ground, see #71
    const modelDelta = position.minus( track.position );
    const translatedBottomControlPointY = bottomControlPointY + modelDelta.y;

    if ( track.physicalProperty.value && translatedBottomControlPointY < 0 ) {
      position.y += Math.abs( translatedBottomControlPointY );
    }

    if ( this.availableBoundsProperty.value ) {

      // constrain each point to lie within the available bounds
      const availableBounds = this.availableBoundsProperty.value;

      // Constrain the top
      const topControlPointY = track.getTopControlPointY();
      if ( topControlPointY + modelDelta.y > availableBounds.maxY ) {
        position.y = availableBounds.maxY - ( topControlPointY - track.position.y );
      }

      // Constrain the left side
      const leftControlPointX = track.getLeftControlPointX();
      if ( leftControlPointX + modelDelta.x < availableBounds.minX ) {
        position.x = availableBounds.minX - ( leftControlPointX - track.position.x );
      }

      // Constrain the right side
      const rightControlPointX = track.getRightControlPointX();
      if ( rightControlPointX + modelDelta.x > availableBounds.maxX ) {
        position.x = availableBounds.maxX - ( rightControlPointX - track.position.x );
      }
    }

    track.position = position;

    // If one of the control points is close enough to link to another track, do so
    const tracks = model.getPhysicalTracks();

    let bestDistance = null;
    let myBestPoint = null;
    let otherBestPoint = null;

    const points = [ track.controlPoints[ 0 ], track.controlPoints[ track.controlPoints.length - 1 ] ];

    for ( let i = 0; i < tracks.length; i++ ) {
      const t = tracks[ i ];
      if ( t !== track ) {

        // 4 cases 00, 01, 10, 11
        const otherPoints = [ t.controlPoints[ 0 ], t.controlPoints[ t.controlPoints.length - 1 ] ];

        // don't match inner points
        for ( let j = 0; j < points.length; j++ ) {
          const point = points[ j ];
          for ( let k = 0; k < otherPoints.length; k++ ) {
            const otherPoint = otherPoints[ k ];
            const distance = point.sourcePositionProperty.value.distance( otherPoint.positionProperty.value );

            // @ts-expect-error
            if ( ( bestDistance === null && distance > 1E-6 ) || ( distance < bestDistance ) ) {
              bestDistance = distance;
              myBestPoint = point;
              otherBestPoint = otherPoint;
            }
          }
        }
      }
    }

    if ( bestDistance !== null && bestDistance < 1 ) {

      // @ts-expect-error
      if ( myBestPoint.snapTargetProperty.value !== otherBestPoint ) {
        snapTargetChanged = true;
      }

      // @ts-expect-error
      myBestPoint.snapTargetProperty.value = otherBestPoint;

      // Set the opposite point to be unsnapped, you can only snap one at a time
      const source = ( myBestPoint === points[ 0 ] ? points[ 1 ] : points[ 0 ] );
      if ( source.snapTargetProperty.value !== null ) {
        snapTargetChanged = true;
      }
      source.snapTargetProperty.value = null;
    }
    else {

      if ( points[ 0 ].snapTargetProperty.value !== null || points[ 1 ].snapTargetProperty.value !== null ) {
        snapTargetChanged = true;
      }
      points[ 0 ].snapTargetProperty.value = null;
      points[ 1 ].snapTargetProperty.value = null;
    }

    // It costs about 5fps to do this every frame (on iPad3), so only check if the snapTargets have changed.  See #235
    if ( snapTargetChanged ) {
      track.updateSplines();
      this.trackNode.updateTrackShape();
    }

    // Make it so the track can't be dragged underground when dragged by the track itself (not control point), see #166
    // But if the user is dragging the track out of the toolbox, then leave the motion continuous, see #178
    if ( track.physicalProperty.value ) {
      track.bumpAboveGround();
    }

    model.trackModified( track );
  }

  public trackDragEnded( event: SceneryEvent ): void {
    const track = this.track;
    const model = this.model;

    // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
    if ( !model.containsTrack( track ) ) { return; }

    // track was released underground and was never added to the play area, so remove it
    if ( !this.isPressed && !track.physicalProperty.get() ) {
      model.removeAndDisposeTrack( track );
    }

    // If the user never dragged the object, then there is no track to drop in this case, see #205
    const myPoints = [ track.controlPoints[ 0 ], track.controlPoints[ track.controlPoints.length - 1 ] ];
    if ( myPoints[ 0 ].snapTargetProperty.value || myPoints[ 1 ].snapTargetProperty.value ) {
      model.joinTracks( track ); // Track will be joined to compatible track, then both will be disposed, and new track created.
    }

    // If the track hasn't been disposed (see #393), bump it above ground and make it physical if user has started
    // dragging, see #384 and #205
    if ( !track.isDisposed && track.controlPoints.filter( point => {return !point.isDisposed;} ).length !== 0 ) {
      track.bumpAboveGround();
      track.physicalProperty.value = true; // for interactivity, but also for #414
      track.draggingProperty.value = false; // signify that the track shape can be smoothed again
    }

    if ( EnergySkateParkQueryParameters.testTrackIndex > 0 ) {
      console.log( track.getDebugString() );
    }
  }

  /**
   * Determine the offset point at the start of a drag so that the track translates with the mouse without jumping.
   */
  private calculateStartOffset( event: SceneryEvent, overrideParentPoint: Vector2 | null = null ): void {
    const startingPosition = this.modelViewTransform.modelToViewPosition( this.track.position );

    const pt = overrideParentPoint || event.currentTarget!.globalToParentPoint( event.pointer.point );

    // @ts-expect-error
    this.startOffset = pt.minus( startingPosition );
  }
}

energySkatePark.register( 'TrackDragHandler', TrackDragHandler );