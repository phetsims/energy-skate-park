// Copyright 2013-2026, University of Colorado Boulder

/**
 * Scenery node that shows the legend for the pie chart, and a reset button for thermal energy.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import AccessibleList from '../../../../scenery-phet/js/accessibility/AccessibleList.js';
import MoveToTrashLegendButton from '../../../../scenery-phet/js/buttons/MoveToTrashLegendButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import Color from '../../../../scenery/js/util/Color.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import Skater from '../model/Skater.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

const energyEnergyStringProperty = EnergySkateParkFluent.energies.energyStringProperty;
const energyKineticStringProperty = EnergySkateParkFluent.energies.kineticStringProperty;
const energyPotentialStringProperty = EnergySkateParkFluent.energies.potentialStringProperty;
const energyThermalStringProperty = EnergySkateParkFluent.energies.thermalStringProperty;
const energyTotalStringProperty = EnergySkateParkFluent.energies.totalStringProperty;

type SelfOptions = {

  // whether to include total energy in the legend, will the pie chart show total energy?
  includeTotal?: boolean;
};

export type PieChartLegendOptions = SelfOptions & PanelOptions;

export default class PieChartLegend extends Panel {

  /**
   * @param skater the model for the skater
   * @param clearThermal function to be called when the user presses the clear thermal button
   * @param pieChartVisibleProperty axon Property indicating whether the pie chart is visible
   * @param tandem
   * @param [providedOptions]
   */
  public constructor( skater: Skater, clearThermal: () => void, pieChartVisibleProperty: TReadOnlyProperty<boolean>, tandem: Tandem, providedOptions?: PieChartLegendOptions ) {

    const options = optionize<PieChartLegendOptions, SelfOptions, PanelOptions>()( {
      includeTotal: true
    }, providedOptions );

    // The x-coordinate of a bar chart bar
    const createLabel = ( index: number, title: string | TReadOnlyProperty<string>, tandemName: string ) => {
      return new Text( title, {
        tandem: tandem.createTandem( tandemName ),
        font: EnergySkateParkConstants.CONTROL_LABEL_FONT,
        pickable: false,
        maxWidth: 97 // selected by choosing the length of widest English string in ?stringTest=double
      } );
    };

    const createBar = ( index: number, color: Color ) => {
      return new Rectangle( 0, 0, 20.26, 20.26, {
        fill: color,
        stroke: 'black',
        lineWidth: 1
      } );
    };

    const kineticBar = createBar( 0, EnergySkateParkColorScheme.kineticEnergy );
    const potentialBar = createBar( 1, EnergySkateParkColorScheme.potentialEnergy );
    const thermalBar = createBar( 2, EnergySkateParkColorScheme.thermalEnergy );
    const totalBar = createBar( 3, EnergySkateParkColorScheme.totalEnergy );

    const kineticLabel = createLabel( 0, energyKineticStringProperty, 'kineticEnergyLabelText' );
    const potentialLabel = createLabel( 1, energyPotentialStringProperty, 'potentialEnergyLabelText' );
    const thermalLabel = createLabel( 2, energyThermalStringProperty, 'thermalEnergyLabelText' );
    const totalLabel = createLabel( 3, energyTotalStringProperty, 'totalEnergyLabelText' );

    const clearThermalButton = new MoveToTrashLegendButton( {
      arrowColor: EnergySkateParkColorScheme.thermalEnergy,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: clearThermal,
      centerX: thermalLabel.centerX,
      y: thermalLabel.bottom + 15,
      scale: 0.8,
      soundPlayer: sharedSoundPlayers.get( 'erase' ),
      accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleNameStringProperty,
      accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleContextResponseStringProperty
    } );
    skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    // Don't let the MoveToTrashLegendButton participate in the layout since it is too big vertically.  Just use a strut to
    // get the width right, then add the undo button later
    const clearThermalButtonStrut = new Rectangle( 0, 0, clearThermalButton.width, 1, {} );

    const spacing = 5;
    const children: Node[] = [
      new HBox( { spacing: spacing, children: [ kineticBar, kineticLabel ] } ),
      new HBox( { spacing: spacing, children: [ potentialBar, potentialLabel ] } ),
      new HBox( {
        spacing: spacing,
        children: [ thermalBar, thermalLabel, new HStrut( 1 ), clearThermalButtonStrut, new HStrut( 3 ) ]
      } )
    ];

    if ( options.includeTotal ) {
      children.push( new HBox( { spacing: 4, children: [ totalBar, totalLabel ] } ) );
    }

    children.push( new VStrut( 1.2 ) );

    const contentNode = new VBox( { spacing: 6, align: 'left', children: children } );

    const titleText = new Text( energyEnergyStringProperty, {
      tandem: tandem.createTandem( 'titleText' ),
      fill: 'black',
      font: new PhetFont( 17 ),
      pickable: false,
      maxWidth: 93 // selected by choosing the length of widest English string in ?stringTest=double
    } );
    const contentWithTitle = new VBox( {
      spacing: 6.14, align: 'center', children: [
        titleText,
        contentNode
      ]
    } );

    const panelContent = new Node();
    panelContent.children = [ contentWithTitle, clearThermalButton ];

    // Accessibility: dynamic energy description paragraph
    const ENERGY_THRESHOLD = EnergySkateParkConstants.ENERGY_THRESHOLD;
    const energyDescriptionProperty = new DerivedProperty( [
      skater.kineticEnergyProperty,
      skater.potentialEnergyProperty,
      skater.thermalEnergyProperty,
      skater.totalEnergyProperty,
      EnergySkateParkFluent.a11y.noDataParagraphStringProperty
    ], ( kinetic, potential, thermal, total, noDataText ) => {
      if ( potential < 0 ) {
        return EnergySkateParkFluent.a11y.pieChart.negativeEnergyParagraphStringProperty.value;
      }
      if ( Math.abs( total ) <= ENERGY_THRESHOLD ) {
        return noDataText;
      }

      const parts: string[] = [];
      if ( kinetic > ENERGY_THRESHOLD ) {
        parts.push( EnergySkateParkFluent.a11y.pieChart.kineticPercentPattern.format( { percent: Utils.roundSymmetric( kinetic / total * 100 ) } ) );
      }
      if ( potential > ENERGY_THRESHOLD ) {
        parts.push( EnergySkateParkFluent.a11y.pieChart.potentialPercentPattern.format( { percent: Utils.roundSymmetric( potential / total * 100 ) } ) );
      }
      if ( thermal > ENERGY_THRESHOLD ) {
        parts.push( EnergySkateParkFluent.a11y.pieChart.thermalPercentPattern.format( { percent: Utils.roundSymmetric( thermal / total * 100 ) } ) );
      }

      if ( parts.length === 0 ) { return ''; }

      return EnergySkateParkFluent.a11y.pieChart.positiveEnergyParagraph.format( {
        energiesList: parts.join( ', ' )
      } );
    } );

    // Accessibility: legend list
    const legendItems: TReadOnlyProperty<string>[] = [
      EnergySkateParkFluent.a11y.pieChart.legendKineticStringProperty,
      EnergySkateParkFluent.a11y.pieChart.legendPotentialStringProperty,
      EnergySkateParkFluent.a11y.pieChart.legendThermalStringProperty
    ];
    if ( options.includeTotal ) {
      legendItems.push( EnergySkateParkFluent.a11y.pieChart.legendTotalStringProperty );
    }

    super( panelContent, merge( {
      x: 4,
      y: 4,
      xMargin: 7,
      yMargin: 6,
      tandem: tandem,

      // pdom
      accessibleHeading: EnergySkateParkFluent.a11y.pieChart.accessibleHeadingStringProperty,
      accessibleParagraph: EnergySkateParkFluent.a11y.pieChart.accessibleHelpTextStringProperty,
      accessibleHelpText: energyDescriptionProperty,
      accessibleTemplate: AccessibleList.createTemplate( {
        leadingParagraphStringProperty: EnergySkateParkFluent.a11y.pieChart.legendHeadingStringProperty,
        listItems: legendItems
      } ),

      // The list describing energies is placed after the focusable panel children.
      appendAccessibleTemplate: true
    }, EnergySkateParkConstants.GRAPH_PANEL_OPTIONS ) );

    const strutGlobal = clearThermalButtonStrut.parentToGlobalPoint( clearThermalButtonStrut.center );
    const buttonLocal = clearThermalButton.globalToParentPoint( strutGlobal );
    clearThermalButton.center = buttonLocal;

    pieChartVisibleProperty.linkAttribute( this, 'visible' );

    // this button is small and usability is improved by larger touch areas
    clearThermalButton.touchArea = clearThermalButton.localBounds.dilated( 10 );
  }
}

energySkatePark.register( 'PieChartLegend', PieChartLegend );