// Copyright 2018, University of Colorado Boulder

// /**
//  * The sensor that reads information from the samples along the skater path. Has a meter readout, and a sensor
//  * that can be placed over samples to show information for that sample.
//  * 
//  * @author Jesse Greenberg
//  */
// define( require => {
//   'use strict';

//   // modules
//   const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
//   const inherit = require( 'PHET_CORE/inherit' );
//   const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
//   const Text = require( 'SCENERY/nodes/Text' );

//   // strings
//   var energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
//   var energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
//   var energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
//   var energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
//   var energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );

//   class SkaterPathSensorNode {


//     constructor( options ) {
//       options = _.extend( {}, options );
//       super( options );

//       // labels
//       var kineticLabel = new Text( energyKineticString );
//       var potentialLabel = new Text( energyPotentialString );
//       var thermalLabel = new Text( energyThermalString );
//       var totalLabel = new Text( energyTotalString );

//       // so the labels are all the same width
//       var labelAlignGroup = new AlignGroup();
//       var kineticLabelBox = labelAlignGroup.createBox( kineticLabel );
//       var potentialLabelBox = labelAlignGroup.createBox( potentialLabel );
//       var thermalLabelBox = labelAlignGroup.createBox( thermalLabel );
//       var totalLabelBox = labelAlignGroup.createBox( totalLabel );

//       // value readouts
//       var kineticReadout = new Text();
//       var potentialReadout = new Text();
//       var thermalReadout = new Text();
//       var totalReadout = new Text();

//       // the body is a rounded rectangle

//     }
//   }

//   return energySkatePark.register( 'SkaterPathSensorNode', SkaterPathSensorNode );
// } );
