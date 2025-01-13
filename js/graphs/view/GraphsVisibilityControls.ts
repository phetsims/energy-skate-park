// Copyright 2019-2025, University of Colorado Boulder

/**
 * The visibility controls for "Graphs" screen - controls for grid and reference height visibility moved to a different
 * panel to create more space in the ScreenView.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkVisibilityControls from '../../common/view/EnergySkateParkVisibilityControls.js';
import energySkatePark from '../../energySkatePark.js';
import GraphsModel from '../model/GraphsModel.js';

export default class GraphsVisibilityControls extends Panel {

  public constructor( model: GraphsModel, tandem: Tandem, options?: IntentionalAny ) {
    const content = new EnergySkateParkVisibilityControls( model, tandem, {
      showPieChartCheckbox: false,
      showSpeedCheckbox: false,
      showReferenceHeightCheckbox: true
    } );

    super( content, options );
  }
}

energySkatePark.register( 'GraphsVisibilityControls', GraphsVisibilityControls );