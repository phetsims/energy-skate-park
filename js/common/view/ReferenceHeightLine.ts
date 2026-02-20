// Copyright 2018-2026, University of Colorado Boulder

/**
 * A node that shows the potential energy reference height in energy-skate-park. The line is a dashed
 * line that extends horizontally across the screen. The line can be dragged by clicking on a double headed arrow.
 * The origin for this node is the left edge of the line.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SoundKeyboardDragListener from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import TextPanel from './TextPanel.js';

const heightEqualsZeroStringProperty = EnergySkateParkFluent.heightLabels.heightEqualsZeroStringProperty;

export default class ReferenceHeightLine extends InteractiveHighlighting( Node ) {

  public constructor( modelViewTransform: ModelViewTransform2, referenceHeightProperty: NumberProperty, referenceHeightVisibleProperty: TReadOnlyProperty<boolean>, userControlledProperty: TProperty<boolean>, tandem: Tandem ) {

    // line will extend 9.5 meters through along the grid in model coordinates
    const lineLength = modelViewTransform.modelToViewDeltaX( 9.5 );

    // the line will be composed of two lines on top of each other to assist with line visibility but still look like
    // a dashed line - a taller black line to mimic stroke behind a shorter blue line
    const lineDash = [ 12, 9 ];
    const lineStart = new Vector2( 0, 0 );
    const lineEnd = new Vector2( lineLength, 0 );
    const frontLine = new Line( lineStart, lineEnd, {
      lineWidth: 4,
      lineDash: lineDash,
      stroke: 'rgb(74,133,208)'
    } );
    const backLine = new Line( lineStart, lineEnd, {
      lineWidth: 6,
      lineDash: lineDash,
      stroke: 'black'
    } );

    // make the front line a bit easier to pick up
    frontLine.mouseArea = frontLine.bounds.dilated( 5 );
    frontLine.touchArea = frontLine.mouseArea;

    // double headed arrow indicates this line is draggable
    const doubleArrowNode = new ArrowNode( 0, -14, 0, 14, {
      doubleHead: true,
      headWidth: 15,
      tailWidth: 7,

      left: 30,
      fill: EnergySkateParkColorScheme.referenceArrowFill
    } );

    // label for the reference line, surround by a transparent panel for better visibility
    const textPanel = new TextPanel( heightEqualsZeroStringProperty, { textMaxWidth: 125 } );

    textPanel.setLeftCenter( doubleArrowNode.rightTop );

    super( {
      children: [ backLine, frontLine, doubleArrowNode, textPanel ],

      // so it is clear that it can be picked up
      cursor: 'pointer',

      // pdom - make the reference height line focusable for keyboard interaction
      tagName: 'div',
      focusable: true,
      ariaRole: 'slider',
      accessibleName: EnergySkateParkFluent.a11y.referenceHeightLine.accessibleNameStringProperty,
      descriptionContent: EnergySkateParkFluent.a11y.referenceHeightLine.accessibleHelpTextStringProperty
    } );

    // listeners, no need to dispose as the ReferenceHeightLine is never destroyed
    referenceHeightProperty.link( height => {

      // position the reference height line, model value in meters
      this.y = modelViewTransform.modelToViewY( height );
    } );

    // update visibility with model Property and reset reference height when node is no longer visible to avoid
    // confusion
    referenceHeightVisibleProperty.link( visible => {
      referenceHeightProperty.reset();

      this.visible = visible;
    } );

    // Maps the referenceHeightProperty (NumberProperty) to a Vector2Property required by DragListener, bidirectional
    // so that changing the dragPositionProperty updates the referenceHeightProperty correctly
    const dragPositionProperty = new DynamicProperty( new Property( referenceHeightProperty ), {

      // so that this Property can be set by the DragListener
      bidirectional: true,
      map: ( referenceHeight: number ) => {

        // maps referenceHeightProperty value to a Vector2Property for the drag listener
        return new Vector2( 0, referenceHeight );
      },
      inverseMap: positionVector => {

        // maps drag position Vector2 to the new value for referenceHeightProperty
        return referenceHeightProperty.range.constrainValue( positionVector.y );
      }
    } );

    this.addInputListener( new SoundDragListener( {
      transform: modelViewTransform,
      positionProperty: dragPositionProperty,

      // signify when user is using this control so that
      start: () => {
        userControlledProperty.set( true );
      },
      end: () => {
        userControlledProperty.set( false );
      },
      tandem: tandem.createTandem( 'dragListener' )
    } ) );

    // Keyboard drag listener for alternative input
    const keyboardDragListener = new SoundKeyboardDragListener( {
      transform: modelViewTransform,
      positionProperty: dragPositionProperty,
      dragSpeed: 200, // View coordinates per second - provides continuous smooth motion
      shiftDragSpeed: 50, // Slower speed when shift is held for fine control
      start: () => {
        userControlledProperty.set( true );
      },
      end: () => {
        userControlledProperty.set( false );
      },
      tandem: tandem.createTandem( 'keyboardDragListener' )
    } );
    this.addInputListener( keyboardDragListener );
  }
}

energySkatePark.register( 'ReferenceHeightLine', ReferenceHeightLine );