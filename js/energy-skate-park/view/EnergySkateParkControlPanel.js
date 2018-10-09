// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  var FrictionControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/FrictionControl' );
  var MassControlPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/MassControlPanel' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {EnergySkateParkModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkControlPanel( model, tandem ) {


    // controls that change visibility of items in the screen
    var visibilityControls = new EnergySkateParkVisibilityControls( model, tandem );

    // slider that changes the mass, wrapped in a panel
    var massControlPanel = new MassControlPanel( model.skater.massProperty, tandem.createTandem( 'massControlPanel' ) );

    // For 1st screen, show MassControlPanel
    // For 2nd and 3rd screen, show Friction Slider and Mass Slider, see #147
    var children = [ visibilityControls, massControlPanel ];
    if ( model.frictionAllowed ) {
      children.push( new FrictionControl( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ) );
    }
    var content = new VBox( { resize: false, spacing: 6, children: children } );

    this.contentWidth = content.width;
    Panel.call( this, content, {
      xMargin: 10,
      yMargin: 5,
      fill: '#F0F0F0',
      stroke: null,
      resize: false,
      tandem: tandem
    } );
  }

  energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );

  return inherit( Panel, EnergySkateParkControlPanel );
} );