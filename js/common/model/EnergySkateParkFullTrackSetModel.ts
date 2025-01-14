// Copyright 2018-2025, University of Colorado Boulder

/**
 * A model for track sets in Energy Skate Park "Full", which has a parabola, slope, loop, and double well tracks.
 * Tracks are not draggable, and may support friction.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkPreferencesModel from './EnergySkateParkPreferencesModel.js';
import EnergySkateParkTrackSetModel, { EnergySkateParkTrackSetModelOptions } from './EnergySkateParkTrackSetModel.js';

export default class EnergySkateParkFullTrackSetModel extends EnergySkateParkTrackSetModel {
  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem, options: EnergySkateParkTrackSetModelOptions ) {
    super( preferencesModel, tandem, options );
  }
}

energySkatePark.register( 'EnergySkateParkFullTrackSetModel', EnergySkateParkFullTrackSetModel );