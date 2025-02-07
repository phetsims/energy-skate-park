// Copyright 2020-2025, University of Colorado Boulder

/**
 * Collection of controls for EnergySkateParkControlPanel that pertain to Skater mass.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import MassNumberControl from './MassNumberControl.js';
import MassSlider from './MassSlider.js';

type SelfOptions = {
  // whether or not a MassNumberControl is included in this set of controls, only a MassNumberControl
  // OR a MassSlider can be used at one time
  includeMassNumberControl?: boolean;

  // whether or not a MassNumberControl is included in this set of controls
  includeMassSlider?: boolean;

  // options passed along to the MassNumberControl, if one is included
  massNumberControlOptions?: IntentionalAny | null;

  // options passed along to the MassComboBox, if one is included
  massComboBoxOptions?: IntentionalAny | null;
};

export type EnergySkateParkMassControlsOptions = SelfOptions;

export default class EnergySkateParkMassControls extends VBox {

  /**
   * @param massProperty
   * @param userControlledProperty
   * @param massRange - allowable range for the Skater mass
   * @param skaterImageSetProperty - controls the current image for the SkaterNode
   * @param resetEmitter - broadcasts when EnergySkateParkModel has been reset
   * @param listParent - parent Node for the ComboBox, if one is included
   * @param tandem
   * @param [options]
   */
  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, skaterImageSetProperty: Property<IntentionalAny>, resetEmitter: Emitter, listParent: Node, tandem: Tandem, providedOptions?: EnergySkateParkMassControlsOptions ) {

    const options = optionize<EnergySkateParkMassControlsOptions, SelfOptions>()( {
      includeMassNumberControl: true,
      includeMassSlider: false,
      massNumberControlOptions: null,
      massComboBoxOptions: null
    }, providedOptions );
    assert && assert( !( options.includeMassSlider && options.includeMassNumberControl ), 'only MassSlider OR MassNumberControl can be used at one time' );

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