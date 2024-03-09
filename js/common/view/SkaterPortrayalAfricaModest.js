// Copyright 2023-2024, University of Colorado Boulder
/**
 * Artwork representing characters from Africa (modest).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { AFRICA_MODEST_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import africaModestSkater6_set3_headshot_png from '../../../images/africaModest/africaModestSkater6_set3_headshot_png.js';
import africaModestSkater6_set3_left_png from '../../../images/africaModest/africaModestSkater6_set3_left_png.js';
import africaModestSkater6_set3_right_png from '../../../images/africaModest/africaModestSkater6_set3_right_png.js';
import africaElephant_headshot_png from '../../../images/africa/africaElephant_headshot_png.js';
import africaElephant_left_png from '../../../images/africa/africaElephant_left_png.js';
import africaElephant_right_png from '../../../images/africa/africaElephant_right_png.js';
import africaGoat_headshot_png from '../../../images/africa/africaGoat_headshot_png.js';
import africaGoat_left_png from '../../../images/africa/africaGoat_left_png.js';
import africaGoat_right_png from '../../../images/africa/africaGoat_right_png.js';
import africaSkater1_set2_headshot_png from '../../../images/africa/africaSkater1_set2_headshot_png.js';
import africaSkater1_set2_left_png from '../../../images/africa/africaSkater1_set2_left_png.js';
import africaSkater1_set2_right_png from '../../../images/africa/africaSkater1_set2_right_png.js';
import africaSkater2_set2_headshot_png from '../../../images/africa/africaSkater2_set2_headshot_png.js';
import africaSkater2_set2_left_png from '../../../images/africa/africaSkater2_set2_left_png.js';
import africaSkater2_set2_right_png from '../../../images/africa/africaSkater2_set2_right_png.js';
import africaSkater3_set2_headshot_png from '../../../images/africa/africaSkater3_set2_headshot_png.js';
import africaSkater3_set2_left_png from '../../../images/africa/africaSkater3_set2_left_png.js';
import africaSkater3_set2_right_png from '../../../images/africa/africaSkater3_set2_right_png.js';
import africaSkater4_set2_headshot_png from '../../../images/africa/africaSkater4_set2_headshot_png.js';
import africaSkater4_set2_left_png from '../../../images/africa/africaSkater4_set2_left_png.js';
import africaSkater4_set2_right_png from '../../../images/africa/africaSkater4_set2_right_png.js';
import africaSkater5_set2_headshot_png from '../../../images/africa/africaSkater5_set2_headshot_png.js';
import africaSkater5_set2_left_png from '../../../images/africa/africaSkater5_set2_left_png.js';
import africaSkater5_set2_right_png from '../../../images/africa/africaSkater5_set2_right_png.js';
import SkaterImageSet from './SkaterImageSet.js';
import SkaterPortrayal from './SkaterPortrayal.js';

const africaConservativeString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.africaModestStringProperty;

const SkaterPortrayalAfricaModest = new SkaterPortrayal(
  africaConservativeString,
  new SkaterImageSet( africaSkater1_set2_left_png, africaSkater1_set2_right_png, africaSkater1_set2_headshot_png ),
  new SkaterImageSet( africaSkater2_set2_left_png, africaSkater2_set2_right_png, africaSkater2_set2_headshot_png ),
  new SkaterImageSet( africaSkater3_set2_left_png, africaSkater3_set2_right_png, africaSkater3_set2_headshot_png ),
  new SkaterImageSet( africaSkater4_set2_left_png, africaSkater4_set2_right_png, africaSkater4_set2_headshot_png ),
  new SkaterImageSet( africaSkater5_set2_left_png, africaSkater5_set2_right_png, africaSkater5_set2_headshot_png ),
  new SkaterImageSet( africaModestSkater6_set3_left_png, africaModestSkater6_set3_right_png, africaModestSkater6_set3_headshot_png ),
  new SkaterImageSet( africaGoat_left_png, africaGoat_right_png, africaGoat_headshot_png ),
  new SkaterImageSet( africaElephant_left_png, africaElephant_right_png, africaElephant_headshot_png ),
  AFRICA_MODEST_REGION_AND_CULTURE_ID );

export default SkaterPortrayalAfricaModest;