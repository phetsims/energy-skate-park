// Copyright 2022, University of Colorado Boulder

/**
 * The node that is shown in the Preferences dialog of Energy Skate Park to control simulation
 * specific settings.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import PreferencesDialog from '../../../../joist/js/preferences/PreferencesDialog.js';
import PreferencesToggleSwitch from '../../../../joist/js/preferences/PreferencesToggleSwitch.js';
import merge from '../../../../phet-core/js/merge.js';
import { Image, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import Carousel from '../../../../sun/js/Carousel.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkPreferencesModel from '../model/EnergySkateParkPreferencesModel.js';
import SkaterImages from './SkaterImages.js';

class EnergySkateParkPreferencesNode extends VBox {

  /**
   * @param {EnergySkateParkPreferencesModel} preferencesModel
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( preferencesModel, tandem, options ) {

    options = merge( {

      // Include a toggle switch that controls display of acceleration units?
      includeAccelerationUnitsControl: true
    }, options );

    const metersPerSecondSquaredLabel = new RichText( 'm/s<sup>2</sup>', {
      font: EnergySkateParkConstants.CONTROL_LABEL_FONT
    } );

    const newtonsPerKilogramLabel = new Text( 'N/kg', {
      font: EnergySkateParkConstants.CONTROL_LABEL_FONT
    } );

    const accelerationUnitsSwitch = new PreferencesToggleSwitch(
      preferencesModel.accelerationUnitsProperty,
      EnergySkateParkPreferencesModel.AccelerationUnits.METERS_PER_SECOND_SQUARED,
      EnergySkateParkPreferencesModel.AccelerationUnits.NEWTONS_PER_KILOGRAM,
      {
        labelNode: new Text( 'Acceleration Units', { font: PreferencesDialog.CONTENT_FONT } ),
        labelSpacing: 20,
        leftValueLabel: metersPerSecondSquaredLabel,
        rightValueLabel: newtonsPerKilogramLabel
      }
    );

    // Create carousel icons from skater headshot images
    const carouselNodes = SkaterImages.SkaterCharacterSets.map( characterSet => {
      const headshotImages = [];
      characterSet.imageSets.forEach( imageSet => {
        headshotImages.push( new CarouselIconNode( imageSet.headshotImage ) );
      } );

      return headshotImages;
    } ).flat();

    const skaterImageSetCarousel = new Carousel( carouselNodes, {
      itemsPerPage: SkaterImages.IMAGES_PER_SET,

      // Constructed in Preferences (before sim is ready) and animation requires a phet.joist.sim
      // in Carousel implementation
      animationEnabled: false
    } );

    skaterImageSetCarousel.pageNumberProperty.link( pageNumber => {
      preferencesModel.skaterCharacterSetProperty.value = pageNumber === 0 ? SkaterImages.CHARACTER_SET_1 :
                                                          SkaterImages.CHARACTER_SET_2;
    } );

    super( {
      children: options.includeAccelerationUnitsControl ? [ accelerationUnitsSwitch, skaterImageSetCarousel ] : [ skaterImageSetCarousel ],
      spacing: 10,
      align: 'left'
    } );
  }
}

/**
 * Inner class for an Image of a skater headshot with options to make it look nice in a Carousel.
 */
class CarouselIconNode extends Image {
  constructor( image ) {
    super( image, {
      scale: 0.5
    } );
  }
}

energySkatePark.register( 'EnergySkateParkPreferencesNode', EnergySkateParkPreferencesNode );
export default EnergySkateParkPreferencesNode;
