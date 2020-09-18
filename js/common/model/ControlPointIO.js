// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for ControlPoint
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import energySkatePark from '../../energySkatePark.js';
import ControlPoint from './ControlPoint.js';

const ControlPointIO = new IOType( 'ControlPointIO', {
  isValidValue: v => v instanceof ControlPoint,
  documentation: 'A control point that can manipulate the track.',

  toStateObject: controlPoint => controlPoint ? controlPoint.tandem.phetioID : 'null',
  fromStateObject( stateObject ) {
    if ( stateObject === 'null' ) {
      return null;
    }
    else {
      return phet.phetio.phetioEngine.getPhetioObject( stateObject );
    }
  }
} );

energySkatePark.register( 'ControlPointIO', ControlPointIO );
export default ControlPointIO;