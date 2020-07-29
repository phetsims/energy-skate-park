// Copyright 2014-2020, University of Colorado Boulder

/**
 * Scenery node for the Attach/Detach toggle buttons which determine whether the skater can fly off the track or not.
 * This was formerly called "roller coaster mode"
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import attachIcon from '../../../images/attach_png.js';
import detachIcon from '../../../images/detach_png.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';

// constants
const SELECTED_LINE_WIDTH = 2.3;

class AttachDetachToggleButtons extends Panel {

  /**
   * Constructor for the AttachDetachToggleButtons
   * @param {Property<Boolean>} stickingToTrackProperty Axon property that is false if the model state allows the skater to detach
   * @param {Property<Boolean>} enabledProperty Axon property that is true if the control is enabled
   * @param {number} contentWidth Width for the control panel, to match the layout of the rest of the controls.
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( stickingToTrackProperty, enabledProperty, contentWidth, tandem, options ) {

    // Match the style of the EnergySkateParkControlPanel
    options = merge( {
      xMargin: 15,
      yMargin: 5
    }, EnergySkateParkConstants.PANEL_OPTIONS, options );

    // This is sort of hack to pass through the tandem of the radioButtonGroupMember to its child.
    const attachRadioButtonTandemName = 'attachRadioButton';
    const detachRadioButtonTandemName = 'detachRadioButton';
    const radioButtonGroupTandem = tandem.createTandem( 'radioButtonGroup' );

    // @param {image} image - data for an Image Node
    // @param {string} tandemName
    const createButtonContent = ( image, tandemName ) => {
      return new Image( image, {
        scale: 0.4,
        tandem: radioButtonGroupTandem.createTandem( attachRadioButtonTandemName ).createTandem( tandemName )
      } );
    };

    const radioButtonsContent = [
      {
        value: true,
        node: createButtonContent( attachIcon, 'attachIcon' ),
        tandemName: attachRadioButtonTandemName
      },
      {
        value: false,
        node: createButtonContent( detachIcon, 'detachIcon' ),
        tandemName: detachRadioButtonTandemName
      }
    ];

    const buttonSpacing = contentWidth - ( options.xMargin * 2 ) - ( radioButtonsContent[ 0 ].node.width * 2 ) - SELECTED_LINE_WIDTH * 2;
    assert && assert( buttonSpacing > 0, 'buttons must have non zero spacing' );

    const radioButtons = new RadioButtonGroup( stickingToTrackProperty, radioButtonsContent,
      {
        buttonContentXMargin: 0,
        buttonContentYMargin: 0,
        baseColor: 'white',
        disabledBaseColor: 'rgba(255,255,255,0.5)',
        spacing: buttonSpacing,
        cornerRadius: 6,
        selectedLineWidth: SELECTED_LINE_WIDTH,
        selectedStroke: '#3291b8',
        deselectedStroke: 'gray',
        orientation: 'horizontal',
        tandem: radioButtonGroupTandem
      } );

    const panelOptions = merge( { tandem: tandem }, options );
    super( radioButtons, panelOptions );
  }
}

energySkatePark.register( 'AttachDetachToggleButtons', AttachDetachToggleButtons );
export default AttachDetachToggleButtons;