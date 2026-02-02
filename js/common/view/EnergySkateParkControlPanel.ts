// Copyright 2013-2026, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls. The control panel may or may not include various controls
 * depending on options, but the order of included controls is always the same.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';

import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import EnergySkateParkGravityControls, { EnergySkateParkGravityControlsOptions } from './EnergySkateParkGravityControls.js';
import EnergySkateParkMassControls, { EnergySkateParkMassControlsOptions } from './EnergySkateParkMassControls.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';
import EnergySkateParkVisibilityControls, { EnergySkateParkVisibilityControlsOptions } from './EnergySkateParkVisibilityControls.js';
import FrictionSlider from './FrictionSlider.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';
import SkaterRadioButtonGroup from './SkaterRadioButtonGroup.js';

type SelfOptions = {

  // whether controls will include radio buttons to change active track
  showTrackButtons?: boolean;

  // whether controls to include a friction slider will be included in this sim
  showFrictionControls?: boolean;

  // whether gravity controls will be included in this control panel
  showGravityControls?: boolean;

  // whether mass controls will be included in this control panel
  showMassControls?: boolean;

  // whether to include radio buttons that control the skater in energy skate park.
  showSkaterControls?: boolean;

  // options passed along to the EnergySkateParkVisibilityControls
  visibilityControlsOptions?: EnergySkateParkVisibilityControlsOptions | null;

  // options passed on to EnergySkateParkGravityControls - only relevant if showGravityControls is true
  gravityControlsOptions?: EnergySkateParkGravityControlsOptions | null;

  // options passed to EnergySkateParkMassControls - only relevant if showMassControls is true
  massControlsOptions?: EnergySkateParkMassControlsOptions | null;
};

export type EnergySkateParkControlPanelOptions = SelfOptions & PanelOptions;

export default class EnergySkateParkControlPanel extends Panel {

  public constructor( model: EnergySkateParkModel, screenView: EnergySkateParkScreenView, tandem: Tandem, providedOptions?: EnergySkateParkControlPanelOptions ) {

    const options = optionize<EnergySkateParkControlPanelOptions, SelfOptions, PanelOptions>()( {
      showTrackButtons: true,
      showFrictionControls: true,
      showGravityControls: true,
      showMassControls: true,
      showSkaterControls: true,
      visibilityControlsOptions: null,
      gravityControlsOptions: null,
      massControlsOptions: null
    }, providedOptions );

    const userControlledPropertySet = model.userControlledPropertySet;

    // all contents of the control panel will be added to this array
    const children: Node[] = [];

    let trackRadioButtons = null;
    if ( options.showTrackButtons && model instanceof EnergySkateParkTrackSetModel ) {
      trackRadioButtons = new SceneSelectionRadioButtonGroup( model, screenView, tandem.createTandem( 'sceneSelectionRadioButtonGroup' ) );
      children.push( trackRadioButtons );
    }

    let frictionControls: Node | null = null;
    if ( options.showFrictionControls ) {

      frictionControls = new FrictionSlider( model.frictionProperty, userControlledPropertySet.frictionControlledProperty, tandem.createTandem( 'frictionControl' ) );
      children.push( frictionControls );
    }

    let gravityControls = null;
    if ( options.showGravityControls ) {
      gravityControls = new EnergySkateParkGravityControls( model.skater.gravityMagnitudeProperty, userControlledPropertySet.gravityControlledProperty, model.preferencesModel.accelerationUnitsProperty, model.resetEmitter, screenView, tandem.createTandem( 'energySkateParkGravityControls' ), options.gravityControlsOptions || undefined );
      children.push( gravityControls );
    }

    let massControls = null;
    if ( options.showMassControls ) {
      massControls = new EnergySkateParkMassControls( model.skater.massProperty, userControlledPropertySet.massControlledProperty, model.skater.massRange, tandem.createTandem( 'energySkateParkMassControls' ), options.massControlsOptions || undefined );
      children.push( massControls );
    }

    if ( options.showSkaterControls ) {
      const skaterRadioButtonGroup = new SkaterRadioButtonGroup( screenView.skaterNode.selectedSkaterProperty,
        tandem.createTandem( 'skaterSetOneControls' ) );
      children.push( skaterRadioButtonGroup );
    }

    // horizontal separators added after construction of all controls so that it can match width of widest control
    const separatorWidth = _.maxBy( children, child => child.width )!.width;

    // controls that change visibility of items in the screen
    options.visibilityControlsOptions = merge( {}, options.visibilityControlsOptions, {
      checkboxWidth: separatorWidth
    } );
    options.visibilityControlsOptions.checkboxWidth = separatorWidth;
    const visibilityControls = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'visibilityControls' ), options.visibilityControlsOptions );
    children.unshift( visibilityControls );

    // one separator after visibility controls
    children.splice( children.indexOf( visibilityControls ) + 1, 0, new HSeparator() );

    // one separator after scene selection buttons
    trackRadioButtons && children.splice( children.indexOf( trackRadioButtons ) + 1, 0, new HSeparator() );

    // one separator after a section for friction and/or gravity controls
    if ( frictionControls || gravityControls ) {
      if ( gravityControls ) {
        children.splice( children.indexOf( gravityControls ) + 1, 0, new HSeparator() );
      }
      else {
        children.splice( children.indexOf( frictionControls! ) + 1, 0, new HSeparator() );
      }
    }

    const content = new VBox( { spacing: 8, children: children } );

    super( content, merge( {
      xMargin: 5,
      yMargin: 5,
      tandem: tandem
    }, EnergySkateParkConstants.PANEL_OPTIONS ) );
  }
}

energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );