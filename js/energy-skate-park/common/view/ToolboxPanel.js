// Copyright 2019, University of Colorado Boulder

/**
 * A panel that will contain icons for draggable tools that can be pulled into the view. Forwards drag events from the
 * icons to the tools in the view.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MeasuringTapeNode = require( 'SCENERY_PHET/MeasuringTapeNode' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Panel = require( 'SUN/Panel' );
  const TimerNode = require( 'SCENERY_PHET/TimerNode' );

  class ToolboxPanel extends Panel {

    /**
     * @param {EnergySkateParkModel} model
     * @param {EnergySkateParkScreenView} view
     * @param {Tandem} tandem
     * @param {Object} options
     */
    constructor( model, view, tandem, options ) {
      options = merge( {
        lineWidth: 0,
        align: 'center',
        fill: EnergySkateParkColorScheme.panelFill
      }, options );

      // create the icons
      const measuringTapeIcon = MeasuringTapeNode.createIcon();
      measuringTapeIcon.cursor = 'pointer';

      const timerIcon = new TimerNode( new NumberProperty( 0 ), new BooleanProperty( false ) ).rasterized( {
        cursor: 'pointer',
        resolution: 5,
        tandem: tandem.createTandem( 'timerIcon' )
      } );

      measuringTapeIcon.setScaleMagnitude( 0.65 );
      timerIcon.setScaleMagnitude( 0.4 );

      // align icons for panel
      const icons = new HBox( {
        children: [ timerIcon, measuringTapeIcon ],
        align: 'center',
        spacing: 20
      } );

      super( icons, options );

      // create a forwarding listener for the MeasuringTapeNode SimpleDragHandler
      measuringTapeIcon.addInputListener( DragListener.createForwardingListener( event => {
        if ( !model.measuringTapeVisibleProperty.get() ) {
          model.measuringTapeVisibleProperty.set( true );

          const modelPosition = view.modelViewTransform.viewToModelPosition( this.globalToParentPoint( event.pointer.point ) );
          model.measuringTapeBasePositionProperty.set( modelPosition );
          model.measuringTapeTipPositionProperty.set( modelPosition.plusXY( 1, 0 ) );

          view.measuringTapeNode.startBaseDrag( event );
        }
      } ) );

      // create a forwarding listener for the TimerNode DragListener
      timerIcon.addInputListener( DragListener.createForwardingListener( event => {
        if ( !model.timerVisibleProperty.get() ) {
          model.timerVisibleProperty.set( true );

          const parentPoint = this.globalToParentPoint( event.pointer.point );
          const correctedPoint = parentPoint.minusXY( view.timerNode.width / 2, view.timerNode.height / 2 );

          const modelPoint = view.modelViewTransform.viewToModelPosition( correctedPoint );
          model.timerPositionProperty.set( modelPoint );

          view.timerNode.dragListener.press( event, view.timerNode );
        }
      } ) );

      ToolboxPanel.attachIconVisibilityListener( measuringTapeIcon, model.measuringTapeVisibleProperty );
      ToolboxPanel.attachIconVisibilityListener( timerIcon, model.timerVisibleProperty );
    }

    /**
     * Create and attach a listener that makes the icon visible/invisible while the tool is invisible/visible.
     * Reference to the DerivedProperty is not returned because there is no need to dispose of it. This listener
     * can be attached for the life of the sim.
     *
     * @param {Node} icon
     * @param {BooleanProperty} visibleProperty
     */
    static attachIconVisibilityListener( icon, visibleProperty ) {
      const iconVisibleProperty = new DerivedProperty( [ visibleProperty ], visible => {
        return !visible;
      } );
      iconVisibleProperty.linkAttribute( icon, 'visible' );
    }
  }

  return energySkatePark.register( 'ToolboxPanel', ToolboxPanel );
} );
