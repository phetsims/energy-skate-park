// Copyright 2022-2024, University of Colorado Boulder

/**
 * Dynamic icon for the Intro screen.
 *
 * @author Agustín Vallejo
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import introScreenIcon_png from '../../../images/introScreenIcon_png.js';
import SkaterImageSet from '../../common/view/SkaterImageSet.js';
import energySkatePark from '../../energySkatePark.js';

class IntroScreenIcon extends ScreenIcon {

  constructor() {

    const background = new Image( introScreenIcon_png );

    const skaterImage = new Image( SkaterImageSet.SKATER_IMAGE_SETS[ 0 ].rightImageProperty );

    // Transform skaterImage to the desired position.
    skaterImage.localBoundsProperty.link( () => {
      const transformMatrix = Matrix3.translation( 187, 60 );
      transformMatrix.multiplyMatrix( Matrix3.rotation2( 1.1 * Math.PI / 3 ) );
      transformMatrix.multiplyMatrix( Matrix3.scaling( 0.5 ) );
      skaterImage.setMatrix( transformMatrix );
    } );

    const iconNode = new Node( {
      children: [ background, skaterImage ]
    } );

    super( iconNode, {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1
    } );
  }
}

energySkatePark.register( 'IntroScreenIcon', IntroScreenIcon );
export default IntroScreenIcon;