// Copyright 2018-2022, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import playgroundScreenIcon_png from '../../images/playgroundScreenIcon_png.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkPlaygroundModel from './model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from './view/EnergySkateParkPlaygroundScreenView.js';

const screenPlaygroundString = energySkateParkStrings.screens.playground;

class PlaygroundScreen extends Screen {

  /**
   * @param {EnergySkateParkPreferencesModel} preferencesModel
   * @param {Tandem} tandem
   */
  constructor( preferencesModel, tandem ) {

    const options = {
      name: screenPlaygroundString,
      homeScreenIcon: new ScreenIcon( new Image( playgroundScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    super(
      () => new EnergySkateParkPlaygroundModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new EnergySkateParkPlaygroundScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

energySkatePark.register( 'PlaygroundScreen', PlaygroundScreen );
export default PlaygroundScreen;