// Copyright 2018-2019, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkPlaygroundModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkPlaygroundModel' );
  const Range = require( 'DOT/Range' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const inherit = require( 'PHET_CORE/inherit' );

  // constants
  function LabModel( tandem ) {

    // Playground model, with friction
    EnergySkateParkPlaygroundModel.call( this, true, tandem, {
      defaultMass: SkaterMasses.PHET_SKATER_MASS,
      massRange: new Range( SkaterMasses.BUG_MASS, SkaterMasses.PHET_SKATER_MASS )
    } );
  }

  energySkatePark.register( 'LabModel', LabModel );

  return inherit( EnergySkateParkPlaygroundModel, LabModel, {} );
} );
