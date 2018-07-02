// Copyright 2013-2017, University of Colorado Boulder

/**
 * Panel with radio buttons for choosing one of three tracks, in the first 2 screens of Energy Skate Park.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var BackgroundNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/BackgroundNode' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var TrackNode = require( 'ENERGY_SKATE_PARK/energy-skate-park/view/TrackNode' );

  /**
   * Construct a SceneSelectionPanel.  Pass the entire model since it is used to create TrackNode
   * @param {EnergySkateParkModel} model the main model for the entire screen
   * @param {EnergySkateParkBasicsView} view the main view for the entire screen
   * @param {ModelViewTransform2} transform the model view transform
   * @param {Tandem} tandem
   * @constructor
   */
  function SceneSelectionPanel( model, view, transform, tandem ) {

    // Create a button with a scene like the track in the index
    var createNode = function( index ) {
      var track = model.tracks.get( index );
      var background = new BackgroundNode( view.layoutBounds, tandem.createTandem( 'backgroundNode' + index ) );
      background.layout( 0, 0, view.layoutBounds.width, view.layoutBounds.height, 1 );
      var trackNode = new TrackNode( model, track, transform, new Property(), tandem.createTandem( 'trackNode' + index ) );

      // Fixes: Cursor turns into a hand over the track in the track selection panel, see #204
      trackNode.pickable = false;

      var contentNode = new Node( {
        tandem: tandem.createTandem( 'contentNode' + index ),
        children: [ background, trackNode ]
      } );
      contentNode.scale( 45 / contentNode.height );
      return contentNode;
    };

    var content = new RadioButtonGroup( model.sceneProperty, [
      {
        value: 0,
        node: createNode( 0 ),
        tandemName: 'scene1RadioButton'
      },
      {
        value: 1,
        node: createNode( 1 ),
        tandemName: 'scene2RadioButton'
      },
      {
        value: 2,
        node: createNode( 2 ),
        tandemName: 'scene3RadioButton'
      }
    ], {
      orientation: 'vertical',
      buttonContentXMargin: 0,
      buttonContentYMargin: 0,
      cornerRadius: 0,
      selectedLineWidth: 3,
      tandem: tandem.createTandem( 'radioButtonGroup' )
    } );

    Panel.call( this, content, {
      fill: '#F0F0F0',
      xMargin: 10,
      stroke: null,
      tandem: tandem
    } );
  }

  energySkatePark.register( 'SceneSelectionPanel', SceneSelectionPanel );

  return inherit( Panel, SceneSelectionPanel );
} );