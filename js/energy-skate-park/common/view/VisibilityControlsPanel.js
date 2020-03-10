// Copyright 2019-2020, University of Colorado Boulder

/**
 * A separate panel just with EnergySkateParkVisibilityControls for this sim, used to save space when there are
 * already too many items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Panel from '../../../../../sun/js/Panel.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkVisibilityControls from './EnergySkateParkVisibilityControls.js';

class VisibilityControlsPanel extends Panel {

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    const content = new EnergySkateParkVisibilityControls( model, tandem, {
      showPieChartCheckbox: false,
      showSpeedCheckbox: false,
      showGridCheckbox: true,
      showReferenceHeightCheckbox: true,

      itemOptions: {

        // i18n, smaller than default so that long labels don't occlude the grid labels in the GridNode
        labelMaxWidth: 75
      }
    } );

    super( content, options );
  }
}

energySkatePark.register( 'VisibilityControlsPanel', VisibilityControlsPanel );
export default VisibilityControlsPanel;