// Copyright 2013-2020, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import SimLauncher from '../../joist/js/SimLauncher.js';
import '../../scenery/js/util/Color.js'; // Fix a circular loading problem when using this in EnergySkateParkColorScheme
import Tandem from '../../tandem/js/Tandem.js';
import energySkateParkStrings from './energySkateParkStrings.js';
import EnergySkateParkSim from './energy-skate-park/common/EnergySkateParkSim.js';
import GraphsScreen from './energy-skate-park/graphs/GraphsScreen.js';
import IntroScreen from './energy-skate-park/intro/IntroScreen.js';
import LabScreen from './energy-skate-park/lab/LabScreen.js';
import MeasureScreen from './energy-skate-park/measure/MeasureScreen.js';

const energySkateParkTitleString = energySkateParkStrings[ 'energy-skate-park' ].title;

// constants
const tandem = Tandem.ROOT;

SimLauncher.launch( () => {
  const screens = [
    new IntroScreen( tandem.createTandem( 'introScreen' ) ),
    new MeasureScreen( tandem.createTandem( 'measureScreen' ) ),
    new GraphsScreen( tandem.createTandem( 'graphsScreen' ) ),
    new LabScreen( tandem.createTandem( 'labScreen' ) )
  ];

  new EnergySkateParkSim( energySkateParkTitleString, screens, tandem, {
    credits: {
      leadDesign: 'Ariel Paul, Noah Podolefsky, Sam Reid',
      softwareDevelopment: 'Sam Reid',
      team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Emily B. Moore, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov, Amanda McGarry, Megan Lai',
      qualityAssurance: 'Steele Dalton, Oliver Orejola, Arnab Purkayastha, Bryan Yoelin'
    }
  } ).start();
} );