// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for ControlPoint
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../../axon/js/validate.js';
import ObjectIO from '../../../../../tandem/js/types/ObjectIO.js';
import energySkatePark from '../../../energySkatePark.js';
import ControlPoint from './ControlPoint.js';

class ControlPointIO extends ObjectIO {

  /**
   * Encodes a ControlPoint instance to a state.
   * @param {ControlPoint} controlPoint
   * @returns {Object}
   * @override
   */
  static toStateObject( controlPoint ) {
    validate( controlPoint, this.validator );
    return controlPoint ? controlPoint.tandem.phetioID : 'null'; // REVIEW (phet-io): Should this use ReferenceIO?
  }

  /**
   * Decodes a ControlPoint from a state object. Supports null.
   *
   * @param {Object} stateObject
   * @returns {ControlPoint}
   * @override
   */
  static fromStateObject( stateObject ) {
    if ( stateObject === 'null' ) {
      return null;
    }
    else {
      return phet.phetIo.phetioEngine.getPhetioObject( stateObject );
    }
  }
}

ControlPointIO.documentation = 'A control point that can manipulate the track.';
ControlPointIO.validator = { isValidValue: v => v instanceof ControlPoint };
ControlPointIO.typeName = 'ControlPointIO';
ObjectIO.validateSubtype( ControlPointIO );

energySkatePark.register( 'ControlPointIO', ControlPointIO );
export default ControlPointIO;