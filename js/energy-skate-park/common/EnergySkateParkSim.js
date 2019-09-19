// Copyright 2013-2019, University of Colorado Boulder

/**
 * Simulation for Energy Skate Park. Also meant to be extended by Energy Skate Park: Basics
 * because this has sim specific options that help the Energy Skate Park sims run better on iPad2.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkQueryParameters = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/EnergySkateParkQueryParameters' );
  const platform = require( 'PHET_CORE/platform' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Sim = require( 'JOIST/Sim' );

  /**
   * @constructor
   * @param {string} titleString - title for the simulation
   * @param {Array.<Screen>} screens
   * @param {Object} options
   * @param {Tandem} tandem
   */
  function EnergySkateParkSim( titleString, screens, tandem, options ) {

    options = _.extend( {
      showSaveAndLoad: EnergySkateParkQueryParameters.showSaveAndLoad,

      // if running the sim on an ipad, do not use the "backing scale" technique
      // for antialiasing because this method takes up too much memory, see
      // https://github.com/phetsims/scenery/issues/859 and
      // https://github.com/phetsims/energy-skate-park-basics/issues/435
      allowBackingScaleAntialiasing: !platform.mobileSafari
    }, options );

    Sim.call( this, titleString, screens, options );
  }

  energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );

  return inherit( Sim, EnergySkateParkSim );
} );