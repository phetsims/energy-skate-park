// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node for the pie chart, which moves with the skater and shows a pie chart representation of the energies by
 * type. The size of the pie chart is proportional to the total energy.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Utils from '../../../../dot/js/Utils.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import platform from '../../../../phet-core/js/platform.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import Skater from '../model/Skater.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

type SelfOptions = {

  // Whether to represent negative energy. When true, when one of the energies is negative
  // the pie chart will only show total energy, a solid circle with the color for total energy
  showNegativeEnergy?: boolean;
};

export type PieChartNodeOptions = SelfOptions & NodeOptions;

export default class PieChartNode extends Node {

  private readonly showNegativeEnergy: boolean;

  public constructor( skater: Skater, pieChartVisibleProperty: TReadOnlyProperty<boolean>, modelViewTransform: ModelViewTransform2, tandem: Tandem, providedOptions?: PieChartNodeOptions ) {

    const options = optionize<PieChartNodeOptions, SelfOptions, NodeOptions>()( {
      showNegativeEnergy: true
    }, providedOptions );

    const sliceOptions: PathOptions = {
      stroke: 'black',
      lineWidth: 1,

      // removes graphical artifacts around sharp corners of the energy slice, see #156
      lineJoin: 'round'
    };

    const kineticEnergySlice = new Path( null, combineOptions<PathOptions>( {
      fill: EnergySkateParkColorScheme.kineticEnergy
    }, sliceOptions ) );

    const potentialEnergySlice = new Path( null, combineOptions<PathOptions>( {
      fill: EnergySkateParkColorScheme.potentialEnergy
    }, sliceOptions ) );

    // Skip bounds computation to improve performance, see #245
    kineticEnergySlice.computeShapeBounds = () => new Bounds2( 0, 0, 0, 0 );
    potentialEnergySlice.computeShapeBounds = () => new Bounds2( 0, 0, 0, 0 );

    // total energy representation is a full circle, so it can use the optimized version.
    const totalEnergyCircle = new Circle( 1, {
      fill: EnergySkateParkColorScheme.totalEnergy,
      stroke: 'black',
      lineWidth: 1,
      lineDash: [ 2, 2 ],
      opacity: 0.5
    } );

    // Back layer is always a circle, so use the optimized version.
    const thermalEnergySlice = new Circle( 1, {
      fill: EnergySkateParkColorScheme.thermalEnergy,
      stroke: 'black',
      lineWidth: 1
    } );

    super( {
      tandem: tandem,
      children: [ thermalEnergySlice, potentialEnergySlice, kineticEnergySlice, totalEnergyCircle ],
      pickable: false,

      // render with canvas on iOS Safari to improve performance when rendering this Node, see
      // https://github.com/phetsims/energy-skate-park/issues/125
      renderer: platform.mobileSafari ? 'canvas' : null
    } );

    // whether or not negative potential energy will be represented by the pie chart or it should
    // be invisible in this case
    this.showNegativeEnergy = options.showNegativeEnergy;

    const updatePieChartPosition = () => {

      const view = modelViewTransform.modelToViewPosition( skater.headPositionProperty.value );

      // Center pie chart over skater's head not his feet so it doesn't look awkward when skating in a parabola
      this.setTranslation( view.x, view.y - 50 );
    };
    skater.headPositionProperty.link( () => {
      if ( this.visible ) {
        updatePieChartPosition();
      }
    } );

    const updatePaths = () => {

      // Guard against expensive changes while the pie chart is invisible
      if ( !this.visible ) {
        return;
      }
      const totalEnergy = skater.totalEnergyProperty.value;

      // Make the radius proportional to the square root of the energy so that the area will grow linearly with energy,
      // handling negative energy in case skater is below potential energy reference line
      const radius = 0.5 * Math.sqrt( Math.abs( totalEnergy ) );

      // If any value is too low, then don't show it, see #136
      const THRESHOLD = 1E-4;

      // if only one component of pie chart, then show as a circle so there are no seams
      const numberComponents = ( skater.potentialEnergyProperty.value > THRESHOLD ? 1 : 0 ) +
                               ( skater.kineticEnergyProperty.value > THRESHOLD ? 1 : 0 ) +
                               ( skater.thermalEnergyProperty.value > THRESHOLD ? 1 : 0 );

      // Don't show the pie chart if energies are zero, or if potential energy is negative (underground skater), see #189
      const energyNegative = skater.potentialEnergyProperty.value < 0;
      if ( energyNegative && this.showNegativeEnergy ) {

        // energy is negative and we want to represent it with a full yellow circle
        potentialEnergySlice.visible = false;
        kineticEnergySlice.visible = false;
        thermalEnergySlice.visible = false;
        totalEnergyCircle.visible = true;

        // round to nearest int so that graphics update only happens every pixel change or more
        totalEnergyCircle.radius = Utils.roundSymmetric( radius );
      }
      else if ( numberComponents === 0 || energyNegative ) {
        potentialEnergySlice.visible = false;
        kineticEnergySlice.visible = false;
        thermalEnergySlice.visible = false;
        totalEnergyCircle.visible = false;
      }
      else if ( numberComponents === 1 ) {
        const selectedSlice = skater.potentialEnergyProperty.value > THRESHOLD ? potentialEnergySlice :
                              skater.kineticEnergyProperty.value > THRESHOLD ? kineticEnergySlice :
                              thermalEnergySlice;
        potentialEnergySlice.visible = false;
        thermalEnergySlice.visible = false;
        kineticEnergySlice.visible = false;
        totalEnergyCircle.visible = false;
        selectedSlice.visible = true;

        // Performance optimization for background circle
        if ( selectedSlice instanceof Circle ) {

          // Round the radius so it will only update the graphics when it changed by a px or more
          selectedSlice.radius = Utils.roundSymmetric( radius );
        }
        else {
          selectedSlice.shape = Shape.circle( 0, 0, radius );
        }
      }
      else {
        potentialEnergySlice.visible = true;
        kineticEnergySlice.visible = true;
        thermalEnergySlice.visible = true;
        totalEnergyCircle.visible = false;
        const fractionPotential = skater.potentialEnergyProperty.value / skater.totalEnergyProperty.value;
        const fractionKinetic = skater.kineticEnergyProperty.value / skater.totalEnergyProperty.value;

        // Show one of them in the background instead of pieces for each one for performance
        // Round the radius so it will only update the graphics when it changed by a px or more
        thermalEnergySlice.radius = Utils.roundSymmetric( radius );

        // Start thermal at the right and wind counter clockwise, see #133
        // Order is thermal (in the background), kinetic, potential
        const potentialStartAngle = 0;
        const kineticStartAngle = Math.PI * 2 * fractionPotential;

        // If there is no potential energy (i.e. the skater is on the ground) then don't show the potential energy slice,
        // see #165
        if ( fractionPotential === 0 ) {
          potentialEnergySlice.shape = null;
        }
        else {
          potentialEnergySlice.shape = new Shape().moveTo( 0, 0 ).arc( 0, 0, radius, potentialStartAngle, kineticStartAngle, false ).lineTo( 0, 0 ).close();
        }
        kineticEnergySlice.shape = new Shape().moveTo( 0, 0 ).arc( 0, 0, radius, kineticStartAngle, kineticStartAngle + fractionKinetic * Math.PI * 2, false ).lineTo( 0, 0 ).close();
      }
    };

    // instead of changing the entire pie chart whenever one energy changes, use trigger to update the whole pie
    skater.energyChangedEmitter.addListener( updatePaths );

    // Synchronize visibility with the model, and also update when visibility changes because it is guarded against in updatePaths
    pieChartVisibleProperty.link( visible => {
      this.visible = visible;
      updatePaths();
      if ( visible ) {
        updatePieChartPosition();
      }
    } );
  }
}

energySkatePark.register( 'PieChartNode', PieChartNode );