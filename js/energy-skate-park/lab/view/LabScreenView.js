// Copyright 2018-2020, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkPlaygroundScreenView from '../../common/view/EnergySkateParkPlaygroundScreenView.js';

class LabScreenView extends EnergySkateParkPlaygroundScreenView {

  /**
   * @param {LabModel} model
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

    this.timeControlNode.left = this.modelViewTransform.modelToViewX( 0.5 );
    this.trackToolbox.right = this.modelViewTransform.modelToViewX( -0.5 );
    this.clearButton.right = this.trackToolbox.left - 10;
  }

  /**
   * Positions the pie chart legend in the correct location as the UI floats.
   *
   * @override
   */
  floatInterface() {
    super.floatInterface();

    // the pie chart legend is just to the right of the 5 meter mark, which is where grid labels are
    this.pieChartLegend.left = this.modelViewTransform.modelToViewX( -5 );
  }
}

energySkatePark.register( 'LabScreenView', LabScreenView );
export default LabScreenView;