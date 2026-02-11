// Copyright 2019-2026, University of Colorado Boulder

/**
 * Bar graph that displays the distribution of energy for this simulation.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import { roundSymmetric } from '../../../../dot/js/util/roundSymmetric.js';
import BarChartNode from '../../../../griddle/js/BarChartNode.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MoveToTrashLegendButton from '../../../../scenery-phet/js/buttons/MoveToTrashLegendButton.js';
import ZoomButton from '../../../../scenery-phet/js/buttons/ZoomButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ColorConstants from '../../../../sun/js/ColorConstants.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import Skater from '../model/Skater.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';

// constants
const ZOOM_BUTTON_TOUCH_DILATION = 5;

type SelfOptions = {
  // include buttons that increase/decrease the scale of the graph?
  showBarGraphZoomButtons?: boolean;

  // The range for the visible portion of the graph, in joules - note this is somewhat arbitrary
  // because the bars will have difference scales, but size should be about 1.5 times larger than the energy would
  // extend bars at default scale. A negative min value will allow some space to represent negative energies.
  graphRange?: Range;
};

export type EnergyBarGraphOptions = SelfOptions & NodeOptions;

export default class EnergyBarGraph extends Node {
  private readonly barChartNode: BarChartNode;

  public constructor( skater: Skater, barGraphScaleProperty: NumberProperty, barGraphVisibleProperty: BooleanProperty, tandem: Tandem, providedOptions: EnergyBarGraphOptions ) {

    const options = optionize<SelfOptions, SelfOptions, NodeOptions>()( {
      showBarGraphZoomButtons: true,
      graphRange: new Range( -122.8, 325 )
    }, providedOptions );

    super( options );

    // the range for the visible portion of the graph, in joules - note this is somewhat arbitrary because
    // the bars will have difference scales, but size should be about 1.5 times larger than the energy would
    // extend bars at default scale
    const graphRangeProperty = new Property( options.graphRange, {
      valueType: Range
    } );

    // button to remove thermal energy will be below the "thermal" energy label
    const clearThermalButton = new MoveToTrashLegendButton( {
      arrowColor: EnergySkateParkColorScheme.thermalEnergy,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: skater.clearThermal.bind( skater ),
      scale: 0.86,
      soundPlayer: sharedSoundPlayers.get( 'erase' ),
      accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleNameStringProperty,
      accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleContextResponseStringProperty
    } );

    // For kinetic and potential, they must go to zero at the endpoints to reach learning goals like
    //   "The kinetic energy is zero at the top of the trajectory (turning point)
    const createHideSmallValuesProperty = ( energyProperty: TReadOnlyProperty<number> ) => {
      return new DerivedProperty( [ energyProperty ], energy => {

        // determine whether to hide the bar if below threshold in view coordinates so it works
        // with the scaleProperty
        const height = energy * barGraphScaleProperty.get();
        const absHeight = Math.abs( height );

        // small enough so that energy is invisible at end points of track motion, but still visible
        // in other cases at slow movement, see https://github.com/phetsims/energy-skate-park/issues/160
        if ( absHeight < 0.1 ) {
          return 0;
        }
        return energy;
      } );
    };

    // For thermal and total energy, make sure they are big enough to be visible, see #307
    const createShowSmallValuesProperty = ( energyProperty: TReadOnlyProperty<number> ) => {
      return new DerivedProperty( [ energyProperty ], energy => {
        let resultantEnergy = energy;
        const scale = barGraphScaleProperty.get();

        // determine whether to increase bar size if within threshold in view coordinates so it works
        // with the scaleProperty
        const height = energy * scale;
        const absHeight = Math.abs( height );
        if ( absHeight < 1 && absHeight > 1E-6 ) {
          const valueSign = energy < 0 ? -1 : 1;
          resultantEnergy = valueSign / scale; // the energy required to produce a bar with height of 1 view coordinate
        }
        return resultantEnergy;
      } );
    };

    const kineticEntry = {
      property: createHideSmallValuesProperty( skater.kineticEnergyProperty ),
      color: EnergySkateParkColorScheme.kineticEnergy
    };
    const potentialEntry = {
      property: createHideSmallValuesProperty( skater.potentialEnergyProperty ),
      color: EnergySkateParkColorScheme.potentialEnergy
    };
    const thermalEntry = {
      property: createShowSmallValuesProperty( skater.thermalEnergyProperty ),
      color: EnergySkateParkColorScheme.thermalEnergy
    };
    const totalEntry = {
      property: createShowSmallValuesProperty( skater.totalEnergyProperty ),
      color: EnergySkateParkColorScheme.totalEnergy
    };

    this.barChartNode = new BarChartNode( [
      { entries: [ kineticEntry ], labelString: EnergySkateParkFluent.energies.kineticStringProperty },
      { entries: [ potentialEntry ], labelString: EnergySkateParkFluent.energies.potentialStringProperty },
      { entries: [ thermalEntry ], labelString: EnergySkateParkFluent.energies.thermalStringProperty, labelNode: clearThermalButton },
      { entries: [ totalEntry ], labelString: EnergySkateParkFluent.energies.totalStringProperty }
    ], graphRangeProperty, {
      barLabelOptions: {
        maxWidth: 61.4, // i18n, by inspection
        font: new PhetFont( 14.5 )
      },
      barOptions: {
        scaleProperty: barGraphScaleProperty,
        barWidth: 18.5
      },

      barSpacing: 15,

      labelBackgroundColor: EnergySkateParkColorScheme.transparentPanelFill
    } );

    // main content for the containing panel, assembly depends on whether zoom buttons are required
    let content = null;
    if ( options.showBarGraphZoomButtons ) {

      const zoomButtonOptions = {
        baseColor: ColorConstants.LIGHT_BLUE,
        magnifyingGlassOptions: {
          glassRadius: 6
        },

        xMargin: 7,
        yMargin: 5,

        // these buttons are quite small
        touchAreaXDilation: ZOOM_BUTTON_TOUCH_DILATION,
        touchAreaYDilation: ZOOM_BUTTON_TOUCH_DILATION
      };

      const maxLevel = roundSymmetric( ( EnergySkateParkConstants.MAX_ZOOM_FACTOR - EnergySkateParkConstants.MIN_ZOOM_FACTOR ) / EnergySkateParkConstants.ZOOM_FACTOR_DELTA ) + 1;

      const zoomOutButton = new ZoomButton( merge( {
        in: false,
        listener: () => {
          barGraphScaleProperty.set( Math.max( barGraphScaleProperty.get() - EnergySkateParkConstants.ZOOM_FACTOR_DELTA, EnergySkateParkConstants.MIN_ZOOM_FACTOR ) );
          zoomOutButton.addAccessibleContextResponse(
            EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomLevelResponse.format( {
              level: roundSymmetric( ( barGraphScaleProperty.value - EnergySkateParkConstants.MIN_ZOOM_FACTOR ) / EnergySkateParkConstants.ZOOM_FACTOR_DELTA ) + 1,
              max: maxLevel
            } )
          );
        },
        touchAreaXShift: -ZOOM_BUTTON_TOUCH_DILATION,
        tandem: tandem.createTandem( 'zoomOutButton' ),
        accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleNameStringProperty,
        accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty
      }, zoomButtonOptions ) );
      const zoomInButton = new ZoomButton( merge( {
        in: true,
        listener: () => {
          barGraphScaleProperty.set( Math.min( barGraphScaleProperty.get() + EnergySkateParkConstants.ZOOM_FACTOR_DELTA, EnergySkateParkConstants.MAX_ZOOM_FACTOR ) );
          zoomInButton.addAccessibleContextResponse(
            EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomLevelResponse.format( {
              level: roundSymmetric( ( barGraphScaleProperty.value - EnergySkateParkConstants.MIN_ZOOM_FACTOR ) / EnergySkateParkConstants.ZOOM_FACTOR_DELTA ) + 1,
              max: maxLevel
            } )
          );
        },
        touchAreaXShift: ZOOM_BUTTON_TOUCH_DILATION,
        tandem: tandem.createTandem( 'zoomInButton' ),
        accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleNameStringProperty,
        accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty
      }, zoomButtonOptions ) );

      const zoomButtons = new HBox( {
        children: [ zoomOutButton, zoomInButton ],
        spacing: 5
      } );

      content = new VBox( {
        children: [ this.barChartNode, zoomButtons ],
        spacing: 5,
        align: 'left'
      } );

      barGraphScaleProperty.link( scale => {
        zoomInButton.enabled = scale < EnergySkateParkConstants.MAX_ZOOM_FACTOR;
        zoomOutButton.enabled = scale > EnergySkateParkConstants.MIN_ZOOM_FACTOR;
      } );

      barGraphScaleProperty.link( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    }
    else {
      content = this.barChartNode;
    }

    this.addChild( content );

    // attach listeners - bar chart exists for life of sim, no need to dispose
    skater.energyChangedEmitter.addListener( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    barGraphVisibleProperty.link( this.updateWhenVisible.bind( this ) );

    skater.allowClearingThermalEnergyProperty.link( allowClearingThermalEnergy => {
      clearThermalButton.enabled = allowClearingThermalEnergy;
    } );

    // this button is small and usability is improved by larger touch areas
    clearThermalButton.touchArea = clearThermalButton.localBounds.dilated( 10 );
  }

  /**
   * If model indicates that graph is visible, redraw the graph.
   */
  private updateWhenVisible( visible: boolean ): void {
    if ( visible ) {
      this.barChartNode.update();
    }
  }

  /**
   * Create the label for the bar graph, which can be added in various places depending on layout of the graph.
   */
  public static createLabel(): Text {
    return new Text( EnergySkateParkFluent.energies.energyStringProperty, {
      font: new PhetFont( { size: 17, weight: 'bold' } ),
      maxWidth: 90 // i18n, by inspection
    } );
  }

  /**
   * Create an icon of the bar graph, to be used in visibility or other controls.
   */
  public static createBarGraphIcon( tandem: Tandem ): Node {
    return new Node( {
      tandem: tandem,
      children: [
        new Rectangle( 0, 0, 20, 20, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ),
        new Rectangle( 3, 14, 5, 6, {
          fill: EnergySkateParkColorScheme.kineticEnergy,
          stroke: 'black',
          lineWidth: 0.5
        } ),
        new Rectangle( 11, 8, 5, 12, {
          fill: EnergySkateParkColorScheme.potentialEnergy,
          stroke: 'black',
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );