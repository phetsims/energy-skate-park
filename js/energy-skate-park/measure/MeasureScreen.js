// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import iconFrictionHomescreen from '../../../images/icon-friction-homescreen_png.js';
import iconFrictionNavbar from '../../../images/icon-friction-navbar_png.js';
import energySkateParkStrings from '../../energySkateParkStrings.js';
import energySkatePark from '../../energySkatePark.js';
import MeasureModel from './model/MeasureModel.js';
import MeasureScreenView from './view/MeasureScreenView.js';

const screenMeasureString = energySkateParkStrings.screen.measure;

class MeasureScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    const options = {
      name: screenMeasureString,
      homeScreenIcon: new Image( iconFrictionHomescreen ),
      navigationBarIcon: new Image( iconFrictionNavbar ),

      tandem: tandem
    };

    super(
      () => new MeasureModel( tandem.createTandem( 'measureModel' ) ),
      model => new MeasureScreenView( model, tandem.createTandem( 'measureScreenView' ) ),
      options
    );

  }
}

energySkatePark.register( 'MeasureScreen', MeasureScreen );
export default MeasureScreen;