// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard drag listener for translating an entire track. Converts keyboard arrow-key deltas into model
 * positions and delegates to TrackDragHandler.dragToModelPosition() so that the same constraint, snap,
 * and bump-above-ground logic is shared between pointer and keyboard input.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';
import TrackDragHandler from './TrackDragHandler.js';
import TrackNode from './TrackNode.js';

export default class TrackKeyboardDragListener extends SoundKeyboardDragListener {

  public constructor( trackNode: TrackNode, trackDragHandler: TrackDragHandler, tandem: Tandem ) {

    const track = trackNode.track;
    const model = trackNode.model;
    const modelViewTransform = trackNode.modelViewTransform;

    super( {
      start: () => {
        trackNode.moveToFront();
        track.draggingProperty.value = true;
      },
      drag: ( _event, listener ) => {

        // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
        if ( !model.containsTrack( track ) ) { return; }

        track.draggingProperty.value = true;

        // listener.modelDelta is in view coordinates because no transform was provided.
        // Convert to model coordinates for position update.
        const modelDelta = modelViewTransform.viewToModelDelta( listener.modelDelta );

        const newPosition = track.position.plus( modelDelta );

        // Delegate to TrackDragHandler which handles all constraint, snap-detection, and bump-above-ground logic
        trackDragHandler.dragToModelPosition( newPosition, false );
      },
      end: () => {
        trackDragHandler.trackDragEnded();

        if ( EnergySkateParkQueryParameters.testTrackIndex > 0 ) {
          console.log( track.getDebugString() );
        }
      },
      dragSpeed: 300,
      shiftDragSpeed: 75,
      tandem: tandem
    } );
  }
}

energySkatePark.register( 'TrackKeyboardDragListener', TrackKeyboardDragListener );
