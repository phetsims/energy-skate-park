// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node for the Energy Skate Park view (includes everything you see).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Rectangle from '../../../../dot/js/Rectangle.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import MeasuringTapeNode from '../../../../scenery-phet/js/MeasuringTapeNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import ValueGaugeNode from '../../../../scenery-phet/js/ValueGaugeNode.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import Track from '../model/Track.js';
import AttachDetachToggleButtons from './AttachDetachToggleButtons.js';
import BackgroundNode from './BackgroundNode.js';
import EnergyBarGraphAccordionBox from './EnergyBarGraphAccordionBox.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import EnergySkateParkControlPanel from './EnergySkateParkControlPanel.js';
import EnergySkateParkGridNode from './EnergySkateParkGridNode.js';
import PieChartLegend from './PieChartLegend.js';
import PieChartNode from './PieChartNode.js';
import ReferenceHeightLine from './ReferenceHeightLine.js';
import SkaterNode from './SkaterNode.js';
import ToolboxPanel from './ToolboxPanel.js';
import TrackNode from './TrackNode.js';
import VisibilityControlsPanel from './VisibilityControlsPanel.js';

const controlsRestartSkaterStringProperty = EnergySkateParkStrings.skaterControls.restartSkaterStringProperty;
const propertiesSpeedStringProperty = EnergySkateParkStrings.speedometer.labelStringProperty;
const speedometerMetersPerSecondPatternStringProperty = EnergySkateParkStrings.speedometer.metersPerSecondPatternStringProperty;
const measuringTapeUnitsStringProperty = EnergySkateParkStrings.measuringTape.unitsStringProperty;

// constants
// for wider screens, panels can float to the left and right by this much beyond dev bounds in view coordinates
const EXTRA_FLOAT = 51.5;

// Debug flag to show the view bounds, the region within which the skater can move
const showAvailableBounds = false;

type SelfOptions = {

  // options for the bar graph, see composite type options below
  barGraphOptions?: IntentionalAny;

  // whether or not this ScreenView should have a bar graph
  showBarGraph?: boolean;

  // whether or not to show buttons that select premade tracks
  showTrackButtons?: boolean;

  // whether or not this ScreenView will show the skater path along the track
  showSkaterPath?: boolean;

  // whether or not the bar graph should include zoom buttons
  showBarGraphZoomButtons?: boolean;

  // whether or not the screen will include radio buttons to control skater attaching/detaching
  // from the tracks
  showAttachDetachRadioButtons?: boolean;

  // whether or not this ScreenView will show the reference height
  showReferenceHeight?: boolean;

  // whether or not to include a toolbox that contains a ruler and a measuring tape
  showToolbox?: boolean;

  // if true, the "grid" and "reference height" visibility controls will be displayed in a separate
  // panel near the bottom of the screen
  showSeparateVisibilityControlsPanel?: boolean;

  // options passed along to EnergySkateParkControlPanel
  controlPanelOptions?: IntentionalAny;

  // passed to EnergySkateParkControlPanel, options for the EnergySkateParkVisibilityControls in that
  // panel
  visibilityControlsOptions?: IntentionalAny;
};

type EnergySkateParkScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class EnergySkateParkScreenView extends ScreenView {
  public readonly modelViewTransform: ModelViewTransform2;
  public readonly availableModelBoundsProperty: Property<Bounds2>;
  public readonly trackNodeGroup: { createNextElement( track: Track, modelViewTransform: ModelViewTransform2, availableBoundsProperty: IntentionalAny, options?: IntentionalAny ): TrackNode };
  protected readonly model: EnergySkateParkModel;

  // whether or not this screen view should include a measuring tape
  public readonly showToolbox: boolean;

  // visibility of various view components
  private readonly showBarGraph: boolean;
  private readonly showSkaterPath: boolean;
  private readonly showReferenceHeight: boolean;
  private readonly showTrackButtons: boolean;
  private readonly showSeparateVisibilityControlsPanel: boolean;

  // defines the min and max edges horizontally for floating layout, null until first
  // layout() - includes padding so elements won't touch the edge
  protected fixedRight: number | null;
  protected fixedLeft: number | null;

  // Layers for nodes in the sim. The bottom layer contains the background and UI components that should
  // be behind the animating skater and other draggable things, which are in the topLayer.
  protected readonly bottomLayer: Node;
  protected readonly topLayer: Node;
  public readonly skaterNode: SkaterNode;
  private readonly backgroundNode: BackgroundNode;
  private readonly gridNode: EnergySkateParkGridNode;
  protected readonly controlPanel: EnergySkateParkControlPanel;

  // node that shows the energy legend for the pie chart
  protected readonly pieChartLegend: PieChartLegend;
  private readonly attachDetachToggleButtons?: AttachDetachToggleButtons;

  // the bar chart showing energy distribution
  private readonly energyBarGraphAccordionBox?: EnergyBarGraphAccordionBox;
  private readonly resetAllButton: ResetAllButton;
  private readonly returnSkaterButton: RectangularPushButton;

  // for layout or repositioning in subtypes
  protected readonly speedometerNode: ValueGaugeNode;

  // (for layout) - Layer which will contain all of the tracks
  protected readonly trackLayer: Node;
  public readonly measuringTapeNode?: MeasuringTapeNode;
  public readonly stopwatchNode?: StopwatchNode;

  // so it can float to the layout bounds, see layout()
  private readonly toolboxPanel?: ToolboxPanel;

  // above the track because it is draggable, but below the skater because
  // it is important for the skater center of mass representation to always be visible
  private readonly referenceHeightLine: ReferenceHeightLine;

  // play/pause and step buttons are same size until playingProperty is false
  protected readonly timeControlNode: TimeControlNode;

  // for layout
  private readonly visibilityControlsPanel?: VisibilityControlsPanel;

  private readonly viewBoundsPath?: Path;
  public availableModelBounds?: Bounds2;

  public constructor( model: EnergySkateParkModel, tandem: Tandem, providedOptions?: EnergySkateParkScreenViewOptions ) {
    const options = optionize<EnergySkateParkScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      barGraphOptions: null,
      showBarGraph: true,
      showTrackButtons: true,
      showSkaterPath: false,
      showBarGraphZoomButtons: true,
      showAttachDetachRadioButtons: false,
      showReferenceHeight: true,
      showToolbox: true,
      showSeparateVisibilityControlsPanel: true,
      controlPanelOptions: null,
      visibilityControlsOptions: null
    }, providedOptions );

    super( {
      tandem: tandem
    } );

    const modelPoint = new Vector2( 0, 0 );

    // earth is 86px high in stage coordinates
    const viewPoint = new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height - BackgroundNode.earthHeight );

    // scale chosen so that displayed model is the same as it was for energy-skate-park-basics when that sim
    // used non-default layout bounds
    const scale = 61.40;
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( modelPoint, viewPoint, scale );
    this.modelViewTransform = modelViewTransform;

    this.availableModelBoundsProperty = new Property( new Bounds2( 0, 0, 0, 0 ), {
      valueType: [ Bounds2 ]
    } );
    this.availableModelBoundsProperty.link( bounds => {
      model.availableModelBoundsProperty.set( bounds );
    } );

    // Mimic the PhetioGroup API until we implement the full instrumentation
    this.trackNodeGroup = {
      createNextElement( track, modelViewTransform, availableBoundsProperty, options ) {
        assert && options && assert( !options.hasOwnProperty( 'tandem' ), 'tandem is managed by the PhetioGroup' );
        return new TrackNode( track, modelViewTransform, availableBoundsProperty, Tandem.OPT_OUT, options );
      }
    };

    this.model = model;
    this.showToolbox = options.showToolbox;
    this.showBarGraph = options.showBarGraph;
    this.showSkaterPath = options.showSkaterPath;
    this.showReferenceHeight = options.showReferenceHeight;
    this.showTrackButtons = options.showTrackButtons;
    this.showSeparateVisibilityControlsPanel = options.showSeparateVisibilityControlsPanel;
    this.fixedRight = null;
    this.fixedLeft = null;
    this.bottomLayer = new Node();
    this.topLayer = new Node();
    this.children = [ this.bottomLayer, this.topLayer ];

    this.skaterNode = new SkaterNode(
      model.skater,
      this,
      model.userControlledPropertySet.skaterControlledProperty,
      modelViewTransform,

      model.getClosestTrackAndPositionAndParameter.bind( model ),
      model.getPhysicalTracks.bind( model ),
      tandem.createTandem( 'skaterNode' )
    );

    // The background
    this.backgroundNode = new BackgroundNode( this.layoutBounds, this.visibleBoundsProperty );
    this.bottomLayer.addChild( this.backgroundNode );

    this.gridNode = new EnergySkateParkGridNode( model.gridVisibleProperty, model.skater.referenceHeightProperty, this.visibleBoundsProperty, modelViewTransform, tandem.createTandem( 'energySkateParkGridNode' ) );
    this.bottomLayer.addChild( this.gridNode );

    this.controlPanel = new EnergySkateParkControlPanel( model, this, tandem.createTandem( 'controlPanel' ), options.controlPanelOptions );
    this.bottomLayer.addChild( this.controlPanel );

    this.pieChartLegend = new PieChartLegend(
      model.skater,
      model.clearThermal.bind( model ),
      model.pieChartVisibleProperty,
      tandem.createTandem( 'pieChartLegend' )
    );
    this.bottomLayer.addChild( this.pieChartLegend );

    // For the playground screen, show attach/detach toggle buttons
    if ( options.showAttachDetachRadioButtons ) {
      const property = model.tracksDraggable ? new Property( true ) :

        // @ts-expect-error
                       new DerivedProperty( [ model.sceneProperty ], scene => { scene === 2; } );

      // @ts-expect-error
      this.attachDetachToggleButtons = new AttachDetachToggleButtons( model.stickingToTrackProperty, property, 184, tandem.createTandem( 'attachDetachToggleButtons' ) );
      this.bottomLayer.addChild( this.attachDetachToggleButtons );
    }

    if ( this.showBarGraph ) {
      this.energyBarGraphAccordionBox = new EnergyBarGraphAccordionBox( model.skater, model.barGraphScaleProperty, model.barGraphVisibleProperty, tandem.createTandem( 'energyBarGraphAccordionBox' ), {
        barGraphOptions: {
          showBarGraphZoomButtons: options.showBarGraphZoomButtons
        }
      } );
      this.energyBarGraphAccordionBox.leftTop = new Vector2( 5, 5 );
      this.bottomLayer.addChild( this.energyBarGraphAccordionBox );
    }

    this.resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
      },

      // Align vertically with other controls, see #134
      centerY: ( modelViewTransform.modelToViewY( 0 ) + this.layoutBounds.maxY ) / 2,

      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.bottomLayer.addChild( this.resetAllButton );

    // The button to return the skater
    this.returnSkaterButton = new RectangularPushButton( {
      content: new Text( controlsRestartSkaterStringProperty, {
        tandem: tandem.createTandem( 'restartSkaterText' ),
        maxWidth: 90,
        font: EnergySkateParkConstants.CONTROL_LABEL_FONT
      } ),
      listener: model.returnSkater.bind( model ),
      centerY: this.resetAllButton.centerY,
      // X updated in layoutBounds since the reset all button can move horizontally
      tandem: tandem.createTandem( 'returnSkaterButton' )
    } );

    // Disable the return skater button when the skater is already at his initial coordinates
    model.skater.movedProperty.linkAttribute( this.returnSkaterButton, 'enabled' );
    this.bottomLayer.addChild( this.returnSkaterButton );

    const gaugeRadius = 76;

    this.speedometerNode = new ValueGaugeNode( model.skater.speedProperty, propertiesSpeedStringProperty, new Range( 0, 30 ), {
      numberDisplayOptions: {
        valuePattern: speedometerMetersPerSecondPatternStringProperty,
        decimalPlaces: 1,
        textOptions: {
          maxWidth: gaugeRadius * 1.3,
          font: new PhetFont( 20 )
        }
      },
      updateWhenInvisible: false,
      pickable: false,
      radius: gaugeRadius,
      tandem: tandem.createTandem( 'speedometerNode' )
    } );
    model.speedometerVisibleProperty.linkAttribute( this.speedometerNode, 'visible' );
    model.speedValueVisibleProperty.link( visible => { this.speedometerNode.setNumberDisplayVisible( visible ); } );

    // default layout, but may change in subtypes
    this.speedometerNode.centerX = this.layoutBounds.centerX;
    this.speedometerNode.top = this.layoutBounds.minY + 5;
    this.bottomLayer.addChild( this.speedometerNode );

    this.trackLayer = new Node( {
      tandem: tandem.createTandem( 'trackLayer' )
    } );

    // tracks on top of panels and non-interactive visualizations
    this.topLayer.addChild( this.trackLayer );

    // add a measuring tape, on top of tracks, below the skater
    if ( options.showToolbox ) {

      const unitsProperty = new DerivedProperty( [ measuringTapeUnitsStringProperty ], measuringTapeUnitsString => {
        return { name: measuringTapeUnitsString, multiplier: 1 };
      } );

      this.measuringTapeNode = new MeasuringTapeNode( unitsProperty, {
        visibleProperty: model.measuringTapeVisibleProperty,
        basePositionProperty: model.measuringTapeBasePositionProperty,
        tipPositionProperty: model.measuringTapeTipPositionProperty,
        modelViewTransform: modelViewTransform,
        dragBounds: this.availableModelBoundsProperty.get(),
        textBackgroundColor: EnergySkateParkColorScheme.transparentPanelFill,
        textColor: 'black',
        textFont: new PhetFont( { size: 14.7 } ),
        baseDragEnded: () => {
          if ( this.measuringTapeNode!.getLocalBaseBounds().intersectsBounds( this.toolboxPanel!.bounds ) ) {
            model.measuringTapeVisibleProperty.set( false );
          }
        },
        tandem: tandem.createTandem( 'measuringTapeNode' )
      } );

      this.stopwatchNode = new StopwatchNode( model.stopwatch, {
        dragBoundsProperty: this.visibleBoundsProperty,
        tandem: tandem.createTandem( 'stopwatchNode' ),
        numberDisplayOptions: {
          numberFormatter: StopwatchNode.createRichTextNumberFormatter( {
            bigNumberFont: 25,
            smallNumberFont: 17
          } )
        },
        dragListenerOptions: {
          end: () => {
            if ( this.stopwatchNode!.bounds.intersectsBounds( this.toolboxPanel!.bounds ) ) {
              model.stopwatch.isVisibleProperty.value = false;
            }
          }
        }
      } );

      this.topLayer.addChild( this.stopwatchNode );
      this.topLayer.addChild( this.measuringTapeNode );

      this.toolboxPanel = new ToolboxPanel( model, this, tandem.createTandem( 'toolboxPanel' ), {
        minWidth: this.controlPanel.width
      } );
      this.bottomLayer.addChild( this.toolboxPanel );
    }

    this.referenceHeightLine = new ReferenceHeightLine(
      modelViewTransform,
      model.skater.referenceHeightProperty,
      model.referenceHeightVisibleProperty,
      model.userControlledPropertySet.referenceHeightControlledProperty,
      tandem.createTandem( 'referenceHeightLine' )
    );
    this.topLayer.addChild( this.referenceHeightLine );

    // skaterNode is above most things as it is the primary draggable object
    this.topLayer.addChild( this.skaterNode );

    const pieChartNode = new PieChartNode( model.skater, model.pieChartVisibleProperty, modelViewTransform, tandem.createTandem( 'pieChartNode' ) );
    this.topLayer.addChild( pieChartNode );

    // relative to the control panel, but this will not float with the layout
    this.referenceHeightLine.centerX = this.layoutBounds.centerX;

    // Buttons to return the skater when she is offscreen, see #219
    const iconScale = 0.19;
    const skaterIconImage1 = new Image( this.skaterNode.skaterImageSetProperty.value.leftImageProperty, {
      scale: iconScale
    } );
    const returnSkaterToPreviousStartingPositionButton = new RectangularPushButton( {
      content: skaterIconImage1,

      // green means "go" since the skater will likely start moving at this point
      baseColor: EnergySkateParkColorScheme.kineticEnergy,
      listener: model.returnSkater.bind( model ),
      tandem: tandem.createTandem( 'returnSkaterToPreviousStartingPositionButton' )
    } );

    const skaterIconImage2 = new Image( this.skaterNode.skaterImageSetProperty.value.leftImageProperty, {
      scale: iconScale
    } );
    const returnSkaterToGroundButton = new RectangularPushButton( {
      content: skaterIconImage2,
      centerBottom: modelViewTransform.modelToViewPosition( model.skater.startingPositionProperty.value ),
      baseColor: '#f4514e', // red for stop, since the skater will be stopped on the ground.
      listener: () => {

        // resetting the skater position will change state of simulation
        model.userControlledPropertySet.skaterControlledProperty.set( true );
        model.skater.resetPosition();
        model.userControlledPropertySet.skaterControlledProperty.set( false );
      },
      tandem: tandem.createTandem( 'returnSkaterToGroundButton' )
    } );

    this.skaterNode.skaterImageSetProperty.link( skaterImageSet => {
      skaterIconImage1.setImageProperty( skaterImageSet.leftImageProperty );
      skaterIconImage2.setImageProperty( skaterImageSet.leftImageProperty );
    } );

    // the "return skater" buttons are in the top layer so that they can be on top of the track and easily visible
    // when the skater goes off screen
    this.topLayer.addChild( returnSkaterToPreviousStartingPositionButton );
    this.topLayer.addChild( returnSkaterToGroundButton );

    const playingProperty = new BooleanProperty( !model.pausedProperty.value, {
      tandem: tandem.createTandem( 'playingProperty' )
    } );
    model.pausedProperty.link( paused => {
      playingProperty.set( !paused );
    } );
    playingProperty.link( playing => {
      model.pausedProperty.set( !playing );
    } );

    this.timeControlNode = new TimeControlNode( playingProperty, {
      tandem: tandem.createTandem( 'timeControlNode' ),
      timeSpeedProperty: model.timeSpeedProperty,
      flowBoxSpacing: 23.3, // extra spacing avoids pointer area overlap when play pause button size increases
      playPauseStepButtonOptions: {
        playPauseButtonOptions: {
          radius: 22.1
        },
        stepForwardButtonOptions: {
          radius: 16,
          listener: model.manualStep.bind( model )
        }
      },
      speedRadioButtonGroupOptions: {
        labelOptions: {
          font: new PhetFont( 17 )
        },
        radioButtonOptions: {
          radius: 10
        }
      }
    } );

    this.topLayer.addChild( this.timeControlNode );

    this.timeControlNode.setCenterBottom( this.layoutBounds.centerBottom.minusXY( 0, 15 ) );

    // grid and reference height visibility are controlled from a separate panel
    if ( this.showSeparateVisibilityControlsPanel ) {

      this.visibilityControlsPanel = new VisibilityControlsPanel( model, tandem.createTandem( 'visibilityControlsPanel' ), {
        centerY: this.timeControlNode.centerY
      } );
      this.addToBottomLayer( this.visibilityControlsPanel );
    }

    // When the skater goes off screen, make the "return skater" button big
    model.skaterInBoundsProperty.link( inBounds => {
      const buttonsVisible = !inBounds;
      returnSkaterToGroundButton.visible = buttonsVisible;
      returnSkaterToPreviousStartingPositionButton.visible = buttonsVisible;

      if ( buttonsVisible ) {

        // Put the button where the skater will appear.  Nudge it up a bit so the mouse can hit it from the drop site,
        // without being moved at all (to simplify repeat runs).
        const viewPosition = modelViewTransform.modelToViewPosition( model.skater.startingPositionProperty.value ).plusXY( 0, 5 );
        returnSkaterToPreviousStartingPositionButton.centerBottom = viewPosition;

        // If the return skater button went offscreen, move it back on the screen, see #222 and #355
        if ( returnSkaterToPreviousStartingPositionButton.top < 5 ) {
          returnSkaterToPreviousStartingPositionButton.top = 5;
        }
        if ( returnSkaterToPreviousStartingPositionButton.left < 5 ) {
          returnSkaterToPreviousStartingPositionButton.left = 5;
        }
        if ( returnSkaterToPreviousStartingPositionButton.right > this.layoutBounds.right - 5 ) {
          returnSkaterToPreviousStartingPositionButton.right = this.layoutBounds.right - 5;
        }
      }
    } );

    // When the model resets, go back to the default image set for the skater.
    this.model.resetEmitter.addListener( () => {
      this.skaterNode.selectedSkaterProperty.reset();
    } );

    // For debugging the visible bounds
    if ( showAvailableBounds ) {
      this.viewBoundsPath = new Path( null, {
        pickable: false,
        stroke: 'red',
        lineWidth: 10,
        tandem: tandem.createTandem( 'viewBoundsPath' )
      } );
      this.topLayer.addChild( this.viewBoundsPath );
    }

    this.visibleBoundsProperty.lazyLink( visibleBounds => {

      // Compute the visible model bounds so we will know when a model object like the skater has gone offscreen
      this.availableModelBounds = this.modelViewTransform.viewToModelBounds( visibleBounds );
      this.availableModelBoundsProperty.value = this.availableModelBounds;

      // limit measuring tape to available area
      if ( options.showToolbox ) {
        this.measuringTapeNode!.setDragBounds( this.availableModelBounds );
      }

      // Show it for debugging
      if ( showAvailableBounds ) {
        this.viewBoundsPath!.shape = Shape.bounds( this.visibleBoundsProperty.get() );
      }
    } );
  }

  /**
   * Layout the EnergySkateParkScreenView, scaling it up and down with the size of the screen to ensure a
   * minimally visible area, but keeping it centered at the bottom of the screen, so there is more area in the +y
   * direction to build tracks and move the skater.
   */
  public override layout( viewBounds: Bounds2 ): void {
    assert && assert( this.controlPanel, 'much of component layout based on control panel, one should be created.' );

    this.resetTransform();

    const scale = this.getLayoutScale( viewBounds );
    const width = viewBounds.width;
    const height = viewBounds.height;

    this.setScaleMagnitude( scale );

    let offsetX = 0;
    let offsetY = 0;

    // Move to bottom vertically
    if ( scale === width / this.layoutBounds.width ) {
      offsetY = ( height / scale - this.layoutBounds.height );
    }

    // center horizontally
    else if ( scale === height / this.layoutBounds.height ) {
      offsetX = ( width - this.layoutBounds.width * scale ) / 2 / scale;
    }
    this.translate( offsetX + viewBounds.left / scale, offsetY + viewBounds.top / scale );

    // availableViewBounds in this sim is the visible area above ground (y=0)
    this.visibleBoundsProperty.set( new Rectangle( -offsetX, -offsetY, width / scale, this.modelViewTransform.modelToViewY( 0 ) + Math.abs( offsetY ) ) );

    const maxFloatAmount = this.layoutBounds.right + EXTRA_FLOAT;
    const minFloatAmount = this.layoutBounds.left - EXTRA_FLOAT;

    // for use in subtypes
    this.fixedRight = Math.min( maxFloatAmount, this.visibleBoundsProperty.get().maxX ) - 6;
    this.fixedLeft = Math.max( minFloatAmount, this.visibleBoundsProperty.get().minX ) + 6;

    this.controlPanel.top = 6;
    this.controlPanel.right = this.fixedRight;

    if ( this.attachDetachToggleButtons ) {
      this.attachDetachToggleButtons.top = this.controlPanel.bottom + 5;
      this.attachDetachToggleButtons.centerX = this.controlPanel.centerX;
    }

    this.resetAllButton.right = this.controlPanel.right;
    this.returnSkaterButton.right = this.resetAllButton.left - 10;

    if ( this.showToolbox ) {
      this.toolboxPanel!.top = this.controlPanel.bottom + 5;
      this.toolboxPanel!.right = this.controlPanel.right;
    }

    // pie chart legend position is dependent on whether or not the screen includes an energy bar graph
    let pieChartLegendLeftTop = null;
    if ( this.showBarGraph ) {
      this.energyBarGraphAccordionBox!.x = this.fixedLeft;
      pieChartLegendLeftTop = new Vector2( this.energyBarGraphAccordionBox!.right + 45, this.energyBarGraphAccordionBox!.top );
    }
    else {
      pieChartLegendLeftTop = new Vector2( this.fixedLeft, this.controlPanel.top );
    }

    if ( this.showSeparateVisibilityControlsPanel ) {
      this.visibilityControlsPanel!.left = this.fixedLeft;
    }

    // Put the pie chart legend to the right of the bar chart, see #60, #192
    this.pieChartLegend.mutate( { leftTop: pieChartLegendLeftTop } );
  }

  /**
   * Add a node to the front of the bottom layer (the end of this.backLayer children array). This layer is behind
   * animating or movable things in the sim like the skater. This is useful for adding specific control-panel like
   * things in subtypes that should be behind the skater.
   */
  protected addToBottomLayer( node: Node ): void {
    this.bottomLayer.addChild( node );
  }
}

energySkatePark.register( 'EnergySkateParkScreenView', EnergySkateParkScreenView );