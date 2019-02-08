// Copyright 2018, University of Colorado Boulder

/**
 * A model in Energy Skate park with a specific set of tracks. Does not include any buildable or movable tracks.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PremadeTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/PremadeTracks' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );

  // phetio types
  var NumberIO = require( 'TANDEM/types/NumberIO' );

  /**
   * @constructor
   * @param {boolean} frictionAllowed - Whether or not friction is allowed in this model.
   * @param {Object} options
   */
  function EnergySkateParkTrackSetModel( frictionAllowed, tandem, options ) {

    options = _.extend( {

      // of true, tracks created with PremadeTracks will have limiting bounds for dragging (assuming that
      // points are configurable)
      limitPointBounds: false
    }, options );

    var draggableTracks = false; // TODO: Can we get rid of this?
    EnergySkateParkModel.call( this, draggableTracks, frictionAllowed, tandem.createTandem( 'trackSetModel' ), options );

    // @public {number} - Indicatest the currently selected scene. There can be any number of scenes, do we need
    // to pass this in as a param
    this.sceneProperty = new Property( 0, {
      tandem: tandem.createTandem( 'sceneProperty' ),
      validValues: [ 0, 1, 2, 3 ],
      phetioType: PropertyIO( NumberIO ) // TODO: automatically get the number of tracks
    } );

    // When the scene changes, also change the tracks.
    this.sceneProperty.link( this.updateActiveTrack.bind( this ) );
  }

  energySkatePark.register( 'EnergySkateParkTrackSetModel', EnergySkateParkTrackSetModel );

  return inherit( EnergySkateParkModel, EnergySkateParkTrackSetModel, {

    /**
     * When the scene changes or tracks are added to the track set, update which track is visible and physically
     * interactive.
     *
     * @private
     */
    updateActiveTrack: function( scene ) {
      for ( var i = 0; i < this.tracks.length; i++ ) {
        this.tracks.get( i ).physicalProperty.value = ( i === scene );

        // Reset the skater when the track is changed, see #179
        this.skater.returnToInitialPosition();
      }

      // The skater should detach from track when the scene changes.  Code elsewhere also resets the location of the skater.
      this.skater.trackProperty.value = null;
    },

    /**
     * Add all tracks in the set. In addition to adding all to the ObservbleArray, this will initialize which track
     * should be visible, physical, and interactive depending on the model sceneProperty.
     * @param {Array.<Track>} tracks
     */
    addTrackSet: function( tracks ) {
      this.tracks.addAll( tracks );
      this.updateActiveTrack( this.sceneProperty.get() );
    },

    /**
     * Reset all of the tracks in this model's track set, if they are configurable. Otherwise, identical to
     * super function.
     */
    reset: function() {
      EnergySkateParkModel.prototype.reset.call( this );
      this.tracks.forEach( track => {
        if ( track.configurable ) {
          track.reset();
        }
      } );

      this.updateActiveTrack( this.sceneProperty.get() );
    }
  }, {

    /**
     * In "basics" screens, the track set includes the parabola, slope, and double well.
     *
     * @public
     * @param {EnergySkateParkTrackSetModel} model
     * @returns {Array.<Track>}
     */
    createBasicsTrackSet: function( model, tandem ) {
      assert && assert( model instanceof EnergySkateParkTrackSetModel, 'PremadeTracks should be used with an EnergySkateParkTrackSetModel' );
      assert && assert( model.tracksDraggable === false, 'tracks should not be draggable in EnergySkateParkTrackSetModels' );

      var parabolaControlPoints = PremadeTracks.createParabolaControlPoints( model.controlPointGroupTandem, {
        limitPointBounds: model.limitPointBounds
      } );
      var parabolaTrack = PremadeTracks.createTrack( model, model.tracks, parabolaControlPoints, model.availableModelBoundsProperty, {
        configurable: model.tracksConfigurable,
        tandem: tandem.createTandem( 'parabolaTrack' ),
        phetioState: false
      } );

      var slopeControlPoints = PremadeTracks.createSlopeControlPoints( model.controlPointGroupTandem, {
        limitPointBounds: model.limitPointBounds
      } );
      var slopeTrack = PremadeTracks.createTrack( model, model.tracks, slopeControlPoints, model.availableModelBoundsProperty, {
        configurable: model.tracksConfigurable,
        tandem: tandem.createTandem( 'slopeTrack' ),
        phetioState: false
      } );

      // Flag to indicate whether the skater transitions from the right edge of this track directly to the ground
      // see #164
      slopeTrack.slopeToGround = true;

      var doubleWellControlPoints = PremadeTracks.createDoubleWellControlPoints( model.controlPointGroupTandem, {
        limitPointBounds: model.limitPointBounds
      } );
      var doubleWellTrack = PremadeTracks.createTrack( model, model.tracks, doubleWellControlPoints, model.availableModelBoundsProperty, {
        configurable: model.tracksConfigurable,
        tandem: tandem.createTandem( 'doubleWellTrack' ),
        phetioState: false
      } );

      return [ parabolaTrack, slopeTrack, doubleWellTrack ];
    },

    /**
     * The "full" version of Energy Skate Park has four tracks in the set - a parabola, slope, double well, and loop.
     * Other screns or versions of this sim may not use this.
     *
     * @public
     * @param {EnergySkateParkTrackSetModel} model
     * @returns {Array.<Track>}
     */
    createFullTrackSet: function( model, tandem ) {
      assert && assert( model instanceof EnergySkateParkTrackSetModel, 'PremadeTracks should be used with an EnergySkateParkTrackSetModel' );

      var basicSet = EnergySkateParkTrackSetModel.createBasicsTrackSet( model, tandem );

      var loopControlPoints = PremadeTracks.createLoopControlPoints( model.controlPointGroupTandem, {
        limitPointBounds: model.limitPointBounds
      } );
      var loopTrack = PremadeTracks.createTrack( model, model.tracks, loopControlPoints, model.availableModelBoundsProperty, {
        configurable: model.tracksConfigurable,
        draggable: model.tracksDraggable,
        tandem: tandem.createTandem( 'loopTrack' )
      } );

      basicSet.push( loopTrack );
      return basicSet;
    }
  } );
} );
