// Copyright 2019-2020, University of Colorado Boulder

/**
 * View where you can play with premade tracks which may be configurable, but are not draggable,
 * splittable, or attachable. Premade tracks can be chosen from a set of scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkSaveSampleScreenView from './EnergySkateParkSaveSampleScreenView.js';
import TrackNode from './TrackNode.js';

class EnergySkateParkTrackSetScreenView extends EnergySkateParkSaveSampleScreenView {

  /**
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {
    super( model, tandem, options );

    const trackNodes = model.tracks.map( track => {
      return new TrackNode( model, track, this.modelViewTransform, this.availableModelBoundsProperty, this.trackNodeGroupTandem.createNextTandem() );
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
export default EnergySkateParkTrackSetScreenView;
