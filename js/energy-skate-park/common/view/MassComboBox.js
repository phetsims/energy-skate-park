// Copyright 2018-2020, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park. Includes a title and the
 * ComboBox.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import energySkatePark from '../../../energySkatePark.js';
import SkaterMasses from '../SkaterMasses.js';
import LabelledComboBox from './LabelledComboBox.js';
import PhysicalComboBox from './PhysicalComboBox.js';

const controlsSkaterString = energySkateParkStrings.controls.skater;
const controlsSkater1MassPatternString = energySkateParkStrings.controls.skater1MassPattern;
const controlsSkater2MassPatternString = energySkateParkStrings.controls.skater2MassPattern;
const controlsSkater3MassPatternString = energySkateParkStrings.controls.skater3MassPattern;
const controlsSkater4MassPatternString = energySkateParkStrings.controls.skater4MassPattern;
const controlsSkater5MassPatternString = energySkateParkStrings.controls.skater5MassPattern;
const controlsDogMassPatternString = energySkateParkStrings.controls.dogMassPattern;

class MassComboBox extends LabelledComboBox {

  /**
   * @param {NumberProperty} massProperty
   * @param {Emitter} resetEmitter - broadcasts when the EnergySkateParkModel has been reset
   * @param {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
   * @param {Tandem} tandem
   */
  constructor( massProperty, resetEmitter, listParent, tandem ) {
    const labelValueList = [
      {
        label: getFormattedLabel( controlsSkater1MassPatternString, SkaterMasses.SKATER_1_MASS ),
        value: SkaterMasses.SKATER_1_MASS
      },
      {
        label: getFormattedLabel( controlsSkater2MassPatternString, SkaterMasses.SKATER_2_MASS ),
        value: SkaterMasses.SKATER_2_MASS
      },
      {
        label: getFormattedLabel( controlsSkater3MassPatternString, SkaterMasses.SKATER_3_MASS ),
        value: SkaterMasses.SKATER_3_MASS
      },
      {
        label: getFormattedLabel( controlsSkater4MassPatternString, SkaterMasses.SKATER_4_MASS ),
        value: SkaterMasses.SKATER_4_MASS
      },
      {
        label: getFormattedLabel( controlsSkater5MassPatternString, SkaterMasses.SKATER_5_MASS ),
        value: SkaterMasses.SKATER_5_MASS
      },
      { label: getFormattedLabel( controlsDogMassPatternString, SkaterMasses.DOG_MASS ), value: SkaterMasses.DOG_MASS }
    ];
    const comboBox = new PhysicalComboBox( massProperty, labelValueList, resetEmitter, listParent, tandem, {
      supportCustom: false
    } );

    super( comboBox, controlsSkaterString );
  }
}

/**
 * Get the string that labels the mass value.
 * @param {string} patternString
 * @param {number} value
 * @returns {string}
 */
const getFormattedLabel = ( patternString, value ) => {
  return StringUtils.fillIn( patternString, {
    value: value
  } );
};


energySkatePark.register( 'MassComboBox', MassComboBox );
export default MassComboBox;