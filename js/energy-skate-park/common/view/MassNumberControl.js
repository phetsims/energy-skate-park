// Copyright 2019-2020, University of Colorado Boulder

/**
 * A NumberControl that controls the skater mass Property of energy skate park.
 * @author Jesse Greenberg
 */

import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import PhysicalNumberControl from './PhysicalNumberControl.js';

const controlsMassString = energySkateParkStrings.controls.mass;
const massKilogramsPatternString = energySkateParkStrings.massKilogramsPattern;

class MassNumberControl extends PhysicalNumberControl {

  /**
   * @param {NumberProperty} massProperty
   * @param {Range} massRange
   * @param {Tandem} tandem
   */
  constructor( massProperty, massRange, tandem ) {
    super( controlsMassString, massProperty, massRange, tandem, {
      numberDisplayOptions: {
        valuePattern: massKilogramsPatternString
      }
    } );
  }
}

energySkatePark.register( 'MassNumberControl', MassNumberControl );
export default MassNumberControl;