// Copyright 2020, University of Colorado Boulder

/**
 * A collection of controls for EnergySkateParkControlPanel that pertain to gravity.
 *
 * @author Jesse Greenberg
 */

import merge from '../../../../../phet-core/js/merge.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import energySkatePark from '../../../energySkatePark.js';
import GravityComboBox from './GravityComboBox.js';
import GravityNumberControl from './GravityNumberControl.js';
import GravitySlider from './GravitySlider.js';

class EnergySkateParkGravityControls extends VBox {

  /**
   * @param {NumberProperty} gravityProperty // REVIEW: Name this gravityMagnitudeProperty to indicate it is unsigned
   * @param {Emitter} resetEmitter - broadcasts a message when the EnergySkateParkModel is reset
   * @param {Node} listParent - parent Node for the ComboBox, if one is included
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( gravityProperty, resetEmitter, listParent, tandem, options ) {

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

    // REVIEW: These local "let" variables should be deleted.
    let gravityNumberControl = null;
    if ( options.includeGravityNumberControl ) {
      gravityNumberControl = new GravityNumberControl( gravityProperty, tandem.createTandem( 'gravityNumberControl' ), options.gravityComboBoxOptions );
      children.push( gravityNumberControl );
    }

    let gravitySlider = null;
    if ( options.includeGravitySlider ) {
      gravitySlider = new GravitySlider( gravityProperty, tandem.createTandem( 'gravitySlider' ) );
      children.push( gravitySlider );
    }

    let gravityComboBox = null;
    if ( options.includeGravityComboBox ) {
      gravityComboBox = new GravityComboBox( gravityProperty, resetEmitter, listParent, tandem.createTandem( 'gravityComboBox' ), options );
      children.push( gravityComboBox );
    }

    super( { resize: false, spacing: 8, children: children } );
  }
}

energySkatePark.register( 'EnergySkateParkGravityControls', EnergySkateParkGravityControls );
export default EnergySkateParkGravityControls;