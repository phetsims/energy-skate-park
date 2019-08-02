// Copyright 2019, University of Colorado Boulder

/**
 * A combo box that can be used to change the gravity in Energy Skate Park. The value can be one of the ComboBox items,
 * or it can be selected from a range of values with additional controls. When the value is not one of the predetermined
 * items, the ComboBox displays 'Custom'.
 */
define( require => {
  'use strict';

  // modules
  const ComboBox = require( 'SUN/ComboBox' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const Property = require( 'AXON/Property' );
  var NullableIO = require( 'TANDEM/types/NullableIO' );
  const Text = require( 'SCENERY/nodes/Text' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const NumberIO = require( 'TANDEM/types/NumberIO' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // constants
  const itemOptions = { font: new PhetFont( 11 ) };

  class GravityComboBox extends ComboBox {

    /**
     * @param {NumberProperty} gravityProperty
     * @param {Node} listParent - node which the ComboBoxListBox will be added
     * @param {object} options
     */
    constructor( gravityProperty, listParent, tandem, options ) {

      options = _.extend( {
        xMargin: 10,
        yMargin: 6,
        listPosition: 'above',
        tandem: tandem
      }, options );

      const items = [
        new ComboBoxItem( new Text( 'Moon', itemOptions ), Constants.MOON_GRAVITY ),
        new ComboBoxItem( new Text( 'Earth', itemOptions ), Constants.EARTH_GRAVITY ),
        new ComboBoxItem( new Text( 'Jupiter', itemOptions ), Constants.JUPITER_GRAVITY ),
        new ComboBoxItem( new Text( 'Custom', itemOptions ), null )
      ];

      // adapter Property for the ComboBox, because gravityProperty can also be controlled in
      // other ways and may not always be one of the above options - value is null if not in list
      const adapterProperty =  new Property( gravityProperty.value, {
        tandem: tandem.createTandem( 'adapterProperty' ),
        phetioType: PropertyIO( NullableIO( NumberIO ) )
      } );
      adapterProperty.link( value => {
        if ( value ) { gravityProperty.set( value ); }
      } );

      const gravityOptions = [ Constants.MOON_GRAVITY, Constants.EARTH_GRAVITY, Constants.JUPITER_GRAVITY ];
      gravityProperty.link( value => {
        adapterProperty.value = _.includes( gravityOptions, value ) ? value : null;
      } );

      // add the option for 
      super( items, adapterProperty, listParent, options );
    }
  }

  return energySkatePark.register( 'GravityComboBox', GravityComboBox );

} );