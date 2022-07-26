// Copyright 2022, University of Colorado Boulder

/**
 * The set of localization controls for Energy Skate Park, available in the Preferences dialog.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import CharacterSetComboBox from '../../../../joist/js/preferences/CharacterSetComboBox.js';
import { Image, VBox } from '../../../../scenery/js/imports.js';
import energySkatePark from '../../energySkatePark.js';
import SkaterImages from './SkaterImages.js';

// strings are not translatable until design is complete, see https://github.com/phetsims/joist/issues/814
const unitedStatesOfAmerica = 'United States of America';
const africaConservative = 'Africa - Conservative';

class EnergySkateParkLocalizationNode extends VBox {
  constructor( preferencesModel, tandem ) {

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

    const characterSetComboBox = new CharacterSetComboBox( preferencesModel.skaterCharacterSetProperty,
      characterSetDescriptors, phet.joist.sim.topLayer );

    super( {
      align: 'left',
      spacing: 15,
      children: [ characterSetComboBox ],
      tandem: tandem
    } );

    // @private
    this.disposeEnergySkateParkLocalizationNode = () => {
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
