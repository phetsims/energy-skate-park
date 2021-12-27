// Copyright 2020-2021, University of Colorado Boulder

/**
 * A collection of radio buttons that controls skater image, independent of mass. Does not use RectangularRadioButtonGroup
 * because the buttons are in a layout that RectangularRadioButtonGroup does not yet support. But in the future, improvements
 * to RectangularRadioButtonGroup may make it possible to use that class, and this should be re-written accordingly.
 *
 * See https://github.com/phetsims/energy-skate-park/issues/263#issuecomment-620829413
 *
 * @author Jesse Greenberg
 */

import merge from '../../../../phet-core/js/merge.js';
import { HBox } from '../../../../scenery/js/imports.js';
import { Image } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import dogHeadshot_png from '../../../images/dogHeadshot_png.js';
import skater1Headshot_png from '../../../images/skater1Headshot_png.js';
import skater2Headshot_png from '../../../images/skater2Headshot_png.js';
import skater3Headshot_png from '../../../images/skater3Headshot_png.js';
import skater4Headshot_png from '../../../images/skater4Headshot_png.js';
import skater5Headshot_png from '../../../images/skater5Headshot_png.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import SkaterNode from './SkaterNode.js';

class SkaterRadioButtonGroup extends Node {

  /**
   * @param {Property.<Image>} skaterImageProperty
   * @param {Tandem} tandem
   */
  constructor( skaterImageProperty, tandem ) {
    super();

    const buttonOptions = {
      xMargin: EnergySkateParkConstants.RADIO_BUTTON_CONTENT_MARGIN,
      yMargin: 0,
      cornerRadius: EnergySkateParkConstants.RADIO_BUTTON_CORNER_RADIUS,
      selectedStroke: EnergySkateParkColorScheme.radioButtonSelectedStroke,
      baseColor: EnergySkateParkColorScheme.radioButtonBaseColor
    };

    const imageScale = 0.5;

    // Description of the radio buttons
    const contentArray = [
      {
        value: SkaterNode.SkaterImage.SKATER_1,
        node: new Image( skater1Headshot_png, { scale: imageScale } ),
        tandemName: 'skater1RadioButton'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_2,
        node: new Image( skater2Headshot_png, { scale: imageScale } ),
        tandemName: 'skater2RadioButton'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_3,
        node: new Image( skater3Headshot_png, { scale: imageScale } ),
        tandemName: 'skater3RadioButton'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_4,
        node: new Image( skater4Headshot_png, { scale: imageScale } ),
        tandemName: 'skater4RadioButton'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_5,
        node: new Image( skater5Headshot_png, { scale: imageScale } ),
        tandemName: 'skater5RadioButton'
      },
      {
        value: SkaterNode.SkaterImage.DOG,
        node: new Image( dogHeadshot_png, { scale: imageScale } ),
        tandemName: 'dogRadioButton'
      }
    ];

    const buttons = [];
    contentArray.forEach( content => {
      buttons.push( new RectangularRadioButton( skaterImageProperty, content.value, merge( {
        content: content.node,
        tandem: tandem.createTandem( content.tandemName )
      }, buttonOptions ) ) );
    } );

    const rows = [];
    for ( let i = 0; i < buttons.length; i += 3 ) {
      rows.push( new HBox( {
        children: buttons.slice( i, i + 3 ),
        spacing: 10,
        resize: false
      } ) );
    }

    // arrange buttons in a 2D grid
    this.addChild( new VBox( {
      children: rows,
      spacing: 3,
      resize: false
    } ) );

    // so that the selected button cannot continue to be clicked, a feature of RectangularRadioButtonGroup - this component is
    // never destroyed, no need to dispose
    skaterImageProperty.link( value => {
      for ( let i = 0; i < contentArray.length; i++ ) {
        if ( contentArray[ i ].value === value ) {
          buttons[ i ].pickable = false;
          buttons[ i ].cursor = null;
        }
        else {
          buttons[ i ].pickable = true;
          buttons[ i ].cursor = 'pointer';
        }
      }
    } );
  }
}

energySkatePark.register( 'SkaterRadioButtonGroup', SkaterRadioButtonGroup );

export default SkaterRadioButtonGroup;
