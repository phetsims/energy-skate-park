// Copyright 2023-2024, University of Colorado Boulder

/**
 * Artwork representing characters from the USA.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import usaCatHeadshot_png from '../../../images/usa/usaCatHeadshot_png.js';
import usaCatLeft_png from '../../../images/usa/usaCatLeft_png.js';
import usaCatRight_png from '../../../images/usa/usaCatRight_png.js';
import usaDogHeadshot_png from '../../../images/usa/usaDogHeadshot_png.js';
import usaDogLeft_png from '../../../images/usa/usaDogLeft_png.js';
import usaDogRight_png from '../../../images/usa/usaDogRight_png.js';
import usaSkater1Headshot_png from '../../../images/usa/usaSkater1Headshot_png.js';
import usaSkater1Left_png from '../../../images/usa/usaSkater1Left_png.js';
import usaSkater1Right_png from '../../../images/usa/usaSkater1Right_png.js';
import usaSkater2Headshot_png from '../../../images/usa/usaSkater2Headshot_png.js';
import usaSkater2Left_png from '../../../images/usa/usaSkater2Left_png.js';
import usaSkater2Right_png from '../../../images/usa/usaSkater2Right_png.js';
import usaSkater3Headshot_png from '../../../images/usa/usaSkater3Headshot_png.js';
import usaSkater3Left_png from '../../../images/usa/usaSkater3Left_png.js';
import usaSkater3Right_png from '../../../images/usa/usaSkater3Right_png.js';
import usaSkater4Headshot_png from '../../../images/usa/usaSkater4Headshot_png.js';
import usaSkater4Left_png from '../../../images/usa/usaSkater4Left_png.js';
import usaSkater4Right_png from '../../../images/usa/usaSkater4Right_png.js';
import usaSkater5Headshot_png from '../../../images/usa/usaSkater5Headshot_png.js';
import usaSkater5Left_png from '../../../images/usa/usaSkater5Left_png.js';
import usaSkater5Right_png from '../../../images/usa/usaSkater5Right_png.js';
import usaSkater6Headshot_png from '../../../images/usa/usaSkater6Headshot_png.js';
import usaSkater6Left_png from '../../../images/usa/usaSkater6Left_png.js';
import usaSkater6Right_png from '../../../images/usa/usaSkater6Right_png.js';
import SkaterPortrayal, { SkaterImageSetDeprecated } from './SkaterPortrayal.js';

const SkaterPortrayalUSA = new SkaterPortrayal(
  'usa',
  new SkaterImageSetDeprecated( usaSkater1Left_png, usaSkater1Right_png, usaSkater1Headshot_png ),
  new SkaterImageSetDeprecated( usaSkater2Left_png, usaSkater2Right_png, usaSkater2Headshot_png ),
  new SkaterImageSetDeprecated( usaSkater3Left_png, usaSkater3Right_png, usaSkater3Headshot_png ),
  new SkaterImageSetDeprecated( usaSkater4Left_png, usaSkater4Right_png, usaSkater4Headshot_png ),
  new SkaterImageSetDeprecated( usaSkater5Left_png, usaSkater5Right_png, usaSkater5Headshot_png ),
  new SkaterImageSetDeprecated( usaSkater6Left_png, usaSkater6Right_png, usaSkater6Headshot_png ),
  new SkaterImageSetDeprecated( usaCatLeft_png, usaCatRight_png, usaCatHeadshot_png ),
  new SkaterImageSetDeprecated( usaDogLeft_png, usaDogRight_png, usaDogHeadshot_png )
);

export default SkaterPortrayalUSA;