// Copyright 2019-2020, University of Colorado Boulder

/**
 * The energy plot in the Graphs screen of energy skate park. Plots Energy against time OR energy against position
 * depending on the selected independent variable. Uses XYCursorPlot because the cursor can be dragged to
 * control playback and restore previous the model to a previous point in time.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Emitter from '../../../../../axon/js/Emitter.js';
import Range from '../../../../../dot/js/Range.js';
import DynamicSeries from '../../../../../griddle/js/DynamicSeries.js';
import PointStyle from '../../../../../griddle/js/PointStyle.js';
import PointStyledVector2 from '../../../../../griddle/js/PointStyledVector2.js';
import XYCursorPlot from '../../../../../griddle/js/XYCursorPlot.js';
import XYDataSeriesNode from '../../../../../griddle/js/XYDataSeriesNode.js';
import merge from '../../../../../phet-core/js/merge.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
import GraphsModel from '../model/GraphsModel.js';

// constants
// determines a range for the energy plot as a function of the scale
const Y_OFFSET = 500;
const Y_SLOPE = 500;

// when the plot range is larger than this threshold, a larger step is used for vertical grid lines on the plot
const LARGE_RANGE_THRESHOLD = 5000;
const LARGE_STEP = 1000;
const SMALL_STEP = 500;

// determines properties of the plot that may depend on the independent variable
const TIME_MAX_X = 20; // in seconds
const TIME_STEP_X = 2; // in seconds
const POSITION_MAX_X = 10; // in meters
const POSITION_STEP_X = 1; // in meters

// Origin in the model is at center of screen, but plots align 0 meters at the left edge of the track, 5 meters
// left of origin
const POSITION_PLOT_OFFSET = 5;

class EnergyPlot extends XYCursorPlot {

  /**
   * @param {GraphsModel} model
   * @param {number} graphWidth
   * @param {number} graphHeight
   * @param {Tandem} tandem
   */
  constructor( model, graphWidth, graphHeight, tandem ) {

    const dragEndedEmitter = new Emitter();
    const dragStartedEmitter = new Emitter();

    // whether or not the sim was paused when dragging started, if not paused on drag start we will resume
    // sim play when dragging ends
    let pausedOnDragStart = false;

    const plotRange = calculateRange( model.lineGraphScaleProperty.get() );

    super( {

      // dimensions of the graph
      width: graphWidth,
      height: graphHeight,

      // plot domain, range, and grid increments
      maxX: TIME_MAX_X,
      minY: plotRange.min,
      maxY: plotRange.max,
      stepY: SMALL_STEP,

      // no arrows along x and y
      showAxis: false,

      // for the grid lines
      lineDash: [ 4, 4 ],
      showVerticalIntermediateLines: false,
      showHorizontalIntermediateLines: false,
      tickLabelFont: new PhetFont( 10 ),

      // for the cursor that shows current time
      cursorOptions: {
        startDrag: ( event, listener ) => {
          pausedOnDragStart = model.pausedProperty.get();

          if ( !pausedOnDragStart ) {
            model.pausedProperty.set( true );
          }

          dragStartedEmitter.emit();
        },
        drag: ( event, listener ) => {

          // when we drag the cursor, get the skater sample at the closest cursor time and set skater to found SkaterState
          const closestSample = model.getClosestSkaterSample( this.getCursorValue() );
          closestSample.skaterState.setToSkater( model.skater );
          model.skater.updatedEmitter.emit();
        },
        endDrag: ( event, listener ) => {

          if ( !pausedOnDragStart ) {
            model.pausedProperty.set( false );
          }

          dragEndedEmitter.emit();
        }
      }
    } );

    const seriesOptions = { lineWidth: 2 };

    // @private {DynamicSeries}
    this.kineticEnergyDataSeries = new DynamicSeries( merge( { color: EnergySkateParkColorScheme.kineticEnergy }, seriesOptions ) );
    this.potentialEnergyDataSeries = new DynamicSeries( merge( { color: EnergySkateParkColorScheme.potentialEnergy }, seriesOptions ) );
    this.thermalEnergyDataSeries = new DynamicSeries( merge( { color: EnergySkateParkColorScheme.thermalEnergy }, seriesOptions ) );
    this.totalEnergyDataSeries = new DynamicSeries( merge( { color: EnergySkateParkColorScheme.totalEnergy }, seriesOptions ) );

    // second parameter allows data to be scaled correctly so it is in the correct spot relative to plot range
    this.addSeries( this.thermalEnergyDataSeries, true );
    this.addSeries( this.potentialEnergyDataSeries, true );
    this.addSeries( this.kineticEnergyDataSeries, true );
    this.addSeries( this.totalEnergyDataSeries, true );

    // when cursor drag finishes, clear all data that has time greater than cursor time and set model time
    // to the selected cursor time
    dragEndedEmitter.addListener( () => {
      const timeOnEnd = this.getCursorValue();
      model.sampleTimeProperty.set( timeOnEnd );

      const closestSample = model.getClosestSkaterSample( timeOnEnd );
      const indexOfSample = model.skaterSamples.indexOf( closestSample );

      assert && assert( indexOfSample >= 0, 'time of cursor needs to align with a skater sample' );

      model.batchRemoveSamples( model.skaterSamples.getArray().slice( indexOfSample ) );

      this.setCursorValue( timeOnEnd );
    } );

    // calculate new range of plot when zooming in or out
    model.lineGraphScaleProperty.link( scale => {
      const newRange = calculateRange( scale );
      const newMaxY = newRange.max;
      const newMinY = newRange.min;
      const newStepY = ( newMaxY - newMinY ) >= LARGE_RANGE_THRESHOLD ? LARGE_STEP : SMALL_STEP;

      this.setMinY( newMinY );
      this.setMaxY( newMaxY );
      this.setStepY( newStepY );
    } );

    // update range, domain, and plot style of plot when the independent variable changes - cursor is invisible for
    // plots against position
    model.independentVariableProperty.link( independentVariable => {
      this.setMaxX( calculateDomain( independentVariable ).max );
      if ( independentVariable === GraphsModel.IndependentVariable.POSITION ) {
        this.setCursorVisibleOverride( false );
        this.setPlotStyle( XYDataSeriesNode.PlotStyle.SCATTER );
        this.setStepX( POSITION_STEP_X );
      }
      else {
        this.setCursorVisibleOverride( null );
        this.setPlotStyle( XYDataSeriesNode.PlotStyle.LINE );
        this.setStepX( TIME_STEP_X );
      }
    } );

    model.kineticEnergyDataVisibleProperty.linkAttribute( this.getXYDataSeriesNode( this.kineticEnergyDataSeries ), 'visible' );
    model.potentialEnergyDataVisibleProperty.linkAttribute( this.getXYDataSeriesNode( this.potentialEnergyDataSeries ), 'visible' );
    model.thermalEnergyDataVisibleProperty.linkAttribute( this.getXYDataSeriesNode( this.thermalEnergyDataSeries ), 'visible' );
    model.totalEnergyDataVisibleProperty.linkAttribute( this.getXYDataSeriesNode( this.totalEnergyDataSeries ), 'visible' );

    // add data points when a SkaterSample is added to the model
    model.skaterSamples.addItemAddedListener( addedSample => {
      const plotTime = model.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME;
      const independentVariable = plotTime ? addedSample.time : addedSample.position.x + POSITION_PLOT_OFFSET;

      // keep a reference to the pointStyle so that it can be modified later
      const pointStyle = new PointStyle();

      // add a listener that updates opacity with the SkaterSample Property, dispose it on removal
      const opacityListener = opacity => {
        pointStyle.opacity = opacity;
      };
      addedSample.opacityProperty.link( opacityListener );

      this.kineticEnergyDataSeries.addDataPoint( new PointStyledVector2( independentVariable, addedSample.kineticEnergy, pointStyle ) );
      this.potentialEnergyDataSeries.addDataPoint( new PointStyledVector2( independentVariable, addedSample.potentialEnergy, pointStyle ) );
      this.thermalEnergyDataSeries.addDataPoint( new PointStyledVector2( independentVariable, addedSample.thermalEnergy, pointStyle ) );
      this.totalEnergyDataSeries.addDataPoint( new PointStyledVector2( independentVariable, addedSample.totalEnergy, pointStyle ) );

      const removalListener = removedSample => {
        if ( removedSample === addedSample ) {
          removedSample.opacityProperty.unlink( opacityListener );
          model.skaterSamples.removeItemRemovedListener( removalListener );
        }
      };
      model.skaterSamples.addItemRemovedListener( removalListener );

      this.setCursorValue( independentVariable );
    } );

    // remove a batch of of SkaterSamples
    model.batchRemoveSamplesEmitter.addListener( samplesToRemove => {
      const plotTime = model.independentVariableProperty.get() === GraphsModel.IndependentVariable.TIME;
      for ( let i = 0; i < samplesToRemove.length; i++ ) {
        const sampleToRemove = samplesToRemove[ i ];

        const independentVariable = plotTime ? sampleToRemove.time : ( sampleToRemove.position.x + POSITION_PLOT_OFFSET );

        this.forEachDataSeries( dataSeries => dataSeries.removePointAtX( independentVariable ) );
      }
    } );
  }

  /**
   * Clear all energy data for the data series associated with this plot.
   * @public
   */
  clearEnergyDataSeries() {
    this.kineticEnergyDataSeries.clear();
    this.potentialEnergyDataSeries.clear();
    this.thermalEnergyDataSeries.clear();
    this.totalEnergyDataSeries.clear();

    this.setCursorValue( 0 );
  }
}

//--------------------------------------------------------------------------
// helper functions
//-------------------------------------------------------------------------
/**
 * Calculates the range of the plot as a function of scale.
 * @param {number} scale
 * @returns {Range}
 */
const calculateRange = scale => {
  const max = Y_OFFSET + scale * Y_SLOPE;
  return new Range( -max, max );
};

/**
 * Calculates the domain of the plot as a function of the independent variable.
 * @param {GraphsModel.IndependentVariable} independentVariable
 * @returns {Range}
 */
const calculateDomain = independentVariable => {
  const maxX = independentVariable === GraphsModel.IndependentVariable.POSITION ? POSITION_MAX_X : TIME_MAX_X;
  return new Range( 0, maxX );
};

energySkatePark.register( 'EnergyPlot', EnergyPlot );
export default EnergyPlot;