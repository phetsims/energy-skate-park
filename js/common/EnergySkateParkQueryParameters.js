// Copyright 2016-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import energySkatePark from '../energySkatePark.js';

const EnergySkateParkQueryParameters = QueryStringMachine.getAll( {

  // Print out console messages related to the physics
  debugLog: { type: 'flag' },

  // Print out console messages related to attaching and detaching from the tracks
  debugAttachDetach: { type: 'flag' },

  // Shows the drag bounds for the control points on the premade tracks - normal behavior is for them to only be
  // visible during drag
  showPointBounds: { type: 'flag' },

  // This indicates the index (1-based) of the track to show, and enables some other track debugging
  testTrackIndex: {
    type: 'number',
    defaultValue: 0
  }
} );

energySkatePark.register( 'EnergySkateParkQueryParameters', EnergySkateParkQueryParameters );

export default EnergySkateParkQueryParameters;