// Copyright 2018-2024, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import EnergySkateParkPreferencesModel from '../common/model/EnergySkateParkPreferencesModel.js';
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkStrings from '../EnergySkateParkStrings.js';
import EnergySkateParkPlaygroundModel from './model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from './view/EnergySkateParkPlaygroundScreenView.js';
import PlaygroundScreenIcon from './view/PlaygroundScreenIcon.js';

class PlaygroundScreen extends Screen<EnergySkateParkPlaygroundModel, EnergySkateParkPlaygroundScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {

    const options = {
      name: EnergySkateParkStrings.screens.playgroundStringProperty,
      homeScreenIcon: new PlaygroundScreenIcon(),
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