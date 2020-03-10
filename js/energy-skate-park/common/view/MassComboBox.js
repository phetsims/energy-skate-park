// Copyright 2018-2020, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park. Includes a title and the
 * ComboBox.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import SkaterMasses from '../SkaterMasses.js';
import LabelledComboBox from './LabelledComboBox.js';
import PhysicalComboBox from './PhysicalComboBox.js';

const controlsSkaterString = energySkateParkStrings.controls.skater;
const controlsSkater1MassString = energySkateParkStrings.controls.skater1Mass;
const controlsSkater2MassString = energySkateParkStrings.controls.skater2Mass;
const controlsSkater3MassString = energySkateParkStrings.controls.skater3Mass;
const controlsSkater4MassString = energySkateParkStrings.controls.skater4Mass;
const controlsSkater5MassString = energySkateParkStrings.controls.skater5Mass;
const controlsDogMassString = energySkateParkStrings.controls.dogMass;

class MassComboBox extends LabelledComboBox {

  /**
   * @param {NumberProperty} massProperty
   * @param {Emitter} resetEmitter - broadcasts when the EnergySkateParkModel has been reset
   * @param {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
   * @param {Tandem} tandem
   */
  constructor( massProperty, resetEmitter, listParent, tandem ) {
    const labelValueList = [
      { label: controlsSkater1MassString, value: SkaterMasses.SKATER_1_MASS },
      { label: controlsSkater2MassString, value: SkaterMasses.SKATER_2_MASS },
      { label: controlsSkater3MassString, value: SkaterMasses.SKATER_3_MASS },
      { label: controlsSkater4MassString, value: SkaterMasses.SKATER_4_MASS },
      { label: controlsSkater5MassString, value: SkaterMasses.SKATER_5_MASS },
      { label: controlsDogMassString, value: SkaterMasses.DOG_MASS }
    ];
    const comboBox = new PhysicalComboBox( massProperty, labelValueList, resetEmitter, listParent, tandem, {
      supportCustom: false
    } );

    super( comboBox, controlsSkaterString );
  }
}

energySkatePark.register( 'MassComboBox', MassComboBox );
export default MassComboBox;