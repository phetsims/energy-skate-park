// Copyright 2018, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BackgroundNode' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var HSlider = require( 'SUN/HSlider' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/view/MassComboBox' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // images
  var mockupImage = require( 'image!ENERGY_SKATE_PARK/mockup.png' );

  /**
   * @constructor
   * @param {EnergySkateParkIntroModel} model
   */
  function IntroScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem.createTandem( 'introScreenView' ) );

    // @private (for layout) {ComboBox} 
    this.massComboBox = new MassComboBox( model.skater.massProperty, this, {
      tandem: tandem.createTandem( 'massComboBox' )
    } );

    // add the combo box to the back layer so it is behind the skater
    this.addToBottomLayer( this.massComboBox );
    this.massComboBox.bottom = this.layoutBounds.height - BackgroundNode.earthHeight - 5;

    // Show the mock-up and a slider to change its transparency
    // TODO: temporary, just to do some pixel polishing
    var mockupOpacityProperty = new Property( 0 );
    var image = new Image( mockupImage, {
      pickable: false,
      scale: this.layoutBounds.width / mockupImage.width
    } );
    mockupOpacityProperty.linkAttribute( image, 'opacity' );
    this.addChild( image );
    this.addChild( new HSlider( mockupOpacityProperty, new Range( 0, 1 ), {
      top: 10,
      left: 500,
      tandem: tandem.createTandem( 'mockupOpacitySlider' )
    } ) );
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
