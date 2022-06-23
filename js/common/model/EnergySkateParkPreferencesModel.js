// Copyright 2022, University of Colorado Boulder

/**
 * A model that holds preferences that are specific to Energy Skate Park. These Properties are shared and reflected
 * across all sim screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import energySkatePark from '../../energySkatePark.js';
import Property from '../../../../axon/js/Property.js';
import EnergySkateParkQueryParameters from '../EnergySkateParkQueryParameters.js';
import SkaterImages from '../view/SkaterImages.js';

// Possible representations of units for acceleration in this sim, can be set by query parameter or in preferences.
class AccelerationUnits extends EnumerationValue {
  static METERS_PER_SECOND_SQUARED = new AccelerationUnits();
  static NEWTONS_PER_KILOGRAM = new AccelerationUnits();

  static enumeration = new Enumeration( AccelerationUnits );
}

class EnergySkateParkPreferencesModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // A Property that controls the acceleration units in the sim, "altAccelerationUnits" changes the default to N/kg
    const defaultUnits = EnergySkateParkQueryParameters.altAccelerationUnits ? AccelerationUnits.NEWTONS_PER_KILOGRAM : AccelerationUnits.METERS_PER_SECOND_SQUARED;
    this.accelerationUnitsProperty = new EnumerationProperty( defaultUnits, {
      tandem: tandem.createTandem( 'accelerationUnitsProperty' )
    } );

    // Controls the selected SkaterImages.SkaterCharacterSet. A set of characters is selected from Preferences
    // and the actual skater character is chosen from in-screen UI.
    this.skaterCharacterSetProperty = new Property( SkaterImages.CHARACTER_SET_1, {
      tandem: tandem.createTandem( 'skaterCharacterSetProperty' ),

      // TODO: To get it running in Studio, either supply this or create a generalized type for this Property in joist.
      phetioState: false
    } );
  }
}

// @public
// @static
EnergySkateParkPreferencesModel.AccelerationUnits = AccelerationUnits;

energySkatePark.register( 'EnergySkateParkPreferencesModel', EnergySkateParkPreferencesModel );
export default EnergySkateParkPreferencesModel;
