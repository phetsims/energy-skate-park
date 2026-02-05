// Copyright 2026, University of Colorado Boulder

/**
 * SkaterKeyboardListener provides keyboard control for the skater with dual-mode behavior:
 * - On-track: Left/Right (A/D) move along parametric position, Up (W) detaches skater
 * - Off-track: Standard 2D arrow key movement
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import HotkeyData from '../../../../scenery/js/input/HotkeyData.js';
import type { OneKeyStroke } from '../../../../scenery/js/input/KeyDescriptor.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import Skater from '../model/Skater.js';
import SkaterNode from './SkaterNode.js';

// Movement step sizes in model coordinates
const POSITION_STEP = 0.1; // meters for off-track movement
const PARAMETRIC_STEP = 0.02; // parametric units for on-track movement
const SLOW_MULTIPLIER = 0.25; // multiplier for shift+key movement

export default class SkaterKeyboardListener extends KeyboardListener<OneKeyStroke[]> {

  // Static HotkeyData for keyboard help integration
  public static readonly MOVE_SKATER_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'arrowLeft', 'arrowRight', 'arrowUp', 'arrowDown', 'w', 'a', 's', 'd' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkStrings.keyboardHelpDialog.moveSkaterStringProperty,
    keyboardHelpDialogPDOMLabelStringProperty: EnergySkateParkStrings.a11y.keyboardHelpDialog.moveSkaterDescriptionStringProperty
  } );

  public static readonly MOVE_ALONG_TRACK_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'arrowLeft', 'arrowRight', 'a', 'd' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkStrings.keyboardHelpDialog.moveAlongTrackStringProperty,
    keyboardHelpDialogPDOMLabelStringProperty: EnergySkateParkStrings.a11y.keyboardHelpDialog.moveAlongTrackDescriptionStringProperty
  } );

  public static readonly DETACH_FROM_TRACK_HOTKEY_DATA = new HotkeyData( {
    keys: [ 'arrowUp', 'w' ],
    repoName: energySkatePark.name,
    keyboardHelpDialogLabelStringProperty: EnergySkateParkStrings.keyboardHelpDialog.detachFromTrackStringProperty,
    keyboardHelpDialogPDOMLabelStringProperty: EnergySkateParkStrings.a11y.keyboardHelpDialog.detachFromTrackDescriptionStringProperty
  } );

  private readonly skater: Skater;
  private readonly skaterNode: SkaterNode;

  public constructor( skater: Skater, skaterNode: SkaterNode ) {
    super( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [ SkaterKeyboardListener.MOVE_SKATER_HOTKEY_DATA ] ),
      fireOnHold: true,
      press: () => sharedSoundPlayers.get( 'grab' ).play(),
      release: () => sharedSoundPlayers.get( 'release' ).play(),
      fire: ( event, keysPressed ) => {
        this.handleKeyPress( keysPressed, event?.shiftKey ?? false );
      }
    } );

    this.skater = skater;
    this.skaterNode = skaterNode;
  }

  /**
   * Handle key presses based on whether the skater is on-track or off-track.
   */
  private handleKeyPress( keysPressed: OneKeyStroke, shiftKey: boolean ): void {
    const track = this.skater.trackProperty.value;

    if ( track ) {
      this.handleOnTrackMovement( keysPressed, shiftKey );
    }
    else {
      this.handleOffTrackMovement( keysPressed, shiftKey );
    }
  }

  /**
   * Handle movement when skater is on the track (parametric movement).
   */
  private handleOnTrackMovement( keysPressed: OneKeyStroke, shiftKey: boolean ): void {
    const track = this.skater.trackProperty.value!;
    const currentU = this.skater.parametricPositionProperty.value;
    const stepSize = shiftKey ? PARAMETRIC_STEP * SLOW_MULTIPLIER : PARAMETRIC_STEP;

    // Determine the direction of movement along the track
    // The direction depends on onTopSideOfTrackProperty to handle inverted track sections correctly
    const onTop = this.skater.onTopSideOfTrackProperty.value;

    if ( keysPressed === 'arrowLeft' || keysPressed === 'a' ) {
      // Move left along track
      const direction = onTop ? -1 : 1;
      this.moveAlongTrack( track, currentU, stepSize * direction );
    }
    else if ( keysPressed === 'arrowRight' || keysPressed === 'd' ) {
      // Move right along track
      const direction = onTop ? 1 : -1;
      this.moveAlongTrack( track, currentU, stepSize * direction );
    }
    else if ( keysPressed === 'arrowUp' || keysPressed === 'w' ) {
      // Detach from track
      this.detachFromTrack();
    }
    // Down arrow (arrowDown, s) does nothing when on track
  }

  /**
   * Move the skater along the track by a delta in parametric space.
   */
  private moveAlongTrack( track: Skater[ 'trackProperty' ][ 'value' ] & object, currentU: number, deltaU: number ): void {
    const newU = currentU + deltaU;

    // Check if new position is in bounds
    if ( track.isParameterInBounds( newU ) ) {
      // Set the skater to be dragging to pause physics simulation
      this.skater.draggingProperty.value = true;

      this.skater.parametricPositionProperty.value = newU;
      this.skater.positionProperty.value = track.getPoint( newU );
      this.skater.angleProperty.value = track.getViewAngleAt( newU ) +
                                        ( this.skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

      // Clear velocity when moving with keyboard
      this.skater.velocityProperty.value = this.skater.velocityProperty.value.timesScalar( 0 );
      this.skater.parametricSpeedProperty.value = 0;

      // Clear thermal energy when repositioning
      this.skater.thermalEnergyProperty.value = 0;

      this.skater.updateEnergy();
      this.skater.updatedEmitter.emit();

      // Re-enable physics
      this.skater.draggingProperty.value = false;

      // Save the starting position for "return skater"
      this.skater.released( track, newU );
    }
    else {
      // At end of track, detach
      this.detachFromTrack();
    }
  }

  /**
   * Detach the skater from the track.
   */
  private detachFromTrack(): void {
    const track = this.skater.trackProperty.value;
    if ( !track ) {
      return;
    }

    // Get the normal vector to launch in the direction away from track
    const u = this.skater.parametricPositionProperty.value;
    const normal = track.getUnitNormalVector( u );
    const launchDirection = this.skater.onTopSideOfTrackProperty.value ? normal : normal.negated();

    // Detach from track
    this.skater.trackProperty.value = null;
    this.skater.angleProperty.value = 0;

    // Give a small velocity boost in the normal direction
    const currentPosition = this.skater.positionProperty.value;
    this.skater.positionProperty.value = currentPosition.plus( launchDirection.timesScalar( 0.1 ) );

    this.skater.updateEnergy();
    this.skater.updatedEmitter.emit();

    // Save the starting position for "return skater"
    this.skater.released( null, 0 );
  }

  /**
   * Handle movement when skater is off the track (2D grid movement).
   */
  private handleOffTrackMovement( keysPressed: OneKeyStroke, shiftKey: boolean ): void {
    const step = shiftKey ? POSITION_STEP * SLOW_MULTIPLIER : POSITION_STEP;
    let dx = 0;
    let dy = 0;

    if ( keysPressed === 'arrowLeft' || keysPressed === 'a' ) {
      dx = -step;
    }
    else if ( keysPressed === 'arrowRight' || keysPressed === 'd' ) {
      dx = step;
    }
    else if ( keysPressed === 'arrowUp' || keysPressed === 'w' ) {
      dy = step;
    }
    else if ( keysPressed === 'arrowDown' || keysPressed === 's' ) {
      dy = -step;
    }

    if ( dx !== 0 || dy !== 0 ) {
      // Set dragging to pause physics
      this.skater.draggingProperty.value = true;

      const currentPosition = this.skater.positionProperty.value;
      const newPosition = currentPosition.plusXY( dx, dy );

      this.skater.positionProperty.value = newPosition;
      this.skater.angleProperty.value = 0;
      this.skater.onTopSideOfTrackProperty.value = true;

      // Clear velocity and thermal energy
      this.skater.velocityProperty.value = this.skater.velocityProperty.value.timesScalar( 0 );
      this.skater.thermalEnergyProperty.value = 0;

      this.skater.updateEnergy();
      this.skater.updatedEmitter.emit();

      // Re-enable physics
      this.skater.draggingProperty.value = false;

      // Save the starting position for "return skater"
      this.skater.released( null, 0 );
    }
  }
}

energySkatePark.register( 'SkaterKeyboardListener', SkaterKeyboardListener );
