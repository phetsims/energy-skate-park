// Copyright 2013-2019, University of Colorado Boulder

/**
 * Data structure for a control point, which allows the user to change the track shape in the 'playground' screen.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const ControlPointIO = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPointIO' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  class ControlPoint extends PhetioObject {

    /**
     * @param x
     * @param y
     * @param {Object} options - required
     * @constructor
     */
    constructor( x, y, options ) {
      options = _.extend( {

        // {boolean} - can this control point specifically be dragged? In order to be draggable, the track itself must
        // be "configurable" and this must be true.
        draggable: true,

        // {Bounds2|null} - if specified, the ControlPoint will also be constrained to these bounds during dragging
        limitBounds: null,

        tandem: Tandem.required,
        phetioType: ControlPointIO,
        phetioState: PhetioObject.DEFAULT_OPTIONS.phetioState
      }, options );
      const tandem = options.tandem;

      super( options );

      // @public (read-only) {Bounds2|null} - see option for information
      this.limitBounds = options.limitBounds;

      // @public (read-only) {boolean} - see options for information
      this.draggable = options.draggable;

      // @public (phet-io)
      this.controlPointTandem = tandem;

      // Where it would be if it hadn't snapped to another point during dragging
      this.sourcePositionProperty = new Vector2Property( new Vector2( x, y ), {
        tandem: tandem.createTandem( 'sourcePositionProperty' ),
        phetioState: options.phetioState // in state only if parent is
      } );

      // @public {ControlPoint} - Another ControlPoint that this ControlPoint is going to 'snap' to if released.
      this.snapTargetProperty = new Property( null, {
        tandem: tandem.createTandem( 'snapTargetProperty' ),
        phetioType: PropertyIO( NullableIO( ControlPointIO ) ),
        phetioState: options.phetioState // in state only if parent is
      } );

      // Where it is shown on the screen.  Same as sourcePosition (if not snapped) or snapTarget.position (if snapped).
      // Snapping means temporarily connecting to an adjacent open point before the tracks are joined, to indicate that a
      // connection is possible
      // @public {Vector2}
      this.positionProperty = new DerivedProperty( [ this.sourcePositionProperty, this.snapTargetProperty ],
        ( sourcePosition, snapTarget ) => {
          return snapTarget ? snapTarget.positionProperty.value : sourcePosition;
        }, {
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
        self.positionProperty.dispose();
        self.sourcePositionProperty.dispose();
        self.snapTargetProperty.dispose();
        self.draggingProperty.dispose();
      };
    }

    /**
     * @public
     */
    dispose() {
      this.disposeControlPoint();
      PhetioObject.prototype.dispose.call( this );
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

  return energySkatePark.register( 'ControlPoint', ControlPoint );
} );