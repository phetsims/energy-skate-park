// Copyright 2013-2025, University of Colorado Boulder

/**
 * Data structure for a control point, which will define the shape of a Track. The ControlPoint may be draggable
 * by the user, and dragging the control point will update the shape of the Track.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkModel from './EnergySkateParkModel.js';

export default class ControlPoint extends PhetioObject {

  public readonly limitBounds: Bounds2 | null;
  public readonly interactive: boolean;

  // true if the ControlPoint is intended to be displayed visually
  public readonly visible: boolean;
  public readonly sourcePositionProperty: Vector2Property;

  // Another ControlPoint that this ControlPoint is going to 'snap' to if released.
  public readonly snapTargetProperty: Property<null | ControlPoint>;

  // Where it is shown on the screen.  Same as sourcePosition (if not snapped) or snapTarget.position (if snapped).
  // Snapping means temporarily connecting to an adjacent open point before the tracks are joined, to indicate that a
  // connection is possible
  public readonly positionProperty: TReadOnlyProperty<Vector2>;

  // whether the control point is currently being dragged
  public readonly draggingProperty: BooleanProperty;

  public constructor( x: number, y: number, options: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // {boolean} - if true, this control point will be displayed on the track
      visible: true,

      // {boolean} - can this control point specifically be dragged? If true, the control point is draggable,
      // changes opacity on over, and supports track splitting at the ControlPoint
      interactive: true,

      // {Bounds2|null} - if specified, the ControlPoint will also be constrained to these bounds during dragging, or
      // when the track is bumped above ground, in model coordinates
      limitBounds: null,

      tandem: Tandem.REQUIRED,
      phetioType: ControlPoint.ControlPointIO,
      phetioState: PhetioObject.DEFAULT_OPTIONS.phetioState
    }, options );
    const tandem = options.tandem;

    super( options );

    this.limitBounds = options.limitBounds;
    this.interactive = options.interactive;
    this.visible = options.visible;

    this.sourcePositionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'sourcePositionProperty' ),
      phetioState: options.phetioState // in state only if containing Track is
    } );

    this.snapTargetProperty = new Property<ControlPoint | null>( null, {
      tandem: tandem.createTandem( 'snapTargetProperty' ),
      phetioValueType: NullableIO( ControlPoint.ControlPointIO ),
      phetioState: options.phetioState // in state only if containing Track is
    } );

    this.positionProperty = new DerivedProperty( [ this.sourcePositionProperty, this.snapTargetProperty ],
      ( sourcePosition, snapTarget ) => snapTarget ? snapTarget.positionProperty.value : sourcePosition, {
        tandem: tandem.createTandem( 'positionProperty' ),
        phetioValueType: Vector2.Vector2IO,
        phetioState: options.phetioState
      } );

    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' ),
      phetioState: options.phetioState
    } );

    this.addDisposable( this.positionProperty, this.sourcePositionProperty, this.snapTargetProperty, this.draggingProperty );
  }

  /**
   * Reset to initial state.
   */
  public reset(): void {
    this.sourcePositionProperty.reset();
    this.snapTargetProperty.reset();
    this.draggingProperty.reset();
  }

  /**
   * Create a new control point, identical to this one.
   * TODO: https://github.com/phetsims/energy-skate-park/issues/123 is this reversed?  Maybe call on the model
   */
  public copy( model: EnergySkateParkModel ): ControlPoint {
    return model.controlPointGroup.createNextElement( this.positionProperty.value.x, this.positionProperty.value.y );
  }

  public static readonly ControlPointIO = new IOType( 'ControlPointIO', {
    valueType: ControlPoint,
    documentation: 'A control point that can manipulate the track.',
    toStateObject: controlPoint => {
      return { x: controlPoint.positionProperty.value.x, y: controlPoint.positionProperty.value.y };
    },
    stateSchema: {
      x: NumberIO,
      y: NumberIO
    },
    stateObjectToCreateElementArguments: stateObject => {
      assert && assert( typeof stateObject.x === 'number' );
      return [ stateObject.x, stateObject.y ];
    }
  } );
}

energySkatePark.register( 'ControlPoint', ControlPoint );