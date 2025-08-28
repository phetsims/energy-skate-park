// Copyright 2024-2025, University of Colorado Boulder

/**
 * SkaterImageSet is the set of images for a single skater character.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { ImageableImage } from '../../../../scenery/js/nodes/Imageable.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkImages from '../../EnergySkateParkImages.js';

export default class SkaterImageSet {

  public readonly headshotImageProperty: TReadOnlyProperty<ImageableImage>;
  public readonly leftImageProperty: TReadOnlyProperty<ImageableImage>;
  public readonly rightImageProperty: TReadOnlyProperty<ImageableImage>;

  private constructor( headshotImageProperty: TReadOnlyProperty<ImageableImage>,
                       leftImageProperty: TReadOnlyProperty<ImageableImage>,
                       rightImageProperty: TReadOnlyProperty<ImageableImage> ) {

    this.headshotImageProperty = headshotImageProperty;
    this.leftImageProperty = leftImageProperty;
    this.rightImageProperty = rightImageProperty;
  }

  public static readonly SKATER_IMAGE_SETS = [
    new SkaterImageSet(
      EnergySkateParkImages.skater1HeadshotImageProperty,
      EnergySkateParkImages.skater1LeftImageProperty,
      EnergySkateParkImages.skater1RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.skater2HeadshotImageProperty,
      EnergySkateParkImages.skater2LeftImageProperty,
      EnergySkateParkImages.skater2RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.skater3HeadshotImageProperty,
      EnergySkateParkImages.skater3LeftImageProperty,
      EnergySkateParkImages.skater3RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.skater4HeadshotImageProperty,
      EnergySkateParkImages.skater4LeftImageProperty,
      EnergySkateParkImages.skater4RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.skater5HeadshotImageProperty,
      EnergySkateParkImages.skater5LeftImageProperty,
      EnergySkateParkImages.skater5RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.skater6HeadshotImageProperty,
      EnergySkateParkImages.skater6LeftImageProperty,
      EnergySkateParkImages.skater6RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.animal1HeadshotImageProperty,
      EnergySkateParkImages.animal1LeftImageProperty,
      EnergySkateParkImages.animal1RightImageProperty
    ),
    new SkaterImageSet(
      EnergySkateParkImages.animal2HeadshotImageProperty,
      EnergySkateParkImages.animal2LeftImageProperty,
      EnergySkateParkImages.animal2RightImageProperty
    )
  ];
}

energySkatePark.register( 'SkaterImageSet', SkaterImageSet );