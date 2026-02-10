// Copyright 2018-2026, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import EnergySkateParkKeyboardHelpContent from '../common/view/EnergySkateParkKeyboardHelpContent.js';
import EnergySkateParkPreferencesModel from '../common/model/EnergySkateParkPreferencesModel.js';
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkFluent from '../EnergySkateParkFluent.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenIcon from './view/IntroScreenIcon.js';
import IntroScreenView from './view/IntroScreenView.js';

export default class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    const options = {
      name: EnergySkateParkFluent.screens.introStringProperty,
      tandem: tandem,
      homeScreenIcon: new IntroScreenIcon(),
      createKeyboardHelpNode: () => new EnergySkateParkKeyboardHelpContent( {
        includeReturnToolToToolbox: true
      } )
    };

    super(
      () => new IntroModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new IntroScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );

  }
}

energySkatePark.register( 'IntroScreen', IntroScreen );