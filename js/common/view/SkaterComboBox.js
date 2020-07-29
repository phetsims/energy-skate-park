// Copyright 2020, University of Colorado Boulder

/**
 * A ComboBox that selects a an image for a Skater but has no other impact on physical state of the skater.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import LabelledComboBox from './LabelledComboBox.js';
import SkaterNode from './SkaterNode.js';

const controlsSkaterString = energySkateParkStrings.skaterControls.label;
const controlsSkater1String = energySkateParkStrings.skaterControls.skater1;
const controlsSkater2String = energySkateParkStrings.skaterControls.skater2;
const controlsSkater3String = energySkateParkStrings.skaterControls.skater3;
const controlsSkater4String = energySkateParkStrings.skaterControls.skater4;
const controlsSkater5String = energySkateParkStrings.skaterControls.skater5;
const controlsDogString = energySkateParkStrings.skaterControls.dog;

class SkaterComboBox extends LabelledComboBox {

  /**
   * @param {EnumerationProperty} skaterImageProperty - one of SkaterNode.SkaterImage
   * @param {Node} listParent - parent Node for the ComboBox
   * @param {Tandem} tandem
   */
  constructor( skaterImageProperty, listParent, tandem ) {
    const itemList = [
      new ComboBoxItem( new Text( controlsSkater1String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_1 ),
      new ComboBoxItem( new Text( controlsSkater2String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_2 ),
      new ComboBoxItem( new Text( controlsSkater3String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_3 ),
      new ComboBoxItem( new Text( controlsSkater4String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_4 ),
      new ComboBoxItem( new Text( controlsSkater5String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.SKATER_5 ),
      new ComboBoxItem( new Text( controlsDogString, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ), SkaterNode.SkaterImage.DOG )
    ];

    const options = merge( {
      tandem: tandem.createTandem( 'comboBox' )
    }, EnergySkateParkConstants.COMBO_BOX_OPTIONS );

    // i18n - if the text gets scaled way down, make sure that the button corner radii aren't larger than content height
    const maxItemHeight = _.maxBy( itemList, item => item.node.height ).node.height;
    options.cornerRadius = Math.min( options.cornerRadius, maxItemHeight / 2 );

    const comboBox = new ComboBox( itemList, skaterImageProperty, listParent, options );

    super( comboBox, controlsSkaterString );
  }
}

energySkatePark.register( 'SkaterComboBox', SkaterComboBox );
export default SkaterComboBox;