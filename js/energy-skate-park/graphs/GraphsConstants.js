// Copyright 2019, University of Colorado Boulder

/**
 * Constants for the Graphs screen of Energy Skate Park.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );

  // constants
  var TIME_PER_SAMPLE = 1 / 60; // in seconds (assuming 60 fps, one sample per frame)
  var RECORDED_TIME = 5; // recording 5 seconds of data
  var MAX_SAMPLES = RECORDED_TIME / TIME_PER_SAMPLE;

  const GraphsConstants = {
    MAX_SAMPLES: MAX_SAMPLES,

    // determined to be reasonable by inspecting energies at large skater heights - anything
    // above this will be off of the graph
    MAX_PLOTTED_ENERGY: 3000
  };

  return energySkatePark.register( 'GraphsConstants', GraphsConstants );
} );
