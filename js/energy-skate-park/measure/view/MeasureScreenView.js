// Copyright 2018-2019, University of Colorado Boulder

/**
 * The ScreenView for the "Measure" Screen.
 * 
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  const FrictionSlider = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/FrictionSlider' );
  const GravityNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityNumberControl' );
  const GravityComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/GravityComboBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const MassNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/MassNumberControl' );
  const SkaterSamplesNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterSamplesNode' );
  const SkaterPathSensorNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterPathSensorNode' );

  /**
   * @constructor
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   */
  class MeasureScreenView extends EnergySkateParkScreenView {

    /**
     * @param  {MeasureModel} model
     * @param  {Tandem} tandem
     */
    constructor( model, tandem ) {

      // parent layer for ComboBox, would use this but it is not available
      // until after super
      const comboBoxParent = new Node();

      const measureControls = [
        new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
        new MassNumberControl( model.skater.massProperty, model.skater.massRange, tandem.createTandem( 'massNumberControl' ) ),
        new GravityNumberControl( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ), {
          decimalPlaces: 1
        } ),
        new GravityComboBox( model.skater.gravityMagnitudeProperty, comboBoxParent, tandem.createTandem( 'gravityComboBox' ) )
      ];

      super( model, measureControls, tandem, {
        showBarGraph: false,
        showSkaterPath: true,
        visibilityControlsOptions: {
          showSkaterPathCheckbox: true,
          showReferenceHeightCheckbox: true,
          showStickToTrackCheckbox: true,
          showBarGraphCheckbox: false
        }
      } );

      this.addChild( comboBoxParent );

      // @private - for layout
      this.pathSensor = new SkaterPathSensorNode( model.skaterSamples, model.sensorPositionProperty, this.modelViewTransform, this.controlPanel, {
        tandem: tandem.createTandem( 'pathSensor' )
      } );
      this.pathSensor.top = this.modelViewTransform.modelToViewDeltaY( -2 );

      this.addToTopLayer( new SkaterSamplesNode( model, this.modelViewTransform ) );
      this.addToTopLayer( this.pathSensor );
    }

    /**
     * Returns true if the no bounds intersects with the EnergySkateParkControlPanel. Useful for changing layout
     * so that things don't occlude the control panel.
     * @public
     * 
     * @param {Node} node
     * @returns {boolean}
     */
    intersectsControlPanel( node ) {
      return this.boundsOf( node ).intersectsBounds( this.controlPanel.bounds );
    }

    layout( width, height ) {
      EnergySkateParkScreenView.prototype.layout.call( this, width, height );

      // in the measure screen the legend is in the top left of the screen
      this.pieChartLegend.mutate( { top: this.controlPanel.top, left: this.availableViewBounds.minX + 5 } );

      this.pathSensor.leftTop = this.pieChartLegend.leftBottom.plusXY( 0, 10 );

      // control panel is taller for this screen so move the measuring tape  to a different place
      if ( this.showMeasuringTape ) {
        this.measuringTapePanel.top = this.controlPanel.top;
        this.measuringTapePanel.right = this.controlPanel.left - 5;
      }
    }
  }

  return energySkatePark.register( 'MeasureScreenView', MeasureScreenView );

} );
