// Copyright 2020-2026, University of Colorado Boulder

/**
 * Radio button group that controls skater image, independent of mass. Uses RectangularRadioButtonGroup
 * so that there is a single tab stop with arrow-key navigation between buttons.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Shape from '../../../../kite/js/Shape.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import RectangularRadioButtonGroup, { type RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import multiSelectionSoundPlayerFactory from '../../../../tambo/js/multiSelectionSoundPlayerFactory.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import SkaterImageSet from './SkaterImageSet.js';

const BUTTON_SPACING = 5;
const BUTTONS_PER_ROW = 4;

export default class SkaterRadioButtonGroup extends RectangularRadioButtonGroup<number> {

  public constructor( skaterImageSetProperty: Property<number>, tandem: Tandem ) {

    // Build the items array for RectangularRadioButtonGroup
    const items: RectangularRadioButtonGroupItem<number>[] = [];
    skaterImageSetProperty.validValues!.forEach( ( skaterImageSet, index ) => {
      const imageNode = new Image( SkaterImageSet.SKATER_IMAGE_SETS[ index ].headshotImageProperty, { scale: 0.5 } );

      // Round-clip the corners to avoid pointy images in the radio buttons
      imageNode.clipArea = Shape.roundRect(
        imageNode.localBounds.left,
        imageNode.localBounds.top,
        imageNode.localBounds.width,
        imageNode.localBounds.height,
        4,
        4
      );

      items.push( {
        value: index,
        createNode: () => imageNode,
        tandemName: `skater${index + 1}RadioButton`
      } );
    } );

    const soundPlayers = items.map( ( _, index ) => multiSelectionSoundPlayerFactory.getSelectionSoundPlayer( index ) );

    super( skaterImageSetProperty, items, {
      soundPlayers: soundPlayers,
      orientation: 'horizontal',
      wrap: true,
      widthSizable: false, // Prevent the parent VBox from overriding preferredWidth
      spacing: BUTTON_SPACING,
      lineSpacing: BUTTON_SPACING,
      justify: 'left',
      stretch: false,
      radioButtonOptions: {
        xMargin: 1,
        yMargin: 1,
        cornerRadius: EnergySkateParkConstants.RADIO_BUTTON_CORNER_RADIUS,
        baseColor: EnergySkateParkColorScheme.radioButtonBaseColor,
        buttonAppearanceStrategyOptions: {
          selectedStroke: EnergySkateParkColorScheme.radioButtonSelectedStroke
        }
      },
      tandem: tandem
    } );

    // Set preferredWidth based on actual button width (which includes stroke lineWidth)
    // so that exactly BUTTONS_PER_ROW buttons fit per row.
    const actualButtonWidth = this.children[ 0 ].width;
    this.preferredWidth = actualButtonWidth * BUTTONS_PER_ROW + BUTTON_SPACING * ( BUTTONS_PER_ROW - 1 );
  }
}

energySkatePark.register( 'SkaterRadioButtonGroup', SkaterRadioButtonGroup );
