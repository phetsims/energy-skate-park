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
addToMapIfDefined( 'keyboardHelpDialog_fromAnywhereInScreen', 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabOrRelease', 'keyboardHelpDialog.grabOrReleaseStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveAlongTrack', 'keyboardHelpDialog.moveAlongTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_attachToTrack', 'keyboardHelpDialog.attachToTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveToStartOfTrack', 'keyboardHelpDialog.moveToStartOfTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveToEndOfTrack', 'keyboardHelpDialog.moveToEndOfTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_restartSkater', 'keyboardHelpDialog.restartSkaterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_togglePause', 'keyboardHelpDialog.togglePauseStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_scrubThroughData', 'keyboardHelpDialog.scrubThroughDataStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_stopwatchAndMeasuringTapeControls', 'keyboardHelpDialog.stopwatchAndMeasuringTapeControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_removeFromToolbox', 'keyboardHelpDialog.removeFromToolboxStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_returnToToolbox', 'keyboardHelpDialog.returnToToolboxStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_graphCursorControls', 'keyboardHelpDialog.graphCursorControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_trackControls', 'keyboardHelpDialog.trackControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_cutTrackAtControlPoint', 'keyboardHelpDialog.cutTrackAtControlPointStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_deleteControlPoint', 'keyboardHelpDialog.deleteControlPointStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints_label', 'keyboardHelpDialog.connectTrackEndpoints.labelStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints_showOptions', 'keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints_moveThroughOptions', 'keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints_selectOption', 'keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_connectTrackEndpoints_cancel', 'keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty' );
addToMapIfDefined( 'a11y_noDataParagraph', 'a11y.noDataParagraphStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_experimentSettingsHeading', 'a11y.controlPanel.experimentSettingsHeadingStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_showOptions', 'a11y.keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_moveThroughOptions', 'a11y.keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_selectOption', 'a11y.keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_cancel', 'a11y.keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_accessibleName', 'a11y.skaterNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_onTrackHelpText', 'a11y.skaterNode.onTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_offTrackHelpText', 'a11y.skaterNode.offTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleHeading', 'a11y.referenceHeightLine.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleName', 'a11y.referenceHeightLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleHelpText', 'a11y.referenceHeightLine.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_aboveGroundPattern', 'a11y.referenceHeightLine.aboveGroundPatternStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_atGroundLevel', 'a11y.referenceHeightLine.atGroundLevelStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_accessibleHeading', 'a11y.toolboxPanel.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_stopwatch_accessibleName', 'a11y.toolboxPanel.stopwatch.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_measuringTape_accessibleName', 'a11y.toolboxPanel.measuringTape.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackToolboxPanel_accessibleName', 'a11y.trackToolboxPanel.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackNode_accessibleName', 'a11y.trackNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointNode_accessibleName', 'a11y.controlPointNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyReadoutPattern', 'a11y.energyReadoutPatternStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_accessibleHeading', 'a11y.energySensorNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_accessibleName', 'a11y.energySensorNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_accessibleHelpText', 'a11y.energySensorNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_nothingToMeasure', 'a11y.energySensorNode.nothingToMeasureStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_movedOffSamples', 'a11y.energySensorNode.movedOffSamplesStringProperty' );
addToMapIfDefined( 'a11y_energySensorNode_sampleReadoutPattern', 'a11y.energySensorNode.sampleReadoutPatternStringProperty' );
addToMapIfDefined( 'a11y_pieChart_accessibleHeading', 'a11y.pieChart.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_pieChart_accessibleHelpText', 'a11y.pieChart.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_pieChart_positiveEnergyParagraph', 'a11y.pieChart.positiveEnergyParagraphStringProperty' );
addToMapIfDefined( 'a11y_pieChart_negativeEnergyParagraph', 'a11y.pieChart.negativeEnergyParagraphStringProperty' );
addToMapIfDefined( 'a11y_pieChart_kineticPercentPattern', 'a11y.pieChart.kineticPercentPatternStringProperty' );
addToMapIfDefined( 'a11y_pieChart_potentialPercentPattern', 'a11y.pieChart.potentialPercentPatternStringProperty' );
addToMapIfDefined( 'a11y_pieChart_thermalPercentPattern', 'a11y.pieChart.thermalPercentPatternStringProperty' );
addToMapIfDefined( 'a11y_pieChart_legendHeading', 'a11y.pieChart.legendHeadingStringProperty' );
addToMapIfDefined( 'a11y_pieChart_legendKinetic', 'a11y.pieChart.legendKineticStringProperty' );
addToMapIfDefined( 'a11y_pieChart_legendPotential', 'a11y.pieChart.legendPotentialStringProperty' );
addToMapIfDefined( 'a11y_pieChart_legendThermal', 'a11y.pieChart.legendThermalStringProperty' );
addToMapIfDefined( 'a11y_pieChart_legendTotal', 'a11y.pieChart.legendTotalStringProperty' );
addToMapIfDefined( 'a11y_speedometer_accessibleHeading', 'a11y.speedometer.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_speedometer_accessibleParagraph', 'a11y.speedometer.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_accessibleHelpTextCollapsed', 'a11y.energyGraph.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_graphDescriptionParagraph', 'a11y.energyGraph.graphDescriptionParagraphStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_variablePosition', 'a11y.energyGraph.variablePositionStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_variableTime', 'a11y.energyGraph.variableTimeStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_unitsMeters', 'a11y.energyGraph.unitsMetersStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_unitsSeconds', 'a11y.energyGraph.unitsSecondsStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_energyKinetic', 'a11y.energyGraph.energyKineticStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_energyPotential', 'a11y.energyGraph.energyPotentialStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_energyThermal', 'a11y.energyGraph.energyThermalStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_energyTotal', 'a11y.energyGraph.energyTotalStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_energyNone', 'a11y.energyGraph.energyNoneStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_checkboxGroupParagraph', 'a11y.energyGraph.checkboxGroupParagraphStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_kineticCheckbox_accessibleContextResponseChecked', 'a11y.energyGraph.kineticCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_kineticCheckbox_accessibleContextResponseUnchecked', 'a11y.energyGraph.kineticCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_potentialCheckbox_accessibleContextResponseChecked', 'a11y.energyGraph.potentialCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_potentialCheckbox_accessibleContextResponseUnchecked', 'a11y.energyGraph.potentialCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_thermalCheckbox_accessibleContextResponseChecked', 'a11y.energyGraph.thermalCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_thermalCheckbox_accessibleContextResponseUnchecked', 'a11y.energyGraph.thermalCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_totalCheckbox_accessibleContextResponseChecked', 'a11y.energyGraph.totalCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_totalCheckbox_accessibleContextResponseUnchecked', 'a11y.energyGraph.totalCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_graphCursor_accessibleName', 'a11y.energyGraph.graphCursor.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_graphCursor_accessibleHelpText', 'a11y.energyGraph.graphCursor.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_graphCursor_movementResponse', 'a11y.energyGraph.graphCursor.movementResponseStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_zoomButtonGroup_zoomIn_accessibleName', 'a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_zoomButtonGroup_zoomIn_accessibleHelpText', 'a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_zoomButtonGroup_zoomOut_accessibleName', 'a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_zoomButtonGroup_zoomOut_accessibleHelpText', 'a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_zoomButtonGroup_zoomLevelResponse', 'a11y.energyGraph.zoomButtonGroup.zoomLevelResponseStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_variableSwitch_accessibleHelpText', 'a11y.energyGraph.variableSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_eraserButton_accessibleName', 'a11y.energyGraph.eraserButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_eraserButton_positionResponse', 'a11y.energyGraph.eraserButton.positionResponseStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_eraserButton_timeResponse', 'a11y.energyGraph.eraserButton.timeResponseStringProperty' );
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
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_rampRadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_doubleWellRadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_sceneSelectionRadioButtonGroup_loopRadioButton_accessibleName', 'a11y.sceneSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty' );
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
addToMapIfDefined( 'a11y_skaterSetOneControls_animal1RadioButton_accessibleName', 'a11y.skaterSetOneControls.animal1RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSetOneControls_animal2RadioButton_accessibleName', 'a11y.skaterSetOneControls.animal2RadioButton.accessibleNameStringProperty' );
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
    fromAnywhereInScreenStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' ),
    grabOrReleaseStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.grabOrReleaseStringProperty' ),
    moveAlongTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveAlongTrackStringProperty' ),
    attachToTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.attachToTrackStringProperty' ),
    moveToStartOfTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveToStartOfTrackStringProperty' ),
    moveToEndOfTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveToEndOfTrackStringProperty' ),
    restartSkaterStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.restartSkaterStringProperty' ),
    togglePauseStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.togglePauseStringProperty' ),
    scrubThroughDataStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.scrubThroughDataStringProperty' ),
    stopwatchAndMeasuringTapeControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.stopwatchAndMeasuringTapeControlsStringProperty' ),
    removeFromToolboxStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.removeFromToolboxStringProperty' ),
    returnToToolboxStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.returnToToolboxStringProperty' ),
    graphCursorControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.graphCursorControlsStringProperty' ),
    trackControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.trackControlsStringProperty' ),
    cutTrackAtControlPointStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.cutTrackAtControlPointStringProperty' ),
    deleteControlPointStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.deleteControlPointStringProperty' ),
    connectTrackEndpoints: {
      labelStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpoints.labelStringProperty' ),
      showOptionsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty' ),
      moveThroughOptionsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty' ),
      selectOptionStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty' ),
      cancelStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty' )
    }
  },
  a11y: {
    noDataParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_noDataParagraph', _.get( EnergySkateParkStrings, 'a11y.noDataParagraphStringProperty' ) ),
    controlPanel: {
      experimentSettingsHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_experimentSettingsHeading', _.get( EnergySkateParkStrings, 'a11y.controlPanel.experimentSettingsHeadingStringProperty' ) )
    },
    keyboardHelpDialog: {
      connectTrackEndpoints: {
        showOptionsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_connectTrackEndpoints_showOptions', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty' ) ),
        moveThroughOptionsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_connectTrackEndpoints_moveThroughOptions', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty' ) ),
        selectOptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_connectTrackEndpoints_selectOption', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty' ) ),
        cancelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_connectTrackEndpoints_cancel', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty' ) )
      }
    },
    skaterNode: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterNode.accessibleNameStringProperty' ) ),
      onTrackHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_onTrackHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterNode.onTrackHelpTextStringProperty' ) ),
      offTrackHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_offTrackHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterNode.offTrackHelpTextStringProperty' ) )
    },
    referenceHeightLine: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.accessibleHeadingStringProperty' ) ),
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_accessibleName', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.accessibleHelpTextStringProperty' ) ),
      aboveGroundPattern: new FluentPattern<{ distance: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_aboveGroundPattern', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.aboveGroundPatternStringProperty' ), [{"name":"distance"}] ),
      atGroundLevelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceHeightLine_atGroundLevel', _.get( EnergySkateParkStrings, 'a11y.referenceHeightLine.atGroundLevelStringProperty' ) )
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
    trackNode: {
      accessibleName: new FluentPattern<{ position: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_trackNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackNode.accessibleNameStringProperty' ), [{"name":"position"},{"name":"total"}] )
    },
    controlPointNode: {
      accessibleName: new FluentPattern<{ position: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controlPointNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.controlPointNode.accessibleNameStringProperty' ), [{"name":"position"},{"name":"total"}] )
    },
    energyReadoutPattern: new FluentPattern<{ kinetic: FluentVariable, potential: FluentVariable, thermal: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyReadoutPattern', _.get( EnergySkateParkStrings, 'a11y.energyReadoutPatternStringProperty' ), [{"name":"kinetic"},{"name":"potential"},{"name":"thermal"},{"name":"total"}] ),
    energySensorNode: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySensorNode_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.accessibleHeadingStringProperty' ) ),
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySensorNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySensorNode_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.accessibleHelpTextStringProperty' ) ),
      nothingToMeasureStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySensorNode_nothingToMeasure', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.nothingToMeasureStringProperty' ) ),
      movedOffSamplesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySensorNode_movedOffSamples', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.movedOffSamplesStringProperty' ) ),
      sampleReadoutPattern: new FluentPattern<{ height: FluentVariable, kinetic: FluentVariable, potential: FluentVariable, speed: FluentVariable, thermal: FluentVariable, total: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energySensorNode_sampleReadoutPattern', _.get( EnergySkateParkStrings, 'a11y.energySensorNode.sampleReadoutPatternStringProperty' ), [{"name":"height"},{"name":"kinetic"},{"name":"potential"},{"name":"speed"},{"name":"thermal"},{"name":"total"}] )
    },
    pieChart: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.pieChart.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.pieChart.accessibleHelpTextStringProperty' ) ),
      positiveEnergyParagraph: new FluentPattern<{ energiesList: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pieChart_positiveEnergyParagraph', _.get( EnergySkateParkStrings, 'a11y.pieChart.positiveEnergyParagraphStringProperty' ), [{"name":"energiesList"}] ),
      negativeEnergyParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_negativeEnergyParagraph', _.get( EnergySkateParkStrings, 'a11y.pieChart.negativeEnergyParagraphStringProperty' ) ),
      kineticPercentPattern: new FluentPattern<{ percent: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pieChart_kineticPercentPattern', _.get( EnergySkateParkStrings, 'a11y.pieChart.kineticPercentPatternStringProperty' ), [{"name":"percent"}] ),
      potentialPercentPattern: new FluentPattern<{ percent: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pieChart_potentialPercentPattern', _.get( EnergySkateParkStrings, 'a11y.pieChart.potentialPercentPatternStringProperty' ), [{"name":"percent"}] ),
      thermalPercentPattern: new FluentPattern<{ percent: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_pieChart_thermalPercentPattern', _.get( EnergySkateParkStrings, 'a11y.pieChart.thermalPercentPatternStringProperty' ), [{"name":"percent"}] ),
      legendHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_legendHeading', _.get( EnergySkateParkStrings, 'a11y.pieChart.legendHeadingStringProperty' ) ),
      legendKineticStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_legendKinetic', _.get( EnergySkateParkStrings, 'a11y.pieChart.legendKineticStringProperty' ) ),
      legendPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_legendPotential', _.get( EnergySkateParkStrings, 'a11y.pieChart.legendPotentialStringProperty' ) ),
      legendThermalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_legendThermal', _.get( EnergySkateParkStrings, 'a11y.pieChart.legendThermalStringProperty' ) ),
      legendTotalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pieChart_legendTotal', _.get( EnergySkateParkStrings, 'a11y.pieChart.legendTotalStringProperty' ) )
    },
    speedometer: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_speedometer_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.speedometer.accessibleHeadingStringProperty' ) ),
      accessibleParagraph: new FluentPattern<{ speed: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_speedometer_accessibleParagraph', _.get( EnergySkateParkStrings, 'a11y.speedometer.accessibleParagraphStringProperty' ), [{"name":"speed"}] )
    },
    energyGraph: {
      accessibleHelpTextCollapsedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_accessibleHelpTextCollapsed', _.get( EnergySkateParkStrings, 'a11y.energyGraph.accessibleHelpTextCollapsedStringProperty' ) ),
      graphDescriptionParagraph: new FluentPattern<{ checkedEnergiesList: FluentVariable, units: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_graphDescriptionParagraph', _.get( EnergySkateParkStrings, 'a11y.energyGraph.graphDescriptionParagraphStringProperty' ), [{"name":"checkedEnergiesList"},{"name":"units"},{"name":"variable"}] ),
      variablePositionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_variablePosition', _.get( EnergySkateParkStrings, 'a11y.energyGraph.variablePositionStringProperty' ) ),
      variableTimeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_variableTime', _.get( EnergySkateParkStrings, 'a11y.energyGraph.variableTimeStringProperty' ) ),
      unitsMetersStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_unitsMeters', _.get( EnergySkateParkStrings, 'a11y.energyGraph.unitsMetersStringProperty' ) ),
      unitsSecondsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_unitsSeconds', _.get( EnergySkateParkStrings, 'a11y.energyGraph.unitsSecondsStringProperty' ) ),
      energyKineticStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_energyKinetic', _.get( EnergySkateParkStrings, 'a11y.energyGraph.energyKineticStringProperty' ) ),
      energyPotentialStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_energyPotential', _.get( EnergySkateParkStrings, 'a11y.energyGraph.energyPotentialStringProperty' ) ),
      energyThermalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_energyThermal', _.get( EnergySkateParkStrings, 'a11y.energyGraph.energyThermalStringProperty' ) ),
      energyTotalStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_energyTotal', _.get( EnergySkateParkStrings, 'a11y.energyGraph.energyTotalStringProperty' ) ),
      energyNoneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_energyNone', _.get( EnergySkateParkStrings, 'a11y.energyGraph.energyNoneStringProperty' ) ),
      checkboxGroupParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_checkboxGroupParagraph', _.get( EnergySkateParkStrings, 'a11y.energyGraph.checkboxGroupParagraphStringProperty' ) ),
      kineticCheckbox: {
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_kineticCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.kineticCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_kineticCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.kineticCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      potentialCheckbox: {
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_potentialCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.potentialCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_potentialCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.potentialCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      thermalCheckbox: {
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_thermalCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.thermalCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_thermalCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.thermalCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      totalCheckbox: {
        accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_totalCheckbox_accessibleContextResponseChecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.totalCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
        accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_totalCheckbox_accessibleContextResponseUnchecked', _.get( EnergySkateParkStrings, 'a11y.energyGraph.totalCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
      },
      graphCursor: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_graphCursor_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyGraph.graphCursor.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_graphCursor_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyGraph.graphCursor.accessibleHelpTextStringProperty' ) ),
        movementResponse: new FluentPattern<{ sampleTime: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_graphCursor_movementResponse', _.get( EnergySkateParkStrings, 'a11y.energyGraph.graphCursor.movementResponseStringProperty' ), [{"name":"sampleTime"}] )
      },
      zoomButtonGroup: {
        zoomIn: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_zoomButtonGroup_zoomIn_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_zoomButtonGroup_zoomIn_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyGraph.zoomButtonGroup.zoomIn.accessibleHelpTextStringProperty' ) )
        },
        zoomOut: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_zoomButtonGroup_zoomOut_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_zoomButtonGroup_zoomOut_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyGraph.zoomButtonGroup.zoomOut.accessibleHelpTextStringProperty' ) )
        },
        zoomLevelResponse: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_zoomButtonGroup_zoomLevelResponse', _.get( EnergySkateParkStrings, 'a11y.energyGraph.zoomButtonGroup.zoomLevelResponseStringProperty' ), [{"name":"max"},{"name":"min"}] )
      },
      variableSwitch: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_variableSwitch_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.energyGraph.variableSwitch.accessibleHelpTextStringProperty' ) )
      },
      eraserButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_eraserButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.energyGraph.eraserButton.accessibleNameStringProperty' ) ),
        positionResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_eraserButton_positionResponse', _.get( EnergySkateParkStrings, 'a11y.energyGraph.eraserButton.positionResponseStringProperty' ) ),
        timeResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energyGraph_eraserButton_timeResponse', _.get( EnergySkateParkStrings, 'a11y.energyGraph.eraserButton.timeResponseStringProperty' ) )
      }
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
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) )
      },
      rampRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_rampRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty' ) )
      },
      doubleWellRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_doubleWellRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty' ) )
      },
      loopRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_sceneSelectionRadioButtonGroup_loopRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.sceneSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty' ) )
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
      accessibleContextResponse: new FluentPattern<{ gravityValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleContextResponseStringProperty' ), [{"name":"gravityValue"}] )
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
      animal1RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_animal1RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.animal1RadioButton.accessibleNameStringProperty' ) )
      },
      animal2RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSetOneControls_animal2RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSetOneControls.animal2RadioButton.accessibleNameStringProperty' ) )
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
    _comment_4: new FluentComment( {"comment":"ESP and ESPB both have Intro & Playground screens. Help text applies to both sims","associatedKey":"screenButtons"} ),
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
    }
  }
};

export default EnergySkateParkFluent;

energySkatePark.register('EnergySkateParkFluent', EnergySkateParkFluent);
