// Copyright 2020, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFullTrackSetModel from '../../common/model/EnergySkateParkFullTrackSetModel.js';

class IntroModel extends EnergySkateParkFullTrackSetModel {
  constructor( tandem ) {
    super( tandem );

    // by default the Intro screen does not save samples
    this.saveSamplesProperty.set( false );

    // attach listeners that clear skater path when Properties like direction and dragging change
    this.attachPathRemovalListeners();
  }
}

energySkatePark.register( 'IntroModel', IntroModel );

export default IntroModel;
