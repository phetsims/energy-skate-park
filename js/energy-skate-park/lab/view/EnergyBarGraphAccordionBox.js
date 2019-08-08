// Copyright 2019, University of Colorado Boulder

/**
 * An AccordionBox that contains the energy bar graph used in this sim.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergyBarGraph = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraph' );
  const AccordionBox = require( 'SUN/AccordionBox' );

  class EnergyBarGraphAccordionBox extends AccordionBox {

    /**
     * @param {EnergySkateParkModel} model
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( model, tandem, options ) {

      options = _.extend( {

        contentXMargin: 5,
        contentYMargin: 5,
        buttonXMargin: 5,
        buttonYMargin: 5,
        titleNode: EnergyBarGraph.createLabel(),

        // use this model Property because the graph only updates when it is visible
        expandedProperty: model.barGraphVisibleProperty,

        // {null|*} options for the bar graph itself, passed on to EnergyBarGraph
        barGraphOptions: null
      } );

      const energyBarGraph = new EnergyBarGraph( model.skater, model.barGraphScaleProperty, model.barGraphVisibleProperty, tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );
      super( energyBarGraph, options );
    }
  }

  return energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );
} );
