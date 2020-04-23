// Copyright 2019-2020, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../../energySkatePark.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import Constants from '../Constants.js';
import PhysicalComboBox from './PhysicalComboBox.js';

const gravityMoonString = energySkateParkStrings.physicalControls.gravityControls.moon;
const gravityEarthString = energySkateParkStrings.physicalControls.gravityControls.earth;
const gravityJupiterString = energySkateParkStrings.physicalControls.gravityControls.jupiter;

class GravityComboBox extends PhysicalComboBox {

  /**
   * @param {NumberProperty} gravityProperty
   * @param {Emitter} resetEmitter
   * @param {Node} listParent - node which the ComboBoxListBox will be added
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( gravityProperty, resetEmitter, listParent, tandem, options ) {

    const labelValueList = [
      { label: gravityMoonString, value: Constants.MOON_GRAVITY },
      { label: gravityEarthString, value: Constants.EARTH_GRAVITY },
      { label: gravityJupiterString, value: Constants.JUPITER_GRAVITY }
    ];

    super( gravityProperty, labelValueList, resetEmitter, listParent, tandem, options );
  }
}

energySkatePark.register( 'GravityComboBox', GravityComboBox );
export default GravityComboBox;