// Copyright 2018, University of Colorado Boulder

/**
 * A circle that becomes visible and is positioned under the inspected skater sample to indicate
 * that the user is inspecting that point.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const EnergySkateParkColorScheme = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/view/EnergySkateParkColorScheme' );

  // constants
  const HALO_RADIUS = 7;

  class InspectedSampleHaloNode extends Circle {

    /**
     * @param {ObservableArray.<SkaterSample>} skaterSamples
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( skaterSamples, modelViewTransform ) {
      super( HALO_RADIUS, {
        fill: EnergySkateParkColorScheme.haloFill,

        // not visible until a SkaterSample becomes inspected
        visible: false
      } );

      // Whenever a new sample is added, adds a listener to make the halo visible when a sample
      // is inspected and puts it in the correct position. Removes the listeners on item removal
      // for memory management
      const sampleAddedListener = addedSample => {

        // handles visibility and positioning
        const inspectedListener = inspected => {
          this.visible = inspected;
          if ( inspected ) {
            this.visible = true;
            this.center = modelViewTransform.modelToViewPosition( addedSample.position );
          }
        };

        // linked lazily, we don't want to change visibility when a new sample is added
        addedSample.inspectedProperty.lazyLink( inspectedListener );

        // handles memory management
        const sampleRemovedListener = removedSample => {
          if ( addedSample === removedSample ) {

            // if inspected sample is being removed, halo should become invisible
            if ( removedSample.inspectedProperty.get() ) {
              this.visible = false;
            }

            removedSample.inspectedProperty.unlink( inspectedListener );
            skaterSamples.removeItemRemovedListener( sampleRemovedListener );
          }
        };
        skaterSamples.addItemRemovedListener( sampleRemovedListener );
      };

      skaterSamples.addItemAddedListener( sampleAddedListener );
    }
  }

  return energySkatePark.register( 'InspectedSampleHaloNode', InspectedSampleHaloNode );
} );
