// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for track-set Energy Skate Park screens (Intro, Friction, Measure, Graphs).
 * Describes the play area, control area, current state details, and interaction hints for screen reader accessibility.
 *
 * For the Playground screen, see PlaygroundScreenSummaryContent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import { TrackType } from '../model/PremadeTracks.js';
import createSkaterAndFrictionPhrases from './createSkaterAndFrictionPhrases.js';

// Map from TrackType to the corresponding accessible name StringProperty
const trackTypeToNameProperty: Record<TrackType, TReadOnlyProperty<string>> = {
  PARABOLA: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
  RAMP: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty,
  DOUBLE_WELL: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty,
  LOOP: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty
};

export type EnergySkateParkScreenType = 'intro' | 'friction' | 'measure' | 'graphs';

export default class EnergySkateParkScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: EnergySkateParkTrackSetModel, screenType: EnergySkateParkScreenType ) {

    const { skaterPhraseProperty, frictionPhraseProperty } = createSkaterAndFrictionPhrases( model );

    // Select playArea content based on screen type
    const playAreaContentMap: Record<EnergySkateParkScreenType, TReadOnlyProperty<string>> = {
      intro: EnergySkateParkFluent.a11y.screenSummary.playArea.introStringProperty,
      friction: EnergySkateParkFluent.a11y.screenSummary.playArea.frictionStringProperty,
      measure: EnergySkateParkFluent.a11y.screenSummary.playArea.measureStringProperty,
      graphs: EnergySkateParkFluent.a11y.screenSummary.playArea.graphsStringProperty
    };

    // Derive the track phrase from the scene selection
    const trackPhraseProperty = new DerivedProperty(
      [ model.sceneProperty ], scene => {
        const sceneIndex = model.trackTypes.indexOf( scene );
        const trackShapeName = trackTypeToNameProperty[ scene ].value;
        const track = model.tracks.get( sceneIndex );
        const visibleControlPointCount = track.controlPoints.filter( cp => cp.visible ).length;

        if ( model.tracksConfigurable ) {
          return EnergySkateParkFluent.a11y.yourSkatePark.trackPhraseAdjustable.format( {
            trackShape: trackShapeName,
            numberControlPoints: visibleControlPointCount
          } );
        }
        else {
          return EnergySkateParkFluent.a11y.yourSkatePark.trackPhraseFixed.format( {
            trackShape: trackShapeName
          } );
        }
      }
    );

    // Combine into currentDetails
    const currentDetailsContentProperty = new DerivedProperty(
      [ skaterPhraseProperty, trackPhraseProperty, frictionPhraseProperty ],
      ( skaterPhrase, trackPhrase, frictionPhrase ) => `${skaterPhrase} ${trackPhrase} ${frictionPhrase}`
    );

    super( {
      playAreaContent: playAreaContentMap[ screenType ],
      controlAreaContent: EnergySkateParkFluent.a11y.screenSummary.controlArea.withTrackSelectionStringProperty,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: EnergySkateParkFluent.a11y.screenSummary.interactionHint.hasTrackStringProperty
    } );
  }
}
