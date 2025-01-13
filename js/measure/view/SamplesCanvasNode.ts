// Copyright 2019-2022, University of Colorado Boulder

/**
 * A canvas node that draws the measurable path of the skater. This needed to be done with
 * Canvas for better performance on tablets.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import EnergySkateParkSaveSampleModel from '../../common/model/EnergySkateParkSaveSampleModel.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
import energySkatePark from '../../energySkatePark.js';

// constants
const SAMPLE_RADIUS = 3.5;

class SamplesCanvasNode extends CanvasNode {

  public constructor( private readonly model: EnergySkateParkSaveSampleModel, private readonly modelViewTransform: ModelViewTransform2 ) {
    super();

    this.model.availableModelBoundsProperty.link( modelBounds => {

      // Dilate bounds by the radius of the sample circles so that they don't get clipped when the skater
      // is resting on the ground. Circles will be half under-ground in this case.
      this.canvasBounds = this.modelViewTransform.modelToViewBounds( modelBounds ).dilateY( SAMPLE_RADIUS );

      // repaint in case we are paused
      this.invalidatePaint();
    } );
  }

  /**
   * Paints the canvas node.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {
    for ( let i = 0; i < this.model.dataSamples.length; i++ ) {
      const sample = this.model.dataSamples.get( i );
      const viewPosition = this.modelViewTransform.modelToViewPosition( sample.position );

      context.beginPath();
      context.arc( viewPosition.x, viewPosition.y, SAMPLE_RADIUS, 0, 2 * Math.PI );

      const alpha = sample.opacityProperty.get();

      context.fillStyle = EnergySkateParkColorScheme.pathFill.withAlpha( alpha ).toCSS();
      context.strokeStyle = EnergySkateParkColorScheme.pathStroke.withAlpha( alpha ).toCSS();

      context.fill();
      context.stroke();
    }
  }

  /**
   * Repaint in the animation frame if playing.
   */
  public step( dt: number ): void {
    this.invalidatePaint();
  }
}

energySkatePark.register( 'SamplesCanvasNode', SamplesCanvasNode );
export default SamplesCanvasNode;