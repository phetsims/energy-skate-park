// Copyright 2019-2026, University of Colorado Boulder

/**
 * An AccordionBox that contains the energy bar graph used in this sim.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
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

    // create an icon that represents the content, it is invisible when expanded
    const graphLabel = EnergyBarGraph.createLabel();
    const graphIcon = EnergyBarGraph.createBarGraphIcon( tandem.createTandem( 'barGraphIcon' ) );

    const titleContainer = new HBox( {
      children: [ graphLabel, graphIcon ],
      excludeInvisible: false
    } );

    const options = optionize4<EnergyBarGraphAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {}, {
      titleNode: titleContainer,

      // Putting the icon at the right, with the right spacing between the icon and label, makes the text appear centered, see https://github.com/phetsims/energy-skate-park/issues/398
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

      accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.accessibleNameStringProperty,

      tandem: tandem
    }, EnergySkateParkConstants.GRAPH_PANEL_OPTIONS, providedOptions );

    const energyBarGraph = new EnergyBarGraph( skater, barGraphScaleProperty, barGraphVisibleProperty, tandem.createTandem( 'energyBarGraph' ), options.barGraphOptions );

    super( energyBarGraph, options );

    barGraphVisibleProperty.link( visible => {
      graphIcon.visible = !visible;

      // Show help text only when the accordion box is expanded (AccordionBox only supports collapsed help text natively)
      this.accessibleHelpText = visible ? EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.accessibleHelpTextExpandedStringProperty : null;
    } );
  }
}

energySkatePark.register( 'EnergyBarGraphAccordionBox', EnergyBarGraphAccordionBox );