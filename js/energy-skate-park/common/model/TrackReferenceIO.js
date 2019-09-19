// Copyright 2017-2019, University of Colorado Boulder

/**
 * The skater stores a reference to the track it is on, or null if in the air or ground.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );
  const validate = require( 'AXON/validate' );

  // ifphetio
  const phetioEngine = require( 'ifphetio!PHET_IO/phetioEngine' );

  class TrackReferenceIO extends ObjectIO {

    static toStateObject( track ) {
      validate( track, this.validator );
      return track ? track.trackTandem.phetioID : null;
    }

    static fromStateObject( stateObject ) {
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
  }

  TrackReferenceIO.validator = { valueType: Track };
  TrackReferenceIO.documentation = 'A Track serialization that only holds a phetioID of a Track in the sim, not the serialized state.';
  TrackReferenceIO.typeName = 'TrackReferenceIO';
  ObjectIO.validateSubtype( TrackReferenceIO );

  return energySkatePark.register( 'TrackReferenceIO', TrackReferenceIO );
} );