// Copyright 2022-2026, University of Colorado Boulder

/**
 * A model that holds preferences that are specific to Energy Skate Park. These Properties are shared and reflected
 * across all sim screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';

// Possible representations of units for acceleration in this sim, can be set by query parameter or in preferences.
export class AccelerationUnits extends EnumerationValue {
  public static readonly METERS_PER_SECOND_SQUARED = new AccelerationUnits();
  public static readonly NEWTONS_PER_KILOGRAM = new AccelerationUnits();

  public static readonly enumeration = new Enumeration( AccelerationUnits );
}

export default class EnergySkateParkPreferencesModel {

  // A Property that controls the acceleration units in the sim, "altAccelerationUnits" changes the default to N/kg
  public readonly accelerationUnitsProperty: EnumerationProperty<AccelerationUnits>;

  public constructor() {

    const defaultUnits = EnergySkateParkQueryParameters.altAccelerationUnits ? AccelerationUnits.NEWTONS_PER_KILOGRAM : AccelerationUnits.METERS_PER_SECOND_SQUARED;
    this.accelerationUnitsProperty = new EnumerationProperty( defaultUnits, {
      tandem: Tandem.PREFERENCES.createTandem( 'accelerationUnitsProperty' )
    } );
  }

  public static readonly AccelerationUnits = AccelerationUnits;
}

energySkatePark.register( 'EnergySkateParkPreferencesModel', EnergySkateParkPreferencesModel );