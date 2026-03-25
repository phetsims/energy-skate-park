// Copyright 2019-2026, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Track from '../../common/model/Track.js';
import EnergySkateParkScreenSummaryContent from '../../common/view/EnergySkateParkScreenSummaryContent.js';
import EnergySkateParkScreenView, { EnergySkateParkScreenViewOptions } from '../../common/view/EnergySkateParkScreenView.js';
import TrackNode from '../../common/view/TrackNode.js';
import TrackToolboxPanel from '../../common/view/TrackToolboxPanel.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkPlaygroundModel from '../model/EnergySkateParkPlaygroundModel.js';

export default class EnergySkateParkPlaygroundScreenView extends EnergySkateParkScreenView {

  // collection of TrackNodes added to the View
  private readonly trackNodes: TrackNode[];

  // for layout in subtypes
  private readonly trackToolbox: TrackToolboxPanel;

  public constructor( model: EnergySkateParkPlaygroundModel, tandem: Tandem, options?: EnergySkateParkScreenViewOptions ) {

    options = combineOptions<EnergySkateParkScreenViewOptions>( {
      screenSummaryContent: new EnergySkateParkScreenSummaryContent( model, 'playground' ),
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


    // REVIEW: This is a lot of logic for description that I think might benefit from being in its own file
    // for readability.
    // Add track toolbox and clear button into the "Your Skate Park" heading PDOM order (before skaterNode)
    const headingOrder = this.yourSkateParkHeadingNode.pdomOrder!;
    const skaterIndex = headingOrder.indexOf( this.skaterNode );
    headingOrder.splice( skaterIndex, 0, this.trackToolbox, eraseTracksButton );
    this.yourSkateParkHeadingNode.pdomOrder = headingOrder;

    // Set the playground-specific helpText on the "Your Skate Park" heading, before content so it reads
    // right after the heading rather than after all children.
    this.yourSkateParkHeadingNode.accessibleHelpTextBehavior = ParallelDOM.HELP_TEXT_BEFORE_CONTENT;
    this.yourSkateParkHeadingNode.accessibleHelpText = EnergySkateParkFluent.a11y.yourSkatePark.accessibleHelpTextStringProperty;

    // Use a counter that increments on trackChangedEmitter to capture join/split changes
    // that don't affect the tracks array length
    const trackChangeCountProperty = new NumberProperty( 0 );
    model.trackChangedEmitter.addListener( () => trackChangeCountProperty.value++ );

    // Dynamic paragraph describing the number of tracks and skater status
    const paragraphProperty = new DerivedProperty(
      [
        model.tracks.lengthProperty,
        trackChangeCountProperty,
        model.skater.trackProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseNoneStringProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOnTrackStringProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOffTrackStringProperty
      ] as const,
      ( trackCount, _changeCount, skaterTrack, noneString, onTrackString, offTrackString ) => {
        let trackPhrase: string;
        if ( trackCount === 0 ) {
          trackPhrase = noneString;
        }
        else {
          // Count total visible control points across all tracks
          let totalControlPoints = 0;

          // REVIEW: Why not use model.tracks.sumBy?
          for ( let j = 0; j < model.tracks.length; j++ ) {
            totalControlPoints += model.tracks.get( j ).controlPoints.filter( controlPoint => controlPoint.visible ).length;
          }

          if ( trackCount === 1 ) {
            trackPhrase = EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseSingle.format( {
              numberControlPoints: totalControlPoints
            } );
          }
          else {
            trackPhrase = EnergySkateParkFluent.a11y.yourSkatePark.playgroundTrackPhraseMultiple.format( {
              numberTracks: trackCount,
              numberControlPoints: totalControlPoints
            } );
          }
        }

        // Skater on/off track — when multiple tracks exist, specify which track by index
        let skaterPhrase: string;
        if ( skaterTrack !== null && trackCount > 1 ) {
          skaterPhrase = EnergySkateParkFluent.a11y.yourSkatePark.skaterOnTrackWithIndex.format( {
            index: model.tracks.indexOf( skaterTrack ) + 1
          } );
        }
        else {
          skaterPhrase = skaterTrack !== null ? onTrackString : offTrackString;
        }

        // REVIEW: Can't you just return the noneString here if trackCount === 0 rather than also
        // have an if clause above to handle it?
        return trackCount === 0 ? trackPhrase : EnergySkateParkFluent.a11y.yourSkatePark.trackAndSkaterParagraph.format( {
          trackPhrase: trackPhrase,
          skaterPhrase: skaterPhrase
        } );
      }
    );

    // Use a child Node for the paragraph so it appears after the help text (which uses HELP_TEXT_BEFORE_CONTENT)
    const trackStatusNode = new Node( { accessibleParagraph: paragraphProperty } );
    this.addChild( trackStatusNode );

    // REVIEW: This is another spot where the pdom order sims unnecessarily obfuscated.
    const currentOrder = this.yourSkateParkHeadingNode.pdomOrder;
    currentOrder.unshift( trackStatusNode );
    this.yourSkateParkHeadingNode.pdomOrder = currentOrder;

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
  // REVIEW: This pdom order strategy seems much easier to follow. It's clearly being set in one spot that is
  // easy to navigate to. This might be a good example of how to update pdom order setting elsewhere.
  private updateTrackLayerPdomOrder(): void {
    this.trackLayer.pdomOrder = this.model.tracks.map( track =>
      this.trackNodes.find( trackNode => trackNode.track === track )!
    );
  }
}
