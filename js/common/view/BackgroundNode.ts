// Copyright 2013-2025, University of Colorado Boulder

/**
 * Scenery node that shows the background, including the mountains, sky, ground and grass.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import { Image, LinearGradient, Node, Pattern, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import cementTextureDark_jpg from '../../../images/cementTextureDark_jpg.js';
import mountains_png from '../../../images/mountains_png.js';
import energySkatePark from '../../energySkatePark.js';

// constants
const earthHeight = 86;
const cementWidth = 5;

class BackgroundNode extends Node {
  private readonly sky: Rectangle;
  private readonly earth: Rectangle;
  private readonly cementY: number;
  private readonly mountainImage: Image;
  private readonly cement: Rectangle;

  /**
   * @param layoutBounds
   * @param visibleBoundsProperty - in the view coordinate frame
   * @param tandem
   * @param [options]
   */
  public constructor( layoutBounds: Bounds2, visibleBoundsProperty: Property<Bounds2>, tandem: Tandem, options: IntentionalAny ) {
    super( {
      pickable: false,
      tandem: tandem
    } );

    this.sky = new Rectangle( 0, 0, 0, 0 );
    this.addChild( this.sky );

    // wait for bounds to fill in the grass
    this.earth = new Rectangle( 0, 0, 0, 0, { fill: '#93774c' } );
    this.addChild( this.earth );

    this.cementY = layoutBounds.height - earthHeight;

    this.mountainImage = new Image( mountains_png, {
      scale: 1.23,
      bottom: this.cementY,
      tandem: tandem.createTandem( 'mountainImage' )
    } );
    this.addChild( this.mountainImage );

    this.cement = new Rectangle( 0, 0, 0, cementWidth, { fill: new Pattern( cementTextureDark_jpg ) } );
    this.addChild( this.cement );

    if ( options ) {
      this.mutate( options );
    }

    // update layout when visible bounds change
    visibleBoundsProperty.link( bounds => this.layout( bounds ) );
  }

  /**
   * Exactly fit the geometry to the screen so no matter what aspect ratio it will always show something.
   *
   * @param bounds - in the view coordinate frame
   */
  public layout( bounds: Bounds2 ): void {
    const cementY = this.cementY;
    this.earth.setRect( bounds.minX, cementY, bounds.width, earthHeight );

    // Work around scenery horizontal line pattern problem, see https:// github.com/phetsims/scenery/issues/196
    this.cement.setRect( bounds.minX, cementY, bounds.width, cementWidth );
    this.sky.setRect( bounds.minX, bounds.minY, bounds.width, bounds.height );
    this.sky.fill = new LinearGradient( 0, 0, 0, bounds.height / 2 ).addColorStop( 0, '#02ace4' ).addColorStop( 1, '#cfecfc' );
  }

  public static earthHeight = earthHeight;
}

energySkatePark.register( 'BackgroundNode', BackgroundNode );
export default BackgroundNode;