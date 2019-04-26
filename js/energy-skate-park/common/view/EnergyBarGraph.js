// Copyright 2019, University of Colorado Boulder

/**
 * Bar graph that displays the distribution of energy for this simulation.
 * 
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const BarChartNode = require( 'GRIDDLE/BarChartNode' );
  const ColorConstants = require( 'SUN/ColorConstants' );
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const ZoomButton = require( 'SCENERY_PHET/buttons/ZoomButton' );

  // constants
  // strings
  const energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  const energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  const energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  const energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  const energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );

  class EnergyBarGraph extends Node {

    /**
     * @param {Skater} skater
     * @param {NumberProperty} graphScaleProperty
     * @param {Tandem} tandem
     * @returns {Skater}            
     */
    constructor( skater, graphScaleProperty, tandem, options ) {

      options = _.extend( {

        // include buttons that increase/decrease the scale of the graph?
        includeZoomButtons: true
      }, options );

      // it is important that the bar graph be rendered with canvas so that the sim has a high framerate when the
      // skater is off screen in iOS, see https://github.com/phetsims/energy-skate-park/issues/42
      assert && assert( options.renderer === undefined, 'EnergyBarGraph sets renderer' );
      options.renderer = 'canvas';

      super( options );

      // the range for the visible portion of the graph, in joules - note this is somewhat arbitrary because
      // the bars will have difference scales, but size should be about 1.5 times larger than the energy would
      // extend bars at default scale
      const graphRangeProperty = new Property( new Range( -80, 285 ) );

      const kineticEntry = { property: skater.kineticEnergyProperty, color: EnergySkateParkColorScheme.kineticEnergy };
      const potentialEntry = { property: skater.potentialEnergyProperty, color: EnergySkateParkColorScheme.potentialEnergy };
      const thermalEntry = { property: skater.thermalEnergyProperty, color: EnergySkateParkColorScheme.thermalEnergy };
      const totalEntry = { property: skater.totalEnergyProperty, color: EnergySkateParkColorScheme.totalEnergy };

      this.barChartNode = new BarChartNode( [
        { entries: [ kineticEntry ], labelString: energyKineticString },
        { entries: [ potentialEntry ], labelString: energyPotentialString },
        { entries: [ thermalEntry ], labelString: energyThermalString },
        { entries: [ totalEntry ], labelString: energyTotalString }
      ], graphRangeProperty, {
        barLabelOptions: {
          maxWidth: 500,
          font: new PhetFont( 12 )
        },
        barOptions: {
          scaleProperty: graphScaleProperty
        },
        labelBackgroundColor: EnergySkateParkColorScheme.transparentPanelFill
      } );

      const graphLabel = new Text( energyEnergyString, { font: new PhetFont( { size: 14, weight: 'bold' } ) } );

      const labelledChart = new VBox( {
        children: [ graphLabel, this.barChartNode ]
      } );

      // main content for the containing panel, assembly depends on whether zoom buttons are required
      let content = null;
      if ( options.includeZoomButtons ) {

        const zoomOutButton = new ZoomButton( {
          in: false,
          scale: 0.3,
          baseColor: ColorConstants.LIGHT_BLUE,
          listener: function() {
            graphScaleProperty.set( Math.max( graphScaleProperty.get() - Constants.ZOOM_FACTOR_DELTA, Constants.MIN_ZOOM_FACTOR ) );
          },
          tandem: tandem.createTandem( 'zoomOutButton' )
        } );
        const zoomInButton = new ZoomButton( {
          in: true,
          scale: 0.3,
          baseColor: ColorConstants.LIGHT_BLUE,
          listener: function() {
            graphScaleProperty.set( Math.min( graphScaleProperty.get() + Constants.ZOOM_FACTOR_DELTA, Constants.MAX_ZOOM_FACTOR ) );
          },
          tandem: tandem.createTandem( 'zoomInButton' )
        } );

        const zoomButtons = new HBox( {
          children: [ zoomOutButton, zoomInButton ],
          spacing: 5
        } );

        content = new VBox( {
          children: [ labelledChart, zoomButtons ],
          spacing: 5,
          align: 'left'
        } );

        graphScaleProperty.link( scale => {
          zoomInButton.enabled = scale < Constants.MAX_ZOOM_FACTOR;
          zoomOutButton.enabled = scale > Constants.MIN_ZOOM_FACTOR;
        } );
      }
      else {
        content = labelledChart;
      }

      const containingPanel = new Panel( content );
      this.addChild( containingPanel );

      // attach listeners - bar chart exists for life of sim, no need to dispose
      skater.updatedEmitter.addListener( () => {
        this.barChartNode.update();
      } );


    }
  }

  return energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );
} );
