// Copyright 2013-2026, University of Colorado Boulder

/**
 * Scenery node for the skater, which is draggable.
 *
 * Converted to composition instead of inheritance for SkaterNode to work around updateSVGFragment problem, see #123
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import GrabDragInteraction from '../../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import Skater from '../model/Skater.js';
import Track from '../model/Track.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import SkaterImageSet from './SkaterImageSet.js';

// Movement step sizes in model coordinates
const POSITION_DELTA = 0.1; // meters for off-track movement
const POSITION_DELTA_SHIFT = 0.025; // meters, slower movement with shift
const PARAMETRIC_DELTA = 0.02; // parametric units for on-track movement
const PARAMETRIC_DELTA_SHIFT = 0.005; // slower parametric movement with shift

export default class SkaterNode extends Node {
  public readonly skaterImageSetProperty: TReadOnlyProperty<SkaterImageSet>;
  public readonly selectedSkaterProperty: NumberProperty;
  private readonly dragListener: SoundDragListener;
  private readonly grabDragInteraction: GrabDragInteraction;

  // Track the track and position where skater will be released (for keyboard drag)
  private keyboardTargetTrack: Track | null = null;
  private keyboardTargetU: number | null = null;

  /**
   * SkaterNode constructor.
   *
   * @param skater
   * @param view
   * @param userControlledProperty
   * @param modelViewTransform
   * @param getClosestTrackAndPositionAndParameter - gets the closest track
   *                                            properties, used when the skater is being dragged close to the track.
   *                                            See EnergySkateParkModel.getClosestTrackAndPositionAndParameter
   * @param getPhysicalTracks - function that returns the physical tracks in the model, so the skater can try
   *                                       to attach to them while dragging
   * @param tandem
   */
  public constructor(
    private readonly skater: Skater,
    view: EnergySkateParkScreenView, userControlledProperty: BooleanProperty, modelViewTransform: ModelViewTransform2,
    getClosestTrackAndPositionAndParameter: ( v: Vector2, t: Track[] ) => { track: Track; parametricPosition: number; point: Vector2 } | null, getPhysicalTracks: () => Track[], tandem: Tandem ) {
    super( {

      // prevent fitted blocks for the Skater to improve performance, see #213
      preventFit: true,
      tandem: tandem
    } );

    this.selectedSkaterProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'selectedSkaterProperty' ),
      validValues: SkaterImageSet.SKATER_IMAGE_SETS.map( ( value, index ) => index )
    } );

    this.skaterImageSetProperty = new DerivedProperty( [ this.selectedSkaterProperty ], selectedSkater => {
      return SkaterImageSet.SKATER_IMAGE_SETS[ selectedSkater ];
    } );

    // left and right Images for the skater
    const leftSkaterImageNode = new Image( this.skaterImageSetProperty.value.leftImageProperty, {
      cursor: 'pointer',
      tandem: tandem.createTandem( 'leftSkaterImageNode' )
    } );
    const rightSkaterImageNode = new Image( this.skaterImageSetProperty.value.rightImageProperty, {
      cursor: 'pointer',
      tandem: tandem.createTandem( 'rightSkaterImageNode' )
    } );
    this.children = [ leftSkaterImageNode, rightSkaterImageNode ];

    // Show a red dot in the bottom center as the important particle model coordinate
    const circle = new Circle( 8, { fill: 'red' } );
    this.addChild( circle );

    let imageWidth: number;
    let imageHeight: number;

    this.skater = skater;

    this.skaterImageSetProperty.link( skaterImageSet => {
      leftSkaterImageNode.setImageProperty( skaterImageSet.leftImageProperty );
      rightSkaterImageNode.setImageProperty( skaterImageSet.rightImageProperty );

      imageWidth = leftSkaterImageNode.width;
      imageHeight = leftSkaterImageNode.height;

      circle.x = imageWidth / 2;
      circle.y = imageHeight;

      // image dimensions might have changed, update matrix (which horizontally centers the image around the position)
      this.skater.updatedEmitter.emit();
    } );

    skater.directionProperty.link( direction => {
      leftSkaterImageNode.visible = direction === 'left';
      rightSkaterImageNode.visible = direction === 'right';
    } );

    // Map from mass(kg) to the amount to scale the image
    const centerMassValue = skater.massRange.getCenter();
    const massToScale = new LinearFunction( centerMassValue, skater.massRange.max, 0.46, 0.614 );

    // make the SkaterNode invisible  until the first update so it isn't displayed in the wrong location before
    // the matrix is set on the first update
    this.visible = false;

    // Update the position and angle.  Normally the angle would only change if the position has also changed, so no need
    // for a duplicate callback there.
    this.skater.updatedEmitter.addListener( () => {

      // update visibility on first model update
      if ( !this.visible ) {
        this.visible = true;
      }

      const mass = skater.massProperty.value;
      const position = skater.positionProperty.value;
      const angle = skater.angleProperty.value;

      const viewPosition = modelViewTransform.modelToViewPosition( position );

      // Translate to the desired position
      const matrix = Matrix3.translation( viewPosition.x, viewPosition.y );

      // Rotate about the pivot (bottom center of the skater)
      const rotationMatrix = Matrix3.rotation2( angle );
      matrix.multiplyMatrix( rotationMatrix );
      rotationMatrix.freeToPool();

      const scale = massToScale.evaluate( mass );
      const scalingMatrix = Matrix3.scaling( scale );
      matrix.multiplyMatrix( scalingMatrix );
      scalingMatrix.freeToPool();

      // Inverting the scale of the red circle so it always stays the same size
      circle.setRadius( 3.5 / scale );

      // Think of it as a multiplying the Vector2 to the right, so this step happens first actually.  Use it to center
      // the registration point
      const translation = Matrix3.translation( -imageWidth / 2, -imageHeight );
      matrix.multiplyMatrix( translation );
      translation.freeToPool();

      this.setMatrix( matrix );

    } );

    let targetTrack: Track | null = null;

    let targetU: number | null = null;

    const dragSkater = ( event: SceneryEvent ) => {
      const globalPoint = this.globalToParentPoint( event.pointer.point );
      let position = modelViewTransform.viewToModelPosition( globalPoint );

      // make sure it is within the visible bounds
      position = view.availableModelBounds!.getClosestPoint( position.x, position.y, position );

      // PERFORMANCE/ALLOCATION: lots of unnecessary allocations and computation here, biggest improvement could be
      // to use binary search for position on the track
      const closestTrackAndPositionAndParameter = getClosestTrackAndPositionAndParameter( position, getPhysicalTracks() );
      let closeEnough = false;
      if ( closestTrackAndPositionAndParameter && closestTrackAndPositionAndParameter.track && closestTrackAndPositionAndParameter.track.isParameterInBounds( closestTrackAndPositionAndParameter.parametricPosition ) ) {
        const closestPoint = closestTrackAndPositionAndParameter.point;
        const distance = closestPoint.distance( position );
        if ( distance < 0.5 ) {
          position = closestPoint;
          targetTrack = closestTrackAndPositionAndParameter.track;
          targetU = closestTrackAndPositionAndParameter.parametricPosition;

          // Choose the right side of the track, i.e. the side of the track that would have the skater upside up
          const normal = targetTrack.getUnitNormalVector( targetU );
          skater.onTopSideOfTrackProperty.value = normal.y > 0;

          skater.angleProperty.value = targetTrack.getViewAngleAt( targetU ) + ( skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

          closeEnough = true;
        }
      }
      if ( !closeEnough ) {
        targetTrack = null;
        targetU = null;

        // make skater upright if not near the track
        skater.angleProperty.value = 0;
        skater.onTopSideOfTrackProperty.value = true;

        skater.positionProperty.value = position;
      }

      else {
        skater.positionProperty.value = targetTrack!.getPoint( targetU! );
      }

      skater.updateEnergy();
      skater.updatedEmitter.emit();
    };

    // for interruption, see interruptDrag
    this.dragListener = new SoundDragListener( {
      tandem: tandem.createTandem( 'dragListener' ),
      start: event => {
        userControlledProperty.set( true );
        skater.draggingProperty.value = true;

        // Clear thermal energy whenever skater is grabbed, see #32
        skater.thermalEnergyProperty.value = 0;

        // Jump to the input position when dragged
        dragSkater( event );
      },

      drag: dragSkater,

      end: () => {

        // Record the state of the skater for "return skater"
        skater.released( targetTrack, targetU! );

        userControlledProperty.set( false );
      }
    } );
    this.addInputListener( this.dragListener );

    // Create a KeyboardDragListener for keyboard-based movement while grabbed
    const keyboardDragListener = new KeyboardDragListener( {
      tandem: Tandem.OPT_OUT, // GrabDragInteraction will handle instrumentation
      dragSpeed: 300, // View coordinates per second - provides continuous smooth motion
      shiftDragSpeed: 75, // Slower speed when shift is held for fine control
      drag: () => {
        // Handle keyboard movement based on whether skater is on-track or off-track
        this.handleKeyboardDrag( skater, view, getClosestTrackAndPositionAndParameter, getPhysicalTracks );
      }
    } );

    // Create GrabDragInteraction for the grab/release paradigm
    this.grabDragInteraction = new GrabDragInteraction( this, keyboardDragListener, view, {
      objectToGrabString: EnergySkateParkStrings.a11y.skaterNode.accessibleNameStringProperty,
      tandem: tandem.createTandem( 'grabDragInteraction' ),

      onGrab: () => {
        userControlledProperty.set( true );
        skater.draggingProperty.value = true;

        // Clear thermal energy whenever skater is grabbed
        skater.thermalEnergyProperty.value = 0;

        // Initialize keyboard target tracking
        this.keyboardTargetTrack = skater.trackProperty.value;
        this.keyboardTargetU = skater.parametricPositionProperty.value;
      },

      onRelease: () => {
        // Record the state of the skater for "return skater"
        skater.released( this.keyboardTargetTrack, this.keyboardTargetU ?? 0 );

        userControlledProperty.set( false );

        // Note: draggingProperty is set to false in skater.released()
      }
    } );
  }

  /**
   * Handle keyboard drag movement. This is called continuously while arrow keys are held.
   */
  private handleKeyboardDrag(
    skater: Skater,
    view: EnergySkateParkScreenView,
    getClosestTrackAndPositionAndParameter: ( v: Vector2, t: Track[] ) => { track: Track; parametricPosition: number; point: Vector2 } | null,
    getPhysicalTracks: () => Track[]
  ): void {
    const track = skater.trackProperty.value;

    // Determine which keys are pressed
    const leftPressed = phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'arrowLeft' ) ||
                        phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'a' );
    const rightPressed = phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'arrowRight' ) ||
                         phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'd' );
    const upPressed = phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'arrowUp' ) ||
                      phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'w' );
    const downPressed = phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 'arrowDown' ) ||
                        phet.scenery.globalKeyStateTracker.isEnglishKeyDown( 's' );
    const shiftPressed = phet.scenery.globalKeyStateTracker.shiftKeyDown;

    if ( track ) {
      // On-track movement: use parametric position
      this.handleOnTrackKeyboardDrag( skater, track, leftPressed, rightPressed, upPressed, shiftPressed );
    }
    else {
      // Off-track movement: use 2D position
      this.handleOffTrackKeyboardDrag( skater, view, leftPressed, rightPressed, upPressed, downPressed, shiftPressed,
        getClosestTrackAndPositionAndParameter, getPhysicalTracks );
    }
  }

  /**
   * Handle keyboard movement when skater is on the track (parametric movement).
   */
  private handleOnTrackKeyboardDrag(
    skater: Skater,
    track: Track,
    leftPressed: boolean,
    rightPressed: boolean,
    upPressed: boolean,
    shiftPressed: boolean
  ): void {
    const currentU = skater.parametricPositionProperty.value;
    const delta = shiftPressed ? PARAMETRIC_DELTA_SHIFT : PARAMETRIC_DELTA;

    // Determine direction based on which side of track we're on
    const onTop = skater.onTopSideOfTrackProperty.value;

    if ( leftPressed && !rightPressed ) {
      const direction = onTop ? -1 : 1;
      this.moveAlongTrack( skater, track, currentU, delta * direction );
    }
    else if ( rightPressed && !leftPressed ) {
      const direction = onTop ? 1 : -1;
      this.moveAlongTrack( skater, track, currentU, delta * direction );
    }
    else if ( upPressed ) {
      // Detach from track
      this.detachFromTrack( skater, track );
    }
    // Down does nothing when on track
  }

  /**
   * Move the skater along the track by a delta in parametric space.
   */
  private moveAlongTrack( skater: Skater, track: Track, currentU: number, deltaU: number ): void {
    const newU = currentU + deltaU;

    if ( track.isParameterInBounds( newU ) ) {
      skater.parametricPositionProperty.value = newU;
      skater.positionProperty.value = track.getPoint( newU );
      skater.angleProperty.value = track.getViewAngleAt( newU ) +
                                   ( skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

      // Clear velocity when moving with keyboard
      skater.velocityProperty.value = new Vector2( 0, 0 );
      skater.parametricSpeedProperty.value = 0;

      skater.updateEnergy();
      skater.updatedEmitter.emit();

      // Update keyboard target for release
      this.keyboardTargetTrack = track;
      this.keyboardTargetU = newU;
    }
    else {
      // At end of track, detach
      this.detachFromTrack( skater, track );
    }
  }

  /**
   * Detach the skater from the track.
   */
  private detachFromTrack( skater: Skater, track: Track ): void {
    const u = skater.parametricPositionProperty.value;
    const normal = track.getUnitNormalVector( u );
    const launchDirection = skater.onTopSideOfTrackProperty.value ? normal : normal.negated();

    // Detach from track
    skater.trackProperty.value = null;
    skater.angleProperty.value = 0;

    // Move slightly in the normal direction
    const currentPosition = skater.positionProperty.value;
    skater.positionProperty.value = currentPosition.plus( launchDirection.timesScalar( 0.1 ) );

    skater.updateEnergy();
    skater.updatedEmitter.emit();

    // Update keyboard target for release
    this.keyboardTargetTrack = null;
    this.keyboardTargetU = null;
  }

  /**
   * Handle keyboard movement when skater is off the track (2D movement).
   */
  private handleOffTrackKeyboardDrag(
    skater: Skater,
    view: EnergySkateParkScreenView,
    leftPressed: boolean,
    rightPressed: boolean,
    upPressed: boolean,
    downPressed: boolean,
    shiftPressed: boolean,
    getClosestTrackAndPositionAndParameter: ( v: Vector2, t: Track[] ) => { track: Track; parametricPosition: number; point: Vector2 } | null,
    getPhysicalTracks: () => Track[]
  ): void {
    const delta = shiftPressed ? POSITION_DELTA_SHIFT : POSITION_DELTA;
    let dx = 0;
    let dy = 0;

    if ( leftPressed && !rightPressed ) {
      dx = -delta;
    }
    else if ( rightPressed && !leftPressed ) {
      dx = delta;
    }

    if ( upPressed && !downPressed ) {
      dy = delta;
    }
    else if ( downPressed && !upPressed ) {
      dy = -delta;
    }

    if ( dx !== 0 || dy !== 0 ) {
      let newPosition = skater.positionProperty.value.plusXY( dx, dy );

      // Keep within available bounds
      if ( view.availableModelBounds ) {
        newPosition = view.availableModelBounds.closestPointTo( newPosition );
      }

      // Check if we're close to a track and should snap to it
      const closestTrackAndPositionAndParameter = getClosestTrackAndPositionAndParameter( newPosition, getPhysicalTracks() );
      if ( closestTrackAndPositionAndParameter &&
           closestTrackAndPositionAndParameter.track &&
           closestTrackAndPositionAndParameter.track.isParameterInBounds( closestTrackAndPositionAndParameter.parametricPosition ) ) {
        const distance = closestTrackAndPositionAndParameter.point.distance( newPosition );
        if ( distance < 0.5 ) {
          // Snap to track
          const track = closestTrackAndPositionAndParameter.track;
          const u = closestTrackAndPositionAndParameter.parametricPosition;

          skater.trackProperty.value = track;
          skater.parametricPositionProperty.value = u;
          skater.positionProperty.value = track.getPoint( u );

          const normal = track.getUnitNormalVector( u );
          skater.onTopSideOfTrackProperty.value = normal.y > 0;
          skater.angleProperty.value = track.getViewAngleAt( u ) +
                                       ( skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

          this.keyboardTargetTrack = track;
          this.keyboardTargetU = u;

          skater.updateEnergy();
          skater.updatedEmitter.emit();
          return;
        }
      }

      // Not close to track, just update position
      skater.positionProperty.value = newPosition;
      skater.angleProperty.value = 0;
      skater.onTopSideOfTrackProperty.value = true;

      // Clear velocity
      skater.velocityProperty.value = new Vector2( 0, 0 );

      skater.updateEnergy();
      skater.updatedEmitter.emit();

      // Update keyboard target for release
      this.keyboardTargetTrack = null;
      this.keyboardTargetU = null;
    }
  }

  /**
   * If dragging, interrupt and release the Skater.
   */
  public interruptDrag(): void {
    if ( this.dragListener.isPressed ) {
      this.dragListener.interrupt();
    }
  }
}

energySkatePark.register( 'SkaterNode', SkaterNode );
