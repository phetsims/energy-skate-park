// Copyright 2013-2019, University of Colorado Boulder

/**
 * Radio button group for choosing one of the tracks, used in a "Track Set" screen of EnergySkatePark. This changes
 * the "scene" of the sim.
 *
 * @author Sam Reid
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/BackgroundNode' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var TrackNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/TrackNode' );

  /**
   * Construct a SceneSelectionRadioButtonGroup.  Pass the entire model since it is used to create TrackNode
   * @param {EnergySkateParkModel} model the main model for the entire screen
   * @param {EnergySkateParkBasicsView} view the main view for the entire screen
   * @param {ModelViewTransform2} transform the model view transform
   * @param {Tandem} tandem
   * @constructor
   */
  function SceneSelectionRadioButtonGroup( model, view, tandem, options ) {

    options = _.extend( {

      // specific and passed to RadioButtonGroup
      orientation: 'horizontal',
      buttonContentXMargin: 3,
      buttonContentYMargin: 3,
      cornerRadius: 2,
      selectedStroke: 'rgb(87,178,226)',
      baseColor: 'white',
      tandem: tandem,

      // {boolean} - should mountains, background, and sky be included in the icon for track buttons?
      includeBackground: false
    }, options );

    // produces spacing of ~5 when there are 4 premade tracks which is the usual case and looks nice, and provides
    // more spacing if there are fewer tracks
    assert && assert( options.spacing === undefined, 'SceneSelectionRadioButtonGroup sets spacing from number of premade tracks' );
    options.spacing = 20 / model.tracks.length;

    // Create a button with a scene like the track in the index
    var createNode = function( index ) {
      var children = [];

      if ( options.includeBackground ) {
        var background = new BackgroundNode( view.layoutBounds, tandem.createTandem( 'backgroundNode' + index ) );
        background.layout( 0, 0, view.layoutBounds.width, view.layoutBounds.height, 1 );
        children.push( background );
      }

      var track = model.tracks.get( index );
      var trackNode = new TrackNode( model, track, view.modelViewTransform, new Property(), tandem.createTandem( 'trackNode' + index ) );

      // use a rasterized version of the node so that the icon doesn't change with the model for configurable tracks
      var iconNode = trackNode.rasterized();
      children.push( iconNode );

      // Fixes: Cursor turns into a hand over the track in the track selection panel, see #204
      iconNode.pickable = false;

      var contentNode = new Node( {
        tandem: tandem.createTandem( 'contentNode' + index ),
        children: children
      } );

      return contentNode;
    };

    // create the contents for the radio buttons
    var contents = [];
    _.forEach( model.tracks, function( track, i ) {
      var contentNode = createNode( i );
      contents.push( contentNode );
    } );

    var minWidth = _.minBy( contents, function( node ) { return node.width; } ).width;

    const buttonAlignGroup = new AlignGroup();

    var radioButtonContent = [];
    _.forEach( contents, function( node, i ) {

      // scalar chosen so that buttons are appropriately sized in the control panel
      var contentScale = ( 22 / minWidth );

      // if there isn't a background, scale the tracks so that they are all the same width
      if ( !options.includeBackground ) {
        node.setScaleMagnitude( contentScale * ( minWidth / node.width ) );
      }
      else {
        node.scale( contentScale );
      }

      // place in an align group and add margins so that the buttons are always square
      const alignedNode = buttonAlignGroup.createBox( node );
      const margin = Math.abs( alignedNode.width - alignedNode.height ) / 2;
      if ( margin !== 0 ) {
        const setterFunction = alignedNode.height < alignedNode.width ?  alignedNode.setYMargin : alignedNode.setXMargin;
        setterFunction.call( alignedNode, margin );
      }

      radioButtonContent.push( {
        value: i,
        node: alignedNode,
        tandemName: 'scene' + ( i + 1 ) + 'RadioButton'
      } );
    } );

    RadioButtonGroup.call( this, model.sceneProperty, radioButtonContent, options );
  }

  energySkatePark.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );

  return inherit( RadioButtonGroup, SceneSelectionRadioButtonGroup );
} );