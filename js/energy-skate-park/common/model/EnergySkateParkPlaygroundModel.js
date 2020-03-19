// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model for Energy Skate Park that can have tracks that are draggable and attachable. Doesn't have a set of
 * premade tracks, but allows user to build them from scratch from a set of short tracks each with a few draggable
 * control points.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import energySkatePark from '../../../energySkatePark.js';
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
    options = options || {}; // REVIEW: This is unnecessary

    assert && assert( options.tracksDraggable === undefined, 'for playground models, tracks are draggable' );
    options.tracksDraggable = true;

    assert && assert( options.tracksConfigurable === undefined, 'for playground models, track control points can be dragged' );
    options.tracksConfigurable = true;

    super( tandem, options );

    // @private {Vector2} - see options for documentation
    this.initialTracksOffsetVector = options.initialTracksOffsetVector;
  }

  /**
   * Create a new fully interactive Track which can be used to create custom Tracks. Generally  used when
   * user drags a new Track from  the toolbox.
   * @public
   *
   * @param {Object} [options] - options passed along to the Track
   * @returns {Track}
   */
  createDraggableTrack( options ) {
    options =  merge( {

      // options passed along to ControlPoints of this Track
      controlPointOptions: null,

      // options passed along to the Track
      trackOptions: null
    }, options );

    const controlPointGroupTandem = this.controlPointGroupTandem;
    const trackGroupTandem = this.trackGroupTandem;

    const controlPoints = [
      new ControlPoint( -1, 0, merge( { tandem: controlPointGroupTandem.createNextTandem() }, options.controlPointOptions ) ),
      new ControlPoint( 0, 0, merge( { tandem: controlPointGroupTandem.createNextTandem() }, options.controlPointOptions ) ),
      new ControlPoint( 1, 0, merge( { tandem: controlPointGroupTandem.createNextTandem() }, options.controlPointOptions ) )
    ];

    return new Track( this, this.tracks, controlPoints, null, this.availableModelBoundsProperty, merge( {
        tandem: trackGroupTandem.createNextTandem()
      }, Track.FULLY_INTERACTIVE_OPTIONS, options.trackOptions )
    );
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