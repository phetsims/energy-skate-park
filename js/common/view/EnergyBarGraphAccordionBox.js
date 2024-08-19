// Copyright 2019-2020, University of Colorado Boulder

/**
 * An AccordionBox that contains the energy bar graph used in this sim.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Node } from '../../../../scenery/js/imports.js';
import AccordionBox from '../../../../sun/js/AccordionBox.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergyBarGraph from './EnergyBarGraph.js';

// constants
const PANEL_MARGIN = 5;

class EnergyBarGraphAccordionBox extends AccordionBox {

  /**
   * @param {Skater} skater
   * @param {NumberProperty} barGraphScaleProperty - controls scale of bar graphs
   * @param {BooleanProperty} barGraphVisibleProperty - controls visibility of bar graphs
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( skater, barGraphScaleProperty, barGraphVisibleProperty, tandem, options ) {

    const titleNode = new Node();

    // create an icon that represents the content, it is invisible when expanded
    const graphLabel = EnergyBarGraph.createLabel();
    const graphIcon = EnergyBarGraph.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ) );
    titleNode.children = [ graphLabel, graphIcon ];

    // layout the label and icon
    graphIcon.leftCenter = graphLabel.rightCenter.plusXY( PANEL_MARGIN * 8, 0 );

    options = merge( {

      titleNode: titleNode,
      titleAlignX: 'left',

      contentXMargin: PANEL_MARGIN,
      contentYMargin: PANEL_MARGIN,
      buttonXMargin: PANEL_MARGIN,
      buttonYMargin: PANEL_MARGIN,

      // use this model Property because the graph only updates when it is visible
      expandedProperty: barGraphVisibleProperty,

      // {null|*} options for the bar graph itself, passed on to EnergyBarGraph
      barGraphOptions: null,

      expandCollapseButtonOptions: {
        sideLength: 19
      },

      tandem: tandem
    }, EnergySkateParkConstants.GRAPH_PANEL_OPTONS, options );

    const energyBarGraph = new EnergyBarGraph( skater, barGraphScaleProperty, barGraphVisibleProperty, tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );

    super( energyBarGraph, options );

    barGraphVisibleProperty.link( visible => {
      graphIcon.visible = !visible;
    } );
  }
}

energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );
export default EnergyBarGraphAccordionBox;