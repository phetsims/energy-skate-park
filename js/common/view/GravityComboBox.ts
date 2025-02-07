// Copyright 2019-2025, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import PhysicalComboBox from './PhysicalComboBox.js';

export default class GravityComboBox extends PhysicalComboBox {

  /**
   * @param gravityProperty
   * @param userControlledProperty
   * @param resetEmitter
   * @param listParent - node which the ComboBoxListBox will be added
   * @param tandem
   * @param [options]
   */
  public constructor( gravityProperty: PhetioProperty<number>, userControlledProperty: BooleanProperty, resetEmitter: Emitter, listParent: Node, tandem: Tandem ) {

    const labelValueList = [
      { label: EnergySkateParkStrings.physicalControls.gravityControls.moonStringProperty, value: EnergySkateParkConstants.MOON_GRAVITY, tandemName: 'moonItem' },
      { label: EnergySkateParkStrings.physicalControls.gravityControls.earthStringProperty, value: EnergySkateParkConstants.EARTH_GRAVITY, tandemName: 'earthItem' },
      { label: EnergySkateParkStrings.physicalControls.gravityControls.jupiterStringProperty, value: EnergySkateParkConstants.JUPITER_GRAVITY, tandemName: 'jupiterItem' }
    ];

    super( gravityProperty, userControlledProperty, labelValueList, resetEmitter, listParent, tandem, { yMargin: 4 } );
  }
}

energySkatePark.register( 'GravityComboBox', GravityComboBox );