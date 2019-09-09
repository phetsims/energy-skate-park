// Copyright 2018-2019, University of Colorado Boulder

/**
 * The sensor that reads information from the samples along the skater path. Includes the body, wire, and sensor. The
 * body is stationary and the beter can be dragged to sample locations.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const ProbeNode = require( 'SCENERY_PHET/ProbeNode' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SunConstants = require( 'SUN/SunConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );
  const WireNode = require( 'SCENERY_PHET/WireNode' );

  // strings
  const energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  const energyJoulesPatternString = require( 'string!ENERGY_SKATE_PARK/energyJoulesPattern' );
  const energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  const energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  const energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  const energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );
  const heightMetersPatternString = require( 'string!ENERGY_SKATE_PARK/heightMetersPattern' );
  const speedMetersPerSecondPatternString = require( 'string!ENERGY_SKATE_PARK/speedMetersPerSecondPattern' );

  // constants
  const TITLE_CONTENT_SPACING = 4; // spacing between the "Energy" title and the rest of the content
  const LABEL_VALUE_SPACING = 4; // spacing between label text and the value readout rectangle
  const PROBE_READOUT_SPACING = 5; // spacing between the probe and the height/speed readouts
  const LAYOUT_SPACING = 1;
  const TEXT_COLOR = 'white';
  const TITLE_FONT = new PhetFont( 11 );
  const LABEL_FONT = new PhetFont( 9 );
  const ENTRY_MAX_WIDTH = 60;

  // arbitrary range for energies, but required so that this can use NumberDisplay. With this value, the width of the
  // NumberDisplay looks good and if released from within dev bounds, the energy will never get this large.
  const ENERGY_RANGE = new Range( -20000, 20000 );

  // offset so that the center of the probe aligns with sample locations
  const PROBE_CENTER_OFFSET = new Vector2( 5.5, 0 );

  // max distance between sample and probe center for the sample to be displayed, in view coordinates
  const PROBE_THRESHOLD_DISTANCE = 10;

  class SkaterPathSensorNode extends Node {

    /**
     * @param   {ObservableArray.<SkaterSample>} samples
     * @param   {Vector2Property} sensorProbePositionProperty
     * @param   {Vector2Property} sensorBodyPositionProperty
     * @param   {Property.<Bounds2>} modelBoundsProperty
     * @param   {ModelViewTransform} modelViewTransform
     * @param   {EnergySkateParkControlPanel} controlPanel - so the readout doesn't occlude control panel bounds
     * @param   {object} options
     * @returns {ObservableArray.<SkaterSample>}
     */
    constructor( samples, sensorProbePositionProperty, sensorBodyPositionProperty, modelBoundsProperty, modelViewTransform, controlPanel, options ) {
      options = _.extend( {

        // prevent block fitting so that things don't jiggle as the probe moves, see
        preventFit: true
      }, options );
      super( options );

      // @private - so the height speed readout doesn't occlude this
      this.screenViewControlPanel = controlPanel;
      this.modelViewTransform = modelViewTransform;

      // labels and value rectangles are in the same align group so that all entries have same width and height for
      // layout
      const alignGroup = new AlignGroup( { matchHorizontal: false });

      const kineticLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyKineticString );
      const potentialLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyPotentialString );
      const thermalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyThermalString );
      const totalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyTotalString );

      // label for the probe
      const energyLabel = new Text( energyEnergyString, {
        font: TITLE_FONT,
        fill: TEXT_COLOR,
        maxWidth: 80
      } );

      // @private {Property.<number|null> for the NumberDisplays, null unless probe is over a skater sample
      this.kineticValueProperty = new Property( null );
      this.potentialValueProperty = new Property( null );
      this.thermalValueProperty = new Property( null );
      this.totalValueProperty = new Property( null );

      // NumberDisplays for the body of the sensor, wrapped in an AlignBox
      this.kineticRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.kineticValueProperty );
      this.potentialRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.potentialValueProperty );
      this.thermalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.thermalValueProperty );
      this.totalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup, this.totalValueProperty );

      // @private - Height and speed are read to the right of the probe in a transparent panel for enhanced
      // visibility. We want the panel to resize as the text changes for different skater samples
      this.heightReadout = new Text( '' );
      this.speedReadout = new Text( '' );
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
      const body = new Rectangle( content.bounds.dilated( 5 ), 5, 5, {
        fill: 'rgb(47,64,113)',
        stroke: 'rgb(210,210,210)',
        lineWidth: 2
      } );
      body.addChild( content );

      sensorBodyPositionProperty.link( ( bodyPosition ) => {
        body.leftTop = modelViewTransform.modelToViewPosition( bodyPosition );
      } );

      // the probe
      this.probeNode = new ProbeNode( {
        scale: 0.40,
        rotation: Math.PI / 2,
        sensorTypeFunction: ProbeNode.crosshairs(),
        center: modelViewTransform.modelToViewPosition( sensorProbePositionProperty.get() ),
        cursor: 'pointer'
      } );

      sensorProbePositionProperty.link( ( position ) => {
        this.probeNode.translation = modelViewTransform.modelToViewPosition( position );
      } );

      // points and control points for the wire
      const p1Property = new DerivedProperty( [ sensorBodyPositionProperty ], ( bodyPosition ) => {
        return body.getCenterBottom().minusXY( 0, 5 );
      } );
      const normal1Property = new DerivedProperty( [ sensorProbePositionProperty, sensorBodyPositionProperty ], ( sensorPosition ) => {

        // changes with the probe position so the wire looks like it has slack as it gets longer
        const viewPosition = modelViewTransform.modelToViewPosition( sensorPosition );
        const distanceToBody = viewPosition.minus( p1Property.get() );
        return new Vector2( distanceToBody.x / 3, Math.max( distanceToBody.y, body.height * 2 ) );
      } );
      const p2Property = new DerivedProperty( [ sensorProbePositionProperty ], ( sensorPosition ) => {

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

      // @private - {SkaterSample|null} - the skater sample currently being inspected, reference so we can un-inspect
      // wihtout looping through all samples
      this.inspectedSample = null;

      // display the sample that is close to the sample of the probe - find the closest one in case multiple samples
      // are near the probe center
      sensorProbePositionProperty.link( ( modelPosition ) => {

        // clear the previous sample
        this.inspectedSample && this.clearDisplay( this.inspectedSample );

        // {SkaterSample|null} - the sample closest to the exact center of the probe and within threshold distance
        let sampleToDisplay = null;

        const viewProbePoint = this.localToParentPoint( this.probeNode.getCenter().plus( PROBE_CENTER_OFFSET ) );
        let minDistance = Number.POSITIVE_INFINITY;
        for ( let i = 0; i < samples.length; i++ ) {
          const sampleViewPoint = modelViewTransform.modelToViewPosition( samples.get( i ).position );
          const distanceToSample = Vector2.getDistanceBetweenVectors( sampleViewPoint, viewProbePoint );

          if ( distanceToSample < PROBE_THRESHOLD_DISTANCE && distanceToSample < minDistance ) {
            sampleToDisplay = samples.get( i );
            minDistance = distanceToSample;
          }
        }

        sampleToDisplay && this.displayState( sampleToDisplay );
      } );

      // add a drag listener to the probe body
      this.probeNode.addInputListener( new DragListener( {
        transform: modelViewTransform,
        locationProperty: sensorProbePositionProperty,
        dragBoundsProperty: modelBoundsProperty,
        tandem: options.tandem.createTandem( 'dragListener' )
      } ) );
    }

    /**
     * Display values assocated with a sample of skater state.
     * @private
     * @param  {SkaterSample} skaterSample
     */
    displayState( skaterSample ) {
      this.inspectedSample = skaterSample;

      skaterSample.inspectedProperty.set( true );

      // set values for display
      this.kineticValueProperty.value = skaterSample.kineticEnergy;
      this.potentialValueProperty.value = skaterSample.potentialEnergy;
      this.thermalValueProperty.value = skaterSample.thermalEnergy;
      this.totalValueProperty.value = skaterSample.totalEnergy;

      // set values for height and speed readout
      this.heightReadout.text = StringUtils.fillIn( heightMetersPatternString, {
        value: this.formatValue( skaterSample.position.y - skaterSample.referenceHeight )
      } );
      this.speedReadout.text = StringUtils.fillIn( speedMetersPerSecondPatternString, {
        value: this.formatValue( skaterSample.speed )
      } );

      this.heightSpeedRectangle.visible = true;
      this.positionReadouts( skaterSample );
    }

    /**
     * Position and sizes the height/speed readout which appears to the right of the probe, unless that would
     * occlude the screen view control panel
     *
     * @private
     */
    positionReadouts( skaterSample ) {
      this.heightSpeedRectangle.setRectBounds( this.heightSpeedVBox.bounds );
      this.heightSpeedRectangle.leftCenter = this.probeNode.rightCenter.plusXY( PROBE_READOUT_SPACING, 0 );

      // determine occlusion case from position of the sample point rather than the probe location so that
      // the display doesn't move around when measuring a single point
      const spacing = this.heightSpeedRectangle.width + this.probeNode.width / 2;
      const sampleViewPoint = this.modelViewTransform.modelToViewPosition( skaterSample.position );
      if ( Math.abs( sampleViewPoint.x - this.screenViewControlPanel.left ) < spacing ) {
        this.heightSpeedRectangle.leftTop = this.probeNode.leftBottom.plusXY( 0, PROBE_READOUT_SPACING );
      }
    }

    // this.globalToLocalBounds( node.getGlobalBounds() )

    /**
     * Each value in this readout will be as precise as one decimal.
     * @param  {number} value
     * @returns {string}
     */
    formatValue( value ) {
      return Util.toFixed( value, 1 );
    }

    /**
     * Clear all values in the displays.
     * @private
     *
     * @param {SkaterSample} skaterSample
     * @returns {}
     */
    clearDisplay( skaterSample ) {

      // setting Properties to null will show MathSymbols.NO_VALUE in NumberDisplay
      this.kineticValueProperty.value = null;
      this.potentialValueProperty.value = null;
      this.thermalValueProperty.value = null;
      this.totalValueProperty.value = null;

      this.inspectedSample = null;

      skaterSample.inspectedProperty.set( false );
      this.heightSpeedRectangle.visible = false;
    }

    /**
     * Create label text and wrap with an AlignBox so that all labels and readouts have the same dimensions for layout.
     * @private
     *
     * @param  {AlignGroup} alignGroup
     * @param  {string} labelString
     * @returns {AlignBox}
     */
    static createLabelBox( alignGroup, labelString ) {
      const labelText = new Text( labelString, { fill: TEXT_COLOR, font: LABEL_FONT, maxWidth: ENTRY_MAX_WIDTH } );
      return alignGroup.createBox( labelText, { xAlign: 'left' } );
    }

    /**
     * Create a rectangle to contain value readouts, wrapped in an align box so that labels and this rectangle all
     * have the same dimensions for layout purposes.
     * @private
     *
     * @param  {AlignGroup} alignGroup
     * @returns {AlignBox}
     */
    static createReadoutBox( alignGroup, valueProperty  ) {

      const numberDisplay = new NumberDisplay( valueProperty, ENERGY_RANGE, {
        backgroundStroke: 'black',
        backgroundFill: EnergySkateParkColorScheme.panelFill,
        cornerRadius: 3,
        font: LABEL_FONT,
        decimalPlaces: 1,
        minBackgroundWidth: 55, // determined by inspection, in addition to ENERGY_RANGE because the range is arbitrary
        numberMaxWidth: ENTRY_MAX_WIDTH,
        valuePattern: energyJoulesPatternString,

        // when there are no values, hide units
        noValuePattern: SunConstants.VALUE_NAMED_PLACEHOLDER,
        noValueAlign: 'center'
      } );

      return alignGroup.createBox( numberDisplay, { xAlign: 'right' } );
    }
  }

  return energySkatePark.register( 'SkaterPathSensorNode', SkaterPathSensorNode, {} );
} );
