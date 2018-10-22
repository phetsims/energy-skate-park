// Copyright 2018, University of Colorado Boulder

/**
 * A panel that will contain an icon for a tape measure. When the icon is dragged, it will forward the event
 * to the tape measure used by the view so it can be dragged.
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  // const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const MeasuringTapeNode = require( 'SCENERY_PHET/MeasuringTapeNode' );
  const Panel = require( 'SUN/Panel' );

  class MeasuringTapePanel extends Panel {

    /**
     * @param {Object} options
     */
    constructor( measuringTapeNode, measuringTapeVisibleProperty, options ) {
      // TODO: remove?
      options = _.extend( {
        lineWidth: 0,
        fill: EnergySkateParkColorScheme.panelFill
      }, options );

      let measuringTapeIcon = MeasuringTapeNode.createIcon( { scale: 0.75 } );

      super( measuringTapeIcon, options );
    }
  }

  return energySkatePark.register( 'MeasuringTapePanel', MeasuringTapePanel );
} );
