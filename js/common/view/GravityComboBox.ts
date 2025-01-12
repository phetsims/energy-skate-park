// Copyright 2019-2024, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalComboBox from './PhysicalComboBox.js';

class GravityComboBox extends PhysicalComboBox {

  /**
   * @param gravityProperty
   * @param userControlledProperty
   * @param resetEmitter
   * @param listParent - node which the ComboBoxListBox will be added
   * @param tandem
   * @param [options]
   */
  public constructor( gravityProperty: PhetioProperty<number>, userControlledProperty: PhetioProperty<boolean>, resetEmitter: Emitter, listParent: Node, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {
      yMargin: 4
    }, options );

    const labelValueList = [
      { label: EnergySkateParkStrings.physicalControls.gravityControls.moonStringProperty, value: EnergySkateParkConstants.MOON_GRAVITY, tandemName: 'moonItem' },
      { label: EnergySkateParkStrings.physicalControls.gravityControls.earthStringProperty, value: EnergySkateParkConstants.EARTH_GRAVITY, tandemName: 'earthItem' },
      { label: EnergySkateParkStrings.physicalControls.gravityControls.jupiterStringProperty, value: EnergySkateParkConstants.JUPITER_GRAVITY, tandemName: 'jupiterItem' }
    ];

    // @ts-expect-error
    super( gravityProperty, userControlledProperty, labelValueList, resetEmitter, listParent, tandem, options );
  }
}

energySkatePark.register( 'GravityComboBox', GravityComboBox );
export default GravityComboBox;