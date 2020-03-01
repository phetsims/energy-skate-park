// Copyright 2013-2020, University of Colorado Boulder

/**
 * // REVIEW: It looks like ControlPoint is used on many (all?) screens, and can be controlled in more screens than
 * // REVIEW: just the playground screen.
 * Data structure for a control point, which allows the user to change the track shape in the 'playground' screen.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../../../axon/js/DerivedPropertyIO.js';
import Property from '../../../../../axon/js/Property.js';
import PropertyIO from '../../../../../axon/js/PropertyIO.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Vector2IO from '../../../../../dot/js/Vector2IO.js';
import Vector2Property from '../../../../../dot/js/Vector2Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import required from '../../../../../phet-core/js/required.js';
import PhetioObject from '../../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../../tandem/js/types/NullableIO.js';
import energySkatePark from '../../../energySkatePark.js';
import ControlPointIO from './ControlPointIO.js';

class ControlPoint extends PhetioObject {

  /**
   * @param x // REVIEW: @param types
   * @param y // REVIEW: @param types
   * @param {Object} [options]
   * @constructor
   */
  constructor( x, y, options ) {
    options = merge( {

      // {boolean} - can this control point specifically be dragged? In order to be draggable, the track itself must
      // be "configurable" and this must be true.
      draggable: true,

      // {Bounds2|null} - if specified, the ControlPoint will also be constrained to these bounds during dragging, or
      // when the track is bumped above ground, in model coordinates
      limitBounds: null,

      tandem: required( Tandem.REQUIRED ), // REVIEW: It seems odd to have required(REQUIRED)
      phetioType: ControlPointIO,
      phetioState: PhetioObject.DEFAULT_OPTIONS.phetioState
    }, options );
    const tandem = options.tandem;

    super( options );

    // @public (read-only) {Bounds2|null} - see option for information
    this.limitBounds = options.limitBounds;

    // @public (read-only) {boolean} - see options for information
    this.draggable = options.draggable;

    // @public (phet-io) {Tandem}
    this.controlPointTandem = tandem; // REVIEW - this is probably unnecessary, because PhetioObject.tandem already exists

    // @public - where it would be if it hadn't snapped to another point during dragging
    this.sourcePositionProperty = new Vector2Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'sourcePositionProperty' ),
      phetioState: options.phetioState // in state only if parent is
    } );

    // @public {ControlPoint} - Another ControlPoint that this ControlPoint is going to 'snap' to if released.
    this.snapTargetProperty = new Property( null, {
      tandem: tandem.createTandem( 'snapTargetProperty' ),
      phetioType: PropertyIO( NullableIO( ControlPointIO ) ),
      phetioState: options.phetioState // in state only if parent is // REVIEW: does parent mean "track this point is in"?
    } );

    // Where it is shown on the screen.  Same as sourcePosition (if not snapped) or snapTarget.position (if snapped).
    // Snapping means temporarily connecting to an adjacent open point before the tracks are joined, to indicate that a
    // connection is possible
    // @public {Vector2}
    this.positionProperty = new DerivedProperty( [ this.sourcePositionProperty, this.snapTargetProperty ],
      ( sourcePosition, snapTarget ) => snapTarget ? snapTarget.positionProperty.value : sourcePosition, {
        tandem: tandem.createTandem( 'positionProperty' ),
        phetioType: DerivedPropertyIO( Vector2IO ),
        phetioState: options.phetioState
      } );

    // @public {BooleanProperty} - whether the control point is currently being dragged
    this.draggingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'draggingProperty' )
    } );

    // @private
    this.disposeControlPoint = () => {
      this.positionProperty.dispose();
      this.sourcePositionProperty.dispose();
      this.snapTargetProperty.dispose();
      this.draggingProperty.dispose();
    };
  }

  /**
   * @public
   */
  dispose() {
    this.disposeControlPoint();
    super.dispose();
  }

  /**
   * Reset to initial state.
   * @public
   */
  reset() {
    this.sourcePositionProperty.reset();
    this.snapTargetProperty.reset();
    this.draggingProperty.reset();
  }

  /**
   * Create a new control point, identical to this one.
   * @param {Tandem} tandem
   * @returns {ControlPoint}
   */
  copy( tandem ) {
    return new ControlPoint( this.positionProperty.value.x, this.positionProperty.value.y, {
      tandem: tandem
    } );
  }
}

energySkatePark.register( 'ControlPoint', ControlPoint );
export default ControlPoint;