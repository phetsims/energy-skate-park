// Copyright 2018-2025, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import energySkatePark from '../../energySkatePark.js';
import GraphsConstants from '../GraphsConstants.js';
import GraphsModel from '../model/GraphsModel.js';
import EnergyGraphAccordionBox from './EnergyGraphAccordionBox.js';

export default class GraphsScreenView extends EnergySkateParkTrackSetScreenView {

  // For layout
  private readonly graphAccordionBox: EnergyGraphAccordionBox;

  public constructor( model: GraphsModel, tandem: Tandem ) {

    // parent layer for ComboBox, would use "this" but it is not available until after super
    const comboBoxParent = new Node();

    super( model, tandem, {
      drawSkaterPath: false,
      showBarGraph: false,
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

    this.graphAccordionBox = new EnergyGraphAccordionBox( model, this.modelViewTransform, tandem.createTandem( 'graphAccordionBox' ), this );
    this.addToBottomLayer( this.graphAccordionBox );

    this.pdomControlAreaNode.pdomOrder = [
      this.graphAccordionBox,
      this.graphAccordionBox.variableSwitch,
      this.graphAccordionBox.eraserButton,
      ...this.pdomControlAreaNode.pdomOrder!
    ];
  }

  /**
   * Special layout for the energy-skate-park, contents can float to the available bounds.
   */
  public override layout( viewBounds: Bounds2 ): void {
    super.layout( viewBounds );

    // the graph within the accordion box needs to line up with the right edge of the track and grid lines so that
    // skater positions on track align perfectly with positions along the graph
    this.graphAccordionBox.right = this.modelViewTransform.modelToViewX( 5 ) + this.graphAccordionBox.getContentRight();
    this.graphAccordionBox.top = this.controlPanel.top;

    // special layout for the speedometer in this screen
    this.speedometerNode.left = this.graphAccordionBox.left;
    this.speedometerNode.top = this.modelViewTransform.modelToViewY( GraphsConstants.TRACK_HEIGHT );
  }
}

energySkatePark.register( 'GraphsScreenView', GraphsScreenView );