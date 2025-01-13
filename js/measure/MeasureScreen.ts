// Copyright 2018-2025, University of Colorado Boulder

/**
 * The "Measure" screen.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import measureScreenIcon_png from '../../images/measureScreenIcon_png.js';
import EnergySkateParkPreferencesModel from '../common/model/EnergySkateParkPreferencesModel.js';
import energySkatePark from '../energySkatePark.js';
import EnergySkateParkStrings from '../EnergySkateParkStrings.js';
import MeasureModel from './model/MeasureModel.js';
import MeasureScreenView from './view/MeasureScreenView.js';

class MeasureScreen extends Screen<MeasureModel, MeasureScreenView> {

  public constructor( preferencesModel: EnergySkateParkPreferencesModel, tandem: Tandem ) {
    const options = {
      name: EnergySkateParkStrings.screens.measureStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( measureScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    };

    super(
      () => new MeasureModel( preferencesModel, tandem.createTandem( 'model' ) ),
      model => new MeasureScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );

  }
}

energySkatePark.register( 'MeasureScreen', MeasureScreen );
export default MeasureScreen;