// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for EnergySkateParkModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import CouldNotYetDeserializeError from '../../../../tandem/js/CouldNotYetDeserializeError.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import energySkatePark from '../../energySkatePark.js';

const EnergySkateParkModelIO = new IOType( 'EnergySkateParkModelIO', {
  isValidValue: v => v instanceof phet.energySkatePark.EnergySkateParkModel,
  documentation: 'The model for the Skate Park.',

  /**
   * Remove all instances of the model's dynamic children.
   * This will remove all of the tracks from the model.
   * The ControlPoints are contained in the tracks, and each track will remove its ControlPoints.
   * @public
   *
   * @param {EnergySkateParkModel} energySkateParkModel
   * // TODO: https://github.com/phetsims/tandem/issues/211 is never called
   */
  clearChildInstances( energySkateParkModel ) {
    if ( energySkateParkModel.tracksDraggable ) {
      energySkateParkModel.removeAllTracks();
    }
  },

  /**
   * Adds a Track as specified by the phetioID and state.
   * A Track will create its own ControlPoints
   * @public
   *
   * @param {EnergySkateParkModel} energySkateParkModel
   * @param {Tandem} tandem
   * @param {Object} stateObject
   */
  addChildElementDeprecated( energySkateParkModel, tandem, stateObject ) {
    const isControlPoint = tandem.phetioID.indexOf( '.controlPoint' ) >= 0;

    // Control Points are already being created when the tracks are made, so if the tandem is a controlPoint it's a no-op
    if ( isControlPoint ) {
      throw new CouldNotYetDeserializeError();
    }

    // If it isn't a ControlPoint, then it is a Track
    return energySkateParkModel.addTrack( tandem, stateObject.draggable, stateObject.configurable, stateObject.controlPointTandemIDs );
  }
} );

energySkatePark.register( 'EnergySkateParkModelIO', EnergySkateParkModelIO );
export default EnergySkateParkModelIO;