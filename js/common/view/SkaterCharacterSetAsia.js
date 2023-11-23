// Copyright 2023, University of Colorado Boulder

/**
 * Artwork representing characters from Asia.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { ASIA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import goat_headshot_png from '../../../images/africa/goat_headshot_png.js';
import goat_left_png from '../../../images/africa/goat_left_png.js';
import goat_right_png from '../../../images/africa/goat_right_png.js';
import elephant_headshot_png from '../../../images/africa/elephant_headshot_png.js';
import elephant_left_png from '../../../images/africa/elephant_left_png.js';
import elephant_right_png from '../../../images/africa/elephant_right_png.js';
import skater1_headshot_png from '../../../images/asia/skater1_headshot_png.js';
import skater1_left_png from '../../../images/asia/skater1_left_png.js';
import skater1_right_png from '../../../images/asia/skater1_right_png.js';
import skater2_headshot_png from '../../../images/asia/skater2_headshot_png.js';
import skater2_left_png from '../../../images/asia/skater2_left_png.js';
import skater2_right_png from '../../../images/asia/skater2_right_png.js';
import skater3_headshot_png from '../../../images/asia/skater3_headshot_png.js';
import skater3_left_png from '../../../images/asia/skater3_left_png.js';
import skater3_right_png from '../../../images/asia/skater3_right_png.js';
import skater4_headshot_png from '../../../images/asia/skater4_headshot_png.js';
import skater4_left_png from '../../../images/asia/skater4_left_png.js';
import skater4_right_png from '../../../images/asia/skater4_right_png.js';
import skater5_headshot_png from '../../../images/asia/skater5_headshot_png.js';
import skater5_left_png from '../../../images/asia/skater5_left_png.js';
import skater5_right_png from '../../../images/asia/skater5_right_png.js';
import skater6_headshot_png from '../../../images/asia/skater6_headshot_png.js';
import skater6_left_png from '../../../images/asia/skater6_left_png.js';
import skater6_right_png from '../../../images/asia/skater6_right_png.js';
import { portrayalsTandem } from '../model/EnergySkateParkPreferencesModel.js';
import SkaterCharacterSet from './SkaterCharacterSet.js';
import SkaterImageSet from './SkaterImageSet.js';

const asiaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.asiaStringProperty;

const SkaterCharacterSetAsia = new SkaterCharacterSet(
  asiaString,
  new SkaterImageSet( skater1_left_png, skater1_right_png, skater1_headshot_png ),
  new SkaterImageSet( skater2_left_png, skater2_right_png, skater2_headshot_png ),
  new SkaterImageSet( skater3_left_png, skater3_right_png, skater3_headshot_png ),
  new SkaterImageSet( skater4_left_png, skater4_right_png, skater4_headshot_png ),
  new SkaterImageSet( skater5_left_png, skater5_right_png, skater5_headshot_png ),
  new SkaterImageSet( skater6_left_png, skater6_right_png, skater6_headshot_png ),
  new SkaterImageSet( goat_left_png, goat_right_png, goat_headshot_png ),
  new SkaterImageSet( elephant_left_png, elephant_right_png, elephant_headshot_png ),
  ASIA_REGION_AND_CULTURE_ID,
  {
    tandem: portrayalsTandem.createTandem( 'skaterPortrayalAsia' ),
    phetioState: false
  } );

export default SkaterCharacterSetAsia;