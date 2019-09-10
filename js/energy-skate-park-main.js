// Copyright 2013-2018, University of Colorado Boulder

/**
 * Entry point for PhET Interactive Simulation's Energy Skate Park application.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var EnergySkateParkSim = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/EnergySkateParkSim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );
  var IntroScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/IntroScreen' );
  var GraphsScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsScreen' );
  var LabScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/LabScreen' );
  var MeasureScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/MeasureScreen' );

  // Fix a circular loading problem when using this in EnergySkateParkColorScheme
  require( 'SCENERY/util/Color' );

  // strings
  var energySkateParkTitleString = require( 'string!ENERGY_SKATE_PARK/energy-skate-park.title' );

  // constants
  var tandem = Tandem.rootTandem;

  SimLauncher.launch( function() {
    var screens = [
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