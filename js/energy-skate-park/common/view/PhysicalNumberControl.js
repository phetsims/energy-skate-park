// Copyright 2019, University of Colorado Boulder

/**
 * A NumberControl that controls a physical value of the model in Energy Skate Park.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const NumberControl = require( 'SCENERY_PHET/NumberControl' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  class PhysicalNumberControl extends NumberControl {

    /**
     * @param  {string} titleString
     * @param  {NumberProperty} property
     * @param  {Range} valueRange
     * @param  {Tandem} tandem
     * @param  {Object} options
     */
    constructor( titleString, property, valueRange, tandem, options ) {
      options = options || {};
      assert && assert( options.layoutFunction === undefined, 'PhysicalNumberControl sets layoutFunction' );
      assert && assert( options.tandem === undefined, 'PhysicalNumberControl shouldnt set tandem in options' );
      assert && assert( options.majorTicks === undefined, 'PhysicalNumberControl sets majorTicks' );
      assert && assert( options.arrowButtonOptions === undefined, 'PhysicalNumberControl sets arrowButtonOptions' );
      assert && assert( options.titleFont === undefined, 'PhysicalNumberControl sets title font' );

      if ( options.sliderOptions ) {
        assert && assert( options.sliderOptions.majorTicks === undefined, 'PhysicalNumberControl sets majorTicks' );
      }

      if ( options.numberDisplayOptions ) {
        assert && assert( options.numberDisplayOptions.font === undefined, 'PhysicalNumberControl sets font' );
        assert && assert( options.numberDisplayOptions.xMargin === undefined, 'PhysicalNumberControl sets xMargin' );
        assert && assert( options.numberDisplayOptions.yMargin === undefined, 'PhysicalNumberControl sets yMargin' );
      }

      // slider options are passed directly to the Slider in NumberControl
      options = _.extend( {

        // decimal places for the ticks and (by default) the NumberControl's NumberDisplay
        decimalPlaces: 0,

        // {*|null} - passed to the Slider of NumberControl, extended below
        sliderOptions: null,

        // {*|null} - passed to the NumberDisplay of NumberControl, extended below
        numberDisplayOptions: null

      }, options );

      // into an extra object so we don't modify Constants.SLIDER_OPTIONS
      options.sliderOptions = _.extend( {}, Constants.SLIDER_OPTIONS, options.sliderOptions );

      options.numberDisplayOptions = _.extend( {
        decimalPlaces: options.decimalPlaces
      }, options.numberDisplayOptions );

      // look and feel for all PhysicalNumberControls (not set in normal options extend calls because they cannot be
      // changed with options!)
      _.extend( options, {
        arrowButtonOptions: {
          scale: 0.5
        },
        layoutFunction: NumberControl.createLayoutFunction4(),
        sliderOptions: _.extend( options.sliderOptions, {
          majorTicks: [
            {
              value: valueRange.min,
              label: new Text( Util.toFixed( valueRange.min, options.decimalPlaces ), Constants.CONTROL_TICK_LABEL_OPTIONS )
            },
            {
              value: valueRange.max,
              label: new Text( Util.toFixed( valueRange.max, options.decimalPlaces ), Constants.CONTROL_TICK_LABEL_OPTIONS )
            }
          ]
        } ),
        numberDisplayOptions: _.extend( options.numberDisplayOptions, {
          xMargin: 2,
          yMargin: 2,
          font: new PhetFont( 10 )
        } ),
        titleNodeOptions: {
          font: Constants.CONTROL_TITLE_FONT
        },

        // phet-io
        tandem: tandem
      } );

      super( titleString, property, valueRange, options );
    }
  }

  return energySkatePark.register( 'PhysicalNumberControl', PhysicalNumberControl );
} );
