// Copyright 2017-2019, University of Colorado Boulder

/**
 * The skater stores a reference to the track it is on, or null if in the air or ground.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );
  var validate = require( 'AXON/validate' );

  // ifphetio
  var phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  /**
   * @param {Track} track
   * @param {string} phetioID
   * @constructor
   */
  function TrackReferenceIO( track, phetioID ) {
    ObjectIO.call( this, track, phetioID );
  }

  phetioInherit( ObjectIO, 'TrackReferenceIO', TrackReferenceIO, {}, {
    validator: { valueType: Track },
    documentation: 'A Track serialization that only holds a phetioID of a Track in the sim, not the serialized state.',

    toStateObject: function( track ) {
      validate( track, this.validator );
      return track ? track.trackTandem.phetioID : null;
    },
    fromStateObject: function( stateObject ) {
      if ( stateObject === null ) {
        return null;
      }
      if ( phetioEngine.hasPhetioObject( stateObject ) ) {
        return phetioEngine.getPhetioObject( stateObject );
      }
      else {
        throw new Error( 'fromStateObject failed' );
      }
    }
  } );

  energySkatePark.register( 'TrackReferenceIO', TrackReferenceIO );

  return TrackReferenceIO;
} );