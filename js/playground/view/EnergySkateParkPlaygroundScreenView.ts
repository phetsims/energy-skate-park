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
import Color from '../../../../scenery/js/util/Color.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Track from '../../common/model/Track.js';
import EnergySkateParkScreenView, { EnergySkateParkScreenViewOptions } from '../../common/view/EnergySkateParkScreenView.js';
import TrackNode from '../../common/view/TrackNode.js';
import TrackToolboxPanel from '../../common/view/TrackToolboxPanel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
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
      tandem: tandem.createTandem( 'clearButton' ),
      accessibleName: EnergySkateParkFluent.a11y.clearButton.accessibleNameStringProperty
    } );
    model.clearButtonEnabledProperty.linkAttribute( this.clearButton, 'enabled' );
    this.clearButton.addListener( () => {
      model.clearTracks();
      this.clearButton.addAccessibleContextResponse(
        EnergySkateParkFluent.a11y.clearButton.accessibleContextResponseStringProperty
      );
    } );
    this.addChild( this.clearButton );

    // add any other TrackNodes eagerly in case model has some initial Tracks, like when we are debugging
    model.tracks.map( this.addTrackNode.bind( this ) );

    this.timeControlNode.left = this.modelViewTransform.modelToViewX( 0.5 );
    this.trackToolbox.right = this.modelViewTransform.modelToViewX( -0.5 );
    this.clearButton.right = this.trackToolbox.left - 10;

    // Add track toolbox and clear button into the "Your Skate Park" heading PDOM order (before skaterNode)
    const headingOrder = this.yourSkateParkHeadingNode.pdomOrder!;
    const skaterIndex = headingOrder.indexOf( this.skaterNode );
    headingOrder.splice( skaterIndex, 0, this.trackToolbox, this.clearButton );
    this.yourSkateParkHeadingNode.pdomOrder = headingOrder;

    // Set the playground-specific helpText on the "Your Skate Park" heading
    this.yourSkateParkHeadingNode.accessibleHelpText =
      EnergySkateParkFluent.a11y.yourSkatePark.accessibleHelpTextStringProperty;

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

        // Skater on/off track
        const skaterPhrase = skaterTrack !== null ? onTrackString : offTrackString;

        // TODO: Move `${trackPhrase} ${skaterPhrase}` to the yaml file, see https://github.com/phetsims/energy-skate-park/issues/452
        return trackCount === 0 ? trackPhrase : `${trackPhrase} ${skaterPhrase}`;
      }
    );

    this.yourSkateParkHeadingNode.accessibleParagraph = paragraphProperty;

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

energySkatePark.register( 'EnergySkateParkPlaygroundScreenView', EnergySkateParkPlaygroundScreenView );