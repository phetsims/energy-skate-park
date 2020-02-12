// Copyright 2018-2019, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park. Includes a title and the
 * ComboBox.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const PhysicalComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalComboBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const merge = require( 'PHET_CORE/merge' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Spacer = require( 'SCENERY/nodes/Spacer' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  const controlsSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.skater' );
  const controlsSkater1MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater1Mass' );
  const controlsSkater2MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater2Mass' );
  const controlsSkater3MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater3Mass' );
  const controlsSkater4MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater4Mass' );
  const controlsSkater5MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater5Mass' );
  const controlsDogMassString = require( 'string!ENERGY_SKATE_PARK/controls.dogMass' );

  class MassComboBox extends VBox {

    /**
     * @param {NumberProperty} massProperty
     * @param {Emitter} resetEmitter
     * @param {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( massProperty, resetEmitter, listParent, width, tandem, options ) {

      options = merge( {

        // only defined values are supported by MassComboBox
        supportCustom: false,

        spacing: 5
      }, options );
      super( options );

      // TODO: These labels are temporary and will be replaced by images
      const labelValueList = [
        { label: controlsSkater1MassString, value: SkaterMasses.SKATER_1_MASS },
        { label: controlsSkater2MassString, value: SkaterMasses.SKATER_2_MASS },
        { label: controlsSkater3MassString, value: SkaterMasses.SKATER_3_MASS },
        { label: controlsSkater4MassString, value: SkaterMasses.SKATER_4_MASS },
        { label: controlsSkater5MassString, value: SkaterMasses.SKATER_5_MASS },
        { label: controlsDogMassString, value: SkaterMasses.DOG_MASS }
      ];
      this.comboBox = new PhysicalComboBox( massProperty, labelValueList, resetEmitter, listParent, tandem, options );

      this.titleNode = new Text( controlsSkaterString, {
        font: Constants.CONTROL_TITLE_FONT,
        maxWidth: this.comboBox.width / 2
      } );

      this.children = [ this.titleNode, this.comboBox ];
    }

    /**
     * Adjust the layout of the ComboBox and title to match the width of other controls in a context. The title
     * will be left aligned with extra spacing to the right so that the title aligns with other controls. The
     * ComboBox remains center aligned.
     * @public
     *
     * @param {number} width - width of other controls to match, so that titleNode can align with other controls.
     */
    matchLayout( width ) {
      const spacer = new Spacer( width - this.titleNode.width, 0 );
      spacer.leftCenter = this.titleNode.rightCenter;
      const titleWithSpacer = new Node( { children: [ this.titleNode, spacer ] } );

      this.children = [ titleWithSpacer, this.comboBox ];
    }
  }

  return energySkatePark.register( 'MassComboBox', MassComboBox );
} );
