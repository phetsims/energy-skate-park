// Copyright 2018-2019, University of Colorado Boulder

/**
 * A panel that will contain an icon for a tape measure. When the icon is dragged, it will forward the event
 * to the tape measure used by the view so it can be dragged.
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );
  const MeasuringTapeNode = require( 'SCENERY_PHET/MeasuringTapeNode' );
  const Panel = require( 'SUN/Panel' );

  class MeasuringTapePanel extends Panel {

    /**
     * @param  {MeasuringTapeNode} measuringTapeNode - used in a view and receives a forwarded event from icon
     * @param  {BooleanProperty}
     * @param  {Object} options
     */
    constructor( model, measuringTapeNode, modelViewTransform, forwardCallback, options ) {

      options = _.extend( {
        lineWidth: 0,
        fill: EnergySkateParkColorScheme.panelFill
      }, options );

      const measuringTapeIcon = MeasuringTapeNode.createIcon();
      measuringTapeIcon.cursor = 'pointer';

      // set scale of measuring tape icon, but don't pas to createIcon because it makes the icon generated with
      // Node.toImage look too aliased, see https://github.com/phetsims/energy-skate-park/issues/27
      measuringTapeIcon.setScaleMagnitude( 0.75 );

      super( measuringTapeIcon, options );

      // forwarding listener, so the measuring tape can be dragged right out of the panel by clicking the icon
      measuringTapeIcon.addInputListener( DragListener.createForwardingListener( event => {
        if ( !model.measuringTapeVisibleProperty.get() ) {
          model.measuringTapeVisibleProperty.set( true );

          const modelPosition = modelViewTransform.viewToModelPosition( this.globalToParentPoint( event.pointer.point ) );
          model.measuringTapeBasePositionProperty.set( modelPosition );
          model.measuringTapeTipPositionProperty.set( modelPosition.plusXY( 1, 0 ) );

          measuringTapeNode.startBaseDrag( event );
        }

      }, { allowTouchSnag: true } ) );

      // icon is only visible when measuring tape is hidden
      const iconVisibleProperty = new DerivedProperty( [ model.measuringTapeVisibleProperty ], isVisible => {
        return !isVisible;
      } );
      iconVisibleProperty.linkAttribute( measuringTapeIcon, 'visible' );
    }
  }

  return energySkatePark.register( 'MeasuringTapePanel', MeasuringTapePanel );
} );
