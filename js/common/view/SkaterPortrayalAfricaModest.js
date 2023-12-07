// Copyright 2023, University of Colorado Boulder
/**
 * Artwork representing characters from Africa (modest).
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { AFRICA_MODEST_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import skater6_set3_headshot_png from '../../../images/africa-modest/skater6_set3_headshot_png.js';
import skater6_set3_left_png from '../../../images/africa-modest/skater6_set3_left_png.js';
import skater6_set3_right_png from '../../../images/africa-modest/skater6_set3_right_png.js';
import elephant_headshot_png from '../../../images/africa/elephant_headshot_png.js';
import elephant_left_png from '../../../images/africa/elephant_left_png.js';
import elephant_right_png from '../../../images/africa/elephant_right_png.js';
import goat_headshot_png from '../../../images/africa/goat_headshot_png.js';
import goat_left_png from '../../../images/africa/goat_left_png.js';
import goat_right_png from '../../../images/africa/goat_right_png.js';
import skater1_set2_headshot_png from '../../../images/africa/skater1_set2_headshot_png.js';
import skater1_set2_left_png from '../../../images/africa/skater1_set2_left_png.js';
import skater1_set2_right_png from '../../../images/africa/skater1_set2_right_png.js';
import skater2_set2_headshot_png from '../../../images/africa/skater2_set2_headshot_png.js';
import skater2_set2_left_png from '../../../images/africa/skater2_set2_left_png.js';
import skater2_set2_right_png from '../../../images/africa/skater2_set2_right_png.js';
import skater3_set2_headshot_png from '../../../images/africa/skater3_set2_headshot_png.js';
import skater3_set2_left_png from '../../../images/africa/skater3_set2_left_png.js';
import skater3_set2_right_png from '../../../images/africa/skater3_set2_right_png.js';
import skater4_set2_headshot_png from '../../../images/africa/skater4_set2_headshot_png.js';
import skater4_set2_left_png from '../../../images/africa/skater4_set2_left_png.js';
import skater4_set2_right_png from '../../../images/africa/skater4_set2_right_png.js';
import skater5_set2_headshot_png from '../../../images/africa/skater5_set2_headshot_png.js';
import skater5_set2_left_png from '../../../images/africa/skater5_set2_left_png.js';
import skater5_set2_right_png from '../../../images/africa/skater5_set2_right_png.js';
import { portrayalsTandem } from '../model/EnergySkateParkPreferencesModel.js';
import SkaterPortrayal from './SkaterPortrayal.js';
import SkaterImageSet from './SkaterImageSet.js';

const africaConservativeString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.africaModestStringProperty;

const SkaterPortrayalAfricaModest = new SkaterPortrayal(
  africaConservativeString,
  new SkaterImageSet( skater1_set2_left_png, skater1_set2_right_png, skater1_set2_headshot_png ),
  new SkaterImageSet( skater2_set2_left_png, skater2_set2_right_png, skater2_set2_headshot_png ),
  new SkaterImageSet( skater3_set2_left_png, skater3_set2_right_png, skater3_set2_headshot_png ),
  new SkaterImageSet( skater4_set2_left_png, skater4_set2_right_png, skater4_set2_headshot_png ),
  new SkaterImageSet( skater5_set2_left_png, skater5_set2_right_png, skater5_set2_headshot_png ),
  new SkaterImageSet( skater6_set3_left_png, skater6_set3_right_png, skater6_set3_headshot_png ),
  new SkaterImageSet( goat_left_png, goat_right_png, goat_headshot_png ),
  new SkaterImageSet( elephant_left_png, elephant_right_png, elephant_headshot_png ),
  AFRICA_MODEST_REGION_AND_CULTURE_ID,
  {
    tandem: portrayalsTandem.createTandem( 'skaterPortrayalAfricaModest' ),
    phetioState: false
  }
);

export default SkaterPortrayalAfricaModest;