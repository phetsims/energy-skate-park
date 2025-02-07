// Copyright 2018-2025, University of Colorado Boulder

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
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkStrings from '../EnergySkateParkStrings.js';
import GraphsModel from './model/GraphsModel.js';
import GraphsScreenView from './view/GraphsScreenView.js';

export default class GraphsScreen extends Screen<GraphsModel, GraphsScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    super(
      () => new GraphsModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new GraphsScreenView( model, tandem.createTandem( 'view' ) ),
      {
        name: EnergySkateParkStrings.screens.graphsStringProperty,
        homeScreenIcon: new ScreenIcon( new Image( graphsScreenIcon_png ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

energySkatePark.register( 'GraphsScreen', GraphsScreen );