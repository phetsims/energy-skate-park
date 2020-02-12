// Copyright 2018-2019, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park. Includes a title and the
 * ComboBox.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const PhysicalComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/PhysicalComboBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const LabelledComboBox = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/LabelledComboBox' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );

  // strings
  const controlsSkaterString = require( 'string!ENERGY_SKATE_PARK/controls.skater' );
  const controlsSkater1MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater1Mass' );
  const controlsSkater2MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater2Mass' );
  const controlsSkater3MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater3Mass' );
  const controlsSkater4MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater4Mass' );
  const controlsSkater5MassString = require( 'string!ENERGY_SKATE_PARK/controls.skater5Mass' );
  const controlsDogMassString = require( 'string!ENERGY_SKATE_PARK/controls.dogMass' );

  class MassComboBox extends LabelledComboBox {

    /**
     * @param {NumberProperty} massProperty
     * @param {Emitter} resetEmitter - broadcasts when the EnergySkateParkModel has been reset
     * @param {Node} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param {Tandem} tandem
     */
    constructor( massProperty, resetEmitter, listParent, tandem ) {
      const labelValueList = [
        { label: controlsSkater1MassString, value: SkaterMasses.SKATER_1_MASS },
        { label: controlsSkater2MassString, value: SkaterMasses.SKATER_2_MASS },
        { label: controlsSkater3MassString, value: SkaterMasses.SKATER_3_MASS },
        { label: controlsSkater4MassString, value: SkaterMasses.SKATER_4_MASS },
        { label: controlsSkater5MassString, value: SkaterMasses.SKATER_5_MASS },
        { label: controlsDogMassString, value: SkaterMasses.DOG_MASS }
      ];
      const comboBox = new PhysicalComboBox( massProperty, labelValueList, resetEmitter, listParent, tandem, {
        supportCustom: false
      } );

      super( comboBox, controlsSkaterString );
    }
  }

  return energySkatePark.register( 'MassComboBox', MassComboBox );
} );
