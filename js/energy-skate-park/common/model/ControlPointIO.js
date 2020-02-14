// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for ControlPoint
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

  class ControlPointIO extends ObjectIO {

    /**
     * Encodes a ControlPoint instance to a state.
     * @param {ControlPoint} controlPoint
     * @returns {Object}
     * @override
     */
    static toStateObject( controlPoint ) {
      validate( controlPoint, this.validator );
      return controlPoint ? controlPoint.tandem.phetioID : 'null';
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
  ControlPointIO.validator = { isValidValue: v => v instanceof phet.energySkatePark.ControlPoint };
  ControlPointIO.typeName = 'ControlPointIO';
  ObjectIO.validateSubtype( ControlPointIO );

  return energySkatePark.register( 'ControlPointIO', ControlPointIO );
} );