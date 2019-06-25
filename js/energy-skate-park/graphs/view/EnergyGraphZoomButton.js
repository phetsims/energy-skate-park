// Copyright 2019, University of Colorado Boulder

/**
 * Zoom buttons for the energy graphs in the Graphs screens.
 * 
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const ZoomButton = require( 'SCENERY_PHET/buttons/ZoomButton' );

  class EnergyGraphZoomButton extends ZoomButton {

    /**
     * @param {NumberProperty} scaleProperty - Property to change when pressing buttons
     * @param {Object} options
     */
    constructor( scaleProperty, options ) {

      options = _.extend( {
        in: true, // true: zoom-in button, false: zoom-out button
        scaleDelta: 1, // how much to change scaleProperty when zooming in or out

        scale: 0.4,
        baseColor: PhetColorScheme.PHET_LOGO_BLUE
      }, options );

      assert && assert( options.listener === undefined, 'EnergyGraphZoomButton sets listener' );

      if ( options.in ) {
        options.listener = () => {
          const currentScale = scaleProperty.get();
          scaleProperty.set( Math.min( currentScale + 1, scaleProperty.range.max ) );
        };
      }
      else {
        options.listener = () => {
          const currentScale = scaleProperty.get();
          scaleProperty.set( Math.max( currentScale - 1, scaleProperty.range.min ) );
        };
      }

      super( options );
    }
  }

  return energySkatePark.register( 'EnergyGraphZoomButton', EnergyGraphZoomButton );
} );