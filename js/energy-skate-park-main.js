// Copyright 2013-2020, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import simLauncher from '../../joist/js/simLauncher.js';
import '../../scenery/js/util/Color.js'; // Fix a circular loading problem when using this in EnergySkateParkColorScheme
import Tandem from '../../tandem/js/Tandem.js';
import energySkateParkStrings from './energySkateParkStrings.js';
import EnergySkateParkSim from './common/EnergySkateParkSim.js';
import GraphsScreen from './graphs/GraphsScreen.js';
import IntroScreen from './intro/IntroScreen.js';
import PlaygroundScreen from './playground/PlaygroundScreen.js';
import MeasureScreen from './measure/MeasureScreen.js';

const energySkateParkTitleString = energySkateParkStrings[ 'energy-skate-park' ].title;

// constants
const tandem = Tandem.ROOT;

simLauncher.launch( () => {
  const screens = [
    new IntroScreen( tandem.createTandem( 'introScreen' ) ),
    new MeasureScreen( tandem.createTandem( 'measureScreen' ) ),
    new GraphsScreen( tandem.createTandem( 'graphsScreen' ) ),
    new PlaygroundScreen( tandem.createTandem( 'playgroundScreen' ) )
  ];

  new EnergySkateParkSim( energySkateParkTitleString, screens, tandem, {
    credits: {
      leadDesign: 'Noah Podolefsky, Sam Reid, Amy Rouinfar',
      softwareDevelopment: 'Sam Reid, Jesse Greenberg',
      team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Diana López Tavares, Emily B. Moore, Ariel Paul, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov, Amanda McGarry, Megan Lai',
      qualityAssurance: 'Steele Dalton, Oliver Orejola, Arnab Purkayastha, Bryan Yoelin'
    }
  } ).start();
} );