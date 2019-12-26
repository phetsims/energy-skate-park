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
  const merge = require( 'PHET_CORE/merge' );
  const platform = require( 'PHET_CORE/platform' );
  const Sim = require( 'JOIST/Sim' );

  class EnergySkateParkSim extends Sim {

    /**
     * @param {string} titleString - title for the simulation
     * @param {Array.<Screen>} screens
     * @param {Object} options
     * @param {Tandem} tandem
     */
    constructor( titleString, screens, tandem, options ) {
      options = merge( {

        // If running the sim on an ipad, do not use the "backing scale" technique for antialiasing because this method
        // takes up too much memory, see https://github.com/phetsims/scenery/issues/859 and
        // https://github.com/phetsims/energy-skate-park-basics/issues/435
        allowBackingScaleAntialiasing: !platform.mobileSafari,

        tandem: tandem
      }, options );

      super( titleString, screens, options );
    }
  }

  return energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );
} );