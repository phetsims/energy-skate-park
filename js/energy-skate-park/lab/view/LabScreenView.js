// Copyright 2018-2019, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  var GravityNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityNumberControl' );
  var MassNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassNumberControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const GravityComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityComboBox' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );

  // constants
  function LabScreenView( model, tandem ) {

    // parent for combo boxes - would use the ScreenView but `this` isn't available until after super call
    const comboBoxParent = new Node();

    var labControls = [
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
      new MassNumberControl( model.skater.massProperty, model.skater.massRange, tandem.createTandem( 'massNumberControl' ) ),
      new MassComboBox( model.skater.massProperty, comboBoxParent, tandem.createTandem( 'massComboBox' ) ),
      new GravityNumberControl( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) ),
      new GravityComboBox( model.skater.gravityMagnitudeProperty, comboBoxParent, tandem.createTandem( 'gravityComboBox' ) )
    ];
    EnergySkateParkScreenView.call( this, model, labControls, tandem.createTandem( 'graphsScreenView' ), {
      showTrackButtons: false,
      visibilityControlsOptions: {
        showPieChartCheckbox: true,
        showGridCheckbox: false,
        showBarGraphCheckbox: false,
        showSpeedCheckbox: true,
        showStickToTrackCheckbox: true
      }
    } );

    this.addChild( comboBoxParent );
  }

  energySkatePark.register( 'LabScreenView', LabScreenView );

  return inherit( EnergySkateParkScreenView, LabScreenView, {} );
} );
