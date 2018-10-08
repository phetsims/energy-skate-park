// Copyright 2013-2017, University of Colorado Boulder

/**
 * A single screen for the Energy Skate Park sim.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkQueryParameters = require( 'ENERGY_SKATE_PARK/energy-skate-park/EnergySkateParkQueryParameters' );
  var IntroScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/IntroScreen' );
  var GraphsScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsScreen' );
  var LabScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/LabScreen' );
  var MeasureScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/MeasureScreen' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Sim = require( 'JOIST/Sim' );

  // strings
  var energySkateParkTitleString = require( 'string!ENERGY_SKATE_PARK/energy-skate-park.title' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function EnergySkateParkSim( tandem ) {
    var options = {
      credits: {
        leadDesign: 'Ariel Paul, Noah Podolefsky, Sam Reid',
        softwareDevelopment: 'Sam Reid',
        team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Emily B. Moore, Kathy Perkins',
        graphicArts: 'Sharon Siman-Tov, Amanda McGarry',
        qualityAssurance: 'Steele Dalton, Oliver Orejola, Arnab Purkayastha, Bryan Yoelin'
      },

      showSaveAndLoad: EnergySkateParkQueryParameters.showSaveAndLoad
    };

    Sim.call( this, energySkateParkTitleString, [
      new IntroScreen( tandem.createTandem( 'introScreen' ) ),
      new MeasureScreen( tandem.createTandem( 'measureScreen' ) ),
      new GraphsScreen( tandem.createTandem( 'graphsScreen' ) ),
      new LabScreen( tandem.createTandem( 'labScreen' ) )
    ], options );
  }

  energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );

  return inherit( Sim, EnergySkateParkSim );
} );