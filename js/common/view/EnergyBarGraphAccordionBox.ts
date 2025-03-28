// Copyright 2019-2025, University of Colorado Boulder

/**
 * An AccordionBox that contains the energy bar graph used in this sim.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import Skater from '../model/Skater.js';
import EnergyBarGraph, { EnergyBarGraphOptions } from './EnergyBarGraph.js';

type SelfOptions = {

  // options for the bar graph itself, passed on to EnergyBarGraph
  barGraphOptions: EnergyBarGraphOptions;
};

type EnergyBarGraphAccordionBoxOptions = SelfOptions & AccordionBoxOptions;

// constants
const PANEL_MARGIN = 5;

export default class EnergyBarGraphAccordionBox extends AccordionBox {

  public constructor( skater: Skater, barGraphScaleProperty: NumberProperty, barGraphVisibleProperty: BooleanProperty, tandem: Tandem, providedOptions: EnergyBarGraphAccordionBoxOptions ) {

    const titleNode = new Node();

    // create an icon that represents the content, it is invisible when expanded
    const graphLabel = EnergyBarGraph.createLabel();
    const graphIcon = EnergyBarGraph.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ) );
    titleNode.children = [ graphLabel, graphIcon ];

    // layout the label and icon
    graphIcon.leftCenter = graphLabel.rightCenter.plusXY( PANEL_MARGIN * 8, 0 );

    const options = optionize4<EnergyBarGraphAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {}, {
      titleNode: titleNode,
      titleAlignX: 'left',

      contentXMargin: PANEL_MARGIN,
      contentYMargin: PANEL_MARGIN,
      buttonXMargin: PANEL_MARGIN,
      buttonYMargin: PANEL_MARGIN,

      // use this model Property because the graph only updates when it is visible
      expandedProperty: barGraphVisibleProperty,

      expandCollapseButtonOptions: {
        sideLength: 19
      },

      tandem: tandem
    }, EnergySkateParkConstants.GRAPH_PANEL_OPTONS, providedOptions );

    const energyBarGraph = new EnergyBarGraph( skater, barGraphScaleProperty, barGraphVisibleProperty, tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );

    super( energyBarGraph, options );

    barGraphVisibleProperty.link( visible => {
      graphIcon.visible = !visible;
    } );
  }
}

energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );