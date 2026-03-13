// Copyright 2026, University of Colorado Boulder

/**
 * Colors for the 'Energy Skate Park' sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Line from '../../../scenery/js/nodes/Line.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../scenery/js/util/Color.js';
import NodePattern from '../../../scenery/js/util/NodePattern.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import energySkatePark from '../energySkatePark.js';

export default class EnergySkateParkColors {

  private constructor() {
    // Not intended for instantiation.
  }

  public static readonly kineticEnergyColorProperty = new ProfileColorProperty( energySkatePark, 'kineticEnergyColor', {
    default: PhetColorScheme.KINETIC_ENERGY
  } );

  public static readonly potentialEnergyColorProperty = new ProfileColorProperty( energySkatePark, 'potentialEnergyColor', {
    default: PhetColorScheme.GRAVITATIONAL_POTENTIAL_ENERGY
  } );

  public static readonly thermalEnergyColorProperty = new ProfileColorProperty( energySkatePark, 'thermalEnergyColor', {
    default: PhetColorScheme.HEAT_THERMAL_ENERGY
  } );

  public static readonly totalEnergyColorProperty = new ProfileColorProperty( energySkatePark, 'totalEnergyColor', {
    default: PhetColorScheme.TOTAL_ENERGY
  } );

  // Diagonal stripe pattern for thermal energy: red background with thin white lines going down-right
  public static readonly thermalEnergyPattern = new NodePattern(
    new Node( {
      children: [
        new Rectangle( 0, 0, 8, 8, { fill: PhetColorScheme.HEAT_THERMAL_ENERGY } ),

        // Diagonal white line from top-left to bottom-right, with wrapped copies for seamless tiling
        new Line( 0, 0, 8, 8, { stroke: 'white', lineWidth: 1 } ),
        new Line( -8, 0, 0, 8, { stroke: 'white', lineWidth: 1 } ),
        new Line( 8, 0, 16, 8, { stroke: 'white', lineWidth: 1 } )
      ]
    } ),
    2, 0, 0, 8, 8
  );

  // Dotted pattern for kinetic energy: green background with white polka dots
  public static readonly kineticEnergyPattern = new NodePattern(
    new Node( {
      children: [
        new Rectangle( 0, 0, 8, 8, { fill: PhetColorScheme.KINETIC_ENERGY } ),
        new Circle( 1.5, { centerX: 4, centerY: 4, fill: 'white' } )
      ]
    } ),
    2, 0, 0, 8, 8
  );

  // Dashed line dash array for total energy border
  public static readonly TOTAL_ENERGY_LINE_DASH = [ 3, 2 ];

  // fill of circles that show the skater path
  public static readonly pathFillProperty = new ProfileColorProperty( energySkatePark, 'pathFill', {
    default: new Color( 220, 175, 250 )
  } );

  public static readonly pathStrokeProperty = new ProfileColorProperty( energySkatePark, 'pathStroke', {
    default: 'black'
  } );

  public static readonly haloFillProperty = new ProfileColorProperty( energySkatePark, 'haloFill', {
    default: new Color( 225, 231, 86, 0.75 )
  } );

  // for radio buttons
  public static readonly radioButtonBaseColorProperty = new ProfileColorProperty( energySkatePark, 'radioButtonBaseColor', {
    default: 'white'
  } );

  public static readonly radioButtonSelectedStrokeProperty = new ProfileColorProperty( energySkatePark, 'radioButtonSelectedStroke', {
    default: 'rgb(87,178,226)'
  } );

  // associated with the Skater to represent position of the important particle coordinate
  public static readonly particleCircleFillProperty = new ProfileColorProperty( energySkatePark, 'particleCircleFill', {
    default: 'red'
  } );

  // colors for the Track
  public static readonly roadFillProperty = new ProfileColorProperty( energySkatePark, 'roadFill', {
    default: 'gray'
  } );

  public static readonly roadLineColorProperty = new ProfileColorProperty( energySkatePark, 'roadLineColor', {
    default: 'black'
  } );

  // colors for the reference height line
  public static readonly referenceLineFillProperty = new ProfileColorProperty( energySkatePark, 'referenceLineFill', {
    default: 'rgb(74,133,208)'
  } );

  public static readonly referenceLineStrokeProperty = new ProfileColorProperty( energySkatePark, 'referenceLineStroke', {
    default: 'black'
  } );

  // color for the reference line arrow
  public static readonly referenceArrowFillProperty = new ProfileColorProperty( energySkatePark, 'referenceArrowFill', {
    default: new Color( 254, 240, 53 )
  } );

  public static readonly panelFillProperty = new ProfileColorProperty( energySkatePark, 'panelFill', {
    default: '#F0F0F0'
  } );

  public static readonly panelStrokeProperty = new ProfileColorProperty( energySkatePark, 'panelStroke', {
    default: '#ababab'
  } );

  // chart panels have a white fill so that energy colors are easier to see
  public static readonly chartPanelFillProperty = new ProfileColorProperty( energySkatePark, 'chartPanelFill', {
    default: 'white'
  } );

  // surrounds text for better visibility
  public static readonly transparentPanelFillProperty = new ProfileColorProperty( energySkatePark, 'transparentPanelFill', {
    default: new Color( 255, 255, 255, 0.5 )
  } );
}

energySkatePark.register( 'EnergySkateParkColors', EnergySkateParkColors );
