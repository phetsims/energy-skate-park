// Copyright 2019, University of Colorado Boulder

/**
 * TimerNode for EnergySkatePark. Attaches a DragListener that can receive forwarded events from the toolbox.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const TimerNode = require( 'SCENERY_PHET/TimerNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );

  class EnergySkateParkTimerNode extends TimerNode {

    /**
     * @param {EnergySkateParkModel} model
     * @param {EnergySkateParkScreenView} view
     * @param {Tandem} tandem
     */
    constructor( model, view, tandem ) {
      super( model.timeProperty, model.timerRunningProperty );

      // constrain the available bounds so that the timer cannot be dragged out of view
      const dragBoundsProperty = new DerivedProperty( [ model.availableModelBoundsProperty ], modelBounds => {
        const viewBounds = view.modelViewTransform.modelToViewBounds( modelBounds );

        viewBounds.setMaxX( viewBounds.maxX - this.width );
        viewBounds.setMaxY( viewBounds.maxY - this.height );

        return view.modelViewTransform.viewToModelBounds( viewBounds );
      } );

      // @public {DragListener} - for forwarding
      this.dragListener = new DragListener( {
        locationProperty: model.timerPositionProperty,
        transform: view.modelViewTransform,
        dragBoundsProperty: dragBoundsProperty,
        end: ( event, listener ) => {
          if ( this.bounds.intersectsBounds( view.toolboxPanel.bounds ) ) {
            model.timerVisibleProperty.set( false );
          }
        },
        tandem: tandem.createTandem( 'dragListener' )
      } );
      this.addInputListener( this.dragListener );

      // sync location Property with translation
      model.timerPositionProperty.link( location => {
        this.translation = view.modelViewTransform.modelToViewPosition( location );
      } );

      model.timerVisibleProperty.link( visible => {
        this.visible = visible;
      } );
    }
  }

  return energySkatePark.register( 'EnergySkateParkTimerNode', EnergySkateParkTimerNode );

} );
