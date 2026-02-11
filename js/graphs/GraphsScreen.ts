// Copyright 2018-2026, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import graphsScreenIcon_png from '../../images/graphsScreenIcon_png.js';
import EnergySkateParkPreferencesModel from '../common/model/EnergySkateParkPreferencesModel.js';
import EnergySkateParkKeyboardHelpContent from '../common/view/EnergySkateParkKeyboardHelpContent.js';
import energySkatePark from '../energySkatePark.js';
import GraphControlsKeyboardHelpSection from './view/GraphControlsKeyboardHelpSection.js';
import EnergySkateParkFluent from '../EnergySkateParkFluent.js';
import GraphsModel from './model/GraphsModel.js';
import GraphsScreenView from './view/GraphsScreenView.js';

export default class GraphsScreen extends Screen<GraphsModel, GraphsScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super(
      () => new GraphsModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new GraphsScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: EnergySkateParkFluent.screens.graphsStringProperty,
        homeScreenIcon: new ScreenIcon( new Image( graphsScreenIcon_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem,
        screenButtonsHelpText: EnergySkateParkFluent.a11y.screenButtons.graphs.accessibleHelpTextStringProperty,
        createKeyboardHelpNode: () => new EnergySkateParkKeyboardHelpContent( {
          additionalLeftSections: [ new GraphControlsKeyboardHelpSection() ],
          includeReturnToolToToolbox: true
        } )
      }
    );
  }
}

energySkatePark.register( 'GraphsScreen', GraphsScreen );