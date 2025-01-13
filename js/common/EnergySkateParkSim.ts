// Copyright 2013-2025, University of Colorado Boulder

/**
 * Simulation for Energy Skate Park. Also meant to be extended by Energy Skate Park: Basics
 * because this has sim specific options that help the Energy Skate Park sims run better on iPad2.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';
import { AnyScreen } from '../../../joist/js/Screen.js';
import Sim, { SimOptions } from '../../../joist/js/Sim.js';
import energySkatePark from '../energySkatePark.js';

export default class EnergySkateParkSim extends Sim {

  public constructor( titleString: TReadOnlyProperty<string>, screens: AnyScreen[], options: SimOptions ) {
    super( titleString, screens, options );
  }
}

energySkatePark.register( 'EnergySkateParkSim', EnergySkateParkSim );