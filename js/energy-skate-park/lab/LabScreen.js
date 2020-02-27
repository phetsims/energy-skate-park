// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Lab" screen. No premade tracks. More open space for the user to play with custom tracks.
 *
 * @author Jesse Greenberg
 */

import Screen from '../../../../joist/js/Screen.js';
import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconPlaygroundHomescreen from '../../../images/icon-playground-homescreen_png.js';
import iconPlaygroundNavbar from '../../../images/icon-playground-navbar_png.js';
import energySkateParkStrings from '../../energy-skate-park-strings.js';
import energySkatePark from '../../energySkatePark.js';
import LabModel from './model/LabModel.js';
import LabScreenView from './view/LabScreenView.js';

const screenLabString = energySkateParkStrings.screen.lab;

class LabScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  constructor( tandem ) {

    var options = merge( {
      name: screenLabString,
      homeScreenIcon: new Image( iconPlaygroundHomescreen ),
      navigationBarIcon: new Image( iconPlaygroundNavbar ),

      tandem: tandem
    }, options );

    super(
      () => new LabModel( tandem.createTandem( 'labModel' ) ),
      model => new LabScreenView( model, tandem.createTandem( 'labScreenView' ) ),
      options
    );
  }
}

energySkatePark.register( 'LabScreen', LabScreen );
export default LabScreen;