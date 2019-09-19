// Copyright 2018-2019, University of Colorado Boulder

/**
 * View where you can create custom tracks which are draggable, configurable,
 * splittable, and attachable.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkPlaygroundScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkPlaygroundScreenView' );
  const FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  const VisibilityControlsPanel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/VisibilityControlsPanel' );
  const GravityNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityNumberControl' );
  const MassNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassNumberControl' );
  // const EnergyBarGraphAccordionBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/lab/view/EnergyBarGraphAccordionBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const GravityComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityComboBox' );
  const MassComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassComboBox' );

  // constants
  function LabScreenView( model, tandem ) {

    // parent for combo boxes - would use the ScreenView but `this` isn't available until after super call
    const comboBoxParent = new Node();

    const labControls = [
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
      new MassNumberControl( model.skater.massProperty, model.skater.massRange, tandem.createTandem( 'massNumberControl' ) ),
      new MassComboBox( model.skater.massProperty, model.resetEmitter, comboBoxParent, tandem.createTandem( 'massComboBox' ) ),
      new GravityNumberControl( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ) ),
      new GravityComboBox( model.skater.gravityMagnitudeProperty, model.resetEmitter, comboBoxParent, tandem.createTandem( 'gravityComboBox' ) )
    ];
    EnergySkateParkPlaygroundScreenView.call( this, model, labControls, tandem.createTandem( 'graphsScreenView' ), {
      showTrackButtons: false,
      visibilityControlsOptions: {
        showPieChartCheckbox: true,
        showGridCheckbox: false,
        showSpeedCheckbox: true,
        showStickToTrackCheckbox: true
      }
    } );

    this.addChild( comboBoxParent );

    // this.energyBarGraphAccordionBox = new EnergyBarGraphAccordionBox( model, tandem.createTandem( 'energyBarGraphAccordionBox' ) );
    // this.energyBarGraphAccordionBox.top = 5;
    // this.bottomLayer.addChild( this.energyBarGraphAccordionBox );


    // grid and reference height visibility are controlled from a separate area
    this.visibilityControlsPanel = new VisibilityControlsPanel( model, tandem.createTandem( 'visibilityControlsPanel' ) );
    this.addChild( this.visibilityControlsPanel );

    // layout custom to the Lab screen
    this.clearButton.rightCenter = this.trackCreationPanel.leftCenter.minusXY( 10, 0 );

    // The eraser and trackCreationPanel are in one group on the left side of the screen view and the playback
    // controls are in another group on the right side - the centers of each group should be symmetric about
    // horizontal center of screen. We assume that the left group is already in the correct location (because track pan
    // is positioned by the model) so we need to position the right group (playback controls)
    const leftGroupBounds = this.clearButton.bounds.union( this.trackCreationPanel.bounds );
    const leftGroupCenter = leftGroupBounds.center;
    const distanceToScreenCenter = this.layoutBounds.center.x - leftGroupCenter.x;

    const spacing = 30;
    this.playControls.centerX = this.layoutBounds.centerX + ( distanceToScreenCenter - this.playControls.width / 2 - spacing / 2 );
    this.speedControl.centerX = this.layoutBounds.centerX + ( distanceToScreenCenter + this.speedControl.width / 2 + spacing / 2 );

    this.visibilityControlsPanel.centerY = this.clearButton.centerY;

  }

  energySkatePark.register( 'LabScreenView', LabScreenView );

  return inherit( EnergySkateParkPlaygroundScreenView, LabScreenView, {

    layout: function( width, height ) {
      EnergySkateParkPlaygroundScreenView.prototype.layout.call( this, width, height );

      this.visibilityControlsPanel.left = this.fixedLeft;

      // the pie chart legend is just to the right of the 5 meter mark, which is where grid labels are
      this.pieChartLegend.left = this.modelViewTransform.modelToViewX( -5 );
    }
  } );
} );
