// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import introScreenIcon from '../../images/intro-screen-icon_png.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import energySkatePark from '../energySkatePark.js';
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
      homeScreenIcon: new ScreenIcon( new Image( introScreenIcon ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } )
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