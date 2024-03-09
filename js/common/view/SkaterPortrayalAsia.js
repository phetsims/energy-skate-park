// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from Asia.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { ASIA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import africaElephant_headshot_png from '../../../images/africa/africaElephant_headshot_png.js';
import africaElephant_left_png from '../../../images/africa/africaElephant_left_png.js';
import africaElephant_right_png from '../../../images/africa/africaElephant_right_png.js';
import africaGoat_headshot_png from '../../../images/africa/africaGoat_headshot_png.js';
import africaGoat_left_png from '../../../images/africa/africaGoat_left_png.js';
import africaGoat_right_png from '../../../images/africa/africaGoat_right_png.js';
import asiaSkater1_headshot_png from '../../../images/asia/asiaSkater1_headshot_png.js';
import asiaSkater1_left_png from '../../../images/asia/asiaSkater1_left_png.js';
import asiaSkater1_right_png from '../../../images/asia/asiaSkater1_right_png.js';
import asiaSkater2_headshot_png from '../../../images/asia/asiaSkater2_headshot_png.js';
import asiaSkater2_left_png from '../../../images/asia/asiaSkater2_left_png.js';
import asiaSkater2_right_png from '../../../images/asia/asiaSkater2_right_png.js';
import asiaSkater3_headshot_png from '../../../images/asia/asiaSkater3_headshot_png.js';
import asiaSkater3_left_png from '../../../images/asia/asiaSkater3_left_png.js';
import asiaSkater3_right_png from '../../../images/asia/asiaSkater3_right_png.js';
import asiaSkater4_headshot_png from '../../../images/asia/asiaSkater4_headshot_png.js';
import asiaSkater4_left_png from '../../../images/asia/asiaSkater4_left_png.js';
import asiaSkater4_right_png from '../../../images/asia/asiaSkater4_right_png.js';
import asiaSkater5_headshot_png from '../../../images/asia/asiaSkater5_headshot_png.js';
import asiaSkater5_left_png from '../../../images/asia/asiaSkater5_left_png.js';
import asiaSkater5_right_png from '../../../images/asia/asiaSkater5_right_png.js';
import asiaSkater6_headshot_png from '../../../images/asia/asiaSkater6_headshot_png.js';
import asiaSkater6_left_png from '../../../images/asia/asiaSkater6_left_png.js';
import asiaSkater6_right_png from '../../../images/asia/asiaSkater6_right_png.js';
import SkaterImageSet from './SkaterImageSet.js';
import SkaterPortrayal from './SkaterPortrayal.js';

const asiaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.asiaStringProperty;

const SkaterPortrayalAsia = new SkaterPortrayal(
  asiaString,
  new SkaterImageSet( asiaSkater1_left_png, asiaSkater1_right_png, asiaSkater1_headshot_png ),
  new SkaterImageSet( asiaSkater2_left_png, asiaSkater2_right_png, asiaSkater2_headshot_png ),
  new SkaterImageSet( asiaSkater3_left_png, asiaSkater3_right_png, asiaSkater3_headshot_png ),
  new SkaterImageSet( asiaSkater4_left_png, asiaSkater4_right_png, asiaSkater4_headshot_png ),
  new SkaterImageSet( asiaSkater5_left_png, asiaSkater5_right_png, asiaSkater5_headshot_png ),
  new SkaterImageSet( asiaSkater6_left_png, asiaSkater6_right_png, asiaSkater6_headshot_png ),
  new SkaterImageSet( africaGoat_left_png, africaGoat_right_png, africaGoat_headshot_png ),
  new SkaterImageSet( africaElephant_left_png, africaElephant_right_png, africaElephant_headshot_png ),
  ASIA_REGION_AND_CULTURE_ID );

export default SkaterPortrayalAsia;