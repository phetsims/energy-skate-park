// Copyright 2018-2024, University of Colorado Boulder

/**
 * The sensor that reads information from the samples along the skater path. Includes the body, wire, and sensor. The
 * body is stationary and the sensor can be dragged to sample positions.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TProperty from '../../../../axon/js/TProperty.js';
import LocalizedStringProperty from '../../../../chipper/js/browser/LocalizedStringProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import merge from '../../../../phet-core/js/merge.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import ProbeNode from '../../../../scenery-phet/js/ProbeNode.js';
import WireNode from '../../../../scenery-phet/js/WireNode.js';
import { AlignBox, AlignGroup, DragListener, HBox, Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import EnergySkateParkConstants from '../../common/EnergySkateParkConstants.js';
import EnergySkateParkDataSample from '../../common/model/EnergySkateParkDataSample.js';
import EnergySkateParkColorScheme from '../../common/view/EnergySkateParkColorScheme.js';
import EnergySkateParkControlPanel from '../../common/view/EnergySkateParkControlPanel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkStrings from '../../EnergySkateParkStrings.js';

const energyEnergyStringProperty = EnergySkateParkStrings.energies.energyStringProperty;
const energyJoulesPatternStringProperty = EnergySkateParkStrings.pathSensor.energyJoulesPatternStringProperty;
const energyKineticStringProperty = EnergySkateParkStrings.energies.kineticStringProperty;
const energyPotentialStringProperty = EnergySkateParkStrings.energies.potentialStringProperty;
const energyThermalStringProperty = EnergySkateParkStrings.energies.thermalStringProperty;
const energyTotalStringProperty = EnergySkateParkStrings.energies.totalStringProperty;
const heightMetersPatternStringProperty = EnergySkateParkStrings.pathSensor.heightMetersPatternStringProperty;
const speedMetersPerSecondPatternStringProperty = EnergySkateParkStrings.pathSensor.speedMetersPerSecondPatternStringProperty;

// constants
const TITLE_CONTENT_SPACING = 5.5; // spacing between the "Energy" title and the rest of the content
const LABEL_VALUE_SPACING = 5.5; // spacing between label text and the value readout rectangle
const PROBE_READOUT_SPACING = 5; // spacing between the probe and the height/speed readouts
const LAYOUT_SPACING = 2;
const TEXT_COLOR = 'white';
const TITLE_FONT = new PhetFont( 16 );
const LABEL_FONT = new PhetFont( 15.5 );
const ENTRY_MAX_WIDTH = 75;

// arbitrary range for energies, but required so that this can use NumberDisplay. With this value, the width of the
// NumberDisplay looks good and if released from within dev bounds, the energy will never get this large.
const ENERGY_RANGE = new Range( -20000, 20000 );

// offset so that the center of the probe aligns with sample positions
const PROBE_CENTER_OFFSET = new Vector2( 5.5, 0 );

const SENSOR_COLOR = 'rgb( 103, 80, 113 )';

// max distance between sample and probe center for the sample to be displayed, in view coordinates
const PROBE_THRESHOLD_DISTANCE = 10;

class SkaterPathSensorNode extends Node {

  // so the height speed readout doesn't occlude this
  private readonly screenViewControlPanel: EnergySkateParkControlPanel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly samples: ObservableArray<EnergySkateParkDataSample>;

  // for the NumberDisplays, null unless probe is over a skater sample
  private readonly kineticValueProperty: Property<number | null>;
  private readonly potentialValueProperty: Property<number | null>;
  private readonly thermalValueProperty: Property<number | null>;
  private readonly totalValueProperty: Property<number | null>;

  // NumberDisplays for the body of the sensor, wrapped in an AlignBox
  private readonly kineticRectangleBox: AlignBox;
  private readonly thermalRectangleBox: AlignBox;
  private readonly potentialRectangleBox: AlignBox;
  private readonly totalRectangleBox: AlignBox;
  private readonly heightReadout: Text;
  private readonly speedReadout: Text;
  private readonly heightSpeedVBox: VBox;
  private readonly heightSpeedRectangle: Rectangle;
  private readonly probeNode: ProbeNode;
  private inspectedSample: EnergySkateParkDataSample | null;
  private readonly boundUpdateSensorDisplay: () => void;
  private updateDisplayListener: ( () => void ) | null = null;

  /**
   * @param samples
   * @param sensorProbePositionProperty
   * @param sensorBodyPositionProperty
   * @param modelBoundsProperty
   * @param  modelViewTransform
   * @param controlPanel - so the readout doesn't occlude control panel bounds
   * @param [options]
   */
  public constructor(
    samples: ObservableArray<EnergySkateParkDataSample>,
    sensorProbePositionProperty: Vector2Property,
    sensorBodyPositionProperty: Vector2Property, modelBoundsProperty: TProperty<Bounds2>,
    modelViewTransform: ModelViewTransform2, controlPanel: EnergySkateParkControlPanel, options?: IntentionalAny ) {

    // eslint-disable-next-line phet/bad-typescript-text
    options = merge( {

      // prevent block fitting so that things don't jiggle as the probe moves, see
      preventFit: true
    }, options );
    super( options );

    this.screenViewControlPanel = controlPanel;
    this.modelViewTransform = modelViewTransform;

    this.samples = samples;

    // labels and value rectangles are in the same align group so that all entries have same width and height for
    // layout
    const alignGroup = new AlignGroup( { matchHorizontal: false } );

    const kineticLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyKineticStringProperty );
    const potentialLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyPotentialStringProperty );
    const thermalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyThermalStringProperty );
    const totalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyTotalStringProperty );

    // label for the probe
    const energyLabel = new Text( energyEnergyStringProperty, {
      font: TITLE_FONT,
      fill: TEXT_COLOR,
      maxWidth: 90
    } );

    const validationOptions = { valueType: [ null, 'number' ] };
    this.kineticValueProperty = new Property<number | null>( null, validationOptions );
    this.potentialValueProperty = new Property<number | null>( null, validationOptions );
    this.thermalValueProperty = new Property<number | null>( null, validationOptions );
    this.totalValueProperty = new Property<number | null>( null, validationOptions );

    this.kineticRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.kineticValueProperty );
    this.potentialRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.potentialValueProperty );
    this.thermalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.thermalValueProperty );
    this.totalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.totalValueProperty );

    // Height and speed are read to the right of the probe in a transparent panel for enhanced
    // visibility. We want the panel to resize as the text changes for different skater samples
    this.heightReadout = new Text( '', { font: LABEL_FONT } );
    this.speedReadout = new Text( '', { font: LABEL_FONT } );
    this.heightSpeedVBox = new VBox( {
      children: [ this.heightReadout, this.speedReadout ],
      align: 'left'
    } );

    this.heightSpeedRectangle = new Rectangle( this.heightSpeedVBox.bounds, {
      fill: EnergySkateParkColorScheme.transparentPanelFill
    } );
    this.heightSpeedRectangle.addChild( this.heightSpeedVBox );

    // layout - labels horizontally aligned with readouts in a VBox
    const content = new VBox( {
      children: [
        energyLabel,
        new HBox( {
          children: [
            new VBox( {
              align: 'left',
              children: [
                kineticLabelBox, potentialLabelBox, thermalLabelBox, totalLabelBox
              ],
              spacing: LAYOUT_SPACING
            } ),
            new VBox( {
              children: [
                this.kineticRectangleBox, this.potentialRectangleBox, this.thermalRectangleBox, this.totalRectangleBox
              ],
              spacing: LAYOUT_SPACING
            } )
          ],
          spacing: LABEL_VALUE_SPACING
        } )
      ], spacing: TITLE_CONTENT_SPACING
    } );

    // the body is a rounded rectangle
    const body = new Rectangle( content.bounds.dilated( 7 ), EnergySkateParkConstants.PANEL_CORNER_RADIUS, EnergySkateParkConstants.PANEL_CORNER_RADIUS, {
      fill: SENSOR_COLOR,
      stroke: 'rgb(210,210,210)',
      lineWidth: 2
    } );
    body.addChild( content );

    sensorBodyPositionProperty.link( bodyPosition => {
      body.leftTop = modelViewTransform.modelToViewPosition( bodyPosition );
    } );

    // the probe
    this.probeNode = new ProbeNode( {
      scale: 0.5,
      rotation: Math.PI / 2,
      color: SENSOR_COLOR,
      sensorTypeFunction: ProbeNode.crosshairs(),
      center: modelViewTransform.modelToViewPosition( sensorProbePositionProperty.get() ),
      cursor: 'pointer'
    } );

    sensorProbePositionProperty.link( position => {
      this.probeNode.translation = modelViewTransform.modelToViewPosition( position );
    } );

    // points and control points for the wire
    const p1Property = new DerivedProperty( [ sensorBodyPositionProperty ], bodyPosition => {
      return body.getCenterBottom().minusXY( 0, 5 );
    } );
    const normal1Property = new DerivedProperty( [ sensorProbePositionProperty, sensorBodyPositionProperty ], sensorPosition => {

      // changes with the probe position so the wire looks like it has slack as it gets longer
      const viewPosition = modelViewTransform.modelToViewPosition( sensorPosition );
      const distanceToBody = viewPosition.minus( p1Property.get() );
      return new Vector2( distanceToBody.x / 3, Math.max( distanceToBody.y, body.height * 2 ) );
    } );
    const p2Property = new DerivedProperty( [ sensorProbePositionProperty ], sensorPosition => {

      // calculate the left of the probe in view coordinates
      const viewPosition = modelViewTransform.modelToViewPosition( sensorPosition );
      const viewWidth = this.probeNode.width;
      return viewPosition.minusXY( viewWidth / 2, 0 );
    } );
    const normal2Property = new Vector2Property( new Vector2( -25, 0 ) );

    const wireNode = new WireNode( p1Property, normal1Property, p2Property, normal2Property, {
      lineWidth: 4
    } );

    // wire node behind body so the connection point where wire and body meet are clean
    this.addChild( wireNode );
    this.addChild( body );
    this.addChild( this.probeNode );
    this.addChild( this.heightSpeedRectangle );

    // the skater sample currently being inspected, reference so we can un-inspect
    // without looping through all samples
    this.inspectedSample = null;

    this.boundUpdateSensorDisplay = this.updateSensorDisplay.bind( this );

    // display the inspected sample, which could change if the sensor is being dragged, or if a sample is added/removed
    // from under the sensor
    sensorProbePositionProperty.link( this.boundUpdateSensorDisplay );
    samples.addItemRemovedListener( this.boundUpdateSensorDisplay );
    samples.addItemAddedListener( this.boundUpdateSensorDisplay );

    // add a drag listener to the probe body
    this.probeNode.addInputListener( new DragListener( {
      transform: modelViewTransform,
      positionProperty: sensorProbePositionProperty,
      dragBoundsProperty: modelBoundsProperty,
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );
  }

  /**
   * Update the sensor display, showing information about the inspected sample if one is underneath the sensor. If
   * no sample is under the sensor, the display is cleared.
   */
  private updateSensorDisplay(): void {
    let sampleToDisplay = null;

    // finds sample under the sensor, or the closest one to the center point if there are multiple
    const probeCenterWithOffset = this.probeNode.getCenter().plus( PROBE_CENTER_OFFSET );
    const viewProbePoint = this.localToParentPoint( probeCenterWithOffset );
    let minDistance = Number.POSITIVE_INFINITY;
    for ( let i = 0; i < this.samples.length; i++ ) {
      const sampleViewPoint = this.modelViewTransform.modelToViewPosition( this.samples.get( i ).position );
      const distanceToSample = Vector2.getDistanceBetweenVectors( sampleViewPoint, viewProbePoint );

      if ( distanceToSample < PROBE_THRESHOLD_DISTANCE && distanceToSample < minDistance ) {
        sampleToDisplay = this.samples.get( i );
        minDistance = distanceToSample;
      }
    }

    if ( sampleToDisplay ) {
      this.displayState( sampleToDisplay );

      // update the display whenever sample energies update, listener removed in clearDisplay
      this.updateDisplayListener = this.displayState.bind( this, sampleToDisplay );
      sampleToDisplay.updatedEmitter.addListener( this.updateDisplayListener );
    }
    else if ( this.inspectedSample ) {
      this.clearDisplay( this.inspectedSample );
    }
  }

  /**
   * Display values associated with a sample of skater state.
   */
  private displayState( dataSample: EnergySkateParkDataSample ): void {
    if ( this.inspectedSample ) {
      this.inspectedSample.inspectedProperty.set( false );
    }

    this.inspectedSample = dataSample;
    dataSample.inspectedProperty.set( true );

    // set values for display
    this.kineticValueProperty.value = dataSample.kineticEnergy;
    this.potentialValueProperty.value = dataSample.potentialEnergy;
    this.thermalValueProperty.value = dataSample.thermalEnergy;
    this.totalValueProperty.value = dataSample.totalEnergy;

    // set values for height and speed readout
    this.heightReadout.string = StringUtils.fillIn( heightMetersPatternStringProperty, {
      value: this.formatValue( dataSample.position.y - dataSample.referenceHeight )
    } );
    this.speedReadout.string = StringUtils.fillIn( speedMetersPerSecondPatternStringProperty, {
      value: this.formatValue( dataSample.speed )
    } );

    this.heightSpeedRectangle.visible = true;
    this.positionReadouts( dataSample );
  }

  /**
   * Position and sizes the height/speed readout which appears to the right of the probe, unless that would
   * occlude the screen view control panel
   */
  private positionReadouts( dataSample: EnergySkateParkDataSample ): void {
    this.heightSpeedRectangle.setRectBounds( this.heightSpeedVBox.bounds );
    this.heightSpeedRectangle.leftCenter = this.probeNode.rightCenter.plusXY( PROBE_READOUT_SPACING, 0 );

    // determine occlusion case from position of the sample point rather than the probe position so that
    // the display doesn't move around when measuring a single point
    const spacing = this.heightSpeedRectangle.width + this.probeNode.width / 2;
    const sampleViewPoint = this.modelViewTransform.modelToViewPosition( dataSample.position );
    if ( Math.abs( sampleViewPoint.x - this.screenViewControlPanel.left ) < spacing ) {
      this.heightSpeedRectangle.leftTop = this.probeNode.leftBottom.plusXY( 0, PROBE_READOUT_SPACING );
    }
  }

  /**
   * Formats values in the height/speed display adjacent to the sensor when a data
   * point is under the wand.
   */
  public formatValue( value: number ): string {
    return Utils.toFixed( value, 2 );
  }

  /**
   * Clear all values in the displays.
   */
  private clearDisplay( dataSample: EnergySkateParkDataSample ): void {

    // setting Properties to null will show MathSymbols.NO_VALUE in NumberDisplay
    this.kineticValueProperty.value = null;
    this.potentialValueProperty.value = null;
    this.thermalValueProperty.value = null;
    this.totalValueProperty.value = null;

    assert && assert( this.updateDisplayListener,
      `listener not attached to dataSample emitter,
       this.inspectedSample: ${this.inspectedSample}`,
      `update listenerL:  ${this.updateDisplayListener}`
    );
    this.inspectedSample!.updatedEmitter.removeListener( this.updateDisplayListener! );

    this.inspectedSample = null;
    this.updateDisplayListener = null;

    dataSample.inspectedProperty.set( false );
    this.heightSpeedRectangle.visible = false;
  }

  /**
   * Create label text and wrap with an AlignBox so that all labels and readouts have the same dimensions for layout.
   */
  private static createLabelBox( alignGroup: AlignGroup, labelString: LocalizedStringProperty ): AlignBox {
    const labelText = new Text( labelString, { fill: TEXT_COLOR, font: LABEL_FONT, maxWidth: ENTRY_MAX_WIDTH } );
    return alignGroup.createBox( labelText, { xAlign: 'left' } );
  }

  /**
   * Create a rectangle to contain value readouts, wrapped in an align box so that labels and this rectangle all
   * have the same dimensions for layout purposes.
   */
  private static createReadoutBox( alignGroup: AlignGroup, valueProperty: Property<number | null> ): AlignBox {

    const numberDisplay = new NumberDisplay( valueProperty, ENERGY_RANGE, {
      backgroundStroke: 'black',
      backgroundFill: EnergySkateParkColorScheme.panelFill,
      cornerRadius: 3,
      textOptions: {
        font: LABEL_FONT,
        maxWidth: ENTRY_MAX_WIDTH
      },
      decimalPlaces: 1,
      minBackgroundWidth: 68, // determined by inspection, in addition to ENERGY_RANGE because the range is arbitrary
      valuePattern: energyJoulesPatternStringProperty,

      // these value displays get smaller than their cordner radius with very long
      // strings, so we will always use full height for consistent layout
      useFullHeight: true,

      // when there are no values, hide units
      noValuePattern: SunConstants.VALUE_NAMED_PLACEHOLDER,
      noValueAlign: 'center'
    } );

    return alignGroup.createBox( numberDisplay, { xAlign: 'right' } );
  }
}

energySkatePark.register( 'SkaterPathSensorNode', SkaterPathSensorNode );
export default SkaterPathSensorNode;