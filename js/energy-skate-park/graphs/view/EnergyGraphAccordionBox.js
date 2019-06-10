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
  const Dimension2 = require( 'DOT/Dimension2' );
  const Text = require( 'SCENERY/nodes/Text' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const XYPlot = require( 'GRIDDLE/XYPlot' );
  const XYDataSeries = require( 'GRIDDLE/XYDataSeries' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  // strings
  const kineticEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/kineticEnergyLabel' );
  const potentialEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/potentialEnergyLabel' );
  const thermalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/thermalEnergyLabel' );
  const totalEnergyLabelString = require( 'string!ENERGY_SKATE_PARK/totalEnergyLabel' );
  const timeLabelString = require( 'string!ENERGY_SKATE_PARK/timeLabel' );
  const positionLabelString = require( 'string!ENERGY_SKATE_PARK/positionLabel' );

  class EnergyGraphAccordionBox extends AccordionBox {

    /**
     * TODO: JSDOC
     */
    constructor( model, options ) {

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


      // placeholder rectangle, this will eventually be the graph - all layout is relative to this
      const energyPlot = new EnergyXYPlot( model );
      contentNode.addChild( energyPlot );

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

      // layout
      checkboxGroup.rightCenter = energyPlot.leftCenter;
      variableSwitch.centerBottom = energyPlot.centerTop;

      super( contentNode, options );
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
  class EnergyXYPlot extends XYPlot {

    /**
     * @param {EnergySkateParkModel} model
     */
    constructor( model ) {
      super( {
        width: 450,
        height: 150,

        maxX: 20,
        minY: -3000,
        maxY: 3000,
        stepY: 1000,

        showAxis: false,

        tickLabelFont: new PhetFont( 12 ),

        lineDash: [ 4, 4 ],
        showVerticalIntermediateLines: false,
        showHorizontalIntermediateLines: false
      } );

      const kineticEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.kineticEnergy } );
      const potentialEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.potentialEnergy } );
      const thermalEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.thermalEnergy } );
      const totalEnergyDataSeries = new XYDataSeries( { color: EnergySkateParkColorScheme.totalEnergy } );

      model.skaterSamples.addItemAddedListener( skaterState => {
        kineticEnergyDataSeries.addPoint( skaterState.time, skaterState.getKineticEnergy() );
        potentialEnergyDataSeries.addPoint( skaterState.time, skaterState.getPotentialEnergy() );
        thermalEnergyDataSeries.addPoint( skaterState.time, skaterState.thermalEnergy );
        totalEnergyDataSeries.addPoint( skaterState.time, skaterState.getTotalEnergy() );
      } );

      this.addSeries( kineticEnergyDataSeries, true );
      this.addSeries( potentialEnergyDataSeries, true );
      this.addSeries( thermalEnergyDataSeries, true );
      this.addSeries( totalEnergyDataSeries, true );

      model.kineticEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ kineticEnergyDataSeries.uniqueId ], 'visible' );
      model.potentialEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ potentialEnergyDataSeries.uniqueId ], 'visible' );
      model.thermalEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ thermalEnergyDataSeries.uniqueId ], 'visible' );
      model.totalEnergyDataVisibleProperty.linkAttribute( this.seriesViewMap[ totalEnergyDataSeries.uniqueId ], 'visible' );
    }
  }

  return energySkatePark.register( 'EnergyGraphAccordionBox', EnergyGraphAccordionBox );
} );