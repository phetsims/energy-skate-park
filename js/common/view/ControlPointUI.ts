// Copyright 2014-2025, University of Colorado Boulder

/**
 * Node that shows the delete and cut buttons for track control points.  Created each time a control point is dragged.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Color from '../../../../scenery/js/util/Color.js';
import scissorsShape from '../../../../sherpa/js/fontawesome-4/scissorsShape.js';
import timesCircleSolidShape from '../../../../sherpa/js/fontawesome-5/timesCircleSolidShape.js';
import RoundPushButton from '../../../../sun/js/buttons/RoundPushButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import Track from '../model/Track.js';

export default class ControlPointUI extends Node {
  public readonly clickToDismissListener: { down: () => void };

  /**
   * Constructor for the ControlPointUI for a single control point.
   * @param model the main model
   * @param track the track associated with the control point
   * @param controlPointIndex the 0-based index of the control point
   * @param modelViewTransform the main model-view transform
   * @param parentNode
   * @param tandem
   */
  public constructor( model: EnergySkateParkModel, track: Track, controlPointIndex: number, modelViewTransform: ModelViewTransform2, parentNode: Node, tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioState: false,
      visiblePropertyOptions: { phetioState: false }
    } );

    // See ComboBox.js
    let enableClickToDismissListener = true;

    // listener for 'click outside to dismiss'
    this.clickToDismissListener = {
      down: () => {
        if ( enableClickToDismissListener ) {
          if ( _.indexOf( phet.joist.display.getInputListeners(), this.clickToDismissListener ) !== -1 ) {
            phet.joist.display.removeInputListener( this.clickToDismissListener );
          }
          this.detach();
        }
        else {

          // in case pointer goes 'up' after being moved off of the cut button, we still want to enable click
          // to dismiss
          enableClickToDismissListener = true;
        }
      }
    };
    phet.joist.display.addInputListener( this.clickToDismissListener );

    const isEndPoint = controlPointIndex === 0 || controlPointIndex === track.controlPoints.length - 1;
    const alpha = new LinearFunction( 0, track.controlPoints.length - 1, track.minPoint, track.maxPoint ).evaluate( controlPointIndex );
    const position = track.getPoint( alpha );
    const angle = track.getViewAngleAt( alpha );
    const modelAngle = track.getModelAngleAt( alpha );

    const disableDismissAction = { down: () => { enableClickToDismissListener = false; } };

    // {RoundPushButton|null} - may not be defined, but reference kept for disposal
    let cutButton = null;

    // Add a scissors cut button, but only for interior points and only if there aren't too many control points already
    if ( !isEndPoint && model.canCutTrackControlPoint() ) {
      const scissorNode = new Path( scissorsShape, { fill: 'black', rotation: angle - Math.PI / 2 } );
      cutButton = new RoundPushButton( {
        tandem: tandem.createTandem( 'cutButton' ),
        phetioState: false,
        visiblePropertyOptions: { phetioState: false },

        content: scissorNode,
        listener: () => {
          model.splitControlPoint( track, controlPointIndex, modelAngle );
        },
        center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 50, angle + Math.PI / 2 ) ),
        radius: 20,
        touchAreaDilation: 5,

        xMargin: 8,
        yMargin: 8,

        // yellow color scheme
        baseColor: new Color( '#fefd53' )
      } );
      cutButton.addInputListener( disableDismissAction );
      this.addChild( cutButton );

      this.addDisposable( cutButton );
    }

    // Show the delete button.
    const deleteNode = new Path( timesCircleSolidShape, { fill: 'red', scale: 0.6 } );
    const deleteButton = new RoundPushButton( {
      tandem: tandem.createTandem( 'deleteButton' ),
      phetioState: false,
      visiblePropertyOptions: { phetioState: false },

      listener: () => {
        model.deleteControlPoint( track, controlPointIndex );
      },
      content: deleteNode,
      center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 50, angle - Math.PI / 2 ) ),
      radius: 20,
      touchAreaDilation: 5,

      // Doesn't look exactly centered due to button shading, so adjust it slightly
      xContentOffset: -0.5,

      // yellow color scheme
      baseColor: new Color( '#fefd53' )
    } );
    deleteButton.addInputListener( disableDismissAction );
    this.addChild( deleteButton );

    this.addDisposable( deleteButton );
  }

  /**
   * Override to additionally remove the attached input listener.
   */
  public override detach(): this {
    super.detach();
    if ( _.indexOf( phet.joist.display.getInputListeners(), this.clickToDismissListener ) !== -1 ) {
      phet.joist.display.removeInputListener( this.clickToDismissListener );
    }
    return this;
  }
}

energySkatePark.register( 'ControlPointUI', ControlPointUI );