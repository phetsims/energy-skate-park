// Copyright 2018, University of Colorado Boulder

/**
 * A combo box that can be used to change the masses in Energy Skate Park.
 *
 * NOTE: This type is for initial exploration about the functionality of the mass range. The combo box for mass might
 * need to change entirely to support 2D layouts, see
 * https://github.com/phetsims/energy-skate-park/issues/32#event-1924335182
 *
 * NOTE: It is also very likely that there will be different types for each mass (in addition to Skater.js).
 * Instead of iterating over a basic array, we should get the masses from these types or somewhere else.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const ComboBox = require( 'SUN/ComboBox' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const IntroConstants = require( 'ENERGY_SKATE_PARK/energy-skate-park/intro/IntroConstants' );
  const Text = require( 'SCENERY/nodes/Text' );

  class MassComboBox extends ComboBox {

    /**
     * @param  {NumberProperty} massProperty
     * @param  {[type]} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param  {Object} [options]
     */
    constructor( massProperty, listParent, options ) {

      // array of items with the signature of ComboBox.createItem
      var items = [];

      var possibleMasses = [
        IntroConstants.PHET_SKATER_MASS,
        IntroConstants.STAR_SKATER_MASS,
        IntroConstants.BULLDOG_MASS,
        IntroConstants.BUG_MASS,
        IntroConstants.BALL_MASS
      ];
      for ( var i = 0; i < possibleMasses.length; i++ ) {
        items.push( ComboBox.createItem(
          // TODO: This text will be replaced with an image, see https://github.com/phetsims/tasks/issues/962
          new Text( possibleMasses[ i ] + ' kg' ),
          possibleMasses[ i ]
        ) );
      }

      super( items, massProperty, listParent, _.extend( {
        listPosition: 'above'
      }, options ) );
    }
  }

  return energySkatePark.register( 'MassComboBox', MassComboBox );
} );
