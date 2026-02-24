// Copyright 2019-2026, University of Colorado Boulder

/**
 * A panel that will contain icons for draggable tools that can be pulled into the view. Forwards drag events from the
 * icons to the tools in the view.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MeasuringTapeNode from '../../../../scenery-phet/js/MeasuringTapeNode.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import KeyboardListener from '../../../../scenery/js/listeners/KeyboardListener.js';
import InteractiveHighlightingNode from '../../../../scenery/js/accessibility/voicing/nodes/InteractiveHighlightingNode.js';
import type Node from '../../../../scenery/js/nodes/Node.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkScreenView from './EnergySkateParkScreenView.js';

export default class ToolboxPanel extends Panel {

  // Tool icon nodes that can be focused when tools are returned to the toolbox via delete/backspace key
  public readonly stopwatchToolNode: Node;
  public readonly measuringTapeToolNode: Node;

  public constructor( model: EnergySkateParkModel, view: EnergySkateParkScreenView, tandem: Tandem, providedOptions?: PanelOptions ) {
    const options = combineOptions<PanelOptions>( {
      align: 'center',

      // smaller y margin to save space when used with very tall ControlPanels (like in the intro screen)
      yMargin: 2,

      xMargin: 25,

      accessibleHeading: EnergySkateParkFluent.a11y.toolboxPanel.accessibleHeadingStringProperty
    }, EnergySkateParkConstants.PANEL_OPTIONS, providedOptions );

    // create the icons
    const measuringTapeIcon = MeasuringTapeNode.createIcon();
    measuringTapeIcon.setScaleMagnitude( 0.7 );

    const stopwatchIcon = rasterizeNode( new StopwatchNode( new Stopwatch( {
      isVisible: true,
      tandem: Tandem.OPT_OUT
    } ), {
      numberDisplayOptions: {
        textOptions: {
          maxWidth: 100
        }
      },
      tandem: Tandem.OPT_OUT
    } ), {
      resolution: 5,
      nodeOptions: {
        tandem: tandem.createTandem( 'timerIcon' )
      }
    } );
    stopwatchIcon.setScaleMagnitude( 0.4 );

    // Wrap each icon in an InteractiveHighlightingNode for hover highlights
    const measuringTapeIconWrapper = new InteractiveHighlightingNode( {
      children: [ measuringTapeIcon ],
      cursor: 'pointer',
      tagName: 'button',
      accessibleName: EnergySkateParkFluent.a11y.toolboxPanel.measuringTape.accessibleNameStringProperty
    } );

    const stopwatchIconWrapper = new InteractiveHighlightingNode( {
      children: [ stopwatchIcon ],
      cursor: 'pointer',
      tagName: 'button',
      accessibleName: EnergySkateParkFluent.a11y.toolboxPanel.stopwatch.accessibleNameStringProperty
    } );

    // align icons for panel
    const icons = new HBox( {
      children: [ stopwatchIconWrapper, measuringTapeIconWrapper ],
      align: 'center',

      // Keep icons at their position even when they are invisible
      excludeInvisibleChildrenFromBounds: false
    } );

    super( icons, options );

    // create a forwarding listener for the MeasuringTapeNode DragListener
    measuringTapeIconWrapper.addInputListener( DragListener.createForwardingListener( event => {
      if ( !model.measuringTapeVisibleProperty.get() ) {
        model.measuringTapeVisibleProperty.set( true );

        const modelPosition = view.modelViewTransform.viewToModelPosition( view.globalToLocalPoint( event.pointer.point ) );
        model.measuringTapeBasePositionProperty.set( modelPosition );
        model.measuringTapeTipPositionProperty.set( modelPosition.plusXY( 1, 0 ) );

        view.measuringTapeNode!.startBaseDrag( event );
      }
    } ) );

    // Keyboard activation for measuring tape - position it in a visible area and focus its base
    measuringTapeIconWrapper.addInputListener( new KeyboardListener( {
      fireOnClick: true,
      fire: () => {
        if ( !model.measuringTapeVisibleProperty.get() ) {
          const modelPosition = view.modelViewTransform.viewToModelPosition( view.layoutBounds.center );
          model.measuringTapeBasePositionProperty.set( modelPosition );
          model.measuringTapeTipPositionProperty.set( modelPosition.plusXY( 1, 0 ) );
          model.measuringTapeVisibleProperty.set( true );

          // Focus the first focusable descendant (the base image) of the measuring tape
          const focusable = view.measuringTapeNode!.getSubtreeNodes().reverse().find( node => node.focusable );
          focusable && focusable.focus();
        }
      }
    } ) );

    // create a forwarding listener for the StopwatchNode DragListener
    stopwatchIconWrapper.addInputListener( DragListener.createForwardingListener( event => {
      if ( !model.stopwatch.isVisibleProperty.get() ) {
        model.stopwatch.isVisibleProperty.value = true;

        const coordinate = view.globalToLocalPoint( event.pointer.point ).minusXY(
          view.stopwatchNode!.width / 2,
          view.stopwatchNode!.height / 2
        );
        model.stopwatch.positionProperty.set( coordinate );
        view.stopwatchNode!.dragListener!.press( event, view.stopwatchNode );
      }
    } ) );

    // Keyboard activation for stopwatch - position it in a visible area and focus it
    stopwatchIconWrapper.addInputListener( new KeyboardListener( {
      fireOnClick: true,
      fire: () => {
        if ( !model.stopwatch.isVisibleProperty.get() ) {
          const coordinate = view.layoutBounds.center;
          model.stopwatch.positionProperty.set( coordinate );
          model.stopwatch.isVisibleProperty.value = true;

          view.stopwatchNode!.focus();
        }
      }
    } ) );

    // When the tool is in the play area, hide the icon visually (opacity) but keep it in the PDOM as disabled.
    // Using opacity instead of visibility maintains the panel layout bounds.
    model.measuringTapeVisibleProperty.link( visible => {
      measuringTapeIconWrapper.setOpacity( visible ? 0 : 1 );
      measuringTapeIconWrapper.setInputEnabled( !visible );
      measuringTapeIconWrapper.focusable = !visible;
      measuringTapeIconWrapper.setPDOMAttribute( 'aria-disabled', visible );
    } );

    model.stopwatch.isVisibleProperty.link( visible => {
      stopwatchIconWrapper.setOpacity( visible ? 0 : 1 );
      stopwatchIconWrapper.setInputEnabled( !visible );
      stopwatchIconWrapper.focusable = !visible;
      stopwatchIconWrapper.setPDOMAttribute( 'aria-disabled', visible );
    } );

    this.stopwatchToolNode = stopwatchIconWrapper;
    this.measuringTapeToolNode = measuringTapeIconWrapper;
  }
}

energySkatePark.register( 'ToolboxPanel', ToolboxPanel );