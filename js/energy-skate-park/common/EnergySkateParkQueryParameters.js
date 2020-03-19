// Copyright 2016-2020, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import energySkatePark from '../../energySkatePark.js';

const EnergySkateParkQueryParameters = QueryStringMachine.getAll( {

  // Print out console messages related to the physics
  debugLog: { type: 'flag' },

  // Print out console messages related to attaching and detaching from the tracks
  debugAttachDetach: { type: 'flag' },

  // Show a testing track (as indicated by testTrackIndex)
  // REVIEW: It seems preferable to eliminate this flag, and just use testTrackIndex for everything.  Perhaps testTrackIndex=0 means no test?
  debugTrack: { type: 'flag' },

  // Shows the drag bounds for the control points on the premade tracks - normal behavior is for them to only be
  // visible during drag
  showPointBounds: { type: 'flag' },

  // If debugTrack is true, this indicates the index (1-based) of the track to show
  testTrackIndex: {
    type: 'number',
    defaultValue: 1
  }
} );

energySkatePark.register( 'EnergySkateParkQueryParameters', EnergySkateParkQueryParameters );

export default EnergySkateParkQueryParameters;