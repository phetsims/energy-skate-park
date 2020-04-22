// Copyright 2019-2020, University of Colorado Boulder

/**
 * A combo box that controls one of the physical Properties of Energy Skate Park. In addition to the options provided
 * by this combo box, the value can optionally be something else or controlled in other ways. When this happens,
 * the combo box displays 'Custom'.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import PropertyIO from '../../../../../axon/js/PropertyIO.js';
import merge from '../../../../../phet-core/js/merge.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../../sun/js/ComboBoxItem.js';
import NullableIO from '../../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import energySkatePark from '../../../energySkatePark.js';
import energySkateParkStrings from '../../../energySkateParkStrings.js';
import Constants from '../Constants.js';

// constants
const controlsGravityCustomString = energySkateParkStrings.physicalControls.custom;

class PhysicalComboBox extends ComboBox {

  /**
   * @param {Property} physicalProperty
   * @param {Array.<Object>} labelValueList - entries like {label:{string}, value:{number}}
   * @param {Emitter} resetEmitter
   * @param {Node} listParent - parent for the ComboBoxListBox
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( physicalProperty, labelValueList, resetEmitter, listParent, tandem, options ) {
    assert && assert( _.find( labelValueList, entry => entry.value === null ) === undefined, 'PhysicalComboBox adds "Custom" item' );

    options = merge( {

      // {boolean} whether or not the physicalProperty can be set to something other than the entries defined
      // in labelValueList
      supportCustom: true,

      tandem: tandem
    }, Constants.COMBO_BOX_OPTIONS, options );

    // {[].ComboBoxItem}
    const itemList = [];
    labelValueList.forEach( entry => {
      itemList.push( new ComboBoxItem( new Text( entry.label, Constants.COMBO_BOX_ITEM_OPTIONS ), entry.value ) );
    } );

    if ( options.supportCustom ) {
      itemList.push( new ComboBoxItem( new Text( controlsGravityCustomString, Constants.COMBO_BOX_ITEM_OPTIONS ), null ) );
    }

    // adapter Property for the ComboBox because the physicalProperty can be set to values other than those defined
    // in labelValueList - value is null which means 'Custom'
    const adapterProperty = new Property( physicalProperty.value, {
      reentrant: true,
      phetioType: PropertyIO( NullableIO( NumberIO ) ),
      tandem: tandem.createTandem( 'adapterProperty' )
    } );

    // if an entry in the combo box is selected to any entry other than "custom", update the actual Property
    adapterProperty.link( value => {
      if ( value ) { physicalProperty.set( value ); }
    } );

    // if the physical Property changes as a result of anything other than the adapter Property, set to null
    if ( options.supportCustom ) {
      physicalProperty.link( physicalValue => {
        if ( physicalValue !== adapterProperty.value ) {
          adapterProperty.set( null );
        }
      } );
    }

    // the only case where an external physicalProperty change should update
    resetEmitter.addListener( () => {
      adapterProperty.reset();
    } );

    super( itemList, adapterProperty, listParent, options );
  }
}

energySkatePark.register( 'PhysicalComboBox', PhysicalComboBox );
export default PhysicalComboBox;