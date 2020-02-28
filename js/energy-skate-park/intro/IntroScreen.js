// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg
 */

import Screen from '../../../../joist/js/Screen.js';
import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconIntroHomescreen from '../../../images/icon-intro-homescreen_png.js';
import iconIntroNavbar from '../../../images/icon-intro-navbar_png.js';
import energySkateParkStrings from '../../energy-skate-park-strings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFullTrackSetModel from '../common/model/EnergySkateParkFullTrackSetModel.js';
import IntroScreenView from './view/IntroScreenView.js';

const screenIntroductionString = energySkateParkStrings.screen.introduction;

class IntroScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( tandem ) {
    const options = merge( {
      name: screenIntroductionString,
      tandem: tandem,
      homeScreenIcon: new Image( iconIntroHomescreen ),
      navigationScreenIcon: new Image( iconIntroNavbar )
    }, {} ); // REVIEW: should there be an options parameter to this constructor?

    super(
      () => new EnergySkateParkFullTrackSetModel( tandem.createTandem( 'model' ) ),
      model => new IntroScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );

  }
}

energySkatePark.register( 'IntroScreen', IntroScreen );
export default IntroScreen;