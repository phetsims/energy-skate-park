// Copyright 2020, University of Colorado Boulder

/**
 * Collection of controls for EnergySkateParkControlPanel that pertain to Skater mass.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const merge = require( 'PHET_CORE/merge' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const MassNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassNumberControl' );
  const MassSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassSlider' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class EnergySkateParkMassControls extends VBox {

    /**
     * @param {NumberProperty} massProperty
     * @param {Range} massRange - allowable range for the Skater mass
     * @param {[type]} resetEmitter - broadcasts when EnergySkateParkModel has been reset
     * @param {Node} listParent - parent Node for the ComboBox, if one is included
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( massProperty, massRange, resetEmitter, listParent, tandem, options ) {

      options = merge( {

        // {boolean} whether or not a MassNumberControl is included in this set of controls, only a MassNumberControl
        // OR a MassSlider can be used at one time
        includeMassNumberControl: true,

        // {boolean} whether or not a MassNumberControl is included in this set of controls
        includeMassSlider: false,

        // {boolean} whether or not a MassNumberControl is included in this set of controls
        includeMassComboBox: false,

        // {Object|null} - options passed along to the MassNumberControl, if one is included
        massNumberControlOptions: null,

        // {Object|null} - options passed along to the MassComboBox, if one is included
        massComboBoxOptions: null
      }, options );
      assert && assert( !( options.includeMassSlider && options.includeMassNumberControl ), 'only MassSlider OR MassNumberControl can be used at one time' );

      const children = [];

      let massNumberControl = null;
      if ( options.includeMassNumberControl ) {
        massNumberControl = new MassNumberControl( massProperty, massRange, tandem.createTandem( 'massNumberControl' ), options.massNumberControlOptions );
        children.push( massNumberControl );
      }

      let massSlider = null;
      if ( options.includeMassSlider ) {
        massSlider = new MassSlider( massProperty, massRange, tandem.createTandem( 'massSlider' ) );
        children.push( massSlider );
      }

      let massComboBox = null;
      if ( options.includeMassComboBox ) {
        massComboBox = new MassComboBox( massProperty, resetEmitter, listParent, tandem.createTandem( 'massComboBox' ), options.massComboBoxOptions );
        children.push( massComboBox );
      }

      super( { resize: false, spacing: 8, children: children } );
    }
  }

  return energySkatePark.register( 'EnergySkateParkMassControls', EnergySkateParkMassControls );
} );
