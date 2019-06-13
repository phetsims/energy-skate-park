// Copyright 2019, University of Colorado Boulder

/**
 * TODO: Typedoc
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
  const Text = require( 'SCENERY/nodes/Text' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const XYTimePlot = require( 'GRIDDLE/XYTimePlot' );
  const XYDataSeries = require( 'GRIDDLE/XYDataSeries' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  const kineticEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/kineticEnergyLabel' );
  const potentialEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/potentialEnergyLabel' );
  const thermalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/thermalEnergyLabel' );
  const totalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/totalEnergyLabel' );
  const timeLabelString = require( 'string!ENERGY_SKATE_PARK/timeLabel' );
  const positionLabelString = require( 'string!ENERGY_SKATE_PARK/positionLabel' );
  const plotsEnergyGraphString = require( 'string!ENERGY_SKATE_PARK/plots.energy-graph' );

  // constants
  const GRAPH_WIDTH = 475;
  const GRAPH_HEIGHT = 125;

  class EnergyGraphAccordionBox extends AccordionBox {

    /**
     * TODO: JSDOC
     */
    constructor( model ) {

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

      // all layout is relative to the graph
      const energyPlot = new EnergyXYPlot( model );
      contentNode.addChild( energyPlot );

      const eraserButton = new EraserButton( {
        listener: () => {
          model.clearEnergyData();
          energyPlot.clearEnergyDataSeries();
        }
      } );
      contentNode.addChild( eraserButton );

      const switchLabelOptions = {
        font: new PhetFont( { size: 11 } )
      };
      const variables = model.independentVariables;
      const positionLabel = new Text( positionLabelString, switchLabelOptions );
      const timeLabel = new Text( timeLabelString, switchLabelOptions );
      const variableSwitch = new ABSwitch( model.independentVariableProperty, variables.POSITION, positionLabel, variables.TIME, timeLabel, {
        switchSize: new Dimension2( 40, 20 )
      } );
      contentNode.addChild( variableSwitch );

      // layout, all layout is relative to the energy plot
      checkboxGroup.rightCenter = energyPlot.leftCenter;
      variableSwitch.centerBottom = energyPlot.centerTop;
      eraserButton.rightBottom = energyPlot.rightTop;

      super( contentNode, {
        titleNode: new Text( plotsEnergyGraphString, { font: new PhetFont( { size: 16 } ) } ),
        titleAlignX: 'left',
        titleXSpacing: 7,
        buttonXMargin: 5,
        buttonYMargin: 5
      } );

      // @public
      this.energyPlot = energyPlot;
    }

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
  class EnergyXYPlot extends XYTimePlot {

    /**
     * @param {EnergySkateParkModel} model
     */
    constructor( model ) {

      const dragEndedEmitter = new Emitter();
      const dragStartedEmitter = new Emitter();

      let pausedOnDragStart = true;

      super( {
        width: GRAPH_WIDTH,
        height: GRAPH_HEIGHT,

        maxX: 20,
        minY: -3000,
        maxY: 3000,
        stepY: 1000,

        showAxis: false,

        tickLabelFont: new PhetFont( 12 ),

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

      model.skaterSamples.addItemAddedListener( skaterState => {

        const time = skaterState.time;

        this.kineticEnergyDataSeries.addPoint( time, skaterState.getKineticEnergy() );
        this.potentialEnergyDataSeries.addPoint( time, skaterState.getPotentialEnergy() );
        this.thermalEnergyDataSeries.addPoint( time, skaterState.thermalEnergy );
        this.totalEnergyDataSeries.addPoint( time, skaterState.getTotalEnergy() );

        this.setCursorTime( time );
      } );

      // series rendered in order, this order matches Java version
      this.addSeries( this.thermalEnergyDataSeries, true );
      this.addSeries( this.potentialEnergyDataSeries, true );
      this.addSeries( this.kineticEnergyDataSeries, true );
      this.addSeries( this.totalEnergyDataSeries, true );

      dragEndedEmitter.addListener( () => {
        const timeOnEnd = this.getCursorTime();

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

    startDrag( event, listener ) {
      this.pausedOnDragStart = this.model.pausedProperty.get();

      if ( !this.pausedOnDragStart ) {
        this.model.pausedProperty.set( false );
      }
    }

    endDrag( event, listener ) {
      if ( !this.pausedOnDragStart ) {
        this.model.pausedProperty.set( false );
      }
    }

    clearEnergyDataSeries() {
      this.kineticEnergyDataSeries.clear();
      this.potentialEnergyDataSeries.clear();
      this.thermalEnergyDataSeries.clear();
      this.totalEnergyDataSeries.clear();
    }
  }

  return energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
} );