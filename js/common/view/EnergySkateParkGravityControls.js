// Copyright 2020, University of Colorado Boulder

/**
 * A collection of controls for EnergySkateParkControlPanel that pertain to gravity.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import energySkatePark from '../../energySkatePark.js';
import GravityComboBox from './GravityComboBox.js';
import GravityNumberControl from './GravityNumberControl.js';
import GravitySlider from './GravitySlider.js';

class EnergySkateParkGravityControls extends VBox {

  /**
   * @param {NumberProperty} gravityMagnitudeProperty
   * @param {BooleanProperty} userControlledProperty
   * @param {Emitter} resetEmitter - broadcasts a message when the EnergySkateParkModel is reset
   * @param {Node} listParent - parent Node for the ComboBox, if one is included
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( gravityMagnitudeProperty, userControlledProperty, resetEmitter, listParent, tandem, options ) {

    options = merge( {

      // {boolean} - whether or not a GravitySlider is included in this set of controls, only GravitySlider or
      // GravityNumberControl can be used at one time
      includeGravitySlider: false,

      // {boolean} - whether or not a GravityNumberControl is included in this set of controls, only GravitySlider
      // or GravityNumberControl can be used at one time
      includeGravityNumberControl: true,

      // {boolean} - whether or not a GravityComboBox is included in this set of controls
      includeGravityComboBox: false,

      // {Object} - options passed to the GravityNumberControl, if one is included
      gravityNumberControlOptions: null,

      // {Object} - options passed to the GravityComboBox, if one is included
      gravityComboBoxOptions: null,

      // {Object} - options passed to the GravitySlider, if one is included
      gravitySliderOptions: null
    }, options );
    assert && assert( !( options.includeGravitySlider && options.includeGravityNumberControl ), 'only GravitySlider OR GravityNumberControl can be used at one time' );

    const children = [];

    if ( options.includeGravityNumberControl ) {
      const gravityNumberControl = new GravityNumberControl( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravityNumberControl' ), options.gravityComboBoxOptions );
      children.push( gravityNumberControl );
    }

    if ( options.includeGravitySlider ) {
      const gravitySlider = new GravitySlider( gravityMagnitudeProperty, userControlledProperty, tandem.createTandem( 'gravitySlider' ) );
      children.push( gravitySlider );
    }

    if ( options.includeGravityComboBox ) {
      const gravityComboBox = new GravityComboBox( gravityMagnitudeProperty, userControlledProperty, resetEmitter, listParent, tandem.createTandem( 'gravityComboBox' ), options );
      children.push( gravityComboBox );
    }

    super( { resize: false, spacing: 8, children: children } );
  }
}

energySkatePark.register( 'EnergySkateParkGravityControls', EnergySkateParkGravityControls );
export default EnergySkateParkGravityControls;