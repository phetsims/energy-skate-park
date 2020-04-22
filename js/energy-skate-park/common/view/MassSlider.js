// Copyright 2019-2020, University of Colorado Boulder

/**
 * A slider that controls the mass Property of the skater in energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkateParkStrings from '../../../energySkateParkStrings.js';
import energySkatePark from '../../../energySkatePark.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsMassString = energySkateParkStrings.physicalControls.massControls.mass;
const smallString = energySkateParkStrings.physicalControls.small;
const largeString = energySkateParkStrings.physicalControls.large;

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