// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  var PhysicalControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalControl' );
  var Panel = require( 'SUN/Panel' );
  var Range = require( 'DOT/Range' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var controlsMassString = require( 'string!ENERGY_SKATE_PARK/controls.mass' );
  var smallString = require( 'string!ENERGY_SKATE_PARK/small' );
  var controlsFrictionTitleString = require( 'string!ENERGY_SKATE_PARK/controls.friction.title' );
  var controlsGravityString = require( 'string!ENERGY_SKATE_PARK/controls.gravity' );

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkControlPanel( model, tandem, options ) {

    options = _.extend( {
      includeMass: true, // include a slider that changes mass?
      includeGravity: true, // include a slider that changes gravity?
      includeFriction: false // include a slider that changes friction?
    }, options );

    // controls that change visibility of items in the screen
    var visibilityControls = new EnergySkateParkVisibilityControls( model, tandem );
    var children = [ visibilityControls ];

    // slider that changes the mass, wrapped in a panel
    if ( options.includeMass ) {
      children.push( new PhysicalControl(
        model.skater.massProperty,
        new Range( Constants.MIN_MASS, Constants.MAX_MASS ),
        controlsMassString,
        tandem.createTandem( 'massPhysicalControl' ), {
          minLabel: smallString
        }
      ) );
    }

    if ( options.includeFriction ) {
      assert && assert( model.frictionProperty.value > 0, 'if including friction, it must have non-zero initial value' );

      children.push( new PhysicalControl(
        model.frictionProperty,
        new Range( 0, model.frictionProperty.value * 2 ),
        controlsFrictionTitleString,
        tandem.createTandem( 'frictionPhysicalControl' )
      ) );

      // children.push( new FrictionControl( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ) );
    }

    if ( options.includeGravity ) {
      children.push( new PhysicalControl(
        model.skater.gravityMagnitudeProperty,
        new Range( Math.abs( Constants.MIN_GRAVITY ), Math.abs( Constants.MAX_GRAVITY ) ),
        controlsGravityString,
        tandem.createTandem( 'gravityPhysicalControl' )
      ) );
    }

    var content = new VBox( { resize: false, spacing: 6, children: children } );

    this.contentWidth = content.width;
    Panel.call( this, content, {
      xMargin: 10,
      yMargin: 5,
      fill: EnergySkateParkColorScheme.panelFill,
      stroke: null,
      resize: false,
      tandem: tandem
    } );
  }

  energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );

  return inherit( Panel, EnergySkateParkControlPanel );
} );