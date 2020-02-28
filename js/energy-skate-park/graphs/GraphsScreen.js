// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Graphs" screen.
 *
 * @author Jesse Greenberg
 */

import Screen from '../../../../joist/js/Screen.js';
import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconFrictionHomescreen from '../../../images/icon-friction-homescreen_png.js';
import iconFrictionNavbar from '../../../images/icon-friction-navbar_png.js';
import energySkateParkStrings from '../../energy-skate-park-strings.js';
import energySkatePark from '../../energySkatePark.js';
import GraphsModel from './model/GraphsModel.js';
import GraphsScreenView from './view/GraphsScreenView.js';

const screenGraphsString = energySkateParkStrings.screen.graphs;

class GraphsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( tandem ) {
    const options = merge( {
      name: screenGraphsString,
      homeScreenIcon: new Image( iconFrictionHomescreen ),
      navigationBarIcon: new Image( iconFrictionNavbar ),
      tandem: tandem
    }, {} ); // REVIEW: should there be an options parameter to this constructor?

    super(
      () => new GraphsModel( tandem.createTandem( 'graphsModel' ) ),
      model => new GraphsScreenView( model, tandem.createTandem( 'graphsScreenView' ) ),
      options
    );
  }
}

energySkatePark.register( 'GraphsScreen', GraphsScreen );
export default GraphsScreen;