// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for the Intro screen in Energy Skate Park.
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const Range = require( 'DOT/Range' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkFullTrackSetModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkFullTrackSetModel' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );

  class IntroModel extends EnergySkateParkFullTrackSetModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {
      super( tandem, {
        skaterOptions: {
          defaultMass: SkaterMasses.PHET_SKATER_MASS,
          massRange: new Range( SkaterMasses.BUG_MASS, SkaterMasses.PHET_SKATER_MASS )
        }
      } );
    }
  }

  return energySkatePark.register( 'IntroModel', IntroModel );
} );
