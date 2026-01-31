// Copyright 2019-2026, University of Colorado Boulder

/**
 * View where you can play with premade tracks which may be configurable, but are not draggable,
 * splittable, or attachable. Premade tracks can be chosen from a set of scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import EnergySkateParkSaveSampleScreenView, { EnergySkateParkSaveSampleScreenViewOptions } from './EnergySkateParkSaveSampleScreenView.js';

export default class EnergySkateParkTrackSetScreenView extends EnergySkateParkSaveSampleScreenView {

  public constructor( model: EnergySkateParkTrackSetModel, tandem: Tandem, options?: EnergySkateParkSaveSampleScreenViewOptions ) {
    super( model, tandem, options );

    const trackNodes = model.tracks.map( track => {
      return this.trackNodeGroup.createNextElement( track, this.modelViewTransform, this.availableModelBoundsProperty );
    } );

    trackNodes.forEach( trackNode => {
      this.trackLayer.addChild( trackNode );
    } );

    model.sceneProperty.link( scene => {
      _.forEach( model.tracks, ( track, i ) => {
        trackNodes[ i ].visible = scene === i;
      } );

      // interrupt the DragHandler when scene Property changes since Skater needs to reset to initial position when
      // track changes, see https://github.com/phetsims/energy-skate-park-basics/issues/179
      this.skaterNode.interruptDrag();
    } );
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetScreenView', EnergySkateParkTrackSetScreenView );