// Copyright 2013-2019, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  // const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const PhysicalSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalSlider' );
  const PhysicalNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalNumberControl' );
  // const Range = require( 'DOT/Range' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const EnergySkateParkVisibilityControls = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkVisibilityControls' );
  const HSeparator = require( 'SUN/HSeparator' );
  const Panel = require( 'SUN/Panel' );
  const SceneSelectionRadioButtonGroup = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/SceneSelectionRadioButtonGroup' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const GravityComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityComboBox' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );

  // constants
  const VALID_CONTROLS = [ PhysicalSlider, PhysicalNumberControl, GravityComboBox, MassComboBox ];

  class EnergySkateParkControlPanel extends Panel {

    /**
     * @param {EnergySkateParkModel} model
     * @param {EnergySkateParkScreenView} screenView
     * @param {Array.<PhysicalNumberControl|PhysicalSlider>} controls - list of controls to follow visibility controls
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( model, screenView, controls, tandem, visibilityControlsOptions, options ) {
      assert && assert( controls.length > 0, 'control panel must include additional physical controls' );

      // controls that change visibility of items in the screen
      const visibilityControls = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'visibilityControls' ), visibilityControlsOptions );
      const children = [ visibilityControls ];

      if ( screenView.showTrackButtons ) {
        children.push( new SceneSelectionRadioButtonGroup( model, screenView, tandem.createTandem( 'sceneSelectionRadioButtonGroup' ) ) );
      }

      controls.forEach( control => {
        if ( assert ) {
          let validType = false;
          _.forEach( VALID_CONTROLS, controlType => {
            if ( control instanceof controlType ) {
              validType = true;
            }
          } );
          assert( validType, 'control must be one of VALID_CONTROLS' );
        }
        children.push( control );
      } );

      const separatorWidth = _.maxBy( children, child => { child.width; } ).width;
      children.splice( children.indexOf( controls[ 0 ] ), 0, new HSeparator( separatorWidth ) );
      if ( screenView.showTrackButtons ) {
        children.splice( children.indexOf( visibilityControls ) + 1, 0, new HSeparator( separatorWidth ) );
      }

      const content = new VBox( { resize: false, spacing: 8, children: children } );

      super( content, {
        xMargin: 5,
        yMargin: 5,
        fill: EnergySkateParkColorScheme.panelFill,
        stroke: null,
        resize: false,
        tandem: tandem
      } );
    }
  }

  return energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );
} );