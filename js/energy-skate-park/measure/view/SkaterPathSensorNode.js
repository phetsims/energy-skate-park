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

  // constants
  const VALUE_RIGHT_SPACING = 5;
  const TITLE_CONTENT_SPACING = 4;
  const LAYOUT_SPACING = 2;
  const TEXT_COLOR = 'white';
  const TITLE_FONT = new PhetFont( 13 );
  const LABEL_FONT = new PhetFont( 11 );

  // offset so that the center of the probe aligns with sample locations
  const PROBE_CENTER_OFFSET = new Vector2( -25, 37 );


  class SkaterPathSensorNode extends Node {
    constructor( samples, sensorPositionProperty, modelViewTransform, options ) {
      options = _.extend( {}, options );
      super();

      // labels and value rectangles are in the same align group so that all entries have same width and height for
      // layout
      const alignGroup = new AlignGroup();

      const kineticLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyKineticString );
      const potentialLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyPotentialString );
      const thermalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyThermalString );
      const totalLabelBox = SkaterPathSensorNode.createLabelBox( alignGroup, energyTotalString );

      // label for the probe
      var energyLabel = new Text( energyEnergyString, {
        font: TITLE_FONT,
        fill: TEXT_COLOR
      } );

      // value readouts
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
      const probeNode = new ProbeNode( {
        scale: 0.40,
        rotation: Math.PI / 2,
        sensorTypeFunction: ProbeNode.crosshairs(),
        center: PROBE_CENTER_OFFSET
      } );

      // points and control points for the wire
      const normal1Property = new Property( new Vector2( 0, 200 ) );
      const normal2Property = new Property( new Vector2( -150, 0 ) );
      const p1Property = new Property( body.getCenterBottom() );
      const p2Property = new DerivedProperty( [ sensorPositionProperty ], ( sensorPosition ) => {

        // calculate the left of the probe in view coordinates
        const viewPosition = modelViewTransform.modelToViewPosition( sensorPosition );
        const viewWidth = probeNode.width;
        return viewPosition.minusXY( viewWidth / 2, 0 );
      } );

      const wireNode = new WireNode( p1Property, normal1Property, p2Property, normal2Property, {
        lineWidth: 4
      } );

      this.addChild( body );
      this.addChild( wireNode );
      this.addChild( probeNode );

      // position the node and update readouts if probe is on top of a sample
      sensorPositionProperty.link( ( modelPosition ) => {

        // position the node
        probeNode.translation = modelViewTransform.modelToViewPosition( modelPosition );

        // compare the center of the crosshairs in the probe node
        const modelProbeCenter = modelViewTransform.viewToModelPosition( probeNode.getCenter() );
        for ( let i = 0; i < samples.length; i++ ) {
          if ( modelProbeCenter.equalsEpsilon( samples.get( i ).position, 0.5 ) ) {
            this.displayState( samples.get( i ) );
            break;
          }
          else {
            this.clearDisplay();
          }
        }
      } );

      // add a drag listener to the probe body
      probeNode.addInputListener( new DragListener( {
        transform: modelViewTransform,
        drag: ( event, listener ) => {
          let pMouse = this.globalToParentPoint( event.pointer.point );
          let modelMouse = modelViewTransform.viewToModelPosition( pMouse );
          sensorPositionProperty.set( modelMouse );
        }
      } ) );
    }

    /**
     * Display values assocated with a sample of skater state.
     * @private
     * @param  {SkaterSample} skaterSample
     */
    displayState( skaterSample ) {
      this.kineticReadout.text = this.formatValue( skaterSample.kineticEnergy );
      this.potentialReadout.text = this.formatValue( skaterSample.potentialEnergy );
      this.thermalReadout.text = this.formatValue( skaterSample.thermalEnergy );
      this.totalReadout.text = this.formatValue( skaterSample.totalEnergy );

      this.positionReadouts();
    }

    /**
     * Position the value text in the body/display. The readout rectangles use AlignGroup/HBox, so we need to
     * get the right of the boxes in the local coordinate frame to align correctly.
     * @private
     */
    positionReadouts() {
      this.kineticReadout.rightCenter = this.kineticRectangleBox.parentToLocalPoint( this.kineticRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.potentialReadout.rightCenter = this.potentialRectangleBox.parentToLocalPoint( this.potentialRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.thermalReadout.rightCenter = this.thermalRectangleBox.parentToLocalPoint( this.thermalRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
      this.totalReadout.rightCenter = this.totalRectangleBox.parentToLocalPoint( this.totalRectangleBox.rightCenter ).minusXY( VALUE_RIGHT_SPACING, 0 ); 
    }

    /**
     * Format a value for readout in the sensor display, each value having one decimal point.
     * @private
     * @param  {number} value
     * @return {string}
     */
    formatValue( value ) {
      return StringUtils.fillIn( energyJoulesPatternString, {
        value: Util.toFixed( value, 1 )
      } ); 
    }

    /**
     * Clear all values in the display.
     * @private
     * @return {}
     */
    clearDisplay() {
      this.kineticReadout.text = '';
      this.potentialReadout.text = '';
      this.thermalReadout.text = '';
      this.totalReadout.text = '';
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
