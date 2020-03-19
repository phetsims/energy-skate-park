// Copyright 2019-2020, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import EraserButton from '../../../../../scenery-phet/js/buttons/EraserButton.js';
import Color from '../../../../../scenery/js/util/Color.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import TrackNode from './TrackNode.js';
import TrackToolboxPanel from './TrackToolboxPanel.js';

class EnergySkateParkPlaygroundScreenView extends EnergySkateParkScreenView {

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, tandem, options ) {

    super( model, tandem, options );

    // @private {TrackNode[]}- collection of TrackNodes added to the View
    this.trackNodes = [];

    // @protected - for layout in subtypes
    this.trackToolbox = new TrackToolboxPanel( model, this, tandem.createTandem( 'trackToolbox' ), {
      rightCenter: this.timeControlNode.leftCenter.minusXY( 15, 0 )
    } );
    this.bottomLayer.addChild( this.trackToolbox );

    model.tracks.addItemAddedListener( this.addTrackNode.bind( this ) );

    // @protected - for layout in subtypes
    this.clearButton = new EraserButton( {
      iconWidth: 30,
      baseColor: new Color( 221, 210, 32 ),
      rightCenter: this.trackToolbox.leftCenter.minusXY( 10, 0 ),
      tandem: tandem.createTandem( 'clearButton' )
    } );
    model.clearButtonEnabledProperty.linkAttribute( this.clearButton, 'enabled' );
    this.clearButton.addListener( () => { model.clearTracks(); } );
    this.addChild( this.clearButton );
  }

  /**
   * Add a TrackNode to this ScreenView and add listeners that will
   * handle disposal.
   * @public
   *
   * @param {Track} track
   * @returns {TrackNode}
   */
  addTrackNode( track ) {
    const trackNode = new TrackNode( this.model, track, this.modelViewTransform, this.availableModelBoundsProperty, this.trackNodeGroupTandem.createTandem( track.tandem.name ) );
    this.trackNodes.push( trackNode );
    this.trackLayer.addChild( trackNode );

    // When track removed, remove its view
    const itemRemovedListener = removed => {
      if ( removed === track ) {
        this.trackLayer.removeChild( trackNode );

        const index = this.trackNodes.indexOf( trackNode );
        this.trackNodes.splice( index, 1 );

        // Clean up memory leak
        this.model.tracks.removeItemRemovedListener( itemRemovedListener );
        trackNode.dispose();
      }
    };
    this.model.tracks.addItemRemovedListener( itemRemovedListener );

    return trackNode;
  }

  /**
   * Get the TrackNode used in this ScreeenView from the provided Track model.
   * @public
   *
   * @param {Track} track
   */
  getTrackNode( track ) {
    return _.find( this.trackNodes, trackNode => trackNode.track === track );
  }
}

energySkatePark.register( 'EnergySkateParkPlaygroundScreenView', EnergySkateParkPlaygroundScreenView );
export default EnergySkateParkPlaygroundScreenView;