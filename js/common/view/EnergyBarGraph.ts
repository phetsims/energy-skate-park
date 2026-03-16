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
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import BarChartNode from '../../../../griddle/js/BarChartNode.js';
import optionize from '../../../../phet-core/js/optionize.js';
import MoveToTrashLegendButton from '../../../../scenery-phet/js/buttons/MoveToTrashLegendButton.js';
import MagnifyingGlassZoomButtonGroup from '../../../../scenery-phet/js/MagnifyingGlassZoomButtonGroup.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TPaint from '../../../../scenery/js/util/TPaint.js';
import ColorConstants from '../../../../sun/js/ColorConstants.js';
import sharedSoundPlayers from '../../../../tambo/js/sharedSoundPlayers.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkColors from '../EnergySkateParkColors.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import Skater from '../model/Skater.js';

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

  public constructor( skater: Skater, barGraphScaleProperty: NumberProperty, barGraphVisibleProperty: BooleanProperty, showPatternsProperty: TReadOnlyProperty<boolean>, tandem: Tandem, providedOptions: EnergyBarGraphOptions ) {

    const options = optionize<SelfOptions, SelfOptions, NodeOptions>()( {
      showBarGraphZoomButtons: true,
      graphRange: new Range( -122.8, 325 )
    }, providedOptions );

    super( options );

    // PDOM-only node for the energy readout, placed first in pdomOrder so it appears
    // right after the AccordionBox's help text and before the interactive controls.
    const energyReadoutProperty = EnergySkateParkFluent.a11y.energyReadoutPattern.createProperty( {
      kinetic: new DerivedProperty( [ skater.kineticEnergyProperty ], kineticEnergy => toFixed( kineticEnergy, 1 ) ),
      potential: new DerivedProperty( [ skater.potentialEnergyProperty ], potentialEnergy => toFixed( potentialEnergy, 1 ) ),
      thermal: new DerivedProperty( [ skater.thermalEnergyProperty ], thermalEnergy => toFixed( thermalEnergy, 1 ) ),
      total: new DerivedProperty( [ skater.totalEnergyProperty ], totalEnergy => toFixed( totalEnergy, 1 ) )
    } );

    const conditionalReadoutProperty = new DerivedProperty(
      [ energyReadoutProperty, skater.totalEnergyProperty, EnergySkateParkFluent.a11y.noDataParagraphStringProperty ],
      ( readout, total, noDataText ) => Math.abs( total ) <= EnergySkateParkConstants.ENERGY_THRESHOLD ? noDataText : readout
    );

    const energyReadoutNode = new Node( {
      tagName: 'p',
      accessibleParagraph: conditionalReadoutProperty
    } );

    // the range for the visible portion of the graph, in joules - note this is somewhat arbitrary because
    // the bars will have difference scales, but size should be about 1.5 times larger than the energy would
    // extend bars at default scale
    const graphRangeProperty = new Property( options.graphRange, {
      valueType: Range
    } );

    // button to remove thermal energy will be below the "thermal" energy label
    const clearThermalButton = new MoveToTrashLegendButton( {
      arrowColor: EnergySkateParkColors.thermalEnergyColorProperty,
      tandem: tandem.createTandem( 'clearThermalButton' ),
      listener: skater.clearThermal.bind( skater ),
      scale: 0.86,
      enabledPropertyOptions: { phetioReadOnly: true },
      soundPlayer: sharedSoundPlayers.get( 'erase' ),
      accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleNameStringProperty,
      accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleHelpTextStringProperty,
      accessibleContextResponse: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleContextResponseStringProperty
    } );

    // For kinetic and potential, they must go to zero at the endpoints to reach learning goals like
    // The kinetic energy is zero at the top of the trajectory (turning point)
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
      color: EnergySkateParkColors.kineticEnergyColorProperty as TPaint
    };
    const potentialEntry = {
      property: createHideSmallValuesProperty( skater.potentialEnergyProperty ),
      color: EnergySkateParkColors.potentialEnergyColorProperty
    };
    const thermalEntry = {
      property: createShowSmallValuesProperty( skater.thermalEnergyProperty ),
      color: EnergySkateParkColors.thermalEnergyColorProperty as TPaint
    };
    const totalEntry = {
      property: createShowSmallValuesProperty( skater.totalEnergyProperty ),
      color: EnergySkateParkColors.totalEnergyColorProperty
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

      labelBackgroundColor: EnergySkateParkColors.transparentPanelFillProperty
    } );

    // main content for the containing panel, assembly depends on whether zoom buttons are required
    let content = null;
    if ( options.showBarGraphZoomButtons ) {

      // Map discrete integer zoom levels to scale factors. Level 0 is MIN_ZOOM_FACTOR (a partial step),
      // levels 1–9 correspond to 1*delta through 9*delta (= MAX_ZOOM_FACTOR). Default is level 2 (= 1/30).
      const NUM_ZOOM_LEVELS = 10; // levels 0 through 9
      const DEFAULT_ZOOM_LEVEL = 2;
      const levelToScale = ( level: number ): number => {
        return level === 0 ? EnergySkateParkConstants.MIN_ZOOM_FACTOR : level * EnergySkateParkConstants.ZOOM_FACTOR_DELTA;
      };

      const zoomProperty = new NumberProperty( DEFAULT_ZOOM_LEVEL, {
        range: new Range( 0, NUM_ZOOM_LEVELS - 1 ),
        tandem: tandem.createTandem( 'zoomProperty' ),
        phetioDocumentation: 'Zoom level for the y-axis of the bar graph, where 0 is the most zoomed out, and 9 is the most zoomed in',
        phetioFeatured: true
      } );

      // Keep barGraphScaleProperty in sync with the discrete zoom level.
      zoomProperty.link( level => {
        barGraphScaleProperty.value = levelToScale( level );
      } );

      const zoomLevelResponseProperty = EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomLevelResponse.createProperty( {
        level: new DerivedProperty( [ zoomProperty ], level => level + 1 ),
        max: NUM_ZOOM_LEVELS
      } );

      const zoomButtonGroup = new MagnifyingGlassZoomButtonGroup( zoomProperty, {
        orientation: 'horizontal',
        spacing: 5,
        magnifyingGlassNodeOptions: {
          glassRadius: 6
        },
        buttonOptions: {
          baseColor: ColorConstants.LIGHT_BLUE,
          xMargin: 7,
          yMargin: 5
        },
        touchAreaXDilation: 5,
        touchAreaYDilation: 5,
        zoomInButtonOptions: {
          accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleNameStringProperty,
          accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty,
          accessibleContextResponse: zoomLevelResponseProperty
        },
        zoomOutButtonOptions: {
          accessibleName: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleNameStringProperty,
          accessibleHelpText: EnergySkateParkFluent.a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty,
          accessibleContextResponse: zoomLevelResponseProperty
        },
        tandem: tandem.createTandem( 'zoomButtonGroup' ),
        visiblePropertyOptions: { phetioFeatured: true }
      } );

      content = new VBox( {
        children: [ energyReadoutNode, this.barChartNode, zoomButtonGroup ],
        spacing: 5,
        align: 'left'
      } );

      barGraphScaleProperty.link( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    }
    else {
      content = new Node( {
        children: [ energyReadoutNode, this.barChartNode ]
      } );
    }

    this.addChild( content );

    // attach listeners - bar chart exists for life of sim, no need to dispose
    skater.energyChangedEmitter.addListener( () => { this.updateWhenVisible( barGraphVisibleProperty.value ); } );
    barGraphVisibleProperty.link( this.updateWhenVisible.bind( this ) );

    // Access the total bar's border rectangle to apply dashed border when patterns are enabled.
    // The total bar is the 4th entry (index 3) in the BarChartNode.
    // BarNode uses a filled borderRectangle (slightly wider than the bar) to simulate a solid border.
    // For dashed mode, we swap its fill to transparent and add a dashed stroke instead.
    // TODO: https://github.com/phetsims/energy-skate-park/issues/465 move the pattern to the left a little bit
    const totalBorderRectangle = this.barChartNode.barNodes[ 3 ].borderRectangle;

    // Swap bar entry colors between solid and pattern fills, then re-render
    showPatternsProperty.link( patterns => {
      kineticEntry.color = patterns ? EnergySkateParkColors.kineticEnergyPattern : EnergySkateParkColors.kineticEnergyColorProperty;
      thermalEntry.color = patterns ? EnergySkateParkColors.thermalEnergyPattern : EnergySkateParkColors.thermalEnergyColorProperty;

      // Swap the total bar border between a solid fill and a dashed stroke
      totalBorderRectangle.fill = patterns ? null : 'black';
      totalBorderRectangle.stroke = patterns ? 'black' : null;
      totalBorderRectangle.lineDash = patterns ? EnergySkateParkColors.TOTAL_ENERGY_LINE_DASH : [];

      this.updateWhenVisible( barGraphVisibleProperty.value );
    } );

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
  public static createBarGraphIcon(): Node {
    return new Node( {
      children: [
        new Rectangle( 0, 0, 20, 20, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ),
        new Rectangle( 3, 14, 5, 6, {
          fill: EnergySkateParkColors.kineticEnergyColorProperty,
          stroke: 'black',
          lineWidth: 0.5
        } ),
        new Rectangle( 11, 8, 5, 12, {
          fill: EnergySkateParkColors.potentialEnergyColorProperty,
          stroke: 'black',
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

energySkatePark.register( 'EnergyBarGraph', EnergyBarGraph );
