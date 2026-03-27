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
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Track from '../../common/model/Track.js';
import PlaygroundScreenSummaryContent from './PlaygroundScreenSummaryContent.js';
import EnergySkateParkScreenView, { EnergySkateParkScreenViewOptions } from '../../common/view/EnergySkateParkScreenView.js';
import TrackNode from '../../common/view/TrackNode.js';
import TrackToolboxPanel from '../../common/view/TrackToolboxPanel.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPlaygroundModel from '../model/EnergySkateParkPlaygroundModel.js';
import PlaygroundTrackStatusNode from './PlaygroundTrackStatusNode.js';

export default class EnergySkateParkPlaygroundScreenView extends EnergySkateParkScreenView {

  // collection of TrackNodes added to the View
  private readonly trackNodes: TrackNode[];

  // for layout in subtypes
  private readonly trackToolbox: TrackToolboxPanel;

  public constructor( model: EnergySkateParkPlaygroundModel, tandem: Tandem, options?: EnergySkateParkScreenViewOptions ) {

    options = combineOptions<EnergySkateParkScreenViewOptions>( {
      screenSummaryContent: new PlaygroundScreenSummaryContent( model ),
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

    this.trackToolbox = new TrackToolboxPanel( model, this, {
      rightCenter: this.timeControlNode.leftCenter.minusXY( 15, 0 ),
      tandem: tandem.createTandem( 'trackToolbox' )
    } );
    this.bottomLayer.addChild( this.trackToolbox );

    model.tracks.addItemAddedListener( this.addTrackNode.bind( this ) );

    const eraseTracksButton = new EraserButton( {
      iconWidth: 30,
      baseColor: new Color( 221, 210, 32 ),
      rightCenter: this.trackToolbox.leftCenter.minusXY( 10, 0 ),
      tandem: tandem.createTandem( 'eraseTracksButton' ),
      enabledPropertyOptions: { phetioReadOnly: true },
      accessibleName: EnergySkateParkFluent.a11y.eraseTracksButton.accessibleNameStringProperty
    } );
    model.clearButtonEnabledProperty.linkAttribute( eraseTracksButton, 'enabled' );
    eraseTracksButton.addListener( () => {
      model.clearTracks();
      eraseTracksButton.addAccessibleContextResponse(
        EnergySkateParkFluent.a11y.eraseTracksButton.accessibleContextResponseStringProperty
      );
    } );
    this.addChild( eraseTracksButton );

    // add any other TrackNodes eagerly in case model has some initial Tracks, like when we are debugging
    model.tracks.map( this.addTrackNode.bind( this ) );

    this.timeControlNode.left = this.modelViewTransform.modelToViewX( 0.5 );
    this.trackToolbox.right = this.modelViewTransform.modelToViewX( -0.5 );
    eraseTracksButton.right = this.trackToolbox.left - 10;

    // Add track toolbox and erase button into the "Your Skate Park" heading PDOM order (before skaterNode)
    const headingOrder = this.yourSkateParkHeadingNode.pdomOrder!;
    const skaterIndex = headingOrder.indexOf( this.skaterNode );
    headingOrder.splice( skaterIndex, 0, this.trackToolbox, eraseTracksButton );

    // Set the playground-specific helpText on the "Your Skate Park" heading, before content so it reads
    // right after the heading rather than after all children.
    this.yourSkateParkHeadingNode.accessibleHelpTextBehavior = ParallelDOM.HELP_TEXT_BEFORE_CONTENT;
    this.yourSkateParkHeadingNode.accessibleHelpText = EnergySkateParkFluent.a11y.yourSkatePark.accessibleHelpTextStringProperty;

    // Dynamic paragraph describing the number of tracks and skater status for screen readers
    const trackStatusNode = new PlaygroundTrackStatusNode( model );
    this.addChild( trackStatusNode );

    // Add track status paragraph at the start of the heading order, then commit all heading pdomOrder changes
    headingOrder.unshift( trackStatusNode );
    this.yourSkateParkHeadingNode.pdomOrder = headingOrder;

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

    // Set a stable pdomOrder based on model tracks order so that moveToFront() during drag
    // doesn't disrupt the PDOM reading order (e.g., "Track 2" announced before "Track 1").
    this.updateTrackLayerPdomOrder();

    // When track removed, remove its view
    const itemRemovedListener = ( removed: Track ) => {
      if ( removed === track ) {
        this.trackLayer.removeChild( trackNode );

        const index = this.trackNodes.indexOf( trackNode );
        this.trackNodes.splice( index, 1 );

        this.updateTrackLayerPdomOrder();

        // Clean up memory leak
        this.model.tracks.removeItemRemovedListener( itemRemovedListener );
        trackNode.dispose();
      }
    };
    this.model.tracks.addItemRemovedListener( itemRemovedListener );

    return trackNode;
  }

  /**
   * Update trackLayer.pdomOrder to match model.tracks order, so that moveToFront() for visual
   * z-ordering does not affect the screen reader navigation order.
   */
  private updateTrackLayerPdomOrder(): void {
    this.trackLayer.pdomOrder = this.model.tracks.map( track =>
      this.trackNodes.find( trackNode => trackNode.track === track )!
    );
  }
}
