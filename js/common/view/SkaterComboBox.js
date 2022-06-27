// Copyright 2020-2022, University of Colorado Boulder

/**
 * A ComboBox that selects an image for a Skater but has no other impact on physical state of the skater.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Text } from '../../../../scenery/js/imports.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import energySkatePark from '../../energySkatePark.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import LabelledComboBox from './LabelledComboBox.js';
import SkaterImages from './SkaterImages.js';

const controlsSkaterString = energySkateParkStrings.skaterControls.label;
const controlsSkater1String = energySkateParkStrings.skaterControls.skater1;
const controlsSkater2String = energySkateParkStrings.skaterControls.skater2;
const controlsSkater3String = energySkateParkStrings.skaterControls.skater3;
const controlsSkater4String = energySkateParkStrings.skaterControls.skater4;
const controlsSkater5String = energySkateParkStrings.skaterControls.skater5;
const controlsDogString = energySkateParkStrings.skaterControls.dog;

class SkaterComboBox extends LabelledComboBox {

  /**
   * @param {EnumerationDeprecatedProperty} skaterImageSetProperty - one of SkaterImages.SkaterImageSet
   * @param {Node} listParent - parent Node for the ComboBox
   * @param {Tandem} tandem
   */
  constructor( skaterImageSetProperty, listParent, tandem ) {
    const itemList = [
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet1, node: new Text( controlsSkater1String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) },
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet2, node: new Text( controlsSkater2String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) },
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet3, node: new Text( controlsSkater3String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) },
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet4, node: new Text( controlsSkater4String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) },
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet5, node: new Text( controlsSkater5String, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) },
      { value: SkaterImages.SkaterCharacterSets[ 0 ].imageSet6, node: new Text( controlsDogString, EnergySkateParkConstants.COMBO_BOX_ITEM_OPTIONS ) }
    ];

    const options = merge( {
      tandem: tandem.createTandem( 'comboBox' )
    }, EnergySkateParkConstants.COMBO_BOX_OPTIONS );

    // i18n - if the text gets scaled way down, make sure that the button corner radii aren't larger than content height
    const maxItemHeight = _.maxBy( itemList, item => item.node.height ).node.height;
    options.cornerRadius = Math.min( options.cornerRadius, maxItemHeight / 2 );

    const comboBox = new ComboBox( skaterImageSetProperty, itemList, listParent, options );

    super( comboBox, controlsSkaterString );
  }
}

energySkatePark.register( 'SkaterComboBox', SkaterComboBox );
export default SkaterComboBox;