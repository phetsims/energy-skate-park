// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from Oceania.
 *
 * @author Luisa Vargas
 *
 */

import asiaSkater5_headshot_png from '../../../images/asia/asiaSkater5_headshot_png.js';
import asiaSkater5_left_png from '../../../images/asia/asiaSkater5_left_png.js';
import asiaSkater5_right_png from '../../../images/asia/asiaSkater5_right_png.js';
import oceaniaSkater1_headshot_png from '../../../images/oceania/oceaniaSkater1_headshot_png.js';
import oceaniaSkater1_left_png from '../../../images/oceania/oceaniaSkater1_left_png.js';
import oceaniaSkater1_right_png from '../../../images/oceania/oceaniaSkater1_right_png.js';
import oceaniaSkater2_headshot_png from '../../../images/oceania/oceaniaSkater2_headshot_png.js';
import oceaniaSkater2_left_png from '../../../images/oceania/oceaniaSkater2_left_png.js';
import oceaniaSkater2_right_png from '../../../images/oceania/oceaniaSkater2_right_png.js';
import oceaniaSkater3_headshot_png from '../../../images/oceania/oceaniaSkater3_headshot_png.js';
import oceaniaSkater3_left_png from '../../../images/oceania/oceaniaSkater3_left_png.js';
import oceaniaSkater3_right_png from '../../../images/oceania/oceaniaSkater3_right_png.js';
import oceaniaSkater4_headshot_png from '../../../images/oceania/oceaniaSkater4_headshot_png.js';
import oceaniaSkater4_left_png from '../../../images/oceania/oceaniaSkater4_left_png.js';
import oceaniaSkater4_right_png from '../../../images/oceania/oceaniaSkater4_right_png.js';
import oceaniaSkater6_headshot_png from '../../../images/oceania/oceaniaSkater6_headshot_png.js';
import oceaniaSkater6_left_png from '../../../images/oceania/oceaniaSkater6_left_png.js';
import oceaniaSkater6_right_png from '../../../images/oceania/oceaniaSkater6_right_png.js';
import usaCat_headshot_png from '../../../images/usa/usaCat_headshot_png.js';
import usaCat_left_png from '../../../images/usa/usaCat_left_png.js';
import usaCat_right_png from '../../../images/usa/usaCat_right_png.js';
import usaDog_headshot_png from '../../../images/usa/usaDog_headshot_png.js';
import usaDog_left_png from '../../../images/usa/usaDog_left_png.js';
import usaDog_right_png from '../../../images/usa/usaDog_right_png.js';
import SkaterImageSet from './SkaterImageSet.js';
import SkaterPortrayal from './SkaterPortrayal.js';

const SkaterPortrayalOceania = new SkaterPortrayal(
  'oceania',
  new SkaterImageSet( oceaniaSkater1_left_png, oceaniaSkater1_right_png, oceaniaSkater1_headshot_png ),
  new SkaterImageSet( oceaniaSkater2_left_png, oceaniaSkater2_right_png, oceaniaSkater2_headshot_png ),
  new SkaterImageSet( oceaniaSkater3_left_png, oceaniaSkater3_right_png, oceaniaSkater3_headshot_png ),
  new SkaterImageSet( oceaniaSkater4_left_png, oceaniaSkater4_right_png, oceaniaSkater4_headshot_png ),
  new SkaterImageSet( asiaSkater5_left_png, asiaSkater5_right_png, asiaSkater5_headshot_png ),
  new SkaterImageSet( oceaniaSkater6_left_png, oceaniaSkater6_right_png, oceaniaSkater6_headshot_png ),
  new SkaterImageSet( usaCat_left_png, usaCat_right_png, usaCat_headshot_png ),
  new SkaterImageSet( usaDog_left_png, usaDog_right_png, usaDog_headshot_png )
);

export default SkaterPortrayalOceania;