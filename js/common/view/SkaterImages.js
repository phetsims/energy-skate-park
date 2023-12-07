// Copyright 2022-2023, University of Colorado Boulder

/**
 * Responsible for all images for the Skater in this sim. Collects the images to support
 * animation, selecting a different skater character, and selecting a different set of skater characters for
 * localization.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../energySkatePark.js';
import SkaterPortrayalAfrica from './SkaterPortrayalAfrica.js';
import SkaterPortrayalAfricaModest from './SkaterPortrayalAfricaModest.js';
import SkaterPortrayalAsia from './SkaterPortrayalAsia.js';
import SkaterPortrayalLatinAmerica from './SkaterPortrayalLatinAmerica.js';
import SkaterPortrayalOceania from './SkaterPortrayalOceania.js';
import SkaterPortrayalUSA from './SkaterPortrayalUSA.js';


const SkaterImages = {
  SKATER_PORTAYALS: [
    SkaterPortrayalUSA,
    SkaterPortrayalAfrica,
    SkaterPortrayalAfricaModest,
    SkaterPortrayalAsia,
    SkaterPortrayalLatinAmerica,
    SkaterPortrayalOceania
  ],

  IMAGES_PER_SET: 8
};

energySkatePark.register( 'SkaterImages', SkaterImages );
export default SkaterImages;