// Copyright 2018, University of Colorado Boulder

/**
 * Type Documentation
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/EnergySkateParkColorScheme' );
  var Checkbox = require( 'SUN/Checkbox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var Shape = require( 'KITE/Shape' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var GaugeNode = require( 'SCENERY_PHET/GaugeNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  // 
  // strings
  var propertiesSpeedString = require( 'string!ENERGY_SKATE_PARK/properties.speed' );
  
  /**
   * [EnergySkateParkCheckboxItem description]
   * @param {[type]} label          [description]
   * @param {[type]} icon           [description]
   * @param {[type]} textAlignGroup [description]
   * @param {[type]} property       [description]
   * @param {[type]} options        [description]
   */
  function EnergySkateParkCheckboxItem( label, icon, textAlignGroup, property, tandem, options ) {
    assert && assert( textAlignGroup.matchHorizontal === true, 'text content in check boxes must align' );
    assert && assert( textAlignGroup.matchVertical === true, 'text content for checkboxes in group must align' );

    var textOptions = {
      font: new PhetFont( 14 ),
      maxWidth: 134 // selected by choosing the length of widest English string in ?stringTest=double
    };

    var checkboxItemOptions = {
      boxWidth: 18
    };

    // create text and an align box for it so that all text in a group of items is aligned
    var text = new Text( label, _.extend( { tandem: tandem.createTandem( 'itemLabel' ) }, textOptions ) );
    var textBox = textAlignGroup.createBox( text, { xAlign: 'left' } );

    var checkbox = new Checkbox( textBox, property, checkboxItemOptions );

    HBox.call( this, {
      children: [ checkbox, icon ],
      spacing: 10
    } );
  }

  energySkatePark.register( 'EnergySkateParkCheckboxItem', EnergySkateParkCheckboxItem );

  return inherit( HBox, EnergySkateParkCheckboxItem, {}, {

    // Create an icon for the bar graph checkbox
    createBarGraphIcon: function( tandem ) {
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
    },

    // Create an icon for the pie chart checkbox
    createPieChartIcon: function( tandem ) {
      var radius = 10;
      var x = new Shape().moveTo( 0, 0 ).ellipticalArc( 0, 0, radius, radius, 0, -Math.PI / 2, 0, false ).lineTo( 0, 0 );
      return new Node( {
        tandem: tandem,
        children: [
          new Circle( radius, { fill: EnergySkateParkColorScheme.potentialEnergy, lineWidth: 0.5, stroke: 'black' } ),
          new Path( x, {
            tandem: tandem.createTandem( 'path' ), // TODO: What is this path for
            fill: EnergySkateParkColorScheme.kineticEnergy, lineWidth: 0.5, stroke: 'black'
          } )
        ]
      } );
    },

    // Create an icon for the grid checkbox
    createGridIcon: function( tandem ) {
      return new Node( {
        tandem: tandem,
        children: [
          new Rectangle( 0, 0, 20, 20, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ),
          new Line( 0, 10, 20, 10, { stroke: 'black', lineWidth: 1 } ),
          new Line( 0, 5, 20, 5, { stroke: 'black', lineWidth: 0.5 } ),
          new Line( 0, 15, 20, 15, { stroke: 'black', lineWidth: 0.5 } ),
          new Line( 10, 0, 10, 20, { stroke: 'black', lineWidth: 1 } ),
          new Line( 5, 0, 5, 20, { stroke: 'black', lineWidth: 0.5 } ),
          new Line( 15, 0, 15, 20, { stroke: 'black', lineWidth: 0.5 } )
        ]
      } );
    },

    // Create an icon for the speedometer checkbox
    createSpeedometerIcon: function( tandem ) {
      var node = new GaugeNode( new Property( 0 ), propertiesSpeedString, { min: 0, max: 10 },
        { pickable: false,
          tandem: tandem.createTandem( 'gaugeNode')
        } );
      node.scale( 20 / node.width );
      return node;
    },

    // icon for reference height, three circles aligned horizontally
    createReferenceHeightIcon: function( tandem ) {
      var shape = new Shape();

      // create three circles in the shape
      shape.circle( 0, 0, 2 ).newSubpath().circle( 8, 0, 2 ).newSubpath().circle( 16, 0, 2 );

      return new Path( shape, {
        fill: 'black'
      } );
    }
  } );
} );
