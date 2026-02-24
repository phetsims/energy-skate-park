// Copyright 2020-2026, University of Colorado Boulder

/**
 * Toolbox for tracks in the Playground screen of Energy Skate Park. User can drag short tracks with three control
 * points into the play area to create custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPlaygroundModel from '../../playground/model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from '../../playground/view/EnergySkateParkPlaygroundScreenView.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import TrackNode from './TrackNode.js';

export default class TrackToolboxPanel extends Panel {

  public constructor( model: EnergySkateParkPlaygroundModel, view: EnergySkateParkPlaygroundScreenView, tandem: Tandem, providedOptions?: PanelOptions ) {

    const options = combineOptions<PanelOptions>( {
      resize: false // do not disappear when all tracks are out
    }, EnergySkateParkConstants.PANEL_OPTIONS, providedOptions );

    const iconTrack = model.createDraggableTrack( {
      interactive: false
    }, {
      draggable: false,
      splittable: false
    } );

    // Wrap the TrackNode in a Node so we can add button-like PDOM attributes without affecting TrackNode itself
    const trackIconNode = new TrackNode( iconTrack, view.modelViewTransform, model.availableModelBoundsProperty, tandem.createTandem( 'iconNode' ), {
      trackToolboxIcon: true
    } );

    const iconNode = new InteractiveHighlightingNode( {
      children: [ trackIconNode ],
      cursor: 'pointer',
      tagName: 'button',
      accessibleName: EnergySkateParkFluent.a11y.trackToolboxPanel.accessibleNameStringProperty
    } );

    iconNode.addInputListener( DragListener.createForwardingListener( event => {

      const track = model.createDraggableTrack();
      model.tracks.add( track );

      // all in ScreenView coordinates
      const viewPoint = view.globalToLocalPoint( event.pointer.point );
      const iconViewCenter = view.globalToLocalPoint( iconNode.parentToGlobalPoint( iconNode.center ) );
      const offset = viewPoint.minus( iconViewCenter );
      const viewPointWithOffset = viewPoint.minus( offset );

      // initial model position
      track.position = view.modelViewTransform.viewToModelPosition( viewPointWithOffset );

      // signify that dragging has begun so that we can start the drag on the Node's drag listener
      track.forwardingDragStartEmitter.emit( event );
    } ) );

    // Keyboard activation: create a track and focus it
    iconNode.addInputListener( new KeyboardListener( {
      fireOnClick: true,
      fire: () => {
        const hasRoom = model.getNumberOfControlPoints() <= EnergySkateParkConstants.MAX_NUMBER_CONTROL_POINTS - 3;
        if ( !hasRoom ) {
          return;
        }

        const track = model.createDraggableTrack();
        model.tracks.add( track );

        // Find a position that doesn't overlap existing tracks. Start centered above ground,
        // then shift right if too close to an existing track.
        const OVERLAP_THRESHOLD = 1.5; // model units - tracks are ~2m wide
        let candidatePosition = new Vector2( 0, 1.5 ); // start above ground, over skater's head

        for ( let attempt = 0; attempt < 10; attempt++ ) {
          let hasCollision = false;
          for ( const existingTrack of model.tracks ) {
            if ( existingTrack !== track && existingTrack.position.distance( candidatePosition ) < OVERLAP_THRESHOLD ) {
              hasCollision = true;
              candidatePosition = candidatePosition.plusXY( 0, 0.75 );
              break;
            }
          }
          if ( !hasCollision ) {
            break;
          }
        }

        track.position = candidatePosition;
        track.physicalProperty.value = true;
        track.bumpAboveGround();

        // Find the newly created TrackNode and focus it
        for ( const child of view.trackLayer.children ) {
          if ( child instanceof TrackNode && child.track === track ) {
            child.focus();
            break;
          }
        }
      }
    } ) );

    const updateIconAvailability = () => {
      const hasRoom = model.getNumberOfControlPoints() <= EnergySkateParkConstants.MAX_NUMBER_CONTROL_POINTS - 3;
      iconNode.setOpacity( hasRoom ? 1 : 0.4 );
      iconNode.inputEnabled = hasRoom;
      iconNode.focusable = hasRoom;
    };
    model.tracks.addItemAddedListener( updateIconAvailability );
    model.tracks.addItemRemovedListener( updateIconAvailability );

    super( iconNode, options );
  }
}

energySkatePark.register( 'TrackToolboxPanel', TrackToolboxPanel );
