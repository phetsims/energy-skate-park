// Copyright 2014-2026, University of Colorado Boulder

/**
 * The scenery node that shows a control point on a track, and allows the user to drag it or click on it for more
 * options.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm, { isAffirmEnabled } from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import BoundaryReachedSoundPlayer from '../../../../tambo/js/BoundaryReachedSoundPlayer.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';
import ControlPoint from '../model/ControlPoint.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import Track from '../model/Track.js';
import ControlPointAttachmentKeyboardListener from './ControlPointAttachmentKeyboardListener.js';
import ControlPointDeleteKeyboardListener from './ControlPointDeleteKeyboardListener.js';
import ControlPointKeyboardDragListener from './ControlPointKeyboardDragListener.js';
import ControlPointUI from './ControlPointUI.js';
import TrackDragHandler from './TrackDragHandler.js';
import TrackNode from './TrackNode.js';

export default class ControlPointNode extends InteractiveHighlighting( Circle ) {

  public static readonly SPLIT_VERTEX_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'alt+x' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.cutTrackAtControlPointStringProperty
  } );

  // HotkeyData for deleting a control point from a track
  public static readonly DELETE_CONTROL_POINT_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'delete', 'backspace' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.deleteControlPointStringProperty
  } );

  public readonly boundsRectangle: Rectangle | null;

  /**
   * @param trackNode
   * @param trackDragHandler - so dragging a ControlPointNode can initiate dragging a track
   * @param i
   * @param isEndPoint
   * @param tandem
   * @param omitA11y - whether to omit the description from the track inside the toolbox
   */
  public constructor( trackNode: TrackNode, trackDragHandler: TrackDragHandler | null, i: number, isEndPoint: boolean, tandem: Tandem, omitA11y: boolean ) {
    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;
    const availableBoundsProperty = trackNode.availableBoundsProperty;
    const controlPointUIShownEmitter = new Emitter();

    const controlPoint = track.controlPoints[ i ];
    const visibleIndex = track.controlPoints.slice( 0, i + 1 ).filter( point => point.visible ).length;

    // Default colors for the control point fill and highlight
    const fill = 'red';
    const highlightedFill = '#c90606';

    // When mousing over the control point, highlight it like a button, to hint that it can be pressed to show the
    // cut/delete buttons, see #234
    const opacity = 0.7;
    const highlightedOpacity = 0.85;

    const accessibleNameProperty = omitA11y ? null : EnergySkateParkFluent.a11y.controlPointNode.accessibleName.createProperty( {
      index: visibleIndex
    } );

    super( 17, combineOptions<CircleOptions>( {}, {
      pickable: true,
      opacity: opacity,
      stroke: 'black',
      lineWidth: 2,
      fill: fill,
      cursor: 'pointer',
      translation: modelViewTransform.modelToViewPosition( controlPoint.positionProperty.value ),
      tandem: tandem,
      visiblePropertyOptions: { phetioState: false },
      accessibleName: accessibleNameProperty ?? undefined
    }, omitA11y ? undefined : AccessibleDraggableOptions ) );

    if ( accessibleNameProperty ) {
      this.addDisposable( accessibleNameProperty );
    }

    // Disable interactive highlighting for non-interactive control points or toolbox icons
    if ( omitA11y || !controlPoint.interactive ) {
      this.interactiveHighlightEnabled = false;
    }

    // Control points should only be focusable when the track is physical (in the play area).
    // When the track is in the toolbox, only the entire TrackNode should be focusable.
    const physicalListener = ( isPhysical: boolean ) => {
      this.focusable = isPhysical;
      this.interactiveHighlightEnabled = isPhysical && !omitA11y && controlPoint.interactive;
    };
    track.physicalProperty.link( physicalListener );
    this.addDisposable( { dispose: () => track.physicalProperty.unlink( physicalListener ) } );

    // Show a dotted line for the exterior track points, which can be connected to other track
    if ( track.attachable ) {
      if ( i === 0 || i === track.controlPoints.length - 1 ) {
        this.lineDash = [ 4, 5 ];
      }
    }

    this.boundsRectangle = null;
    if ( controlPoint.limitBounds ) {

      this.boundsRectangle = new Rectangle( modelViewTransform.modelToViewBounds( controlPoint.limitBounds ), 3, 3, {
        stroke: 'black',
        lineDash: [ 4, 5 ]
      } );

      const boundsVisibilityListener = ( dragging: boolean ) => {
        this.boundsRectangle!.visible = EnergySkateParkQueryParameters.showPointBounds || dragging;
      };
      controlPoint.draggingProperty.link( boundsVisibilityListener );
      this.addDisposable( { dispose: () => controlPoint.draggingProperty.unlink( boundsVisibilityListener ) } );
    }

    const positionListener = ( position: Vector2 ) => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    };
    controlPoint.positionProperty.link( positionListener );
    this.addDisposable( { dispose: () => controlPoint.positionProperty.unlink( positionListener ) } );

    // if the ControlPoint is 'interactive' it supports dragging and potentially track splitting
    let dragListener: SoundDragListener | null = null; // potential reference for disposal
    let boundaryReachedSoundPlayer: BoundaryReachedSoundPlayer | null = null;
    if ( controlPoint.interactive ) {
      boundaryReachedSoundPlayer = new BoundaryReachedSoundPlayer();
      let dragEvents = 0;
      let lastControlPointUI: ControlPointUI | null = null;
      let lastRemovalListener: ( () => void ) | null = null;

      // Detach the current removalListener from both emitters. Called before replacing the UI,
      // inside removalListener itself after it fires, and on ControlPointNode disposal.
      const detachRemovalListener = () => {
        if ( lastRemovalListener ) {
          track.removeEmitter.removeListener( lastRemovalListener );
          track.translatedEmitter.removeListener( lastRemovalListener );
          lastRemovalListener = null;
        }
      };
      dragListener = new SoundDragListener( {
        tandem: tandem.createTandem( 'dragListener' ),
        allowTouchSnag: true,
        start: event => {

          model.userControlledPropertySet.trackControlledProperty.set( true );

          // Move the track to the front when it starts dragging, see #296
          // The track is in a layer of tracks (without other nodes) so moving it to the front will work perfectly
          trackNode.moveToFront();

          // If control point dragged out of the control panel, translate the entire track, see #130
          if ( !track.physicalProperty.value ) {

            // save drag handler so we can end the drag if we need to after forwarding
            if ( track.dragSource === null ) {
              track.dragSource = dragListener;
            }
            return;
          }
          controlPoint.draggingProperty.value = true;
          track.draggingProperty.value = true;
          dragEvents = 0;

          // when a control point moves, any additional heuristics to correct energy for premade tracks no longer apply
          track.slopeToGround = false;
        },
        drag: event => {

          // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
          if ( !model.containsTrack( track ) ) { return; }

          // If control point dragged out of the control panel, translate the entire track, see #130
          if ( !track.physicalProperty.value ) {

            // Only drag a track if nothing else was dragging the track (which caused a flicker), see #282
            if ( track.dragSource === dragListener ) {

              if ( trackDragHandler ) {
                if ( trackDragHandler.startOffset === null ) {
                  trackDragHandler.handleDragStart( event, this.globalToParentPoint( event.pointer.point ) );
                }

                trackDragHandler.trackDragged( event, this.globalToParentPoint( event.pointer.point ) );
              }

            }
            return;
          }
          dragEvents++;
          controlPoint.draggingProperty.value = true;
          track.draggingProperty.value = true;
          const globalPoint = this.globalToParentPoint( event.pointer.point );

          // trigger reconstruction of the track shape based on the control points
          let pt = modelViewTransform.viewToModelPosition( globalPoint );
          const proposedX = pt.x;
          const proposedY = pt.y;

          // Constrain the control points to remain in y>0, see #71
          pt.y = Math.max( pt.y, 0 );

          // Constrain the control point to the limited bounds, this should be more more strict than
          // availableBoundsProperty so this is done first to avoid multiple checks
          const dragBounds = controlPoint.limitBounds || availableBoundsProperty.value;
          if ( dragBounds ) {
            pt = dragBounds.closestPointTo( pt );
          }

          boundaryReachedSoundPlayer!.setOnBoundary( pt.x !== proposedX || pt.y !== proposedY );

          if ( isAffirmEnabled() && availableBoundsProperty.value ) {
            affirm( availableBoundsProperty.value.containsPoint( pt ), 'point should be in sim bounds, are your limiting bounds correct?' );
          }

          controlPoint.sourcePositionProperty.value = pt;

          if ( isEndPoint ) {
            controlPoint.snapTargetProperty.value = ControlPointNode.findSnapTarget( controlPoint, track, model );
          }

          // When one control point dragged, update the track and the node shape
          track.updateSplines();
          trackNode.updateTrackShape();
          model.trackModified( track );
        },
        end: event => {

          // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
          if ( !model.containsTrack( track ) ) { return; }

          model.userControlledPropertySet.trackControlledProperty.set( false );

          // If control point dragged out of the control panel, translate the entire track, see #130
          if ( !track.physicalProperty.value ) {

            // Only drop a track if nothing else was dragging the track (which caused a flicker), see #282
            if ( track.dragSource === dragListener ) {

              trackDragHandler && trackDragHandler.trackDragEnded();
            }
            return;
          }
          if ( isEndPoint && controlPoint.snapTargetProperty.value ) {
            model.joinTracks( track );
          }
          else {
            track.smoothPointOfHighestCurvature( [ i ] );
            model.trackModified( track );
          }

          // The above steps can dispose a track.  If so, do not try to modify the track further, see https://github.com/phetsims/energy-skate-park-basics/issues/396
          if ( track.isDisposed ) { return; }

          track.bumpAboveGround();
          controlPoint.draggingProperty.value = false;
          track.draggingProperty.value = false;

          // Show the 'control point editing' ui, but only if the user didn't drag the control point.
          // Threshold at a few drag events in case the user didn't mean to drag it but accidentally moved it a few pixels.
          // Make sure the track hasn't recently detached (was seen twice in ?fuzz&fuzzRate=100 testing)
          if ( track.splittable ) {
            if ( dragEvents <= 3 && trackNode.parents.length > 0 ) {
              controlPointUIShownEmitter.emit();

              detachRemovalListener();
              lastControlPointUI && lastControlPointUI.dispose();

              lastControlPointUI = new ControlPointUI(
                model,
                track,
                i,
                modelViewTransform,
                trackNode.parents[ 0 ],
                tandem.createTandem( 'controlPointUI' )
              );

              // If the track was removed or translated, dispose the buttons and self-detach.
              const removalListener = () => {
                lastControlPointUI && lastControlPointUI.dispose();
                lastControlPointUI = null;
                detachRemovalListener();
              };
              lastRemovalListener = removalListener;
              track.removeEmitter.addListener( removalListener );

              // If the track has translated, hide the buttons, see #272
              track.translatedEmitter.addListener( removalListener );

              trackNode.parents[ 0 ].addChild( lastControlPointUI );
            }

          }

          if ( EnergySkateParkQueryParameters.testTrackIndex > 0 ) {
            console.log( track.getDebugString() );
          }
        }
      } );

      this.addInputListener( dragListener );
      this.addDisposable( dragListener );

      const overOutListener = {
        over: () => {
          if ( track.physicalProperty.value && !track.draggingProperty.value ) {
            this.opacity = highlightedOpacity;
            this.fill = highlightedFill;
          }
        },

        out: () => {
          this.opacity = opacity;
          this.fill = fill;
        }
      };

      this.addInputListener( overOutListener );
      this.addDisposable( { dispose: () => this.removeInputListener( overOutListener ) } );

      // Even when omitA11y is true, the track is still draggable out of the toolbox, so it still needs its listeners.
      const controlPointKeyboardDragListener = new ControlPointKeyboardDragListener( trackNode, i, isEndPoint, boundaryReachedSoundPlayer, this );
      this.addInputListener( controlPointKeyboardDragListener );
      this.addDisposable( controlPointKeyboardDragListener );

      // Add discrete attachment listener for endpoint control points on attachable tracks
      if ( isEndPoint && track.attachable ) {
        const attachmentListener = new ControlPointAttachmentKeyboardListener( this, trackNode, i );
        this.addInputListener( attachmentListener );
        this.addDisposable( attachmentListener );
      }

      // Delete/backspace removes the control point, same as the "x" button in ControlPointUI
      if ( track.splittable ) {
        const deleteListener = new ControlPointDeleteKeyboardListener( trackNode, i );
        this.addInputListener( deleteListener );
        this.addDisposable( deleteListener );

        // Alt+X splits the vertex, same as the scissors button in ControlPointUI.
        // Only available for interior control points when there is room for more tracks.
        if ( !isEndPoint ) {
          const splitListener = new KeyboardListener( {
            keyStringProperties: ControlPointNode.SPLIT_VERTEX_HOTKEY_DATA.keyStringProperties,
            fire: () => {
              if ( track.physicalProperty.value && !track.isDisposed && model.canCutTrackControlPoint() ) {
                const alpha = new LinearFunction( 0, track.controlPoints.length - 1, track.minPoint, track.maxPoint ).evaluate( i );
                const modelAngle = track.getModelAngleAt( alpha );
                model.splitControlPoint( track, i, modelAngle );
              }
            }
          } );
          this.addInputListener( splitListener );
          this.addDisposable( splitListener );
        }
      }

      // When this ControlPointNode is disposed, clean up any open ControlPointUI and its emitter listeners
      this.addDisposable( {
        dispose: () => {
          detachRemovalListener();
          if ( lastControlPointUI ) {
            lastControlPointUI.dispose();
            lastControlPointUI = null;
          }
        }
      } );
    }

    this.touchArea = Shape.circle( 0, 0, 25 );
  }

  /**
   * Find the nearest snap target for an endpoint control point by checking endpoints of all other physical tracks.
   * Returns null if no target is within the snap threshold distance of 1 model unit.
   */
  public static findSnapTarget( controlPoint: ControlPoint, track: Track, model: EnergySkateParkModel ): ControlPoint | null {
    const tracks = model.getPhysicalTracks();

    let bestDistance = Number.POSITIVE_INFINITY;
    let bestMatch: ControlPoint | null = null;

    for ( let i = 0; i < tracks.length; i++ ) {
      const t = tracks[ i ];
      if ( t !== track ) {

        // Only match endpoints, not inner points
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

    return ( bestDistance < 1 ) ? bestMatch : null;
  }

  /**
   * After a track join, focus the ControlPointNode closest to the given view position. Used by both
   * ControlPointKeyboardDragListener and ControlPointAttachmentKeyboardListener after joining tracks.
   */
  public static focusNearestControlPoint( trackLayer: Node, targetViewPosition: Vector2 ): void {
    let bestNode: Node | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    for ( const child of trackLayer.children ) {
      if ( child instanceof TrackNode && !child.isDisposed ) {
        for ( const grandchild of child.children ) {
          if ( grandchild instanceof ControlPointNode && grandchild.focusable ) {
            const distance = grandchild.translation.distance( targetViewPosition );
            if ( distance < bestDistance ) {
              bestDistance = distance;
              bestNode = grandchild;
            }
          }
        }
      }
    }
    if ( bestNode ) {
      bestNode.focus();
    }
  }
}
