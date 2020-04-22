// Copyright 2019-2020, University of Colorado Boulder

/**
 * A NumberControl that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Range from '../../../../../dot/js/Range.js';
import merge from '../../../../../phet-core/js/merge.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

const controlsGravityLabelString = energySkateParkStrings.physicalControls.gravityControls.gravity;
const gravityMetersPerSecondSquaredPatternString = energySkateParkStrings.physicalControls.gravityControls.gravityMetersPerSecondSquaredPattern;

class GravityNumberControl extends PhysicalNumberControl {

  /**
   * @param {NumberProperty} property
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( property, tandem, options ) {

    options = merge( {
      decimalPlaces: 1,
      numberDisplayOptions: {
        valuePattern: gravityMetersPerSecondSquaredPatternString,
        useRichText: true // for the superscript on units
      }
    }, options );
    super( controlsGravityLabelString, property, new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ), tandem, options );
  }
}

energySkatePark.register( 'GravityNumberControl', GravityNumberControl );
export default GravityNumberControl;