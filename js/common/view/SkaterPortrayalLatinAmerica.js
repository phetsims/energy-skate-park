// Copyright 2023, University of Colorado Boulder

/**
 * Artwork representing characters from Latin America.
 *
 * @author Luisa Vargas
 *
 */

import JoistStrings from '../../../../joist/js/JoistStrings.js';
import { LATIN_AMERICA_REGION_AND_CULTURE_ID } from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import cat_headshot_png from '../../../images/usa/cat_headshot_png.js';
import cat_left_png from '../../../images/usa/cat_left_png.js';
import cat_right_png from '../../../images/usa/cat_right_png.js';
import dog_headshot_png from '../../../images/usa/dog_headshot_png.js';
import dog_left_png from '../../../images/usa/dog_left_png.js';
import dog_right_png from '../../../images/usa/dog_right_png.js';
import skater1_headshot_png from '../../../images/latin-america/skater1_headshot_png.js';
import skater1_left_png from '../../../images/latin-america/skater1_left_png.js';
import skater1_right_png from '../../../images/latin-america/skater1_right_png.js';
import skater2_headshot_png from '../../../images/latin-america/skater2_headshot_png.js';
import skater2_left_png from '../../../images/latin-america/skater2_left_png.js';
import skater2_right_png from '../../../images/latin-america/skater2_right_png.js';
import skater3_headshot_png from '../../../images/latin-america/skater3_headshot_png.js';
import skater3_left_png from '../../../images/latin-america/skater3_left_png.js';
import skater3_right_png from '../../../images/latin-america/skater3_right_png.js';
import skater4_headshot_png from '../../../images/latin-america/skater4_headshot_png.js';
import skater4_left_png from '../../../images/latin-america/skater4_left_png.js';
import skater4_right_png from '../../../images/latin-america/skater4_right_png.js';
import skater5_headshot_png from '../../../images/latin-america/skater5_headshot_png.js';
import skater5_left_png from '../../../images/latin-america/skater5_left_png.js';
import skater5_right_png from '../../../images/latin-america/skater5_right_png.js';
import skater6_headshot_png from '../../../images/latin-america/skater6_headshot_png.js';
import skater6_left_png from '../../../images/latin-america/skater6_left_png.js';
import skater6_right_png from '../../../images/latin-america/skater6_right_png.js';
import { portrayalsTandem } from '../model/EnergySkateParkPreferencesModel.js';
import SkaterPortrayal from './SkaterPortrayal.js';
import SkaterImageSet from './SkaterImageSet.js';

const latinAmericaString = JoistStrings.preferences.tabs.localization.regionAndCulture.portrayalSets.latinAmericaStringProperty;

const SkaterPortrayalLatinAmerica = new SkaterPortrayal(
  latinAmericaString,
  new SkaterImageSet( skater1_left_png, skater1_right_png, skater1_headshot_png ),
  new SkaterImageSet( skater2_left_png, skater2_right_png, skater2_headshot_png ),
  new SkaterImageSet( skater3_left_png, skater3_right_png, skater3_headshot_png ),
  new SkaterImageSet( skater4_left_png, skater4_right_png, skater4_headshot_png ),
  new SkaterImageSet( skater5_left_png, skater5_right_png, skater5_headshot_png ),
  new SkaterImageSet( skater6_left_png, skater6_right_png, skater6_headshot_png ),
  new SkaterImageSet( cat_left_png, cat_right_png, cat_headshot_png ),
  new SkaterImageSet( dog_left_png, dog_right_png, dog_headshot_png ),
  LATIN_AMERICA_REGION_AND_CULTURE_ID,
  {
    tandem: portrayalsTandem.createTandem( 'skaterPortrayalLatinAmerica' ),
    phetioState: false
  } );

export default SkaterPortrayalLatinAmerica;