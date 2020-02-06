// Copyright 2019-2020, University of Colorado Boulder

/**
 * The visibility controls for "Graphs" screen - controls for grid and reference height visibility moved to a different
 * panel to create more space in the ScreenView.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  const Panel = require( 'SUN/Panel' );

  class GraphsVisibilityControls extends Panel {

    /**
     * @param {GraphsModel} model
     * @param {GraphsScreenView} screenView
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( model, tandem, options ) {

      const content = new EnergySkateParkVisibilityControls( model, tandem, {
        showPieChartCheckbox: false,
        showSpeedCheckbox: false,
        showReferenceHeightCheckbox: true
      } );

      super( content, options );
    }
  }

  return energySkatePark.register( 'GraphsVisibilityControls', GraphsVisibilityControls );
} );
