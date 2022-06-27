// Copyright 2019-2022, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import energySkatePark from '../../energySkatePark.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalComboBox from './PhysicalComboBox.js';

const gravityMoonString = energySkateParkStrings.physicalControls.gravityControls.moon;
const gravityEarthString = energySkateParkStrings.physicalControls.gravityControls.earth;
const gravityJupiterString = energySkateParkStrings.physicalControls.gravityControls.jupiter;

class GravityComboBox extends PhysicalComboBox {

  /**
   * @param {NumberProperty} gravityProperty
   * @param {BooleanProperty} userControlledProperty
   * @param {Emitter} resetEmitter
   * @param {Node} listParent - node which the ComboBoxListBox will be added
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( gravityProperty, userControlledProperty, resetEmitter, listParent, tandem, options ) {

    options = merge( {
      yMargin: 4
    }, options );

    const labelValueList = [
      { label: gravityMoonString, value: EnergySkateParkConstants.MOON_GRAVITY, tandemName: `moon${ComboBox.ITEM_TANDEM_NAME_SUFFIX}` },
      { label: gravityEarthString, value: EnergySkateParkConstants.EARTH_GRAVITY, tandemName: `earth${ComboBox.ITEM_TANDEM_NAME_SUFFIX}` },
      { label: gravityJupiterString, value: EnergySkateParkConstants.JUPITER_GRAVITY, tandemName: `jupiterItem${ComboBox.ITEM_TANDEM_NAME_SUFFIX}` }
    ];

    super( gravityProperty, userControlledProperty, labelValueList, resetEmitter, listParent, tandem, options );
  }
}

energySkatePark.register( 'GravityComboBox', GravityComboBox );
export default GravityComboBox;