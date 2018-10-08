// Copyright 2018, University of Colorado Boulder

/**
 * The "Lab" screen.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LabModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/model/LabModel' );
  var LabScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/view/LabScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images
  

  // strings
  var screenLabString = require( 'string!ENERGY_SKATE_PARK/screen.lab' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function LabScreen( tandem ) {

    var options = _.extend( {
      name: screenLabString,
      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new LabModel( tandem.createTandem( 'labModel' ) ); },
      function( model ) { return new LabScreenView( model, tandem.createTandem( 'labScreenView' ) ); },
      options
    );
  }

  energySkatePark.register( 'LabScreen', LabScreen );

  return inherit( Screen, LabScreen );
} );