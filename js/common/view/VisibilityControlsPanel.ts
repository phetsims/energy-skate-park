// Copyright 2019-2020, University of Colorado Boulder

/**
 * A separate panel just with EnergySkateParkVisibilityControls for this sim, used to save space when there are
 * already too many items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkVisibilityControls from './EnergySkateParkVisibilityControls.js';

class VisibilityControlsPanel extends Panel {

  public constructor( model: EnergySkateParkModel, tandem: Tandem, options?: IntentionalAny ) {
    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {}, EnergySkateParkConstants.PANEL_OPTIONS, options );

    const content = new EnergySkateParkVisibilityControls( model, tandem, {
      showPieChartCheckbox: false,
      showSpeedCheckbox: false,
      showGridCheckbox: true,
      showReferenceHeightCheckbox: true
    } );

    super( content, options );
  }
}

energySkatePark.register( 'VisibilityControlsPanel', VisibilityControlsPanel );
export default VisibilityControlsPanel;