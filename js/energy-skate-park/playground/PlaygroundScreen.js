// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconPlaygroundHomescreen from '../../../images/icon-playground-homescreen_png.js';
import iconPlaygroundNavbar from '../../../images/icon-playground-navbar_png.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkPlaygroundModel from './model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from './view/EnergySkateParkPlaygroundScreenView.js';

const screenPlaygroundString = energySkateParkStrings.screens.playground;

class PlaygroundScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: screenPlaygroundString,
      homeScreenIcon: new Image( iconPlaygroundHomescreen ),
      navigationBarIcon: new Image( iconPlaygroundNavbar ),

      tandem: tandem
    };

    super(
      () => new EnergySkateParkPlaygroundModel( tandem.createTandem( 'playgroundModel' ) ),
      model => new EnergySkateParkPlaygroundScreenView( model, tandem.createTandem( 'playgroundScreenView' ) ),
      options
    );
  }
}

energySkatePark.register( 'PlaygroundScreen', PlaygroundScreen );
export default PlaygroundScreen;