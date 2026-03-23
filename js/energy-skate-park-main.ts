// Copyright 2013-2026, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import PreferencesModel from './../../joist/js/preferences/PreferencesModel.js';
import EnergySkateParkConstants from './common/EnergySkateParkConstants.js';
import EnergySkateParkSim from './common/EnergySkateParkSim.js';
import EnergySkateParkPreferencesModel from './common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkPreferencesNode from './common/view/EnergySkateParkPreferencesNode.js';
import EnergySkateParkVisualPreferencesNode from './common/view/EnergySkateParkVisualPreferencesNode.js';
import EnergySkateParkFluent from './EnergySkateParkFluent.js';
import GraphsScreen from './graphs/GraphsScreen.js';
import IntroScreen from './intro/IntroScreen.js';
import MeasureScreen from './measure/MeasureScreen.js';
import PlaygroundScreen from './playground/PlaygroundScreen.js';

const energySkateParkTitleStringProperty = EnergySkateParkFluent[ 'energy-skate-park' ].titleStringProperty;

const preferencesModel = new PreferencesModel( {
  simulationOptions: {
    customPreferences: [ {
      createContent: tandem => new EnergySkateParkPreferencesNode( energySkateParkPreferencesModel, tandem.createTandem( 'simPreferences' ) )
    } ]
  },
  visualOptions: {
    customPreferences: [ {
      createContent: tandem => new EnergySkateParkVisualPreferencesNode( energySkateParkPreferencesModel, tandem.createTandem( 'visualPreferences' ) )
    } ]
  }
} );
const energySkateParkPreferencesModel = new EnergySkateParkPreferencesModel();

// constants
const rootTandem = Tandem.ROOT;

simLauncher.launch( () => {
  const screens = [
    new IntroScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'introScreen' ) ),
    new MeasureScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'measureScreen' ) ),
    new GraphsScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'graphsScreen' ) ),
    new PlaygroundScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'playgroundScreen' ) )
  ];

  new EnergySkateParkSim( energySkateParkTitleStringProperty, screens, {
    preferencesModel: preferencesModel,
    credits: EnergySkateParkConstants.CREDITS
  } ).start();
} );