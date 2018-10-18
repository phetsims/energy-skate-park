// Copyright 2013-2017, University of Colorado Boulder

/**
 * Scenery node that shows static background for the bar graph, including the title, axes, labels and clear thermal
 * button. This was split into separate layers in order to keep the animation fast (while still looking crisp) on iPad.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ClearThermalButton = require( 'SCENERY_PHET/ClearThermalButton' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ZoomButton = require( 'SCENERY_PHET/buttons/ZoomButton' );

  // strings
  var energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  var energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  var energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  var energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  var energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );

  /**
   * Constructor for the BarGraph
   * @param {Skater} skater the model's skater model
   * @param {Property<Boolean>} barGraphVisibleProperty property that indicates whether the bar graph is visible
   * @param {Function} clearThermal function to be called when the user presses the clear thermal button.
   * @param {Tandem} tandem
   * @constructor
   */
  function BarGraphBackground( skater, barGraphVisibleProperty, clearThermal, tandem ) {

    var self = this;

    // Free layout parameters
    var contentWidth = 110;
    var contentHeight = 325;
    var insetX = 2;
    var insetY = 25;

    var numBars = 4;
    var spaceBetweenBars = 10;
    var spaceBetweenAxisAndBar = 10;
    var spaceBetweenRightSideAndBar = 5;
    this.barWidth = (contentWidth - insetX * 2 - (numBars - 1) * spaceBetweenBars - spaceBetweenAxisAndBar - spaceBetweenRightSideAndBar) / numBars;

    this.originY = contentHeight - insetY;

    // The x-coordinate of a bar chart bar
    this.getBarX = function( barIndex ) { return insetX + spaceBetweenAxisAndBar + self.barWidth * barIndex + spaceBetweenBars * barIndex; };

    // Create a label that appears under one of the bars
    var createLabel = function( index, title, color, tandemName ) {
      var text = new Text( title, {
        tandem: tandem.createTandem( tandemName ),
        fill: color,
        font: new PhetFont( 14 ),
        pickable: false,
        maxWidth: 90 // selected by requiring that the bar chart not overlap with the track toolbox, see #337
      } );
      text.rotate( -Math.PI / 2 );
      text.centerX = self.getBarX( index ) + self.barWidth / 2;
      text.top = self.originY + 2;

      return text;
    };

    // @private {Node}
    this.kineticLabel = createLabel( 0, energyKineticString, EnergySkateParkColorScheme.kineticEnergy, 'kineticEnergyLabel' );
    this.potentialLabel = createLabel( 1, energyPotentialString, EnergySkateParkColorScheme.potentialEnergy, 'potentialEnergyLabel' );
    this.thermalLabel = createLabel( 2, energyThermalString, EnergySkateParkColorScheme.thermalEnergy, 'thermalEnergyLabel' );
    this.totalLabel = createLabel( 3, energyTotalString, EnergySkateParkColorScheme.totalEnergy, 'totalEnergyLabel' );

    var clearThermalButton = new ClearThermalButton( {
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: clearThermal,
      centerX: this.thermalLabel.centerX,
      y: this.thermalLabel.bottom + 12,
      scale: 0.7
    } );
    skater.allowClearingThermalEnergyProperty.link( function( allowClearingThermalEnergy ) {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    var zoomInButton = new ZoomButton( {
      in: true,
      leftTop: clearThermalButton.rightBottom.plusXY( 10, 5 ),
      scale: 0.4
    } );
    var zoomOutButton = new ZoomButton( {
      in: false,
      leftCenter: zoomInButton.rightCenter.plusXY( 5, 0 ),
      scale: 0.4
    } );

    var titleNode = new Text( energyEnergyString, {
      tandem: tandem.createTandem( 'titleNode' ),
      x: 5,
      top: 0,
      font: new PhetFont( 14 ),
      pickable: false,
      maxWidth: 93 // selected by choosing the length of English string in ?stringTest=double
    } );
    var contentNode = new Rectangle( 0, 0, contentWidth, contentHeight, {
      children: [
        new ArrowNode( insetX, this.originY, insetX, insetY, {
          pickable: false,
          tandem: tandem.createTandem( 'arrowNode' )
        } ),
        titleNode,
        new Line( insetX, this.originY, contentWidth - insetX, this.originY, {
          lineWidth: 1,
          stroke: 'gray',
          pickable: false
        } ),
        this.kineticLabel,
        this.potentialLabel,
        this.thermalLabel,
        this.totalLabel,
        clearThermalButton,
        zoomInButton,
        zoomOutButton
      ]
    } );

    // Center the bar chart title, see #62
    titleNode.centerX = contentNode.centerX;

    Panel.call( this, contentNode, {
      x: 10,
      y: 10,
      xMargin: 10,
      yMargin: 5,
      fill: 'white',
      stroke: 'gray',
      lineWidth: 1,
      resize: false,
      tandem: tandem
    } );

    // When the bar graph is shown, update the bars (because they do not get updated when invisible for performance reasons)
    barGraphVisibleProperty.linkAttribute( this, 'visible' );
  }

  energySkatePark.register( 'BarGraphBackground', BarGraphBackground );

  return inherit( Panel, BarGraphBackground, {

    /**
     * Return the height of the label, referenced by index. For negative energies, we need to adjust alpha for a section
     * of the bar rectangle of this height.
     *
     * @public
     * @return {number}
     */
    getLabelHeight: function( index ) {
      var height;
      switch( index ) {
        case 0:
          height = this.kineticLabel.height;
          break;
        case 1:
          height = this.potentialLabel.height;
          break;
        case 2:
          height = this.thermalLabel.height;
          break;
        case 3:
          height = this.totalLabel.height;
          break;
        default:
          throw new Error( 'height should be defined and non-zero, you might have provided a bad index' );
      }

      return height;
    }
  } );
} );