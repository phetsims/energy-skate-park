// Copyright 2018-2019, University of Colorado Boulder

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
  const FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  const GravitySlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravitySlider' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );

  class IntroScreenView extends EnergySkateParkTrackSetScreenView {

    /**
     * @param {EnergySkateParkIntroModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      const introControls = [
        new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
        new GravitySlider( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) )
      ];

      super( model, introControls, tandem.createTandem( 'introScreenView' ), {
        visibilityControlsOptions: {
          showReferenceHeightCheckbox: true
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
     * Align the mass combo box with the right control panel (defined in super type).
     * @override
     *
     * @param {number} width - desired width of view, prior to scaling
     * @param {number} height - desired height of view, prior to scaling
     */
    layout( width, height ) {
      super.layout( width, height );
      this.massComboBox.right = this.controlPanel.right;
    }

  }

  return energySkatePark.register( 'IntroScreenView', IntroScreenView );
} );
