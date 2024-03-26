// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from Oceania.
 *
 * @author Luisa Vargas
 *
 */

import asiaSkater5Headshot_png from '../../../images/asia/asiaSkater5Headshot_png.js';
import asiaSkater5Left_png from '../../../images/asia/asiaSkater5Left_png.js';
import asiaSkater5Right_png from '../../../images/asia/asiaSkater5Right_png.js';
import oceaniaSkater1Headshot_png from '../../../images/oceania/oceaniaSkater1Headshot_png.js';
import oceaniaSkater1Left_png from '../../../images/oceania/oceaniaSkater1Left_png.js';
import oceaniaSkater1Right_png from '../../../images/oceania/oceaniaSkater1Right_png.js';
import oceaniaSkater2Headshot_png from '../../../images/oceania/oceaniaSkater2Headshot_png.js';
import oceaniaSkater2Left_png from '../../../images/oceania/oceaniaSkater2Left_png.js';
import oceaniaSkater2Right_png from '../../../images/oceania/oceaniaSkater2Right_png.js';
import oceaniaSkater3Headshot_png from '../../../images/oceania/oceaniaSkater3Headshot_png.js';
import oceaniaSkater3Left_png from '../../../images/oceania/oceaniaSkater3Left_png.js';
import oceaniaSkater3Right_png from '../../../images/oceania/oceaniaSkater3Right_png.js';
import oceaniaSkater4Headshot_png from '../../../images/oceania/oceaniaSkater4Headshot_png.js';
import oceaniaSkater4Left_png from '../../../images/oceania/oceaniaSkater4Left_png.js';
import oceaniaSkater4Right_png from '../../../images/oceania/oceaniaSkater4Right_png.js';
import oceaniaSkater6Headshot_png from '../../../images/oceania/oceaniaSkater6Headshot_png.js';
import oceaniaSkater6Left_png from '../../../images/oceania/oceaniaSkater6Left_png.js';
import oceaniaSkater6Right_png from '../../../images/oceania/oceaniaSkater6Right_png.js';
import usaCatHeadshot_png from '../../../images/usa/usaCatHeadshot_png.js';
import usaCatLeft_png from '../../../images/usa/usaCatLeft_png.js';
import usaCatRight_png from '../../../images/usa/usaCatRight_png.js';
import usaDogHeadshot_png from '../../../images/usa/usaDogHeadshot_png.js';
import usaDogLeft_png from '../../../images/usa/usaDogLeft_png.js';
import usaDogRight_png from '../../../images/usa/usaDogRight_png.js';
import SkaterPortrayal, { SkaterImageSetDeprecated } from './SkaterPortrayal.js';

const SkaterPortrayalOceania = new SkaterPortrayal(
  'oceania',
  new SkaterImageSetDeprecated( oceaniaSkater1Left_png, oceaniaSkater1Right_png, oceaniaSkater1Headshot_png ),
  new SkaterImageSetDeprecated( oceaniaSkater2Left_png, oceaniaSkater2Right_png, oceaniaSkater2Headshot_png ),
  new SkaterImageSetDeprecated( oceaniaSkater3Left_png, oceaniaSkater3Right_png, oceaniaSkater3Headshot_png ),
  new SkaterImageSetDeprecated( oceaniaSkater4Left_png, oceaniaSkater4Right_png, oceaniaSkater4Headshot_png ),
  new SkaterImageSetDeprecated( asiaSkater5Left_png, asiaSkater5Right_png, asiaSkater5Headshot_png ),
  new SkaterImageSetDeprecated( oceaniaSkater6Left_png, oceaniaSkater6Right_png, oceaniaSkater6Headshot_png ),
  new SkaterImageSetDeprecated( usaCatLeft_png, usaCatRight_png, usaCatHeadshot_png ),
  new SkaterImageSetDeprecated( usaDogLeft_png, usaDogRight_png, usaDogHeadshot_png )
);

export default SkaterPortrayalOceania;