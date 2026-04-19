// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard listener for endpoint control points that presents a transient ComboBox listing all available
 * snap targets, allowing the user to connect two tracks via keyboard.
 *
 * This is the Energy Skate Park implementation of the Transient ComboBox Pattern
 * (see AttachmentKeyboardListener in scenery-phet for full pattern documentation).
 *
 * When a user focuses a track endpoint and presses Space/Enter, a ComboBox lists available endpoints
 * from other tracks. Arrow keys browse targets with a dashed-circle highlight on the current target.
 * Enter confirms the join; Escape cancels. After a successful join, focus is restored to the nearest
 * control point on the newly merged track (since the original tracks are disposed during join).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import animationFrameTimer from '../../../../axon/js/animationFrameTimer.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AttachmentKeyboardListener from '../../../../scenery-phet/js/input/AttachmentKeyboardListener.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import ControlPoint from '../model/ControlPoint.js';
import AttachmentHighlightNode from './AttachmentHighlightNode.js';
import ControlPointNode from './ControlPointNode.js';
import TrackNode from './TrackNode.js';

export default class ControlPointAttachmentKeyboardListener extends AttachmentKeyboardListener<ControlPoint> {

  public constructor( controlPointNode: ControlPointNode, trackNode: TrackNode, controlPointIndex: number ) {

    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;
    const controlPoint = track.controlPoints[ controlPointIndex ];

    // Resolve the track layer (listParent) lazily since the TrackNode may not be in the scene graph
    // at construction time (e.g., when dragged from the toolbox).
    const getListParent = () => trackNode.parents[ 0 ];

    // Dashed-circle highlight that visually indicates the currently focused attachment target.
    // Created lazily on first use since listParent is not available at construction time.
    let highlightNode: AttachmentHighlightNode | null = null;

    const ensureHighlightNode = () => {
      if ( !highlightNode ) {
        highlightNode = new AttachmentHighlightNode();
        getListParent().addChild( highlightNode );
      }
      return highlightNode;
    };

    // Captured in applySelection (before joinTracks disposes the original trackNode) and used
    // in onSelectionApplied for focus restoration on the newly merged track.
    let trackLayerForFocusRestore: Node | null = null;

    super( {
      triggerNode: controlPointNode,
      listParent: getListParent,

      // Approximate layout bounds, only used for centering the offscreen ComboBox
      layoutBounds: new Bounds2( 0, 0, 800, 600 ),

      showHighlight: position => {
        const node = ensureHighlightNode();
        node.center = position;
        node.visible = true;
      },
      hideHighlight: () => {
        if ( highlightNode ) {
          highlightNode.visible = false;
        }
      },

      getItems: () => {

        // Collect available endpoint targets from other physical, attachable tracks
        const physicalTracks = model.getPhysicalTracks();
        const items = [];

        for ( let t = 0; t < physicalTracks.length; t++ ) {
          const otherTrack = physicalTracks[ t ];
          if ( otherTrack === track || !otherTrack.attachable ) {
            continue;
          }

          const trackNumber = 1 + model.tracks.indexOf( otherTrack );
          const firstCP = otherTrack.controlPoints[ 0 ];
          const lastCP = otherTrack.controlPoints[ otherTrack.controlPoints.length - 1 ];

          items.push( {
            value: firstCP as ControlPoint | null,
            createNode: () => new Text( `Track ${trackNumber} Left` )
          } );
          items.push( {
            value: lastCP as ControlPoint | null,
            createNode: () => new Text( `Track ${trackNumber} Right` )
          } );
        }

        return items;
      },

      getHighlightPosition: selectedTarget => selectedTarget
                                              ? modelViewTransform.modelToViewPosition( selectedTarget.positionProperty.value )
                                              : modelViewTransform.modelToViewPosition( controlPoint.positionProperty.value ),

      applySelection: ( selectedTarget, _targetPosition ) => {
        if ( selectedTarget ) {

          // Capture the track layer before joinTracks disposes the original trackNode and
          // removes it from its parent. We need this reference for focus restoration.
          trackLayerForFocusRestore = getListParent();

          // Set snap target and dragging flags, update splines, then join tracks
          controlPoint.snapTargetProperty.value = selectedTarget;
          controlPoint.draggingProperty.value = true;
          track.draggingProperty.value = true;
          track.updateSplines();
          trackNode.updateTrackShape();
          model.joinTracks( track );

          // The user completed a keyboard-driven connection, so the "Space to Choose Connection" cue
          // has served its purpose and can be permanently dismissed until ResetAll.
          if ( trackNode.anyControlPointAttachedProperty ) {
            trackNode.anyControlPointAttachedProperty.value = true;
          }
        }
      },

      onOpen: () => {
        controlPointNode.setKeyboardAttachmentSelected( true );
      },

      onCancel: () => {
        controlPointNode.setKeyboardAttachmentSelected( false );
      },

      // After join, the original tracks are disposed and a new merged track is created with copied
      // control points. Focus the ControlPointNode closest to the join position on the new track.
      restoreFocus: () => {

        // No-op here — focus restoration is handled in onSelectionApplied via runOnNextTick,
        // because joinTracks disposes the triggerNode and we need to wait for the new track to appear.
      },

      onSelectionApplied: selectedTarget => {
        if ( selectedTarget && trackLayerForFocusRestore ) {
          const targetViewPosition = modelViewTransform.modelToViewPosition(
            selectedTarget.positionProperty.value
          );

          // Wait one frame for the new merged track's ControlPointNodes to be created
          const trackLayer = trackLayerForFocusRestore;
          trackLayerForFocusRestore = null;
          animationFrameTimer.runOnNextTick( () => {
            ControlPointNode.focusNearestControlPoint( trackLayer, targetViewPosition );
          } );
        }
      },

      cancelEmitter: track.removeEmitter,
      noItemsContextResponse: EnergySkateParkFluent.a11y.controlPointAttachment.noConnectionsAvailableStringProperty
    } );
  }
}
