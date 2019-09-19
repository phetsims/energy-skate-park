// Copyright 2018-2019, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkPlaygroundModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkPlaygroundModel' );
  const Range = require( 'DOT/Range' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  function LabModel( tandem ) {

    // Playground model, with friction
    EnergySkateParkPlaygroundModel.call( this, true, tandem, {
      skaterOptions: {
        defaultMass: SkaterMasses.PHET_SKATER_MASS,
        massRange: new Range( SkaterMasses.BUG_MASS, SkaterMasses.PHET_SKATER_MASS )
      },

      // Draggable tracks in the lab screen start at a different location in the "Lab" screen
      initialTracksOffsetVector: new Vector2( -2, -0.75 )
    } );
  }

  energySkatePark.register( 'LabModel', LabModel );

  return inherit( EnergySkateParkPlaygroundModel, LabModel, {} );
} );
