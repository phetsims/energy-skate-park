// Copyright 2018-2021, University of Colorado Boulder

/**
 * ScreenView for the Intro Screen of Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';

class IntroScreenView extends EnergySkateParkTrackSetScreenView {

  /**
   * @param {EnergySkateParkFullTrackSetModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( model, tandem, {
      controlPanelOptions: {
        showMassControls: true,
        gravityControlsOptions: {
          includeGravityNumberControl: false,
          includeGravitySlider: true
        },
        visibilityControlsOptions: {
          showStickToTrackCheckbox: true,
          showSkaterPathCheckbox: true
        }
      }
    } );
  }
}

energySkatePark.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;