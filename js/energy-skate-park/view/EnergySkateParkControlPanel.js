// Copyright 2013-2018, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  // var Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  var PhysicalSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalSlider' );
  var PhysicalNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalNumberControl' );
  // var Range = require( 'DOT/Range' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SceneSelectionRadioButtonGroup = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/SceneSelectionRadioButtonGroup' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {EnergySkateParkModel} model
   * @param {EnergySkateParkScreenView} screenView
   * @param {Array.<PhysicalNumberControl|PhysicalSlider>} controls - list of controls to follow visibility controls
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergySkateParkControlPanel( model, screenView, controls, tandem, options ) {
    assert && assert( controls.length > 0, 'control panel must include additional physical controls' );

    options = _.extend( {
      includeTrackSelection: true, // include radio buttons that select default tracks?

      // passed to EnergySkateParkVisibilityControls, see that type for supported options
      visibilityControlsOptions: {}
    }, options );

    options.visibilityControlsOptions = _.extend( {}, options.visibilityControlsOptions );

    // controls that change visibility of items in the screen
    var visibilityControls = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'visibilityControls' ), options.visibilityControlsOptions );
    var children = [ visibilityControls ];

    if ( options.includeTrackSelection ) {
      children.push( new SceneSelectionRadioButtonGroup( model, screenView, tandem.createTandem( 'sceneSelectionRadioButtonGroup' ) ) );
    }

    controls.forEach( function( control ) {
      assert && assert( control instanceof PhysicalSlider || control instanceof PhysicalNumberControl, 'inconsistent class for control in panel' );
      children.push( control );
    } );

    var separatorWidth = _.maxBy( children, function( child ) { return child.width; } ).width;
    children.splice( children.indexOf( controls[ 0 ] ), 0, new HSeparator( separatorWidth ) );
    if ( options.includeTrackSelection ) {
      children.splice( children.indexOf( visibilityControls ) + 1, 0, new HSeparator( separatorWidth ) );
    }

    var content = new VBox( { resize: false, spacing: 10, children: children } );

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