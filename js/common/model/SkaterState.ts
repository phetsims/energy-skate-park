// Copyright 2013-2025, University of Colorado Boulder

/**
 * Immutable snapshot of skater state for updating the physics. To improve performance, operate solely on a skaterState
 * instance without updating the real skater, so that the skater model itself can be set only once, and trigger
 * callbacks only once (no matter how many subdivisions). This can also facilitate debugging and ensuring energy is
 * conserved from one step to another. Another reason this class is valuable is to create and evaluate proposed states
 * before applying them to the live model. Finally, this class is used to support simulation playback or inspection as
 * many states can be stored, inspected, or replayed in time.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import energySkatePark from '../../energySkatePark.js';
import Skater from './Skater.js';
import Track from './Track.js';

class SkaterState {

  // This code is called many times from the physics loop, so must be optimized for speed and memory
  // Special handling for values that can be null, false or zero
  public gravity!: number;
  public referenceHeight!: number;
  public mass!: number;
  public track!: Track | null;
  public angle!: number;
  public onTopSideOfTrack!: boolean;
  public parametricPosition!: number;
  public parametricSpeed!: number;
  public dragging!: boolean;
  public thermalEnergy!: number;
  public positionX!: number;
  public positionY!: number;
  public velocityX!: number;
  public velocityY!: number;

  /**
   * Create a SkaterSate from a SkaterState or Skater
   */
  public constructor( source: Skater | SkaterState ) {
    this.setState( source );
  }

  /**
   * Create a new SkaterState.
   * @param source the initial values to use
   * @returns the new SkaterState
   */
  private setState( source: IntentionalAny /*Skater | SkaterState*/ ): SkaterState {

    // Handle the case of a skater passed in (which has a position vector) or a SkaterState passed in, which has a number
    if ( source.positionProperty ) {
      this.positionX = source.positionProperty.value.x;
      this.positionY = source.positionProperty.value.y;

      this.velocityX = source.velocityProperty.value.x;
      this.velocityY = source.velocityProperty.value.y;
    }
    else {
      this.positionX = source.positionX;
      this.positionY = source.positionY;

      this.velocityX = source.velocityX;
      this.velocityY = source.velocityY;
    }

    // This code is called many times from the physics loop, so must be optimized for speed and memory
    // Special handling for values that can be null, false or zero
    this.gravity = getValue( 'gravity', source );
    this.referenceHeight = getValue( 'referenceHeight', source );
    this.mass = getValue( 'mass', source );
    this.track = getValue( 'track', source );
    this.angle = getValue( 'angle', source );
    this.onTopSideOfTrack = getValue( 'onTopSideOfTrack', source );
    this.parametricPosition = getValue( 'parametricPosition', source );
    this.parametricSpeed = getValue( 'parametricSpeed', source );
    this.dragging = getValue( 'dragging', source );
    this.thermalEnergy = getValue( 'thermalEnergy', source );

    // Some sanity tests
    assert && assert( isFinite( this.thermalEnergy ) );
    assert && assert( isFinite( this.velocityX ) );
    assert && assert( isFinite( this.velocityY ) );
    assert && assert( isFinite( this.parametricSpeed ) );

    assert && assert( this.thermalEnergy >= 0 );

    return this;
  }

  /**
   * Get the total energy in this state. Computed directly instead of using other methods to (hopefully) improve
   * performance.
   */
  public getTotalEnergy(): number {
    return 0.5 * this.mass * ( this.velocityX * this.velocityX + this.velocityY * this.velocityY ) - this.mass * this.gravity * ( this.positionY - this.referenceHeight ) + this.thermalEnergy;
  }

  /**
   * Get the kinetic energy with KE = 1/2 * m * v^2
   */
  public getKineticEnergy(): number {
    return 0.5 * this.mass * ( this.velocityX * this.velocityX + this.velocityY * this.velocityY );
  }

  /**
   * Get the potential energy with PE = mgh.
   */
  public getPotentialEnergy(): number {
    return -this.mass * this.gravity * ( this.positionY - this.referenceHeight );
  }

  /**
   * Get the curvature at the skater's point on the track, by setting it to the pass-by-reference argument.
   *
   * @param curvature - description of curvature at a point, looks like
   *                   {r: {number}, x: {number}, y: {number} }
   */
  public getCurvature( curvature: IntentionalAny ): void {
    this.track!.getCurvature( this.parametricPosition, curvature );
  }

  /**
   * Apply skate to skater. Only set values that have changed.
   */
  public setToSkater( skater: Skater ): void {
    skater.trackProperty.value = this.track;

    // Set property values manually to avoid allocations, see #50
    skater.positionProperty.value.x = this.positionX;
    skater.positionProperty.value.y = this.positionY;
    skater.positionProperty.notifyListenersStatic();

    skater.velocityProperty.value.x = this.velocityX;
    skater.velocityProperty.value.y = this.velocityY;
    skater.velocityProperty.notifyListenersStatic();

    skater.parametricPositionProperty.value = this.parametricPosition;
    skater.parametricSpeedProperty.value = this.parametricSpeed;
    skater.thermalEnergyProperty.value = this.thermalEnergy;
    skater.onTopSideOfTrackProperty.value = this.onTopSideOfTrack;

    skater.massProperty.value = this.mass;
    skater.gravityMagnitudeProperty.value = Math.abs( this.gravity );

    skater.referenceHeightProperty.value = this.referenceHeight;

    // only an angle to restore if skater is attached to a track and skater is not being dragged
    skater.angleProperty.value = ( skater.trackProperty.value && !this.dragging ) ? skater.trackProperty.value.getViewAngleAt( this.parametricPosition ) + ( this.onTopSideOfTrack ? 0 : Math.PI ) : this.angle;
    skater.updateEnergy();
  }

  /**
   * Create a new SkaterState with the new values. Provided as a convenience to avoid allocating options argument
   * (as in update).
   */
  public updateTrackUD( track: Track | null, parametricSpeed: number ): SkaterState {
    const state = new SkaterState( this );
    state.track = track;
    state.parametricSpeed = parametricSpeed;
    return state;
  }

  /**
   * Create a new SkaterState with the new values. Provided as a convenience to avoid allocating options argument
   * (as in update).
   */
  public updateUUDVelocityPosition(
    parametricPosition: number,
    parametricSpeed: number,
    velocityX: number,
    velocityY: number,
    positionX: number,
    positionY: number
  ): SkaterState {
    const state = new SkaterState( this );
    state.parametricPosition = parametricPosition;
    state.parametricSpeed = parametricSpeed;
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Update the position, angle, skater side of track, and velocity of the skater state.
   */
  public updatePositionAngleUpVelocity(
    positionX: number,
    positionY: number,
    angle: number,
    onTopSideOfTrack: boolean,
    velocityX: number,
    velocityY: number
  ): SkaterState {
    const state = new SkaterState( this );
    state.angle = angle;
    state.onTopSideOfTrack = onTopSideOfTrack;
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Update the thermal energy.
   */
  public updateThermalEnergy( thermalEnergy: number ): SkaterState {
    assert && assert( thermalEnergy >= 0 );

    const state = new SkaterState( this );

    state.thermalEnergy = thermalEnergy;
    return state;
  }

  /**
   * Update the parametric position and position.
   */
  public updateUPosition( parametricPosition: number, positionX: number, positionY: number ): SkaterState {
    const state = new SkaterState( this );
    state.parametricPosition = parametricPosition;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Transition the SkaterState to the ground, updating thermal energy, angle, and velocity components
   * accordingly.
   */
  public switchToGround( thermalEnergy: number, velocityX: number, velocityY: number, positionX: number, positionY: number ): SkaterState {
    assert && assert( thermalEnergy >= 0 );

    const state = new SkaterState( this );
    state.thermalEnergy = thermalEnergy;
    state.track = null;
    state.onTopSideOfTrack = true;
    state.angle = 0;
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Strike the ground (usually through falling). Velocity is zeroed as the skater hits the ground.
   */
  public strikeGround( thermalEnergy: number, positionX: number ): SkaterState {
    assert && assert( thermalEnergy >= 0 );

    const state = new SkaterState( this );
    state.thermalEnergy = thermalEnergy;
    state.positionX = positionX;
    state.positionY = 0;
    state.velocityX = 0;
    state.velocityY = 0;
    state.angle = 0;
    state.onTopSideOfTrack = true;
    return state;
  }

  /**
   * Create an exact copy of this SkaterState.
   */
  public copy(): SkaterState {
    return new SkaterState( this );
  }

  /**
   * Leave the track by zeroing the parametric speed and setting track to null.
   */
  public leaveTrack(): SkaterState {
    const state = new SkaterState( this );
    state.parametricSpeed = 0;
    state.track = null;
    return state;
  }

  /**
   * Create a new SkaterState copied from this SkaterState, updating position.
   */
  public updatePosition( positionX: number, positionY: number ): SkaterState {
    const state = new SkaterState( this );
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Update velocity. Provided as a convenience method to avoid allocating objects with options (as in update).
   */
  public updateUDVelocity( parametricSpeed: number, velocityX: number, velocityY: number ): SkaterState {
    const state = new SkaterState( this );
    state.parametricSpeed = parametricSpeed;
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    return state;
  }

  /**
   * Return a new skater state. New state is a copy of this SkaterState, with velocity and position updated to
   * reflect free fall.
   */
  public continueFreeFall( velocityX: number, velocityY: number, positionX: number, positionY: number ): SkaterState {
    const state = new SkaterState( this );
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Return SkaterState to track, creating and returning a new SkaterState.
   */
  public attachToTrack( thermalEnergy: number, track: Track, onTopSideOfTrack: boolean, parametricPosition: number, parametricSpeed: number, velocityX: number, velocityY: number, positionX: number, positionY: number ): SkaterState {
    assert && assert( thermalEnergy >= 0 );

    const state = new SkaterState( this );
    state.thermalEnergy = thermalEnergy;
    state.track = track;
    state.onTopSideOfTrack = onTopSideOfTrack;
    state.parametricPosition = parametricPosition;
    state.parametricSpeed = parametricSpeed;
    state.velocityX = velocityX;
    state.velocityY = velocityY;
    state.positionX = positionX;
    state.positionY = positionY;
    return state;
  }

  /**
   * Get the speed of this SkaterState, the magnitude of velocity.
   */
  public getSpeed(): number {
    return Math.sqrt( this.velocityX * this.velocityX + this.velocityY * this.velocityY );
  }

  /**
   * Return a new Vector2 of this SkaterState's that does not reference this SkaterState's velocity.
   */
  public getVelocity(): Vector2 {
    return new Vector2( this.velocityX, this.velocityY );
  }

  /**
   * Get the speed of this SkaterState from kinetic energy, using KE = 1/2 * m * v^2.
   */
  public getSpeedFromEnergy( kineticEnergy: number ): number {
    return Math.sqrt( 2 * Math.abs( kineticEnergy ) / this.mass );
  }

  /**
   * Create a new Vector2 that contains the positionX/positionY of this SkaterState.
   */
  public getPosition(): Vector2 {
    return new Vector2( this.positionX, this.positionY );
  }
}

const getValue = ( key: string, source: IntentionalAny ): IntentionalAny => {
  return typeof source[ `${key}Property` ] === 'object' ? source[ `${key}Property` ].value :
         source[ key ];
};

energySkatePark.register( 'SkaterState', SkaterState );
export default SkaterState;