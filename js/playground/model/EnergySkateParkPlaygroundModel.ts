// Copyright 2018-2026, University of Colorado Boulder

/**
 * A model for Energy Skate Park that can have tracks that are draggable and attachable. Doesn't have a set of
 * premade tracks, but allows user to build them from scratch from a set of short tracks each with a few draggable
 * control points.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { ControlPointOptions } from '../../common/model/ControlPoint.js';
import EnergySkateParkModel, { EnergySkateParkModelOptions } from '../../common/model/EnergySkateParkModel.js';
import EnergySkateParkPreferencesModel from '../../common/model/EnergySkateParkPreferencesModel.js';
import Track, { TrackOptions } from '../../common/model/Track.js';
import energySkatePark from '../../energySkatePark.js';

export default class EnergySkateParkPlaygroundModel extends EnergySkateParkModel {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem, options?: EnergySkateParkModelOptions ) {
    if ( options ) {
      assert && assert( options.tracksDraggable === undefined, 'for playground models, tracks are draggable' );
      assert && assert( options.tracksConfigurable === undefined, 'for playground models, track control points can be dragged' );
    }

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      tracksDraggable: true,
      tracksConfigurable: true
    }, options );

    super( preferencesModel, tandem, options );
  }

  /**
   * Create a new fully interactive Track which can be used to create custom Tracks. Generally  used when
   * user drags a new Track from  the toolbox.
   *
   * @param options - options passed along to the Track
   */
  public createDraggableTrack( controlPointOptions: ControlPointOptions = {}, trackOptions: TrackOptions = {} ): Track {

    const controlPoints = [
      this.controlPointGroup.createNextElement( -1, 0, controlPointOptions ),
      this.controlPointGroup.createNextElement( 0, 0, controlPointOptions ),
      this.controlPointGroup.createNextElement( 1, 0, controlPointOptions )
    ];

    return this.trackGroup.createNextElement( controlPoints, combineOptions<TrackOptions>( {}, Track.FULLY_INTERACTIVE_OPTIONS, trackOptions )
    );
  }

  /**
   * Clear all tracks from the model.
   */
  public clearTracks(): void {

    this.tracks.clear();
    this.trackGroup.clear();
    this.controlPointGroup.clear();

    // If the skater was on a track, then he should fall off, see #97
    if ( this.skater.trackProperty.value ) {
      this.skater.trackProperty.value = null;
    }
  }

  /**
   * Reset the model.
   */
  public override reset(): void {
    super.reset();
    this.clearTracks();
  }
}

energySkatePark.register( 'EnergySkateParkPlaygroundModel', EnergySkateParkPlaygroundModel );