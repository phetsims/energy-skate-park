// Copyright 2026, University of Colorado Boulder

/**
 * Creates a Node with a dynamic accessible paragraph describing the number of tracks and skater status
 * in the Playground screen. Used for screen reader descriptions in the "Your Skate Park" heading.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPlaygroundModel from '../model/EnergySkateParkPlaygroundModel.js';

export default class PlaygroundTrackStatusNode extends Node {

  public constructor( model: EnergySkateParkPlaygroundModel ) {

    // Use a counter that increments on trackChangedEmitter to capture join/split changes
    // that don't affect the tracks array length
    const trackChangeCountProperty = new NumberProperty( 0 );
    model.trackChangedEmitter.addListener( () => trackChangeCountProperty.value++ );

    // Dynamic paragraph describing the number of tracks and skater status
    const paragraphProperty = new DerivedProperty(
      [
        model.tracks.lengthProperty,
        trackChangeCountProperty,
        model.skater.trackProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseNoneStringProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOnTrackStringProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOffTrackStringProperty
      ] as const,
      ( trackCount, _changeCount, skaterTrack, noneString, onTrackString, offTrackString ) => {

        // When there are no tracks, just return the "no tracks" string — no skater phrase needed
        if ( trackCount === 0 ) {
          return noneString;
        }

        // Count total visible control points across all tracks
        const totalControlPoints = _.sumBy( model.tracks, track =>
          track.controlPoints.filter( controlPoint => controlPoint.visible ).length
        );

        const trackPhrase = trackCount === 1
          ? EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseSingle.format( {
            numberControlPoints: totalControlPoints
          } )
          : EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseMultiple.format( {
            numberTracks: trackCount,
            numberControlPoints: totalControlPoints
          } );

        // Skater on/off track — when multiple tracks exist, specify which track by index
        const skaterPhrase = ( skaterTrack !== null && trackCount > 1 )
          ? EnergySkateParkFluent.a11y.yourSkatePark.skaterOnTrackWithIndex.format( {
            index: model.tracks.indexOf( skaterTrack ) + 1
          } )
          : ( skaterTrack !== null ? onTrackString : offTrackString );

        return EnergySkateParkFluent.a11y.yourSkatePark.trackAndSkaterParagraph.format( {
          trackPhrase: trackPhrase,
          skaterPhrase: skaterPhrase
        } );
      }
    );

    super( { accessibleParagraph: paragraphProperty } );
  }
}
