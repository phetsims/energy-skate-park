// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for Energy Skate Park screens. Describes the play area, control area,
 * current state details, and interaction hints for screen reader accessibility.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import { TrackType } from '../model/PremadeTracks.js';

// Speed threshold in m/s below which the skater is considered "at rest"
const SPEED_THRESHOLD = 0.01;

// Map from TrackType to the corresponding accessible name StringProperty
const trackTypeToNameProperty: Record<TrackType, TReadOnlyProperty<string>> = {
  PARABOLA: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
  RAMP: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty,
  DOUBLE_WELL: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty,
  LOOP: EnergySkateParkFluent.a11y.trackSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty
};

export type EnergySkateParkScreenType = 'intro' | 'friction' | 'measure' | 'graphs' | 'playground';

export default class EnergySkateParkScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: EnergySkateParkModel, screenType: EnergySkateParkScreenType ) {

    // Select playArea content based on screen type
    const playAreaContentMap: Record<EnergySkateParkScreenType, TReadOnlyProperty<string>> = {
      intro: EnergySkateParkFluent.a11y.screenSummary.playArea.introStringProperty,
      friction: EnergySkateParkFluent.a11y.screenSummary.playArea.frictionStringProperty,
      measure: EnergySkateParkFluent.a11y.screenSummary.playArea.measureStringProperty,
      graphs: EnergySkateParkFluent.a11y.screenSummary.playArea.graphsStringProperty,
      playground: EnergySkateParkFluent.a11y.screenSummary.playArea.playgroundStringProperty
    };

    // Select controlArea content - playground has no track selection
    const controlAreaContent = screenType === 'playground'
                               ? EnergySkateParkFluent.a11y.screenSummary.controlArea.withoutTrackSelectionStringProperty
                               : EnergySkateParkFluent.a11y.screenSummary.controlArea.withTrackSelectionStringProperty;

    // Derived properties for skater state
    const onTrackProperty = new DerivedProperty( [ model.skater.trackProperty ],
      track => track !== null ? 'on' : 'off'
    );
    const motionProperty = new DerivedProperty( [ model.skater.speedProperty ],
      speed => speed > SPEED_THRESHOLD ? 'inMotion' : 'atRest'
    );

    // Create the skater phrase property using Fluent pattern
    const skaterPhraseProperty = EnergySkateParkFluent.a11y.screenSummary.currentDetails.skaterPhrase.createProperty( {
      onTrack: onTrackProperty,
      motion: motionProperty
    } );

    // Derived property for friction state
    const hasFrictionProperty = new DerivedProperty( [ model.frictionProperty ],
      friction => friction > 0 ? 'true' : 'false'
    );

    // Create the friction phrase property using Fluent pattern
    const frictionPhraseProperty = EnergySkateParkFluent.a11y.screenSummary.currentDetails.frictionPhrase.createProperty( {
      hasFriction: hasFrictionProperty
    } );

    // Track phrase varies by screen type
    let trackPhraseProperty: TReadOnlyProperty<string>;

    if ( screenType === 'playground' ) {

      // For playground, use a counter to capture join/split changes that don't affect the tracks array length
      const trackChangeCountProperty = new NumberProperty( 0 );
      model.trackChangedEmitter.addListener( () => trackChangeCountProperty.value++ );

      trackPhraseProperty = new DerivedProperty(
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
    }
    else {

      // For track set screens, derive the track phrase from the scene selection
      const trackSetModel = model as EnergySkateParkTrackSetModel;
      trackPhraseProperty = new DerivedProperty(
        [ trackSetModel.sceneProperty ], scene => {
          const sceneIndex = trackSetModel.trackTypes.indexOf( scene );
          const trackShapeName = trackTypeToNameProperty[ scene ].value;
          const track = trackSetModel.tracks.get( sceneIndex );
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
    }

    // Combine into currentDetails - playground has a special no-track case
    let currentDetailsContentProperty: TReadOnlyProperty<string>;

    if ( screenType === 'playground' ) {
      currentDetailsContentProperty = new DerivedProperty(
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
    }
    else {
      currentDetailsContentProperty = new DerivedProperty(
        [ skaterPhraseProperty, trackPhraseProperty, frictionPhraseProperty ],
        ( skaterPhrase, trackPhrase, frictionPhrase ) => `${skaterPhrase} ${trackPhrase} ${frictionPhrase}`
      );
    }

    // Interaction hint - playground has a dynamic hint based on whether tracks exist
    let interactionHintContentProperty: TReadOnlyProperty<string>;

    if ( screenType === 'playground' ) {
      interactionHintContentProperty = new DerivedProperty(
        [
          model.tracks.lengthProperty,
          EnergySkateParkFluent.a11y.screenSummary.interactionHint.hasTrackStringProperty,
          EnergySkateParkFluent.a11y.screenSummary.interactionHint.noTrackStringProperty
        ],
        ( trackCount, hasTrackHint, noTrackHint ) => trackCount > 0 ? hasTrackHint : noTrackHint
      );
    }
    else {
      interactionHintContentProperty = EnergySkateParkFluent.a11y.screenSummary.interactionHint.hasTrackStringProperty;
    }

    super( {
      playAreaContent: playAreaContentMap[ screenType ],
      controlAreaContent: controlAreaContent,
      currentDetailsContent: currentDetailsContentProperty,
      interactionHintContent: interactionHintContentProperty
    } );
  }
}
