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
  const MoveToTrashButton = require( 'SCENERY_PHET/MoveToTrashButton' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const ZoomButton = require( 'SCENERY_PHET/buttons/ZoomButton' );

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
    constructor( skater, graphScaleProperty, barGraphVisibleProperty, tandem, options ) {

      options = _.extend( {

        // include buttons that increase/decrease the scale of the graph?
        showBarGraphZoomButtons: true
      }, options );

      // it is important that the bar graph be rendered with canvas so that the sim has a high framerate when the
      // skater is off screen in iOS, see https://github.com/phetsims/energy-skate-park/issues/42
      assert && assert( options.renderer === undefined, 'EnergyBarGraph sets renderer' );
      options.renderer = 'canvas';

      super( options );

      // the range for the visible portion of the graph, in joules - note this is somewhat arbitrary because
      // the bars will have difference scales, but size should be about 1.5 times larger than the energy would
      // extend bars at default scale
      const graphRangeProperty = new Property( new Range( -100, 265 ) );

      // For kinetic and potential, they must go to zero at the endpoints to reach learning goals like
      //   "The kinetic energy is zero at the top of the trajectory (turning point)
      const hideSmallValues = ( value, scale ) => {
        const height = value * scale;
        const absHeight = Math.abs( height );
        if ( absHeight < 1 ) {
          return 0;
        }
        return height;  
      };

      // For thermal and total energy, make sure they are big enough to be visible, see #307
      const showSmallValues = ( value, scale ) => {
        const valueSign = value < 0 ? -1 : 1; 

        let height = value * scale;
        const absHeight = Math.abs( height );
        if ( absHeight < 1 && absHeight > 1E-6 ) {
          height = 1;
        }
        return height * valueSign;
      };

      // button to remove thermal energy will be below the "thermal" energy label
      const clearThermalButton = new MoveToTrashButton( {
        arrowColor: EnergySkateParkColorScheme.thermalEnergy,
        tandem: tandem.createTandem( 'clearThermalButton' ),
        listener: skater.clearThermal.bind( skater ),
        scale: 0.7
      } );

      const kineticEntry = { property: skater.kineticEnergyProperty, color: EnergySkateParkColorScheme.kineticEnergy, modifyBarHeight: hideSmallValues };
      const potentialEntry = { property: skater.potentialEnergyProperty, color: EnergySkateParkColorScheme.potentialEnergy, modifyBarHeight: hideSmallValues };
      const thermalEntry = { property: skater.thermalEnergyProperty, color: EnergySkateParkColorScheme.thermalEnergy, modifyBarHeight: showSmallValues };
      const totalEntry = { property: skater.totalEnergyProperty, color: EnergySkateParkColorScheme.totalEnergy, modifyBarHeight: showSmallValues };

      this.barChartNode = new BarChartNode( [
        { entries: [ kineticEntry ], labelString: energyKineticString },
        { entries: [ potentialEntry ], labelString: energyPotentialString },
        { entries: [ thermalEntry ], labelString: energyThermalString, labelNode: clearThermalButton },
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
      if ( options.showBarGraphZoomButtons ) {

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

        graphScaleProperty.link( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
      }
      else {
        content = labelledChart;
      }

      const containingPanel = new Panel( content );
      this.addChild( containingPanel );

      // attach listeners - bar chart exists for life of sim, no need to dispose
      skater.energyChangedEmitter.addListener( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
      barGraphVisibleProperty.link( this.updateWhenVisible.bind( this ) );

      skater.allowClearingThermalEnergyProperty.link( function( allowClearingThermalEnergy ) {
        clearThermalButton.enabled = allowClearingThermalEnergy;
      } );
    }

    /**
     * If model indicates that graph is visible, redraw the graph.
     *
     * @param {boolean} visible
     */
    updateWhenVisible( visible ) {
      if ( visible ) {
        this.barChartNode.update();
      }
    }
  }

  return energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );
} );
