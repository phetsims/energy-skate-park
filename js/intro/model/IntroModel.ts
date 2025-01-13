// Copyright 2020-2025, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkFullTrackSetModel from '../../common/model/EnergySkateParkFullTrackSetModel.js';
import EnergySkateParkPreferencesModel from '../../common/model/EnergySkateParkPreferencesModel.js';
import energySkatePark from '../../energySkatePark.js';

class IntroModel extends EnergySkateParkFullTrackSetModel {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super( preferencesModel, tandem, {

      // by default the Intro screen does not save samples
      defaultSaveSamples: false
    } );

    // attach listeners that clear skater path when Properties like direction and dragging change
    this.attachPathRemovalListeners();
  }
}

energySkatePark.register( 'IntroModel', IntroModel );

export default IntroModel;