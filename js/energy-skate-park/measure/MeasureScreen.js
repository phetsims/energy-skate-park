// Copyright 2018, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MeasureModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/model/MeasureModel' );
  var MeasureScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/MeasureScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // images
  // TODO: navigation bar/home screen images
  

  // strings
  var screenMeasureString = require( 'string!ENERGY_SKATE_PARK/screen.measure' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function MeasureScreen( tandem ) {

    var options = _.extend( {
      name: screenMeasureString,
      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new MeasureModel( tandem.createTandem( 'measureModel' ) ); },
      function( model ) { return new MeasureScreenView( model, tandem.createTandem( 'measureScreenView' ) ); },
      options
    );
  }

  energySkatePark.register( 'MeasureScreen', MeasureScreen );

  return inherit( Screen, MeasureScreen );
} );