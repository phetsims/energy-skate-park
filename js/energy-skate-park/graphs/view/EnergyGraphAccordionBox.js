// Copyright 2019, University of Colorado Boulder

/**
 * The accordion box in the "Graphs" screen that contains the energy graphs, as well as controls for
 * controlling the data.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  const ABSwitch = require( 'SUN/ABSwitch' );
  const AccordionBox = require( 'SUN/AccordionBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  const Emitter = require( 'AXON/Emitter' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const GraphsModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/model/GraphsModel' );
  const GraphsConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/GraphsConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PointStyle = require( 'GRIDDLE/PointStyle' );
  const Util = require( 'DOT/Util' );
  const XYCursorPlot = require( 'GRIDDLE/XYCursorPlot' );
  const XYDataSeries = require( 'GRIDDLE/XYDataSeries' );
  const XYDataSeriesNode = require( 'GRIDDLE/XYDataSeriesNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );
  const EnergyGraphZoomButton = require( 'ENERGY_SKATE_PARK/energy-skate-park/graphs/view/EnergyGraphZoomButton' );

  // strings
  const kineticEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/kineticEnergyLabel' );
  const potentialEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/potentialEnergyLabel' );
  const thermalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/thermalEnergyLabel' );
  const totalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/totalEnergyLabel' );
  const timeLabelString = require( 'string!ENERGY_SKATE_PARK/timeLabel' );
  const positionLabelString = require( 'string!ENERGY_SKATE_PARK/positionLabel' );
  const plotsEnergyGraphString = require( 'string!ENERGY_SKATE_PARK/plots.energy-graph' );

  // constants
  const GRAPH_HEIGHT = 115;

  const DEFAULT_MAX_Y = 1000;
  const DEFAULT_MIN_Y = -1000;

  // margin for content within the panel
  const CONTENT_X_MARGIN = 4;

  const SWITCH_SIZE = new Dimension2( 30, 15 );

  const LABEL_FONT = new PhetFont( { size: 12 } );

  class EnergyGraphAccordionBox extends AccordionBox {

    /**
     * @param {EnergySkateParkModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( model, modelViewTransform, tandem ) {

      // the parent for all content of the accordion box
      const contentNode = new Node();

      // check boxes for visibility of energy data
      const checkboxGroup = new VerticalCheckboxGroup( [
        EnergyGraphAccordionBox.createCheckboxItem( model.kineticEnergyDataVisibleProperty, kineticEnergyLabelString, EnergySkateParkColorScheme.kineticEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.potentialEnergyDataVisibleProperty, potentialEnergyLabelString, EnergySkateParkColorScheme.potentialEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.thermalEnergyDataVisibleProperty, thermalEnergyLabelString, EnergySkateParkColorScheme.thermalEnergy ),
        EnergyGraphAccordionBox.createCheckboxItem( model.totalEnergyDataVisibleProperty, totalEnergyLabelString, EnergySkateParkColorScheme.totalEnergy )
      ] );
      contentNode.addChild( checkboxGroup );

      const graphWidth = modelViewTransform.modelToViewDeltaX( GraphsConstants.TRACK_WIDTH );

      // all layout is relative to the graph
      const energyPlot = new EnergyXYPlot( model, graphWidth, GRAPH_HEIGHT, tandem.createTandem( 'energyPlot' ) );
      contentNode.addChild( energyPlot );

      const eraserButton = new EraserButton( {
        listener: () => {
          this.clearEnergyData();
        },

        tandem: tandem.createTandem( 'eraserButton' )
      } );
      contentNode.addChild( eraserButton );

      const switchLabelOptions = {
        font: new PhetFont( { size: 11 } )
      };
      const variables = GraphsModel.IndependentVariable;
      const positionLabel = new Text( positionLabelString, switchLabelOptions );
      const timeLabel = new Text( timeLabelString, switchLabelOptions );
      const variableSwitch = new ABSwitch( model.independentVariableProperty, variables.POSITION, positionLabel, variables.TIME, timeLabel, {
        switchSize: SWITCH_SIZE,
        tandem: tandem.createTandem( 'variableSwitch' )
      } );
      contentNode.addChild( variableSwitch );

      const zoomInButton = new EnergyGraphZoomButton( model.lineGraphScaleProperty, {
        tandem: tandem.createTandem( 'zoomInButton' )
      } );
      const zoomOutButton = new EnergyGraphZoomButton( model.lineGraphScaleProperty, {
        in: false,
        tandem: tandem.createTandem( 'zoomOutButton' )
      } );
      const zoomButtons = new VBox( {
        children: [ zoomInButton, zoomOutButton ],
        spacing: 5
      } );

      // graph labels - y axis includes zoom buttons as part of the label
      const yLabelText = new Text( 'Energy (J)', { rotation: -Math.PI / 2, font: LABEL_FONT } );
      const xLabelText =  new Text( 'Time (s)', { font: LABEL_FONT } );
      const yLabel = new VBox( {
        children: [ yLabelText, zoomButtons ],
        spacing: 10
      } );
      contentNode.addChild( yLabel );
      contentNode.addChild( xLabelText );

      model.lineGraphScaleProperty.link( ( scale ) => {
        const newMinY = scale * DEFAULT_MIN_Y;
        const newMaxY = scale * DEFAULT_MAX_Y;

        energyPlot.setMinY( newMinY );
        energyPlot.setMaxY( newMaxY );
        energyPlot.setStepY( Util.roundToInterval( ( ( newMaxY - newMinY ) / 6 ), 500 ) );
      } );

      // layout, all layout is relative to the energy plot
      variableSwitch.centerBottom = energyPlot.centerTop.minusXY( 0, 5 );

      eraserButton.right = energyPlot.right;
      eraserButton.centerY = variableSwitch.centerY;

      yLabel.rightCenter = energyPlot.leftCenter.minusXY( 10, 0 );
      xLabelText.centerTop = energyPlot.centerBottom.plusXY( 0, 10 );
      checkboxGroup.rightCenter = yLabel.leftCenter.minusXY( 10, 0 );

      super( contentNode, {
        titleNode: new Text( plotsEnergyGraphString, { font: new PhetFont( { size: 16 } ) } ),
        titleAlignX: 'left',
        titleXSpacing: 7,
        buttonXMargin: 5,
        buttonYMargin: 5,
        contentYMargin: 2,
        contentXMargin: 4,
        contentYSpacing: -eraserButton.height + 2,
        tandem: tandem.createTandem( 'accordionBox' )
      } );

      // @public
      this.energyPlot = energyPlot;

      // @private {GraphsModel}
      this.model = model;

      // listeners - when the independent variable changes, clear all data and change graph display
      model.independentVariableProperty.link( ( independentVariable ) => {
        this.clearEnergyData();

        if ( independentVariable === GraphsModel.IndependentVariable.POSITION ) {
          energyPlot.setMaxX( 10 );
          energyPlot.setCursorVisibleOverride( false );
          energyPlot.setPlotStyle( XYDataSeriesNode.PlotStyle.SCATTER );
        }
        else {
          energyPlot.setMaxX( 20 );
          energyPlot.setCursorVisibleOverride( null );
          energyPlot.setPlotStyle( XYDataSeriesNode.PlotStyle.LINE );
        }
      } );
    }

    /**
     * Clear all data, removing saved SkaterSamples and removing all data from the XYDataSeries attached to the XYPlot.
     */
    clearEnergyData() {
      this.model.clearEnergyData();
      this.energyPlot.clearEnergyDataSeries();
    }

    /**
     * Create an "item" for a checkbox of the VerticalCheckboxGroup, with the label and controlling Property.
     *
     * @param {Property} property
     * @param {string} labelString
     * @param {PaintDef} labelFill
     *
     * @returns {*} - Conforms to the item object of VerticalCheckboxGroup
     */
    static createCheckboxItem( property, labelString, labelFill ) {
      return {
        node: new Text( labelString, {
          fill: labelFill,
          font: new PhetFont( { size: 11 } )
        } ),
        property: property
      };
    }
  }

  /**
   * XY Plot for a energy vs time. Includes labels and zoom buttons to change the zoom along the y axis (energy), and
   * an eraser button that clears the plot.
   */
  class EnergyXYPlot extends XYCursorPlot {

    /**
     * @param {EnergySkateParkModel} model
     * @param {number} graphWidth
     * @param {number} graphHeight
     * @param {Tandem} tandem
     */
    constructor( model, graphWidth, graphHeight, tandem ) {

      const dragEndedEmitter = new Emitter();
      const dragStartedEmitter = new Emitter();

      let pausedOnDragStart = true;

      super( {
        width: graphWidth,
        height: graphHeight,

        maxX: 20,
        minY: -3000,
        maxY: 3000,
        stepY: 1000,

        showAxis: false,

        tickLabelFont: new PhetFont( 10 ),

        lineDash: [ 4, 4 ],
        showVerticalIntermediateLines: false,
        showHorizontalIntermediateLines: false,

        cursorOptions: {
          startDrag: ( event, listener ) => {
            pausedOnDragStart = model.pausedProperty.get();

            if ( !pausedOnDragStart ) {
              model.pausedProperty.set( true );
            }

            // workaround because `this` is not accessible yet
            dragStartedEmitter.emit();
          },
          drag: ( event, listener ) => {

            // when we drag the cursor, get the skater sample at that time and set the skater to that state
            const closestSample = model.getClosestSkaterSample( this.getCursorValue() );
            closestSample.skaterState.setToSkater( model.skater );
            model.skater.updatedEmitter.emit();
          },
          endDrag: ( event, listener ) => {

            if ( !pausedOnDragStart ) {
              model.pausedProperty.set( false );
            }

            // clear all data up to this point, we will begin recording from here
            dragEndedEmitter.emit(); // a workaround since we don't have access to `this` yet
          }
        }
      } );

      // @private
      this.kineticEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.kineticEnergy } );
      this.potentialEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.potentialEnergy } );
      this.thermalEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.thermalEnergy } );
      this.totalEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.totalEnergy } );

      // add data points when a SkaterSample is added to the model
      model.skaterSamples.addItemAddedListener( addedSample => {
        const plotTime = model.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME;
        const independentVariable = plotTime ? addedSample.time : addedSample.position.x + 5;

        // keep a reference to the pointStyle so that it can be modified later
        const pointStyle = new PointStyle();

        this.kineticEnergyDataSeries.addPoint( independentVariable, addedSample.kineticEnergy, pointStyle );
        this.potentialEnergyDataSeries.addPoint( independentVariable, addedSample.potentialEnergy, pointStyle );
        this.thermalEnergyDataSeries.addPoint( independentVariable, addedSample.thermalEnergy, pointStyle );
        this.totalEnergyDataSeries.addPoint( independentVariable, addedSample.totalEnergy, pointStyle );

        // add a listener that updates opacity with the SkaterSample Property, dispose it on removal
        const opacityListener = opacity => {
          for ( let i = 0; i < this.dataSeriesList.length; i++ ) {
            pointStyle.opacity = opacity;
            this.seriesViewMap[ this.dataSeriesList[ i ].uniqueId ].redraw();
          }
        };
        addedSample.opacityProperty.link( opacityListener );

        const removalListener = removedSample => {
          if ( removedSample === addedSample ) {

            addedSample.opacityProperty.unlink( opacityListener );

            for ( let i = 0; i < this.dataSeriesList.length; i++ ) {
              // TODO: Get the index of the position removed sample rather than assume they will be removed from oldest
              // to newest?
              this.dataSeriesList[ i ].removePoint( 0 );
            }
            model.skaterSamples.removeItemRemovedListener( removalListener );
          }
        };
        model.skaterSamples.addItemRemovedListener( removalListener );

        this.setCursorValue( independentVariable );
      } );

      // series rendered in order, this order matches Java version
      this.addSeries( this.thermalEnergyDataSeries, true );
      this.addSeries( this.potentialEnergyDataSeries, true );
      this.addSeries( this.kineticEnergyDataSeries, true );
      this.addSeries( this.totalEnergyDataSeries, true );

      dragEndedEmitter.addListener( () => {
        const timeOnEnd = this.getCursorValue();

        model.runningTimeProperty.set( timeOnEnd );

        // clear all data that has time great than the cursor time - this assumes that the time data is in order
        for ( let i = 0; i < this.dataSeriesList.length; i++ ) {
          const dataSeries = this.dataSeriesList[ i ];
          const timeData = dataSeries.getXPoints();
          for ( let j = 0; j < dataSeries.getLength(); j++ ) {
            if ( timeData[ j ] >= timeOnEnd ) {
              const startIndex = j;
              const endIndex = dataSeries.getLength();

              dataSeries.removePoints( startIndex, endIndex );
              break;
            }
          }
        }
      } );

      model.kineticEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ this.kineticEnergyDataSeries.uniqueId ], 'visible' );
      model.potentialEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ this.potentialEnergyDataSeries.uniqueId ], 'visible' );
      model.thermalEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ this.thermalEnergyDataSeries.uniqueId ], 'visible' );
      model.totalEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ this.totalEnergyDataSeries.uniqueId ], 'visible' );
    }

    /**
     * Clear all energy data of the DataSeries, from reset or when the EraserButton is pressed.
     */
    clearEnergyDataSeries() {
      this.kineticEnergyDataSeries.clear();
      this.potentialEnergyDataSeries.clear();
      this.thermalEnergyDataSeries.clear();
      this.totalEnergyDataSeries.clear();

      this.setCursorValue( 0 );
    }
  }

  // for layout of the accordion box within a screen view, the spacing of the graph from the right edge of the
  // accordion box is the x content margin
  EnergyGraphAccordionBox.GRAPH_OFFSET = CONTENT_X_MARGIN;

  return energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
} );