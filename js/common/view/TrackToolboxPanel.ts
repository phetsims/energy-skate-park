// Copyright 2020-2025, University of Colorado Boulder

/**
 * Toolbox for tracks in the Playground screen of Energy Skate Park. User can drag short tracks with three control
 * points into the play area to create custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkPlaygroundModel from '../../playground/model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from '../../playground/view/EnergySkateParkPlaygroundScreenView.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import TrackNode from './TrackNode.js';

class TrackToolboxPanel extends Panel {

  public constructor( model: EnergySkateParkPlaygroundModel, view: EnergySkateParkPlaygroundScreenView, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {}, EnergySkateParkConstants.PANEL_OPTIONS, options );

    const iconTrack = model.createDraggableTrack( {
      trackOptions: {
        draggable: false,
        splittable: false
      },
      controlPointOptions: {
        interactive: false
      }
    } );
    const iconNode = new TrackNode( iconTrack, view.modelViewTransform, model.availableModelBoundsProperty, tandem.createTandem( 'iconNode' ), {

      // want the icon to look pickable, even though it isn't really draggable (forwarding listener makes the new
      // TrackNode draggable)
      roadCursorOverride: 'cursor'
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
      // @ts-expect-error
      track.forwardingDragStartEmitter.emit( event );
    } ) );

    const updateIconVisibility = () => {
      iconNode.visible = model.getNumberOfControlPoints() <= EnergySkateParkConstants.MAX_NUMBER_CONTROL_POINTS - 3;
    };
    model.tracks.addItemAddedListener( updateIconVisibility );
    model.tracks.addItemRemovedListener( updateIconVisibility );

    super( iconNode, options );
  }
}

energySkatePark.register( 'TrackToolboxPanel', TrackToolboxPanel );

export default TrackToolboxPanel;