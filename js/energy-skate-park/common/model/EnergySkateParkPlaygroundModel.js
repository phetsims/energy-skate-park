// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model for Energy Skate Park that can have tracks that are draggable and attachable. Doesn't have a set of
 * premade tracks, but allows user to build them from scratch from a set of short tracks each with a few draggable
 * control points.
 *
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import ControlPoint from './ControlPoint.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';
import Track from './Track.js';

class EnergySkateParkPlaygroundModel extends EnergySkateParkModel {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {

      // the center of initial tracks in the toolbox, change this to move the panel to a different position
      // in model coordinates (meters)

      // REVIEW: It seems odd that we would specify the model position of the panel.  This should be view-only, and
      // REVIEW: When tracks are dragged out, their corresponding model positions should be computed.
      // REVIEW: For instance, if a designer asked to move this panel 10px to the left, that would be difficult
      // REVIEW: or impossible with the existing implementation.

      // REVIEW: Also, it seems odd that the default option only applies to "Energy Skate Park: Basics".  That should
      // REVIEW: be reversed, but probably unnecessary after addressing the preceding TODO
      initialTracksOffsetVector: new Vector2( -5.1, -0.85 )
    }, options );
    options = options || {};

    assert && assert( options.tracksDraggable === undefined, 'for playground models, tracks are draggable' );
    options.tracksDraggable = true;

    assert && assert( options.tracksConfigurable === undefined, 'for playground models, track control points can be dragged' );
    options.tracksConfigurable = true;

    super( tandem, options );

    // @private {Vector2} - see options for documentation
    this.initialTracksOffsetVector = options.initialTracksOffsetVector;

    // add all of the possible draggable tracks
    this.addDraggableTracks();
  }

  /**
   * Add the draggable tracks that will be in the toolbox of a playground scene.
   *
   * @public
   */
  addDraggableTracks() {

    // 3 points per track
    for ( let i = 0; i < Constants.MAX_NUMBER_CONTROL_POINTS / 3; i++ ) {
      this.addDraggableTrack();
    }
  }

  /**
   * Add a single draggable track to a control panel.
   *
   * @public
   */
  addDraggableTrack() {

    const controlPointGroupTandem = this.controlPointGroupTandem;
    const trackGroupTandem = this.trackGroupTandem;

    // Move the tracks over so they will be in the right position in the view coordinates, under the grass to the left
    // of the clock controls.  Could use view transform for this, but it would require creating the view first, so just
    // eyeballing it for now.

    // REVIEW: Let's use the standard pattern of showing an icon in the control panel, then creating the model component
    // REVIEW: in the corresponding model location when dragged.
    const offset = this.initialTracksOffsetVector;
    const controlPoints = [
      new ControlPoint( offset.x - 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( offset.x, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( offset.x + 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } )
    ];
    this.tracks.add( new Track( this, this.tracks, controlPoints, null, this.availableModelBoundsProperty, merge( {
        tandem: trackGroupTandem.createNextTandem()
      }, Track.FULLY_INTERACTIVE_OPTIONS )
    ) );
  }

  /**
   * After joining tracks, replenish the toolbox if number of control points has gone down enough.
   * @public
   * @override
   *
   * @param {Track} track
   */
  joinTracks( track ) {
    super.joinTracks( track );

    // if the number of control points is low enough, replenish the toolbox
    if ( this.getNumberOfControlPoints() <= Constants.MAX_NUMBER_CONTROL_POINTS - 3 ) {
      this.addDraggableTrack();
    }
  }

  /**
   * After deleting a control point, replenish the toolbox if number of control points has decreased enough.
   * @public
   * @override
   *
   * @param {Track} track
   * @param {number} controlPointIndex
   */
  deleteControlPoint( track, controlPointIndex ) {
    super.deleteControlPoint( track, controlPointIndex );
    if ( this.getNumberOfControlPoints() <= Constants.MAX_NUMBER_CONTROL_POINTS - 3 ) {
      this.addDraggableTrack();
    }
  }

  /**
   * Clear all tracks from the model.
   * @public
   */
  clearTracks() {

    this.tracks.forEach( track => {
      track.disposeControlPoints();
    } );
    this.tracks.clear();
    this.addDraggableTracks();

    // If the skater was on a track, then he should fall off, see #97
    if ( this.skater.trackProperty.value ) {
      this.skater.trackProperty.value = null;
    }
  }

  /**
   * Reset the model.
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.clearTracks();
  }
}

energySkatePark.register( 'EnergySkateParkPlaygroundModel', EnergySkateParkPlaygroundModel );
export default EnergySkateParkPlaygroundModel;