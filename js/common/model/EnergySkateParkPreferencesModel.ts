// Copyright 2022-2026, University of Colorado Boulder

/**
 * A model that holds preferences that are specific to Energy Skate Park. These Properties are shared and reflected
 * across all sim screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';

// Possible representations of units for acceleration in this sim, can be set by query parameter or in preferences.
export class AccelerationUnits extends EnumerationValue {
  public static readonly METERS_PER_SECOND_SQUARED = new AccelerationUnits();
  public static readonly NEWTONS_PER_KILOGRAM = new AccelerationUnits();

  // Despite being marked as unused, the legacy enumeration pattern requires an enumeration attribute. Try commenting
  // out to see what would go wrong without it.
  private static readonly enumeration = new Enumeration( AccelerationUnits );
}

export default class EnergySkateParkPreferencesModel {

  // A Property that controls the acceleration units in the sim, "altAccelerationUnits" changes the default to N/kg
  public readonly accelerationUnitsProperty: EnumerationProperty<AccelerationUnits>;

  // Whether to show patterns (diagonal stripes, polka dots) on energy representations for increased contrast
  public readonly showPatternsProperty: BooleanProperty;

  public constructor() {

    const defaultUnits = EnergySkateParkQueryParameters.altAccelerationUnits ? AccelerationUnits.NEWTONS_PER_KILOGRAM : AccelerationUnits.METERS_PER_SECOND_SQUARED;
    this.accelerationUnitsProperty = new EnumerationProperty( defaultUnits, {
      tandem: Tandem.PREFERENCES.createTandem( 'accelerationUnitsProperty' ),
      phetioFeatured: true
    } );

    this.showPatternsProperty = new BooleanProperty( EnergySkateParkQueryParameters.patterns, {
      tandem: Tandem.PREFERENCES.createTandem( 'showPatternsProperty' ),
      phetioFeatured: true
    } );
  }

  public static readonly AccelerationUnits = AccelerationUnits;
}
