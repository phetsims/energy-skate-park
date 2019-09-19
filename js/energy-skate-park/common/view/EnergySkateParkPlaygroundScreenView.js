// Copyright 2019, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  const TrackNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/TrackNode' );
  const Color = require( 'SCENERY/util/Color' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {EnergySkateParkModel} model
   * @param {Array.<PhysicalSlider|PhysicalNumberControl} physicalControls
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function EnergySkateParkPlaygroundScreenView( model, physicalControls, tandem, options ) {
    EnergySkateParkScreenView.call( this, model, physicalControls, tandem, options );

    // Create the tracks for the track toolbox
    var interactiveTrackNodes = model.tracks.getArray().map( this.addTrackNode.bind( this ) );

    var padding = 10;

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
    this.clearButton.addListener( function() {model.clearTracks();} );

    this.bottomLayer.addChild( this.clearButton.mutate( { left: 5, centerY: this.trackCreationPanel.centerY } ) );
  }

  energySkatePark.register( 'EnergySkateParkPlaygroundScreenView', EnergySkateParkPlaygroundScreenView );

  return inherit( EnergySkateParkScreenView, EnergySkateParkPlaygroundScreenView, {

    /**
     * Add a TrackNode to this ScreenView and add listeners that will
     * handle disposal.
     *
     * @param {Track} track
     * @returns {TrackNode}
     */
    addTrackNode( track ) {
      var trackNode = new TrackNode( this.model, track, this.modelViewTransform, this.availableModelBoundsProperty, this.trackNodeGroupTandem.createTandem( track.tandem.name ) );
      this.trackLayer.addChild( trackNode );

      // When track removed, remove its view
      var itemRemovedListener = removed => {
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
  } );
} );
