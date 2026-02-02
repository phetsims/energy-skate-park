// Copyright 2020-2026, University of Colorado Boulder

/**
 * Collection of controls for EnergySkateParkControlPanel that pertain to Skater mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import { ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import MassNumberControl from './MassNumberControl.js';
import MassSlider from './MassSlider.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';

type SelfOptions = {
  // whether a MassNumberControl is included in this set of controls, only a MassNumberControl
  // OR a MassSlider can be used at one time
  includeMassNumberControl?: boolean;

  // whether a MassNumberControl is included in this set of controls
  includeMassSlider?: boolean;

  // options passed along to the MassNumberControl, if one is included
  massNumberControlOptions?: NumberControlOptions | null;

  // options passed along to the MassComboBox, if one is included
  massComboBoxOptions?: ComboBoxOptions | null;
};

export type EnergySkateParkMassControlsOptions = SelfOptions;

export default class EnergySkateParkMassControls extends VBox {

  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, tandem: Tandem, providedOptions?: EnergySkateParkMassControlsOptions ) {

    const options = optionize<EnergySkateParkMassControlsOptions, SelfOptions>()( {
      includeMassNumberControl: true,
      includeMassSlider: false,
      massNumberControlOptions: null,
      massComboBoxOptions: null
    }, providedOptions );
    affirm( !( options.includeMassSlider && options.includeMassNumberControl ), 'only MassSlider OR MassNumberControl can be used at one time' );

    const children = [];

    let massNumberControl = null;
    if ( options.includeMassNumberControl ) {
      massNumberControl = new MassNumberControl( massProperty, userControlledProperty, massRange, tandem.createTandem( 'massNumberControl' ) );
      children.push( massNumberControl );
    }

    let massSlider = null;
    if ( options.includeMassSlider ) {

      massSlider = new MassSlider( massProperty, userControlledProperty, massRange, tandem.createTandem( 'massNumberControl' ) );
      children.push( massSlider );
    }

    super( { spacing: 8, children: children } );
  }
}

energySkatePark.register( 'EnergySkateParkMassControls', EnergySkateParkMassControls );