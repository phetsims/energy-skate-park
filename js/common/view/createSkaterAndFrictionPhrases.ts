// Copyright 2026, University of Colorado Boulder

/**
 * Creates the skater phrase and friction phrase DerivedProperties shared by all screen summary content classes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';

// Speed threshold in m/s below which the skater is considered "at rest"
const SPEED_THRESHOLD = 0.01;

export default function createSkaterAndFrictionPhrases( model: EnergySkateParkModel ): {
  skaterPhraseProperty: TReadOnlyProperty<string>;
  frictionPhraseProperty: TReadOnlyProperty<string>;
} {

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

  return { skaterPhraseProperty: skaterPhraseProperty, frictionPhraseProperty: frictionPhraseProperty };
}
