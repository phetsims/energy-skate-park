// Copyright 2019, University of Colorado Boulder

/**
 * Constants for the Graphs screen of Energy Skate Park.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

  // constants
  const TIME_PER_SAMPLE = 1 / 60; // in seconds (assuming 60 fps, one sample per frame)
  const RECORDED_TIME = 5; // recording 5 seconds of data
  const MAX_SAMPLES = RECORDED_TIME / TIME_PER_SAMPLE;

  const GraphsConstants = {
    MAX_SAMPLES: MAX_SAMPLES,

    // maximum recording time for energy vs time plot, in seconds
    MAX_PLOTTED_TIME: 20,

    // determined to be reasonable by inspecting energies at large skater heights - anything
    // above this will be off of the graph
    MAX_PLOTTED_ENERGY: 3000,

    // dimensions for the tracks in the graphs screen, reused and referenced by many components in this screen
    // in model coordinates (meters)
    TRACK_WIDTH: 10,
    TRACK_HEIGHT: 4
  };

  return energySkatePark.register( 'GraphsConstants', GraphsConstants );
} );
