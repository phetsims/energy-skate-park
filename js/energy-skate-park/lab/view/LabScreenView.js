// Copyright 2018-2020, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkPlaygroundScreenView from '../../common/view/EnergySkateParkPlaygroundScreenView.js';

class LabScreenView extends EnergySkateParkPlaygroundScreenView {

  /**
   * @param {EnergySkateParkLabModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    // parent for combo boxes - would use the ScreenView but `this` isn't available until after super call
    const comboBoxParent = new Node();

    super( model, tandem.createTandem( 'graphsScreenView' ), {
      controlPanelOptions: {
        showTrackButtons: false,
        visibilityControlsOptions: {
          showPieChartCheckbox: true,
          showGridCheckbox: false,
          showSpeedCheckbox: true,
          showStickToTrackCheckbox: true
        },
        massControlsOptions: {
          includeSkaterComboBox: true
        },
        gravityControlsOptions: {
          includeGravityComboBox: true
        }
      }
    } );

    this.addChild( comboBoxParent );

    // layout custom to the Lab screen
    this.clearButton.rightCenter = this.trackCreationPanel.leftCenter.minusXY( 10, 0 );

    // The eraser and trackCreationPanel are in one group on the left side of the screen view and the playback
    // controls are in another group on the right side - the centers of each group should be symmetric about
    // horizontal center of screen. We assume that the left group is already in the correct position (because track pan
    // is positioned by the model) so we need to position the right group (playback controls)
    const leftGroupBounds = this.clearButton.bounds.union( this.trackCreationPanel.bounds );
    const leftGroupCenter = leftGroupBounds.center;
    const distanceToScreenCenter = this.layoutBounds.center.x - leftGroupCenter.x;

    const spacing = 30;
    this.timeControlNode.centerX = this.layoutBounds.centerX + ( distanceToScreenCenter - spacing / 2 );
  }

  /**
   * Positions the pie chart legend in the correct location as the UI floats.
   *
   * @override
   * @param {number} width
   * @param {number} height
   */
  floatInterface() {
    super.floatInterface();

    // the pie chart legend is just to the right of the 5 meter mark, which is where grid labels are
    this.pieChartLegend.left = this.modelViewTransform.modelToViewX( -5 );
  }
}

energySkatePark.register( 'LabScreenView', LabScreenView );
export default LabScreenView;