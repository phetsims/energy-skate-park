// Copyright 2018-2020, University of Colorado Boulder

/**
 * The ScreenView for the "Measure" Screen.
 *
 * @author Jesse Greenberg
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import energySkatePark from '../../../energySkatePark.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import InspectedSampleHaloNode from './InspectedSampleHaloNode.js';
import SkaterPathSensorNode from './SkaterPathSensorNode.js';
import SkaterSamplesCanvasNode from './SkaterSamplesCanvasNode.js';

class MeasureScreenView extends EnergySkateParkTrackSetScreenView {

  /**
   * @param  {MeasureModel} model
   * @param  {Tandem} tandem
   */
  constructor( model, tandem ) {

    // parent layer for ComboBox, would use this but it is not available until after super
    const comboBoxParent = new Node();

    super( model, tandem, {
      showBarGraph: false,
      showSkaterPath: true,
      controlPanelOptions: {
        visibilityControlsOptions: {
          showSkaterPathCheckbox: true,
          showStickToTrackCheckbox: true
        },
        gravityControlsOptions: {
          includeGravityComboBox: true
        }
      }
    } );

    this.addChild( comboBoxParent );

    // @private - for layout
    this.pathSensor = new SkaterPathSensorNode( model.skaterSamples, model.sensorProbePositionProperty, model.sensorBodyPositionProperty, model.availableModelBoundsProperty, this.modelViewTransform, this.controlPanel, {
      tandem: tandem.createTandem( 'pathSensor' )
    } );

    const inspectedSampleHaloNode = new InspectedSampleHaloNode( model.skaterSamples, this.modelViewTransform );
    this.topLayer.addChild( inspectedSampleHaloNode );

    // @private - so it can be repainted in step
    this.skaterSamplesNode = new SkaterSamplesCanvasNode( model, this.modelViewTransform );
    this.topLayer.addChild( this.skaterSamplesNode );

    this.topLayer.addChild( this.pathSensor );
  }

  /**
   * @param {number} dt - in seconds
   */
  step( dt ) {
    this.skaterSamplesNode.step( dt );
  }

  /**
   * Returns true if the no bounds intersects with the EnergySkateParkControlPanel. Useful for changing layout
   * so that things don't occlude the control panel.
   * @public
   *
   * @param {Node} node
   * @returns {boolean}
   * // REVIEW: this method appears unused
   */
  intersectsControlPanel( node ) {
    return this.boundsOf( node ).intersectsBounds( this.controlPanel.bounds );
  }

  /**
   * Custom floating layout for this screen, dependent on available view bounds.
   * @override
   * // REVIEW: this should be named "layout"
   */
  floatInterface() {
    super.floatInterface();

    // in the measure screen the legend is in the top left of the screen
    this.pieChartLegend.mutate( { top: this.controlPanel.top, left: this.fixedLeft } );

    // position the body relative to the pie chart legend, this sets the origin of the body (top left)
    this.model.sensorBodyPositionProperty.set( this.modelViewTransform.viewToModelXY( this.fixedLeft, this.pieChartLegend.bottom + 10 ) );

    // control panel is taller for this screen so move the measuring tape  to a different place
    // REVIEW: It looks like `this.showMeasuringTape` is never declared?
    if ( this.showMeasuringTape ) {

      // REVIEW: It looks like `this.measuringTapePanel` is never declared?
      this.measuringTapePanel.top = this.controlPanel.top;
      this.measuringTapePanel.right = this.controlPanel.left - 5;
    }
  }
}

energySkatePark.register( 'MeasureScreenView', MeasureScreenView );
export default MeasureScreenView;