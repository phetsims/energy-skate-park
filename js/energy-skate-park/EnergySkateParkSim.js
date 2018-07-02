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
  var EnergySkateParkScreen = require( 'ENERGY_SKATE_PARK/energy-skate-park/EnergySkateParkScreen' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Sim = require( 'JOIST/Sim' );

  // images
  var iconFrictionHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-friction-homescreen.png' );
  var iconIntroHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-intro-homescreen.png' );
  var iconPlaygroundHomescreen = require( 'image!ENERGY_SKATE_PARK/icon-playground-homescreen.png' );

  // strings
  var energySkateParkTitleString = require( 'string!ENERGY_SKATE_PARK/energy-skate-park.title' );
  var screenFrictionString = require( 'string!ENERGY_SKATE_PARK/screen.friction' );
  var screenIntroductionString = require( 'string!ENERGY_SKATE_PARK/screen.introduction' );
  var screenTrackPlaygroundString = require( 'string!ENERGY_SKATE_PARK/screen.trackPlayground' );

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
      new EnergySkateParkScreen( screenIntroductionString, iconIntroHomescreen, false, false, tandem.createTandem( 'introScreen' ) ),
      new EnergySkateParkScreen( screenFrictionString, iconFrictionHomescreen, false, true, tandem.createTandem( 'frictionScreen' ) ),
      new EnergySkateParkScreen( screenTrackPlaygroundString, iconPlaygroundHomescreen, true, true, tandem.createTandem( 'playgroundScreen' ) )
    ], options );
  }

  energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );

  return inherit( Sim, EnergySkateParkSim );
} );