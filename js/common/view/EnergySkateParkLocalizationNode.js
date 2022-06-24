// Copyright 2022, University of Colorado Boulder

/**
 * The set of localization controls for Energy Skate Park, available in the Preferences dialog.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import CharacterSetComboBox from '../../../../joist/js/preferences/CharacterSetComboBox.js';
import { VBox, Image } from '../../../../scenery/js/imports.js';
import energySkatePark from '../../energySkatePark.js';
import SkaterImages from './SkaterImages.js';
import Property from '../../../../axon/js/Property.js';
import LanguageComboBox from '../../../../joist/js/preferences/LanguageComboBox.js';

// strings are not translatable until design is complete, see https://github.com/phetsims/joist/issues/814
const unitedStatesOfAmerica = 'United States of America';
const africaConservative = 'Africa - Conservative';

class EnergySkateParkLocalizationNode extends VBox {
  constructor( preferencesModel, tandem ) {

    // language controls
    // TODO: How do we populate these? Maybe someday the runnable will know all of its supported locales?
    const languageDescriptors = [
      {
        locale: 'en',
        localeLabel: 'English'
      },
      {
        locale: 'es',
        localeLabel: 'Spanish'
      },
      {
        locale: 'af',
        localeLabel: 'Afrikaans'
      }
    ];

    const languageProperty = new Property( 'en' );
    const languageComboBox = new LanguageComboBox( languageProperty, languageDescriptors, {
      tandem: tandem.createTandem( 'languageComboBox' ),
      phetioState: false
    } );

    // character set controls
    const characterSetDescriptors = [
      {
        setIcon: new HeadshotIcon( SkaterImages.CHARACTER_SET_1.imageSet1.headshotImage ),
        label: unitedStatesOfAmerica,
        value: SkaterImages.CHARACTER_SET_1
      },
      {
        setIcon: new HeadshotIcon( SkaterImages.CHARACTER_SET_2.imageSet1.headshotImage ),
        label: africaConservative,
        value: SkaterImages.CHARACTER_SET_2
      }
    ];

    const characterSetComboBox = new CharacterSetComboBox( preferencesModel.skaterCharacterSetProperty, characterSetDescriptors, phet.joist.sim.topLayer, {
      tandem: tandem.createTandem( 'characterSetComboBox' ),
      phetioState: false
    } );

    super( {
      align: 'left',
      spacing: 15,
      children: [ languageComboBox, characterSetComboBox ],
      tandem: tandem
    } );

    // @private
    this.disposeEnergySkateParkLocalizationNode = () => {
      languageComboBox.dispose();
      characterSetComboBox.dispose();
    };
  }

  // @public
  dispose() {
    this.disposeEnergySkateParkLocalizationNode();
    super.dispose();
  }
}

/**
 * Inner class for an Image of a skater headshot with options to make it look nice in the ComboBox.
 */
class HeadshotIcon extends Image {
  constructor( image ) {
    super( image, {
      scale: 0.35
    } );
  }
}

energySkatePark.register( 'EnergySkateParkLocalizationNode', EnergySkateParkLocalizationNode );
export default EnergySkateParkLocalizationNode;
