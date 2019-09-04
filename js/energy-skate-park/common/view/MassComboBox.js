// Copyright 2018-2019, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const PhysicalComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalComboBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );

  class MassComboBox extends PhysicalComboBox {

    /**
     * @param  {NumberProperty} massProperty
     * @param {Emitter} resetEmitter
     * @param  {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param {Tandem} tandem
     * @param  {Object} [options]
     */
    constructor( massProperty, resetEmitter, listParent, tandem, options ) {

      // TODO: These labels are temporary and will be replaced by images
      const labelValueList = [
        { label: 'Skater', value: SkaterMasses.PHET_SKATER_MASS },
        { label: 'Star Skater', value: SkaterMasses.STAR_SKATER_MASS },
        { label: 'Bulldog', value: SkaterMasses.BULLDOG_MASS },
        { label: 'Bug', value: SkaterMasses.BUG_MASS },
        { label: 'Ball', value: SkaterMasses.BALL_MASS }
      ];

      super( massProperty, labelValueList, resetEmitter, listParent, tandem, options );
    }
  }

  return energySkatePark.register( 'MassComboBox', MassComboBox );
} );
