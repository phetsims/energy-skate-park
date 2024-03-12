// Copyright 2023-2024, University of Colorado Boulder

/**
 * A collection of SkaterImageSets. One SkaterPortrayal is active at a time. The user can select one of the
 * SkaterImageSets of the SkaterPortrayal in simulation controls. A different SkaterPortrayal can be selected
 * from preferences.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import energySkatePark from '../../energySkatePark.js';

export default class SkaterPortrayal extends RegionAndCulturePortrayal {

  /**
   * @param {RegionAndCulture} regionAndCulture
   * @param imageSet1
   * @param imageSet2
   * @param imageSet3
   * @param imageSet4
   * @param imageSet5
   * @param imageSet6
   * @param imageSet7
   * @param imageSet8
   * @param providedOptions
   */
  constructor( regionAndCulture, imageSet1, imageSet2, imageSet3, imageSet4, imageSet5, imageSet6, imageSet7, imageSet8, providedOptions ) {

    super( regionAndCulture, providedOptions );
    this.imageSet1 = imageSet1;
    this.imageSet2 = imageSet2;
    this.imageSet3 = imageSet3;
    this.imageSet4 = imageSet4;
    this.imageSet5 = imageSet5;
    this.imageSet6 = imageSet6;
    this.imageSet7 = imageSet7;
    this.imageSet8 = imageSet8;
  }
}

energySkatePark.register( 'SkaterPortrayal', SkaterPortrayal );