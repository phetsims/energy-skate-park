// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node that shows the legend for the pie chart, and a reset button for thermal energy.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const merge = require( 'PHET_CORE/merge' );
  const MoveToTrashButton = require( 'SCENERY_PHET/MoveToTrashButton' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  const energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  const energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  const energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  const energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );

  class PieChartLegend extends Panel{

    /**
     * @param {Skater} skater the model for the skater
     * @param {Function} clearThermal function to be called when the user presses the clear thermal button
     * @param {Property.<boolean>} pieChartVisibleProperty axon Property indicating whether the pie chart is visible
     * @param {Tandem} tandem
     * @param {Object} options
     * @constructor
     */
    constructor( skater, clearThermal, pieChartVisibleProperty, tandem, options ) {

      options = merge( {

        // {boolean} - whether or not to include total energy in the legend, will the pie chart show total energy?
        includeTotal: true
      }, options );

      // The x-coordinate of a bar chart bar
      const createLabel = ( index, title, color, tandemName ) => {
        return new Text( title, {
          tandem: tandem.createTandem( tandemName ),
          fill: color,
          font: new PhetFont( 12 ),
          pickable: false,
          maxWidth: 97 // selected by choosing the length of widest English string in ?stringTest=double
        } );
      };

      const createBar = ( index, color ) => {
        return new Rectangle( 0, 0, 16.5, 16.5, {
          fill: color,
          stroke: 'black',
          lineWidth: 1
        } );
      };

      const kineticBar = createBar( 0, EnergySkateParkColorScheme.kineticEnergy );
      const potentialBar = createBar( 1, EnergySkateParkColorScheme.potentialEnergy );
      const thermalBar = createBar( 2, EnergySkateParkColorScheme.thermalEnergy );
      const totalBar = createBar( 3, EnergySkateParkColorScheme.totalEnergy );

      const kineticLabel = createLabel( 0, energyKineticString, EnergySkateParkColorScheme.kineticEnergy, 'kineticEnergyLabel' );
      const potentialLabel = createLabel( 1, energyPotentialString, EnergySkateParkColorScheme.potentialEnergy, 'potentialEnergyLabel' );
      const thermalLabel = createLabel( 2, energyThermalString, EnergySkateParkColorScheme.thermalEnergy, 'thermalEnergyLabel' );
      const totalLabel = createLabel( 3, energyTotalString, EnergySkateParkColorScheme.totalEnergy, 'totalEnergyLabel' );

      const clearThermalButton = new MoveToTrashButton( {
        arrowColor: EnergySkateParkColorScheme.thermalEnergy,
        tandem: tandem.createTandem( 'clearThermalButton' ),
        listener: clearThermal,
        centerX: thermalLabel.centerX,
        y: thermalLabel.bottom + 15,
        scale: 0.65
      } );
      skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
        clearThermalButton.enabled = allowClearingThermalEnergy;
      } );

      // Don't let the MoveToTrashButton participate in the layout since it is too big vertically.  Just use a strut to
      // get the width right, then add the undo button later
      const clearThermalButtonStrut = new Rectangle( 0, 0, clearThermalButton.width, 1, {} );

      const children = [
        new HBox( { spacing: 4, children: [ kineticBar, kineticLabel ] } ),
        new HBox( { spacing: 4, children: [ potentialBar, potentialLabel ] } ),
        new HBox( {
          spacing: 4,
          children: [ thermalBar, thermalLabel, new HStrut( 1 ), clearThermalButtonStrut, new HStrut( 3 ) ]
        } )
      ];

      if ( options.includeTotal ) {
        children.push( new HBox( { spacing: 4, children: [ totalBar, totalLabel ] } ) );
      }

      children.push( new VStrut( 1 ) );

      const contentNode = new VBox( { spacing: 5, align: 'left', children: children } );

      const titleNode = new Text( energyEnergyString, {
        tandem: tandem.createTandem( 'titleNode' ),
        fill: 'black',
        font: new PhetFont( 14 ),
        pickable: false,
        maxWidth: 93 // selected by choosing the length of widest English string in ?stringTest=double
      } );
      const contentWithTitle = new VBox( {
        spacing: 5, align: 'center', children: [
          titleNode,
          contentNode
        ]
      } );

      super( contentWithTitle,
        {
          x: 4,
          y: 4,
          xMargin: 6,
          yMargin: 5,
          fill: 'white',
          stroke: 'gray',
          lineWidth: 1,
          resize: false,
          tandem: tandem
        } );

      this.addChild( clearThermalButton );
      const strutGlobal = clearThermalButtonStrut.parentToGlobalPoint( clearThermalButtonStrut.center );
      const buttonLocal = clearThermalButton.globalToParentPoint( strutGlobal );
      clearThermalButton.center = buttonLocal;

      pieChartVisibleProperty.linkAttribute( this, 'visible' );
    }
  }

  return energySkatePark.register( 'PieChartLegend', PieChartLegend );
} );