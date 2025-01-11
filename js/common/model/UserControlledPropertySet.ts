// Copyright 2020-2024, University of Colorado Boulder

/**
 * A collection of Properties that indicate the User is modifying a physical Property that will change
 * the system in Energy Skate Park.
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import energySkatePark from '../../energySkatePark.js';

export default class UserControlledPropertySet {

  // public so that various controls set these to `true` upon user input
  public readonly frictionControlledProperty: BooleanProperty;
  public readonly gravityControlledProperty: BooleanProperty;
  public readonly massControlledProperty: BooleanProperty;
  public readonly referenceHeightControlledProperty: BooleanProperty;
  public readonly trackControlledProperty: BooleanProperty;
  public readonly skaterControlledProperty: BooleanProperty;
  public readonly stickingToTrackControlledProperty: BooleanProperty;

  // collection of the Properties above, so they can conveniently be used in a multilink
  public readonly properties: BooleanProperty[];

  public constructor() {
    this.frictionControlledProperty = new BooleanProperty( false );
    this.gravityControlledProperty = new BooleanProperty( false );
    this.massControlledProperty = new BooleanProperty( false );
    this.referenceHeightControlledProperty = new BooleanProperty( false );
    this.trackControlledProperty = new BooleanProperty( false );
    this.skaterControlledProperty = new BooleanProperty( false );
    this.stickingToTrackControlledProperty = new BooleanProperty( false );

    this.properties = [
      this.frictionControlledProperty,
      this.gravityControlledProperty,
      this.massControlledProperty,
      this.referenceHeightControlledProperty,
      this.trackControlledProperty,
      this.skaterControlledProperty,
      this.stickingToTrackControlledProperty
    ];
  }
}

energySkatePark.register( 'UserControlledPropertySet', UserControlledPropertySet );