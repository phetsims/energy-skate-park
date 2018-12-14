// Copyright 2018, University of Colorado Boulder

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
  const DragListener= require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ProbeNode = require( 'SCENERY_PHET/ProbeNode' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );
  const WireNode = require( 'SCENERY_PHET/WireNode' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  const energyEnergyString = require( 'string!ENERGY_SKATE_PARK/energy.energy' );
  const energyKineticString = require( 'string!ENERGY_SKATE_PARK/energy.kinetic' );
  const energyPotentialString = require( 'string!ENERGY_SKATE_PARK/energy.potential' );
  const energyThermalString = require( 'string!ENERGY_SKATE_PARK/energy.thermal' );
  const energyTotalString = require( 'string!ENERGY_SKATE_PARK/energy.total' );
  const energyJoulesPatternString = require( 'string!ENERGY_SKATE_PARK/energyJoulesPattern' );
  const heightMetersPatternString = require( 'string!ENERGY_SKATE_PARK/heightMetersPattern' );
  const speedMetersPerSecondPatternString = require( 'string!ENERGY_SKATE_PARK/speedMetersPerSecondPattern' );

  // constants
  const VALUE_RIGHT_SPACING = 5;
  const TITLE_CONTENT_SPACING = 4;
  const PROBE_READOUT_SPACING = 5; // spacing between the probe and the height/speed readouts
  const LAYOUT_SPACING = 2;
  const TEXT_COLOR = 'white';
  const TITLE_FONT = new PhetFont( 13 );
  const LABEL_FONT = new PhetFont( 11 );

  // offset so that the center of the probe aligns with sample locations
  const PROBE_CENTER_OFFSET = new Vector2( 5.5, 0 );

  // max distance between sample and probe center for the sample to be displayed, in view coordinates
  const PROBE_THRESHOLD_DISTANCE = 10;

  class SkaterPathSensorNode extends Node {
    constructor( samples, sensorPositionProperty, modelViewTransform, options ) {
      options = _.extend( {

        // prevent block fitting so that things don't jiggle as the probe moves, see 
        preventFit: true
      }, options );
      super( options );

      // labels and value rectangles are in the same align group so that all entries have same width and height for
      // layout
      const alignGroup = new AlignGroup();

      const kineticLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyKineticString );
      const potentialLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyPotentialString );
      const thermalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyThermalString );
      const totalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyTotalString );

      // label for the probe
      const energyLabel = new Text( energyEnergyString, {
        font: TITLE_FONT,
        fill: TEXT_COLOR
      } );

      // value readouts for the body of the sensor
      this.kineticRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup );
      this.kineticReadout = new Text( '' );
      this.kineticRectangleBox.addChild( this.kineticReadout );

      this.potentialRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup );
      this.potentialReadout = new Text( '' );
      this.potentialRectangleBox.addChild( this.potentialReadout );

      this.thermalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup );
      this.thermalReadout = new Text( '' );
      this.thermalRectangleBox.addChild( this.thermalReadout );

      this.totalRectangleBox = SkaterPathSensorNode.createReadoutBox( alignGroup );
      this.totalReadout = new Text( '' );
      this.totalRectangleBox.addChild( this.totalReadout );

      // @private - Height and speed are read to the right of the probe in a transparent panel for enhanced
      // visibility. We want the panel to resize as the text changes for different skater samples
      this.heightReadout = new Text( '' );
      this.speedReadout = new Text( '' );
      this.heightSpeedVBox = new VBox( {
        children: [ this.heightReadout, this.speedReadout ],
        align: 'left'
      } );

      // TODO: Can this be a rectangle?
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
              new VBox( { children: [
                kineticLabelBox, potentialLabelBox, thermalLabelBox, totalLabelBox
              ], spacing: LAYOUT_SPACING } ),
              new VBox( { children: [
                this.kineticRectangleBox, this.potentialRectangleBox, this.thermalRectangleBox, this.totalRectangleBox
              ], spacing: LAYOUT_SPACING } )
            ]
          } )
        ], spacing: TITLE_CONTENT_SPACING
      } );

      // the body is a rounded rectangle
      const body = new Rectangle( content.bounds.dilated( 5 ), 5, 5, {
        fill: 'rgb(63,72,204)',
        stroke: 'rgb(210,210,210)',
        lineWidth: 2
      } );
      body.addChild( content );

      // the probe
      this.probeNode = new ProbeNode( {
        scale: 0.40,
        rotation: Math.PI / 2,
        sensorTypeFunction: ProbeNode.crosshairs(),
        center: new Vector2( 0, 0 )
      } );

      // points and control points for the wire
      const normal1Property = new Property( new Vector2( 0, 200 ) );
      const normal2Property = new Property( new Vector2( -150, 0 ) );
      const p1Property = new Property( body.getCenterBottom() );
      const p2Property = new DerivedProperty( [ sensorPositionProperty ], ( sensorPosition ) => {

        // calculate the left of the probe in view coordinates
        const viewPosition = modelViewTransform.modelToViewPosition( sensorPosition );
        const viewWidth = this.probeNode.width;
        return viewPosition.minusXY( viewWidth / 2, 0 );
      } );

      const wireNode = new WireNode( p1Property, normal1Property, p2Property, normal2Property, {
        lineWidth: 4
      } );

      this.addChild( body );
      this.addChild( wireNode );
      this.addChild( this.probeNode );
      this.addChild( this.heightSpeedRectangle );

      // @private - {SkaterSample|null} - the skater sample currently being inspected, reference so we can un-inspect
      // wihtout looping through all samples
      this.inspectedSample = null;

      // display the sample that is close to the sample of the probe - find the closest one in case multiple samples
      // are near the probe center
      sensorPositionProperty.link( ( modelPosition ) => {

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
        locationProperty: sensorPositionProperty,
        translateNode: true
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

      this.kineticReadout.text = this.formatEnergyValue( skaterSample.kineticEnergy );
      this.potentialReadout.text = this.formatEnergyValue( skaterSample.potentialEnergy );
      this.thermalReadout.text = this.formatEnergyValue( skaterSample.thermalEnergy );
      this.totalReadout.text = this.formatEnergyValue( skaterSample.totalEnergy );

      this.heightReadout.text = StringUtils.fillIn( heightMetersPatternString, {
        value: this.formatValue( skaterSample.position.y - skaterSample.referenceHeight )
      } );

      this.speedReadout.text = StringUtils.fillIn( speedMetersPerSecondPatternString, {
        value: this.formatValue( skaterSample.speed )
      } );

      this.heightSpeedRectangle.visible = true;

      this.positionReadouts();
    }

    /**
     * Position the value text in the body/display. The readout rectangles use AlignGroup/HBox, so we need to
     * get the right of the boxes in the local coordinate frame to align correctly.
     *
     * Also positions and sizes the height/speed readout which appears to the right of the probe unless a panel would
     * cover it.
     * 
     * @private
     */
    positionReadouts() {
      this.kineticReadout.rightCenter = this.kineticRectangleBox.parentToLocalPoint( this.kineticRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.potentialReadout.rightCenter = this.potentialRectangleBox.parentToLocalPoint( this.potentialRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.thermalReadout.rightCenter = this.thermalRectangleBox.parentToLocalPoint( this.thermalRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.totalReadout.rightCenter = this.totalRectangleBox.parentToLocalPoint( this.totalRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 

      this.heightSpeedRectangle.setRectBounds( this.heightSpeedVBox.bounds );
      this.heightSpeedRectangle.leftCenter = this.probeNode.rightCenter.plusXY( PROBE_READOUT_SPACING, 0 );
    }

    /**
     * Format a value for readout in the sensor display, each value having one decimal point, followed by units in J.
     * @private
     * @param  {number} value
     * @return {string}
     */
    formatEnergyValue( value ) {
      return StringUtils.fillIn( energyJoulesPatternString, {
        value: this.formatValue( value )
      } ); 
    }

    /**
     * Each value in this readout will be as precise as one decimal.
     * @param  {number} value
     * @return {string}
     */
    formatValue( value ) {
      return Util.toFixed( value, 1 );
    }

    /**
     * Clear all values in the displays.
     * @private
     * 
     * @param {SkaterSample} skaterSample
     * @return {}
     */
    clearDisplay( skaterSample ) {
      this.kineticReadout.text = '';
      this.potentialReadout.text = '';
      this.thermalReadout.text = '';
      this.totalReadout.text = '';

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
     * @return {AlignBox}             
     */
    static createLabelBox( alignGroup, labelString ) {
      const labelText = new Text( labelString, { fill: TEXT_COLOR, font: LABEL_FONT } );
      return alignGroup.createBox( labelText, { xAlign: 'left' } );
    }

    /**
     * Create a rectangle to contain value readouts, wrapped in an align box so that labels and this rectangle all
     * have the same dimensions for layout purposes.
     * @private
     * 
     * @param  {AlignGroup} alignGroup
     * @return {AlignBox}
     */
    static createReadoutBox( alignGroup ) {
      const rectangle = new Rectangle( 0, 0, 50, 15, 3, 3, { fill: EnergySkateParkColorScheme.panelFill, stroke: 'black' } );
      return alignGroup.createBox( rectangle, { xAlign: 'right' } );
    }
  }

  return energySkatePark.register( 'SkaterPathSensorNode', SkaterPathSensorNode, {} );
} );
