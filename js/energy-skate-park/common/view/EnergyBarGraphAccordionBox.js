// Copyright 2019, University of Colorado Boulder

/**
 * An AccordionBox that contains the energy bar graph used in this sim.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergyBarGraph = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraph' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  class EnergyBarGraphAccordionBox extends AccordionBox {

    /**
     * @param {EnergySkateParkModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem, options ) {

      options = _.extend( {
        barGraphOptions: null
      }, options );

      const energyBarGraph = new EnergyBarGraph( model.skater, model.barGraphScaleProperty, model.barGraphVisibleProperty, tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );

      const margin = 5;
      super( energyBarGraph, {

        contentXMargin: margin,
        contentYMargin: margin,
        buttonXMargin: margin,
        buttonYMargin: margin,
        cornerRadius: margin,

        titleNode: EnergyBarGraph.createLabel(),

        // use this model Property because the graph only updates when it is visible
        expandedProperty: model.barGraphVisibleProperty,

        // {null|*} options for the bar graph itself, passed on to EnergyBarGraph
        barGraphOptions: null,

        tandem: tandem
      } );

      // create an icon that represents the content, it is invisible when expanded
      const graphIcon = createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ), { scale: 0.8 } );
      this.addChild( graphIcon );
      graphIcon.right = graphIcon.globalToParentPoint( energyBarGraph.parentToGlobalPoint( energyBarGraph.rightCenter ) ).x;
      graphIcon.top = margin;

      model.barGraphVisibleProperty.link( ( visible ) => {
        graphIcon.visible = !visible;
      } );
    }
  }

  /**
   * Create an icon for the energy bar graph accordion box title.
   * @private
   *
   * @param {Tandem} tandem
   * @param {Object} options
   * @returns {Node}
   */
  function createBarGraphIcon( tandem, options ) {
    options = _.extend( {
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

  return energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );
} );
