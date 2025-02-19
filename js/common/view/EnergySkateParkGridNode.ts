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
import GridNode from '../../../../griddle/js/GridNode.js';
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
  private readonly gridNode: GridNode;

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

    const visibleBounds = visibleBoundsProperty.get();
    const gridNode = new GridNode( visibleBounds.width, visibleBounds.height, {
      minorVerticalLineSpacing: modelViewTransform.modelToViewDeltaX( 1 ),
      minorHorizontalLineSpacing: Math.abs( modelViewTransform.modelToViewDeltaY( 1 ) ),
      majorHorizontalLineSpacing: Math.abs( modelViewTransform.modelToViewDeltaY( 2 ) ),
      majorLineOptions: {
        stroke: '#686868',
        lineWidth: 1.8
      },
      minorLineOptions: {
        stroke: '#686868',
        lineWidth: 0.8
      }
    } );
    this.addChild( gridNode );

    this.referenceHeightProperty = referenceHeightProperty;
    this.modelViewTransform = modelViewTransform;
    this.gridNode = gridNode;

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
   * Perhaps it will improve performance too? Could performance optimize by using visible instead of add/remove child
   * if necessary (would only change performance on screen size change). For more performance improvements on screen size change,
   * only update when the graph is visible, then again when it becomes visible.
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
    this.gridNode.setGridWidth( bounds.width + viewWidthDifference );

    // find the top position and height so that lines will fall exactly on the meter AND major grid lines
    // will fall on even meters
    const modelTop = this.modelViewTransform.viewToModelY( bounds.top );
    let roundedModelTop = Math.ceil( modelTop );

    if ( roundedModelTop % 2 !== 0 ) {
      roundedModelTop++;
    }

    const modelHeightDifference = modelTop - roundedModelTop;
    const viewHeightDifference = this.modelViewTransform.modelToViewDeltaY( modelHeightDifference );
    this.gridNode.setGridHeight( bounds.height + viewHeightDifference + viewReferenceHeight );

    this.gridNode.left = this.modelViewTransform.modelToViewX( roundedModelLeft );
    this.gridNode.top = this.modelViewTransform.modelToViewY( roundedModelTop ) - viewReferenceHeight;

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