// Copyright 2020, University of Colorado Boulder

/**
 * A ComboBox that selects a an image for a Skater but has no other impact on physical state of the skater.
 * @author Jesse Greenberg
 */

import merge from '../../../../../phet-core/js/merge.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../../sun/js/ComboBoxItem.js';
import energySkateParkStrings from '../../../energy-skate-park-strings.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import LabelledComboBox from './LabelledComboBox.js';
import SkaterNode from './SkaterNode.js';

const controlsSkaterString = energySkateParkStrings.controls.skater;
const controlsSkater1String = energySkateParkStrings.controls.skater1;
const controlsSkater2String = energySkateParkStrings.controls.skater2;
const controlsSkater3String = energySkateParkStrings.controls.skater3;
const controlsSkater4String = energySkateParkStrings.controls.skater4;
const controlsSkater5String = energySkateParkStrings.controls.skater5;
const controlsDogString = energySkateParkStrings.controls.dog;

class SkaterComboBox extends LabelledComboBox {

  /**
   * @param {EnumerationProperty} skaterImageProperty - one of SkaterNode.SkaterImage
   * @param {Node} listParent - parent Node for the ComboBox
   * @param {Tandem} tandem
   */
  constructor( skaterImageProperty, listParent, tandem ) {
    const itemList = [
      new ComboBoxItem( new Text( controlsSkater1String, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_1 ),
      new ComboBoxItem( new Text( controlsSkater2String, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_2 ),
      new ComboBoxItem( new Text( controlsSkater3String, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_3 ),
      new ComboBoxItem( new Text( controlsSkater4String, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_4 ),
      new ComboBoxItem( new Text( controlsSkater5String, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_5 ),
      new ComboBoxItem( new Text( controlsDogString, Constants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.DOG )
    ];

    const comboBox = new ComboBox( itemList, skaterImageProperty, listParent, merge( {
      tandem: tandem.createTandem( 'comboBox' )
    }, Constants.COMBO_BOX_OPTIONS ) );

    super( comboBox, controlsSkaterString );
  }
}

energySkatePark.register( 'SkaterComboBox', SkaterComboBox );
export default SkaterComboBox;