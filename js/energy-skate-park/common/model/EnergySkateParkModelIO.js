// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for EnergySkateParkModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const CouldNotYetDeserializeError = require( 'TANDEM/CouldNotYetDeserializeError' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const validate = require( 'AXON/validate' );

  class EnergySkateParkModelIO extends ObjectIO {

    /**
     * Remove all instances of the model's dynamic children.
     * This will remove all of the tracks from the model.
     * The ControlPoints are contained in the tracks, and each track will remove its ControlPoints.
     *
     * @param {EnergySkateParkModel} energySkateParkModel
     */
    static clearChildInstances( energySkateParkModel ) {
      validate( energySkateParkModel, this.validator );
      if ( energySkateParkModel.draggableTracks ) {
        energySkateParkModel.removeAllTracks();
      }
    }

    /**
     * Adds a Track as specified by the phetioID and state.
     * A Track will create its own ControlPoints
     * @param {EnergySkateParkModel} energySkateParkModel
     * @param {Tandem} tandem
     * @param {Object} stateObject
     */
    static addChildInstanceDeprecated( energySkateParkModel, tandem, stateObject ) {
      validate( energySkateParkModel, this.validator );
      const isControlPoint = tandem.phetioID.indexOf( '.controlPoint' ) >= 0;

      // Control Points are already being created when the tracks are made, so if the tandem is a controlPoint it's a no-op
      if ( isControlPoint ) {
        throw new CouldNotYetDeserializeError();
      }

      // If it isn't a ControlPoint, then it is a Track
      return energySkateParkModel.addTrack( tandem, stateObject.draggable, stateObject.configurable, stateObject.controlPointTandemIDs );
    }
  }

  EnergySkateParkModelIO.documentation = 'The model for the Skate Park.';
  EnergySkateParkModelIO.validator = { isValidValue: v => v instanceof phet.energySkatePark.EnergySkateParkModel };
  EnergySkateParkModelIO.typeName = 'EnergySkateParkModelIO';
  ObjectIO.validateSubtype( EnergySkateParkModelIO );

  return energySkatePark.register( 'EnergySkateParkModelIO', EnergySkateParkModelIO );
} );