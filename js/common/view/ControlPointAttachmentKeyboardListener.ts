// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard listener for endpoint control points that presents a ComboBox listing all available snap targets,
 * allowing the user to connect two tracks via keyboard. Adapted from CCK's AttachmentKeyboardListener pattern
 * but self-contained for Energy Skate Park.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import animationFrameTimer from '../../../../axon/js/animationFrameTimer.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { pdomFocusProperty } from '../../../../scenery/js/accessibility/pdomFocusProperty.js';
import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxListItemNode from '../../../../sun/js/ComboBoxListItemNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import ControlPoint from '../model/ControlPoint.js';
import AttachmentHighlightNode from './AttachmentHighlightNode.js';
import ControlPointNode from './ControlPointNode.js';
import TrackNode from './TrackNode.js';

export default class ControlPointAttachmentKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  // Store the last successful connection highlight position for matching on next open
  private lastConnectionHighlightPosition: Vector2 | null = null;

  public constructor( controlPointNode: ControlPointNode, trackNode: TrackNode, controlPointIndex: number ) {

    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;
    const controlPoint = track.controlPoints[ controlPointIndex ];

    super( {
      keys: [ 'space', 'enter' ],

      fire: () => {

        // Only proceed if this track is still in the model
        if ( !model.containsTrack( track ) ) { return; }

        // Collect available endpoint targets from other physical, attachable tracks
        const items: { value: ControlPoint; label: string }[] = [];
        const physicalTracks = model.getPhysicalTracks();

        for ( let t = 0; t < physicalTracks.length; t++ ) {
          const otherTrack = physicalTracks[ t ];
          if ( otherTrack === track || !otherTrack.attachable ) {
            continue;
          }

          const trackNumber = 1 + model.tracks.indexOf( otherTrack );
          const firstCP = otherTrack.controlPoints[ 0 ];
          const lastCP = otherTrack.controlPoints[ otherTrack.controlPoints.length - 1 ];

          items.push( {
            value: firstCP,
            label: `Track ${trackNumber} Left`
          } );
          items.push( {
            value: lastCP,
            label: `Track ${trackNumber} Right`
          } );
        }

        if ( items.length === 0 ) {
          return;
        }

        // Determine initial selection — prefer last highlight position match, otherwise first item
        let initialSelection = items[ 0 ].value;
        if ( this.lastConnectionHighlightPosition ) {
          for ( const item of items ) {
            const itemViewPos = modelViewTransform.modelToViewPosition( item.value.positionProperty.value );
            if ( this.lastConnectionHighlightPosition.equalsEpsilon( itemViewPos, 1 ) ) {
              initialSelection = item.value;
              break;
            }
          }
        }

        const selectionProperty = new Property<ControlPoint>( initialSelection );

        // Build ComboBox items
        const comboBoxItems = items.map( item => ( {
          value: item.value,
          createNode: () => new Text( item.label ),
          accessibleName: item.label
        } ) );

        // Use the trackNode's parent (the track layer) as the listParent for the ComboBox
        const listParent = trackNode.parents[ 0 ];
        if ( !listParent ) { return; }

        const comboBox = new ComboBox( selectionProperty, comboBoxItems, listParent, {
          opacity: 0.8,
          tandem: Tandem.OPT_OUT
        } );

        // Make button non-focusable to avoid re-entrant focus issues (CCK pattern)
        comboBox.button.focusable = false;

        // Clear out ariaLabelledby associations to avoid duplicate reading
        comboBox.listBox.ariaLabelledbyAssociations = [];

        // Create highlight node
        const highlightNode = new AttachmentHighlightNode();
        listParent.addChild( highlightNode );

        const showHighlight = ( target: ControlPoint ) => {
          const viewPos = modelViewTransform.modelToViewPosition( target.positionProperty.value );
          highlightNode.center = viewPos;
          highlightNode.visible = true;
        };

        const hideHighlight = () => {
          highlightNode.visible = false;
        };

        // Safe dispose helper
        const cleanComboBoxDispose = () => {
          if ( !comboBox.isDisposed ) {
            comboBox.dispose();
          }
        };

        const cleanUp = () => {
          hideHighlight();
          if ( highlightNode.parents.length > 0 ) {
            listParent.removeChild( highlightNode );
          }
        };

        let cancelled = false;

        // When the list box closes (selection confirmed)
        comboBox.listBox.visibleProperty.lazyLink( visible => {
          if ( cancelled ) {
            return;
          }

          if ( !visible ) {
            const selectedTarget = selectionProperty.value;

            // Store highlight position for next time
            this.lastConnectionHighlightPosition = modelViewTransform.modelToViewPosition(
              selectedTarget.positionProperty.value
            ).copy();

            // Save snap target position before joinTracks disposes the original control points
            const targetPosition = selectedTarget.positionProperty.value.copy();

            // Apply the connection: set snap target, dragging flags, update splines, join tracks
            controlPoint.snapTargetProperty.value = selectedTarget;
            controlPoint.draggingProperty.value = true;
            track.draggingProperty.value = true;
            track.updateSplines();
            trackNode.updateTrackShape();
            model.joinTracks( track );

            cleanUp();

            // Focus restoration: after join, original tracks are disposed and a new merged track is
            // created with copied control points. Focus the ControlPointNode closest to the join position.
            animationFrameTimer.runOnNextTick( () => {
              cleanComboBoxDispose();

              const targetViewPosition = modelViewTransform.modelToViewPosition( targetPosition );
              let bestNode: ControlPointNode | null = null;
              let bestDist = Number.POSITIVE_INFINITY;
              for ( const child of listParent.children ) {
                if ( child instanceof TrackNode && !child.isDisposed ) {
                  for ( const grandchild of child.children ) {
                    if ( grandchild instanceof ControlPointNode && grandchild.focusable ) {
                      const dist = grandchild.translation.distance( targetViewPosition );
                      if ( dist < bestDist ) {
                        bestDist = dist;
                        bestNode = grandchild;
                      }
                    }
                  }
                }
              }
              if ( bestNode ) {
                bestNode.focus();
              }
            } );
          }
        } );

        // Show highlight when selection changes
        selectionProperty.link( selection => {
          showHighlight( selection );
        } );

        // Position ComboBox offscreen (or on-screen in ?dev mode)
        comboBox.centerX = 400; // approximate center
        comboBox.top = phet.chipper.queryParameters.dev ? 5 : 4005;

        listParent.addChild( comboBox );

        comboBox.showListBox();
        comboBox.focusListItemNode( initialSelection );

        // Handle cancel (Escape or clicking away)
        comboBox.cancelEmitter.addListener( () => {
          cancelled = true;
          cleanUp();

          animationFrameTimer.runOnNextTick( () => {
            cleanComboBoxDispose();
            controlPointNode.focus();
          } );
        } );

        // If the track is disposed while the combo box is open, cancel
        const disposeListener = () => {
          cancelled = true;
          cleanUp();

          animationFrameTimer.runOnNextTick( () => {
            cleanComboBoxDispose();
          } );
        };
        track.removeEmitter.addListener( disposeListener );
        comboBox.disposeEmitter.addListener( () => {
          if ( track.removeEmitter.hasListener( disposeListener ) ) {
            track.removeEmitter.removeListener( disposeListener );
          }
        } );

        // Track focus changes in PDOM to update selection and highlight
        pdomFocusProperty.link( focus => {
          const node = focus?.trail?.lastNode();
          if ( node && node instanceof ComboBoxListItemNode ) {
            const value = node.item.value as ControlPoint;
            selectionProperty.value = value;
          }
        }, {
          disposer: comboBox
        } );
      }
    } );
  }
}

energySkatePark.register( 'ControlPointAttachmentKeyboardListener', ControlPointAttachmentKeyboardListener );
