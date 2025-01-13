// Copyright 2025, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park. Includes a title and the
 * ComboBox.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import SkaterMasses from '../SkaterMasses.js';
import LabelledComboBox from './LabelledComboBox.js';
import PhysicalComboBox from './PhysicalComboBox.js';

const controlsSkaterStringProperty = EnergySkateParkStrings.skaterControls.labelStringProperty;
const controlsSkater1MassPatternStringProperty = EnergySkateParkStrings.skaterControls.skater1MassPatternStringProperty;
const controlsSkater2MassPatternStringProperty = EnergySkateParkStrings.skaterControls.skater2MassPatternStringProperty;
const controlsSkater3MassPatternStringProperty = EnergySkateParkStrings.skaterControls.skater3MassPatternStringProperty;
const controlsSkater4MassPatternStringProperty = EnergySkateParkStrings.skaterControls.skater4MassPatternStringProperty;
const controlsSkater5MassPatternStringProperty = EnergySkateParkStrings.skaterControls.skater5MassPatternStringProperty;
const controlsDogMassPatternStringProperty = EnergySkateParkStrings.skaterControls.dogMassPatternStringProperty;

class MassComboBox extends LabelledComboBox {

  /**
   * @param massProperty
   * @param userControlledProperty
   * @param resetEmitter - broadcasts when the EnergySkateParkModel has been reset
   * @param listParent - parent of the list, to make sure the list is on top other things in the vie
   * @param tandem
   */
  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, resetEmitter: Emitter, listParent: Node, tandem: Tandem ) {
    const labelValueList = [
      {
        label: getFormattedLabel( controlsSkater1MassPatternStringProperty, SkaterMasses.SKATER_1_MASS ),
        value: SkaterMasses.SKATER_1_MASS,
        tandemName: 'skater1MassItem'
      },
      {
        label: getFormattedLabel( controlsSkater2MassPatternStringProperty, SkaterMasses.SKATER_2_MASS ),
        value: SkaterMasses.SKATER_2_MASS,
        tandemName: 'skater2MassItem'
      },
      {
        label: getFormattedLabel( controlsSkater3MassPatternStringProperty, SkaterMasses.SKATER_3_MASS ),
        value: SkaterMasses.SKATER_3_MASS,
        tandemName: 'skater3MassItem'
      },
      {
        label: getFormattedLabel( controlsSkater4MassPatternStringProperty, SkaterMasses.SKATER_4_MASS ),
        value: SkaterMasses.SKATER_4_MASS,
        tandemName: 'skater4MassItem'
      },
      {
        label: getFormattedLabel( controlsSkater5MassPatternStringProperty, SkaterMasses.SKATER_5_MASS ),
        value: SkaterMasses.SKATER_5_MASS,
        tandemName: 'skater5MassItem'
      },
      {
        label: getFormattedLabel( controlsDogMassPatternStringProperty, SkaterMasses.DOG_MASS ),
        value: SkaterMasses.DOG_MASS,
        tandemName: 'dogMassItem'
      }
    ];
    const comboBox = new PhysicalComboBox( massProperty, userControlledProperty, labelValueList, resetEmitter, listParent, tandem, {
      supportCustom: false
    } );

    super( comboBox, controlsSkaterStringProperty, Tandem.OPT_OUT ); // tandem went to the combo box
  }
}

/**
 * Get the string that labels the mass value.
 */
const getFormattedLabel = ( patternString: TReadOnlyProperty<string>, value: number ): string => {
  return StringUtils.fillIn( patternString, {
    value: value
  } );
};


energySkatePark.register( 'MassComboBox', MassComboBox );
export default MassComboBox;