// Copyright 2019-2020, University of Colorado Boulder

/**
 * A NumberControl that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

const controlsGravityLabelString = energySkateParkStrings.physicalControls.gravityControls.gravity;
const gravityMetersPerSecondSquaredPatternString = energySkateParkStrings.physicalControls.gravityControls.gravityMetersPerSecondSquaredPattern;

class GravityNumberControl extends PhysicalNumberControl {

  /**
   * @param {NumberProperty} property
   * @param {BooleanProperty} userControlledProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( property, userControlledProperty, tandem, options ) {

    options = merge( {
      decimalPlaces: 1,
      numberDisplayOptions: {
        valuePattern: gravityMetersPerSecondSquaredPatternString,
        useRichText: true // for the superscript on units
      },
      delta: 0.1,
      sliderOptions: {
        constrainValue: value => Utils.roundToInterval( value, 1 )
      }
    }, options );
    super( controlsGravityLabelString, property, new Range( Math.abs( EnergySkateParkConstants.MIN_GRAVITY ), Math.abs( EnergySkateParkConstants.MAX_GRAVITY ) ), userControlledProperty, tandem, options );
  }
}

energySkatePark.register( 'GravityNumberControl', GravityNumberControl );
export default GravityNumberControl;