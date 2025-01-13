// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node for the skater, which is draggable.
 *
 * Converted to composition instead of inheritance for SkaterNode to work around updateSVGFragment problem, see #123
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, DragListener, Image, Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import Skater from '../model/Skater.js';
import Track from '../model/Track.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import SkaterImageSet from './SkaterImageSet.js';

class SkaterNode extends Node {
  public readonly skaterImageSetProperty: Property<SkaterImageSet>;
  private readonly dragListener: DragListener;

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
    getClosestTrackAndPositionAndParameter: ( v: Vector2, t: Track[] ) => IntentionalAny, getPhysicalTracks: () => Track[], tandem: Tandem ) {
    super( {

      // rendering the skater with canvas makes it move smoothly around the screen edges in iOS Safari, see
      // https://github.com/phetsims/energy-skate-park/issues/42
      renderer: 'canvas',

      // prevent fitted blocks for the Skater to improve performance, see #213
      preventFit: true,
      tandem: tandem
    } );

    this.skaterImageSetProperty = new Property( SkaterImageSet.SKATER_IMAGE_SETS[ 0 ], {
      validValues: SkaterImageSet.SKATER_IMAGE_SETS
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
      // @ts-expect-error
      leftSkaterImageNode.visible = direction === Skater.Direction.LEFT;
      // @ts-expect-error
      rightSkaterImageNode.visible = direction === Skater.Direction.RIGHT;
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

      const view = modelViewTransform.modelToViewPosition( position );

      // Translate to the desired position
      const matrix = Matrix3.translation( view.x, view.y );

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

    // @ts-expect-error
    const dragSkater = event => {
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
          const normal = targetTrack!.getUnitNormalVector( targetU! );
          skater.onTopSideOfTrackProperty.value = normal.y > 0;

          skater.angleProperty.value = targetTrack!.getViewAngleAt( targetU! ) + ( skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

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
    this.dragListener = new DragListener( {
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
export default SkaterNode;