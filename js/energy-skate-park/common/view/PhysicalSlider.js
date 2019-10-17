// Copyright 2018-2019, University of Colorado Boulder

/**
 * Controls a physical value of the model. This is just a slider with a label and labeled tick marks. It extends
 * NumberControl to leverage the layout of the label and slider so that it conveniently matches the layout
 * with other NumberControls used in this sim.
 *
 * @author Same Reid
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const merge = require( 'PHET_CORE/merge' );
  const PhysicalNumberControl = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalNumberControl' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const controlsValueLotsString = require( 'string!ENERGY_SKATE_PARK/controls.value.lots' );
  const controlsValueNoneString = require( 'string!ENERGY_SKATE_PARK/controls.value.none' );

  class PhysicalSlider extends PhysicalNumberControl {

    /**
     * @param {string} titleString
     * @param {NumberProperty} property
     * @param {Range} valueRange
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( titleString, property, valueRange, tandem, options ) {

      options = merge( {
        // {string} - labels for the min and max values of this control
        maxLabel: controlsValueLotsString,
        minLabel: controlsValueNoneString,

        // {null|*} - passed to the Slider of this NumberControl
        sliderOptions: null
      }, options );

      super( titleString, property, valueRange, tandem, {

        // don't include any arrow buttons or the NumberDislay for this control
        sliderOnly: true,

        sliderOptions: merge( {}, Constants.SLIDER_OPTIONS, {
          majorTicks: [
            createTickEntry( valueRange.min, options.minLabel, tandem, 'minLabel' ),
            createTickEntry( valueRange.max, options.maxLabel, tandem, 'maxLabel' )
          ] }
        )
      } );
    }
  }

  /**
   * Create a tick entry for the slider to be added with addMajorTick.
   * @param   {number} value - value on the slider to add the tick
   * @param   {string} label - label for the tick
   * @param   {Tandem} tandem
   * @param   {string} tandemName
   * @returns {Object} - conforms to { value: {number}, label: Node }, required by NumberControl options
   */
  const createTickEntry = ( value, label, tandem, tandemName ) => {
    return {
      value: value,
      label: new Text( label, merge( {
        tandem: tandem.createTandem( tandemName )
      }, Constants.CONTROL_TICK_LABEL_OPTIONS ) )
    };
  };

  return energySkatePark.register( 'PhysicalSlider', PhysicalSlider );
} );
