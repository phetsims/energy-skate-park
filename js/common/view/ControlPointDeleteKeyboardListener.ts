// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard listener that deletes a control point when Delete or Backspace is pressed. After deletion,
 * focus moves to another control point in the play area, or to the track toolbox if none remain.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import ControlPointNode from './ControlPointNode.js';
import TrackNode from './TrackNode.js';

export default class ControlPointDeleteKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  public constructor( trackNode: TrackNode, controlPointIndex: number ) {

    const track = trackNode.track;
    const model = trackNode.model;

    super( {
      keyStringProperties: ControlPointNode.DELETE_CONTROL_POINT_HOTKEY_DATA.keyStringProperties,
      fire: () => {
        if ( track.physicalProperty.value && !track.isDisposed ) {
          sharedSoundPlayers.get( 'erase' ).play();

          // Capture the trackLayer before deletion disposes this trackNode
          const trackLayer = trackNode.parents[ 0 ];

          model.deleteControlPoint( track, controlPointIndex );

          // Move focus to another control point in the play area
          for ( const child of trackLayer.children ) {
            if ( !child.isDisposed ) {
              for ( const grandchild of child.children ) {
                if ( grandchild instanceof ControlPointNode && grandchild.focusable ) {
                  grandchild.focus();
                  return;
                }
              }
            }
          }

          // No control points remain, focus the track toolbox icon by searching the scene graph
          let root = trackLayer;
          while ( root.parents.length > 0 ) {
            root = root.parents[ 0 ];
          }
          const toolboxName = EnergySkateParkFluent.a11y.trackToolboxPanel.accessibleNameStringProperty.value;
          const queue = [ ...root.children ];
          while ( queue.length > 0 ) {
            const node = queue.shift()!;
            if ( node.focusable && node.accessibleName === toolboxName ) {
              node.focus();
              return;
            }
            queue.push( ...node.children );
          }
        }
      }
    } );
  }
}
