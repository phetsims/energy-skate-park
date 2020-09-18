// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for Track
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import energySkatePark from '../../energySkatePark.js';

const TrackIO = new IOType( 'TrackIO', {
  isValidValue: v => v instanceof phet.energySkatePark.Track,
  documentation: 'A skate track',
  toStateObject: track => {
    if ( track instanceof phet.energySkatePark.Track || track === null ) {

      // Since skater.trackProperty is of type Property.<Track|null>, we must support null here.
      if ( !track ) {
        return null;
      }
      assert && assert( track.controlPoints, 'control points should be defined' );
      return {
        draggable: track.draggable,
        configurable: track.configurable,
        controlPointTandemIDs: track.controlPoints.map( controlPoint => {
          return controlPoint.tandem.phetioID;
        } )
      };
    }
    else {
      /// TODO: Major hack to support data stream, which for unknown reasons was already calling this method with a state object
      // See https://github.com/phetsims/energy-skate-park-basics/issues/366
      return track;
    }
  },

  // TODO: This is sketchy, see // See https://github.com/phetsims/energy-skate-park-basics/issues/366
  fromStateObject: stateObject => stateObject
} );

energySkatePark.register( 'TrackIO', TrackIO );
export default TrackIO;