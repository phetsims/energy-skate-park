// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard drag listener for dragging individual control points on a track. Converts keyboard
 * arrow-key deltas into model-space positions and applies the same constraint, snap, and spline-update
 * logic as the pointer-based ControlPointNode drag listener.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import TrackNode from './TrackNode.js';

export default class ControlPointKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( trackNode: TrackNode, controlPointIndex: number, isEndPoint: boolean ) {

    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;
    const availableBoundsProperty = trackNode.availableBoundsProperty;
    const controlPoint = track.controlPoints[ controlPointIndex ];

    super( {
      start: () => {
        model.userControlledPropertySet.trackControlledProperty.set( true );
        trackNode.moveToFront();
        controlPoint.draggingProperty.value = true;
        track.draggingProperty.value = true;

        // When a control point moves, any additional heuristics to correct energy for premade tracks no longer apply
        track.slopeToGround = false;
      },
      drag: ( _event, listener ) => {

        // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
        if ( !model.containsTrack( track ) ) { return; }

        controlPoint.draggingProperty.value = true;
        track.draggingProperty.value = true;

        // listener.modelDelta is in view coordinates because no transform was provided.
        // Convert to model coordinates for position update.
        const modelDelta = modelViewTransform.viewToModelDelta( listener.modelDelta );

        let pt = controlPoint.sourcePositionProperty.value.plus( modelDelta );

        // Constrain the control points to remain in y>0, see #71
        pt.y = Math.max( pt.y, 0 );

        // Constrain the control point to the limited bounds, this should be more strict than
        // availableBoundsProperty so this is done first to avoid multiple checks
        const dragBounds = controlPoint.limitBounds || availableBoundsProperty.value;
        if ( dragBounds ) {
          pt = dragBounds.closestPointTo( pt );
        }

        controlPoint.sourcePositionProperty.value = pt;

        // Snap detection for endpoints
        if ( isEndPoint ) {
          const tracks = model.getPhysicalTracks();

          let bestDistance = Number.POSITIVE_INFINITY;
          let bestMatch = null;

          for ( let i = 0; i < tracks.length; i++ ) {
            const t = tracks[ i ];
            if ( t !== track ) {

              // don't match inner points
              const otherPoints = [ t.controlPoints[ 0 ], t.controlPoints[ t.controlPoints.length - 1 ] ];

              for ( let k = 0; k < otherPoints.length; k++ ) {
                const otherPoint = otherPoints[ k ];
                const distance = controlPoint.sourcePositionProperty.value.distance( otherPoint.positionProperty.value );

                if ( distance < bestDistance ) {
                  bestDistance = distance;
                  bestMatch = otherPoint;
                }
              }
            }
          }

          controlPoint.snapTargetProperty.value = ( bestDistance !== null && bestDistance < 1 ) ? bestMatch : null;
        }

        // When one control point dragged, update the track and the node shape
        track.updateSplines();
        trackNode.updateTrackShape();
        model.trackModified( track );
      },
      end: () => {

        // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
        if ( !model.containsTrack( track ) ) { return; }

        model.userControlledPropertySet.trackControlledProperty.set( false );

        if ( isEndPoint && controlPoint.snapTargetProperty.value ) {
          model.joinTracks( track );
        }
        else {
          track.smoothPointOfHighestCurvature( [ controlPointIndex ] );
          model.trackModified( track );
        }

        // The above steps can dispose a track. If so, do not try to modify the track further.
        if ( track.isDisposed ) { return; }

        track.bumpAboveGround();
        controlPoint.draggingProperty.value = false;
        track.draggingProperty.value = false;
      },
      dragSpeed: 300,
      shiftDragSpeed: 75,
      tandem: Tandem.OPT_OUT
    } );
  }
}

energySkatePark.register( 'ControlPointKeyboardDragListener', ControlPointKeyboardDragListener );
