// Copyright 2018-2026, University of Colorado Boulder

/**
 * Checkboxes that control visibility of items in energy-skate-park, including the pie chart, bar graph, grid,
 * speedometer, and reference height control. Uses VerticalCheckboxGroup with stretch so that checkbox icons
 * align dynamically even when text labels change size at runtime (e.g. from i18n).
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import PressListener from '../../../../scenery/js/listeners/PressListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import energySkatePark from '../../energySkatePark.js';
import EnergySkateParkFluent from '../../EnergySkateParkFluent.js';
import EnergySkateParkConstants from '../EnergySkateParkConstants.js';
import EnergySkateParkModel from '../model/EnergySkateParkModel.js';
import EnergySkateParkSaveSampleModel from '../model/EnergySkateParkSaveSampleModel.js';
import EnergySkateParkCheckboxItem from './EnergySkateParkCheckboxItem.js';

const controlsPathStringProperty = EnergySkateParkFluent.visibilityControls.pathStringProperty;
const controlsReferenceHeightStringProperty = EnergySkateParkFluent.visibilityControls.referenceHeightStringProperty;
const controlsShowGridStringProperty = EnergySkateParkFluent.visibilityControls.gridStringProperty;
const controlsStickToTrackStringProperty = EnergySkateParkFluent.trackControls.stickToTrackStringProperty;
const pieChartStringProperty = EnergySkateParkFluent.plots.pieChart.labelStringProperty;
const propertiesSpeedStringProperty = EnergySkateParkFluent.visibilityControls.speedStringProperty;

const CHECKBOX_SPACING = 6; // spacing between checkbox box and its icon content

type SelfOptions = {
  // whether Checkboxes for these Properties are included in the controls
  showPieChartCheckbox?: boolean;
  showGridCheckbox?: boolean;
  showSpeedCheckbox?: boolean;
  showReferenceHeightCheckbox?: boolean;
  showSkaterPathCheckbox?: boolean;
  showStickToTrackCheckbox?: boolean;
};

export type EnergySkateParkVisibilityControlsOptions = SelfOptions & VerticalCheckboxGroupOptions;

/**
 * Creates the content node for a single checkbox: an HBox with the text label (which grows to fill
 * available width) and an icon (in an AlignGroup box so all icons share the same width).
 */
function createCheckboxContent( labelStringProperty: TReadOnlyProperty<string>, iconNode: Node, iconAlignGroup: AlignGroup ): HBox {
  const text = new Text( labelStringProperty, {
    font: EnergySkateParkConstants.CHECKBOX_LABEL_FONT,
    maxWidth: 117,
    layoutOptions: { grow: 1 }
  } );
  const iconBox = iconAlignGroup.createBox( iconNode, { xAlign: 'center' } );
  return new HBox( {
    children: [ text, iconBox ],
    spacing: 10
  } );
}

export default class EnergySkateParkVisibilityControls extends VerticalCheckboxGroup {

  public constructor( model: EnergySkateParkModel, tandem: Tandem, providedOptions?: EnergySkateParkVisibilityControlsOptions ) {
    const options = optionize<EnergySkateParkVisibilityControlsOptions, SelfOptions, VerticalCheckboxGroupOptions>()( {
      showPieChartCheckbox: true,
      showGridCheckbox: false,
      showSpeedCheckbox: true,
      showReferenceHeightCheckbox: false,
      showSkaterPathCheckbox: false,
      showStickToTrackCheckbox: false,

      // VerticalCheckboxGroup options
      spacing: 5,
      checkboxOptions: {
        boxWidth: EnergySkateParkConstants.CHECKBOX_WIDTH,
        spacing: CHECKBOX_SPACING
      },
      tandem: tandem
    }, providedOptions );

    const iconAlignGroup = new AlignGroup();
    const items: VerticalCheckboxGroupItem[] = [];

    if ( options.showPieChartCheckbox ) {
      items.push( {
        property: model.pieChartVisibleProperty,
        createNode: () => createCheckboxContent( pieChartStringProperty, EnergySkateParkCheckboxItem.createPieChartIcon( Tandem.OPT_OUT ), iconAlignGroup ),
        tandemName: 'pieChartCheckbox',
        options: {
          accessibleHelpText: EnergySkateParkFluent.a11y.pieChartCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.pieChartCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.pieChartCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( options.showGridCheckbox ) {
      items.push( {
        property: model.gridVisibleProperty,
        createNode: () => createCheckboxContent( controlsShowGridStringProperty, EnergySkateParkCheckboxItem.createGridIcon( Tandem.OPT_OUT ), iconAlignGroup ),
        tandemName: 'gridCheckbox',
        options: {
          accessibleHelpText: EnergySkateParkFluent.a11y.gridCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( options.showSpeedCheckbox ) {
      items.push( {
        property: model.speedometerVisibleProperty,
        createNode: () => createCheckboxContent( propertiesSpeedStringProperty, EnergySkateParkCheckboxItem.createSpeedometerIcon( Tandem.OPT_OUT ), iconAlignGroup ),
        tandemName: 'speedCheckbox',
        options: {
          accessibleHelpText: EnergySkateParkFluent.a11y.speedCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.speedCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( options.showSkaterPathCheckbox ) {
      affirm( model instanceof EnergySkateParkSaveSampleModel, 'Skater path checkbox requires EnergySkateParkSaveSampleModel' );
      items.push( {
        property: ( model ).saveSamplesProperty,
        createNode: () => createCheckboxContent( controlsPathStringProperty, EnergySkateParkCheckboxItem.createSamplesIcon( Tandem.OPT_OUT ), iconAlignGroup ),
        tandemName: 'pathCheckbox',
        options: {
          accessibleHelpText: EnergySkateParkFluent.a11y.pathCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.pathCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.pathCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( options.showReferenceHeightCheckbox ) {
      items.push( {
        property: model.referenceHeightVisibleProperty,
        createNode: () => createCheckboxContent( controlsReferenceHeightStringProperty, EnergySkateParkCheckboxItem.createReferenceHeightIcon(), iconAlignGroup ),
        tandemName: 'referenceHeightCheckbox',
        options: {
          accessibleHelpText: EnergySkateParkFluent.a11y.referenceHeightCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.referenceHeightCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.referenceHeightCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    if ( options.showStickToTrackCheckbox ) {

      items.push( {
        property: model.stickingToTrackProperty,
        createNode: () => createCheckboxContent( controlsStickToTrackStringProperty, EnergySkateParkCheckboxItem.createStickingToTrackIcon(), iconAlignGroup ),
        tandemName: 'stickingCheckbox',
        options: {
          accessibleContextResponseChecked: EnergySkateParkFluent.a11y.stickToTrackCheckbox.accessibleContextResponseCheckedStringProperty,
          accessibleContextResponseUnchecked: EnergySkateParkFluent.a11y.stickToTrackCheckbox.accessibleContextResponseUncheckedStringProperty
        }
      } );
    }

    super( items, options );

    this.children.forEach( child => {
      if ( child instanceof Checkbox && child.property === model.stickingToTrackProperty ) {

        const userControlledProperty = model.userControlledPropertySet.stickingToTrackControlledProperty;
        child.addInputListener( new PressListener( {
          press: () => userControlledProperty.set( true ),
          release: () => userControlledProperty.set( false )
        } ) );
      }
    } );
  }
}

energySkatePark.register( 'EnergySkateParkVisibilityControls', EnergySkateParkVisibilityControls );
