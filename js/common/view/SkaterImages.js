// Copyright 2022-2023, University of Colorado Boulder

/**
 * Responsible for all images for the Skater in this sim. Collects the images to support
 * animation, selecting a different skater character, and selecting a different set of skater characters for
 * localization.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../energySkatePark.js';
import SkaterCharacterSetAfrica from './SkaterCharacterSetAfrica.js';
import SkaterCharacterSetAfricaModest from './SkaterCharacterSetAfricaModest.js';
import SkaterCharacterSetAsia from './SkaterCharacterSetAsia.js';
import SkaterCharacterSetLatinAmerica from './SkaterCharacterSetLatinAmerica.js';
import SkaterCharacterSetOceania from './SkaterCharacterSetOceania.js';
import SkaterCharacterSetUSA from './SkaterCharacterSetUSA.js';


const SkaterImages = {
  SKATER_CHARACTER_SETS: [
    SkaterCharacterSetUSA,
    SkaterCharacterSetAfrica,
    SkaterCharacterSetAfricaModest,
    SkaterCharacterSetAsia,
    SkaterCharacterSetLatinAmerica,
    SkaterCharacterSetOceania
  ],

  IMAGES_PER_SET: 8
};

energySkatePark.register( 'SkaterImages', SkaterImages );
export default SkaterImages;