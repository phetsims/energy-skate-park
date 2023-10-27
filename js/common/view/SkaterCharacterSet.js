// Copyright 2023, University of Colorado Boulder

/**
 * A collection of SkaterImageSets. One SkaterCharacterSet is active at a time. The user can select one of the
 * SkaterImageSets of the SkaterCharacterSet in simulation controls. A different SkaterCharacterSet can be selected
 * from preferences.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import RegionAndCulturePortrayal from '../../../../joist/js/preferences/RegionAndCulturePortrayal.js';
import energySkatePark from '../../energySkatePark.js';
import HeadshotIcon from './HeadshotIcon.js';

export default class SkaterCharacterSet extends RegionAndCulturePortrayal {
  constructor( labelString, imageSet1, imageSet2, imageSet3, imageSet4, imageSet5, imageSet6, imageSet7, imageSet8, queryParameterValue, providedOptions ) {
    const headshotIcon = new HeadshotIcon( imageSet1.headshotImage );

    super( headshotIcon, labelString, queryParameterValue, providedOptions );
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

energySkatePark.register( 'SkaterCharacterSet', SkaterCharacterSet );