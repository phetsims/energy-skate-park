// Copyright 2018, University of Colorado Boulder

/**
 * Energ
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkScreenView = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkScreenView' );
  var SkaterSamplesNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterSamplesNode' );
  var SkaterPathSensorNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/measure/view/SkaterPathSensorNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   * @param {EnergySkateParkTrackSetModel} model
   * @param {Tandem} tandem
   */
  function MeasureScreenView( model, tandem ) {
    EnergySkateParkScreenView.call( this, model, tandem, {
      includeSamplesCheckbox: true,
      includeBarGraphCheckbox: false
    } );

    // @private - for layout
    this.pathSensor = new SkaterPathSensorNode( model.skaterSamples, model.sensorPositionProperty, this.modelViewTransform );

    // TODO: Does it matter which layer?
    this.addToTopLayer( new SkaterSamplesNode( model, this.modelViewTransform ) );
    this.addToTopLayer( this.pathSensor );
  }

  energySkatePark.register( 'MeasureScreenView', MeasureScreenView );

  return inherit( EnergySkateParkScreenView, MeasureScreenView, {

    layout: function( width, height ) {
      EnergySkateParkScreenView.prototype.layout.call( this, width, height );

      this.pathSensor.left = this.availableViewBounds.left + 5;
      this.pathSensor.top = this.controlPanel.top;
    }
  } );
} );
