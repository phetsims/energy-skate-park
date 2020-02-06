// Copyright 2019-2020, University of Colorado Boulder

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
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const merge = require( 'PHET_CORE/merge' );
  const MoveToTrashButton = require( 'SCENERY_PHET/MoveToTrashButton' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
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
     * @param {NumberProperty} barGraphScaleProperty
     * @param {Tandem} tandem
     * @returns {Skater}
     */
    constructor( skater, barGraphScaleProperty, barGraphVisibleProperty, tandem, options ) {

      options = merge( {

        // include buttons that increase/decrease the scale of the graph?
        showBarGraphZoomButtons: true,

        // @param {Range} - The range for the visible portion of the graph, in joules - note this is somewhat arbitrary
        // because the bars will have difference scales, but size should be about 1.5 times larger than the energy would
        // extend bars at default scale. A negative min value will allow some space to represent negative energies.
        graphRange: new Range( -100, 265 )
      }, options );

      super( options );

      // the range for the visible portion of the graph, in joules - note this is somewhat arbitrary because
      // the bars will have difference scales, but size should be about 1.5 times larger than the energy would
      // extend bars at default scale
      const graphRangeProperty = new Property( options.graphRange );

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

        const height = value * scale;
        let absHeight = Math.abs( height );
        if ( absHeight < 1 && absHeight > 1E-6 ) {
          absHeight = 1;
        }

        return absHeight * valueSign;
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
          maxWidth: 50, // i18n, by inspection
          font: new PhetFont( 12 )
        },
        barOptions: {
          scaleProperty: barGraphScaleProperty
        },
        labelBackgroundColor: EnergySkateParkColorScheme.transparentPanelFill
      } );

      // main content for the containing panel, assembly depends on whether zoom buttons are required
      let content = null;
      if ( options.showBarGraphZoomButtons ) {

        const zoomOutButton = new ZoomButton( {
          in: false,
          scale: 0.3,
          baseColor: ColorConstants.LIGHT_BLUE,
          listener: () => {
            barGraphScaleProperty.set( Math.max( barGraphScaleProperty.get() - Constants.ZOOM_FACTOR_DELTA, Constants.MIN_ZOOM_FACTOR ) );
          },
          tandem: tandem.createTandem( 'zoomOutButton' )
        } );
        const zoomInButton = new ZoomButton( {
          in: true,
          scale: 0.3,
          baseColor: ColorConstants.LIGHT_BLUE,
          listener: () => {
            barGraphScaleProperty.set( Math.min( barGraphScaleProperty.get() + Constants.ZOOM_FACTOR_DELTA, Constants.MAX_ZOOM_FACTOR ) );
          },
          tandem: tandem.createTandem( 'zoomInButton' )
        } );

        const zoomButtons = new HBox( {
          children: [ zoomOutButton, zoomInButton ],
          spacing: 5
        } );

        content = new VBox( {
          children: [ this.barChartNode, zoomButtons ],
          spacing: 5,
          align: 'left'
        } );

        barGraphScaleProperty.link( scale => {
          zoomInButton.enabled = scale < Constants.MAX_ZOOM_FACTOR;
          zoomOutButton.enabled = scale > Constants.MIN_ZOOM_FACTOR;
        } );

        barGraphScaleProperty.link( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
      }
      else {
        content = this.barChartNode;
      }

      this.addChild( content );

      // attach listeners - bar chart exists for life of sim, no need to dispose
      skater.energyChangedEmitter.addListener( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
      barGraphVisibleProperty.link( this.updateWhenVisible.bind( this ) );

      skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
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

    /**
     * Create the label for the bar graph, which can be added in various places depending on layout of the graph.
     * @returns {Text}
     */
    static createLabel() {
      return new Text( energyEnergyString, {
        font: new PhetFont( { size: 14, weight: 'bold' } ),
        maxWidth: 75 // i18n, by inspection
      } );
    }


    /**
     * Create an icon of the bar graph, to be used in visibility or other controls.
     *
     * @param {Tandem} tandem
     * @param {Object} [options]
     * @returns {Node}
     */
    static createBarGraphIcon( tandem, options ) {
      options = merge( {
        scale: 1
      }, options );

      return new Node( {
        tandem: tandem,
        children: [
          new Rectangle( 0, 0, 20, 20, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ),
          new Rectangle( 3, 14, 5, 6, {
            fill: EnergySkateParkColorScheme.kineticEnergy,
            stroke: 'black',
            lineWidth: 0.5
          } ),
          new Rectangle( 11, 8, 5, 12, {
            fill: EnergySkateParkColorScheme.potentialEnergy,
            stroke: 'black',
            lineWidth: 0.5
          } )
        ],

        scale: options.scale
      } );
    }
  }

  return energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );
} );
