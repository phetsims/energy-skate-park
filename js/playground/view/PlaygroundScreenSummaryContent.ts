// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for the Playground screen. The playground screen has unique accessibility needs:
 * tracks are user-created (dynamic count with join/split), and the summary must handle the zero-track state.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkModel from '../../common/model/EnergySkateParkModel.js';
import createSkaterAndFrictionPhrases from '../../common/view/createSkaterAndFrictionPhrases.js';

export default class PlaygroundScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: EnergySkateParkModel ) {

    const { skaterPhraseProperty, frictionPhraseProperty } = createSkaterAndFrictionPhrases( model );

    // For playground, use a counter to capture join/split changes that don't affect the tracks array length
    const trackChangeCountProperty = new NumberProperty( 0 );
    model.trackChangedEmitter.addListener( () => trackChangeCountProperty.value++ );

    const trackPhraseProperty = new DerivedProperty(
      [ model.tracks.lengthProperty, trackChangeCountProperty ],
      ( trackCount: number ) => {
        if ( trackCount === 0 ) {
          return '';
        }

        // Count total visible control points across all tracks
        let totalControlPoints = 0;
        for ( let i = 0; i < model.tracks.length; i++ ) {
          totalControlPoints += model.tracks.get( i ).controlPoints.filter( controlPoint => controlPoint.visible ).length;
        }

        if ( trackCount === 1 ) {
          return EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseSingle.format( {
            numberControlPoints: totalControlPoints
          } );
        }
        else {
          return EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseMultiple.format( {
            numberTracks: trackCount,
            numberControlPoints: totalControlPoints
          } );
        }
      }
    );

    // Combine into currentDetails - handle the no-track case
    const currentDetailsContentProperty = new DerivedProperty(
      [
        model.tracks.lengthProperty,
        skaterPhraseProperty,
        trackPhraseProperty,
        frictionPhraseProperty,
        EnergySkateParkFluent.a11y.screenSummary.currentDetails.noTrackBuiltStringProperty
      ],
      ( trackCount, skaterPhrase, trackPhrase, frictionPhrase, noTrackBuilt ) => {
        if ( trackCount === 0 ) {
          return noTrackBuilt;
        }
        return `${skaterPhrase} ${trackPhrase} ${frictionPhrase}`;
      }
    );

    // Interaction hint is dynamic based on whether tracks exist
    const interactionHintContentProperty = new DerivedProperty(
      [
        model.tracks.lengthProperty,
        EnergySkateParkFluent.a11y.screenSummary.interactionHint.hasTrackStringProperty,
        EnergySkateParkFluent.a11y.screenSummary.interactionHint.noTrackStringProperty
      ],
      ( trackCount, hasTrackHint, noTrackHint ) => trackCount > 0 ? hasTrackHint : noTrackHint
    );

    super( {
      playAreaContent: EnergySkateParkFluent.a11y.screenSummary.playArea.playgroundStringProperty,
      controlAreaContent: EnergySkateParkFluent.a11y.screenSummary.controlArea.withoutTrackSelectionStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}
