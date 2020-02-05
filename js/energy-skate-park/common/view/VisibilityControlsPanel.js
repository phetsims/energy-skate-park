// Copyright 2019, University of Colorado Boulder

/**
 * A separate panel just with EnergySkateParkVisibilityControls for this sim, used to save space when there are
 * already too many items in the EnergySkateParkControlPanel.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Panel = require( 'SUN/Panel' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );

  class VisibilityControlsPanel extends Panel {

    /**
     * @param {EnergySkateParkModel} model
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( model, tandem, options ) {
      const content = new EnergySkateParkVisibilityControls( model, tandem, {
        showPieChartCheckbox: false,
        showSpeedCheckbox: false,
        showGridCheckbox: true,
        showReferenceHeightCheckbox: true,

        itemOptions: {

          // i18n, smaller than default so that long labels don't occlude the grid labels in the GridNode
          labelMaxWidth: 75
        }
      } );

      super( content, options );
    }
  }

  return energySkatePark.register( 'VisibilityControlsPanel', VisibilityControlsPanel );
} );
