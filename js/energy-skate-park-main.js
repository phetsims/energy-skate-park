// Copyright 2013-2019, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  const EnergySkateParkSim = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/EnergySkateParkSim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );
  const IntroScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/IntroScreen' );
  const GraphsScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsScreen' );
  const LabScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/LabScreen' );
  const MeasureScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/MeasureScreen' );

  // Fix a circular loading problem when using this in EnergySkateParkColorScheme
  require( 'SCENERY/util/Color' );

  // strings
  const energySkateParkTitleString = require( 'string!ENERGY_SKATE_PARK/energy-skate-park.title' );

  // constants
  const tandem = Tandem.rootTandem;

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
        graphicArts: 'Sharon Siman-Tov, Amanda McGarry',
        qualityAssurance: 'Steele Dalton, Oliver Orejola, Arnab Purkayastha, Bryan Yoelin'
      }
    } ).start();
  } );
} );