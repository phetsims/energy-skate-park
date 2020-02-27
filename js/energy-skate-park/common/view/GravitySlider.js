// Copyright 2019, University of Colorado Boulder

/**
 * A slider that controls the gravity Property of energy skate park.
 * @author Jesse Greenberg
 */

import Range from '../../../../../dot/js/Range.js';
import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsGravityString = energySkateParkStrings.controls.gravity;
const controlsValueTinyString = energySkateParkStrings.controls.value.tiny;

class GravitySlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property
   * @param {Tandem} tandems
   */
  constructor( property, tandem ) {
    super( controlsGravityString, property, new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ), tandem, {
      minLabel: controlsValueTinyString
    } );
  }
}

energySkatePark.register( 'GravitySlider', GravitySlider );
export default GravitySlider;