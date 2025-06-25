// Copyright 2020-2025, University of Colorado Boulder

/**
 * A ComboBox with a label for the EnergySkateParkControlPanel. The layout of this type is meant to match
 * other controls in the EnergySkateParkControlPanel, and so layout is set with matchLayout(). See that
 * function for more information.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Spacer from '../../../../scenery/js/nodes/Spacer.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';

export default class LabelledComboBox extends VBox {
  private readonly titleNode: Text;

  public constructor( private readonly comboBox: ComboBox<IntentionalAny>, titleString: TReadOnlyProperty<string>, tandem: Tandem ) {
    super( {
      spacing: 5
    } );

    this.titleNode = new Text( titleString, {
      font: EnergySkateParkConstants.CONTROL_TITLE_FONT,
      maxWidth: this.comboBox.width / 2
    } );

    // initial children, but layout probably needs to be specified with matchLayout()
    this.children = [ this.titleNode, this.comboBox ];
  }

  /**
   * Adjust the layout of the ComboBox and title to match the layout of other controls in the
   * EnergySkateParkControlPanel. The title will be left aligned with extra spacing to the right so
   * that the title aligns with other controls. The ComboBox remains center aligned.
   *
   * @param width - width of other controls to match, so that titleNode can align with other controls.
   */
  public matchLayout( width: number ): void {
    const spacer = new Spacer( width - this.titleNode.width, 0 );
    spacer.leftCenter = this.titleNode.rightCenter;
    const titleWithSpacer = new Node( { children: [ this.titleNode, spacer ] } );

    this.children = [ titleWithSpacer, this.comboBox ];
  }
}

energySkatePark.register( 'LabelledComboBox', LabelledComboBox );