// Copyright 2019, University of Colorado Boulder

/**
 * A slider that controls the mass Property of the skater in energy skate park.
 * @author Jesse Greenberg
 */

import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsMassString = energySkateParkStrings.controls.mass;
const smallString = energySkateParkStrings.small;
const largeString = energySkateParkStrings.large;

class MassSlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property
   * @param {Range} massRange
   * @param {Tandem} tandem
   */
  constructor( property, massRange, tandem ) {
    super( controlsMassString, property, massRange, tandem, {
      minLabel: smallString,
      maxLabel: largeString
    } );
  }
}

energySkatePark.register( 'MassSlider', MassSlider );
export default MassSlider;