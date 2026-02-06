// Copyright 2013-2026, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import PreferencesModel from './../../joist/js/preferences/PreferencesModel.js';
import EnergySkateParkSim from './common/EnergySkateParkSim.js';
import EnergySkateParkPreferencesModel from './common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkPreferencesNode from './common/view/EnergySkateParkPreferencesNode.js';
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
    credits: {
      leadDesign: 'Noah Podolefsky, Sam Reid, Amy Rouinfar',
      softwareDevelopment: 'Sam Reid, Jesse Greenberg, Marla Schulz, Agustín Vallejo, Luisa Vargas',
      team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Diana López Tavares, Emily B. Moore, Ariel Paul, Kathy Perkins',
      graphicArts: 'Mariah Hermsmeyer, Megan Lai, Amanda McGarry, Sharon Siman-Tov',
      qualityAssurance: 'Jaspe Arias, Catherine Carter, Steele Dalton, Jaron Droder, Megan Lai, Brooklyn Lash, Emily Miller, Oliver Orejola, Arnab Purkayastha, Devon Quispe, Sam Reid, Nancy Salpepi, Kathryn Woessner, Bryan Yoelin'
    }
  } ).start();
} );