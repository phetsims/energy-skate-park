// Copyright 2018-2019, University of Colorado Boulder

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
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const SkaterMasses = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/SkaterMasses' );
  const NumberIO = require( 'TANDEM/types/NumberIO' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Text = require( 'SCENERY/nodes/Text' );
  var NullableIO = require( 'TANDEM/types/NullableIO' );


  class MassComboBox extends ComboBox {

    /**
     * @param  {NumberProperty} massProperty
     * @param  {[type]} listParent - parent of the list, to make sure the list is on top other things in the vie
     * @param  {Object} [options]
     */
    constructor( massProperty, listParent, tandem, options ) {

      // {ComboBoxItem[]}
      var items = [];

      var possibleMasses = [
        SkaterMasses.PHET_SKATER_MASS,
        SkaterMasses.STAR_SKATER_MASS,
        SkaterMasses.BULLDOG_MASS,
        SkaterMasses.BUG_MASS,
        SkaterMasses.BALL_MASS
      ];
      for ( var i = 0; i < possibleMasses.length; i++ ) {
        items.push( new ComboBoxItem(
          // TODO: This text will be replaced with an image, see https://github.com/phetsims/tasks/issues/962
          new Text( possibleMasses[ i ] + ' kg' ),
          possibleMasses[ i ]
        ) );
      }

      // add the 'custom' entry for a value outside of this list
      items.push( new ComboBoxItem( new Text( 'Custom' ), null ) );

      // adapter Property for the ComboBox, because massProperty can also be controlled in
      // other ways and may not always be one of the above options - value is null if not in list
      const adapterProperty =  new Property( massProperty.value, {
        tandem: tandem.createTandem( 'adapterProperty' ),
        phetioType: PropertyIO( NullableIO( NumberIO ) )
      } );
      adapterProperty.link( value => {
        if ( value ) { massProperty.set( value ); }
      } );

      massProperty.link( value => {
        adapterProperty.value = _.includes( possibleMasses, value ) ? value : null;
      } );

      super( items, adapterProperty, listParent, _.extend( {
        xMargin: 10,
        yMargin: 6,
        listPosition: 'above',
        tandem: tandem.createTandem( 'massComboBox' )
      }, options ) );
    }
  }

  return energySkatePark.register( 'MassComboBox', MassComboBox );
} );
