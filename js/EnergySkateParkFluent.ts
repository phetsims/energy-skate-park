// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from energy-skate-park-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import energySkatePark from './energySkatePark.js';
import EnergySkateParkStrings from './EnergySkateParkStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( EnergySkateParkStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'energy_skate_park_title', 'energy-skate-park.titleStringProperty' );
addToMapIfDefined( 'screens_intro', 'screens.introStringProperty' );
addToMapIfDefined( 'screens_graphs', 'screens.graphsStringProperty' );
addToMapIfDefined( 'screens_playground', 'screens.playgroundStringProperty' );
addToMapIfDefined( 'screens_measure', 'screens.measureStringProperty' );
addToMapIfDefined( 'physicalControls_gravityControls_gravity', 'physicalControls.gravityControls.gravityStringProperty' );
addToMapIfDefined( 'physicalControls_gravityControls_earth', 'physicalControls.gravityControls.earthStringProperty' );
addToMapIfDefined( 'physicalControls_gravityControls_jupiter', 'physicalControls.gravityControls.jupiterStringProperty' );
addToMapIfDefined( 'physicalControls_gravityControls_moon', 'physicalControls.gravityControls.moonStringProperty' );
addToMapIfDefined( 'physicalControls_massControls_mass', 'physicalControls.massControls.massStringProperty' );
addToMapIfDefined( 'physicalControls_friction', 'physicalControls.frictionStringProperty' );
addToMapIfDefined( 'physicalControls_custom', 'physicalControls.customStringProperty' );
addToMapIfDefined( 'physicalControls_small', 'physicalControls.smallStringProperty' );
addToMapIfDefined( 'physicalControls_large', 'physicalControls.largeStringProperty' );
addToMapIfDefined( 'physicalControls_lots', 'physicalControls.lotsStringProperty' );
addToMapIfDefined( 'physicalControls_none', 'physicalControls.noneStringProperty' );
addToMapIfDefined( 'physicalControls_tiny', 'physicalControls.tinyStringProperty' );
addToMapIfDefined( 'energies_thermal', 'energies.thermalStringProperty' );
addToMapIfDefined( 'energies_total', 'energies.totalStringProperty' );
addToMapIfDefined( 'energies_kinetic', 'energies.kineticStringProperty' );
addToMapIfDefined( 'energies_potential', 'energies.potentialStringProperty' );
addToMapIfDefined( 'energies_energy', 'energies.energyStringProperty' );
addToMapIfDefined( 'plots_barGraph_label', 'plots.barGraph.labelStringProperty' );
addToMapIfDefined( 'plots_energyGraph_label', 'plots.energyGraph.labelStringProperty' );
addToMapIfDefined( 'plots_pieChart_label', 'plots.pieChart.labelStringProperty' );
addToMapIfDefined( 'plots_timeSwitchLabel', 'plots.timeSwitchLabelStringProperty' );
addToMapIfDefined( 'plots_positionSwitchLabel', 'plots.positionSwitchLabelStringProperty' );
addToMapIfDefined( 'plots_timeLabel', 'plots.timeLabelStringProperty' );
addToMapIfDefined( 'plots_positionLabel', 'plots.positionLabelStringProperty' );
addToMapIfDefined( 'plots_energyLabel', 'plots.energyLabelStringProperty' );
addToMapIfDefined( 'visibilityControls_grid', 'visibilityControls.gridStringProperty' );
addToMapIfDefined( 'visibilityControls_referenceHeight', 'visibilityControls.referenceHeightStringProperty' );
addToMapIfDefined( 'visibilityControls_path', 'visibilityControls.pathStringProperty' );
addToMapIfDefined( 'visibilityControls_speed', 'visibilityControls.speedStringProperty' );
addToMapIfDefined( 'skaterControls_label', 'skaterControls.labelStringProperty' );
addToMapIfDefined( 'skaterControls_restartSkater', 'skaterControls.restartSkaterStringProperty' );
addToMapIfDefined( 'trackControls_stickToTrack', 'trackControls.stickToTrackStringProperty' );
addToMapIfDefined( 'heightLabels_zeroM', 'heightLabels.zeroMStringProperty' );
addToMapIfDefined( 'heightLabels_heightEqualsZero', 'heightLabels.heightEqualsZeroStringProperty' );
addToMapIfDefined( 'speedometer_label', 'speedometer.labelStringProperty' );
addToMapIfDefined( 'measuringTape_units', 'measuringTape.unitsStringProperty' );
addToMapIfDefined( 'preferences_accelerationUnits', 'preferences.accelerationUnitsStringProperty' );
addToMapIfDefined( 'preferences_accelerationUnitsDescription', 'preferences.accelerationUnitsDescriptionStringProperty' );
addToMapIfDefined( 'preferences_metersPerSecondSquared', 'preferences.metersPerSecondSquaredStringProperty' );
addToMapIfDefined( 'preferences_newtonsPerKilogram', 'preferences.newtonsPerKilogramStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_skaterControls', 'keyboardHelpDialog.skaterControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveSkater', 'keyboardHelpDialog.moveSkaterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveSkaterSlower', 'keyboardHelpDialog.moveSkaterSlowerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveAlongTrack', 'keyboardHelpDialog.moveAlongTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_detachFromTrack', 'keyboardHelpDialog.detachFromTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_attachToTrack', 'keyboardHelpDialog.attachToTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveReferenceHeight', 'keyboardHelpDialog.moveReferenceHeightStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_simShortcuts', 'keyboardHelpDialog.simShortcutsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_restartSkater', 'keyboardHelpDialog.restartSkaterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_returnToolToToolbox', 'keyboardHelpDialog.returnToolToToolboxStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_graphControls', 'keyboardHelpDialog.graphControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_togglePause', 'keyboardHelpDialog.togglePauseStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_scrubThroughData', 'keyboardHelpDialog.scrubThroughDataStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_trackEditing', 'keyboardHelpDialog.trackEditingStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveControlPoint', 'keyboardHelpDialog.moveControlPointStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_removeFromPlayArea', 'keyboardHelpDialog.removeFromPlayAreaStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints', 'keyboardHelpDialog.connectTrackEndpointsStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_accessibleName', 'a11y.skaterNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_onTrackHelpText', 'a11y.skaterNode.onTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_offTrackHelpText', 'a11y.skaterNode.offTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleName', 'a11y.referenceHeightLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_helpText', 'a11y.referenceHeightLine.helpTextStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_accessibleHeading', 'a11y.toolboxPanel.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_stopwatch_accessibleName', 'a11y.toolboxPanel.stopwatch.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_measuringTape_accessibleName', 'a11y.toolboxPanel.measuringTape.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackToolboxPanel_accessibleName', 'a11y.trackToolboxPanel.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointNode_accessibleName', 'a11y.controlPointNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_pathSensorNode_accessibleName', 'a11y.pathSensorNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyChart_accessibleName', 'a11y.energyChart.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointAttachment_left', 'a11y.controlPointAttachment.leftStringProperty' );
addToMapIfDefined( 'a11y_controlPointAttachment_right', 'a11y.controlPointAttachment.rightStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_accessibleName', 'a11y.energyBarGraphAccordionBox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_accessibleHelpTextExpanded', 'a11y.energyBarGraphAccordionBox.accessibleHelpTextExpandedStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleName', 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleHelpText', 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleContextResponse', 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomIn_accessibleName', 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomIn_accessibleHelpText', 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomOut_accessibleName', 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomOut_accessibleHelpText', 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomLevelResponse', 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomLevelResponseStringProperty' );
addToMapIfDefined( 'a11y_pieChartCheckbox_accessibleHelpText', 'a11y.pieChartCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_pieChartCheckbox_accessibleContextResponseChecked', 'a11y.pieChartCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_pieChartCheckbox_accessibleContextResponseUnchecked', 'a11y.pieChartCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_speedCheckbox_accessibleHelpText', 'a11y.speedCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_speedCheckbox_accessibleContextResponseChecked', 'a11y.speedCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_speedCheckbox_accessibleContextResponseUnchecked', 'a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_pathCheckbox_accessibleHelpText', 'a11y.pathCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_pathCheckbox_accessibleContextResponseChecked', 'a11y.pathCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_pathCheckbox_accessibleContextResponseUnchecked', 'a11y.pathCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_stickToTrackCheckbox_accessibleContextResponseChecked', 'a11y.stickToTrackCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_stickToTrackCheckbox_accessibleContextResponseUnchecked', 'a11y.stickToTrackCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_scene1RadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.scene1RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_scene2RadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.scene2RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_scene3RadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.scene3RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_scene4RadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.scene4RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_frictionSlider_accessibleHelpText', 'a11y.frictionSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravitySlider_accessibleHelpText', 'a11y.gravitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityControl_accessibleHelpText', 'a11y.gravityControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleName', 'a11y.gravityComboBox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleHelpText', 'a11y.gravityComboBox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleContextResponse', 'a11y.gravityComboBox.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_massSlider_accessibleHelpText', 'a11y.massSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_massControl_accessibleHelpText', 'a11y.massControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_accessibleName', 'a11y.skaterSetOneControls.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_accessibleHelpText', 'a11y.skaterSetOneControls.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater1RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater1RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater2RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater2RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater3RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater3RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater4RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater4RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater5RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater5RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater6RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater6RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater7RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater7RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_skater0RadioButton_accessibleName', 'a11y.skaterSetOneControls.skater0RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseChecked', 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseUnchecked', 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleHelpText', 'a11y.referenceHeightCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleContextResponseChecked', 'a11y.referenceHeightCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleContextResponseUnchecked', 'a11y.referenceHeightCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_restartSkaterButton_accessibleHelpText', 'a11y.restartSkaterButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleName', 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleHelpText', 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToGroundButton_accessibleName', 'a11y.returnSkaterToGroundButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_intro_accessibleHelpText', 'a11y.screenButtons.intro.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_measure_accessibleHelpText', 'a11y.screenButtons.measure.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_graphs_accessibleHelpText', 'a11y.screenButtons.graphs.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_playground_accessibleHelpText', 'a11y.screenButtons.playground.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_friction_accessibleHelpText', 'a11y.screenButtons.friction.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_preferences_metersPerSecondSquaredRadioButton', 'a11y.preferences.metersPerSecondSquaredRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_preferences_newtonsPerKilogramRadioButton', 'a11y.preferences.newtonsPerKilogramRadioButtonStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveSkaterDescription', 'a11y.keyboardHelpDialog.moveSkaterDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveAlongTrackDescription', 'a11y.keyboardHelpDialog.moveAlongTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_detachFromTrackDescription', 'a11y.keyboardHelpDialog.detachFromTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_attachToTrackDescription', 'a11y.keyboardHelpDialog.attachToTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveReferenceHeightDescription', 'a11y.keyboardHelpDialog.moveReferenceHeightDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_restartSkaterDescription', 'a11y.keyboardHelpDialog.restartSkaterDescriptionStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const EnergySkateParkFluent = {
  "energy-skate-park": {
    titleStringProperty: _.get( EnergySkateParkStrings, 'energy-skate-park.titleStringProperty' )
  },
  screens: {
    introStringProperty: _.get( EnergySkateParkStrings, 'screens.introStringProperty' ),
    graphsStringProperty: _.get( EnergySkateParkStrings, 'screens.graphsStringProperty' ),
    playgroundStringProperty: _.get( EnergySkateParkStrings, 'screens.playgroundStringProperty' ),
    measureStringProperty: _.get( EnergySkateParkStrings, 'screens.measureStringProperty' )
  },
  physicalControls: {
    gravityControls: {
      gravityStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.gravityStringProperty' ),
      earthStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.earthStringProperty' ),
      jupiterStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.jupiterStringProperty' ),
      moonStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.moonStringProperty' ),
      gravityMetersPerSecondSquaredPatternStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.gravityMetersPerSecondSquaredPatternStringProperty' ),
      gravityNewtonsPerKilogramPatternStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.gravityControls.gravityNewtonsPerKilogramPatternStringProperty' )
    },
    massControls: {
      massStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.massControls.massStringProperty' ),
      massKilogramsPatternStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.massControls.massKilogramsPatternStringProperty' )
    },
    frictionStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.frictionStringProperty' ),
    customStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.customStringProperty' ),
    smallStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.smallStringProperty' ),
    largeStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.largeStringProperty' ),
    lotsStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.lotsStringProperty' ),
    noneStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.noneStringProperty' ),
    tinyStringProperty: _.get( EnergySkateParkStrings, 'physicalControls.tinyStringProperty' )
  },
  energies: {
    thermalStringProperty: _.get( EnergySkateParkStrings, 'energies.thermalStringProperty' ),
    totalStringProperty: _.get( EnergySkateParkStrings, 'energies.totalStringProperty' ),
    kineticStringProperty: _.get( EnergySkateParkStrings, 'energies.kineticStringProperty' ),
    potentialStringProperty: _.get( EnergySkateParkStrings, 'energies.potentialStringProperty' ),
    energyStringProperty: _.get( EnergySkateParkStrings, 'energies.energyStringProperty' )
  },
  plots: {
    barGraph: {
      labelStringProperty: _.get( EnergySkateParkStrings, 'plots.barGraph.labelStringProperty' )
    },
    energyGraph: {
      labelStringProperty: _.get( EnergySkateParkStrings, 'plots.energyGraph.labelStringProperty' )
    },
    pieChart: {
      labelStringProperty: _.get( EnergySkateParkStrings, 'plots.pieChart.labelStringProperty' )
    },
    timeSwitchLabelStringProperty: _.get( EnergySkateParkStrings, 'plots.timeSwitchLabelStringProperty' ),
    positionSwitchLabelStringProperty: _.get( EnergySkateParkStrings, 'plots.positionSwitchLabelStringProperty' ),
    timeLabelStringProperty: _.get( EnergySkateParkStrings, 'plots.timeLabelStringProperty' ),
    positionLabelStringProperty: _.get( EnergySkateParkStrings, 'plots.positionLabelStringProperty' ),
    energyLabelStringProperty: _.get( EnergySkateParkStrings, 'plots.energyLabelStringProperty' )
  },
  visibilityControls: {
    gridStringProperty: _.get( EnergySkateParkStrings, 'visibilityControls.gridStringProperty' ),
    referenceHeightStringProperty: _.get( EnergySkateParkStrings, 'visibilityControls.referenceHeightStringProperty' ),
    pathStringProperty: _.get( EnergySkateParkStrings, 'visibilityControls.pathStringProperty' ),
    speedStringProperty: _.get( EnergySkateParkStrings, 'visibilityControls.speedStringProperty' )
  },
  skaterControls: {
    labelStringProperty: _.get( EnergySkateParkStrings, 'skaterControls.labelStringProperty' ),
    skater1MassPatternStringProperty: _.get( EnergySkateParkStrings, 'skaterControls.skater1MassPatternStringProperty' ),
    restartSkaterStringProperty: _.get( EnergySkateParkStrings, 'skaterControls.restartSkaterStringProperty' )
  },
  trackControls: {
    stickToTrackStringProperty: _.get( EnergySkateParkStrings, 'trackControls.stickToTrackStringProperty' )
  },
  heightLabels: {
    zeroMStringProperty: _.get( EnergySkateParkStrings, 'heightLabels.zeroMStringProperty' ),
    heightEqualsZeroStringProperty: _.get( EnergySkateParkStrings, 'heightLabels.heightEqualsZeroStringProperty' )
  },
  pathSensor: {
    energyJoulesPatternStringProperty: _.get( EnergySkateParkStrings, 'pathSensor.energyJoulesPatternStringProperty' ),
    heightMetersPatternStringProperty: _.get( EnergySkateParkStrings, 'pathSensor.heightMetersPatternStringProperty' ),
    speedMetersPerSecondPatternStringProperty: _.get( EnergySkateParkStrings, 'pathSensor.speedMetersPerSecondPatternStringProperty' )
  },
  speedometer: {
    labelStringProperty: _.get( EnergySkateParkStrings, 'speedometer.labelStringProperty' ),
    metersPerSecondPatternStringProperty: _.get( EnergySkateParkStrings, 'speedometer.metersPerSecondPatternStringProperty' )
  },
  measuringTape: {
    unitsStringProperty: _.get( EnergySkateParkStrings, 'measuringTape.unitsStringProperty' )
  },
  preferences: {
    accelerationUnitsStringProperty: _.get( EnergySkateParkStrings, 'preferences.accelerationUnitsStringProperty' ),
    accelerationUnitsDescriptionStringProperty: _.get( EnergySkateParkStrings, 'preferences.accelerationUnitsDescriptionStringProperty' ),
    metersPerSecondSquaredStringProperty: _.get( EnergySkateParkStrings, 'preferences.metersPerSecondSquaredStringProperty' ),
    newtonsPerKilogramStringProperty: _.get( EnergySkateParkStrings, 'preferences.newtonsPerKilogramStringProperty' )
  },
  keyboardHelpDialog: {
    skaterControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.skaterControlsStringProperty' ),
    moveSkaterStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveSkaterStringProperty' ),
    moveSkaterSlowerStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveSkaterSlowerStringProperty' ),
    moveAlongTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveAlongTrackStringProperty' ),
    detachFromTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.detachFromTrackStringProperty' ),
    attachToTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.attachToTrackStringProperty' ),
    moveReferenceHeightStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveReferenceHeightStringProperty' ),
    simShortcutsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.simShortcutsStringProperty' ),
    restartSkaterStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.restartSkaterStringProperty' ),
    returnToolToToolboxStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.returnToolToToolboxStringProperty' ),
    graphControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.graphControlsStringProperty' ),
    togglePauseStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.togglePauseStringProperty' ),
    scrubThroughDataStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.scrubThroughDataStringProperty' ),
    trackEditingStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.trackEditingStringProperty' ),
    moveControlPointStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveControlPointStringProperty' ),
    removeFromPlayAreaStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.removeFromPlayAreaStringProperty' ),
    connectTrackEndpointsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpointsStringProperty' )
  },
  a11y: {
    skaterNode: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterNode.accessibleNameStringProperty' ) ),
      onTrackHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_onTrackHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterNode.onTrackHelpTextStringProperty' ) ),
      offTrackHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_offTrackHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterNode.offTrackHelpTextStringProperty' ) )
    },
    referenceHeightLine: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_accessibleName', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.accessibleNameStringProperty' ) ),
      helpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_helpText', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.helpTextStringProperty' ) )
    },
    toolboxPanel: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_toolboxPanel_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.toolboxPanel.accessibleHeadingStringProperty' ) ),
      stopwatch: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_toolboxPanel_stopwatch_accessibleName', _.get( EnergySkateParkStrings, 'a11y.toolboxPanel.stopwatch.accessibleNameStringProperty' ) )
      },
      measuringTape: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_toolboxPanel_measuringTape_accessibleName', _.get( EnergySkateParkStrings, 'a11y.toolboxPanel.measuringTape.accessibleNameStringProperty' ) )
      }
    },
    trackToolboxPanel: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackToolboxPanel_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackToolboxPanel.accessibleNameStringProperty' ) )
    },
    controlPointNode: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPointNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.controlPointNode.accessibleNameStringProperty' ) )
    },
    pathSensorNode: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pathSensorNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.pathSensorNode.accessibleNameStringProperty' ) )
    },
    energyChart: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyChart_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyChart.accessibleNameStringProperty' ) )
    },
    controlPointAttachment: {
      leftStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPointAttachment_left', _.get( EnergySkateParkStrings, 'a11y.controlPointAttachment.leftStringProperty' ) ),
      rightStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPointAttachment_right', _.get( EnergySkateParkStrings, 'a11y.controlPointAttachment.rightStringProperty' ) )
    },
    energyBarGraphAccordionBox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.accessibleNameStringProperty' ) ),
      accessibleHelpTextExpandedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_accessibleHelpTextExpanded', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.accessibleHelpTextExpandedStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"This button also appears in the Pie Chart Legend.","associatedKey":"clearThermalButton"} ),
      clearThermalButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleHelpTextStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
        accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_clearThermalButton_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.clearThermalButton.accessibleContextResponseStringProperty' ) )
      },
      zoomButtonGroup: {
        zoomIn: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomIn_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomIn_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty' ) )
        },
        zoomOut: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomOut_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomOut_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty' ) )
        },
        _comment_0: new FluentComment( {"comment":"Copied from CCK.","associatedKey":"zoomLevelResponse"} ),
        zoomLevelResponse: new FluentPattern<{ level: FluentVariable, max: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyBarGraphAccordionBox_zoomButtonGroup_zoomLevelResponse', _.get( EnergySkateParkStrings, 'a11y.energyBarGraphAccordionBox.zoomButtonGroup.zoomLevelResponseStringProperty' ), [{"name":"level"},{"name":"max"}] )
      }
    },
    _comment_0: new FluentComment( {"comment":"Control Panel controls, in visual order, not sure if extra nesting is needed.","associatedKey":"pieChartCheckbox"} ),
    pieChartCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChartCheckbox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.pieChartCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChartCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.pieChartCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChartCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.pieChartCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    speedCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedCheckbox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.speedCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.speedCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.speedCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    pathCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pathCheckbox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.pathCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pathCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.pathCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pathCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.pathCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    stickToTrackCheckbox: {
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_stickToTrackCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.stickToTrackCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_stickToTrackCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.stickToTrackCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    _comment_1: new FluentComment( {"comment":"Key names likely need fixing. I copied the phetioIDs from the Intro screen, but index is not consistent across screens.","associatedKey":"sceneSelectionRadioButtonGroup"} ),
    sceneSelectionRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.accessibleNameStringProperty' ) ),
      scene1RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_scene1RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.scene1RadioButton.accessibleNameStringProperty' ) )
      },
      scene2RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_scene2RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.scene2RadioButton.accessibleNameStringProperty' ) )
      },
      scene3RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_scene3RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.scene3RadioButton.accessibleNameStringProperty' ) )
      },
      scene4RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_scene4RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.scene4RadioButton.accessibleNameStringProperty' ) )
      }
    },
    frictionSlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_frictionSlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.frictionSlider.accessibleHelpTextStringProperty' ) )
    },
    _comment_2: new FluentComment( {"comment":"Gravity and Mass controls are either a Slider or a NumberControl. Help text depends on which type of control.","associatedKey":"gravitySlider"} ),
    gravitySlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravitySlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravitySlider.accessibleHelpTextStringProperty' ) )
    },
    gravityControl: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityControl_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravityControl.accessibleHelpTextStringProperty' ) )
    },
    gravityComboBox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleName', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleHelpTextStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
      accessibleContextResponse: new FluentPattern<{ gValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleContextResponseStringProperty' ), [{"name":"gValue"}] )
    },
    massSlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_massSlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.massSlider.accessibleHelpTextStringProperty' ) )
    },
    massControl: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_massControl_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.massControl.accessibleHelpTextStringProperty' ) )
    },
    _comment_3: new FluentComment( {"comment":"Key names likely need fixing. I copied the phetioIDs from the Intro screen. For animal skaters, list animal type. For example: Skater 7, Goat","associatedKey":"skaterSetOneControls"} ),
    skaterSetOneControls: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.accessibleHelpTextStringProperty' ) ),
      skater1RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater1RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater1RadioButton.accessibleNameStringProperty' ) )
      },
      skater2RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater2RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater2RadioButton.accessibleNameStringProperty' ) )
      },
      skater3RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater3RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater3RadioButton.accessibleNameStringProperty' ) )
      },
      skater4RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater4RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater4RadioButton.accessibleNameStringProperty' ) )
      },
      skater5RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater5RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater5RadioButton.accessibleNameStringProperty' ) )
      },
      skater6RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater6RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater6RadioButton.accessibleNameStringProperty' ) )
      },
      skater7RadioButton: {
        accessibleName: new FluentPattern<{ animalType: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater7RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater7RadioButton.accessibleNameStringProperty' ), [{"name":"animalType"}] )
      },
      skater0RadioButton: {
        accessibleName: new FluentPattern<{ animalType: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_skater0RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.skater0RadioButton.accessibleNameStringProperty' ), [{"name":"animalType"}] )
      }
    },
    gridCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gridCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    referenceHeightCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightCheckbox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.referenceHeightCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.referenceHeightCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.referenceHeightCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    restartSkaterButton: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_restartSkaterButton_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.restartSkaterButton.accessibleHelpTextStringProperty' ) )
    },
    returnSkaterToPreviousStartingPositionButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleHelpTextStringProperty' ) )
    },
    returnSkaterToGroundButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToGroundButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToGroundButton.accessibleNameStringProperty' ) )
    },
    _comment_4: new FluentComment( {"comment":"Not sure where to put screen buttons. ESP and ESPB both have Intro & Playground screens. Help text applies to both flavors.","associatedKey":"screenButtons"} ),
    screenButtons: {
      intro: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenButtons_intro_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.screenButtons.intro.accessibleHelpTextStringProperty' ) )
      },
      measure: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenButtons_measure_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.screenButtons.measure.accessibleHelpTextStringProperty' ) )
      },
      graphs: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenButtons_graphs_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.screenButtons.graphs.accessibleHelpTextStringProperty' ) )
      },
      playground: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenButtons_playground_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.screenButtons.playground.accessibleHelpTextStringProperty' ) )
      },
      friction: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenButtons_friction_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.screenButtons.friction.accessibleHelpTextStringProperty' ) )
      }
    },
    preferences: {
      metersPerSecondSquaredRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_metersPerSecondSquaredRadioButton', _.get( EnergySkateParkStrings, 'a11y.preferences.metersPerSecondSquaredRadioButtonStringProperty' ) ),
      newtonsPerKilogramRadioButtonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_preferences_newtonsPerKilogramRadioButton', _.get( EnergySkateParkStrings, 'a11y.preferences.newtonsPerKilogramRadioButtonStringProperty' ) )
    },
    keyboardHelpDialog: {
      moveSkaterDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveSkaterDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveSkaterDescriptionStringProperty' ) ),
      moveAlongTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveAlongTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveAlongTrackDescriptionStringProperty' ) ),
      detachFromTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_detachFromTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.detachFromTrackDescriptionStringProperty' ) ),
      attachToTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_attachToTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.attachToTrackDescriptionStringProperty' ) ),
      moveReferenceHeightDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveReferenceHeightDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveReferenceHeightDescriptionStringProperty' ) ),
      restartSkaterDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_restartSkaterDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.restartSkaterDescriptionStringProperty' ) )
    }
  }
};

export default EnergySkateParkFluent;

energySkatePark.register('EnergySkateParkFluent', EnergySkateParkFluent);
