// Copyright 2018, University of Colorado Boulder

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
      assert && assert( options.tandem === undefined, 'PhysicalNumberControl shouldnt set tandem in options' ) ;
      assert && assert( options.majorTicks === undefined, 'PhysicalNumberControl sets majorTicks' );
      assert && assert( options.arrowButtonOptions === undefined, 'PhysicalNumberControl sets arrowButtonOptions' );
      assert && assert( options.titleFont === undefined, 'PhysicalNumberControl sets title font' );

      // slider options are passed directly to the Slider in NumberControl
      options = _.extend( {
        decimalPlaces: 0
      }, Constants.SLIDER_OPTIONS, options );

      // look and feel for all PhysicalNumberControls
      _.extend( options, {
        arrowButtonOptions: {
          scale: 0.5
        },
        layoutFunction: NumberControl.createLayoutFunction4(),
        titleFont: Constants.CONTROL_TITLE_FONT,
        tandem: tandem,
        majorTicks: [
          { value: valueRange.min, label: new Text( Util.toFixed( valueRange.min, options.decimalPlaces ), Constants.CONTROL_TICK_LABEL_OPTIONS ) },
          { value: valueRange.max, label: new Text( Util.toFixed( valueRange.max, options.decimalPlaces ), Constants.CONTROL_TICK_LABEL_OPTIONS ) }
        ]
      } );

      super( titleString, property, valueRange, options );
    }
  }

  return energySkatePark.register( 'PhysicalNumberControl', PhysicalNumberControl );
} );
