// Copyright 2020, University of Colorado Boulder

/**
 * A ComboBox that selects a an image for a Skater but has no other impact on physical state of the skater.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const ComboBox = require( 'SUN/ComboBox' );
  const SkaterNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/SkaterNode' );
  const LabelledComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/LabelledComboBox' );
  const merge = require( 'PHET_CORE/merge' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const controlsSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.skater' );
  const controlsSkater1String = require( 'string!ENERGY_SKATE_PARK/controls.skater1' );
  const controlsSkater2String = require( 'string!ENERGY_SKATE_PARK/controls.skater2' );
  const controlsSkater3String = require( 'string!ENERGY_SKATE_PARK/controls.skater3' );
  const controlsSkater4String = require( 'string!ENERGY_SKATE_PARK/controls.skater4' );
  const controlsSkater5String = require( 'string!ENERGY_SKATE_PARK/controls.skater5' );
  const controlsDogString = require( 'string!ENERGY_SKATE_PARK/controls.dog' );

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

  return energySkatePark.register( 'SkaterComboBox', SkaterComboBox );
} );
