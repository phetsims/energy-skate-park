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
  const inherit = require( 'PHET_CORE/inherit' );
  const NullableIO = require( 'TANDEM/types/NullableIO' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   *
   * @param x
   * @param y
   * @param {Object} options - required
   * @constructor
   */
  function ControlPoint( x, y, options ) {
    const self = this;

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
      function( sourcePosition, snapTarget ) {
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

    PhetioObject.call( this, options );

    // @private
    this.disposeControlPoint = function() {
      self.positionProperty.dispose();
      self.sourcePositionProperty.dispose();
      self.snapTargetProperty.dispose();
      self.draggingProperty.dispose();
    };
  }

  energySkatePark.register( 'ControlPoint', ControlPoint );

  return inherit( PhetioObject, ControlPoint, {

    /**
     * @public
     */
    dispose: function() {
      this.disposeControlPoint();
      PhetioObject.prototype.dispose.call( this );
    },

    reset: function() {
      this.sourcePositionProperty.reset();
      this.snapTargetProperty.reset();
      this.draggingProperty.reset();
    },

    copy: function( tandem ) {
      return new ControlPoint( this.positionProperty.value.x, this.positionProperty.value.y, {
        tandem: tandem
      } );
    }
  } );
} );