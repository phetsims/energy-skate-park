// Copyright 2020-2025, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import optionize from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import energySkatePark from '../../energySkatePark.js';
import SamplesCanvasNode from '../../measure/view/SamplesCanvasNode.js';
import EnergySkateParkSaveSampleModel from '../model/EnergySkateParkSaveSampleModel.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

type SelfOptions = {
  // true if the skater path should be drawn
  drawSkaterPath?: boolean;
};

type EnergySkateParkSaveSampleScreenViewOptions = SelfOptions & PhetioObjectOptions;

export default class EnergySkateParkSaveSampleScreenView extends EnergySkateParkScreenView {
  private readonly skaterSamplesNode: SamplesCanvasNode | null;

  public constructor( model: EnergySkateParkSaveSampleModel, tandem: Tandem, providedOptions?: EnergySkateParkSaveSampleScreenViewOptions ) {

    const options = optionize<EnergySkateParkSaveSampleScreenViewOptions, SelfOptions, PhetioObjectOptions>()( {
      drawSkaterPath: true
    }, providedOptions );
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
