// Copyright 2013-2020, University of Colorado Boulder

/**
 * Radio button group for choosing one of the tracks, used in a "Track Set" screen of EnergySkatePark. This changes
 * the "scene" of the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../../axon/js/Property.js';
import Bounds2 from '../../../../../dot/js/Bounds2.js';
import merge from '../../../../../phet-core/js/merge.js';
import AlignGroup from '../../../../../scenery/js/nodes/AlignGroup.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import RadioButtonGroup from '../../../../../sun/js/buttons/RadioButtonGroup.js';
import energySkatePark from '../../../energySkatePark.js';
import BackgroundNode from './BackgroundNode.js';
import TrackNode from './TrackNode.js';

class SceneSelectionRadioButtonGroup extends RadioButtonGroup {

  /**
   * Construct a SceneSelectionRadioButtonGroup.  Pass the entire model since it is used to create TrackNode
   *
   * @param {EnergySkateParkModel} model the main model for the entire screen
   * @param {EnergySkateParkBasicsView} view the main view for the entire screen
   * @param {ModelViewTransform2} transform the model view transform
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( model, view, tandem, options ) {
    assert && assert( model.sceneProperty !== undefined, 'model does not support a scene' );

    options = merge( {

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
    const createNode = index => {
      const children = [];

      if ( options.includeBackground ) {
        const background = new BackgroundNode( view.layoutBounds, tandem.createTandem( 'backgroundNode' + index ) );
        background.layout( new Bounds2( 0, 0, view.layoutBounds.width, view.layoutBounds.height ), 1 );
        children.push( background );
      }

      const track = model.tracks.get( index );
      const trackNode = new TrackNode( model, track, view.modelViewTransform, new Property(), tandem.createTandem( 'trackNode' + index ) );

      // use a rasterized version of the node so that the icon doesn't change with the model for configurable tracks
      const iconNode = trackNode.rasterized();
      children.push( iconNode );

      // Fixes: Cursor turns into a hand over the track in the track selection panel, see #204
      iconNode.pickable = false;

      const contentNode = new Node( {
        tandem: tandem.createTandem( 'contentNode' + index ),
        children: children
      } );

      return contentNode;
    };

    // create the contents for the radio buttons
    const contents = [];
    _.forEach( model.tracks, ( track, i ) => {
      const contentNode = createNode( i );
      contents.push( contentNode );
    } );

    const minWidth = _.minBy( contents, node => node.width ).width;

    const buttonAlignGroup = new AlignGroup();

    const radioButtonContent = [];
    _.forEach( contents, ( node, i ) => {

      // scalar chosen so that buttons are appropriately sized in the control panel
      const contentScale = ( 22 / minWidth );

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
        const setterFunction = alignedNode.height < alignedNode.width ? alignedNode.setYMargin : alignedNode.setXMargin;
        setterFunction.call( alignedNode, margin );
      }

      radioButtonContent.push( {
        value: i,
        node: alignedNode,
        tandemName: 'scene' + ( i + 1 ) + 'RadioButton'
      } );
    } );

    super( model.sceneProperty, radioButtonContent, options );
  }
}

energySkatePark.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );
export default SceneSelectionRadioButtonGroup;