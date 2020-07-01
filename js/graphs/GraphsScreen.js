// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import graphsScreenIcon from '../../images/graphs-screen-icon_png.js';
import energySkatePark from '../energySkatePark.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import GraphsModel from './model/GraphsModel.js';
import GraphsScreenView from './view/GraphsScreenView.js';

const screenGraphsString = energySkateParkStrings.screens.graphs;

class GraphsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      () => new GraphsModel( tandem.createTandem( 'graphsModel' ) ),
      model => new GraphsScreenView( model, tandem.createTandem( 'graphsScreenView' ) ),
      {
        name: screenGraphsString,
        homeScreenIcon: new ScreenIcon( new Image( graphsScreenIcon ), {
          maxIconWidthProportion: 1,
          maxIconHeightProportion: 1
        } ),
        tandem: tandem
      }
    );
  }
}

energySkatePark.register( 'GraphsScreen', GraphsScreen );
export default GraphsScreen;