// Copyright 2020-2023, University of Colorado Boulder

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
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import MassComboBox from './MassComboBox.js';
import MassNumberControl from './MassNumberControl.js';
import MassSlider from './MassSlider.js';

class EnergySkateParkMassControls extends VBox {
  private readonly massComboBox: MassComboBox | null;

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
  public constructor( massProperty: NumberProperty, userControlledProperty: BooleanProperty, massRange: Range, skaterImageSetProperty: Property<IntentionalAny>, resetEmitter: Emitter, listParent: Node, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {boolean} whether or not a MassNumberControl is included in this set of controls, only a MassNumberControl
      // OR a MassSlider can be used at one time
      includeMassNumberControl: true,

      // {boolean} whether or not a MassNumberControl is included in this set of controls
      includeMassSlider: false,

      // {boolean} whether or not a MassComboBox is included in this set of controls
      includeMassComboBox: false,

      // {Object|null} - options passed along to the MassNumberControl, if one is included
      massNumberControlOptions: null,

      // {Object|null} - options passed along to the MassComboBox, if one is included
      massComboBoxOptions: null
    }, options );
    assert && assert( !( options.includeMassSlider && options.includeMassNumberControl ), 'only MassSlider OR MassNumberControl can be used at one time' );

    const children = [];

    let massComboBox = null;
    if ( options.includeMassComboBox ) {
      massComboBox = new MassComboBox( massProperty, userControlledProperty, resetEmitter, listParent, tandem.createTandem( 'massComboBox' ) );
      children.push( massComboBox );
    }

    let massNumberControl = null;
    if ( options.includeMassNumberControl ) {
      // @ts-expect-error
      massNumberControl = new MassNumberControl( massProperty, userControlledProperty, massRange, tandem.createTandem( 'massNumberControl' ) );
      children.push( massNumberControl );
    }

    let massSlider = null;
    if ( options.includeMassSlider ) {

      massSlider = new MassSlider( massProperty, userControlledProperty, massRange, tandem.createTandem( 'massNumberControl' ) );
      children.push( massSlider );
    }

    super( { spacing: 8, children: children } );

    this.massComboBox = massComboBox;
  }

  /**
   * Set the width of the component to match the width of other controls in a containing control panel.
   */
  public matchLayout( width: number ): void {
    if ( this.massComboBox ) {
      this.massComboBox.matchLayout( width );
    }
  }
}

energySkatePark.register( 'EnergySkateParkMassControls', EnergySkateParkMassControls );
export default EnergySkateParkMassControls;