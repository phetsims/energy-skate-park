// Copyright 2018-2020, University of Colorado Boulder

/**
 * Type Documentation  // REVIEW: Type Documentation
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import energySkatePark from '../../../energySkatePark.js';
import SkaterMasses from '../../common/SkaterMasses.js';
import EnergySkateParkTrackSetScreenView from '../../common/view/EnergySkateParkTrackSetScreenView.js';
import SkaterNode from '../../common/view/SkaterNode.js';

// constants
const MASS_IMAGE_MAP = new Map();
MASS_IMAGE_MAP.set( SkaterMasses.SKATER_1_MASS, SkaterNode.SkaterImage.SKATER_1 );
MASS_IMAGE_MAP.set( SkaterMasses.SKATER_2_MASS, SkaterNode.SkaterImage.SKATER_2 );
MASS_IMAGE_MAP.set( SkaterMasses.SKATER_3_MASS, SkaterNode.SkaterImage.SKATER_3 );
MASS_IMAGE_MAP.set( SkaterMasses.SKATER_4_MASS, SkaterNode.SkaterImage.SKATER_4 );
MASS_IMAGE_MAP.set( SkaterMasses.SKATER_5_MASS, SkaterNode.SkaterImage.SKATER_5 );
MASS_IMAGE_MAP.set( SkaterMasses.DOG_MASS, SkaterNode.SkaterImage.DOG );

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
      assert && assert( MASS_IMAGE_MAP.has( mass ), 'no image supported for that mass' );

      // REVIEW: I recommend writing this using if/else or ternary expressions instead of Map.
      this.skaterNode.skaterImageProperty.set( MASS_IMAGE_MAP.get( mass ) );
    } );
  }
}

energySkatePark.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;