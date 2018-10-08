// Copyright 2018, University of Colorado Boulder

/**
 * A model in Energy Skate park with a specific set of tracks. Does not include any buildable or movable tracks.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );

  // phetio types
  var NumberIO = require( 'ifphetio!PHET_IO/types/NumberIO' );

  /**
   * @constructor
   * @param {boolean} frictionAllowed - Whether or not friction is allowed in this model.
   */
  function EnergySkateParkTrackSetModel( frictionAllowed, tandem ) {

    var draggableTracks = false; // TODO: Can we get rid of this?
    EnergySkateParkModel.call( this, draggableTracks, frictionAllowed, tandem.createTandem( 'trackSetModel' ));

    // @public {number} - Indicatest the currently selected scene. There can be any number of scenes, do we need
    // to pass this in as a param
    this.sceneProperty = new Property( 0, {
      tandem: tandem.createTandem( 'sceneProperty' ),
      validValues: [ 0, 1, 2 ],
      phetioType: PropertyIO( NumberIO )// TODO: automatically get the number of tracks
    } );

    // TODO: Create a type that manages the ControlPointSet
    // Shape types
    // For the double well, move the left well up a bit since the interpolation moves it down by that much, and we
    // don't want the skater to go to y<0 while on the track.  Numbers determined by trial and error.
    var parabola = [
      new ControlPoint( -4, 6, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 0, 0, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 4, 6, { tandem: this.controlPointGroupTandem.createNextTandem() } )
    ];
    var slope = [
      new ControlPoint( -4, 6, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( -2, 1.2, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 2, 0, { tandem: this.controlPointGroupTandem.createNextTandem() } )
    ];
    var doubleWell = [
      new ControlPoint( -4, 5, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( -2, 0.0166015, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 0, 2, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 2, 1, { tandem: this.controlPointGroupTandem.createNextTandem() } ),
      new ControlPoint( 4, 5, { tandem: this.controlPointGroupTandem.createNextTandem() } )
    ];

    var parabolaTrack = new Track( this, this.tracks, parabola, false, null, this.availableModelBoundsProperty, {
      tandem: tandem.createTandem( 'parabolaTrack' )
    } );
    var slopeTrack = new Track( this, this.tracks, slope, false, null, this.availableModelBoundsProperty, {
      tandem: tandem.createTandem( 'slopeTrack' )
    } );
    var doubleWellTrack = new Track( this, this.tracks, doubleWell, false, null, this.availableModelBoundsProperty, {
      tandem: tandem.createTandem( 'doubleWellTrack' )
    } );

    // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
    // see #164
    slopeTrack.slopeToGround = true;

    this.tracks.addAll( [ parabolaTrack, slopeTrack, doubleWellTrack ] );

    // When the scene changes, also change the tracks.
    var self = this;
    this.sceneProperty.link( function( scene ) {
      for ( var i = 0; i < self.tracks.length; i++ ) {
        self.tracks.get( i ).physicalProperty.value = ( i === scene );

        // Reset the skater when the track is changed, see #179
        self.skater.returnToInitialPosition();
      }

      // The skater should detach from track when the scene changes.  Code elsewhere also resets the location of the skater.
      self.skater.trackProperty.value = null;
    } );
  }

  energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );

  return inherit( EnergySkateParkModel, EnergySkateParkTrackSetModel, {} );
} );
