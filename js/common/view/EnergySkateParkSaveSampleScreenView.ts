// Copyright 2020-2025, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import SamplesCanvasNode from '../../measure/view/SamplesCanvasNode.js';
import EnergySkateParkSaveSampleModel from '../model/EnergySkateParkSaveSampleModel.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

class EnergySkateParkSaveSampleScreenView extends EnergySkateParkScreenView {
  private readonly skaterSamplesNode: SamplesCanvasNode | null;

  public constructor( model: EnergySkateParkSaveSampleModel, tandem: Tandem, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {boolean} - true if
      drawSkaterPath: true
    }, options );
    super( model, tandem, options );

    this.skaterSamplesNode = null;

    if ( options.drawSkaterPath ) {
      this.skaterSamplesNode = new SamplesCanvasNode( model, this.modelViewTransform );
      this.topLayer.addChild( this.skaterSamplesNode );
    }
  }

  /**
   * @param dt - in seconds
   */
  public override step( dt: number ): void {
    super.step( dt );
    if ( this.skaterSamplesNode ) {
      this.skaterSamplesNode.step( dt );
    }
  }
}


energySkatePark.register( 'EnergySkateParkSaveSampleScreenView', EnergySkateParkSaveSampleScreenView );

export default EnergySkateParkSaveSampleScreenView;