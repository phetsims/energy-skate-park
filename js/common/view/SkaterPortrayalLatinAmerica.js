// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from Latin America.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { LATIN_AMERICA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import latinAmericaSkater1_headshot_png from '../../../images/latin-america/latinAmericaSkater1_headshot_png.js';
import latinAmericaSkater1_left_png from '../../../images/latin-america/latinAmericaSkater1_left_png.js';
import latinAmericaSkater1_right_png from '../../../images/latin-america/latinAmericaSkater1_right_png.js';
import latinAmericaSkater2_headshot_png from '../../../images/latin-america/latinAmericaSkater2_headshot_png.js';
import latinAmericaSkater2_left_png from '../../../images/latin-america/latinAmericaSkater2_left_png.js';
import latinAmericaSkater2_right_png from '../../../images/latin-america/latinAmericaSkater2_right_png.js';
import latinAmericaSkater3_headshot_png from '../../../images/latin-america/latinAmericaSkater3_headshot_png.js';
import latinAmericaSkater3_left_png from '../../../images/latin-america/latinAmericaSkater3_left_png.js';
import latinAmericaSkater3_right_png from '../../../images/latin-america/latinAmericaSkater3_right_png.js';
import latinAmericaSkater4_headshot_png from '../../../images/latin-america/latinAmericaSkater4_headshot_png.js';
import latinAmericaSkater4_left_png from '../../../images/latin-america/latinAmericaSkater4_left_png.js';
import latinAmericaSkater4_right_png from '../../../images/latin-america/latinAmericaSkater4_right_png.js';
import latinAmericaSkater5_headshot_png from '../../../images/latin-america/latinAmericaSkater5_headshot_png.js';
import latinAmericaSkater5_left_png from '../../../images/latin-america/latinAmericaSkater5_left_png.js';
import latinAmericaSkater5_right_png from '../../../images/latin-america/latinAmericaSkater5_right_png.js';
import latinAmericaSkater6_headshot_png from '../../../images/latin-america/latinAmericaSkater6_headshot_png.js';
import latinAmericaSkater6_left_png from '../../../images/latin-america/latinAmericaSkater6_left_png.js';
import latinAmericaSkater6_right_png from '../../../images/latin-america/latinAmericaSkater6_right_png.js';
import usaCat_headshot_png from '../../../images/usa/usaCat_headshot_png.js';
import usaCat_left_png from '../../../images/usa/usaCat_left_png.js';
import usaCat_right_png from '../../../images/usa/usaCat_right_png.js';
import usaDog_headshot_png from '../../../images/usa/usaDog_headshot_png.js';
import usaDog_left_png from '../../../images/usa/usaDog_left_png.js';
import usaDog_right_png from '../../../images/usa/usaDog_right_png.js';
import SkaterImageSet from './SkaterImageSet.js';
import SkaterPortrayal from './SkaterPortrayal.js';

const latinAmericaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.latinAmericaStringProperty;

const SkaterPortrayalLatinAmerica = new SkaterPortrayal(
  latinAmericaString,
  new SkaterImageSet( latinAmericaSkater1_left_png, latinAmericaSkater1_right_png, latinAmericaSkater1_headshot_png ),
  new SkaterImageSet( latinAmericaSkater2_left_png, latinAmericaSkater2_right_png, latinAmericaSkater2_headshot_png ),
  new SkaterImageSet( latinAmericaSkater3_left_png, latinAmericaSkater3_right_png, latinAmericaSkater3_headshot_png ),
  new SkaterImageSet( latinAmericaSkater4_left_png, latinAmericaSkater4_right_png, latinAmericaSkater4_headshot_png ),
  new SkaterImageSet( latinAmericaSkater5_left_png, latinAmericaSkater5_right_png, latinAmericaSkater5_headshot_png ),
  new SkaterImageSet( latinAmericaSkater6_left_png, latinAmericaSkater6_right_png, latinAmericaSkater6_headshot_png ),
  new SkaterImageSet( usaCat_left_png, usaCat_right_png, usaCat_headshot_png ),
  new SkaterImageSet( usaDog_left_png, usaDog_right_png, usaDog_headshot_png ),
  LATIN_AMERICA_REGION_AND_CULTURE_ID );

export default SkaterPortrayalLatinAmerica;