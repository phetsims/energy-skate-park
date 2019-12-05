// Copyright 2013-2019, University of Colorado Boulder

/**
 * Model for the Energy Skate Park sim, including model values for the view settings, such as whether the grid
 * is visible. All units are in mks.
 *
 * The step functions focus on making computations up front and applying changes to the skater at the end of each
 * method, to simplify the logic and make it communicate with the Axon+View as little as possible (for performance
 * reasons).
 *
 * For an analytical model, see http://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1387&context=phy_fac
 * Computational problems in introductory physics: Lessons from a bead on a wire
 * Thomas J. Bensky and Matthew J. Moelter
 *
 * We experimented with the analytical model, but ran into problems with discontinuous tracks, see #15, so reverted to
 * using the euclidean model from the original Java version.
 *
 * Please note: Many modifications were made to this file to reduce allocations and garbage collections on iPad,
 * see #50.  The main changes were: Using pooling,
 * pass by reference, and component-wise math. Unfortunately, these are often compromises in the
 * readability/maintainability of the code, but they seemed important to attain good performance.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const Bounds2IO = require( 'DOT/Bounds2IO' );
  const Constants = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/Constants' );
  const ControlPoint = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/ControlPoint' );
  const DebugTracks = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/DebugTracks' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Emitter = require( 'AXON/Emitter' );
  const energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  const EnergySkateParkModelIO = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/EnergySkateParkModelIO' );
  const EnergySkateParkQueryParameters = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/EnergySkateParkQueryParameters' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const ObservableArrayIO = require( 'AXON/ObservableArrayIO' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Range = require( 'DOT/Range' );
  const ReferenceIO = require( 'TANDEM/types/ReferenceIO' );
  const Skater = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Skater' );
  const SkaterState = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/SkaterState' );
  const StringIO = require( 'TANDEM/types/StringIO' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Track = require( 'ENERGY_SKATE_PARK/energy-skate-park/common/model/Track' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  // Reuse empty object for creating SkaterStates to avoid allocations
  const EMPTY_OBJECT = {};

  // Use a separate pooled curvature variable to reduce memory allocations - object values
  // will be modified as the skater moves
  const curvatureTemp = { r: 1, x: 0, y: 0 };
  const curvatureTemp2 = { r: 1, x: 0, y: 0 };

  // Thrust is not currently implemented in Energy Skate Park but may be used in a future version, so left here
  const thrust = new Vector2( 0, 0 );

  // Flag to enable debugging for physics issues
  const debug = EnergySkateParkQueryParameters.debugLog ? function() {
    console.log.apply( console, arguments );
  } : null;
  const debugAttachDetach = EnergySkateParkQueryParameters.debugAttachDetach ? function() {
    console.log.apply( console, arguments );
  } : null;

  // Control points are replenished in the toolbox as they are destroyed (by connecting) in the play area
  // This is the maximum number of control points available to the user.
  const MAX_NUMBER_CONTROL_POINTS = 15;

  // Track the model iterations to implement "slow motion" by stepping every Nth frame, see #210
  let modelIterations = 0;

  /**
   * TODO: Remove draggableTracks!
   * @param {boolean} draggableTracks True in screen 3 where the user can drag the tracks
   * @param {boolean} frictionAllowed True if this is screen 2-3, where friction is allowed to be on or off
   * @param {Tandem} tandem
   * @constructor
   */
  class EnergySkateParkModel extends PhetioObject {
    constructor( draggableTracks, frictionAllowed, tandem, options ) {
      super( {
        phetioType: EnergySkateParkModelIO,
        tandem: tandem,
        phetioState: false
      } );

      options = merge( {

        // {boolean} - if true, tracks can be dragged around the play area
        tracksDraggable: false,

        // {boolean} - if true, track control points can be dragged and track shapes can change
        tracksConfigurable: false,

        // @boolean - default for the speedValueVisibleProperty, whether or not the value of speed is displayed
        // on the speedometer
        defaultSpeedValueVisible: true,

        // passed to Skater
        skaterOptions: {}
      }, options );

      options.skaterOptions = merge( {

        // initial mass for the skater
        // TODO: In the future, we may have many skaters and this won't apply
        // Or maybe we will only have one skater, and change the visual representation by value
        defaultMass: Constants.DEFAULT_MASS,
        massRange: Constants.MASS_RANGE
      }, options.skaterOptions );

      // @public (read-only)
      this.draggableTracks = draggableTracks; // TODO: REmove this in favor of tracksDraggable option
      this.frictionAllowed = frictionAllowed;
      this.tracksDraggable = options.tracksDraggable;
      this.tracksConfigurable = options.tracksConfigurable;

      const controlPointGroupTandem = tandem.createGroupTandem( 'controlPoint' );
      const trackGroupTandem = tandem.createGroupTandem( 'track' );

      // @protected
      this.controlPointGroupTandem = controlPointGroupTandem;

      // @public
      this.trackGroupTandem = trackGroupTandem;

      // Temporary flag that keeps track of whether the track was changed in the step before the physics update.
      // true if the skater's track is being dragged by the user, so that energy conservation no longer applies.
      // Only applies to one frame at a time (for the immediate next update).  See #127 and #135
      // @private
      this.trackChangePending = false;

      // @public - model for visibility of various view parameters
      this.pieChartVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'pieChartVisibleProperty' )
      } );
      this.barGraphVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'barGraphVisibleProperty' )
      } );
      this.gridVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'gridVisibleProperty' )
      } );
      this.speedometerVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'speedometerVisibleProperty' )
      } );

      // whether the speed value is visible on the speedometer
      this.speedValueVisibleProperty = new BooleanProperty( options.defaultSpeedValueVisible, {
        tandem: tandem.createTandem( 'speedValueVisibleProperty' )
      } );
      this.referenceHeightVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'referenceHeightVisibleProperty' )
      } );
      this.measuringTapeVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'measuringTapeVisibleProperty' )
      } );

      // @public {number} - scale applied to graphs to determine relative height, making this larger will "zoom out"
      this.barGraphScaleProperty = new NumberProperty( 1 / 30, {
        tandem: tandem.createTandem( 'barGraphScaleProperty' )
      } );

      // @public - enabled/disabled for the track editing buttons
      this.editButtonEnabledProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'editButtonEnabledProperty' )
      } );
      this.clearButtonEnabledProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'clearButtonEnabledProperty' )
      } );

      // Whether the sim is paused or running
      this.pausedProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'pausedProperty' )
      } );

      // @public {NumberProperty} - For the simulation timer which can be started/stopped/reset by user - not the
      // time since launch
      this.timeProperty = new NumberProperty( 0, {
        tandem: tandem.createTandem( 'timeProperty' )
      } );

      // @public {BooleanProperty} -Whether or not the timer is running
      this.timerRunningProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'timerRunningProperty' )
      } );

      // @public {Vector2} - position for the timer, in model coordinates
      this.timerPositionProperty = new Vector2Property( new Vector2( 0, 0 ), {
        tandem: tandem.createTandem( 'timerPositionProperty' )
      } );

      // @public {BooleanProperty} - whether or not the timer is visible for use
      this.timerVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'timerVisibleProperty' )
      } );

      // @public {string} - speed of the model, either 'normal' or 'slow'
      this.speedProperty = new Property( 'normal', {
        tandem: tandem.createTandem( 'speedProperty' ),
        phetioType: PropertyIO( StringIO )
      } );

      // @public {number} - Coefficient of friction (unitless) between skater and track
      this.frictionProperty = new NumberProperty( frictionAllowed ? Constants.DEFAULT_FRICTION : 0, {
        range: new Range( Constants.MIN_FRICTION, Constants.MAX_FRICTION ),
        tandem: tandem.createTandem( 'frictionProperty' )
      } );

      // @public
      this.measuringTapeBasePositionProperty = new Vector2Property( new Vector2( 0, 0 ), {
        tandem: tandem.createTandem( 'measuringTapeBasePositionProperty' )
      } );

      // @public
      this.measuringTapeTipPositionProperty = new Vector2Property( new Vector2( 0, 0 ), {
        tandem: tandem.createTandem( 'measuringTapeTipPositionProperty' )
      } );

      // @public {boolean} - Whether the skater should stick to the track like a roller coaster, or be able to fly off like a street
      this.stickingToTrackProperty = new BooleanProperty( true, {
        tandem: tandem.createTandem( 'stickingToTrackProperty' )
      } );

      // @public - Will be filled in by the view, used to prevent control points from moving outside the visible model bounds when
      // adjusted, see #195
      this.availableModelBoundsProperty = new Property( new Bounds2( 0, 0, 0, 0 ), {
        tandem: tandem.createTandem( 'availableModelBoundsProperty' ),
        phetioType: PropertyIO( Bounds2IO )
      } );

      if ( EnergySkateParkQueryParameters.debugTrack ) {
        this.frictionProperty.debug( 'friction' );
      }

      // @public {Skater} - the skater model instance
      this.skater = new Skater( tandem.createTandem( 'skater' ), options.skaterOptions );

      // Determine if the skater is onscreen or offscreen for purposes of highlighting the 'return skater' button.
      // Don't check whether the skater is underground since that is a rare case (only if the user is actively dragging a
      // control point near y=0 and the track curves below) and the skater will pop up again soon, see the related
      // flickering problem in #206
      this.skaterInBoundsProperty = new DerivedProperty( [ this.skater.positionProperty ], position => {
        const availableModelBounds = this.availableModelBoundsProperty.get();
        if ( !availableModelBounds.hasNonzeroArea() ) {
          return true;
        }
        return availableModelBounds && containsAbove( availableModelBounds, position.x, position.y );
      } );

      // @public - signify that the model has successfully been reset to initial state
      this.resetEmitter = new Emitter();

      // If the mass changes while the sim is paused, trigger an update so the skater image size will update, see #115
      // TODO: Can this me moved into Skater.js?
      this.skater.massProperty.link( () => { if ( this.pausedProperty.value ) { this.skater.updatedEmitter.emit(); } } );

      // @public
      this.tracks = new ObservableArray( {
        phetioType: ObservableArrayIO( ReferenceIO ),
        tandem: tandem.createTandem( 'tracks' )
      } );

      // When tracks are removed, they are no longer used by the application and should be disposed
      this.tracks.addItemRemovedListener( track => {

        // TODO: may need to add an isDisposedCheck to support PhET-iO state
        track.dispose();
      } );

      // @public - emits an event whenever a track changes in some way (control points dragged, track split apart,
      // track dragged, track deleted or scene changed, etc...)
      this.trackChangedEmitter = new Emitter();

      // Determine when to show/hide the track edit buttons (cut track or delete control point)
      const updateTrackEditingButtonProperties = () => {
        let editEnabled = false;
        let clearEnabled = false;
        const physicalTracks = this.getPhysicalTracks();
        for ( let i = 0; i < physicalTracks.length; i++ ) {
          clearEnabled = true;
          const physicalTrack = physicalTracks[ i ];
          if ( physicalTrack.controlPoints.length >= 3 ) {
            editEnabled = true;
          }
        }
        this.editButtonEnabledProperty.value = editEnabled;
        this.clearButtonEnabledProperty.value = clearEnabled;
      };
      this.tracks.addItemAddedListener( updateTrackEditingButtonProperties );
      this.tracks.addItemRemovedListener( updateTrackEditingButtonProperties );
      this.updateEmitter = new Emitter();
      this.trackChangedEmitter.addListener( updateTrackEditingButtonProperties );

      if ( EnergySkateParkQueryParameters.debugTrack ) {
        DebugTracks.init( this, tandem.createGroupTandem( 'debugTrackControlPoint' ), tandem.createGroupTandem( 'track' ) );
      }
    }

    // Add the tracks that will be in the track toolbox for the "Playground" screen
    addDraggableTracks() {

      // 3 points per track
      for ( let i = 0; i < MAX_NUMBER_CONTROL_POINTS / 3; i++ ) {
        this.addDraggableTrack();
      }
    }

    // Add a single track to the track control panel.
    addDraggableTrack() {

      const controlPointGroupTandem = this.controlPointGroupTandem;
      const trackGroupTandem = this.trackGroupTandem;

      // Move the tracks over so they will be in the right position in the view coordinates, under the grass to the left
      // of the clock controls.  Could use view transform for this, but it would require creating the view first, so just
      // eyeballing it for now.
      const offset = new Vector2( -5.1, -0.85 );
      const controlPoints = [

        // Control points only participate in the state if they are draggable (on the lab screens)
        new ControlPoint( offset.x - 1, offset.y, {
          tandem: controlPointGroupTandem.createNextTandem(),
          phetioState: this.tracksDraggable
        } ),
        new ControlPoint( offset.x, offset.y, {
          tandem: controlPointGroupTandem.createNextTandem(),
          phetioState: this.tracksDraggable
        } ),
        new ControlPoint( offset.x + 1, offset.y, {
          tandem: controlPointGroupTandem.createNextTandem(),
          phetioState: this.tracksDraggable
        } )
      ];
      this.tracks.add( new Track( this, this.tracks, controlPoints, null, this.availableModelBoundsProperty, merge( {
          tandem: trackGroupTandem.createNextTandem()
        }, Track.FULLY_INTERACTIVE_OPTIONS )
      ) );
    }

    // Reset the model, including the skater, tracks, visualizations, etc.
    reset() {
      const availableModelBounds = this.availableModelBoundsProperty.value;
      this.pieChartVisibleProperty.reset();
      this.barGraphVisibleProperty.reset();
      this.gridVisibleProperty.reset();
      this.speedometerVisibleProperty.reset();
      this.referenceHeightVisibleProperty.reset();
      this.measuringTapeVisibleProperty.reset();
      this.measuringTapeTipPositionProperty.reset();
      this.measuringTapeBasePositionProperty.reset();
      this.editButtonEnabledProperty.reset();
      this.clearButtonEnabledProperty.reset();
      this.barGraphScaleProperty.reset();
      this.pausedProperty.reset();
      this.speedProperty.reset();
      this.frictionProperty.reset();
      this.stickingToTrackProperty.reset();
      this.availableModelBoundsProperty.reset();
      this.timeProperty.reset();
      this.timerRunningProperty.reset();
      this.timerPositionProperty.reset();
      this.timerVisibleProperty.reset();
      this.availableModelBoundsProperty.value = availableModelBounds;
      this.skater.reset();

      this.clearTracks();

      this.resetEmitter.emit();
    }

    /**
     * Clear all draggable tracks from the screen. For "Intro" and "Friction" screens, this will no-op, only clears
     * "Playground" screen.
     */
    clearTracks() {

      // For the first two screens, make the default track physical
      if ( this.tracksDraggable ) {
        this.tracks.forEach( track => {
          track.disposeControlPoints();
        } );
        this.tracks.clear();
        this.addDraggableTracks();

        // If the skater was on a track, then he should fall off, see #97
        if ( this.skater.trackProperty.value ) {
          this.skater.trackProperty.value = null;
        }
      }
    }

    // step one frame, assuming 60fps
    manualStep() {
      const skaterState = new SkaterState( this.skater, EMPTY_OBJECT );
      const dt = 1.0 / 60;
      const result = this.stepModel( dt, skaterState );
      result.setToSkater( this.skater );
      this.skater.updatedEmitter.emit();
    }

    // Step the model, automatically called from Joist
    step( dt ) {

      // This simulation uses a fixed time step to make the skater's motion reproducible.  Making the time step fixed
      // did not significantly reduce performance/speed on iPad3.
      dt = 1.0 / 60.0;

      let initialEnergy = null;

      // If the delay makes dt too high, then truncate it.  This helps e.g. when clicking in the address bar on ipad,
      // which gives a huge dt and problems for integration
      if ( !this.pausedProperty.value && !this.skater.draggingProperty.value ) {

        const initialThermalEnergy = this.skater.thermalEnergyProperty.value;

        // If they switched windows or tabs, just bail on that delta
        if ( dt > 1 || dt <= 0 ) {
          dt = 1.0 / 60.0;
        }

        const skaterState = new SkaterState( this.skater, EMPTY_OBJECT );
        if ( debug ) {
          initialEnergy = skaterState.getTotalEnergy();
        }

        // Update the skater state by running the dynamics engine
        // There are issues in running multiple iterations here (the skater won't attach to the track).  I presume some
        // of that work is being done in setToSkater() below or skater.trigger('updated')
        // In either case, 10 subdivisions on iPad3 makes the sim run too slowly, so we may just want to leave it as is
        let updatedState = null;
        modelIterations++;
        if ( this.speedProperty.value === 'normal' || modelIterations % 3 === 0 ) {
          updatedState = this.stepModel( dt, skaterState );
        }

        if ( debug && Math.abs( updatedState.getTotalEnergy() - initialEnergy ) > 1E-6 ) {
          const initialStateCopy = new SkaterState( this.skater, EMPTY_OBJECT );
          const redo = this.stepModel( this.speedProperty.value === 'normal' ? dt : dt * 0.25, initialStateCopy );
          debug && debug( redo );
        }
        if ( updatedState ) {
          updatedState.setToSkater( this.skater );
          this.skater.updatedEmitter.emit();

          // Make sure the thermal energy doesn't go negative
          const finalThermalEnergy = this.skater.thermalEnergyProperty.value;
          const deltaThermalEnergy = finalThermalEnergy - initialThermalEnergy;
          if ( deltaThermalEnergy < 0 ) {
            debug && debug( 'thermal energy wanted to decrease' );
          }
        }
      }

      // Clear the track change pending flag for the next step
      this.trackChangePending = false;

      // If traveling on the ground, face in the direction of motion, see #181
      if ( this.skater.trackProperty.value === null && this.skater.positionProperty.value.y === 0 ) {
        if ( this.skater.velocityProperty.value.x > 0 ) {
          this.skater.directionProperty.value = 'right';
        }
        if ( this.skater.velocityProperty.value.x < 0 ) {
          this.skater.directionProperty.value = 'left';
        }
        else {
          // skater wasn't moving, so don't change directions
        }
      }

      // increment running time
      if ( this.timerRunningProperty.get() ) {
        this.timeProperty.set( this.timeProperty.get() + dt );
      }
    }

    /**
     * The skater moves along the ground with the same coefficient of fraction as the tracks, see #11. Returns a
     * SkaterState that is applied to this.skater.
     *
     * @param {number} dt
     * @param {SkaterState} skaterState
     *
     * @returns {SkaterState}
     */
    stepGround( dt, skaterState ) {
      const x0 = skaterState.positionX;
      const frictionMagnitude = ( this.frictionProperty.value === 0 || skaterState.getSpeed() < 1E-2 ) ? 0 :
                                this.frictionProperty.value * skaterState.mass * skaterState.gravity;
      const acceleration = Math.abs( frictionMagnitude ) * ( skaterState.velocityX > 0 ? -1 : 1 ) / skaterState.mass;

      let v1 = skaterState.velocityX + acceleration * dt;

      // Exponentially decay the velocity if already nearly zero, see #138
      if ( this.frictionProperty.value !== 0 && skaterState.getSpeed() < 1E-2 ) {
        v1 = v1 / 2;
      }
      const x1 = x0 + v1 * dt;
      const newPosition = new Vector2( x1, 0 );
      const originalEnergy = skaterState.getTotalEnergy();

      const updated = skaterState.updatePositionAngleUpVelocity( newPosition.x, newPosition.y, 0, true, v1, 0 );

      const newEnergy = updated.getTotalEnergy();
      const newKineticEnergy = updated.getKineticEnergy();


      // Correct the energy so that total energy does not change after this update. If the energy has gone down
      // (energyDiference positive), we can add energyDifference to thermal energy without much consequence.
      // But if energy increased, we may end up with negative thermal energy if we remove the excess from
      // thermal energy, so we attempt to take it out of kinetic energy instead.
      // See https://github.com/phetsims/energy-skate-park/issues/45
      const energyDifference = ( originalEnergy - newEnergy );
      const absEnergyDifference = Math.abs( energyDifference );
      if ( energyDifference < 0 && newKineticEnergy > absEnergyDifference ) {
        const currentSpeed = Math.abs( v1 );

        // since KE = 1/2 * m * v^2
        const speedInExcessEnergy = Math.sqrt( 2 * Math.abs( absEnergyDifference ) / updated.mass );
        const newSpeed = currentSpeed - speedInExcessEnergy;
        assert && assert( newSpeed >= 0, 'tried to remove too much energy from kineticEnergy, correct another way' );

        // restore direction to velocity
        const correctedV = v1 >= 0 ? newSpeed : -newSpeed;
        return skaterState.updatePositionAngleUpVelocity( newPosition.x, newPosition.y, 0, true, correctedV, 0 );
      }
      else {
        const newThermalEnergy = updated.thermalEnergy + energyDifference;
        assert && assert( newThermalEnergy >= 0, 'thermal energy should not be negative, correct energy another way' );
        return updated.updateThermalEnergy( newThermalEnergy );
      }
    }

    /**
     * Transition the skater to the ground. New speed for the skater will keep x component of proposed velocity, and
     * energies are then updated accordingly. Returns a new SkaterState to modify this.skater.
     *
     * No bouncing on the ground, but the code is very similar to attachment part of interactWithTracksWileFalling.
     *
     * @param {SkaterState} skaterState
     * @param {number} initialEnergy - energy prior to transitioning to ground
     * @param {Vector2} proposedPosition
     * @param {Vector2} proposedVelocity
     * @param {number} dt
     *
     * @returns {SkaterState}
     */
    switchToGround( skaterState, initialEnergy, proposedPosition, proposedVelocity, dt ) {
      const segment = new Vector2( 1, 0 );

      const newSpeed = segment.dot( proposedVelocity );

      // Make sure energy perfectly conserved when falling to the ground.
      const newKineticEnergy = 0.5 * newSpeed * newSpeed * skaterState.mass;
      const newPotentialEnergy = ( -1 ) * skaterState.mass * skaterState.gravity * ( 0 - skaterState.referenceHeight );

      // TODO: This is likely related to issue identified in #45
      const newThermalEnergy = initialEnergy - newKineticEnergy - newPotentialEnergy;

      // Supply information about a very rare problem that occurs when thermal energy goes negative,
      // see https://github.com/phetsims/energy-skate-park/issues/45
      assert && assert( newThermalEnergy >= 0,
        'Thermal energy should be non-negative: ' +
        'skaterState: ' + skaterState + ', ' +
        'oldPotentialEnergy:' + skaterState.getPotentialEnergy() + ', ' +
        'skaterPositionY:' + skaterState.positionY + ', ' +
        'initialEnergy: ' + initialEnergy + ', ' +
        'proposedPosition: ' + proposedPosition + ', ' +
        'proposedVelocity: ' + proposedVelocity + ', ' +
        'dt: ' + dt + ', ' +
        'newSpeed: ' + newSpeed + ', ' +
        'newKineticEnergy: ' + newKineticEnergy + ', ' +
        'newPotentialEnergy: ' + newPotentialEnergy + ', ' +
        'newThermalEnergy: ' + newThermalEnergy + ', ' +
        'referenceHeight: ' + skaterState.referenceHeight + ', tracked in https://github.com/phetsims/energy-skate-park/issues/45' );

      if ( !isFinite( newThermalEnergy ) ) { throw new Error( 'not finite' ); }
      return skaterState.switchToGround( newThermalEnergy, newSpeed, 0, proposedPosition.x, proposedPosition.y );
    }

    /**
     * Update the skater in free fall
     * @param {number} dt the time that passed, in seconds
     * @param {SkaterState} skaterState the original state of the skater
     * @param {boolean} justLeft true if the skater just fell off or launched off the track: in this case it should not
     * interact with the track.
     * @returns {SkaterState} the new state
     */
    stepFreeFall( dt, skaterState, justLeft ) {
      const initialEnergy = skaterState.getTotalEnergy();

      const acceleration = new Vector2( 0, skaterState.gravity );
      const proposedVelocity = skaterState.getVelocity().plus( acceleration.times( dt ) );
      const position = skaterState.getPosition();
      const proposedPosition = position.plus( proposedVelocity.times( dt ) );
      if ( proposedPosition.y < 0 ) {
        proposedPosition.y = 0;

        return this.switchToGround( skaterState, initialEnergy, proposedPosition, proposedVelocity, dt );
      }
      else if ( position.x !== proposedPosition.x || position.y !== proposedPosition.y ) {

        // see if it crossed the track
        const physicalTracks = this.getPhysicalTracks();

        // Don't interact with the track if the skater just left the track in this same frame, see #142
        if ( physicalTracks.length && !justLeft ) {
          return this.interactWithTracksWhileFalling( physicalTracks, skaterState, proposedPosition, initialEnergy, dt, proposedVelocity );
        }
        else {
          return this.continueFreeFall( skaterState, initialEnergy, proposedPosition, proposedVelocity, dt );
        }
      }
      else {
        return skaterState;
      }
    }

    // Find the closest track to the skater, to see what he can bounce off of or attach to, and return the closest point
    // on that track took.
    /**
     * Find the closest track to the skater, to see what he can bounce off or attach to, and return the closest point
     * that the track took.
     *
     * @param {Vector2} position
     * @param {[].Track} physicalTracks
     *
     * @returns {Object|null} - collection of { track: {Track}, parametricPosition: {Vector2}, point: {Vector2} }, or null
     */
    getClosestTrackAndPositionAndParameter( position, physicalTracks ) {
      let closestTrack = null;
      let closestMatch = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      for ( let i = 0; i < physicalTracks.length; i++ ) {
        const track = physicalTracks[ i ];

        // PERFORMANCE/ALLOCATION maybe get closest point shouldn't return a new object allocation each time, or use
        // pooling for it, or pass in reference as an arg?
        const bestMatch = track.getClosestPositionAndParameter( position );
        if ( bestMatch.distance < closestDistance ) {
          closestDistance = bestMatch.distance;
          closestTrack = track;
          closestMatch = bestMatch;
        }
      }
      if ( closestTrack ) {
        return { track: closestTrack, parametricPosition: closestMatch.parametricPosition, point: closestMatch.point };
      }
      else {
        return null;
      }
    }

    /**
     * Check to see if the points crossed the track.
     *
     * @param {Object} closestTrackAndPositionAndParameter - the object returned by getClosestTrackAndPositionAndParameter()
     * @param {[].Tracks} physicalTracks - all tracks that the skater can physically interact with
     * @param {number} beforeX
     * @param {number} beforeY
     * @param {number} afterX
     * @param {number} afterY
     *
     * @returns {boolean}
     */
    crossedTrack( closestTrackAndPositionAndParameter, physicalTracks, beforeX, beforeY, afterX, afterY ) {
      const track = closestTrackAndPositionAndParameter.track;
      const parametricPosition = closestTrackAndPositionAndParameter.parametricPosition;
      const trackPoint = closestTrackAndPositionAndParameter.point;

      if ( !track.isParameterInBounds( parametricPosition ) ) {
        return false;
      }
      else {

        // Linearize the spline, and check to see if the skater crossed by performing a line segment intersection between
        // the skater's trajectory segment and the linearized track segment.
        // Note, this has an error for cusps, see #212
        const unitParallelVector = track.getUnitParallelVector( parametricPosition );
        const a = trackPoint.plus( unitParallelVector.times( 100 ) );
        const b = trackPoint.plus( unitParallelVector.times( -100 ) );
        const intersection = Util.lineSegmentIntersection( a.x, a.y, b.x, b.y, beforeX, beforeY, afterX, afterY );
        return intersection !== null;
      }
    }

    /**
     * Check to see if skater should hit or attach to  track during free fall. Returns a new SkaterState for this.skater
     *
     * @param {[].Track]} physicalTracks
     * @param {SkaterState} skaterState
     * @param {Vector2} proposedPosition
     * @param {number} initialEnergy
     * @param {number} dt
     * @param {Vector2} proposedVelocity
     *
     * @returns {SkaterState}
     */
    interactWithTracksWhileFalling( physicalTracks, skaterState, proposedPosition, initialEnergy, dt, proposedVelocity ) {

      // Find the closest track, and see if the skater would cross it in this time step.
      // Assuming the skater's initial + final locations determine a line segment, we search for the best point for the
      // skater's start point, midpoint and end point and choose whichever is closest.  This helps avoid "high curvature"
      // problems like the one identified in #212
      const a = this.getClosestTrackAndPositionAndParameter( skaterState.getPosition(), physicalTracks );
      const averagePosition = new Vector2( ( skaterState.positionX + proposedPosition.x ) / 2, ( skaterState.positionY + proposedPosition.y ) / 2 );
      const b = this.getClosestTrackAndPositionAndParameter( averagePosition, physicalTracks );
      const c = this.getClosestTrackAndPositionAndParameter( new Vector2( proposedPosition.x, proposedPosition.y ), physicalTracks );

      const initialPosition = skaterState.getPosition();
      const distanceA = Util.distToSegment( a.point, initialPosition, proposedPosition );
      const distanceB = Util.distToSegment( b.point, initialPosition, proposedPosition );
      const distanceC = Util.distToSegment( c.point, initialPosition, proposedPosition );

      const distances = [ distanceA, distanceB, distanceC ];
      const minDistance = _.min( distances );

      const closestTrackAndPositionAndParameter = minDistance === distanceA ? a : minDistance === distanceC ? c : b;

      debugAttachDetach && debugAttachDetach( 'minDistance', distances.indexOf( minDistance ) );

      const crossed = this.crossedTrack( closestTrackAndPositionAndParameter, physicalTracks,
        skaterState.positionX, skaterState.positionY, proposedPosition.x, proposedPosition.y );

      const track = closestTrackAndPositionAndParameter.track;
      const parametricPosition = closestTrackAndPositionAndParameter.parametricPosition;
      const trackPoint = closestTrackAndPositionAndParameter.point;

      if ( crossed ) {
        debugAttachDetach && debugAttachDetach( 'attaching' );
        const normal = track.getUnitNormalVector( parametricPosition );
        const segment = normal.perpendicular;

        const beforeVector = skaterState.getPosition().minus( trackPoint );

        // If crossed the track, attach to it.
        let newVelocity = segment.times( segment.dot( proposedVelocity ) );
        let newSpeed = newVelocity.magnitude;
        let newKineticEnergy = 0.5 * skaterState.mass * newVelocity.magnitudeSquared;
        const newPosition = track.getPoint( parametricPosition );
        const newPotentialEnergy = -skaterState.mass * skaterState.gravity * ( newPosition.y - skaterState.referenceHeight );
        let newThermalEnergy = initialEnergy - newKineticEnergy - newPotentialEnergy;

        // Sometimes (depending on dt) the thermal energy can go negative by the above calculation, see #141
        // In that case, set the thermal energy to zero and reduce the speed to compensate.
        if ( newThermalEnergy < skaterState.thermalEnergy ) {
          newThermalEnergy = skaterState.thermalEnergy;
          newKineticEnergy = initialEnergy - newPotentialEnergy - newThermalEnergy;

          assert && assert( newKineticEnergy >= 0, 'kinetic energy should be non-negative after correction' );
          if ( newKineticEnergy < 0 ) {
            newKineticEnergy = 0;
          }

          // ke = 1/2 m v v
          newSpeed = Math.sqrt( 2 * newKineticEnergy / skaterState.mass );
          newVelocity = segment.times( newSpeed );
        }

        const dot = proposedVelocity.normalized().dot( segment );

        // Sanity test
        assert && assert( isFinite( dot ) );
        assert && assert( isFinite( newVelocity.x ) );
        assert && assert( isFinite( newVelocity.y ) );
        assert && assert( isFinite( newThermalEnergy ) );
        assert && assert( newThermalEnergy >= 0 );

        let parametricSpeed = ( dot > 0 ? +1 : -1 ) * newSpeed;
        const onTopSideOfTrack = beforeVector.dot( normal ) > 0;

        debug && debug( 'attach to track, ' + ', ' + parametricPosition + ', ' + track.maxPoint );

        // Double check the velocities and invert parametricSpeed if incorrect, see #172
        // Compute the new velocities same as in stepTrack
        const unitParallelVector = track.getUnitParallelVector( parametricPosition );
        const newVelocityX = unitParallelVector.x * parametricSpeed;
        const newVelocityY = unitParallelVector.y * parametricSpeed;

        const velocityDotted = skaterState.velocityX * newVelocityX + skaterState.velocityY * newVelocityY;

        // See if the track attachment will cause velocity to flip, and inverse it if so, see #172
        if ( velocityDotted < -1E-6 ) {
          parametricSpeed = parametricSpeed * -1;
        }

        return skaterState.attachToTrack( newThermalEnergy, track, onTopSideOfTrack, parametricPosition, parametricSpeed, newVelocity.x, newVelocity.y, newPosition.x, newPosition.y );
      }

      // It just continued in free fall
      else {
        return this.continueFreeFall( skaterState, initialEnergy, proposedPosition, proposedVelocity, dt );
      }
    }

    /**
     * Started in free fall and did not interact with a track. Returns a new SkaterState for this.skater.
     * @private
     *
     * @param {SkaterState} skaterState
     * @param {number} initialEnergy
     * @param {Vector2} proposedPosition
     * @param {Vector2} proposedVelocity
     * @param {number} dt
     *
     * @returns {SkaterState}
     */
    continueFreeFall( skaterState, initialEnergy, proposedPosition, proposedVelocity, dt ) {

      // make up for the difference by changing the y value
      const y = ( initialEnergy - 0.5 * skaterState.mass * proposedVelocity.magnitudeSquared - skaterState.thermalEnergy ) / ( -1 * skaterState.mass * skaterState.gravity ) + skaterState.referenceHeight;
      if ( y <= 0 ) {
        // When falling straight down, stop completely and convert all energy to thermal
        return skaterState.strikeGround( initialEnergy, proposedPosition.x );
      }
      else {
        return skaterState.continueFreeFall( proposedVelocity.x, proposedVelocity.y, proposedPosition.x, y );
      }
    }

    /**
     * Gets the net force discluding normal force.
     *
     * Split into component-wise to prevent allocations, see #50
     *
     * @private
     *
     * @param {SkaterState} skaterState the state
     * @returns {number} netForce in the X direction
     */
    getNetForceWithoutNormalX( skaterState ) {
      return this.getFrictionForceX( skaterState );
    }

    /**
     * Gets the net force but without the normal force.
     *
     * Split into component-wise to prevent allocations, see #50
     * @private
     *
     * @param {SkaterState} skaterState the state
     * @returns {number} netForce in the Y direction
     */
    getNetForceWithoutNormalY( skaterState ) {
      return skaterState.mass * skaterState.gravity + this.getFrictionForceY( skaterState );
    }

    /**
     * The only other force on the object in the direction of motion is the gravity force
     * Component-wise to reduce allocations, see #50
     * @private
     *
     * @param {SkaterState} skaterState
     *
     * @returns {number}
     */
    getFrictionForceX( skaterState ) {

      // Friction force should not exceed sum of other forces (in the direction of motion), otherwise the friction could
      // start a stopped object moving. Hence we check to see if the object is already stopped and don't add friction
      // in that case
      if ( this.frictionProperty.value === 0 || skaterState.getSpeed() < 1E-2 ) {
        return 0;
      }
      else {
        const magnitude = this.frictionProperty.value * this.getNormalForce( skaterState ).magnitude;
        const angleComponent = Math.cos( skaterState.getVelocity().angle + Math.PI );
        assert && assert( isFinite( magnitude ), 'magnitude should be finite' );
        assert && assert( isFinite( angleComponent ), 'angleComponent should be finite' );
        return magnitude * angleComponent;
      }
    }

    /**
     * The only other force on the object in the direction of motion is the gravity force
     * Component-wise to reduce allocations, see #50
     * @private
     *
     * @param {SkaterState} skaterState
     * @returns {number}
     */
    getFrictionForceY( skaterState ) {

      // Friction force should not exceed sum of other forces (in the direction of motion), otherwise the friction could
      // start a stopped object moving.  Hence we check to see if the object is already stopped and don't add friction in
      // that case
      if ( this.frictionProperty.value === 0 || skaterState.getSpeed() < 1E-2 ) {
        return 0;
      }
      else {
        const magnitude = this.frictionProperty.value * this.getNormalForce( skaterState ).magnitude;
        return magnitude * Math.sin( skaterState.getVelocity().angle + Math.PI );
      }
    }

    /**
     * Get the normal force (Newtons) on the skater.
     *
     * @param {SkaterState} skaterState
     * @returns {number}
     */
    getNormalForce( skaterState ) {
      skaterState.getCurvature( curvatureTemp2 );
      const radiusOfCurvature = Math.min( curvatureTemp2.r, 100000 );
      const netForceRadial = new Vector2( 0, 0 );

      netForceRadial.addXY( 0, skaterState.mass * skaterState.gravity );// gravity
      let curvatureDirection = this.getCurvatureDirection( curvatureTemp2, skaterState.positionX, skaterState.positionY );

      // On a flat surface, just use the radial component of the net force for the normal, see #344
      if ( isNaN( curvatureDirection.x ) || isNaN( curvatureDirection.y ) ) {
        curvatureDirection = netForceRadial.normalized(); // todo: sign?
      }
      const normalForce = skaterState.mass * skaterState.getSpeed() * skaterState.getSpeed() / Math.abs( radiusOfCurvature ) - netForceRadial.dot( curvatureDirection );
      debug && debug( normalForce );

      const n = Vector2.createPolar( normalForce, curvatureDirection.angle );
      assert && assert( isFinite( n.x ), 'n.x should be finite' );
      assert && assert( isFinite( n.y ), 'n.y should be finite' );
      return n;
    }

    /**
     * Use an Euler integration step to move the skater along the track. This code is in an inner loop of the model
     * physics, and has been heavily optimized. Returns a new SkaterState for this.skater.
     *
     * @param {number} dt
     * @param {SkaterState} skaterState
     *
     * @returns {SkaterState}
     */
    stepEuler( dt, skaterState ) {
      const track = skaterState.track;
      const origEnergy = skaterState.getTotalEnergy();
      const origLocX = skaterState.positionX;
      const origLocY = skaterState.positionY;
      let thermalEnergy = skaterState.thermalEnergy;
      let parametricSpeed = skaterState.parametricSpeed;
      assert && assert( isFinite( parametricSpeed ) );
      let parametricPosition = skaterState.parametricPosition;

      // Component-wise math to prevent allocations, see #50
      const netForceX = this.getNetForceWithoutNormalX( skaterState );
      const netForceY = this.getNetForceWithoutNormalY( skaterState );
      const netForceMagnitude = Math.sqrt( netForceX * netForceX + netForceY * netForceY );
      const netForceAngle = Math.atan2( netForceY, netForceX );

      // Get the net force in the direction of the track.  Dot product is a * b * cos(theta)
      const a = netForceMagnitude * Math.cos( skaterState.track.getModelAngleAt( parametricPosition ) - netForceAngle ) / skaterState.mass;

      parametricSpeed += a * dt;
      assert && assert( isFinite( parametricSpeed ), 'parametricSpeed should be finite' );
      parametricPosition += track.getParametricDistance( parametricPosition, parametricSpeed * dt + 1 / 2 * a * dt * dt );
      const newPointX = skaterState.track.getX( parametricPosition );
      const newPointY = skaterState.track.getY( parametricPosition );
      const unitParallelVector = skaterState.track.getUnitParallelVector( parametricPosition );
      const parallelUnitX = unitParallelVector.x;
      const parallelUnitY = unitParallelVector.y;
      let newVelocityX = parallelUnitX * parametricSpeed;
      let newVelocityY = parallelUnitY * parametricSpeed;

      // Exponentially decay the velocity if already nearly zero and on a flat slope, see #129
      if ( parallelUnitX / parallelUnitY > 5 && Math.sqrt( newVelocityX * newVelocityX + newVelocityY * newVelocityY ) < 1E-2 ) {
        newVelocityX /= 2;
        newVelocityY /= 2;
      }

      // choose velocity by using the unit parallel vector to the track
      const newState = skaterState.updateUUDVelocityPosition( parametricPosition, parametricSpeed, newVelocityX, newVelocityY, newPointX, newPointY );
      if ( this.frictionProperty.value > 0 ) {

        // Compute friction force magnitude component-wise to prevent allocations, see #50
        const frictionForceX = this.getFrictionForceX( skaterState );
        const frictionForceY = this.getFrictionForceY( skaterState );
        const frictionForceMagnitude = Math.sqrt( frictionForceX * frictionForceX + frictionForceY * frictionForceY );

        const newPoint = new Vector2( newPointX, newPointY );

        const therm = frictionForceMagnitude * newPoint.distanceXY( origLocX, origLocY );
        thermalEnergy += therm;

        const newTotalEnergy = newState.getTotalEnergy() + therm;

        // Conserve energy, but only if the user is not adding energy, see #135
        if ( thrust.magnitude === 0 && !this.trackChangePending ) {
          if ( newTotalEnergy < origEnergy ) {
            thermalEnergy += Math.abs( newTotalEnergy - origEnergy );// add some thermal to exactly match
            if ( Math.abs( newTotalEnergy - origEnergy ) > 1E-6 ) {
              debug && debug( 'Added thermal, dE=' + ( newState.getTotalEnergy() - origEnergy ) );
            }
          }
          if ( newTotalEnergy > origEnergy ) {
            if ( Math.abs( newTotalEnergy - origEnergy ) < therm ) {
              debug && debug( 'gained energy, removing thermal (Would have to remove more than we gained)' );
            }
            else {
              thermalEnergy -= Math.abs( newTotalEnergy - origEnergy );
              if ( Math.abs( newTotalEnergy - origEnergy ) > 1E-6 ) {
                debug && debug( 'Removed thermal, dE=' + ( newTotalEnergy - origEnergy ) );
              }
            }
          }
        }

        // Discrepancy with original version: original version allowed drop of thermal energy here, to be fixed in the
        // heuristic patch. We have clamped it here to make it amenable to a smaller number of euler updates,
        // to improve performance
        return newState.updateThermalEnergy( Math.max( thermalEnergy, skaterState.thermalEnergy ) );
      }
      else {
        return newState;
      }
    }

    /**
     * Update the skater as it moves along the track, and fly off the track if it  goes over a jump off the track's end.
     *
     * @param {number} dt
     * @param {SkaterState} skaterState
     * @returns {SkaterState}
     */
    stepTrack( dt, skaterState ) {

      skaterState.getCurvature( curvatureTemp );

      const curvatureDirectionX = this.getCurvatureDirectionX( curvatureTemp, skaterState.positionX, skaterState.positionY );
      const curvatureDirectionY = this.getCurvatureDirectionY( curvatureTemp, skaterState.positionX, skaterState.positionY );

      const track = skaterState.track;
      const sideVectorX = skaterState.onTopSideOfTrack ? track.getUnitNormalVector( skaterState.parametricPosition ).x :
                          track.getUnitNormalVector( skaterState.parametricPosition ).x * -1;
      const sideVectorY = skaterState.onTopSideOfTrack ? track.getUnitNormalVector( skaterState.parametricPosition ).y :
                          track.getUnitNormalVector( skaterState.parametricPosition ).y * -1;

      // Dot product written out component-wise to avoid allocations, see #50
      const outsideCircle = sideVectorX * curvatureDirectionX + sideVectorY * curvatureDirectionY < 0;

      // compare a to v/r^2 to see if it leaves the track
      const r = Math.abs( curvatureTemp.r );
      const centripetalForce = skaterState.mass * skaterState.parametricSpeed * skaterState.parametricSpeed / r;

      const netForceWithoutNormalX = this.getNetForceWithoutNormalX( skaterState );
      const netForceWithoutNormalY = this.getNetForceWithoutNormalY( skaterState );

      // Net force in the radial direction is the dot product.  Component-wise to avoid allocations, see #50
      const netForceRadial = netForceWithoutNormalX * curvatureDirectionX + netForceWithoutNormalY * curvatureDirectionY;

      const leaveTrack = ( netForceRadial < centripetalForce && outsideCircle ) || ( netForceRadial > centripetalForce && !outsideCircle );

      if ( leaveTrack && !this.stickingToTrackProperty.value ) {

        // Leave the track.  Make sure the velocity is pointing away from the track or keep track of frames away from the
        // track so it doesn't immediately recollide.  Or project a ray and see if a collision is imminent?
        const freeSkater = skaterState.leaveTrack();

        debugAttachDetach && debugAttachDetach( 'left middle track', freeSkater.velocityX, freeSkater.velocityY );

        const nudged = this.nudge( freeSkater, sideVectorX, sideVectorY, +1 );

        // Step after switching to free fall, so it doesn't look like it pauses
        return this.stepFreeFall( dt, nudged, true );
      }
      else {
        let newState = skaterState;

        // Turning this value to 5 or less causes thermal energy to decrease on some time steps
        // Discrepancy with original version: original version had 10 divisions here.  We have reduced it to make it more
        // smooth and less GC
        const numDivisions = 4;
        for ( let i = 0; i < numDivisions; i++ ) {
          newState = this.stepEuler( dt / numDivisions, newState );
        }

        // Correct energy
        const correctedState = this.correctEnergy( skaterState, newState );

        // Check whether the skater has left the track
        if ( skaterState.track.isParameterInBounds( correctedState.parametricPosition ) ) {

          // To prevent non-physical behavior when the skater "pops" above ground after leaving a track that has
          // forced it underground, we switch to ground before the skater can go below ground in the first place.
          // This should only happen while dragging the track, as all track points should be above ground otherwise.
          // See https://github.com/phetsims/energy-skate-park/issues/45
          if ( correctedState.positionY <= 0 ) {
            const groundPosition = new Vector2( correctedState.positionX, 0 );
            return this.switchToGround( correctedState, correctedState.getTotalEnergy(), groundPosition, correctedState.getVelocity(), dt );
          }
          else {
            return correctedState;
          }
        }
        else {
          // Fly off the left or right side of the track
          // Off the edge of the track.  If the skater transitions from the right edge of the 2nd track directly to the
          // ground then do not lose thermal energy during the transition, see #164
          if ( correctedState.parametricPosition > skaterState.track.maxPoint && skaterState.track.slopeToGround ) {
            const result = correctedState.switchToGround( correctedState.thermalEnergy, correctedState.getSpeed(), 0, correctedState.positionX, 0 );

            // Correct the energy discrepancy when switching to the ground, see #301
            return this.correctEnergy( skaterState, result );
          }
          else {
            debugAttachDetach && debugAttachDetach( 'left edge track: ' + correctedState.parametricPosition + ', ' + skaterState.track.maxPoint );

            // There is a situation in which the `u` of the skater exceeds the track bounds before the
            // getClosestPositionAndParameter.parametricPosition does, which can cause the skater to immediately reattach
            // So make sure the skater is far enough from the track so it won't reattach right away, see #167
            const freeSkaterState = skaterState.updateTrackUD( null, 0 );

            const nudgedState = this.nudge( freeSkaterState, sideVectorX, sideVectorY, -1 );

            // Step after switching to free fall, so it doesn't look like it pauses
            return this.stepFreeFall( dt, nudgedState, true );
          }
        }
      }
    }

    /**
     * When the skater leaves the track, adjust the position and velocity. This prevents the following problems:
     * 1. When leaving from the sides, adjust the skater under the track so it won't immediately re-collide.
     * 2. When leaving from the middle of the track (say going over a jump or falling upside-down from a loop),
     * adjust the skater so it won't fall through or re-collide.
     *
     * @param {Skater} freeSkater
     * @param {number} sideVectorX
     * @param {number} sideVectorY
     * @param {number} sign
     *
     * @returns {Skater}
     */
    nudge( freeSkater, sideVectorX, sideVectorY, sign ) {

      // angle the velocity down a bit and underset from track so that it won't immediately re-collide
      // Nudge the velocity in the 'up' direction so the skater won't pass through the track, see #207
      const velocity = new Vector2( freeSkater.velocityX, freeSkater.velocityY );
      const upVector = new Vector2( sideVectorX, sideVectorY );
      if ( velocity.magnitude > 0 ) {
        const blended = velocity.normalized().blend( upVector, 0.01 * sign );
        if ( blended.magnitude > 0 ) {
          const revisedVelocity = blended.normalized().times( velocity.magnitude );
          freeSkater = freeSkater.updateUDVelocity( 0, revisedVelocity.x, revisedVelocity.y );

          // Nudge the position away from the track, slightly since it was perfectly centered on the track, see #212
          // Note this will change the energy of the skater, but only by a tiny amount (that should be undetectable in the
          // bar chart)
          const origPosition = freeSkater.getPosition();
          const newPosition = origPosition.plus( upVector.times( sign * 1E-6 ) );
          freeSkater = freeSkater.updatePosition( newPosition.x, newPosition.y );

          debugAttachDetach && debugAttachDetach( 'newdot', revisedVelocity.dot( upVector ) );
          return freeSkater;
        }
      }
      return freeSkater;
    }

    /**
     * Try to match the target energy by reducing the velocity of the skaterState.
     *
     * @param {SkaterState} skaterState
     * @param {SkaterState} targetState
     *
     * @returns {SkaterState}
     */
    correctEnergyReduceVelocity( skaterState, targetState ) {

      // Make a clone we can mutate and return, to protect the input argument
      const newSkaterState = targetState.copy();
      const e0 = skaterState.getTotalEnergy();
      const mass = skaterState.mass;

      // Find the direction of velocity.  This is on the track unless the skater just left the "slope" track
      const unit = newSkaterState.track ? newSkaterState.track.getUnitParallelVector( newSkaterState.parametricPosition ) :
                   newSkaterState.getVelocity().normalized();

      // Binary search, but bail after too many iterations
      for ( let i = 0; i < 100; i++ ) {
        const dv = ( newSkaterState.getTotalEnergy() - e0 ) / ( mass * newSkaterState.parametricSpeed );

        const newVelocity = newSkaterState.parametricSpeed - dv;

        // We can just set the state directly instead of calling update since we are keeping a protected clone of the
        // newSkaterState
        newSkaterState.parametricSpeed = newVelocity;
        const result = unit.times( newVelocity );
        newSkaterState.velocityX = result.x;
        newSkaterState.velocityY = result.y;

        if ( Util.equalsEpsilon( e0, newSkaterState.getTotalEnergy(), 1E-8 ) ) {
          break;
        }
      }
      return newSkaterState;
    }

    /**
     * Binary search to find the parametric coordinate along the track that matches the e0 energy.
     *
     * @param {SkaterState} skaterState
     * @param {number} u0
     * @param {number} u1
     * @param {number} e0
     * @param {number} numSteps
     *
     * @returns {number}
     */
    searchSplineForEnergy( skaterState, u0, u1, e0, numSteps ) {
      const da = ( u1 - u0 ) / numSteps;
      let bestAlpha = ( u1 + u0 ) / 2;
      const p = skaterState.track.getPoint( bestAlpha );
      let bestDE = skaterState.updatePosition( p.x, p.y ).getTotalEnergy();
      for ( let i = 0; i < numSteps; i++ ) {
        const proposedAlpha = u0 + da * i;
        const p2 = skaterState.track.getPoint( bestAlpha );
        const e = skaterState.updatePosition( p2.x, p2.y ).getTotalEnergy();
        if ( Math.abs( e - e0 ) <= Math.abs( bestDE ) ) {
          bestDE = e - e0;
          bestAlpha = proposedAlpha;
        }// continue to find best value closest to proposed u, even if several values give dE=0.0
      }
      debug && debug( 'After ' + numSteps + ' steps, origAlpha=' + u0 + ', bestAlpha=' + bestAlpha + ', dE=' + bestDE );
      return bestAlpha;
    }

    /**
     * A number of heuristic energy correction steps to ensure energy is conserved while keeping the motion smooth and
     * accurate. Copied from the Java version directly (with a few different magic numbers)
     *
     * @param {SkaterState} skaterState
     * @param {SkaterState} newState
     *
     * @returns {SkaterState}
     */
    correctEnergy( skaterState, newState ) {
      if ( this.trackChangePending ) {
        return newState;
      }
      const u0 = skaterState.parametricPosition;
      const e0 = skaterState.getTotalEnergy();

      if ( !isFinite( newState.getTotalEnergy() ) ) { throw new Error( 'not finite' );}
      const dE = newState.getTotalEnergy() - e0;
      if ( Math.abs( dE ) < 1E-6 ) {
        // small enough
        return newState;
      }
      else {
        if ( newState.getTotalEnergy() > e0 ) {
          debug && debug( 'Energy too high' );

          // can we reduce the velocity enough?
          // amount we could reduce the energy if we deleted all the kinetic energy:
          if ( Math.abs( newState.getKineticEnergy() ) > Math.abs( dE ) ) {

            // This is the current rule for reducing the energy.  But in a future version maybe should only do this
            // if all velocity is not converted?
            debug && debug( 'Could fix all energy by changing velocity.' );
            const correctedStateA = this.correctEnergyReduceVelocity( skaterState, newState );
            debug && debug( 'changed velocity: dE=' + ( correctedStateA.getTotalEnergy() - e0 ) );
            if ( !Util.equalsEpsilon( e0, correctedStateA.getTotalEnergy(), 1E-8 ) ) {
              debug && debug( 'Energy error[0]' );
            }
            return correctedStateA;
          }
          else {
            debug && debug( 'Not enough KE to fix with velocity alone: normal:' );
            debug && debug( 'changed position u: dE=' + ( newState.getTotalEnergy() - e0 ) );
            // search for a place between u and u0 with a better energy

            const numRecursiveSearches = 10;
            const parametricPosition = newState.parametricPosition;
            let bestAlpha = ( parametricPosition + u0 ) / 2.0;
            let da = Math.abs( ( parametricPosition - u0 ) / 2 );
            for ( let i = 0; i < numRecursiveSearches; i++ ) {
              const numSteps = 10;
              bestAlpha = this.searchSplineForEnergy( newState, bestAlpha - da, bestAlpha + da, e0, numSteps );
              da = Math.abs( ( ( bestAlpha - da ) - ( bestAlpha + da ) ) / numSteps );
            }

            const point = newState.track.getPoint( bestAlpha );
            const correctedState = newState.updateUPosition( bestAlpha, point.x, point.y );
            debug && debug( 'changed position u: dE=' + ( correctedState.getTotalEnergy() - e0 ) );
            if ( !Util.equalsEpsilon( e0, correctedState.getTotalEnergy(), 1E-8 ) ) {

              // amount we could reduce the energy if we deleted all the kinetic energy:
              if ( Math.abs( correctedState.getKineticEnergy() ) > Math.abs( dE ) ) {

                // TODO: maybe should only do this if all velocity is not converted
                debug && debug( 'Fixed position some, still need to fix velocity as well.' );
                const correctedState2 = this.correctEnergyReduceVelocity( skaterState, correctedState );
                if ( !Util.equalsEpsilon( e0, correctedState2.getTotalEnergy(), 1E-8 ) ) {
                  debug && debug( 'Changed position & Velocity and still had energy error' );
                  debug && debug( 'Energy error[123]' );
                }
                return correctedState2;
              }
              else {

                // This error seems to occur with friction turned on at the top of a hill, see https://github.com/phetsims/energy-skate-park-basics/issues/127
                debug && debug( 'Changed position, wanted to change velocity, but didn\'t have enough to fix it..., dE=' + ( newState.getTotalEnergy() - e0 ) );
                if ( newState.thermalEnergy > skaterState.thermalEnergy ) {
                  const increasedThermalEnergy = newState.thermalEnergy - skaterState.thermalEnergy;
                  if ( increasedThermalEnergy > dE ) {
                    const reducedThermalEnergyState = newState.update( { thermalEnergy: newState.thermalEnergy - dE } );
                    assert && assert( Math.abs( reducedThermalEnergyState.getTotalEnergy() - e0 ) < 1E-6, 'energy should be corrected' );
                    debug && debug( 'Corrected energy by reducing thermal overestimate' + dE );
                    return reducedThermalEnergyState;
                  }
                  else {

                    // Take as much thermal energy out as possible
                    const originalThermalEnergyState = newState.update( { thermalEnergy: skaterState.thermalEnergy } );
                    const correctedState3 = this.correctEnergyReduceVelocity( skaterState, originalThermalEnergyState );
                    if ( !Util.equalsEpsilon( e0, correctedState3.getTotalEnergy(), 1E-8 ) ) {
                      debug && debug( 'Changed position & Velocity and still had energy error, error[124]' );
                    }
                    return correctedState3;
                  }
                }
                return correctedState;
              }
            }
            return correctedState;
          }
        }
        else {
          if ( !isFinite( newState.getTotalEnergy() ) ) { throw new Error( 'not finite' );}
          debug && debug( 'Energy too low' );
          assert && assert( newState.track, 'newState must be still have a track for this energy correction' );

          // increasing the kinetic energy
          // Choose the exact velocity in the same direction as current velocity to ensure total energy conserved.
          const vSq = Math.abs( 2 / newState.mass * ( e0 - newState.getPotentialEnergy() - newState.thermalEnergy ) );
          const v = Math.sqrt( vSq );

          // TODO: What if parametricSpeed ===0?
          const newVelocity = v * ( newState.parametricSpeed > 0 ? +1 : -1 );
          const unitParallelVector = newState.track.getUnitParallelVector( newState.parametricPosition );
          const updatedVelocityX = unitParallelVector.x * newVelocity;
          const updatedVelocityY = unitParallelVector.y * newVelocity;
          const fixedState = newState.updateUDVelocity( newVelocity, updatedVelocityX, updatedVelocityY );
          debug && debug( 'Set velocity to match energy, when energy was low: ' );
          debug && debug( 'INC changed velocity: dE=' + ( fixedState.getTotalEnergy() - e0 ) );
          if ( !Util.equalsEpsilon( e0, fixedState.getTotalEnergy(), 1E-8 ) ) {
            new Error( 'Energy error[2]' ).printStackTrace();
          }
          return fixedState;
        }
      }
    }

    // PERFORMANCE/ALLOCATION
    getCurvatureDirection( curvature, x2, y2 ) {
      const v = new Vector2( curvature.x - x2, curvature.y - y2 );
      return v.x !== 0 || v.y !== 0 ? v.normalized() : v;
    }

    getCurvatureDirectionX( curvature, x2, y2 ) {
      const vx = curvature.x - x2;
      const vy = curvature.y - y2;
      return vx !== 0 || vy !== 0 ? vx / Math.sqrt( vx * vx + vy * vy ) : vx;
    }

    getCurvatureDirectionY( curvature, x2, y2 ) {
      const vx = curvature.x - x2;
      const vy = curvature.y - y2;
      return vx !== 0 || vy !== 0 ? vy / Math.sqrt( vx * vx + vy * vy ) : vy;
    }

    /**
     * Update the skater based on which state.
     *
     * @param {number} dt
     * @param {SkaterState}
     * @returns {SkaterState}
     */
    stepModel( dt, skaterState ) {
      return skaterState.dragging ? skaterState : // User is dragging the skater, nothing to update here
             !skaterState.track && skaterState.positionY <= 0 ? this.stepGround( dt, skaterState ) :
             !skaterState.track && skaterState.positionY > 0 ? this.stepFreeFall( dt, skaterState, false ) :
             skaterState.track ? this.stepTrack( dt, skaterState ) :
             skaterState;
    }

    /**
     * Return to the place he was last released by the user. Also restores the track the skater was on so the initial
     * conditions are the same as the previous release.
     *
     * @returns {SkaterState}
     */
    returnSkater() {

      // if the skater's original track is available, restore her to it, see #143
      const originalTrackAvailable = _.includes( this.getPhysicalTracks(), this.skater.startingTrackProperty.value );
      if ( originalTrackAvailable ) {
        this.skater.trackProperty.value = this.skater.startingTrackProperty.value;
      }
      this.skater.returnSkater();
    }

    // Clear the thermal energy from the model
    clearThermal() { this.skater.clearThermal(); }

    // Get all of the tracks marked as physical (i.e. that the skater could interact with).
    getPhysicalTracks() {

      // Use vanilla instead of lodash for speed since this is in an inner loop
      const physicalTracks = [];
      for ( let i = 0; i < this.tracks.length; i++ ) {
        const track = this.tracks.get( i );

        if ( track.physicalProperty.value ) {
          physicalTracks.push( track );
        }
      }
      return physicalTracks;
    }

    /**
     * Get all tracks that the skater cannot interact with.
     *
     * @returns {[].Track}
     */
    getNonPhysicalTracks() {

      // Use vanilla instead of lodash for speed since this is in an inner loop
      const nonphysicalTracks = [];
      for ( let i = 0; i < this.tracks.length; i++ ) {
        const track = this.tracks.get( i );

        if ( !track.physicalProperty.value ) {
          nonphysicalTracks.push( track );
        }
      }
      return nonphysicalTracks;
    }

    /**
     * Find whatever track is connected to the specified track and join them together to a new track.
     *
     * @param {Track} track
     */
    joinTracks( track ) {
      const connectedPoint = track.getSnapTarget();
      for ( let i = 0; i < this.getPhysicalTracks().length; i++ ) {
        var otherTrack = this.getPhysicalTracks()[ i ];
        if ( otherTrack.containsControlPoint( connectedPoint ) ) {
          this.joinTrackToTrack( track, otherTrack );
          break;
        }
      }

      assert && assert( track.attachable, 'trying to join tracks, but track is not attachable' );
      assert && assert( otherTrack.attachable, 'trying to join tracks, but other track is not attachable' );

      // if the number of control points is low enough, replenish the toolbox
      if ( this.getNumberOfControlPoints() <= MAX_NUMBER_CONTROL_POINTS - 3 ) {
        this.addDraggableTrack();
      }
    }

    /**
     * The user has pressed the "delete" button for the specified track's specified control point, and it should be
     * deleted. It should be an inner point of a track (not an end point). If there were only 2 points on the track,
     * just delete the entire track.
     *
     * @param {Track} track
     * @param {number} controlPointIndex [description]
     */
    deleteControlPoint( track, controlPointIndex ) {

      track.removeEmitter.emit();
      this.tracks.remove( track );
      const trackGroupTandem = this.trackGroupTandem;

      if ( track.controlPoints.length > 2 ) {
        const controlPointToDelete = track.controlPoints[ controlPointIndex ];
        const points = _.without( track.controlPoints, controlPointToDelete );
        controlPointToDelete.dispose();
        const newTrack = new Track( this, this.tracks, points, track.getParentsOrSelf(), this.availableModelBoundsProperty, merge( {
          tandem: trackGroupTandem.createNextTandem()
        }, Track.FULLY_INTERACTIVE_OPTIONS ) );
        newTrack.physicalProperty.value = true;
        newTrack.droppedProperty.value = true;

        // smooth out the new track, see #177
        const smoothingPoint = controlPointIndex >= newTrack.controlPoints.length ? newTrack.controlPoints.length - 1 : controlPointIndex;
        newTrack.smooth( smoothingPoint );

        // Make sure the new track doesn't go underground after a control point is deleted, see #174
        newTrack.bumpAboveGround();

        this.tracks.add( newTrack );
      }
      else {

        // the entire track is deleted, so we must dispose the other control points
        for ( let i = 0; i < track.controlPoints.length; i++ ) {
          const controlPoint = track.controlPoints[ i ];
          controlPoint.dispose();
        }
      }

      // Trigger track changed first to update the edit enabled properties
      this.trackChangedEmitter.emit();

      // If the skater was on track, then he should fall off
      if ( this.skater.trackProperty.value === track ) {
        this.skater.trackProperty.value = null;
      }

      // if the number of control points is low enough, replenish the toolbox
      if ( this.getNumberOfControlPoints() <= MAX_NUMBER_CONTROL_POINTS - 3 ) {
        this.addDraggableTrack();
      }
    }

    /**
     * The user has pressed the "delete" button for the specified track's specified control point, and it should be
     * deleted. It should be an inner point of a track (not an endpoint).
     *
     * @param {Track} track
     * @param {number} controlPointIndex - integer
     * @param {number} modelAngle
     */
    splitControlPoint( track, controlPointIndex, modelAngle ) {
      assert && assert( track.splittable, 'trying to split a track that is not splittable!' );
      const controlPointToSplit = track.controlPoints[ controlPointIndex ];

      const trackGroupTandem = this.trackGroupTandem;

      const vector = Vector2.createPolar( 0.5, modelAngle );
      const newPoint1 = new ControlPoint(
        track.controlPoints[ controlPointIndex ].sourcePositionProperty.value.x - vector.x,
        track.controlPoints[ controlPointIndex ].sourcePositionProperty.value.y - vector.y,
        { tandem: this.controlPointGroupTandem.createNextTandem() }
      );
      const newPoint2 = new ControlPoint(
        track.controlPoints[ controlPointIndex ].sourcePositionProperty.value.x + vector.x,
        track.controlPoints[ controlPointIndex ].sourcePositionProperty.value.y + vector.y,
        { tandem: this.controlPointGroupTandem.createNextTandem() }
      );

      const points1 = track.controlPoints.slice( 0, controlPointIndex );
      const points2 = track.controlPoints.slice( controlPointIndex + 1, track.controlPoints.length );

      points1.push( newPoint1 );
      points2.unshift( newPoint2 );

      const newTrack1 = new Track( this, this.tracks, points1, track.getParentsOrSelf(), this.availableModelBoundsProperty, merge( {
        tandem: trackGroupTandem.createNextTandem()
      }, Track.FULLY_INTERACTIVE_OPTIONS ) );
      newTrack1.physicalProperty.value = true;
      newTrack1.droppedProperty.value = true;
      const newTrack2 = new Track( this, this.tracks, points2, track.getParentsOrSelf(), this.availableModelBoundsProperty, merge( {
        tandem: trackGroupTandem.createNextTandem()
      }, Track.FULLY_INTERACTIVE_OPTIONS ) );
      newTrack2.physicalProperty.value = true;
      newTrack2.droppedProperty.value = true;

      track.removeEmitter.emit();
      this.tracks.remove( track );
      this.tracks.add( newTrack1 );
      this.tracks.add( newTrack2 );

      // Smooth the new tracks, see #177
      newTrack1.smooth( controlPointIndex - 1 );
      newTrack2.smooth( 0 );

      // Trigger track changed first to update the edit enabled properties
      this.trackChangedEmitter.emit();

      // If the skater was on track, then he should fall off, see #97
      if ( this.skater.trackProperty.value === track ) {
        this.skater.trackProperty.value = null;
      }

      // If a control point was split and that makes too many "live" control points total, remove a piece of track from
      // the toolbox to keep the total number of control points low enough.
      if ( this.getNumberOfControlPoints() > MAX_NUMBER_CONTROL_POINTS ) {
        // find a nonphysical track, then remove it

        const trackToRemove = this.getNonPhysicalTracks()[ 0 ];
        trackToRemove.removeEmitter.emit();
        this.tracks.remove( trackToRemove );
        trackToRemove.disposeControlPoints();
      }

      // Dispose the control point itself
      controlPointToSplit.dispose();
    }

    /**
     * Join the specified tracks together into a single new track and delete the old tracks.
     *
     * @param a {Track}
     * @param b {Track}
     */
    joinTrackToTrack( a, b ) {
      const points = [];
      let i;
      const controlPointGroupTandem = this.controlPointGroupTandem;
      const trackGroupTandem = this.trackGroupTandem;

      const firstTrackForward = () => {
        for ( i = 0; i < a.controlPoints.length; i++ ) {
          points.push( a.controlPoints[ i ].copy( controlPointGroupTandem.createNextTandem() ) );
        }
      };
      const firstTrackBackward = () => {
        for ( i = a.controlPoints.length - 1; i >= 0; i-- ) {
          points.push( a.controlPoints[ i ].copy( controlPointGroupTandem.createNextTandem() ) );
        }
      };
      const secondTrackForward = () => {
        for ( i = 1; i < b.controlPoints.length; i++ ) {
          points.push( b.controlPoints[ i ].copy( controlPointGroupTandem.createNextTandem() ) );
        }
      };
      const secondTrackBackward = () => {
        for ( i = b.controlPoints.length - 2; i >= 0; i-- ) {
          points.push( b.controlPoints[ i ].copy( controlPointGroupTandem.createNextTandem() ) );
        }
      };

      // Only include one copy of the snapped point
      // Forward Forward
      if ( a.controlPoints[ a.controlPoints.length - 1 ].snapTargetProperty.value === b.controlPoints[ 0 ] ) {
        firstTrackForward();
        secondTrackForward();
      }

      // Forward Backward
      else if ( a.controlPoints[ a.controlPoints.length - 1 ].snapTargetProperty.value === b.controlPoints[ b.controlPoints.length - 1 ] ) {
        firstTrackForward();
        secondTrackBackward();
      }

      // Backward Forward
      else if ( a.controlPoints[ 0 ].snapTargetProperty.value === b.controlPoints[ 0 ] ) {
        firstTrackBackward();
        secondTrackForward();
      }

      // Backward backward
      else if ( a.controlPoints[ 0 ].snapTargetProperty.value === b.controlPoints[ b.controlPoints.length - 1 ] ) {
        firstTrackBackward();
        secondTrackBackward();
      }

      const newTrack = new Track( this, this.tracks, points, a.getParentsOrSelf().concat( b.getParentsOrSelf() ), this.availableModelBoundsProperty, merge( {
        tandem: trackGroupTandem.createNextTandem()
      }, Track.FULLY_INTERACTIVE_OPTIONS ) );
      newTrack.physicalProperty.value = true;
      newTrack.droppedProperty.value = true;

      a.disposeControlPoints();
      a.removeEmitter.emit();
      this.tracks.remove( a );

      b.disposeControlPoints();
      b.removeEmitter.emit();
      this.tracks.remove( b );

      // When tracks are joined, bump the new track above ground so the y value (and potential energy) cannot go negative,
      // and so it won't make the "return skater" button get bigger, see #158
      newTrack.bumpAboveGround();
      this.tracks.add( newTrack );

      // Move skater to new track if he was on the old track, by searching for the best fit point on the new track
      // Note: Energy is not conserved when tracks joined since the user has added or removed energy from the system
      if ( this.skater.trackProperty.value === a || this.skater.trackProperty.value === b ) {

        const originalDirectionVector = this.skater.trackProperty.value.getUnitParallelVector( this.skater.parametricPositionProperty.value ).times( this.skater.parametricSpeedProperty.value );

        // Keep track of the skater direction so we can toggle the 'up' flag if the track orientation changed
        const originalNormal = this.skater.upVector;
        const p = newTrack.getClosestPositionAndParameter( this.skater.positionProperty.value.copy() );
        this.skater.trackProperty.value = newTrack;
        this.skater.parametricPositionProperty.value = p.parametricPosition;
        const x2 = newTrack.getX( p.parametricPosition );
        const y2 = newTrack.getY( p.parametricPosition );
        this.skater.positionProperty.value = new Vector2( x2, y2 );
        this.skater.angleProperty.value = newTrack.getViewAngleAt( p.parametricPosition ) + ( this.skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );

        // Trigger an initial update now so we can get the right up vector, see #150
        this.skater.updatedEmitter.emit();
        const newNormal = this.skater.upVector;

        // If the skater flipped upside down because the track directionality is different, toggle his 'up' flag
        if ( originalNormal.dot( newNormal ) < 0 ) {
          this.skater.onTopSideOfTrackProperty.value = !this.skater.onTopSideOfTrackProperty.value;
          this.skater.angleProperty.value = newTrack.getViewAngleAt( p.parametricPosition ) + ( this.skater.onTopSideOfTrackProperty.value ? 0 : Math.PI );
          this.skater.updatedEmitter.emit();
        }

        // If the skater changed direction of motion because of the track polarity change, flip the parametric velocity
        // 'parametricSpeed' value, see #180
        const newDirectionVector = this.skater.trackProperty.value.getUnitParallelVector( this.skater.parametricPositionProperty.value ).times( this.skater.parametricSpeedProperty.value );
        debugAttachDetach && debugAttachDetach( newDirectionVector.dot( originalDirectionVector ) );
        if ( newDirectionVector.dot( originalDirectionVector ) < 0 ) {
          this.skater.parametricSpeedProperty.value = -this.skater.parametricSpeedProperty.value;
        }
      }

      // When joining tracks, smooth out the new track, but without moving the point that joined the tracks, see #177 #238
      newTrack.smoothPointOfHighestCurvature( [] );
    }

    /**
     * When a track is dragged or a control point is moved, update the skater's energy (if the sim was paused), since
     * it wouldn't be handled in the update loop.
     *
     * @param {Track} track
     */
    trackModified( track ) {
      if ( this.pausedProperty.value && this.skater.trackProperty.value === track ) {
        this.skater.updateEnergy();
      }

      // Flag the track as having changed *this frame* so energy doesn't need to be conserved during this frame, see #127
      this.trackChangePending = true;

      // emit a message indicating that the track has changed in some way
      this.trackChangedEmitter.emit();
    }

    // Get the number of physical control points (i.e. control points outside of the toolbox)
    getNumberOfPhysicalControlPoints() {
      const numberOfPointsInEachTrack = _.map( this.getPhysicalTracks(), track => {return track.controlPoints.length;} );
      return _.reduce( numberOfPointsInEachTrack, ( memo, num ) => { memo + num; }, 0 );
    }

    // Get the number of all control points for this model's tracks
    getNumberOfControlPoints() {
      const numberOfPointsInEachTrack = _.map( this.tracks.getArray(), track => {return track.controlPoints.length;} );
      return _.reduce( numberOfPointsInEachTrack, ( memo, num ) => { memo + num; }, 0 );
    }

    // Logic to determine whether a control point can be added by cutting a track's control point in two
    // This is feasible if the number of control points in the play area (above y>0) is less than the maximum
    canCutTrackControlPoint() {
      return this.getNumberOfPhysicalControlPoints() < MAX_NUMBER_CONTROL_POINTS;
    }

    // Check whether the model contains a track so that input listeners for detached elements can't create bugs, see #230
    containsTrack( track ) {
      return this.tracks.contains( track );
    }

    /**
     * Called by phet-io to clear out the model state before restoring child tracks.
     * @public (phet-io)
     */
    removeAllTracks() {

      // TODO: should we leverage this.draggableTracks and only save the truly dynamic tracks?
      while ( this.tracks.length > 0 ) {
        const track = this.tracks.get( 0 );
        track.disposeControlPoints();
        this.tracks.remove( track );
      }
    }

    /**
     * Add a track, called by phet-io in setState (to restore a state).
     * TODO: this code should be called by EnergySkateParkModel too.
     * @param {Tandem} tandem
     * @param controlPointTandemIDs
     */
    addTrack( tandem, draggable, configurable, controlPointTandemIDs ) {

      assert && assert( controlPointTandemIDs, 'controlPointTandemIDs should exist' );
      const controlPoints = controlPointTandemIDs.map( ( id, index ) => {
        return new ControlPoint( index, 0, { tandem: Tandem.createFromPhetioID( id ) } ); // TODO: create with correct initial x & y values.
      } );
      const newTrack = new Track( this, this.tracks, controlPoints, [], this.availableModelBoundsProperty, {
        draggable: draggable,
        configurable: configurable,
        tandem: tandem
      } );
      this.tracks.add( newTrack );
      return newTrack;
    }
  }

  /**
   * Helper function to determine if a point is horizontally contained within the bounds range, and anywhere
   * below the maximum Y value. Visually, this will be above since y is inverted.
   *
   * @param {Bounds2} bounds
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  const containsAbove = ( bounds, x, y ) => {
    return bounds.minX <= x && x <= bounds.maxX && y <= bounds.maxY;
  };

  return energySkatePark.register( 'EnergySkateParkModel', EnergySkateParkModel );
} );
