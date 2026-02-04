// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node that shows the grid lines and labels, when enabled in the control panel.
 * Every other horizontal line is labeled and highlighted to make it easy to count.
 *
 * The grid will translate with the potential energy reference line, so that "0" line always aligns with
 * 0 potential energy.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';
import TextPanel from './TextPanel.js';

export default class EnergySkateParkGridNode extends Node {

  // keep references to all text created so that they can be disposed and removed from scene graph
  // when layout changes
  private readonly createdTextPanels: Node[];

  // a unique label for the zero meter reference height position
  private readonly zeroMeterLabel: TextPanel;

  // persistent positions for labels that don't depend on reference height or layout
  private readonly labelXPosition: number;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly referenceHeightProperty: NumberProperty;

  // bamboo chart transform and grid line sets
  private readonly chartTransform: ChartTransform;

  // TODO: These grid line sets should translate vertically when the user changes the origin, see https://github.com/phetsims/energy-skate-park/issues/417
  private readonly minorVerticalLines: GridLineSet;
  private readonly minorHorizontalLines: GridLineSet;
  private readonly majorHorizontalLines: GridLineSet;
  private readonly gridContainer: Node;

  /**
   * @param gridVisibleProperty the axon property indicating whether the grid should be visible
   * @param referenceHeightProperty - Property in meters for height of zero potential energy
   * @param visibleBoundsProperty - visible bounds, in view coordinates
   * @param modelViewTransform the main model-view transform
   * @param tandem
   */
  public constructor( gridVisibleProperty: PhetioProperty<boolean>, referenceHeightProperty: NumberProperty, visibleBoundsProperty: TProperty<Bounds2>, modelViewTransform: ModelViewTransform2, tandem: Tandem ) {
    super( {
      pickable: false,
      tandem: tandem
    } );

    this.referenceHeightProperty = referenceHeightProperty;
    this.modelViewTransform = modelViewTransform;

    const visibleBounds = visibleBoundsProperty.get();

    // Create a ChartTransform with initial model ranges. The model ranges map meters to view pixels.
    // We will update these in layout() so grid lines fall exactly on meter marks.
    this.chartTransform = new ChartTransform( {
      viewWidth: visibleBounds.width,
      viewHeight: visibleBounds.height,
      modelXRange: new Range( 0, visibleBounds.width / Math.abs( modelViewTransform.modelToViewDeltaX( 1 ) ) ),
      modelYRange: new Range( 0, visibleBounds.height / Math.abs( modelViewTransform.modelToViewDeltaY( 1 ) ) )
    } );

    // Minor vertical lines: spaced every 1 meter along the X axis
    // In bamboo, axisOrientation is the axis along which lines are *spaced*.
    // Vertical lines are spaced along X → Orientation.HORIZONTAL
    this.minorVerticalLines = new GridLineSet( this.chartTransform, Orientation.HORIZONTAL, 1, {
      stroke: '#686868',
      lineWidth: 0.8
    } );

    // Minor horizontal lines: spaced every 1 meter along the Y axis
    // Horizontal lines are spaced along Y → Orientation.VERTICAL
    this.minorHorizontalLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, 1, {
      stroke: '#686868',
      lineWidth: 0.8
    } );

    // Major horizontal lines: spaced every 2 meters along the Y axis
    this.majorHorizontalLines = new GridLineSet( this.chartTransform, Orientation.VERTICAL, 2, {
      stroke: '#686868',
      lineWidth: 1.8
    } );

    this.gridContainer = new Node( {
      children: [ this.minorVerticalLines, this.minorHorizontalLines, this.majorHorizontalLines ]
    } );
    this.addChild( this.gridContainer );

    this.labelXPosition = this.modelViewTransform.modelToViewX( -5 );

    this.zeroMeterLabel = new TextPanel( EnergySkateParkStrings.heightLabels.zeroMStringProperty, {
      bottom: this.modelViewTransform.modelToViewY( 0 ) - 2,
      right: this.labelXPosition - 2
    } );
    this.addChild( this.zeroMeterLabel );

    this.createdTextPanels = [];

