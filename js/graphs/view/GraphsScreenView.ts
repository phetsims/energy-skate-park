// Copyright 2018-2026, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkScreenSummaryContent from '../../common/view/EnergySkateParkScreenSummaryContent.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import GraphsConstants from '../GraphsConstants.js';
import GraphsModel from '../model/GraphsModel.js';
import EnergyGraphAccordionBox from './EnergyGraphAccordionBox.js';

export default class GraphsScreenView extends EnergySkateParkTrackSetScreenView {

  // For layout
  private readonly energyGraphAccordionBox: EnergyGraphAccordionBox;

  public constructor( model: GraphsModel, tandem: Tandem ) {

    // parent layer for ComboBox, would use "this" but it is not available until after super
    const comboBoxParent = new Node();

    super( model, tandem, {
      screenSummaryContent: new EnergySkateParkScreenSummaryContent( model, 'graphs' ),
      drawSkaterPath: false,
      controlPanelOptions: {
        visibilityControlsOptions: {
          showPieChartCheckbox: false,
          showGridCheckbox: false,
          showSpeedCheckbox: true,
          showStickToTrackCheckbox: true
        },
        gravityControlsOptions: {
          includeGravityComboBox: true
        }
      }
    } );

    this.addChild( comboBoxParent );

    this.energyGraphAccordionBox = new EnergyGraphAccordionBox( model, this.modelViewTransform, tandem.createTandem( 'energyGraphAccordionBox' ), this );
    this.addToBottomLayer( this.energyGraphAccordionBox );

    // Place the energy graph accordion box and its controls before the speedometer,
    // see https://github.com/phetsims/energy-skate-park/issues/447
    this.playAreaLowerExtraContent.pdomOrder = [
      this.energyGraphAccordionBox,
      this.energyGraphAccordionBox.variableSwitch,
      this.energyGraphAccordionBox.eraserButton
    ];
  }

  /**
   * Special layout for the energy-skate-park, contents can float to the available bounds.
   */
  public override layout( viewBounds: Bounds2 ): void {
    super.layout( viewBounds );

    // the graph within the accordion box needs to line up with the right edge of the track and grid lines so that
    // skater positions on track align perfectly with positions along the graph
    this.energyGraphAccordionBox.right = this.modelViewTransform.modelToViewX( 5 ) + this.energyGraphAccordionBox.getContentRight();
    this.energyGraphAccordionBox.top = this.controlPanel.top;

    // special layout for the speedometer in this screen
    this.speedometerNode.left = this.energyGraphAccordionBox.left;
    this.speedometerNode.top = this.modelViewTransform.modelToViewY( GraphsConstants.TRACK_HEIGHT );
  }
}
