// Copyright 2018-2020, University of Colorado Boulder

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
  const Vector2 = require( 'DOT/Vector2' );

  class LabModel extends EnergySkateParkPlaygroundModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      super( tandem, {
        skaterOptions: {
          defaultMass: SkaterMasses.PHET_SKATER_MASS,
          massRange: new Range( SkaterMasses.BUG_MASS, SkaterMasses.PHET_SKATER_MASS )
        },

        // Draggable tracks in the lab screen start at a different position in the "Lab" screen
        initialTracksOffsetVector: new Vector2( -2, -0.75 )
      } );
    }
  }

  return energySkatePark.register( 'LabModel', LabModel );
} );
