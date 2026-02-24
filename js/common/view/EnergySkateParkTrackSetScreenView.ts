// Copyright 2019-2026, University of Colorado Boulder

/**
 * View where you can play with premade tracks which may be configurable, but are not draggable,
 * splittable, or attachable. Premade tracks can be chosen from a set of scenes.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkTrackSetModel from '../model/EnergySkateParkTrackSetModel.js';
import { TrackType } from '../model/PremadeTracks.js';
import EnergySkateParkSaveSampleScreenView, { EnergySkateParkSaveSampleScreenViewOptions } from './EnergySkateParkSaveSampleScreenView.js';

// Map from TrackType to the corresponding radio button accessible name StringProperty
const trackTypeToNameProperty: Record<TrackType, TReadOnlyProperty<string>> = {
  PARABOLA: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty,
  RAMP: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty,
  DOUBLE_WELL: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty,
  LOOP: EnergySkateParkFluent.a11y.sceneSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty
};

export default class EnergySkateParkTrackSetScreenView extends EnergySkateParkSaveSampleScreenView {

  public constructor( model: EnergySkateParkTrackSetModel, tandem: Tandem, options?: EnergySkateParkSaveSampleScreenViewOptions ) {
    super( model, tandem, options );

    const trackNodes = model.tracks.map( track => {
      return this.trackNodeGroup.createNextElement( track, this.modelViewTransform, this.availableModelBoundsProperty );
    } );

    trackNodes.forEach( trackNode => {
      this.trackLayer.addChild( trackNode );
    } );

    // Set a stable pdomOrder so that moveToFront() during drag doesn't disrupt PDOM reading order.
    this.trackLayer.pdomOrder = trackNodes;

    model.sceneProperty.link( scene => {
      _.forEach( model.tracks, ( track, i ) => {
        trackNodes[ i ].visible = scene === i;
      } );

      // interrupt the DragHandler when scene Property changes since Skater needs to reset to initial position when
      // track changes, see https://github.com/phetsims/energy-skate-park-basics/issues/179
      this.skaterNode.interruptDrag();
    } );

    // Derive the track shape name from the scene index
    const trackShapeNameProperty = new DerivedProperty(
      [ model.sceneProperty ],
      sceneIndex => trackTypeToNameProperty[ model.trackTypes[ sceneIndex ] ].value
    );

    // Dynamic paragraph describing the current track shape and skater status
    const paragraphProperty = new DerivedProperty(
      [
        model.sceneProperty,
        trackShapeNameProperty,
        model.skater.trackProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOnTrackStringProperty,
        EnergySkateParkFluent.a11y.yourSkatePark.skaterOffTrackStringProperty
      ],
      ( sceneIndex, trackShapeName, skaterTrack, onTrackString, offTrackString ) => {
        const track = model.tracks.get( sceneIndex );
        const visibleControlPointCount = track.controlPoints.filter( cp => cp.visible ).length;

        // Choose fixed vs adjustable phrase
        let trackPhrase: string;
        if ( model.tracksConfigurable ) {
          trackPhrase = EnergySkateParkFluent.a11y.yourSkatePark.trackPhraseAdjustable.format( {
            trackShape: trackShapeName,
            numberControlPoints: visibleControlPointCount
          } );
        }
        else {
          trackPhrase = EnergySkateParkFluent.a11y.yourSkatePark.trackPhraseFixed.format( {
            trackShape: trackShapeName
          } );
        }

        // Skater on/off track
        const skaterPhrase = skaterTrack !== null ? onTrackString : offTrackString;

        return EnergySkateParkFluent.a11y.yourSkatePark.trackAndSkaterParagraph.format( {
          trackPhrase: trackPhrase,
          skaterPhrase: skaterPhrase
        } );
      }
    );

    this.yourSkateParkHeadingNode.accessibleParagraph = paragraphProperty;
  }
}

energySkatePark.register( 'EnergySkateParkTrackSetScreenView', EnergySkateParkTrackSetScreenView );