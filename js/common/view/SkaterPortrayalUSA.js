// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from the USA.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { USA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import usaCat_headshot_png from '../../../images/usa/usaCat_headshot_png.js';
import usaCat_left_png from '../../../images/usa/usaCat_left_png.js';
import usaCat_right_png from '../../../images/usa/usaCat_right_png.js';
import usaDog_headshot_png from '../../../images/usa/usaDog_headshot_png.js';
import usaDog_left_png from '../../../images/usa/usaDog_left_png.js';
import usaDog_right_png from '../../../images/usa/usaDog_right_png.js';
import usaSkater1_set1_headshot_png from '../../../images/usa/usaSkater1_set1_headshot_png.js';
import usaSkater1_set1_left_png from '../../../images/usa/usaSkater1_set1_left_png.js';
import usaSkater1_set1_right_png from '../../../images/usa/usaSkater1_set1_right_png.js';
import usaSkater2_set1_headshot_png from '../../../images/usa/usaSkater2_set1_headshot_png.js';
import usaSkater2_set1_left_png from '../../../images/usa/usaSkater2_set1_left_png.js';
import usaSkater2_set1_right_png from '../../../images/usa/usaSkater2_set1_right_png.js';
import usaSkater3_set1_headshot_png from '../../../images/usa/usaSkater3_set1_headshot_png.js';
import usaSkater3_set1_left_png from '../../../images/usa/usaSkater3_set1_left_png.js';
import usaSkater3_set1_right_png from '../../../images/usa/usaSkater3_set1_right_png.js';
import usaSkater4_set1_headshot_png from '../../../images/usa/usaSkater4_set1_headshot_png.js';
import usaSkater4_set1_left_png from '../../../images/usa/usaSkater4_set1_left_png.js';
import usaSkater4_set1_right_png from '../../../images/usa/usaSkater4_set1_right_png.js';
import usaSkater5_set1_headshot_png from '../../../images/usa/usaSkater5_set1_headshot_png.js';
import usaSkater5_set1_left_png from '../../../images/usa/usaSkater5_set1_left_png.js';
import usaSkater5_set1_right_png from '../../../images/usa/usaSkater5_set1_right_png.js';
import usaSkater6_set1_headshot_png from '../../../images/usa/usaSkater6_set1_headshot_png.js';
import usaSkater6_set1_left_png from '../../../images/usa/usaSkater6_set1_left_png.js';
import usaSkater6_set1_right_png from '../../../images/usa/usaSkater6_set1_right_png.js';
import SkaterImageSet from './SkaterImageSet.js';
import SkaterPortrayal from './SkaterPortrayal.js';

const unitedStatesOfAmericaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.unitedStatesOfAmericaStringProperty;

const SkaterPortrayalUSA = new SkaterPortrayal(
  unitedStatesOfAmericaString,
  new SkaterImageSet( usaSkater1_set1_left_png, usaSkater1_set1_right_png, usaSkater1_set1_headshot_png ),
  new SkaterImageSet( usaSkater2_set1_left_png, usaSkater2_set1_right_png, usaSkater2_set1_headshot_png ),
  new SkaterImageSet( usaSkater3_set1_left_png, usaSkater3_set1_right_png, usaSkater3_set1_headshot_png ),
  new SkaterImageSet( usaSkater4_set1_left_png, usaSkater4_set1_right_png, usaSkater4_set1_headshot_png ),
  new SkaterImageSet( usaSkater5_set1_left_png, usaSkater5_set1_right_png, usaSkater5_set1_headshot_png ),
  new SkaterImageSet( usaSkater6_set1_left_png, usaSkater6_set1_right_png, usaSkater6_set1_headshot_png ),
  new SkaterImageSet( usaCat_left_png, usaCat_right_png, usaCat_headshot_png ),
  new SkaterImageSet( usaDog_left_png, usaDog_right_png, usaDog_headshot_png ),
  USA_REGION_AND_CULTURE_ID );

export default SkaterPortrayalUSA;