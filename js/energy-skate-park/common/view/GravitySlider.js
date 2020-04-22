// Copyright 2019-2020, University of Colorado Boulder

/**
 * A slider that controls the gravity Property of energy skate park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Range from '../../../../../dot/js/Range.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalSlider from './PhysicalSlider.js';

const controlsGravityLabelString = energySkateParkStrings.physicalControls.gravityControls.gravity;
const controlsValueTinyString = energySkateParkStrings.physicalControls.tiny;

class GravitySlider extends PhysicalSlider {

  /**
   * @param {NumberProperty} property
   * @param {Tandem} tandem
   */
  constructor( property, tandem ) {
    super( controlsGravityLabelString, property, new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ), tandem, {
      minLabel: controlsValueTinyString
    } );
  }
}

energySkatePark.register( 'GravitySlider', GravitySlider );
export default GravitySlider;