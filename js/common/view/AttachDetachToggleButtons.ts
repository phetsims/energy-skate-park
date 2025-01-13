// Copyright 2014-2025, University of Colorado Boulder

/**
 * Scenery node for the Attach/Detach toggle buttons which determine whether the skater can fly off the track or not.
 * This was formerly called "roller coaster mode"
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import { Image, ImageableImage } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import attach_png from '../../../images/attach_png.js';
import detach_png from '../../../images/detach_png.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';

// constants
const SELECTED_LINE_WIDTH = 2.3;

export default class AttachDetachToggleButtons extends Panel {

  /**
   * @param stickingToTrackProperty Axon property that is false if the model state allows the skater to detach
   * @param enabledProperty Axon property that is true if the control is enabled
   * @param contentWidth Width for the control panel, to match the layout of the rest of the controls.
   * @param tandem
   * @param [providedOptions]
   */
  public constructor( stickingToTrackProperty: Property<boolean>, enabledProperty: Property<boolean>, contentWidth: number, tandem: Tandem, providedOptions?: PanelOptions ) {

    // Match the style of the EnergySkateParkControlPanel
    const options = optionize4<PanelOptions>()( {}, {
      xMargin: 15,
      yMargin: 5

      // @ts-expect-error
    }, EnergySkateParkConstants.PANEL_OPTIONS, providedOptions );

    // This is sort of hack to pass through the tandem of the radioButtonGroupMember to its child.
    const attachRadioButtonTandemName = 'attachRadioButton';
    const detachRadioButtonTandemName = 'detachRadioButton';
    const radioButtonGroupTandem = tandem.createTandem( 'radioButtonGroup' );

    const createButtonContent = ( image: ImageableImage, tandemName: string ) => {
      return new Image( image, {
        scale: 0.4,
        tandem: radioButtonGroupTandem.createTandem( attachRadioButtonTandemName ).createTandem( tandemName )
      } );
    };

    const buttonContent0 = createButtonContent( attach_png, 'attachIcon' );

    const radioButtonsContent = [
      {
        value: true,
        createNode: () => buttonContent0,
        tandemName: attachRadioButtonTandemName
      },
      {
        value: false,
        createNode: () => createButtonContent( detach_png, 'detachIcon' ),
        tandemName: detachRadioButtonTandemName
      }
    ];

    const buttonSpacing = contentWidth - ( options.xMargin * 2 ) - ( buttonContent0.width * 2 ) - SELECTED_LINE_WIDTH * 2;
    assert && assert( buttonSpacing > 0, 'buttons must have non zero spacing' );

    const radioButtonGroup = new RectangularRadioButtonGroup( stickingToTrackProperty, radioButtonsContent, {
      orientation: 'horizontal',
      spacing: buttonSpacing,
      radioButtonOptions: {
        xMargin: 0,
        yMargin: 0,
        baseColor: 'white',
        cornerRadius: 6,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: SELECTED_LINE_WIDTH,
          selectedStroke: '#3291b8',
          deselectedStroke: 'gray'
        }
      },
      tandem: radioButtonGroupTandem
    } );

    const panelOptions = merge( { tandem: tandem }, options );
    super( radioButtonGroup, panelOptions );
  }
}

energySkatePark.register( 'AttachDetachToggleButtons', AttachDetachToggleButtons );