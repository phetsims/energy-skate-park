// Copyright 2019-2020, University of Colorado Boulder

/**
 * A slider that controls the mass Property of the skater in energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsMassString = energySkateParkStrings.physicalControls.massControls.mass;
const smallString = energySkateParkStrings.physicalControls.small;
const largeString = energySkateParkStrings.physicalControls.large;

class MassSlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property
   * @param {BooleanProperty} userControlledProperty
   * @param {Range} massRange
   * @param {Tandem} tandem
   */
  constructor( property, userControlledProperty, massRange, tandem ) {
    super( controlsMassString, property, massRange, userControlledProperty, tandem, {
      minLabel: smallString,
      maxLabel: largeString,
      sliderOptions: {
        constrainValue: value => Utils.roundToInterval( value, 5 )
      }
    } );
  }
}

energySkatePark.register( 'MassSlider', MassSlider );
export default MassSlider;