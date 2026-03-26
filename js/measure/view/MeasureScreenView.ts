// Copyright 2018-2026, University of Colorado Boulder

/**
 * The ScreenView for the "Measure" Screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import EnergySkateParkScreenSummaryContent from '../../common/view/EnergySkateParkScreenSummaryContent.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import MeasureModel from '../model/MeasureModel.js';
import InspectedSampleHaloNode from './InspectedSampleHaloNode.js';
import SkaterPathSensorNode from './SkaterPathSensorNode.js';

export default class MeasureScreenView extends EnergySkateParkTrackSetScreenView {

  // For layout
  private readonly measureModel: MeasureModel;

  public constructor( model: MeasureModel, tandem: Tandem ) {

    // parent layer for ComboBox, would use this but it is not available until after super
    const comboBoxParent = new Node();

    super( model, tandem, {
      screenSummaryContent: new EnergySkateParkScreenSummaryContent( model, 'measure' ),
      showBarGraph: false,
      showSkaterPath: true,
      controlPanelOptions: {
        visibilityControlsOptions: {
          showStickToTrackCheckbox: true
        },
        gravityControlsOptions: {
          includeGravityComboBox: true
        }
      }
    } );
    this.measureModel = model;

    this.addChild( comboBoxParent );

    const inspectedSampleHaloNode = new InspectedSampleHaloNode( model.dataSamples, this.modelViewTransform );
    this.topLayer.addChild( inspectedSampleHaloNode );

    const pathSensorNode = new SkaterPathSensorNode( model.dataSamples, model.sensorProbePositionProperty, model.sensorBodyPositionProperty, model.availableModelBoundsProperty, this.modelViewTransform, this.controlPanel, {
      tandem: tandem.createTandem( 'pathSensorNode' ),
      phetioVisiblePropertyInstrumented: false
    } );

    this.topLayer.addChild( pathSensorNode );

    // Place the path sensor in the play area, after the heading but before the reference height line
    this.playAreaUpperExtraContent.pdomOrder = [ pathSensorNode ];
  }

  /**
   * Custom floating layout for this screen, dependent on available view bounds.
   */
  public override layout( viewBounds: Bounds2 ): void {
    super.layout( viewBounds );

    // in the measure screen the legend is in the top left of the screen
    this.pieChartLegend.mutate( { top: this.controlPanel.top, left: this.fixedLeft! } );

    // position the body relative to the pie chart legend, this sets the origin of the body (top left)
    this.measureModel.sensorBodyPositionProperty.set( this.modelViewTransform.viewToModelXY( this.fixedLeft!, this.pieChartLegend.bottom + 10 ) );
  }
}
