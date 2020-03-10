// Copyright 2019-2020, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import PhysicalComboBox from './PhysicalComboBox.js';

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
      { label: 'Moon', value: Constants.MOON_GRAVITY },
      { label: 'Earth', value: Constants.EARTH_GRAVITY },
      { label: 'Jupiter', value: Constants.JUPITER_GRAVITY }
    ];

    super( gravityProperty, labelValueList, resetEmitter, listParent, tandem, options );
  }
}

energySkatePark.register( 'GravityComboBox', GravityComboBox );
export default GravityComboBox;