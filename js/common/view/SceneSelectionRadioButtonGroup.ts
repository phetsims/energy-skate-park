// Copyright 2013-2026, University of Colorado Boulder

/**
 * Radio button group for choosing one of the tracks, used in a "Track Set" screen of EnergySkatePark. This changes
 * the "scene" of the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import PremadeTracks, { TrackType } from '../model/PremadeTracks.js';
import BackgroundNode from './BackgroundNode.js';
import EnergySkateParkColorScheme from './EnergySkateParkColorScheme.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import TrackNode from './TrackNode.js';

type SelfOptions = {
  // should mountains, background, and sky be included in the icon for track buttons?
  includeBackground?: boolean;
};

type SceneSelectionRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class SceneSelectionRadioButtonGroup extends RectangularRadioButtonGroup<number> {

  /**
   * Construct a SceneSelectionRadioButtonGroup.  Pass the entire model since it is used to create TrackNode
   *
   * @param model - the main model for the entire screen
   * @param view - the main view for the entire screen
   * @param tandem
   * @param [options]
   */
  public constructor( model: EnergySkateParkTrackSetModel, view: EnergySkateParkScreenView, tandem: Tandem, providedOptions?: SceneSelectionRadioButtonGroupOptions ) {
    affirm( model.hasOwnProperty( 'sceneProperty' ), 'model does not support a scene' );

    const options = optionize<SceneSelectionRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {
      // specific and passed to RectangularRadioButtonGroup
      orientation: 'horizontal',
      radioButtonOptions: {
        xMargin: EnergySkateParkConstants.RADIO_BUTTON_CONTENT_MARGIN,
        yMargin: EnergySkateParkConstants.RADIO_BUTTON_CONTENT_MARGIN,
        cornerRadius: EnergySkateParkConstants.RADIO_BUTTON_CORNER_RADIUS,
        baseColor: EnergySkateParkColorScheme.radioButtonBaseColor,
        buttonAppearanceStrategyOptions: {
          selectedStroke: EnergySkateParkColorScheme.radioButtonSelectedStroke
        }
      },
      accessibleName: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.accessibleNameStringProperty,
      tandem: tandem,
      includeBackground: false,
      layoutOptions: { stretch: false },
      spacing: 7
    }, providedOptions );

    // Create a track to be used specifically for an icon - must be one of the premade tracks defined in
    // PremadeTracks.TrackType. These Tracks are a bit different from the actual tracks used in the model
    // because their sizing and dimensions need to be different to look better as icons for radio buttons
    const createIconTrack = ( trackType: TrackType ) => {

      // all tracks have the same width and height so they take up the same dimensions in a radio button, so one
      // doesn't get scaled down more than another and look thinner
      const controlPointOptions = {
        trackWidth: 6,
        trackHeight: 6
      };

      let track = null;
      if ( trackType === 'PARABOLA' ) {
        const parabolaControlPoints = PremadeTracks.createParabolaControlPoints( model, Tandem.OPT_OUT, controlPointOptions );
        track = EnergySkateParkTrackSetModel.createPremadeTrack( model, parabolaControlPoints );
      }
      else if ( trackType === 'RAMP' ) {
        const rampControlPoints = PremadeTracks.createSlopeControlPoints( model, Tandem.OPT_OUT, controlPointOptions );
        track = EnergySkateParkTrackSetModel.createPremadeTrack( model, rampControlPoints );
      }
      else if ( trackType === 'DOUBLE_WELL' ) {
        const doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( model, Tandem.OPT_OUT, controlPointOptions );
        track = EnergySkateParkTrackSetModel.createPremadeTrack( model, doubleWellControlPoints );
      }
      else if ( trackType === 'LOOP' ) {
        const loopControlPoints = PremadeTracks.createLoopControlPoints( model, Tandem.OPT_OUT, merge( {
          innerLoopWidth: 2.5,
          innerLoopTop: 3.5
        }, controlPointOptions ) );
        track = EnergySkateParkTrackSetModel.createPremadeTrack( model, loopControlPoints );
      }
      else {
        throw new Error( 'unsupported TrackType: ' + trackType );
      }

      return track;
    };

    // Create a button with a scene like the track in the index
    const createNode = ( index: number ) => {
      const children = [];

      if ( options.includeBackground ) {
        const background = new BackgroundNode( view.layoutBounds, new Property( new Bounds2( 0, 0, view.layoutBounds.width, view.layoutBounds.height ) ) );
        children.push( background );
      }

      const track = createIconTrack( model.trackTypes[ index ] );

      const trackNode = new TrackNode( track, view.modelViewTransform, new Property( Bounds2.EVERYTHING ), tandem.createTandem( `trackNode${index}` ), {
        isIcon: true
      } );

      // use a rasterized version of the node so that the icon doesn't change with the model for configurable tracks
      const iconNode = rasterizeNode( trackNode );
      children.push( iconNode );

      // Fixes: Cursor turns into a hand over the track in the track selection panel, see #204
      iconNode.pickable = false;

      return new Node( {
        tandem: tandem.createTandem( `contentNode${index}` ),
        children: children
      } );
    };

    // create the contents for the radio buttons
    const contents: Node[] = [];
    _.forEach( model.tracks, ( track, i ) => {
      const contentNode = createNode( i );
      contents.push( contentNode );
    } );

    const minWidth = _.minBy( contents, node => node.width )!.width;

    const buttonAlignGroup = new AlignGroup();

    // Keep accessible names tied to track identity, not index order, so subsets of track types remain correct.
    const sceneAccessibleNameMap: Record<TrackType, TReadOnlyProperty<string>> = {
      PARABOLA: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
      RAMP: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty,
      DOUBLE_WELL: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty,
      LOOP: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty
    };

    const radioButtonContent: { value: number; createNode: () => Node; tandemName: string; options?: object }[] = [];
    _.forEach( contents, ( node, i ) => {

      // scalar chosen so that buttons are appropriately sized in the control panel
      const contentScale = ( 27 / minWidth );

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
        createNode: () => alignedNode,
        tandemName: `scene${i + 1}RadioButton`,
        options: {
          accessibleName: sceneAccessibleNameMap[ model.trackTypes[ i ] ]
        }
      } );
    } );

    super( model.sceneProperty, radioButtonContent, options );
  }
}

energySkatePark.register( 'SceneSelectionRadioButtonGroup', SceneSelectionRadioButtonGroup );
