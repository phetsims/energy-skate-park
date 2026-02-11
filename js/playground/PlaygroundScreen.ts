// Copyright 2018-2026, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import EnergySkateParkPreferencesModel from '../common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkKeyboardHelpContent from '../common/view/EnergySkateParkKeyboardHelpContent.js';
import TrackEditingKeyboardHelpSection from '../common/view/TrackEditingKeyboardHelpSection.js';
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkFluent from '../EnergySkateParkFluent.js';
import EnergySkateParkPlaygroundModel from './model/EnergySkateParkPlaygroundModel.js';
import EnergySkateParkPlaygroundScreenView from './view/EnergySkateParkPlaygroundScreenView.js';
import PlaygroundScreenIcon from './view/PlaygroundScreenIcon.js';

export default class PlaygroundScreen extends Screen<EnergySkateParkPlaygroundModel, EnergySkateParkPlaygroundScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {

    const options = {
      name: EnergySkateParkFluent.screens.playgroundStringProperty,
      homeScreenIcon: new PlaygroundScreenIcon(),
      tandem: tandem,
      screenButtonsHelpText: EnergySkateParkFluent.a11y.screenButtons.playground.accessibleHelpTextStringProperty,
      createKeyboardHelpNode: () => new EnergySkateParkKeyboardHelpContent( {
        additionalLeftSections: [ new TrackEditingKeyboardHelpSection() ],
        includeReturnToolToToolbox: true
      } )
    };

    super(
      () => new EnergySkateParkPlaygroundModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new EnergySkateParkPlaygroundScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

energySkatePark.register( 'PlaygroundScreen', PlaygroundScreen );