// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Track
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  class TrackIO extends ObjectIO {

    static toStateObject( track ) {
      validate( track, this.validator );
      if ( track instanceof phet.energySkatePark.Track || track === null ) {

        // Since skater.trackProperty is of type Property.<Track|null>, we must support null here.
        if ( !track ) {
          return null;
        }
        assert && assert( track.controlPoints, 'control points should be defined' );
        return {
          draggable: track.draggable,
          configurable: track.configurable,
          controlPointTandemIDs: track.controlPoints.map( function( controlPoint ) {
            return controlPoint.controlPointTandem.phetioID;
          } )
        };
      }
      else {
        /// TODO: Major hack to support data stream, which for unknown reasons was already calling this method with a state object
        // See https://github.com/phetsims/energy-skate-park-basics/issues/366
        return track;
      }
    }

    static fromStateObject( stateObject ) {

      // TODO: This is sketchy, see // See https://github.com/phetsims/energy-skate-park-basics/issues/366
      return stateObject;
    }
  }

  TrackIO.documentation = 'A skate track.';
  TrackIO.validator = { isValidValue: v => v instanceof phet.energySkatePark.Track };
  TrackIO.typeName = 'TrackIO';
  ObjectIO.validateSubtype( TrackIO );

  return energySkatePark.register( 'TrackIO', TrackIO );
} );