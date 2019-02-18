// Copyright 2018-2019, University of Colorado Boulder

/**
 * Energ
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
  var SkaterSamplesNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterSamplesNode' );
  var SkaterPathSensorNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterPathSensorNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   */
  function MeasureScreenView( model, tandem ) {

    var measureControls = [
      new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) ),
      new GravityNumberControl( model.skater.gravityMagnitudeProperty, tandem.createTandem( 'gravitySlider' ), {
        numberDisplayOptions: {
          decimalPlaces: 1
        }
      } ),
      new MassNumberControl( model.skater.massProperty, model.skater.massRange, tandem.createTandem( 'massNumberControl' ) )
    ];
    EnergySkateParkScreenView.call( this, model, measureControls, tandem );

    // @private - for layout
    this.pathSensor = new SkaterPathSensorNode( model.skaterSamples, model.sensorPositionProperty, this.modelViewTransform, {
      tandem: tandem.createTandem( 'pathSensor' )
    } );
    this.pathSensor.top = this.modelViewTransform.modelToViewDeltaY( -2 );

    this.addToTopLayer( new SkaterSamplesNode( model, this.modelViewTransform ) );
    this.addToTopLayer( this.pathSensor );
  }

  energySkatePark.register( 'MeasureScreenView', MeasureScreenView );

  return inherit( EnergySkateParkScreenView, MeasureScreenView, {

    layout: function( width, height ) {
      EnergySkateParkScreenView.prototype.layout.call( this, width, height );

      // in the measure screen the legend is in the top left of the screen
      this.pieChartLegend.mutate( { top: this.controlPanel.top, left: this.availableViewBounds.minX + 5 } );

      this.pathSensor.leftTop = this.pieChartLegend.leftBottom.plusXY( 0, 10 );
    }
  } );
} );
