// Copyright 2019-2020, University of Colorado Boulder

/**
 * Zoom buttons for the energy graphs in the Graphs screens.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import ZoomButton from '../../../../scenery-phet/js/buttons/ZoomButton.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import energySkatePark from '../../energySkatePark.js';

class EnergyGraphZoomButton extends ZoomButton {

  /**
   * @param {NumberProperty} scaleProperty - Property to change when pressing buttons
   * @param {Object} [options]
   */
  constructor( scaleProperty, options ) {

    options = merge( {
      in: true, // true: zoom-in button, false: zoom-out button
      scaleDelta: 1, // how much to change scaleProperty when zooming in or out
      radius: 6,
      xMargin: 4,
      yMargin: 4,
      touchAreaXDilation: 3,
      touchAreaYDilation: 3,

      baseColor: PhetColorScheme.PHET_LOGO_BLUE
    }, options );

    assert && assert( options.listener === undefined, 'EnergyGraphZoomButton sets listener' );

    if ( options.in ) {
      options.listener = () => {
        const currentScale = scaleProperty.get();
        scaleProperty.set( Math.max( currentScale - options.scaleDelta, scaleProperty.range.min ) );
      };
    }
    else {
      options.listener = () => {
        const currentScale = scaleProperty.get();
        scaleProperty.set( Math.min( currentScale + options.scaleDelta, scaleProperty.range.max ) );
      };
    }

    super( options );
  }
}

energySkatePark.register( 'EnergyGraphZoomButton', EnergyGraphZoomButton );
export default EnergyGraphZoomButton;