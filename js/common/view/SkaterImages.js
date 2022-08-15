// Copyright 2022, University of Colorado Boulder

/**
 * Responsible for all images for the Skater in this sim. Collects the images into usable classes to support
 * animation, selecting a different skater character, and selecting a different set of skater characters for
 * localization.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import dog_headshot_png from '../../../images/dog_headshot_png.js';

import dog_left_png from '../../../images/dog_left_png.js';
import dog_right_png from '../../../images/dog_right_png.js';
import skater1_headshot_png from '../../../images/skater1_headshot_png.js';
import skater1_left_png from '../../../images/skater1_left_png.js';
import skater1_right_png from '../../../images/skater1_right_png.js';
import skater1_set2_headshot_png from '../../../images/skater1_set2_headshot_png.js';
import skater1_set2_left_png from '../../../images/skater1_set2_left_png.js';
import skater1_set2_right_png from '../../../images/skater1_set2_right_png.js';
import skater2_headshot_png from '../../../images/skater2_headshot_png.js';
import skater2_left_png from '../../../images/skater2_left_png.js';
import skater2_right_png from '../../../images/skater2_right_png.js';
import skater2_set2_headshot_png from '../../../images/skater2_set2_headshot_png.js';
import skater2_set2_left_png from '../../../images/skater2_set2_left_png.js';
import skater2_set2_right_png from '../../../images/skater2_set2_right_png.js';
import skater3_headshot_png from '../../../images/skater3_headshot_png.js';
import skater3_left_png from '../../../images/skater3_left_png.js';
import skater3_right_png from '../../../images/skater3_right_png.js';
import skater3_set2_headshot_png from '../../../images/skater3_set2_headshot_png.js';
import skater3_set2_left_png from '../../../images/skater3_set2_left_png.js';
import skater3_set2_right_png from '../../../images/skater3_set2_right_png.js';
import skater4_headshot_png from '../../../images/skater4_headshot_png.js';
import skater4_left_png from '../../../images/skater4_left_png.js';
import skater4_right_png from '../../../images/skater4_right_png.js';
import skater4_set2_headshot_png from '../../../images/skater4_set2_headshot_png.js';
import skater4_set2_left_png from '../../../images/skater4_set2_left_png.js';
import skater4_set2_right_png from '../../../images/skater4_set2_right_png.js';
import skater5_headshot_png from '../../../images/skater5_headshot_png.js';
import skater5_left_png from '../../../images/skater5_left_png.js';
import skater5_right_png from '../../../images/skater5_right_png.js';
import skater5_set2_headshot_png from '../../../images/skater5_set2_headshot_png.js';
import skater5_set2_left_png from '../../../images/skater5_set2_left_png.js';
import skater5_set2_right_png from '../../../images/skater5_set2_right_png.js';
import skater6_set2_headshot_png from '../../../images/skater6_set2_headshot_png.js';
import skater6_set2_left_png from '../../../images/skater6_set2_left_png.js';
import skater6_set2_right_png from '../../../images/skater6_set2_right_png.js';
import energySkatePark from '../../energySkatePark.js';
import HeadshotIcon from './HeadshotIcon.js';

// strings are not translatable until design is complete, see https://github.com/phetsims/joist/issues/814
const unitedStatesOfAmericaString = 'United States of America';
const africaConservativeString = 'Africa - Conservative';

/**
 * A collection of images for a single skater character with the images used for each direction of motion and
 *  a headshot of the character for the UI to select a particular skater.
 */
class SkaterImageSet {
  constructor( leftImage, rightImage, headshotImage ) {
    this.leftImage = leftImage;
    this.rightImage = rightImage;
    this.headshotImage = headshotImage;
  }
}

/**
 * A collection of SkaterImageSets. One SkaterCharacterSet is active at a time. The user can select one of the
 * SkaterImageSets of the SkaterCharacterSet in simulation controls. A different SkaterCharacterSet can be selected
 * from preferences.
 */
class SkaterCharacterSet {
  constructor( imageSet1, imageSet2, imageSet3, imageSet4, imageSet5, imageSet6, imageSet7, imageSet8 ) {
    this.imageSet1 = imageSet1;
    this.imageSet2 = imageSet2;
    this.imageSet3 = imageSet3;
    this.imageSet4 = imageSet4;
    this.imageSet5 = imageSet5;
    this.imageSet6 = imageSet6;
    this.imageSet7 = imageSet7;
    this.imageSet8 = imageSet8;

    this.imageSets = [ imageSet1, imageSet2, imageSet3, imageSet4, imageSet5, imageSet6, imageSet7, imageSet8 ];
  }
}

const CHARACTER_SET_1 = new SkaterCharacterSet(
  new SkaterImageSet( skater1_left_png, skater1_right_png, skater1_headshot_png ),
  new SkaterImageSet( skater2_left_png, skater2_right_png, skater2_headshot_png ),
  new SkaterImageSet( skater3_left_png, skater3_right_png, skater3_headshot_png ),
  new SkaterImageSet( skater4_left_png, skater4_right_png, skater4_headshot_png ),
  new SkaterImageSet( skater5_left_png, skater5_right_png, skater5_headshot_png ),
  new SkaterImageSet( dog_left_png, dog_right_png, dog_headshot_png ),

  // temporarily including the first two of the other set to practice a set with 8 skaters
  new SkaterImageSet( skater1_set2_left_png, skater1_set2_right_png, skater1_set2_headshot_png ),
  new SkaterImageSet( skater2_set2_left_png, skater2_set2_right_png, skater2_set2_headshot_png )
);

const CHARACTER_SET_2 = new SkaterCharacterSet(
  new SkaterImageSet( skater1_set2_left_png, skater1_set2_right_png, skater1_set2_headshot_png ),
  new SkaterImageSet( skater2_set2_left_png, skater2_set2_right_png, skater2_set2_headshot_png ),
  new SkaterImageSet( skater3_set2_left_png, skater3_set2_right_png, skater3_set2_headshot_png ),
  new SkaterImageSet( skater4_set2_left_png, skater4_set2_right_png, skater4_set2_headshot_png ),
  new SkaterImageSet( skater5_set2_left_png, skater5_set2_right_png, skater5_set2_headshot_png ),
  new SkaterImageSet( skater6_set2_left_png, skater6_set2_right_png, skater6_set2_headshot_png ),

  // temporarily using the first two of the other image set to practice with 8 skaters per set
  new SkaterImageSet( skater1_left_png, skater1_right_png, skater1_headshot_png ),
  new SkaterImageSet( skater2_left_png, skater2_right_png, skater2_headshot_png )
);

const SkaterImages = {
  SkaterCharacterSets: [
    CHARACTER_SET_1,
    CHARACTER_SET_2
  ],

  CHARACTER_SET_1: CHARACTER_SET_1,
  CHARACTER_SET_2: CHARACTER_SET_2,

  SKATER_SET_DESCRIPTORS: [
    {
      icon: new HeadshotIcon( CHARACTER_SET_1.imageSet1.headshotImage ),
      label: unitedStatesOfAmericaString,

      // TODO: Do we still need a value? See https://github.com/phetsims/joist/issues/814
      value: CHARACTER_SET_1
    },
    {
      icon: new HeadshotIcon( CHARACTER_SET_2.imageSet1.headshotImage ),
      label: africaConservativeString,

      // TODO: Do we still need a value? See https://github.com/phetsims/joist/issues/814
      value: CHARACTER_SET_2
    }
  ],

  IMAGES_PER_SET: 8
};

energySkatePark.register( 'SkaterImages', SkaterImages );
export default SkaterImages;