    // redraw grid and reposition labels with reference height
    referenceHeightProperty.lazyLink( ( height, oldHeight ) => {
      const viewDelta = modelViewTransform.modelToViewDeltaY( height - oldHeight );

      this.zeroMeterLabel.translate( 0, viewDelta );
      this.layout( visibleBoundsProperty.get() );
    } );

    visibleBoundsProperty.link( bounds => this.layout( bounds ) );
    gridVisibleProperty.linkAttribute( this, 'visible' );
  }

  /**
   * Redraw the grid so that grid lines fall exactly on the meter relative to the model origin (center of ground),
   * and grid lines fill the entire screen above ground. Labels are also added relative to model coordinates.
   *
   * @param bounds - visible bounds, in view coordinates
   */
  private layout( bounds: Bounds2 ): void {
    const referenceHeight = this.referenceHeightProperty.get();
    const viewReferenceHeight = this.modelViewTransform.modelToViewDeltaX( referenceHeight );

    // find the left position and width such that the meter lines will fall exactly on the meter
    const modelLeft = this.modelViewTransform.viewToModelX( bounds.left );
    const roundedModelLeft = Math.floor( modelLeft );
    const modelWidthDifference = modelLeft - roundedModelLeft;
    const viewWidthDifference = this.modelViewTransform.modelToViewDeltaX( modelWidthDifference );
    const gridWidth = bounds.width + viewWidthDifference;

    // find the top position and height so that lines will fall exactly on the meter AND major grid lines
    // will fall on even meters
    const modelTop = this.modelViewTransform.viewToModelY( bounds.top );
    let roundedModelTop = Math.ceil( modelTop );

    if ( roundedModelTop % 2 !== 0 ) {
      roundedModelTop++;
    }

    const modelHeightDifference = modelTop - roundedModelTop;
    const viewHeightDifference = this.modelViewTransform.modelToViewDeltaY( modelHeightDifference );
    const gridHeight = bounds.height + viewHeightDifference + viewReferenceHeight;

    // Compute model ranges for the chart transform. The number of meters that fit in the grid dimensions.
    const metersPerPixelX = 1 / Math.abs( this.modelViewTransform.modelToViewDeltaX( 1 ) );
    const metersPerPixelY = 1 / Math.abs( this.modelViewTransform.modelToViewDeltaY( 1 ) );

    // Update the chart transform with new view dimensions and model ranges
    this.chartTransform.setViewWidth( gridWidth );
    this.chartTransform.setViewHeight( gridHeight );
    this.chartTransform.setModelXRange( new Range( 0, gridWidth * metersPerPixelX ) );
    this.chartTransform.setModelYRange( new Range( 0, gridHeight * metersPerPixelY ) );

    // Position the grid container
    this.gridContainer.left = this.modelViewTransform.modelToViewX( roundedModelLeft );
    this.gridContainer.top = this.modelViewTransform.modelToViewY( roundedModelTop ) - viewReferenceHeight;

    // detach and destroy old labels
    for ( let k = 0; k < this.createdTextPanels.length; k++ ) {
      this.createdTextPanels[ k ].dispose();
    }
    this.createdTextPanels.length = 0;

    // create and add new labels along the grid
    const roundedModelHeight = -Math.floor( this.modelViewTransform.viewToModelDeltaY( bounds.height ) );
    const roundedReferenceHeight = Math.floor( referenceHeight );
    for ( let y = -roundedReferenceHeight; y < roundedModelHeight - referenceHeight; y++ ) {
      const viewY = this.modelViewTransform.modelToViewY( y ) - viewReferenceHeight;

      // only major grid lines are labeled, and 0 meters has a unique label
      if ( y % 2 === 0 && y !== 0 ) {
        const gridLineLabel = new TextPanel( new StringProperty( `${y}` ), {
          bottom: viewY - 2,
          right: this.labelXPosition - 2
        } );

        gridLineLabel.touchArea = gridLineLabel.localBounds;
        this.addChild( gridLineLabel );

        // so that we can dispose them before next layout
        this.createdTextPanels.push( gridLineLabel );
      }
    }
  }
}

energySkatePark.register( 'EnergySkateParkGridNode', EnergySkateParkGridNode );
