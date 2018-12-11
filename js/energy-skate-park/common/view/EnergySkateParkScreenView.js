// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node for the Energy Skate Park view (includes everything you see).
 * 
 * This view is layered in a very particular way to reduce memory usage. There are three layers - layer of Nodes
 * rendered with SVG, then a WebGL layer (which scenery combines into a single canvas), then another layer for
 * everything on top. Nodes in the WebGL layer shoudl ONLY use WebGL, or else a canvas will be created for every
 * WebGL layer, which takes up too much memory.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AttachDetachToggleButtons = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/AttachDetachToggleButtons' );
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BackgroundNode' );
  var BarGraphBackground = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BarGraphBackground' );
  var BarGraphForeground = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BarGraphForeground' );
  var BooleanIO = require( 'TANDEM/types/BooleanIO' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DotRectangle = require( 'DOT/Rectangle' ); // eslint-disable-line require-statement-match
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var EnergySkateParkControlPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkControlPanel' );
  var EnergySkateParkQueryParameters = require( 'ENERGY_SKATE_PARK/energy-skate-park/EnergySkateParkQueryParameters' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var GaugeNeedleNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/GaugeNeedleNode' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var GridNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/GridNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MeasuringTapeNode = require( 'SCENERY_PHET/MeasuringTapeNode' );
  var MeasuringTapePanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MeasuringTapePanel' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PieChartLegend = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/PieChartLegend' );
  var PieChartNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/PieChartNode' );
  var PieChartWebGLNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/PieChartWebGLNode' );
  var PlaybackSpeedControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/PlaybackSpeedControl' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ReferenceHeightLine = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/ReferenceHeightLine' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var SkaterNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/SkaterNode' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TrackNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/TrackNode' );
  var Util = require( 'SCENERY/util/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var controlsRestartSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.restart-skater' );
  var propertiesSpeedString = require( 'string!ENERGY_SKATE_PARK/properties.speed' );

  // images
  var skaterIconImage = require( 'image!ENERGY_SKATE_PARK/skater-icon.png' );

  // Debug flag to show the view bounds, the region within which the skater can move
  var showAvailableBounds = false;

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkScreenView( model, tandem, options ) {

    options = _.extend( {

      // options for visibility controls
      // TODO: Break into a sub options object for visibility controls?
      includeBarGraphCheckbox: true,
      includeSamplesCheckbox: false,
      includeReferenceHeightCheckbox: true,

      // iptions for slider controls
      includeGravitySlider: true,
      includeMassSlider: false,

      // options for the bar graph, see composite type options below
      barGraphOptions: {},

      includeMeasuringTapePanel: true
    }, options );

    options.barGraphOptions = _.extend( {
      includeZoomButtons: true
    }, options.barGraphOptions );

    var trackNodeGroupTandem = tandem.createGroupTandem( 'trackNode' );

    var self = this;
    ScreenView.call( self, {
      layoutBounds: new Bounds2( 0, 0, 834, 504 ),
      tandem: tandem
    } );

    // @private {Node} - layers for the screen view, for performance and memory reasons. Nodes will be added to one
    // of these layers. There is a bottom layer (which shouldn't use WebGL), a middle layer which should only use
    // WebGL, and a top layer (which shouldn't use WebGL).
    this.bottomLayer = new Node();
    this.webGLLayer = new Node();
    this.topLayer = new Node();
    this.children = [ this.bottomLayer, this.webGLLayer, this.topLayer ];

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

    // @private - node that shows the energy legend for the pie chart
    this.pieChartLegend = new PieChartLegend(
      model.skater,
      model.clearThermal.bind( model ),
      model.pieChartVisibleProperty,
      tandem.createTandem( 'pieChartLegend' )
    );
    this.bottomLayer.addChild( this.pieChartLegend );

    // @protected (for layout in subtypes)
    this.controlPanel = new EnergySkateParkControlPanel( model, this, modelViewTransform, tandem.createTandem( 'controlPanel' ), {
      includeFrictionSlider: model.frictionAllowed,
      includeMassSlider: options.includeMassSlider,
      includeGravitySlider: options.includeGravitySlider,

      // right now, draggable tracks and track selection are mutually exclusive
      // TODO: this might not be the case for screens
      includeTrackSelection: !model.draggableTracks,

      visibilityControlsOptions: {

        // include samples if model supports it
        includeSamplesCheckbox: options.includeSamplesCheckbox,
        includeBarGraphCheckbox: options.includeBarGraphCheckbox,
        includeReferenceHeightCheckbox: options.includeReferenceHeightCheckbox
      }
    } );
    this.bottomLayer.addChild( this.controlPanel );
    this.controlPanel.right = this.layoutBounds.width - 5;
    this.controlPanel.top = 5;

    var unitsProperty = new Property( { name: 'meters', multiplier: 1 } );
    this.measuringTapeNode = new MeasuringTapeNode( unitsProperty, model.measuringTapeVisibleProperty, {
      basePositionProperty: model.measuringTapeBasePositionProperty,
      tipPositionProperty: model.measuringTapeTipPositionProperty,
      modelViewTransform: modelViewTransform,
      dragBounds: this.availableModelBoundsProperty.get(),
      baseDragEnded: function() {
        if ( self.measuringTapeNode.getLocalBaseBounds().intersectsBounds( self.measuringTapePanel.bounds ) ) {
          model.measuringTapeVisibleProperty.set( false );
        }
      }
    } );

    // @private {MeasuringTapePanel} - so it can float to the layout bounds, see layout()
    this.measuringTapePanel = new MeasuringTapePanel( model, this.measuringTapeNode, modelViewTransform );
    this.measuringTapePanel.top = this.controlPanel.bottom + 5;

    // TODO: Put all code related to the measuring tape in this conditional
    if ( options.includeMeasuringTapePanel ) {
      this.bottomLayer.addChild( this.measuringTapePanel );
    }

    // For the playground screen, show attach/detach toggle buttons
    if ( model.draggableTracks ) {
      var property = model.draggableTracks ? new Property( true ) :
                     new DerivedProperty( [ model.sceneProperty ], function( scene ) { return scene === 2; } );
      this.attachDetachToggleButtons = new AttachDetachToggleButtons( model.detachableProperty, property, this.controlPanel.width, tandem.createTandem( 'attachDetachToggleButtons' ), {
        top: this.controlPanel.bottom + 5,
        centerX: this.controlPanel.centerX
      } );
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

    // @private - background for the bar graph (split up to use WebGL for the foreground)
    this.barGraphBackground = new BarGraphBackground( model.skater, model.barGraphVisibleProperty, model.graphScaleProperty,
      model.clearThermal.bind( model ), tandem.createTandem( 'barGraphBackground' ), options.barGraphOptions );
    this.bottomLayer.addChild( this.barGraphBackground );

    this.resetAllButton = new ResetAllButton( {
      listener: model.reset.bind( model ),
      scale: 0.85,
      centerX: this.controlPanel.centerX,

      // Align vertically with other controls, see #134
      centerY: ( modelViewTransform.modelToViewY( 0 ) + this.layoutBounds.maxY ) / 2 + 8,

      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.bottomLayer.addChild( this.resetAllButton );

    // The button to return the skater
    this.returnSkaterButton = new RectangularPushButton( {
      content: new Text( controlsRestartSkaterString, {
        tandem: tandem.createTandem( 'restartSkaterTextNode' ),
        maxWidth: 100
      } ),
      listener: model.returnSkater.bind( model ),
      centerY: this.resetAllButton.centerY,
      // X updated in layoutBounds since the reset all button can move horizontally
      tandem: tandem.createTandem( 'returnSkaterButton' )
    } );

    // Disable the return skater button when the skater is already at his initial coordinates
    model.skater.movedProperty.linkAttribute( self.returnSkaterButton, 'enabled' );
    this.bottomLayer.addChild( this.returnSkaterButton );

    var speedometerNode = new GaugeNode(
      // Hide the needle in for the background of the GaugeNode
      new Property( null ), propertiesSpeedString, new Range( 0, 20 ), {
        // enable/disable updates based on whether the speedometer is visible
        updateEnabledProperty: model.speedometerVisibleProperty,
        pickable: false,
        tandem: tandem.createTandem( 'speedometerNode' )
      } );
    model.speedometerVisibleProperty.linkAttribute( speedometerNode, 'visible' );
    speedometerNode.centerX = this.layoutBounds.centerX;
    speedometerNode.top = this.layoutBounds.minY + 5;
    this.bottomLayer.addChild( speedometerNode );

    // Layer which will contain all of the tracks
    var trackLayer = new Node( {
      tandem: tandem.createTandem( 'trackLayer' )
    } );

    // Switch between selectable tracks
    if ( !model.draggableTracks ) {

      var trackNodes = model.tracks.getArray().map( function( track ) {
        return new TrackNode( model, track, modelViewTransform, self.availableModelBoundsProperty, trackNodeGroupTandem.createNextTandem() );
      } );

      trackNodes.forEach( function( trackNode ) {
        trackLayer.addChild( trackNode );
      } );

      // TODO: Could we link the track PhysicalProperty directly to visible? Through linkAttribute or something?
      model.sceneProperty.link( function( scene ) {
        _.forEach( model.tracks, function( track, i ) {
          trackNodes[ i ].visible = scene === i;
        } );
      } );
    }
    else {

      var addTrackNode = function( track ) {

        var trackNode = new TrackNode( model, track, modelViewTransform, self.availableModelBoundsProperty, trackNodeGroupTandem.createTandem( track.tandem.tail ) );
        trackLayer.addChild( trackNode );

        // When track removed, remove its view
        var itemRemovedListener = function( removed ) {
          if ( removed === track ) {
            trackLayer.removeChild( trackNode );

            // Clean up memory leak
            model.tracks.removeItemRemovedListener( itemRemovedListener );
            trackNode.dispose();
          }
        };
        model.tracks.addItemRemovedListener( itemRemovedListener );

        return trackNode;
      };

      // Create the tracks for the track toolbox
      var interactiveTrackNodes = model.tracks.getArray().map( addTrackNode );

      // Add a panel behind the tracks
      var padding = 10;

      var trackCreationPanel = new Rectangle(
        ( interactiveTrackNodes[ 0 ].left - padding / 2 ),
        ( interactiveTrackNodes[ 0 ].top - padding / 2 ),
        ( interactiveTrackNodes[ 0 ].width + padding ),
        ( interactiveTrackNodes[ 0 ].height + padding ),
        6,
        6, {
          fill: 'white',
          stroke: 'black'
        } );
      this.bottomLayer.addChild( trackCreationPanel );

      model.tracks.addItemAddedListener( addTrackNode );

      var xTip = 20;
      var yTip = 8;
      var xControl = 12;
      var yControl = -5;

      var createArrowhead = function( angle, tail ) {
        var headWidth = 10;
        var headHeight = 10;
        var directionUnitVector = Vector2.createPolar( 1, angle );
        var orthogonalUnitVector = directionUnitVector.perpendicular();
        var tip = directionUnitVector.times( headHeight ).plus( tail );
        return new Path( new Shape().moveToPoint( tail ).lineToPoint( tail.plus( orthogonalUnitVector.times( headWidth / 2 ) ) ).lineToPoint( tip ).lineToPoint( tail.plus( orthogonalUnitVector.times( -headWidth / 2 ) ) ).lineToPoint( tail ).close(), {
          fill: 'black',
          tandem: tandem.createTandem( 'arrowHead' )
        } );
      };

      var rightCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( -xControl, yControl, -xTip, yTip ), {
        stroke: 'black',
        lineWidth: 3,
        tandem: tandem.createTandem( 'rightCurve' )
      } );
      var arrowHead = createArrowhead( Math.PI - Math.PI / 3, new Vector2( -xTip, yTip ) );

      var clearButtonEnabledProperty = model.clearButtonEnabledProperty;
      clearButtonEnabledProperty.link( function( clearButtonEnabled ) {
        rightCurve.stroke = clearButtonEnabled ? 'black' : 'gray';
        arrowHead.fill = clearButtonEnabled ? 'black' : 'gray';
      } );

      var clearButton = new EraserButton( {
        iconWidth: 30,
        baseColor: new Color( 221, 210, 32 ),
        tandem: tandem.createTandem( 'clearButton' )
      } );
      clearButtonEnabledProperty.linkAttribute( clearButton, 'enabled' );
      clearButton.addListener( function() {model.clearTracks();} );

      this.bottomLayer.addChild( clearButton.mutate( { left: 5, centerY: trackCreationPanel.centerY } ) );
    }

    this.bottomLayer.addChild( trackLayer );

    //-----------------------------------------------------------------------------
    // BEGIN WEBGL LAYER
    // Nodes in this block will be rendered with webgl where possible, but not
    // IE due to https://github.com/phetsims/energy-skate-park-basics/issues/277
    // and https://github.com/phetsims/scenery/issues/285. Nodes in this block
    // shoudl ONLY be rendered with WebGL, so that scenery can combine all of the
    // webgl content into a single canvas element, reducing the memory consumption.
    //------------------------------------------------------------------------------
    var webGLSupported = Util.isWebGLSupported && phet.chipper.queryParameters.webgl;
    var renderer = webGLSupported ? 'webgl' : null;

    var skaterNode = new SkaterNode(
      model.skater,
      this,
      modelViewTransform,
      model.getClosestTrackAndPositionAndParameter.bind( model ),
      model.getPhysicalTracks.bind( model ),
      renderer,
      tandem.createTandem( 'skaterNode' )
    );

    var gaugeNeedleNode = new GaugeNeedleNode( model.skater.speedProperty, new Range( 0, 20 ), {
      renderer: renderer
    } );
    model.speedometerVisibleProperty.linkAttribute( gaugeNeedleNode, 'visible' );
    gaugeNeedleNode.x = speedometerNode.x;
    gaugeNeedleNode.y = speedometerNode.y;
    this.webGLLayer.addChild( gaugeNeedleNode );

    // @private - the foreground of the bar graph (split up to use WebGL)
    this.barGraphForeground = new BarGraphForeground(
      model.skater,
      this.barGraphBackground,
      model.barGraphVisibleProperty,
      model.graphScaleProperty,
      renderer,
      tandem.createTandem( 'barGraphForeground' )
    );
    this.webGLLayer.addChild( this.barGraphForeground );

    this.webGLLayer.addChild( skaterNode );

    var pieChartNode = renderer === 'webgl' ?
                       new PieChartWebGLNode( model.skater, model.pieChartVisibleProperty, modelViewTransform, tandem.createTandem( 'pieChartNode' ) ) :
                       new PieChartNode( model.skater, model.pieChartVisibleProperty, modelViewTransform, tandem.createTandem( 'pieChartNode' ) );
    this.webGLLayer.addChild( pieChartNode );

    //---------------------------------------------------------------------------
    // END WEBGL LAYER
    //---------------------------------------------------------------------------
    
    // layout managed in layout function
    this.referenceHeightLine = new ReferenceHeightLine( modelViewTransform, model.skater.referenceHeightProperty, model.referenceHeightVisibleProperty );
    this.bottomLayer.addChild( this.referenceHeightLine );

    // relative to the control panel, but this will not float with the layout
    this.referenceHeightLine.right = this.controlPanel.left - 5;

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

    this.topLayer.addChild( returnSkaterToPreviousStartingPositionButton );
    this.topLayer.addChild( returnSkaterToGroundButton );

    // TODO: This should be removed with includeMeasuringTape options like the above TODO
    this.topLayer.addChild( this.measuringTapeNode );

    // has all of the play, pause, and step controls for layout purposes
    var playControls = new Node();

    var playingProperty = new Property( !model.pausedProperty.value, {
      tandem: tandem.createTandem( 'playingProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );
    model.pausedProperty.link( function( paused ) {
      playingProperty.set( !paused );
    } );
    playingProperty.link( function( playing ) {
      model.pausedProperty.set( !playing );
    } );
    var playPauseButton = new PlayPauseButton( playingProperty, {
      tandem: tandem.createTandem( 'playPauseButton' )
    } ).mutate( { scale: 0.6 } );

    // Make the Play/Pause button bigger when it is showing the pause button, see #298
    var pauseSizeIncreaseFactor = 1.35;
    playingProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );

    var stepButton = new StepForwardButton( {
      isPlayingProperty: playingProperty,
      listener: function() { model.manualStep(); },
      tandem: tandem.createTandem( 'stepButton' ),
      leftCenter: playPauseButton.rightCenter.plusXY( 8, 0 )
    } );

    var speedControl = new PlaybackSpeedControl( model.speedProperty, tandem.createTandem( 'playbackSpeedControl' ), {
      leftCenter: stepButton.rightCenter.plusXY( 15, 0 )
    } );

    // Make the step button the same size as the pause button.
    stepButton.mutate( { scale: playPauseButton.height / stepButton.height } );
    model.pausedProperty.linkAttribute( stepButton, 'enabled' );

    playControls.addChild( playPauseButton );
    playControls.addChild( stepButton );
    this.topLayer.addChild( speedControl );
    this.topLayer.addChild( playControls );

    var speedControlSpacing = 15;
    speedControl.setLeftBottom( this.layoutBounds.centerBottom.plusXY( speedControlSpacing, -15 ) );
    playControls.setRightBottom( this.layoutBounds.centerBottom.minusXY( speedControlSpacing, 15 ) );

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

      // Float the control panel to the right (but not arbitrarily far because it could get too far from the play area)
      var maxFloatAmount = EnergySkateParkQueryParameters.controlPanelLocation === 'fixed' ? 890 : Number.MAX_VALUE;
      this.controlPanel.right = Math.min( maxFloatAmount, this.availableViewBounds.maxX ) - 5;

      if ( this.attachDetachToggleButtons ) {
        this.attachDetachToggleButtons.centerX = this.controlPanel.centerX;
      }

      if ( this.sceneSelectionRadioButtonGroup ) {

        // symmetrical with the right edge of the reset all button
        this.sceneSelectionRadioButtonGroup.left = this.availableViewBounds.minX + 5;
        this.sceneSelectionRadioButtonGroup.bottom = this.resetAllButton.bottom;
      }

      this.resetAllButton.right = this.controlPanel.right;
      this.returnSkaterButton.right = this.resetAllButton.left - 10;

      this.measuringTapePanel.right = this.controlPanel.right;

      // Compute the visible model bounds so we will know when a model object like the skater has gone offscreen
      this.availableModelBounds = this.modelViewTransform.viewToModelBounds( this.availableViewBounds );
      this.availableModelBoundsProperty.value = this.availableModelBounds;

      // keep the measuring tape in the avaialable bounds
      this.measuringTapeNode.setDragBounds( this.availableModelBounds );

      if ( EnergySkateParkQueryParameters.controlPanelLocation === 'floating' ) {
        this.barGraphBackground.x = this.availableViewBounds.minX + 5;
        this.barGraphForeground.x = this.availableViewBounds.minX + 19;
      }

      // Put the pie chart legend to the right of the bar chart, see #60, #192
      this.pieChartLegend.mutate( { top: this.barGraphBackground.top, left: this.barGraphBackground.right + 8 } );

      // Show it for debugging
      if ( showAvailableBounds ) {
        this.viewBoundsPath.shape = Shape.bounds( this.availableViewBounds );
      }
    },

    /**
     * Add a node to the front of the back layer (the end of this.backLayer children array). For memory and performance
     * reasons, this node had better not be using WebGL.
     * @protected
     *
     * @param {Node} node
     */
    addToBottomLayer: function( node ) {
      this.bottomLayer.addChild( node );
    },

    /**
     * Add a node to the front of the top layer (the end of this.topLayer children array). For memory and
     * performance reasons, this node and its sub tree had better not be using WebGL.
     * @protected
     *
     * @param {node} node
     */
    addToTopLayer: function( node ) {
      this.topLayer.addChild( node );
    }
  } );
} );