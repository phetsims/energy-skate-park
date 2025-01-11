// Copyright 2018-2025, University of Colorado Boulder

/**
 * A collection of physical values and data about the Skater at a particular time. This data can be plotted visually
 * or individually inspected by the user.
 *
 * Generally this information is static, but energy values for sample CAN change. For example, when the reference height
 * line moves, energy data updates according to this line.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import energySkatePark from '../../energySkatePark.js';
import SkaterState from './SkaterState.js';
import Track from './Track.js';

// constants
// samples will fade out to this opacity before being fully removed from the model
const MIN_OPACITY = 0.05;

export default class EnergySkateParkDataSample {

  // Values copied to avoid re-calculating when inspected
  public readonly speed: number;
  public referenceHeight: number;
  public readonly position: Vector2;
  public readonly time: number;
  public readonly stickingToTrack: boolean;

  // Skater's track at time of save
  public readonly track: Track;

  // Positions of the control points for the saved track, if there is one
  private readonly trackControlPointPositions: Vector2[];

  // values copied from SkaterState, but these may change with the reference height and become out of sync with SkaterState
  public kineticEnergy: number;
  public potentialEnergy: number;
  public thermalEnergy: number;
  public totalEnergy: number;

  // The skater's state at the time of sampling
  public readonly skaterState: SkaterState;

  // Friction value to be restored when scrubbing through data
  public readonly friction: number;

  // Time since this sample was added to the model, in seconds
  public timeSinceAdded: number;

  // Whether this sample is being inspected by the probe
  public readonly inspectedProperty: BooleanProperty;

  // The opacity of this skater sample, tied to visual representation
  public readonly opacityProperty: NumberProperty;

  // Emits an event when this EnergySkateParkDataSample has updated in some way, like when energies change
  // due to a change in reference height
  public readonly updatedEmitter: Emitter;

  // Samples which have initiated removal retain this percentage of opacity every animation frame, opacity = opacity * fadeDecay
  private readonly fadeDecay: number;

  // Indicates that this sample should begin removal and will fade out
  private _initiateRemove: boolean;

  /**
   * @param skaterState - The skater's state at the time of sampling
   * @param friction - to be restored when scrubbing through data
   * @param time - in seconds
   * @param stickingToTrack - whether the skater is sticking to the track
   * @param fadeDecay - samples being removed retain this percent of opacity (opacity = opacity * fadeDecay)
   */
  public constructor(
    skaterState: SkaterState,
    friction: number,
    time: number,
    stickingToTrack: boolean,
    fadeDecay: number
  ) {

    assert && assert( fadeDecay < 1, 'samples which have initiated removal need to fade away' );

    this.speed = skaterState.getSpeed();
    this.referenceHeight = skaterState.referenceHeight;
    this.position = new Vector2( skaterState.positionX, skaterState.positionY );
    this.time = time;
    this.stickingToTrack = stickingToTrack;

    this.track = skaterState.track;

    this.trackControlPointPositions = [];
    if ( this.track ) {
      this.track.controlPoints.forEach( controlPoint => {
        this.trackControlPointPositions.push( controlPoint.positionProperty.get() );
      } );
    }

    this.kineticEnergy = skaterState.getKineticEnergy();
    this.potentialEnergy = skaterState.getPotentialEnergy();
    this.thermalEnergy = skaterState.thermalEnergy;
    this.totalEnergy = skaterState.getTotalEnergy();

    this.skaterState = skaterState;
    this.friction = friction;
    this.timeSinceAdded = 0;
    this.inspectedProperty = new BooleanProperty( false );
    this.opacityProperty = new NumberProperty( 1 );
    this.updatedEmitter = new Emitter();
    this.fadeDecay = fadeDecay;
    this._initiateRemove = false;
  }

  /**
   * Calculate new energies for this EnergySkateParkDataSample with the new reference height. Potential energy will be recalculated
   * and total energy will be adjusted accordingly to conserve energy. Thermal and kinetic energies should not change.
   */
  public setNewReferenceHeight( referenceHeight: number ): void {

    this.referenceHeight = referenceHeight;

    const oldPotentialEnergy = this.potentialEnergy;
    this.potentialEnergy = this.getPotentialEnergyAtReferenceHeight( referenceHeight );

    const energyChange = this.potentialEnergy - oldPotentialEnergy;
    this.totalEnergy = this.totalEnergy + energyChange;

    this.updatedEmitter.emit();

    if ( assert ) {
      const totalEnergy = this.potentialEnergy + this.kineticEnergy + this.thermalEnergy;
      assert( Utils.equalsEpsilon( totalEnergy, this.totalEnergy, 1E-10 ), 'energy should be conserved' );
    }
  }

  /**
   * Get the potential energy a particular reference height, using the other physical properties of the SkaterState
   * unchanged.
   */
  public getPotentialEnergyAtReferenceHeight( referenceHeight: number ): number {
    return -this.skaterState.mass * this.skaterState.gravity * ( this.skaterState.positionY - referenceHeight );
  }

  /**
   * Update the sample's state over time
   * @param dt - in seconds
   */
  public step( dt: number ): void {
    if ( this._initiateRemove ) {
      this.opacityProperty.set( this.opacityProperty.get() * this.fadeDecay );
    }

    this.timeSinceAdded += dt;
  }

  /**
   * Indicate that this skater sample is about to be removed. Opacity immediately is reduced, and after a short time
   * this sample will be completely removed.
   */
  public initiateRemove(): void {
    this._initiateRemove = true;
  }

  public static readonly MIN_OPACITY = MIN_OPACITY;
}

energySkatePark.register( 'EnergySkateParkDataSample', EnergySkateParkDataSample );