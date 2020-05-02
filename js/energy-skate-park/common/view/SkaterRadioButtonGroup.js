// Copyright 2020, University of Colorado Boulder

/**
 * A collection of radio buttons that controls skater image, independent of mass. Does not use RadioButtonGroup
 * because the buttons are in a layout that RadioButtonGroup does not yet support. But in the future, improvements
 * to RadioButtonGroup may make it possible to use that class, and this should be re-written accordingly.
 *
 * See https://github.com/phetsims/energy-skate-park/issues/263#issuecomment-620829413
 *
 * @author Jesse Greenberg
 */

import merge from '../../../../../phet-core/js/merge.js';
import RadioButtonGroupMember from '../../../../../sun/js/buttons/RadioButtonGroupMember.js';
import energySkatePark from '../../../energySkatePark.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Constants from '../Constants.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import SkaterNode from './SkaterNode.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import HBox from '../../../../../scenery/js/nodes/HBox.js';
import skater1Headshot from '../../../../images/skater1-headshot_png.js';
import skater2Headshot from '../../../../images/skater2-headshot_png.js';
import skater3Headshot from '../../../../images/skater3-headshot_png.js';
import skater4Headshot from '../../../../images/skater4-headshot_png.js';
import skater5Headshot from '../../../../images/skater5-headshot_png.js';
import dogHeadshot from '../../../../images/dog-headshot_png.js';

class SkaterRadioButtonGroup extends Node {

  /**
   * @param {Property.<Image>} skaterImageProperty
   * @param {Tandem} tandem
   */
  constructor( skaterImageProperty, tandem ) {
    super();

    const buttonOptions = {
      xMargin: Constants.RADIO_BUTTON_CONTENT_MARGIN,
      yMargin: 0,
      cornerRadius: Constants.RADIO_BUTTON_CORNER_RADIUS,
      selectedStroke: EnergySkateParkColorScheme.radioButtonSelectedStroke,
      baseColor: EnergySkateParkColorScheme.radioButtonBaseColor
    };

    const imageScale = 0.4;

    // matches the API of RadioButtonGroup
    const contentArray = [
      {
        value: SkaterNode.SkaterImage.SKATER_1,
        node: new Image( skater1Headshot, { scale: imageScale } ),
        tandemName: 'skater1'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_2,
        node: new Image( skater2Headshot, { scale: imageScale } ),
        tandemName: 'skater2'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_3,
        node: new Image( skater3Headshot, { scale: imageScale } ),
        tandemName: 'skater3'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_4,
        node: new Image( skater4Headshot, { scale: imageScale } ),
        tandemName: 'skater4'
      },
      {
        value: SkaterNode.SkaterImage.SKATER_5,
        node: new Image( skater5Headshot, { scale: imageScale } ),
        tandemName: 'skater5'
      },
      {
        value: SkaterNode.SkaterImage.DOG,
        node: new Image( dogHeadshot, { scale: imageScale } ),
        tandemName: 'dog'
      }
    ];

    const buttons = [];
    contentArray.forEach( content => {
      buttons.push( new RadioButtonGroupMember( skaterImageProperty, content.value, merge( {
        content: content.node,
        tandem: tandem.createTandem( content.tandemName )
      }, buttonOptions ) ) );
    } );

    const rows = [];
    for ( let i = 0; i < buttons.length; i += 3 ) {
      rows.push( new HBox( {
        children: buttons.slice( i, i + 3 ),
        spacing: 8,
        resize: false
      } ) );
    }

    // arrange buttons in a 2D grid
    this.addChild( new VBox( {
      children: rows,
      spacing: 2,
      resize: false
    } ) );

    // so that the selected button cannot continue to be clicked, a feature of RadioButtonGroup - this component is
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
