// Copyright 2013-2020, University of Colorado Boulder

/**
 * Scenery node for the control panel, with view settings and controls. The control panel may or may not include various controls
 * depending on options, but the order of included controls is always the same.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../../phet-core/js/merge.js';
import VBox from '../../../../../scenery/js/nodes/VBox.js';
import HSeparator from '../../../../../sun/js/HSeparator.js';
import Panel from '../../../../../sun/js/Panel.js';
import energySkatePark from '../../../energySkatePark.js';
import Constants from '../Constants.js';
import EnergySkateParkGravityControls from './EnergySkateParkGravityControls.js';
import EnergySkateParkMassControls from './EnergySkateParkMassControls.js';
import EnergySkateParkVisibilityControls from './EnergySkateParkVisibilityControls.js';
import FrictionSlider from './FrictionSlider.js';
import SceneSelectionRadioButtonGroup from './SceneSelectionRadioButtonGroup.js';

class EnergySkateParkControlPanel extends Panel {

  /**
   * @param {EnergySkateParkModel} model
   * @param {EnergySkateParkScreenView} screenView
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, screenView, tandem, options ) {

    options = merge( {

      // {boolean} whether or not controls will include radio buttons to change active track
      showTrackButtons: true,

      // {boolean} whether or not controls to include a friction slider will be included in this sim
      showFrictionControls: true,

      // {boolean} whether or not gravity controls will be included in this control panel
      showGravityControls: true,

      // {boolean} whether or not mass controls will be included in this control panel
      showMassControls: true,

      // {Object|null} options passed along to the EnergySkateParkVisibilityControls
      visibilityControlsOptions: null,

      // {Object|null} options passed on to EnergySkateParkGravityControls - only relevant if showGravityControls
      // is true
      gravityControlsOptions: null,

      // {Object|null} options passed to EnergySkateParkMassControls - only relevant if showMassControls is true
      massControlsOptions: null

    }, options );

    // all contents of the control panel will be added to this array
    const children = [];

    // controls that change visibility of items in the screen
    const visibilityControls = new EnergySkateParkVisibilityControls( model, tandem.createTandem( 'visibilityControls' ), options.visibilityControlsOptions );
    children.push( visibilityControls );

    let trackRadioButtons = null;
    if ( options.showTrackButtons ) {
      trackRadioButtons = new SceneSelectionRadioButtonGroup( model, screenView, tandem.createTandem( 'sceneSelectionRadioButtonGroup' ) );
      children.push( trackRadioButtons );
    }

    if ( options.showFrictionControls ) {
      const frictionControls = new FrictionSlider( model.frictionProperty, tandem.createTandem( 'frictionSlider' ) );
      children.push( frictionControls );
    }

    if ( options.showGravityControls ) {
      const gravityControls = new EnergySkateParkGravityControls( model.skater.gravityMagnitudeProperty, model.resetEmitter, screenView, tandem.createTandem( 'energySkateParkGravityControls' ), options.gravityControlsOptions );
      children.push( gravityControls );
    }

    let massControls = null;
    if ( options.showMassControls ) {
      massControls = new EnergySkateParkMassControls( model.skater.massProperty, model.skater.massRange, screenView.skaterNode.skaterImageProperty, model.resetEmitter, screenView, tandem.createTandem( 'energySkateParkMassControls' ), options.massControlsOptions );
      children.push( massControls );
    }

    // horizontal separators added after construction of all controls so that it can match width of widest control
    const separatorWidth = _.maxBy( children, child => child.width ).width;

    // one separator after visibility controls
    children.splice( children.indexOf( visibilityControls ) + 1, 0, new HSeparator( separatorWidth ) );

    // one separator after scene selection buttons
    trackRadioButtons && children.splice( children.indexOf( trackRadioButtons ) + 1, 0, new HSeparator( separatorWidth ) );

    // one separator before mass buttons
    if ( massControls ) {
      children.splice( children.indexOf( massControls ), 0, new HSeparator( separatorWidth ) );

      // the layout for the mass controls needs to match the layout of the above controls so that the title matches
      // position with the other NumberControls
      massControls.matchLayout( separatorWidth );
    }

    const content = new VBox( { resize: false, spacing: 8, children: children } );

    super( content, merge( {
      xMargin: 5,
      yMargin: 5,
      resize: false,
      tandem: tandem
    }, Constants.PANEL_OPTIONS ) );
  }
}

energySkatePark.register( 'EnergySkateParkControlPanel', EnergySkateParkControlPanel );
export default EnergySkateParkControlPanel;