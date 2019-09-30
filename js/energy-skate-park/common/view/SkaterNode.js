// Copyright 2013-2019, University of Colorado Boulder

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
  const Image = require( 'SCENERY/nodes/Image' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Matrix3 = require( 'DOT/Matrix3' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  const skaterLeftImage = require( 'image!ENERGY_SKATE_PARK/skater-left.png' );
  const skaterRightImage = require( 'image!ENERGY_SKATE_PARK/skater-right.png' );

  class SkaterNode extends Node {

    /**
     * SkaterNode constructor.
     *
     * @param {Skater} skater
     * @param {EnergySkateParkScreenView} view
     * @param {ModelViewTransform} modelViewTransform
     * @param {function} getClosestTrackAndPositionAndParameter function that gets the closest track properties, used when
     * the skater is being dragged close to the track
     * @param {function} getPhysicalTracks function that returns the physical tracks in the model, so the skater can try
     * to attach to them while dragging
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( skater, view, modelViewTransform, getClosestTrackAndPositionAndParameter, getPhysicalTracks, tandem ) {
      const leftSkaterImageNode = new Image( skaterLeftImage, {
        cursor: 'pointer',
        tandem: tandem.createTandem( 'leftSkaterImageNode' )
      } );
      const rightSkaterImageNode = new Image( skaterRightImage, {
        cursor: 'pointer',
        tandem: tandem.createTandem( 'rightSkaterImageNode' )
      } );

      super( {
        children: [ leftSkaterImageNode, rightSkaterImageNode ],
        renderer: 'canvas',
        tandem: tandem
      } );

      this.skater = skater;

      skater.directionProperty.link( direction => {
        leftSkaterImageNode.visible = direction === 'left';
        rightSkaterImageNode.visible = direction === 'right';
      } );

      const imageWidth = this.width;
      const imageHeight = this.height;

      // @private - Map from mass(kg) to the amount to scale the image
      const centerMassValue = skater.massRange.getCenter();
      const massToScale = new LinearFunction( centerMassValue, skater.massRange.max, 0.34, 0.43 );

      // Update the position and angle.  Normally the angle would only change if the position has also changed, so no need
      // for a duplicate callback there.  Uses pooling to avoid allocations, see #50
      this.skater.updatedEmitter.addListener( () => {
        const mass = skater.massProperty.value;
        const position = skater.positionProperty.value;
        const angle = skater.angleProperty.value;

        const view = modelViewTransform.modelToViewPosition( position );

        // Translate to the desired location
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

            skater.angleProperty.value = targetTrack.getViewAngleAt( targetU ) + (skater.onTopSideOfTrackProperty.value ? 0 : Math.PI);

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

      this.addInputListener( new SimpleDragHandler( {
        tandem: tandem.createTandem( 'inputListener' ),
        start: event => {
          skater.draggingProperty.value = true;

          // Clear thermal energy whenever skater is grabbed, see #32
          skater.thermalEnergyProperty.value = 0;

          // Jump to the input location when dragged
          dragSkater( event );
        },

        drag: dragSkater,

        end: () => {

          // Record the state of the skater for "return skater"
          skater.released( targetTrack, targetU );
        }
      } ) );
    }
  }

  return energySkatePark.register( 'SkaterNode', SkaterNode );
} );
