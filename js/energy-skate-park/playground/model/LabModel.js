// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the "Lab" screen in Energy Skate Park. This is an EnergySkateParkPlaygroundModel, with fully
 * interactive tracks.
 *
 * TODO: This type can be deleted
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkPlaygroundModel from '../../common/model/EnergySkateParkPlaygroundModel.js';

class LabModel extends EnergySkateParkPlaygroundModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super( tandem );
  }
}

energySkatePark.register( 'LabModel', LabModel );
export default LabModel;