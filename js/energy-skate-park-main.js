// Copyright 2013-2022, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import PreferencesConfiguration from './../../joist/js/preferences/PreferencesConfiguration.js';
import EnergySkateParkSim from './common/EnergySkateParkSim.js';
import EnergySkateParkPreferencesModel from './common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkPreferencesNode from './common/view/EnergySkateParkPreferencesNode.js';
import SkaterImages from './common/view/SkaterImages.js';
import energySkateParkStrings from './energySkateParkStrings.js';
import GraphsScreen from './graphs/GraphsScreen.js';
import IntroScreen from './intro/IntroScreen.js';
import MeasureScreen from './measure/MeasureScreen.js';
import PlaygroundScreen from './playground/PlaygroundScreen.js';

const energySkateParkTitleString = energySkateParkStrings[ 'energy-skate-park' ].title;

const energySkateParkPreferencesModel = new EnergySkateParkPreferencesModel( Tandem.GLOBAL_MODEL.createTandem( 'energySkateParkPreferencesModel' ) );

// constants
const rootTandem = Tandem.ROOT;

simLauncher.launch( () => {
  const screens = [
    new IntroScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'introScreen' ) ),
    new MeasureScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'measureScreen' ) ),
    new GraphsScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'graphsScreen' ) ),
    new PlaygroundScreen( energySkateParkPreferencesModel, rootTandem.createTandem( 'playgroundScreen' ) )
  ];

  new EnergySkateParkSim( energySkateParkTitleString, screens, rootTandem, {
    preferencesConfiguration: new PreferencesConfiguration( {
      generalOptions: {
        createSimControls: tandem => new EnergySkateParkPreferencesNode( energySkateParkPreferencesModel, tandem.createTandem( 'simControls' ) )
      },
      localizationOptions: {
        supportsLanguageSwitching: true,
        regionAndCultureDescriptors: SkaterImages.SKATER_SET_DESCRIPTORS
      }
    } ),
    credits: {
      leadDesign: 'Noah Podolefsky, Sam Reid, Amy Rouinfar',
      softwareDevelopment: 'Sam Reid, Jesse Greenberg',
      team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Diana López Tavares, Emily B. Moore, Ariel Paul, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov, Amanda McGarry, Megan Lai',
      qualityAssurance: 'Jaspe Arias, Steele Dalton, Megan Lai, Brooklyn Lash, Oliver Orejola, Arnab Purkayastha, Devon Quispe, Kathryn Woessner, Bryan Yoelin'
    }
  } ).start();
} );