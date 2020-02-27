// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for Track
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../../axon/js/validate.js';
import ObjectIO from '../../../../../tandem/js/types/ObjectIO.js';
import energySkatePark from '../../../energySkatePark.js';

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
        controlPointTandemIDs: track.controlPoints.map( controlPoint => {
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

energySkatePark.register( 'TrackIO', TrackIO );
export default TrackIO;