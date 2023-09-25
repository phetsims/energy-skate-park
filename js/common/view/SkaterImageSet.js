// Copyright 2023, University of Colorado Boulder

/**
 * A collection of images for a single skater character with the images used for each direction of motion and
 *  a headshot of the character for the UI to select a particular skater.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 *
 */

import energySkatePark from '../../energySkatePark.js';


export default class SkaterImageSet {
  constructor( leftImage, rightImage, headshotImage ) {
    this.leftImage = leftImage;
    this.rightImage = rightImage;
    this.headshotImage = headshotImage;
  }
}

energySkatePark.register( 'SkaterImageSet', SkaterImageSet );