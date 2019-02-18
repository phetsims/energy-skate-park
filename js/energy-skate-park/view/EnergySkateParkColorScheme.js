// Copyright 2013-2019, University of Colorado Boulder

/**
 * Colors used in Energy Skate Park, using PhetColorScheme to color energies.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  var EnergySkateParkColorScheme = {

    // Use color instances here to prevent parsing these values multiple times, luckily PhetColorScheme also
    // uses Color instances
    kineticEnergy: PhetColorScheme.KINETIC_ENERGY,
    potentialEnergy: PhetColorScheme.GRAVITATIONAL_POTENTIAL_ENERGY,
    thermalEnergy: PhetColorScheme.HEAT_THERMAL_ENERGY,
    totalEnergy: PhetColorScheme.TOTAL_ENERGY,

    // fill of circles that show the skater path
    pathFill: new Color( 220, 175, 250 ),
    pathStroke: new Color( 'black' ),
    haloFill: new Color( 225, 231, 86, 0.75 ),

    // color for the reference line arrow
    referenceArrowFill: new Color( 254, 240, 53 ),

    panelFill: new Color( '#F0F0F0' ),

    // surrounds text for better visibility
    transparentPanelFill: new Color( 255, 255, 255, 0.5 )
  };

  energySkatePark.register( 'EnergySkateParkColorScheme', EnergySkateParkColorScheme );

  return EnergySkateParkColorScheme;
} );