// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Track
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {Track} track
   * @param {string} phetioID
   * @constructor
   */
  function TrackIO( track, phetioID ) {
    ObjectIO.call( this, track, phetioID );
  }

  /**
   * The IO type for a track.
   */
  phetioInherit( ObjectIO, 'TrackIO', TrackIO, {}, {
    documentation: 'A skate track.',
    validator: { isValidValue: v => v instanceof phet.energySkatePark.Track },

    toStateObject: function( track ) {
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
    },


    fromStateObject: function( stateObject ) {

      // TODO: This is sketchy, see // See https://github.com/phetsims/energy-skate-park-basics/issues/366
      return stateObject;
    }
  } );

  energySkatePark.register( 'TrackIO', TrackIO );

  return TrackIO;
} );