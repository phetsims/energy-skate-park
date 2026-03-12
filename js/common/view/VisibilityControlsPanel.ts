// Copyright 2019-2026, University of Colorado Boulder

/**
 * A separate panel just with EnergySkateParkVisibilityControls for this sim, used to save space when there are
 * already too many items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkVisibilityControls from './EnergySkateParkVisibilityControls.js';

type SelfOptions = EmptySelfOptions;
export type VisibilityControlsPanelOptions = SelfOptions & PanelOptions;

export default class VisibilityControlsPanel extends Panel {

  public constructor( model: EnergySkateParkModel, tandem: Tandem, providedOptions?: VisibilityControlsPanelOptions ) {
    const options = optionize4<VisibilityControlsPanelOptions, SelfOptions, PanelOptions>()(
      {},
      EnergySkateParkConstants.PANEL_OPTIONS,
      {
        tandem: tandem,
        visiblePropertyOptions: {
          phetioFeatured: true
        }
      },
      providedOptions
    );

    const content = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'checkboxGroup' ), {
      showPieChartCheckbox: false,
      showSpeedCheckbox: false,
      showGridCheckbox: true,
      showReferenceHeightCheckbox: true,
      phetioVisiblePropertyInstrumented: false
    } );

    super( content, options );
  }
}

energySkatePark.register( 'VisibilityControlsPanel', VisibilityControlsPanel );