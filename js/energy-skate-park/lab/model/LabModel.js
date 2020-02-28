// Copyright 2018-2020, University of Colorado Boulder

/**
 * Type Documentation // REVIEW: Type Documentation
 * @author Jesse Greenberg
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