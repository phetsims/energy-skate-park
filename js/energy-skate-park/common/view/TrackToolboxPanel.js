// Copyright 2020, University of Colorado Boulder

/**
 * Toolbox for tracks in the Playground screen of Energy Skate Park. User can drag short tracks with three control
 * points into the play area to create custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../../phet-core/js/merge.js';
import DragListener from '../../../../../scenery/js/listeners/DragListener.js';
import Panel from '../../../../../sun/js/Panel.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import TrackNode from './TrackNode.js';

class TrackToolboxPanel extends Panel {

  /**
   * @param {EnergySkateParkPlaygroundModel} model
   * @param {EnergySkateParkPlaygroundScreenView} view
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, view, tandem, options ) {

    options = merge( {
      cornerRadius: 6
    }, options );

    const iconTrack = model.createDraggableTrack( {
      trackOptions: {
        draggable: false,
        splittable: false
      },
      controlPointOptions: {
        interactive: false
      }
    } );
    const iconNode = new TrackNode( model, iconTrack, view.modelViewTransform, model.availableModelBoundsProperty, tandem.createTandem( 'iconNode' ), {

      // want the icon to look pickable, even though it isn't really draggable (forwarding listener makes the new
      // TrackNode draggable)
      roadCursorOverride: 'cursor'
    } );

    iconNode.addInputListener( DragListener.createForwardingListener( event => {

      const track = model.createDraggableTrack();
      model.tracks.add( track );

      const trackNode = view.getTrackNode( track );

      // all in ScreenView coordinates
      const viewPoint = view.globalToLocalPoint( event.pointer.point );
      const iconViewCenter = view.globalToLocalPoint( iconNode.parentToGlobalPoint( iconNode.center ) );
      const offset = viewPoint.minus( iconViewCenter );
      const viewPointWithOffset = viewPoint.minus( offset );

      // initial model position
      track.position = view.modelViewTransform.viewToModelPosition( viewPointWithOffset );

      const releaseListener = dragging => {
        if ( !dragging && !track.physicalProperty.value ) {

          // track was released underground and was never added to the play area, so remove it
          model.tracks.remove( track );
          trackNode.trackDragHandler.isDraggingProperty.unlink( releaseListener );
        }
      };
      trackNode.trackDragHandler.isDraggingProperty.lazyLink( releaseListener );

      // forward the event to the TrackDragHandler
      trackNode.trackDragHandler.startDrag( event );
    } ) );

    const updateIconVisibility = () => {
      iconNode.visible = model.getNumberOfControlPoints() <= Constants.MAX_NUMBER_CONTROL_POINTS - 3;
    };
    model.tracks.addItemAddedListener( updateIconVisibility );
    model.tracks.addItemRemovedListener( updateIconVisibility );

    super( iconNode, options );
  }
}

energySkatePark.register( 'TrackToolboxPanel', TrackToolboxPanel );

export default TrackToolboxPanel;