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
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Spacer = require( 'SCENERY/nodes/Spacer' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  const controlsSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.skater' );

  class MassComboBox extends VBox {

    /**
     * @param {NumberProperty} massProperty
     * @param {Emitter} resetEmitter
     * @param {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( massProperty, resetEmitter, listParent, width, tandem, options ) {
      super( { spacing: 5 } );

      // TODO: These labels are temporary and will be replaced by images
      const labelValueList = [
        { label: 'Skater 1 (60 kg)', value: SkaterMasses.PHET_SKATER_MASS },
        { label: 'Star Skater', value: SkaterMasses.STAR_SKATER_MASS },
        { label: 'Bulldog', value: SkaterMasses.BULLDOG_MASS },
        { label: 'Bug', value: SkaterMasses.BUG_MASS },
        { label: 'Ball', value: SkaterMasses.BALL_MASS }
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
