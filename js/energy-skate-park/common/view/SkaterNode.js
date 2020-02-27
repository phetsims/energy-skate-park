// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node for the skater, which is draggable.
 *
 * Converted to composition instead of inheritance for SkaterNode to work around updateSVGFragment problem, see #123
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const Image = require( 'SCENERY/nodes/Image' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  const skater1LeftImage = require( 'image!ENERGY_SKATE_PARK/skater1_left.png' );
  const skater1RightImage = require( 'image!ENERGY_SKATE_PARK/skater1_right.png' );
  const skater2LeftImage = require( 'image!ENERGY_SKATE_PARK/skater2_left.png' );
  const skater2RightImage = require( 'image!ENERGY_SKATE_PARK/skater2_right.png' );
  const skater3LeftImage = require( 'image!ENERGY_SKATE_PARK/skater3_left.png' );
  const skater3RightImage = require( 'image!ENERGY_SKATE_PARK/skater3_right.png' );
  const skater4LeftImage = require( 'image!ENERGY_SKATE_PARK/skater4_left.png' );
  const skater4RightImage = require( 'image!ENERGY_SKATE_PARK/skater4_right.png' );
  const skater5LeftImage = require( 'image!ENERGY_SKATE_PARK/skater5_left.png' );
  const skater5RightImage = require( 'image!ENERGY_SKATE_PARK/skater5_right.png' );
  const dogLeftImage = require( 'image!ENERGY_SKATE_PARK/dog_left.png' );
  const dogRightImage = require( 'image!ENERGY_SKATE_PARK/dog_right.png' );


  class SkaterNode extends Node {

    /**
     * SkaterNode constructor.
     *
     * @param {Skater} skater
     * @param {EnergySkateParkScreenView} view
     * @param {ModelViewTransform} modelViewTransform
     * @param {function} getClosestTrackAndPositionAndParameter - function that gets the closest track properties, used when
     *                                                            the skater is being dragged close to the track
     * @param {function} getPhysicalTracks - function that returns the physical tracks in the model, so the skater can try
     *                                       to attach to them while dragging
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( skater, view, modelViewTransform, getClosestTrackAndPositionAndParameter, getPhysicalTracks, tandem ) {
      super( {

        // rendering the skater with canvas makes it move smoothly around the screen edges in iOS Safari, see
        // https://github.com/phetsims/energy-skate-park/issues/42
        renderer: 'canvas',
        tandem: tandem
      } );

      // @private {Image} - left and right Images for the skater
      const leftSkaterImageNode = new Image( skater1LeftImage, {
        cursor: 'pointer',
        tandem: tandem.createTandem( 'leftSkaterImageNode' )
      } );
      const rightSkaterImageNode = new Image( skater1RightImage, {
        cursor: 'pointer',
        tandem: tandem.createTandem( 'rightSkaterImageNode' )
      } );
      this.children = [ leftSkaterImageNode, rightSkaterImageNode ];

      // @public {EnumerationProperty} - one of SkaterNode.SkaterImage, set this Property to change the Skater image
      this.skaterImageProperty = new EnumerationProperty( SkaterNode.SkaterImage, SkaterNode.SkaterImage.SKATER_1 );
      this.skaterImageProperty.link( skaterImage => {
        leftSkaterImageNode.image = skaterImage.leftImage;
        rightSkaterImageNode.image = skaterImage.rightImage;
      } );

      // @private {Skater}
      this.skater = skater;

      skater.directionProperty.link( direction => {
        leftSkaterImageNode.visible = direction === 'left';
        rightSkaterImageNode.visible = direction === 'right';
      } );

      const imageWidth = this.width;
      const imageHeight = this.height;

      // @private - Map from mass(kg) to the amount to scale the image
      const centerMassValue = skater.massRange.getCenter();
      const massToScale = new LinearFunction( centerMassValue, skater.massRange.max, 0.38, 0.5 );

      // Update the position and angle.  Normally the angle would only change if the position has also changed, so no need
      // for a duplicate callback there.  Uses pooling to avoid allocations, see #50
      this.skater.updatedEmitter.addListener( () => {
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

        const scale = massToScale( mass );
        const scalingMatrix = Matrix3.scaling( scale );
        matrix.multiplyMatrix( scalingMatrix );
        scalingMatrix.freeToPool();

        // Think of it as a multiplying the Vector2 to the right, so this step happens first actually.  Use it to center
        // the registration point
        const translation = Matrix3.translation( -imageWidth / 2, -imageHeight );
        matrix.multiplyMatrix( translation );
        translation.freeToPool();

        this.setMatrix( matrix );
      } );

      // Show a red dot in the bottom center as the important particle model coordinate
      const circle = new Circle( 8, { fill: 'red', x: imageWidth / 2, y: imageHeight } );
      this.addChild( circle );

      let targetTrack = null;

      let targetU = null;

      const dragSkater = event => {
        const globalPoint = this.globalToParentPoint( event.pointer.point );
        let position = modelViewTransform.viewToModelPosition( globalPoint );

        // make sure it is within the visible bounds
        position = view.availableModelBounds.getClosestPoint( position.x, position.y, position );

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
          skater.positionProperty.value = targetTrack.getPoint( targetU );
        }

        skater.updateEnergy();
        skater.updatedEmitter.emit();
      };

      // @private - for interruption, see interruptDrag
      this.dragHandler = new SimpleDragHandler( {
        tandem: tandem.createTandem( 'inputListener' ),
        start: event => {
          skater.draggingProperty.value = true;

          // Clear thermal energy whenever skater is grabbed, see #32
          skater.thermalEnergyProperty.value = 0;

          // Jump to the input position when dragged
          dragSkater( event );
        },

        drag: dragSkater,

        end: () => {

          // Record the state of the skater for "return skater"
          skater.released( targetTrack, targetU );
        }
      } );
      this.addInputListener( this.dragHandler );
    }

    /**
     * If dragging, interrupt and release the Skater.
     * @public
     */
    interruptDrag() {
      if ( this.dragHandler.isDraggingProperty.get() ) {
        this.dragHandler.interrupt();
      }
    }
  }

  // Collection of possible left and right images for the Skater.
  // @public
  // @static
  SkaterNode.SkaterImage = Enumeration.byMap( {
    SKATER_1: {
      leftImage: skater1LeftImage,
      rightImage: skater1RightImage
    },
    SKATER_2: {
      leftImage: skater2LeftImage,
      rightImage: skater2RightImage
    },
    SKATER_3: {
      leftImage: skater3LeftImage,
      rightImage: skater3RightImage
    },
    SKATER_4: {
      leftImage: skater4LeftImage,
      rightImage: skater4RightImage
    },
    SKATER_5: {
      leftImage: skater5LeftImage,
      rightImage: skater5RightImage
    },
    DOG: {
      leftImage: dogLeftImage,
      rightImage: dogRightImage
    }
  } );

  return energySkatePark.register( 'SkaterNode', SkaterNode );
} );
