// Copyright 2019-2020, University of Colorado Boulder

/**
 * A NumberControl that controls the skater mass Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

const controlsMassString = energySkateParkStrings.physicalControls.massControls.mass;
const massKilogramsPatternString = energySkateParkStrings.physicalControls.massControls.massKilogramsPattern;

class MassNumberControl extends PhysicalNumberControl {

  /**
   * @param {NumberProperty} massProperty
   * @param {BooleanProperty} userControlledProperty
   * @param {Range} massRange
   * @param {Tandem} tandem
   */
  constructor( massProperty, userControlledProperty, massRange, tandem ) {
    super( controlsMassString, massProperty, massRange, userControlledProperty, tandem, {
      numberDisplayOptions: {
        valuePattern: massKilogramsPatternString
      },
      sliderOptions: {

        // round to nearest 5 kg, as requested by design team
        constrainValue: value => Utils.roundToInterval( value, 5 )
      }
    } );
  }
}

energySkatePark.register( 'MassNumberControl', MassNumberControl );
export default MassNumberControl;