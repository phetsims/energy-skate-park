// Copyright 2018-2020, University of Colorado Boulder

/**
 * A model for Energy Skate Park that can have tracks that are buildable and draggable. Doesn't have a set of
 * pre-constructed tracks, but allows user to build them from scratch.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModel' );
  const merge = require( 'PHET_CORE/merge' );
  const Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );
  const Vector2 = require( 'DOT/Vector2' );

  // Control points are replenished in the toolbox as they are destroyed (by connecting) in the play area
  // This is the maximum number of control points available to the user.
  const MAX_NUMBER_CONTROL_POINTS = 15;

  /**
   * @constructor
   * @param {Tandem} tandem
   * @param {Object} options
   */
  class EnergySkateParkPlaygroundModel extends EnergySkateParkModel {
    constructor( tandem, options ) {
      options = merge( {

        // the center of initial tracks in the control panel, change this to move the panel to a different location
        // in model coordinates (meters)
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
      for ( let i = 0; i < MAX_NUMBER_CONTROL_POINTS / 3; i++ ) {
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
      const offset = this.initialTracksOffsetVector;
      const controlPoints = [
        new ControlPoint( offset.x - 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
        new ControlPoint( offset.x, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
        new ControlPoint( offset.x + 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } )
      ];
      this.tracks.add( new Track( this, this.tracks, controlPoints, null, this.availableModelBoundsProperty, {
          draggable: true,
          configurable: true,
          splittable: true,
          attachable: true,

          tandem: trackGroupTandem.createNextTandem()
        }
      ) );
    }

    /**
     * Clear all tracks from the model.
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

    reset() {
      super.reset();
      this.clearTracks();
    }
  }

  return energySkatePark.register( 'EnergySkateParkPlaygroundModel', EnergySkateParkPlaygroundModel );
} );
