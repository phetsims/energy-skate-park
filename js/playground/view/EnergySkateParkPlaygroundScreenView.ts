// Copyright 2019-2026, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Track from '../../common/model/Track.js';
import EnergySkateParkScreenView, { EnergySkateParkScreenViewOptions } from '../../common/view/EnergySkateParkScreenView.js';
import TrackNode from '../../common/view/TrackNode.js';
import TrackToolboxPanel from '../../common/view/TrackToolboxPanel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkPlaygroundModel from '../model/EnergySkateParkPlaygroundModel.js';

export default class EnergySkateParkPlaygroundScreenView extends EnergySkateParkScreenView {

  // collection of TrackNodes added to the View
  private readonly trackNodes: TrackNode[];

  // for layout in subtypes
  private readonly trackToolbox: TrackToolboxPanel;

  // for layout in subtypes
  private readonly clearButton: EraserButton;

  public constructor( model: EnergySkateParkPlaygroundModel, tandem: Tandem, options?: EnergySkateParkScreenViewOptions ) {

    options = combineOptions<EnergySkateParkScreenViewOptions>( {
      controlPanelOptions: {
        showTrackButtons: false,
        visibilityControlsOptions: {
          showPieChartCheckbox: true,
          showGridCheckbox: false,
          showSpeedCheckbox: true,
          showStickToTrackCheckbox: true
        },
        gravityControlsOptions: {
          includeGravityComboBox: true
        }
      }
    }, options );

    super( model, tandem, options );

    this.trackNodes = [];

    this.trackToolbox = new TrackToolboxPanel( model, this, tandem.createTandem( 'trackToolbox' ), {
      rightCenter: this.timeControlNode.leftCenter.minusXY( 15, 0 )
    } );
    this.bottomLayer.addChild( this.trackToolbox );

    model.tracks.addItemAddedListener( this.addTrackNode.bind( this ) );

    this.clearButton = new EraserButton( {
      iconWidth: 30,
      baseColor: new Color( 221, 210, 32 ),
      rightCenter: this.trackToolbox.leftCenter.minusXY( 10, 0 ),
      tandem: tandem.createTandem( 'clearButton' )
    } );
    model.clearButtonEnabledProperty.linkAttribute( this.clearButton, 'enabled' );
    this.clearButton.addListener( () => { model.clearTracks(); } );
    this.addChild( this.clearButton );

    // add any other TrackNodes eagerly in case model has some initial Tracks, like when we are debugging
    model.tracks.map( this.addTrackNode.bind( this ) );

    this.timeControlNode.left = this.modelViewTransform.modelToViewX( 0.5 );
    this.trackToolbox.right = this.modelViewTransform.modelToViewX( -0.5 );
    this.clearButton.right = this.trackToolbox.left - 10;

    // Add track toolbox and clear button to the control area PDOM order (before timeControlNode)
    const controlOrder = this.pdomControlAreaNode.pdomOrder!;
    const timeControlIndex = controlOrder.indexOf( this.timeControlNode );
    controlOrder.splice( timeControlIndex, 0, this.clearButton, this.trackToolbox );
    this.pdomControlAreaNode.pdomOrder = controlOrder;

    // Some model elements are spuriously created when creating the track panel -- clear those out now so that the PhET-iO
    // changed state starts clear, see https://github.com/phetsims/energy-skate-park/issues/49
    model.reset();
  }

  /**
   * Add a TrackNode to this ScreenView and add listeners that will
   * handle disposal.
   */
  private addTrackNode( track: Track ): TrackNode {
    const trackNode = this.trackNodeGroup.createNextElement( track, this.modelViewTransform, this.availableModelBoundsProperty );
    this.trackNodes.push( trackNode );
    this.trackLayer.addChild( trackNode );

    // When track removed, remove its view
    const itemRemovedListener = ( removed: Track ) => {
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
}

energySkatePark.register( 'EnergySkateParkPlaygroundScreenView', EnergySkateParkPlaygroundScreenView );