// Copyright 2014-2020, University of Colorado Boulder

/**
 * Node that shows the delete and cut buttons for track control points.  Created each time a control point is dragged.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import RoundPushButton from '../../../../sun/js/buttons/RoundPushButton.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import energySkatePark from '../../energySkatePark.js';

class ControlPointUI extends Node {

  /**
   * Constructor for the ControlPointUI for a single control point.
   * @param {EnergySkateParkModel} model the main model
   * @param {Track} track the track associated with the control point
   * @param {number} controlPointIndex the 0-based index of the control point
   * @param {ModelViewTransform2} modelViewTransform the main model-view transform
   * @param {Node} parentNode
   * @param {Tandem} tandem
   */
  constructor( model, track, controlPointIndex, modelViewTransform, parentNode, tandem ) {
    super( {
      tandem: tandem,
      phetioState: false,
      phetioComponentOptions: { phetioState: false }
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
    const alpha = new LinearFunction( 0, track.controlPoints.length - 1, track.minPoint, track.maxPoint )( controlPointIndex );
    const position = track.getPoint( alpha );
    const angle = track.getViewAngleAt( alpha );
    const modelAngle = track.getModelAngleAt( alpha );

    const disableDismissAction = { down: () => { enableClickToDismissListener = false; } };

    // {RoundPushButton|null} - may not be defined, but reference kept for disposal
    let cutButton = null;

    // Add a scissors cut button, but only for interior points and only if there aren't too many control points already
    if ( !isEndPoint && model.canCutTrackControlPoint() ) {
      const scissorNode = new FontAwesomeNode( 'cut', { fill: 'black', scale: 0.6, rotation: angle - Math.PI / 2 } );
      cutButton = new RoundPushButton( {
        tandem: tandem.createTandem( 'cutButton' ),
        phetioState: false,
        phetioComponentOptions: { phetioState: false },

        content: scissorNode,
        listener: () => {
          model.splitControlPoint( track, controlPointIndex, modelAngle );
        },
        center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 40, angle + Math.PI / 2 ) ),
        radius: 20,
        touchAreaRadius: 20 * 1.3,

        // yellow color scheme
        baseColor: new Color( '#fefd53' )
      } );
      cutButton.addInputListener( disableDismissAction );
      this.addChild( cutButton );
    }

    // Show the delete button.
    const deleteNode = new FontAwesomeNode( 'times_circle', { fill: 'red', scale: 0.6 } );
    const deleteButton = new RoundPushButton( {
      tandem: tandem.createTandem( 'deleteButton' ),
      phetioState: false,
      phetioComponentOptions: { phetioState: false },

      listener: () => {
        model.deleteControlPoint( track, controlPointIndex );
      },
      content: deleteNode,
      center: modelViewTransform.modelToViewPosition( position ).plus( Vector2.createPolar( 40, angle - Math.PI / 2 ) ),
      radius: 20,
      touchAreaRadius: 20 * 1.3,

      // Doesn't look exactly centered due to button shading, so adjust it slightly
      xContentOffset: -0.5,

      // yellow color scheme
      baseColor: new Color( '#fefd53' )
    } );
    deleteButton.addInputListener( disableDismissAction );
    this.addChild( deleteButton );

    this.disposeControlPointUI = () => {
      cutButton && cutButton.dispose();
      deleteButton.dispose();
    };
  }

  /**
   * Make eligible for garbage collection.
   * @public
   * @override
   */
  dispose() {
    this.disposeControlPointUI();
    super.dispose();
  }

  /**
   * Override to additionally remove the attached input listener.
   * @public
   */
  detach() {
    super.detach();
    if ( _.indexOf( phet.joist.display.getInputListeners(), this.clickToDismissListener ) !== -1 ) {
      phet.joist.display.removeInputListener( this.clickToDismissListener );
    }
  }
}

energySkatePark.register( 'ControlPointUI', ControlPointUI );
export default ControlPointUI;