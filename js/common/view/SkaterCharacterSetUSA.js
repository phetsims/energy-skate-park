// Copyright 2023, University of Colorado Boulder

/**
 * Artwork representing characters from the USA.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { USA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import cat_headshot_png from '../../../images/usa/cat_headshot_png.js';
import cat_left_png from '../../../images/usa/cat_left_png.js';
import cat_right_png from '../../../images/usa/cat_right_png.js';
import dog_headshot_png from '../../../images/usa/dog_headshot_png.js';
import dog_left_png from '../../../images/usa/dog_left_png.js';
import dog_right_png from '../../../images/usa/dog_right_png.js';
import skater1_set1_headshot_png from '../../../images/usa/skater1_set1_headshot_png.js';
import skater1_set1_left_png from '../../../images/usa/skater1_set1_left_png.js';
import skater1_set1_right_png from '../../../images/usa/skater1_set1_right_png.js';
import skater2_set1_headshot_png from '../../../images/usa/skater2_set1_headshot_png.js';
import skater2_set1_left_png from '../../../images/usa/skater2_set1_left_png.js';
import skater2_set1_right_png from '../../../images/usa/skater2_set1_right_png.js';
import skater3_set1_headshot_png from '../../../images/usa/skater3_set1_headshot_png.js';
import skater3_set1_left_png from '../../../images/usa/skater3_set1_left_png.js';
import skater3_set1_right_png from '../../../images/usa/skater3_set1_right_png.js';
import skater4_set1_headshot_png from '../../../images/usa/skater4_set1_headshot_png.js';
import skater4_set1_left_png from '../../../images/usa/skater4_set1_left_png.js';
import skater4_set1_right_png from '../../../images/usa/skater4_set1_right_png.js';
import skater5_set1_headshot_png from '../../../images/usa/skater5_set1_headshot_png.js';
import skater5_set1_left_png from '../../../images/usa/skater5_set1_left_png.js';
import skater5_set1_right_png from '../../../images/usa/skater5_set1_right_png.js';
import skater6_set1_headshot_png from '../../../images/usa/skater6_set1_headshot_png.js';
import skater6_set1_left_png from '../../../images/usa/skater6_set1_left_png.js';
import skater6_set1_right_png from '../../../images/usa/skater6_set1_right_png.js';
import { portrayalsTandem } from '../model/EnergySkateParkPreferencesModel.js';
import SkaterCharacterSet from './SkaterCharacterSet.js';
import SkaterImageSet from './SkaterImageSet.js';

const unitedStatesOfAmericaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.unitedStatesOfAmericaStringProperty;

const SkaterCharacterSetUSA = new SkaterCharacterSet(
  unitedStatesOfAmericaString,
  new SkaterImageSet( skater1_set1_left_png, skater1_set1_right_png, skater1_set1_headshot_png ),
  new SkaterImageSet( skater2_set1_left_png, skater2_set1_right_png, skater2_set1_headshot_png ),
  new SkaterImageSet( skater3_set1_left_png, skater3_set1_right_png, skater3_set1_headshot_png ),
  new SkaterImageSet( skater4_set1_left_png, skater4_set1_right_png, skater4_set1_headshot_png ),
  new SkaterImageSet( skater5_set1_left_png, skater5_set1_right_png, skater5_set1_headshot_png ),
  new SkaterImageSet( skater6_set1_left_png, skater6_set1_right_png, skater6_set1_headshot_png ),
  new SkaterImageSet( cat_left_png, cat_right_png, cat_headshot_png ),
  new SkaterImageSet( dog_left_png, dog_right_png, dog_headshot_png ),
  USA_REGION_AND_CULTURE_ID,
  {
    tandem: portrayalsTandem.createTandem( 'skaterPortrayalUSA' ),
    phetioState: false
  } );

export default SkaterCharacterSetUSA;