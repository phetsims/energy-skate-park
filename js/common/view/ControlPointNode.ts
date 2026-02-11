// Copyright 2014-2026, University of Colorado Boulder

/**
 * The scenery node that shows a control point on a track, and allows the user to drag it or click on it for more
 * options.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';
import ControlPointAttachmentKeyboardListener from './ControlPointAttachmentKeyboardListener.js';
import ControlPointKeyboardDragListener from './ControlPointKeyboardDragListener.js';
import ControlPointUI from './ControlPointUI.js';
import TrackDragHandler from './TrackDragHandler.js';
import TrackNode from './TrackNode.js';

export default class ControlPointNode extends Circle {

  public static readonly SPLIT_VERTEX_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'alt+x' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkFluent.keyboardHelpDialog.splitVertexStringProperty
  } );

  public readonly boundsRectangle: Rectangle | null;

  /**
   * @param trackNode
   * @param trackDragHandler - so dragging a ControlPointNode can initiate dragging a track
   * @param i
   * @param isEndPoint
   * @param tandem
   */
  public constructor( trackNode: TrackNode, trackDragHandler: TrackDragHandler | null, i: number, isEndPoint: boolean, tandem: Tandem ) {
    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;
    const availableBoundsProperty = trackNode.availableBoundsProperty;
    const controlPointUIShownEmitter = new Emitter();

    const controlPoint = track.controlPoints[ i ];

    // Default colors for the control point fill and highlight
    const fill = 'red';
    const highlightedFill = '#c90606';

    // When mousing over the control point, highlight it like a button, to hint that it can be pressed to show the
    // cut/delete buttons, see #234
    const opacity = 0.7;
    const highlightedOpacity = 0.85;

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
      accessibleName: EnergySkateParkFluent.a11y.controlPointNode.accessibleNameStringProperty
    }, AccessibleDraggableOptions ) );

    // Control points should only be focusable when the track is physical (in the play area).
    // When the track is in the toolbox, only the entire TrackNode should be focusable.
    const physicalListener = ( isPhysical: boolean ) => {
      this.focusable = isPhysical;
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
    }

    controlPoint.positionProperty.link( position => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    } );

    // if the ControlPoint is 'interactive' it supports dragging and potentially track splitting
    let dragListener: SoundDragListener | null = null; // potential reference for disposal
    if ( controlPoint.interactive ) {
      let dragEvents = 0;
      let lastControlPointUI: ControlPointUI | null = null;
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

          // Constrain the control points to remain in y>0, see #71
          pt.y = Math.max( pt.y, 0 );

          // Constrain the control point to the limited bounds, this should be more more strict than
          // availableBoundsProperty so this is done first to avoid multiple checks
          const dragBounds = controlPoint.limitBounds || availableBoundsProperty.value;
          if ( dragBounds ) {
            pt = dragBounds.closestPointTo( pt );
          }

          if ( assert && availableBoundsProperty.value ) {
            assert( availableBoundsProperty.value.containsPoint( pt ),
              'point should be in sim bounds, are your limiting bounds correct?' );
          }

          controlPoint.sourcePositionProperty.value = pt;

          if ( isEndPoint ) {
            // If one of the control points is close enough to link to another track, do so
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

              lastControlPointUI && lastControlPointUI.dispose();

              lastControlPointUI = new ControlPointUI(
                model,
                track,
                i,
                modelViewTransform,
                trackNode.parents[ 0 ],
                tandem.createTandem( 'controlPointUI' )
              );

              // If the track was removed, get rid of the buttons
              const removalListener = () => {
                lastControlPointUI && lastControlPointUI.dispose();
                lastControlPointUI = null;
              };
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

      this.addInputListener( overOutListener, {
        disposer: this
      } );

      const controlPointKeyboardDragListener = new ControlPointKeyboardDragListener( trackNode, i, isEndPoint );
      this.addInputListener( controlPointKeyboardDragListener, { disposer: this } );

      // Add discrete attachment listener for endpoint control points on attachable tracks
      if ( isEndPoint && track.attachable ) {
        const attachmentListener = new ControlPointAttachmentKeyboardListener( this, trackNode, i );
        this.addInputListener( attachmentListener, { disposer: this } );
      }

      // Delete/backspace removes the control point, same as the "x" button in ControlPointUI
      if ( track.splittable ) {
        this.addInputListener( new KeyboardListener( {
          keys: [ 'delete', 'backspace' ] as const,
          fire: () => {
            if ( track.physicalProperty.value && !track.isDisposed ) {

              // Capture the trackLayer before deletion disposes this trackNode
              const trackLayer = trackNode.parents[ 0 ];

              model.deleteControlPoint( track, i );

              // Move focus to another control point in the play area
              for ( const child of trackLayer.children ) {
                if ( !child.isDisposed ) {
                  for ( const grandchild of child.children ) {
                    if ( grandchild instanceof ControlPointNode && grandchild.focusable ) {
                      grandchild.focus();
                      return;
                    }
                  }
                }
              }

              // No control points remain, focus the track toolbox icon by searching the scene graph
              let root = trackLayer;
              while ( root.parents.length > 0 ) {
                root = root.parents[ 0 ];
              }
              const toolboxName = EnergySkateParkFluent.a11y.trackToolboxPanel.accessibleNameStringProperty.value;
              const queue = [ ...root.children ];
              while ( queue.length > 0 ) {
                const node = queue.shift()!;
                if ( node.focusable && node.accessibleName === toolboxName ) {
                  node.focus();
                  return;
                }
                queue.push( ...node.children );
              }
            }
          }
        } ), { disposer: this } );

        // Alt+X splits the vertex, same as the scissors button in ControlPointUI.
        // Only available for interior control points when there is room for more tracks.
        if ( !isEndPoint ) {
          this.addInputListener( new KeyboardListener( {
            keyStringProperties: ControlPointNode.SPLIT_VERTEX_HOTKEY_DATA.keyStringProperties,
            fire: () => {
              if ( track.physicalProperty.value && !track.isDisposed && model.canCutTrackControlPoint() ) {
                const alpha = new LinearFunction( 0, track.controlPoints.length - 1, track.minPoint, track.maxPoint ).evaluate( i );
                const modelAngle = track.getModelAngleAt( alpha );
                model.splitControlPoint( track, i, modelAngle );
              }
            }
          } ), { disposer: this } );
        }
      }
    }

    this.touchArea = Shape.circle( 0, 0, 25 );
  }
}

energySkatePark.register( 'ControlPointNode', ControlPointNode );