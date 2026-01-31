// Copyright 2019-2025, University of Colorado Boulder

/**
 * An EnergySkateParkTrackSetModel that can save EnergySkateParkDataSamples. EnergySkateParkDataSamples contain information about the physical
 * state of the skater at a point in time.
 *
 * Generally, it is up to the subtype of EnergySkateParkSaveSampleModel to clear data at the correct time, as different
 * presentations of this data need to persist in different cases. But maxNumberOfSamples can be specified to keep
 * at most that number of samples at a time.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkDataSample from './EnergySkateParkDataSample.js';
import EnergySkateParkModel, { EnergySkateParkModelOptions } from './EnergySkateParkModel.js';
import EnergySkateParkPreferencesModel from './EnergySkateParkPreferencesModel.js';
import SkaterState from './SkaterState.js';

type SelfOptions = {
  // the default value for whether the model is saving samples of data for display
  defaultSaveSamples?: boolean;

  // the interval at which we save EnergySkateParkDataSamples, in seconds
  saveSampleInterval?: number;

  // skater samples which are being removed will fade away at this rate every animation frame
  sampleFadeDecay?: number;

  // the maximum number of EnergySkateParkDataSamples saved by this model, to prevent from saving too many if we run without encountering a case that clears old samples
  maxNumberOfSamples?: number;
};

export type EnergySkateParkSaveSampleModelOptions = SelfOptions & EnergySkateParkModelOptions;

export default class EnergySkateParkSaveSampleModel extends EnergySkateParkModel {

  private readonly saveSampleInterval: number;
  private readonly maxNumberOfSamples: number;
  private readonly sampleFadeDecay: number;

  // amount of time that has elapsed since a skater sample has been saved
  private timeSinceSampleSave: number;

  // whether to limit the number of samples to be saved - if false, which
  // can be done if you are ok with saving limitless samples, options.maxNumberOfSamples has no impact
  public limitNumberOfSamples: boolean;

  // controls whether samples are saved as the model steps through time
  public readonly saveSamplesProperty: BooleanProperty;

  // set to true to prevent the model from saving any more samples, even if
  // saveSamplesProperty is true - this can be used instead of (or in combination with) maxNumberOfSamples\
  // to prevent the model from saving too many samples for reasons other than array length
  public preventSampleSave: boolean;

  // in seconds, how much time has passed since beginning to record skater states
  public readonly sampleTimeProperty: NumberProperty;

  // observable list of all saved EnergySkateParkDataSamples
  public readonly dataSamples: ObservableArray<EnergySkateParkDataSample>;

  // an array of EnergySkateParkDataSamples that have just been removed from the model. Necessary
  // for performance so that we can update once after removing many samples rather than every time
  // a single sample is removed
  public readonly batchRemoveSamplesEmitter: Emitter<[ EnergySkateParkDataSample[] ]>;

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem, providedOptions: EnergySkateParkSaveSampleModelOptions ) {
    const options = optionize<EnergySkateParkSaveSampleModelOptions, SelfOptions, EnergySkateParkModelOptions>()( {
      defaultSaveSamples: true,
      saveSampleInterval: 0.1,
      sampleFadeDecay: 0.95,
      maxNumberOfSamples: 50
    }, providedOptions );

    super( preferencesModel, tandem, options );

    this.saveSampleInterval = options.saveSampleInterval;
    this.maxNumberOfSamples = options.maxNumberOfSamples;
    this.sampleFadeDecay = options.sampleFadeDecay;

    this.timeSinceSampleSave = 0;
    this.limitNumberOfSamples = true;
    this.saveSamplesProperty = new BooleanProperty( options.defaultSaveSamples, { tandem: tandem.createTandem( 'saveSamplesProperty' ) } );
    this.preventSampleSave = false;
    this.sampleTimeProperty = new NumberProperty( 0 );
    this.dataSamples = createObservableArray();
    this.batchRemoveSamplesEmitter = new Emitter( {
      parameters: [ {
        isValidValue: value => Array.isArray( value ) && value.every( element => element instanceof EnergySkateParkDataSample )
      } ]
    } );
  }

  /**
   * Set model state from a saved sample, potentially modifying Skater, Track, and other things.
   */
  public setFromSample( dataSample: EnergySkateParkDataSample ): void {

    // restore friction and stickingToTrackProperty (all other Properties are set on Skater)
    this.frictionProperty.set( dataSample.friction );
    this.stickingToTrackProperty.set( dataSample.stickingToTrack );

    if ( dataSample.track ) {

      dataSample.trackControlPointPositions.forEach( ( position, i ) => {
        dataSample.track!.controlPoints[ i ].sourcePositionProperty.set( position );
      } );

      // make sure control points are constrained, and update splines and shape
      dataSample.track.containControlPointsInLimitBounds( true );
    }
  }

  /**
   * Clear all saved data immediately and prepare to save data again.
   */
  public clearEnergyData(): void {
    this.batchRemoveSamples( this.dataSamples.slice() );
    this.sampleTimeProperty.reset();
    this.timeSinceSampleSave = 0;
  }

  /**
   * EnergySkateParkDataSamples are removed from the model in batches for performance. This way we can remove many
   * EnergySkateParkDataSamples and then update the view once after several are removed. The behavior of this sim
   * is such that hundreds of EnergySkateParkDataSamples are frequently removed at a time.
   *
   * Assumes that samplesToRemove is a sub-array of this.dataSamples, in the right order.
   */
  public batchRemoveSamples( samplesToRemove: EnergySkateParkDataSample[] ): void {

    const indexOfFirstSample = this.dataSamples.indexOf( samplesToRemove[ 0 ] );
    this.dataSamples.splice( indexOfFirstSample, samplesToRemove.length );

    // broadcast that this batch of samples has been removed
    this.batchRemoveSamplesEmitter.emit( samplesToRemove );
  }

  /**
   * Begin to remove all samples, indicating that all existing samples should fade away.
   */
  protected initiateSampleRemoval(): void {
    for ( let i = 0; i < this.dataSamples.length; i++ ) {
      this.dataSamples.get( i ).initiateRemove();
    }
  }

  /**
   * Custom stepModel for the SaveSampleModel. Saves and clears EnergySkateParkDataSamples. dt in seconds
   */
  public override stepModel( dt: number, skaterState: SkaterState ): SkaterState {
    const updatedState = super.stepModel( dt, skaterState );

    if ( this.saveSamplesProperty.get() ) {
      this.timeSinceSampleSave = this.timeSinceSampleSave + dt;

      if ( !this.preventSampleSave && this.timeSinceSampleSave > this.saveSampleInterval ) {
        const newSample = new EnergySkateParkDataSample( updatedState, this.frictionProperty.get(), this.sampleTimeProperty.get(), this.stickingToTrackProperty.get(), this.sampleFadeDecay );
        this.dataSamples.add( newSample );
        this.timeSinceSampleSave = 0;
        this.sampleTimeProperty.set( this.sampleTimeProperty.get() + dt );
      }
    }

    // old samples fade out if we have collected too many
    if ( this.limitNumberOfSamples && this.dataSamples.length > this.maxNumberOfSamples ) {
      const numberToRemove = this.dataSamples.length - this.maxNumberOfSamples;
      for ( let i = 0; i < numberToRemove; i++ ) {
        this.dataSamples.get( i ).initiateRemove();
      }
    }

    // update opacity of EnergySkateParkDataSamples and determine if it is time for them to be removed from model
    const samplesToRemove: EnergySkateParkDataSample[] = [];
    this.dataSamples.forEach( sample => {
      sample.step( dt );
      if ( sample.opacityProperty.get() < EnergySkateParkDataSample.MIN_OPACITY ) {
        samplesToRemove.push( sample );
      }
    } );

    // for performance, we batch removal of EnergySkateParkDataSamples so that we can update once after many have been removed
    // rather than on each data point, see https://github.com/phetsims/energy-skate-park/issues/198
    if ( samplesToRemove.length > 0 ) {

      // BatchRemoveSamples requires that samplesToRemove is a sub array of this.dataSamples, in the same order.
      // We can guarantee this is the case because we built samplesToRemove as we iterated through this.dataSamples
      // so it must be in the right order. And as soon as we find one sample to remove, the rest in this.dataSamples
      // will be ready for removal since they are even older and therefore less opaque.
      this.batchRemoveSamples( samplesToRemove );
    }

    return updatedState;
  }

  public override reset(): void {
    super.reset();
    this.clearEnergyData();

    this.sampleTimeProperty.reset();
    this.saveSamplesProperty.reset();
  }
}

energySkatePark.register( 'EnergySkateParkSaveSampleModel', EnergySkateParkSaveSampleModel );