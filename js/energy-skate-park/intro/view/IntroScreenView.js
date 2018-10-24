// Copyright 2017, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BackgroundNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/view/MassComboBox' );

  /**
   * @constructor
   * @param {EnergySkateParkIntroModel} model
   */
  function IntroScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem.createTandem( 'introScreenView' ) );

    // @private {ComboBox} - OK that this is on top 
    this.massComboBox = new MassComboBox( model.skater.massProperty, this );
    this.addChild( this.massComboBox );
    this.massComboBox.bottom = this.layoutBounds.height - BackgroundNode.earthHeight - 5;
  }

  energySkatePark.register( 'IntroScreenView', IntroScreenView );

  return inherit( EnergySkateParkScreenView, IntroScreenView, {

    /**
     * Align the mass combo box with the right control panel (defined in super type).
     * @override
     *
     * @param {number} width - desired width of view, prior to scaling
     * @param {number} height - desired height of view, prior to scaling
     */
    layout: function( width, height ) {
      EnergySkateParkScreenView.prototype.layout.call( this, width, height );

      this.massComboBox.right = this.controlPanel.right;
    }
  } );
} );
