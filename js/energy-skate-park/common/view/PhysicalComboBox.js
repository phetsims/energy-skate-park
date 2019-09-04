// Copyright 2019, University of Colorado Boulder

/**
 * A combo box that controls one of the physical Properties of Energy Skate Park. In addition to the options provided
 * by this combo box, the value can optionally be something else or controlled in other ways. When this happens,
 * the combo box displays 'Custom'.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const ComboBox = require( 'SUN/ComboBox' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Property = require( 'AXON/Property' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // constants
  const LABEL_OPTIONS = { font: new PhetFont( 11 ) };

  class PhysicalComboBox extends ComboBox {

    /**
     * @param {Property} physicalProperty
     * @param {Array.<Object>} labelValueList - entries like {label:{string}, value:{number}}
     * @param {Emitter} resetEmitter
     * @param {Node} listParent - parent for the ComboBox list
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( physicalProperty, labelValueList, resetEmitter, listParent, tandem, options ) {
      assert && assert( _.find( labelValueList, ( entry ) => { return entry.value === null; } ) === undefined, 'PhysicalComboBox adds "Custom" item' );

      options = _.extend( {
        xMargin: 10,
        yMargin: 6,

        // whether or not the physicalProperty can be set to something other than the entries defined in labelValueList
        supportCustom: true,

        tandem: tandem
      }, options );

      // {[].ComboBoxItem}
      const itemList = [];
      labelValueList.forEach( ( entry ) => {
        itemList.push( new ComboBoxItem( new Text( entry.label, LABEL_OPTIONS ), entry.value ) );
      } );

      if ( options.supportCustom ) {
        itemList.push( new ComboBoxItem( new Text( 'Custom', LABEL_OPTIONS ), null ) );
      }

      // adapter Property for the ComboBox because the physicalProperty can be set to values other than those defined
      // in labelValueList - value is null and 'Custom' in this case
      const adapterProperty = new Property( physicalProperty.value, {
        tandem: tandem.createTandem( 'adapterProperty' ),
        reentrant: true
      } );

      // if an entry in the combo box is selected to any entry other than "custom", update the actual Property
      adapterProperty.link( value => {
        if ( value ) { physicalProperty.set( value ); }
      } );

      // if the physical Property changes as a result of anything other than the adapter Property, set to null
      physicalProperty.link( ( physicalValue ) => {
        if ( physicalValue !== adapterProperty.value ) {
          adapterProperty.set( null );
        }
      } );

      // the only case where an external physicalProperty change should update
      resetEmitter.addListener( () => {
        adapterProperty.reset();
      } );

      super( itemList, adapterProperty, listParent, options );
    }
  }

  return energySkatePark.register( 'PhysicalComboBox', PhysicalComboBox );
} );
