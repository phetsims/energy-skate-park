// Copyright 2018-2020, University of Colorado Boulder

/**
 * ScreenView for the Intro Screen of Energy Skate Park.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../../energySkatePark.js';
import SkaterMasses from '../../common/SkaterMasses.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import SkaterNode from '../../common/view/SkaterNode.js';

class IntroScreenView extends EnergySkateParkTrackSetScreenView {

  /**
   * @param {EnergySkateParkFullTrackSetModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {
    super( model, tandem.createTandem( 'introScreenView' ), {
      controlPanelOptions: {
        showMassControls: true,
        massControlsOptions: {
          includeMassNumberControl: false,
          includeMassComboBox: true
        },
        gravityControlsOptions: {
          includeGravityNumberControl: false,
          includeGravitySlider: true
        }
      }
    } );

    // in the intro screen, each allowable mass has a unique skater image
    model.skater.massProperty.link( mass => {
      const newSkaterImage = mass === SkaterMasses.SKATER_1_MASS ? SkaterNode.SkaterImage.SKATER_1 :
                             mass === SkaterMasses.SKATER_2_MASS ? SkaterNode.SkaterImage.SKATER_2 :
                             mass === SkaterMasses.SKATER_3_MASS ? SkaterNode.SkaterImage.SKATER_3 :
                             mass === SkaterMasses.SKATER_4_MASS ? SkaterNode.SkaterImage.SKATER_4 :
                             mass === SkaterMasses.SKATER_5_MASS ? SkaterNode.SkaterImage.SKATER_5 :
                             mass === SkaterMasses.DOG_MASS ? SkaterNode.SkaterImage.DOG : null;
      assert && assert( newSkaterImage !== null, 'no image supported for mass ' + mass );

      this.skaterNode.skaterImageProperty.set( newSkaterImage );
    } );
  }
}

energySkatePark.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;