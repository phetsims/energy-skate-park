// Copyright 2018-2020, University of Colorado Boulder

/**
 * View for the graphs screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import GraphsConstants from '../GraphsConstants.js';
import EnergyGraphAccordionBox from './EnergyGraphAccordionBox.js';

/**
 * @constructor
 * @param {GraphsModel} model
 */
class GraphsScreenView extends EnergySkateParkTrackSetScreenView {

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    // parent layer for ComboBox, would use "this" but it is not available until after super
    const comboBoxParent = new Node();

    super( model, tandem.createTandem( 'graphsScreenView' ), {
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

    // @private - for layout
    this.graphAccordionBox = new EnergyGraphAccordionBox( model, this.modelViewTransform, tandem.createTandem( 'graphAccordionBox' ) );
    this.addToBottomLayer( this.graphAccordionBox );
  }

  /**
   * Special layout for the energy-skate-park, contents can float to the available bounds.
   * @override
   */
  floatInterface() {
    super.floatInterface();

    // the graph within the accordion box needs to line up with the track so that skater positions on the
    // track align perfectly with positions along the graph
    this.graphAccordionBox.right = this.trackLayer.right + EnergyGraphAccordionBox.GRAPH_OFFSET;
    this.graphAccordionBox.top = this.controlPanel.top;

    // special layout for the speedometer in this screen
    this.speedometerNode.left = this.graphAccordionBox.left;
    this.speedometerNode.top = this.modelViewTransform.modelToViewY( GraphsConstants.TRACK_HEIGHT );
  }
}

energySkatePark.register( 'GraphsScreenView', GraphsScreenView );
export default GraphsScreenView;