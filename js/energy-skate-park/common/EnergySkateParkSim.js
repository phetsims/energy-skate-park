// Copyright 2013-2020, University of Colorado Boulder

/**
 * Simulation for Energy Skate Park. Also meant to be extended by Energy Skate Park: Basics
 * because this has sim specific options that help the Energy Skate Park sims run better on iPad2.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../../../joist/js/Sim.js';
import merge from '../../../../phet-core/js/merge.js';
import platform from '../../../../phet-core/js/platform.js';
import energySkatePark from '../../energySkatePark.js';

class EnergySkateParkSim extends Sim {

  /**
   * @param {string} titleString - title for the simulation
   * @param {Array.<Screen>} screens
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( titleString, screens, tandem, options ) {
    options = merge( {

      // If running the sim on an iPad, do not use the "backing scale" technique for antialiasing because this method
      // takes up too much memory, see https://github.com/phetsims/scenery/issues/859 and
      // https://github.com/phetsims/energy-skate-park-basics/issues/435
      allowBackingScaleAntialiasing: !platform.mobileSafari,

      tandem: tandem
    }, options );

    super( titleString, screens, options );
  }
}

energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );
export default EnergySkateParkSim;