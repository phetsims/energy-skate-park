// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the "Lab" screen in Energy Skate Park. This is an EnergySkateParkPlaygroundModel, with fully
 * interactive tracks.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkPlaygroundModel from '../../common/model/EnergySkateParkPlaygroundModel.js';

class LabModel extends EnergySkateParkPlaygroundModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super( tandem, {

      // Draggable tracks in the lab screen start at a different position in the "Lab" screen
      initialTracksOffsetVector: new Vector2( -2, -0.75 )
    } );
  }
}

energySkatePark.register( 'LabModel', LabModel );
export default LabModel;