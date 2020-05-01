// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconIntroHomescreen from '../../../images/icon-intro-homescreen_png.js';
import iconIntroNavbar from '../../../images/icon-intro-navbar_png.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';

const screenIntroductionString = energySkateParkStrings.screens.intro;

class IntroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    const options = {
      name: screenIntroductionString,
      tandem: tandem,
      homeScreenIcon: new Image( iconIntroHomescreen ),
      navigationScreenIcon: new Image( iconIntroNavbar )
    };

    super(
      () => new IntroModel( tandem.createTandem( 'model' ) ),
      model => new IntroScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );

  }
}

energySkatePark.register( 'IntroScreen', IntroScreen );
export default IntroScreen;