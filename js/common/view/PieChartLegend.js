// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node that shows the legend for the pie chart, and a reset button for thermal energy.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import MoveToTrashButton from '../../../../scenery-phet/js/MoveToTrashButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import Panel from '../../../../sun/js/Panel.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

const energyEnergyString = energySkateParkStrings.energies.energy;
const energyKineticString = energySkateParkStrings.energies.kinetic;
const energyPotentialString = energySkateParkStrings.energies.potential;
const energyThermalString = energySkateParkStrings.energies.thermal;
const energyTotalString = energySkateParkStrings.energies.total;

class PieChartLegend extends Panel {

  /**
   * @param {Skater} skater the model for the skater
   * @param {Function} clearThermal function to be called when the user presses the clear thermal button
   * @param {Property.<boolean>} pieChartVisibleProperty axon Property indicating whether the pie chart is visible
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( skater, clearThermal, pieChartVisibleProperty, tandem, options ) {

    options = merge( {

      // {boolean} - whether or not to include total energy in the legend, will the pie chart show total energy?
      includeTotal: true
    }, options );

    // The x-coordinate of a bar chart bar
    const createLabel = ( index, title, tandemName ) => {
      return new Text( title, {
        tandem: tandem.createTandem( tandemName ),
        font: EnergySkateParkConstants.CONTROL_LABEL_FONT,
        pickable: false,
        maxWidth: 97 // selected by choosing the length of widest English string in ?stringTest=double
      } );
    };

    const createBar = ( index, color ) => {
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

    const kineticLabel = createLabel( 0, energyKineticString, 'kineticEnergyLabel' );
    const potentialLabel = createLabel( 1, energyPotentialString, 'potentialEnergyLabel' );
    const thermalLabel = createLabel( 2, energyThermalString, 'thermalEnergyLabel' );
    const totalLabel = createLabel( 3, energyTotalString, 'totalEnergyLabel' );

    const clearThermalButton = new MoveToTrashButton( {
      arrowColor: EnergySkateParkColorScheme.thermalEnergy,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: clearThermal,
      centerX: thermalLabel.centerX,
      y: thermalLabel.bottom + 15,
      scale: 0.8
    } );
    skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    // Don't let the MoveToTrashButton participate in the layout since it is too big vertically.  Just use a strut to
    // get the width right, then add the undo button later
    const clearThermalButtonStrut = new Rectangle( 0, 0, clearThermalButton.width, 1, {} );

    const spacing = 5;
    const children = [
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

    const titleNode = new Text( energyEnergyString, {
      tandem: tandem.createTandem( 'titleNode' ),
      fill: 'black',
      font: new PhetFont( 17 ),
      pickable: false,
      maxWidth: 93 // selected by choosing the length of widest English string in ?stringTest=double
    } );
    const contentWithTitle = new VBox( {
      spacing: 6.14, align: 'center', children: [
        titleNode,
        contentNode
      ]
    } );

    super( contentWithTitle, merge( {
      x: 4,
      y: 4,
      xMargin: 7,
      yMargin: 6,
      resize: false,
      tandem: tandem
    }, EnergySkateParkConstants.GRAPH_PANEL_OPTONS ) );

    this.addChild( clearThermalButton );
    const strutGlobal = clearThermalButtonStrut.parentToGlobalPoint( clearThermalButtonStrut.center );
    const buttonLocal = clearThermalButton.globalToParentPoint( strutGlobal );
    clearThermalButton.center = buttonLocal;

    pieChartVisibleProperty.linkAttribute( this, 'visible' );

    // this button is small and usability is improved by larger touch areas
    clearThermalButton.touchArea = clearThermalButton.localBounds.dilated( 10 );
  }
}

energySkatePark.register( 'PieChartLegend', PieChartLegend );
export default PieChartLegend;