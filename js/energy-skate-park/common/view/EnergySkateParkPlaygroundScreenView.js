// Copyright 2019-2020, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import EraserButton from '../../../../../scenery-phet/js/buttons/EraserButton.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../../scenery/js/util/Color.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import TrackNode from './TrackNode.js';

class EnergySkateParkPlaygroundScreenView extends EnergySkateParkScreenView {

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {

    super( model, tandem, options );

    // Create the tracks for the track toolbox
    const interactiveTrackNodes = model.tracks.getArray().map( this.addTrackNode.bind( this ) );

    const padding = 10;

    // @protected (for layout of other things in subtypes)
    this.trackCreationPanel = new Rectangle(
      ( interactiveTrackNodes[ 0 ].left - padding / 2 ),
      ( interactiveTrackNodes[ 0 ].top - padding / 2 ),
      ( interactiveTrackNodes[ 0 ].width + padding ),
      ( interactiveTrackNodes[ 0 ].height + padding ),
      6,
      6, {
        fill: 'white',
        stroke: 'black'
      } );
    this.bottomLayer.addChild( this.trackCreationPanel );

    model.tracks.addItemAddedListener( this.addTrackNode.bind( this ) );

    // @protected - for layout in subtypes
    this.clearButton = new EraserButton( {
      iconWidth: 30,
      baseColor: new Color( 221, 210, 32 ),
      tandem: tandem.createTandem( 'clearButton' )
    } );
    model.clearButtonEnabledProperty.linkAttribute( this.clearButton, 'enabled' );
    this.clearButton.addListener( () => { model.clearTracks(); } );

    this.bottomLayer.addChild( this.clearButton.mutate( { left: 5, centerY: this.trackCreationPanel.centerY } ) );

  }

  /**
   * Add a TrackNode to this ScreenView and add listeners that will
   * handle disposal.
   *
   * @param {Track} track
   * @returns {TrackNode}
   */
  addTrackNode( track ) {
    const trackNode = new TrackNode( this.model, track, this.modelViewTransform, this.availableModelBoundsProperty, this.trackNodeGroupTandem.createTandem( track.tandem.name ) );
    this.trackLayer.addChild( trackNode );

    // When track removed, remove its view
    const itemRemovedListener = removed => {
      if ( removed === track ) {
        this.trackLayer.removeChild( trackNode );

        // Clean up memory leak
        this.model.tracks.removeItemRemovedListener( itemRemovedListener );
        trackNode.dispose();
      }
    };
    this.model.tracks.addItemRemovedListener( itemRemovedListener );

    return trackNode;
  }
}

energySkatePark.register( 'EnergySkateParkPlaygroundScreenView', EnergySkateParkPlaygroundScreenView );
export default EnergySkateParkPlaygroundScreenView;