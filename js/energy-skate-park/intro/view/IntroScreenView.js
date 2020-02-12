// Copyright 2018-2020, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/BackgroundNode' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkTrackSetScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkTrackSetScreenView' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );

  class IntroScreenView extends EnergySkateParkTrackSetScreenView {

    /**
     * @param {EnergySkateParkIntroModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {
      super( model, tandem.createTandem( 'introScreenView' ), {
        controlPanelOptions: {
          showMassControls: false,
          gravityControlsOptions: {
            includeGravityNumberControl: false,
            includeGravitySlider: true
          }
        }
      } );

      // @private (for layout) {ComboBox}
      this.massComboBox = new MassComboBox( model.skater.massProperty, model.resetEmitter, this, tandem, {
        listPosition: 'above',

        // this combo box is the only way to change mass on the Intro screen
        supportCustom: false
      } );

      // add the combo box to the back layer so it is behind the skater
      this.addToBottomLayer( this.massComboBox );
      this.massComboBox.bottom = this.layoutBounds.height - BackgroundNode.earthHeight - 5;
    }

    /**
     * Positions the mass combo box in the correct location.
     * @override
     */
    floatInterface() {
      super.floatInterface();
      this.massComboBox.right = this.controlPanel.right;
    }
  }

  return energySkatePark.register( 'IntroScreenView', IntroScreenView );
} );
