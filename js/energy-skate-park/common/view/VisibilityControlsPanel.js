// Copyright 2019, University of Colorado Boulder

/**
 * A separate panel just with VisibilityControls for this sim, used to save space when there are already too many
 * items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Panel = require( 'SUN/Panel' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );

  // constants

  class VisibilityControlsPanel extends Panel {

    /**
     * @param   {EnergySkateParkModel} model
     * @param   {Tandem} tandem
     * @param   {Object} options
     */
    constructor( model, tandem, options ) {
      const content = new EnergySkateParkVisibilityControls( model, tandem, {
        showPieChartCheckbox: false,
        showBarGraphCheckbox: false,
        showSpeedCheckbox: false,
        showReferenceHeightCheckbox: true
      } );

      super( content, options );
    }
  }

  return energySkatePark.register( 'VisibilityControlsPanel', VisibilityControlsPanel );
} );
