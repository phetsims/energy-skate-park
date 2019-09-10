// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node for the Energy Skate Park view (includes everything you see).
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AttachDetachToggleButtons = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/AttachDetachToggleButtons' );
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/BackgroundNode' );
  // var EnergyBarGraphPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraphPanel' );
  var EnergyBarGraphAccordionBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraphAccordionBox' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DotRectangle = require( 'DOT/Rectangle' ); // eslint-disable-line require-statement-match
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkControlPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkControlPanel' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  var EnergySkateParkQueryParameters = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/EnergySkateParkQueryParameters' );
  var GridNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GridNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MeasuringTapeNode = require( 'SCENERY_PHET/MeasuringTapeNode' );
  var MeasuringTapePanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MeasuringTapePanel' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PieChartLegend = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PieChartLegend' );
  var PieChartNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PieChartNode' );
  var PlaybackSpeedControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PlaybackSpeedControl' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ReferenceHeightLine = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/ReferenceHeightLine' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var SkaterNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/SkaterNode' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ValueGaugeNode = require( 'SCENERY_PHET/ValueGaugeNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var controlsRestartSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.restart-skater' );
  var propertiesSpeedString = require( 'string!ENERGY_SKATE_PARK/properties.speed' );
  var speedometerMetersPerSecondPatternString = require( 'string!ENERGY_SKATE_PARK/speedometerMetersPerSecondPattern' );

  // images
  var skaterIconImage = require( 'image!ENERGY_SKATE_PARK/skater-icon.png' );

  // constants
  // for wider screens, panels can float to the left and right by this much beyond dev bounds in view coordinates
  const EXTRA_FLOAT = 51.5;

  // Debug flag to show the view bounds, the region within which the skater can move
  var showAvailableBounds = false;

  /**
   * @param {EnergySkateParkModel} model
   * @param {Array.<PhysicalSlider|PhysicalNumberControl} physicalControls
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function EnergySkateParkScreenView( model, physicalControls, tandem, options ) {

    options = _.extend( {

      // options for the bar graph, see composite type options below
      barGraphOptions: null,

      // {boolean} - whether or not this ScreenView should have a bar graph
      showBarGraph: true,

      // {boolean} - whether or not to show buttons that select premade tracks
      showTrackButtons: true,

      // {boolean} - whether or not this ScreenView will show the skater path along the track
      showSkaterPath: false,

      // {boolean} - whether or not the bar graph should include zoom buttons
      showBarGraphZoomButtons: true,

      // {boolean} - whether or not the screen will include radio buttons to control skater attaching/detaching
      // from the tracks
      showAttachDetachRadioButtons: false,

      // {boolean} - whether or not this ScreenView will show the reference height
      showReferenceHeight: true,

      showMeasuringTape: true,

      visibilityControlsOptions: null
    }, options );

    // @protected
    this.trackNodeGroupTandem = tandem.createGroupTandem( 'trackNode' );

    var self = this;
    ScreenView.call( self, {
      layoutBounds: new Bounds2( 0, 0, 834, 504 ),
      tandem: tandem
    } );

    // @protected
    this.model = model;

    // @private - whether or not this screen view should include a measuring tape
    this.showMeasuringTape = options.showMeasuringTape;

    // @private {boolean} - visibility of various view components
    this.showBarGraph = options.showBarGraph;
    this.showSkaterPath = options.showSkaterPath;
    this.showReferenceHeight = options.showReferenceHeight;
    this.showTrackButtons = options.showTrackButtons;

    // @protected {null|number} - defines the min and max edges horizontally for floating layout, null until first
    // layout() - includes padding so elements won't touch the edge
    this.fixedRight = null;
    this.fixedLeft = null;

    // @private - Layers for nodes in the sim. The bottom layer contains the background and UI components that should
    // be behind the animating skater and other draggable things, which are in the topLayer. See addToTopLayer()
    // and addToBackLayer().
    this.bottomLayer = new Node();
    this.topLayer = new Node();
    this.children = [ this.bottomLayer, this.topLayer ];

    var modelPoint = new Vector2( 0, 0 );

    // earth is 70px high in stage coordinates
    var viewPoint = new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height - BackgroundNode.earthHeight );
    var scale = 50;
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( modelPoint, viewPoint, scale );
    this.modelViewTransform = modelViewTransform;

    this.availableModelBoundsProperty = new Property( new Bounds2( 0, 0, 0, 0 ) );
    this.availableModelBoundsProperty.link( function( bounds ) {
      model.availableModelBoundsProperty.set( bounds );
    } );

    // The background
    this.backgroundNode = new BackgroundNode( this.layoutBounds, tandem.createTandem( 'backgroundNode' ) );
    this.bottomLayer.addChild( this.backgroundNode );

    this.gridNode = new GridNode( model.gridVisibleProperty, model.skater.referenceHeightProperty, modelViewTransform, tandem.createTandem( 'gridNode' ) );
    this.bottomLayer.addChild( this.gridNode );

    this.controlPanel = new EnergySkateParkControlPanel( model, this, physicalControls, tandem.createTandem( 'controlPanel' ), options.visibilityControlsOptions );
    this.bottomLayer.addChild( this.controlPanel );

    // @private - node that shows the energy legend for the pie chart
    this.pieChartLegend = new PieChartLegend(
      model.skater,
      model.clearThermal.bind( model ),
      model.pieChartVisibleProperty,
      tandem.createTandem( 'pieChartLegend' )
    );
    this.bottomLayer.addChild( this.pieChartLegend );

    // For the playground screen, show attach/detach toggle buttons
    if ( options.showAttachDetachRadioButtons ) {
      var property = model.tracksDraggable ? new Property( true ) :
                     new DerivedProperty( [ model.sceneProperty ], function( scene ) { return scene === 2; } );
      this.attachDetachToggleButtons = new AttachDetachToggleButtons( model.stickingToTrackProperty, property, 150, tandem.createTandem( 'attachDetachToggleButtons' ) );
      this.bottomLayer.addChild( this.attachDetachToggleButtons );
    }

    var containsAbove = function( bounds, x, y ) {
      return bounds.minX <= x && x <= bounds.maxX && y <= bounds.maxY;
    };

    // Determine if the skater is onscreen or offscreen for purposes of highlighting the 'return skater' button.
    // Don't check whether the skater is underground since that is a rare case (only if the user is actively dragging a
    // control point near y=0 and the track curves below) and the skater will pop up again soon, see the related
    // flickering problem in #206
    var onscreenProperty = new DerivedProperty( [ model.skater.positionProperty ], function( position ) {
      if ( !self.availableModelBounds ) {
        return true;
      }
      return self.availableModelBounds && containsAbove( self.availableModelBounds, position.x, position.y );
    } );

    // @private - the bar chart showing energy distribution
    if ( this.showBarGraph ) {
      this.energyBarGraphAccordionBox = new EnergyBarGraphAccordionBox( model, tandem.createTandem( 'energyBarGraphAccordionBox' ), {
        barGraphOptions: {
          showBarGraphZoomButtons: options.showBarGraphZoomButtons
        }
      } );
      this.energyBarGraphAccordionBox.leftTop = new Vector2( 5, 5 );
      this.bottomLayer.addChild( this.energyBarGraphAccordionBox );

      // this.energyBarGraphPanel = new EnergyBarGraphPanel( model, tandem.createTandem( 'energyBargGraphPanel' ), {
        // barGraphOptions: {
      //     showBarGraphZoomButtons: options.showBarGraphZoomButtons
      //   }
      // } );
      // this.energyBarGraphPanel.leftTop = new Vector2( 5, 5 );
      // this.bottomLayer.addChild( this.energyBarGraphPanel );
      // model.barGraphVisibleProperty.linkAttribute( this.energyBarGraphPanel, 'visible' );
    }

    this.resetAllButton = new ResetAllButton( {
      listener: model.reset.bind( model ),
      scale: 0.85,

      // Align vertically with other controls, see #134
      centerY: ( modelViewTransform.modelToViewY( 0 ) + this.layoutBounds.maxY ) / 2 + 8,

      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.bottomLayer.addChild( this.resetAllButton );

    // The button to return the skater
    this.returnSkaterButton = new RectangularPushButton( {
      content: new Text( controlsRestartSkaterString, {
        tandem: tandem.createTandem( 'restartSkaterTextNode' ),
        maxWidth: 90
      } ),
      listener: model.returnSkater.bind( model ),
      centerY: this.resetAllButton.centerY,
      // X updated in layoutBounds since the reset all button can move horizontally
      tandem: tandem.createTandem( 'returnSkaterButton' )
    } );

    // Disable the return skater button when the skater is already at his initial coordinates
    model.skater.movedProperty.linkAttribute( self.returnSkaterButton, 'enabled' );
    this.bottomLayer.addChild( this.returnSkaterButton );

    const gaugeRadius = 62;
    var speedometerNode = new ValueGaugeNode( model.skater.speedProperty, propertiesSpeedString, new Range( 0, 30 ), {
        numberDisplayOptions: {
          valuePattern: speedometerMetersPerSecondPatternString,
          numberMaxWidth: gaugeRadius * 1.3,
          decimalPlaces: 1
        },

        // enable/disable updates based on whether the speedometer is visible
        enabledProperty: model.speedometerVisibleProperty,
        pickable: false,
        radius: gaugeRadius,
        tandem: tandem.createTandem( 'speedometerNode' )
    } );
    model.speedometerVisibleProperty.linkAttribute( speedometerNode, 'visible' );
    model.speedValueVisibleProperty.link( ( visible ) => { speedometerNode.setNumberDisplayVisible( visible ); } );
    speedometerNode.centerX = this.layoutBounds.centerX;
    speedometerNode.top = this.layoutBounds.minY + 5;
    this.bottomLayer.addChild( speedometerNode );

    // @public (for layout) - Layer which will contain all of the tracks
    this.trackLayer = new Node( {
      tandem: tandem.createTandem( 'trackLayer' )
    } );

    // tracks on top of panels and non-interactive visualizations
    this.topLayer.addChild( this.trackLayer );

    // add a measuring tape, on top of tracks, below the skater
    if ( options.showMeasuringTape ) {

      var unitsProperty = new Property( { name: 'meters', multiplier: 1 } );

      // @private {MeasuringTapeNode} - The measuring tape node will not
      this.measuringTapeNode = new MeasuringTapeNode( unitsProperty, model.measuringTapeVisibleProperty, {
        basePositionProperty: model.measuringTapeBasePositionProperty,
        tipPositionProperty: model.measuringTapeTipPositionProperty,
        modelViewTransform: modelViewTransform,
        dragBounds: this.availableModelBoundsProperty.get(),
        baseDragEnded: function() {
          if ( self.measuringTapeNode.getLocalBaseBounds().intersectsBounds( self.measuringTapePanel.bounds ) ) {
            model.measuringTapeVisibleProperty.set( false );
          }
        },
        tandem: tandem.createTandem( 'measuringTapeNode' )
      } );
      this.topLayer.addChild( this.measuringTapeNode );

      // @private {MeasuringTapePanel} - so it can float to the layout bounds, see layout()
      this.measuringTapePanel = new MeasuringTapePanel( model, this.measuringTapeNode, modelViewTransform );
      this.bottomLayer.addChild( this.measuringTapePanel );
    }

    var skaterNode = new SkaterNode(
      model.skater,
      this,
      modelViewTransform,
      model.getClosestTrackAndPositionAndParameter.bind( model ),
      model.getPhysicalTracks.bind( model ),
      tandem.createTandem( 'skaterNode' )
    );

    this.topLayer.addChild( skaterNode );

    const pieChartNode = new PieChartNode( model.skater, model.pieChartVisibleProperty, modelViewTransform, tandem.createTandem( 'pieChartNode' ) );
    this.topLayer.addChild( pieChartNode );

    // layout managed in layout function
    this.referenceHeightLine = new ReferenceHeightLine(
      modelViewTransform,
      model.skater.referenceHeightProperty,
      model.referenceHeightVisibleProperty,
      tandem.createTandem( 'referenceHeightLine' )
    );
    this.bottomLayer.addChild( this.referenceHeightLine );

    // relative to the control panel, but this will not float with the layout
    this.referenceHeightLine.centerX = this.layoutBounds.centerX;

    // Buttons to return the skater when she is offscreen, see #219
    var iconScale = 0.4;
    var returnSkaterToPreviousStartingPositionButton = new RectangularPushButton( {
      content: new Image( skaterIconImage, {
        scale: iconScale,
        tandem: tandem.createTandem( 'skaterIconImage1' )
      } ),

      // green means "go" since the skater will likely start moving at this point
      baseColor: EnergySkateParkColorScheme.kineticEnergy,
      listener: model.returnSkater.bind( model ),
      tandem: tandem.createTandem( 'returnSkaterToPreviousStartingPositionButton' )
    } );

    var returnSkaterToGroundButton = new RectangularPushButton( {
      content: new Image( skaterIconImage, {
        scale: iconScale,
        tandem: tandem.createTandem( 'skaterIconImage2' )
      } ),
      centerBottom: modelViewTransform.modelToViewPosition( model.skater.startingPositionProperty.value ),
      baseColor: '#f4514e', // red for stop, since the skater will be stopped on the ground.
      listener: function() { model.skater.resetPosition(); },
      tandem: tandem.createTandem( 'returnSkaterToGroundButton' )
    } );

    // the "return skater" buttons are in the top layer so that they can be on top of the track and easily visible
    // when the skater goes off screen
    this.topLayer.addChild( returnSkaterToPreviousStartingPositionButton );
    this.topLayer.addChild( returnSkaterToGroundButton );

    // has all of the play, pause, and step controls for layout purposes
    var playControls = new Node();

    var playingProperty = new BooleanProperty( !model.pausedProperty.value, {
      tandem: tandem.createTandem( 'playingProperty' )
    } );
    model.pausedProperty.link( function( paused ) {
      playingProperty.set( !paused );
    } );
    playingProperty.link( function( playing ) {
      model.pausedProperty.set( !playing );
    } );

    const playPauseButton = new PlayPauseButton( playingProperty, {
      tandem: tandem.createTandem( 'playPauseButton' )
    } ).mutate( { scale: 0.6 } );

    // Make the Play/Pause button bigger when it is showing the pause button, see #298
    var pauseSizeIncreaseFactor = 1.35;
    playingProperty.lazyLink( isPlaying => {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );

    const stepButton = new StepForwardButton( {
      isPlayingProperty: playingProperty,
      listener: function() { model.manualStep(); },
      tandem: tandem.createTandem( 'stepButton' ),
      leftCenter: playPauseButton.rightCenter.plusXY( 8, 0 )
    } );

    // @protected - for layout in subtypes
    this.speedControl = new PlaybackSpeedControl( model.speedProperty, tandem.createTandem( 'playbackSpeedControl' ), {
      leftCenter: stepButton.rightCenter.plusXY( 15, 0 )
    } );

    // Make the step button the same size as the pause button.
    stepButton.mutate( { scale: playPauseButton.height / stepButton.height } );
    model.pausedProperty.linkAttribute( stepButton, 'enabled' );

    playControls.addChild( playPauseButton );
    playControls.addChild( stepButton );
    this.topLayer.addChild( this.speedControl );
    this.topLayer.addChild( playControls );

    var speedControlSpacing = 15;
    this.speedControl.setLeftBottom( this.layoutBounds.centerBottom.plusXY( speedControlSpacing, -15 ) );
    playControls.setRightBottom( this.layoutBounds.centerBottom.minusXY( speedControlSpacing, 15 ) );
    this.playControls = playControls;

    // When the skater goes off screen, make the "return skater" button big
    onscreenProperty.link( function( skaterOnscreen ) {
      var buttonsVisible = !skaterOnscreen;
      returnSkaterToGroundButton.visible = buttonsVisible;
      returnSkaterToPreviousStartingPositionButton.visible = buttonsVisible;

      if ( buttonsVisible ) {

        // Put the button where the skater will appear.  Nudge it up a bit so the mouse can hit it from the drop site,
        // without being moved at all (to simplify repeat runs).
        var viewPosition = modelViewTransform.modelToViewPosition( model.skater.startingPositionProperty.value ).plusXY( 0, 5 );
        returnSkaterToPreviousStartingPositionButton.centerBottom = viewPosition;

        // If the return skater button went offscreen, move it back on the screen, see #222
        if ( returnSkaterToPreviousStartingPositionButton.top < 5 ) {
          returnSkaterToPreviousStartingPositionButton.top = 5;
        }
      }
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
  }

  energySkatePark.register( 'EnergySkateParkScreenView', EnergySkateParkScreenView );

  return inherit( ScreenView, EnergySkateParkScreenView, {

    // Layout the EnergySkateParkScreenView, scaling it up and down with the size of the screen to ensure a
    // minimially visible area, but keeping it centered at the bottom of the screen, so there is more area in the +y
    // direction to build tracks and move the skater
    layout: function( width, height ) {
      assert && assert( this.controlPanel, 'much of component layout based on control panel, subtype should create one.' );

      this.resetTransform();

      var scale = this.getLayoutScale( width, height );
      this.setScaleMagnitude( scale );

      var offsetX = 0;
      var offsetY = 0;

      // Move to bottom vertically
      if ( scale === width / this.layoutBounds.width ) {
        offsetY = ( height / scale - this.layoutBounds.height );
      }

      // center horizontally
      else if ( scale === height / this.layoutBounds.height ) {
        offsetX = ( width - this.layoutBounds.width * scale ) / 2 / scale;
      }
      this.translate( offsetX, offsetY );

      this.backgroundNode.layout( offsetX, offsetY, width, height, scale );
      this.gridNode.layout( offsetX, offsetY, width, height, scale );

      this.availableViewBounds = new DotRectangle( -offsetX, -offsetY, width / scale, this.modelViewTransform.modelToViewY( 0 ) + Math.abs( offsetY ) );

      const maxFloatAmount = EnergySkateParkQueryParameters.controlPanelLocation === 'fixed' ? this.layoutBounds.right + EXTRA_FLOAT : Number.MAX_VALUE;
      const minFloatAmount = EnergySkateParkQueryParameters.controlPanelLocation === 'fixed' ? this.layoutBounds.left - EXTRA_FLOAT : -Number.MAX_VALUE;

      // for use in subtypes
      this.fixedRight = Math.min( maxFloatAmount, this.availableViewBounds.maxX ) - 5;
      this.fixedLeft = Math.max( minFloatAmount, this.availableViewBounds.minX ) + 5;

      this.controlPanel.top = 5;
      this.controlPanel.right = this.fixedRight;

      if ( this.attachDetachToggleButtons ) {
        this.attachDetachToggleButtons.top = this.controlPanel.bottom + 5;
        this.attachDetachToggleButtons.centerX = this.controlPanel.centerX;
      }

      // TODO: remove this
      if ( this.sceneSelectionRadioButtonGroup ) {

        // symmetrical with the right edge of the reset all button
        this.sceneSelectionRadioButtonGroup.left = this.availableViewBounds.minX + 5;
        this.sceneSelectionRadioButtonGroup.bottom = this.resetAllButton.bottom;
      }

      this.resetAllButton.right = this.controlPanel.right;
      this.returnSkaterButton.right = this.resetAllButton.left - 10;

      // Compute the visible model bounds so we will know when a model object like the skater has gone offscreen
      this.availableModelBounds = this.modelViewTransform.viewToModelBounds( this.availableViewBounds );
      this.availableModelBoundsProperty.value = this.availableModelBounds;

      if ( this.showMeasuringTape ) {
        this.measuringTapePanel.top = this.controlPanel.bottom + 5;
        this.measuringTapePanel.right = this.controlPanel.right;

        this.measuringTapeNode.setDragBounds( this.availableModelBounds );
      }

      // pie chart legend location is dependent on whether or not the screen includes an energy bar graph
      let pieChartLegendLeftTop = null;
      if ( this.showBarGraph ) {
        this.energyBarGraphAccordionBox.x = this.fixedLeft;
        pieChartLegendLeftTop = new Vector2( this.energyBarGraphAccordionBox.right + 32, this.energyBarGraphAccordionBox.top );
      }
      else {
        pieChartLegendLeftTop = new Vector2( this.fixedLeft, this.controlPanel.top );
      }

      // Put the pie chart legend to the right of the bar chart, see #60, #192
      this.pieChartLegend.mutate( { leftTop: pieChartLegendLeftTop } );

      // Show it for debugging
      if ( showAvailableBounds ) {
        this.viewBoundsPath.shape = Shape.bounds( this.availableViewBounds );
      }
    },

    /**
     * Add a node to the front of the back layer (the end of this.backLayer children array). This layer is behind
     * animating or movable things in the sim like the skater. This is useful for adding specific control-panel like
     * things in subtypes that should be behind the skater.
     * @protected
     *
     * @param {Node} node
     */
    addToBottomLayer: function( node ) {
      this.bottomLayer.addChild( node );
    },

    /**
     * Add a node to the front of the top layer (the end of this.topLayer children array). Anything added to this
     * layer will be on top of the skater or other animating things.
     * @protected
     *
     * @param {node} node
     */
    addToTopLayer: function( node ) {
      this.topLayer.addChild( node );
    }
  } );
} );