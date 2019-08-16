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
  const Tandem = require( 'TANDEM/Tandem' );
  var EnergyBarGraph = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergyBarGraph' );

  class EnergyBarGraphAccordionBox extends AccordionBox {

    /**
     * @param {EnergySkateParkModel} model
     * @param {Object} options
     */
    constructor( model, options ) {

      options = _.extend( {

        contentXMargin: 5,
        contentYMargin: 5,
        buttonXMargin: 5,
        buttonYMargin: 5,
        titleNode: EnergyBarGraph.createLabel(),

        // use this model Property because the graph only updates when it is visible
        expandedProperty: model.barGraphVisibleProperty,

        // {null|*} options for the bar graph itself, passed on to EnergyBarGraph
        barGraphOptions: null,

        tandem: Tandem.required
      }, options );

      const energyBarGraph = new EnergyBarGraph( model.skater, model.barGraphScaleProperty, model.barGraphVisibleProperty, options.tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );
      super( energyBarGraph, options );
    }
  }

  return energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );
} );
