// Copyright 2018, University of Colorado Boulder

/**
 * A model for Energy Skate Park that can have tracks that are buildable and draggable. Doesn't have a set of 
 * pre-constructed tracks, but allows user to build them from scratch.
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var EnergySkateParkModel = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );
  var Vector2 = require( 'DOT/Vector2' );

  // Control points are replenished in the toolbox as they are destroyed (by connecting) in the play area
  // This is the maximum number of control points available to the user.
  var MAX_NUMBER_CONTROL_POINTS = 15;

  /**
   * @constructor
   * @param {boolean} frictionAllowed - is friction allowed in this model?
   * @param {Tandem} tandem
   * @param {Object} options
   */
  function EnergySkateParkPlaygroundModel( frictionAllowed, tandem, options ) {
    options = options || {};

    assert && assert( options.tracksDraggable === undefined, 'for playground models, tracks are draggable' );
    options.tracksDraggable = true;

    assert && assert( options.tracksConfigurable === undefined, 'for playground models, track control points can be dragged' );
    options.tracksConfigurable = true;

    var draggableTracks = true; // TODO: Get rid of this param?
    EnergySkateParkModel.call( this, draggableTracks, frictionAllowed, tandem, options );

    // add all of the possible draggable tracks
    this.addDraggableTracks();
  }

  energySkatePark.register( 'EnergySkateParkPlaygroundModel', EnergySkateParkPlaygroundModel );

  return inherit( EnergySkateParkModel, EnergySkateParkPlaygroundModel, {

    /**
     * Add the draggable tracks that will be in the toolbox of a playground scene.
     * 
     * @public
     */
    addDraggableTracks: function() {

      // 3 points per track
      for ( var i = 0; i < MAX_NUMBER_CONTROL_POINTS / 3; i++ ) {
        this.addDraggableTrack();
      }
    },

    /**
     * Add a single draggable track to a control panel.
     * 
     * @public
     */
    addDraggableTrack: function() {

      var controlPointGroupTandem = this.controlPointGroupTandem;
      var trackGroupTandem = this.trackGroupTandem;

      // Move the tracks over so they will be in the right position in the view coordinates, under the grass to the left
      // of the clock controls.  Could use view transform for this, but it would require creating the view first, so just
      // eyeballing it for now.
      var offset = new Vector2( -5.1, -0.85 );
      var controlPoints = [
        new ControlPoint( offset.x - 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
        new ControlPoint( offset.x, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } ),
        new ControlPoint( offset.x + 1, offset.y, { tandem: controlPointGroupTandem.createNextTandem() } )
      ];
      this.tracks.add( new Track( this, this.tracks, controlPoints, null, this.availableModelBoundsProperty, {
          draggable: true,
          configurable: true,
          splittable: true,
          attachable: true,

          tandem: trackGroupTandem.createNextTandem()
        }
      ) );
    }
  } );
} );
