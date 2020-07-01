// Copyright 2018-2020, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import measureScreenIcon from '../../images/measure-screen-icon_png.js';
import energySkateParkStrings from '../energySkateParkStrings.js';
import energySkatePark from '../energySkatePark.js';
import MeasureModel from './model/MeasureModel.js';
import MeasureScreenView from './view/MeasureScreenView.js';

const screenMeasureString = energySkateParkStrings.screens.measure;

class MeasureScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    const options = {
      name: screenMeasureString,
      homeScreenIcon: new ScreenIcon( new Image( measureScreenIcon ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
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