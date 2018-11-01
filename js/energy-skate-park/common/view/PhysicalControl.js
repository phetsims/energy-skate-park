// Copyright 2018, University of Colorado Boulder

/**
 * Controls a physical value of the model. Slider with a label and tick marks
 * labelled to describe the range.
 *
 * @author Same Reid
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const HSlider = require( 'SUN/HSlider' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const controlsValueLotsString = require( 'string!ENERGY_SKATE_PARK/controls.value.lots' );
  const controlsValueNoneString = require( 'string!ENERGY_SKATE_PARK/controls.value.none' );

  class PhysicalControl extends VBox {

    /**
     * @param  {Object} options
     */
    constructor( property, valueRange, titleString, tandem, options ) {

      options = _.extend( {
        maxLabel: controlsValueLotsString,
        minLabel: controlsValueNoneString
      }, options );

      const tickFont = new PhetFont( 10 );
      const textOptions = {
        font: tickFont,
        maxWidth: 54 // selected by choosing the length of widest English string in ?stringTest=double
      };
      const slider = new HSlider( property, valueRange, _.extend( { tandem: tandem }, Constants.SLIDER_OPTIONS ) );
      slider.addMajorTick( valueRange.min, new Text( options.minLabel, _.extend( { tandem: tandem.createTandem( 'minLabel' ) }, textOptions ) ) );
      slider.addMajorTick( valueRange.max, new Text( options.maxLabel, _.extend( { tandem: tandem.createTandem( 'maxLabel' ) }, textOptions ) ) );

      // Space the label above the tick labels so that it won't overlap for i18n
      const text = new Text( titleString, {
        tandem: tandem.createTandem( 'titleString' ),
        font: new PhetFont( { weight: 'bold', size: 12 } ),
        maxWidth: 100 // selected by choosing the length of widest English string in ?stringTest=double
      } );

      super( {
        children: [ text, slider ],
        resize: false,
        spacing: -5
      } );
    }
  }

  return energySkatePark.register( 'PhysicalControl', PhysicalControl );
} );
