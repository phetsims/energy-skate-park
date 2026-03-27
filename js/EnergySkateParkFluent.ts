// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from energy-skate-park-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
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
addToMapIfDefined( 'preferences_patterns', 'preferences.patternsStringProperty' );
addToMapIfDefined( 'preferences_patternsDescription', 'preferences.patternsDescriptionStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_skaterControls', 'keyboardHelpDialog.skaterControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_fromAnywhereInScreen', 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_grabOrRelease', 'keyboardHelpDialog.grabOrReleaseStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveAlongTrack', 'keyboardHelpDialog.moveAlongTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_attachToTrack', 'keyboardHelpDialog.attachToTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_detachFromTrack', 'keyboardHelpDialog.detachFromTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveToStartOfTrack', 'keyboardHelpDialog.moveToStartOfTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveToEndOfTrack', 'keyboardHelpDialog.moveToEndOfTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_jumpToSkater', 'keyboardHelpDialog.jumpToSkaterStringProperty' );
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
addToMapIfDefined( 'a11y_controlPointAttachment_noConnectionsAvailable', 'a11y.controlPointAttachment.noConnectionsAvailableStringProperty' );
addToMapIfDefined( 'a11y_noDataParagraph', 'a11y.noDataParagraphStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_intro', 'a11y.screenSummary.playArea.introStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_measure', 'a11y.screenSummary.playArea.measureStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_graphs', 'a11y.screenSummary.playArea.graphsStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_friction', 'a11y.screenSummary.playArea.frictionStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_playArea_playground', 'a11y.screenSummary.playArea.playgroundStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_controlArea_withTrackSelection', 'a11y.screenSummary.controlArea.withTrackSelectionStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_controlArea_withoutTrackSelection', 'a11y.screenSummary.controlArea.withoutTrackSelectionStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_skaterPhrase', 'a11y.screenSummary.currentDetails.skaterPhraseStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_frictionPhrase', 'a11y.screenSummary.currentDetails.frictionPhraseStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_currentDetails_noTrackBuilt', 'a11y.screenSummary.currentDetails.noTrackBuiltStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint_hasTrack', 'a11y.screenSummary.interactionHint.hasTrackStringProperty' );
addToMapIfDefined( 'a11y_screenSummary_interactionHint_noTrack', 'a11y.screenSummary.interactionHint.noTrackStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_experimentSettingsHeading', 'a11y.controlPanel.experimentSettingsHeadingStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_showOptions', 'a11y.keyboardHelpDialog.connectTrackEndpoints.showOptionsStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_moveThroughOptions', 'a11y.keyboardHelpDialog.connectTrackEndpoints.moveThroughOptionsStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_selectOption', 'a11y.keyboardHelpDialog.connectTrackEndpoints.selectOptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_connectTrackEndpoints_cancel', 'a11y.keyboardHelpDialog.connectTrackEndpoints.cancelStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_accessibleName', 'a11y.skaterNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_firstGrabContextResponse', 'a11y.skaterNode.firstGrabContextResponseStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_snapToTrackContextResponse', 'a11y.skaterNode.snapToTrackContextResponseStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_detachFromTrackContextResponse', 'a11y.skaterNode.detachFromTrackContextResponseStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_offScreenContextResponse', 'a11y.skaterNode.offScreenContextResponseStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleHeading', 'a11y.referenceHeightLine.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleName', 'a11y.referenceHeightLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleHelpText', 'a11y.referenceHeightLine.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_aboveGroundPattern', 'a11y.referenceHeightLine.aboveGroundPatternStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_atGroundLevel', 'a11y.referenceHeightLine.atGroundLevelStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_accessibleHeading', 'a11y.toolboxPanel.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_stopwatch_accessibleName', 'a11y.toolboxPanel.stopwatch.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_measuringTape_accessibleName', 'a11y.toolboxPanel.measuringTape.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_stopwatchNode_accessibleHeading', 'a11y.stopwatchNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_measuringTapeNode_accessibleHeading', 'a11y.measuringTapeNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_trackToolboxPanel_accessibleName', 'a11y.trackToolboxPanel.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_accessibleHeading', 'a11y.yourSkatePark.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_accessibleHelpText', 'a11y.yourSkatePark.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_trackPhraseFixed', 'a11y.yourSkatePark.trackPhraseFixedStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_trackPhraseAdjustable', 'a11y.yourSkatePark.trackPhraseAdjustableStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_playgroundTrackPhraseMultiple', 'a11y.yourSkatePark.playgroundTrackPhraseMultipleStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_playgroundTrackPhraseSingle', 'a11y.yourSkatePark.playgroundTrackPhraseSingleStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_playgroundTrackPhraseNone', 'a11y.yourSkatePark.playgroundTrackPhraseNoneStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_trackAndSkaterParagraph', 'a11y.yourSkatePark.trackAndSkaterParagraphStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_skaterOnTrack', 'a11y.yourSkatePark.skaterOnTrackStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_skaterOnTrackWithIndex', 'a11y.yourSkatePark.skaterOnTrackWithIndexStringProperty' );
addToMapIfDefined( 'a11y_yourSkatePark_skaterOffTrack', 'a11y.yourSkatePark.skaterOffTrackStringProperty' );
addToMapIfDefined( 'a11y_trackNode_accessibleHeadingWithIndex', 'a11y.trackNode.accessibleHeadingWithIndexStringProperty' );
addToMapIfDefined( 'a11y_trackNode_accessibleHeading', 'a11y.trackNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_trackNode_accessibleHelpText', 'a11y.trackNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controlPointNode_accessibleName', 'a11y.controlPointNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointNode_accessibleObjectResponse', 'a11y.controlPointNode.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_eraseTracksButton_accessibleName', 'a11y.eraseTracksButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraseTracksButton_accessibleContextResponse', 'a11y.eraseTracksButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_grabSkaterButton_accessibleHelpText', 'a11y.grabSkaterButton.accessibleHelpTextStringProperty' );
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
addToMapIfDefined( 'a11y_energyGraph_checkedEnergiesListOne', 'a11y.energyGraph.checkedEnergiesListOneStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_checkedEnergiesListTwo', 'a11y.energyGraph.checkedEnergiesListTwoStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_checkedEnergiesListThree', 'a11y.energyGraph.checkedEnergiesListThreeStringProperty' );
addToMapIfDefined( 'a11y_energyGraph_checkedEnergiesListFour', 'a11y.energyGraph.checkedEnergiesListFourStringProperty' );
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
addToMapIfDefined( 'a11y_trackSelectionRadioButtonGroup_accessibleName', 'a11y.trackSelectionRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackSelectionRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.trackSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackSelectionRadioButtonGroup_rampRadioButton_accessibleName', 'a11y.trackSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackSelectionRadioButtonGroup_doubleWellRadioButton_accessibleName', 'a11y.trackSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackSelectionRadioButtonGroup_loopRadioButton_accessibleName', 'a11y.trackSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_frictionSlider_accessibleHelpText', 'a11y.frictionSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravitySlider_accessibleHelpText', 'a11y.gravitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityControl_accessibleHelpText', 'a11y.gravityControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityControl_accessibleValuePattern', 'a11y.gravityControl.accessibleValuePatternStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleName', 'a11y.gravityComboBox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleHelpText', 'a11y.gravityComboBox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_gravityValuePattern', 'a11y.gravityComboBox.gravityValuePatternStringProperty' );
addToMapIfDefined( 'a11y_gravityComboBox_accessibleContextResponse', 'a11y.gravityComboBox.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_massSlider_accessibleHelpText', 'a11y.massSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_massControl_accessibleHelpText', 'a11y.massControl.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_massControl_accessibleValuePattern', 'a11y.massControl.accessibleValuePatternStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_accessibleName', 'a11y.skaterSelectionControls.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_accessibleHelpText', 'a11y.skaterSelectionControls.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater1RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater1RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater2RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater2RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater3RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater3RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater4RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater4RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater5RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater5RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_skater6RadioButton_accessibleName', 'a11y.skaterSelectionControls.skater6RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_animal1RadioButton_accessibleName', 'a11y.skaterSelectionControls.animal1RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterSelectionControls_animal2RadioButton_accessibleName', 'a11y.skaterSelectionControls.animal2RadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseChecked', 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseUnchecked', 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleHelpText', 'a11y.referenceHeightCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleContextResponseChecked', 'a11y.referenceHeightCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightCheckbox_accessibleContextResponseUnchecked', 'a11y.referenceHeightCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_restartSkaterButton_accessibleHelpText', 'a11y.restartSkaterButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleName', 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleHelpText', 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleContextResponse', 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToGroundButton_accessibleName', 'a11y.returnSkaterToGroundButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_returnSkaterToGroundButton_accessibleContextResponse', 'a11y.returnSkaterToGroundButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_intro_accessibleHelpText', 'a11y.screenButtons.intro.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_measure_accessibleHelpText', 'a11y.screenButtons.measure.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_graphs_accessibleHelpText', 'a11y.screenButtons.graphs.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screenButtons_playground_accessibleHelpText', 'a11y.screenButtons.playground.accessibleHelpTextStringProperty' );
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
    newtonsPerKilogramStringProperty: _.get( EnergySkateParkStrings, 'preferences.newtonsPerKilogramStringProperty' ),
    patternsStringProperty: _.get( EnergySkateParkStrings, 'preferences.patternsStringProperty' ),
    patternsDescriptionStringProperty: _.get( EnergySkateParkStrings, 'preferences.patternsDescriptionStringProperty' )
  },
  keyboardHelpDialog: {
    skaterControlsStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.skaterControlsStringProperty' ),
    fromAnywhereInScreenStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.fromAnywhereInScreenStringProperty' ),
    grabOrReleaseStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.grabOrReleaseStringProperty' ),
    moveAlongTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveAlongTrackStringProperty' ),
    attachToTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.attachToTrackStringProperty' ),
    detachFromTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.detachFromTrackStringProperty' ),
    moveToStartOfTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveToStartOfTrackStringProperty' ),
    moveToEndOfTrackStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveToEndOfTrackStringProperty' ),
    jumpToSkaterStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.jumpToSkaterStringProperty' ),
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
    controlPointAttachment: {
      noConnectionsAvailableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPointAttachment_noConnectionsAvailable', _.get( EnergySkateParkStrings, 'a11y.controlPointAttachment.noConnectionsAvailableStringProperty' ) )
    },
    noDataParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_noDataParagraph', _.get( EnergySkateParkStrings, 'a11y.noDataParagraphStringProperty' ) ),
    screenSummary: {
      playArea: {
        introStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_intro', _.get( EnergySkateParkStrings, 'a11y.screenSummary.playArea.introStringProperty' ) ),
        measureStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_measure', _.get( EnergySkateParkStrings, 'a11y.screenSummary.playArea.measureStringProperty' ) ),
        graphsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_graphs', _.get( EnergySkateParkStrings, 'a11y.screenSummary.playArea.graphsStringProperty' ) ),
        frictionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_friction', _.get( EnergySkateParkStrings, 'a11y.screenSummary.playArea.frictionStringProperty' ) ),
        playgroundStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_playArea_playground', _.get( EnergySkateParkStrings, 'a11y.screenSummary.playArea.playgroundStringProperty' ) )
      },
      controlArea: {
        withTrackSelectionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_controlArea_withTrackSelection', _.get( EnergySkateParkStrings, 'a11y.screenSummary.controlArea.withTrackSelectionStringProperty' ) ),
        withoutTrackSelectionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_controlArea_withoutTrackSelection', _.get( EnergySkateParkStrings, 'a11y.screenSummary.controlArea.withoutTrackSelectionStringProperty' ) )
      },
      currentDetails: {
        skaterPhrase: new FluentPattern<{ motion: 'inMotion' | 'atRest' | TReadOnlyProperty<'inMotion' | 'atRest'>, onTrack: 'on' | 'off' | TReadOnlyProperty<'on' | 'off'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_skaterPhrase', _.get( EnergySkateParkStrings, 'a11y.screenSummary.currentDetails.skaterPhraseStringProperty' ), [{"name":"motion","variants":["inMotion","atRest"]},{"name":"onTrack","variants":["on","off"]}] ),
        frictionPhrase: new FluentPattern<{ hasFriction: 'true' | 'false' | TReadOnlyProperty<'true' | 'false'> }>( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_frictionPhrase', _.get( EnergySkateParkStrings, 'a11y.screenSummary.currentDetails.frictionPhraseStringProperty' ), [{"name":"hasFriction","variants":["true","false"]}] ),
        noTrackBuiltStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_currentDetails_noTrackBuilt', _.get( EnergySkateParkStrings, 'a11y.screenSummary.currentDetails.noTrackBuiltStringProperty' ) )
      },
      interactionHint: {
        hasTrackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint_hasTrack', _.get( EnergySkateParkStrings, 'a11y.screenSummary.interactionHint.hasTrackStringProperty' ) ),
        noTrackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary_interactionHint_noTrack', _.get( EnergySkateParkStrings, 'a11y.screenSummary.interactionHint.noTrackStringProperty' ) )
      }
    },
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
      firstGrabContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_firstGrabContextResponse', _.get( EnergySkateParkStrings, 'a11y.skaterNode.firstGrabContextResponseStringProperty' ) ),
      snapToTrackContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_snapToTrackContextResponse', _.get( EnergySkateParkStrings, 'a11y.skaterNode.snapToTrackContextResponseStringProperty' ) ),
      detachFromTrackContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_detachFromTrackContextResponse', _.get( EnergySkateParkStrings, 'a11y.skaterNode.detachFromTrackContextResponseStringProperty' ) ),
      offScreenContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterNode_offScreenContextResponse', _.get( EnergySkateParkStrings, 'a11y.skaterNode.offScreenContextResponseStringProperty' ) )
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
    stopwatchNode: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_stopwatchNode_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.stopwatchNode.accessibleHeadingStringProperty' ) )
    },
    measuringTapeNode: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_measuringTapeNode_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.measuringTapeNode.accessibleHeadingStringProperty' ) )
    },
    trackToolboxPanel: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackToolboxPanel_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackToolboxPanel.accessibleNameStringProperty' ) )
    },
    yourSkatePark: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yourSkatePark_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yourSkatePark_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.accessibleHelpTextStringProperty' ) ),
      trackPhraseFixed: new FluentPattern<{ trackShape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_trackPhraseFixed', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.trackPhraseFixedStringProperty' ), [{"name":"trackShape"}] ),
      trackPhraseAdjustable: new FluentPattern<{ numberControlPoints: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, trackShape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_trackPhraseAdjustable', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.trackPhraseAdjustableStringProperty' ), [{"name":"numberControlPoints","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"trackShape"}] ),
      playgroundTrackPhraseMultiple: new FluentPattern<{ numberControlPoints: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'>, numberTracks: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_playgroundTrackPhraseMultiple', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.playgroundTrackPhraseMultipleStringProperty' ), [{"name":"numberControlPoints","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]},{"name":"numberTracks"}] ),
      playgroundTrackPhraseSingle: new FluentPattern<{ numberControlPoints: number | 'one' | number | 'other' | TReadOnlyProperty<number | 'one' | number | 'other'> }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_playgroundTrackPhraseSingle', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.playgroundTrackPhraseSingleStringProperty' ), [{"name":"numberControlPoints","variants":[{"type":"number","value":"one"},{"type":"number","value":"other"}]}] ),
      playgroundTrackPhraseNoneStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yourSkatePark_playgroundTrackPhraseNone', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.playgroundTrackPhraseNoneStringProperty' ) ),
      trackAndSkaterParagraph: new FluentPattern<{ skaterPhrase: FluentVariable, trackPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_trackAndSkaterParagraph', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.trackAndSkaterParagraphStringProperty' ), [{"name":"skaterPhrase"},{"name":"trackPhrase"}] ),
      skaterOnTrackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yourSkatePark_skaterOnTrack', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.skaterOnTrackStringProperty' ) ),
      skaterOnTrackWithIndex: new FluentPattern<{ index: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yourSkatePark_skaterOnTrackWithIndex', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.skaterOnTrackWithIndexStringProperty' ), [{"name":"index"}] ),
      skaterOffTrackStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yourSkatePark_skaterOffTrack', _.get( EnergySkateParkStrings, 'a11y.yourSkatePark.skaterOffTrackStringProperty' ) )
    },
    trackNode: {
      accessibleHeadingWithIndex: new FluentPattern<{ index: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_trackNode_accessibleHeadingWithIndex', _.get( EnergySkateParkStrings, 'a11y.trackNode.accessibleHeadingWithIndexStringProperty' ), [{"name":"index"}] ),
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackNode_accessibleHeading', _.get( EnergySkateParkStrings, 'a11y.trackNode.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackNode_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.trackNode.accessibleHelpTextStringProperty' ) )
    },
    controlPointNode: {
      accessibleName: new FluentPattern<{ index: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controlPointNode_accessibleName', _.get( EnergySkateParkStrings, 'a11y.controlPointNode.accessibleNameStringProperty' ), [{"name":"index"}] ),
      accessibleObjectResponse: new FluentPattern<{ xCoordinate: FluentVariable, yCoordinate: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controlPointNode_accessibleObjectResponse', _.get( EnergySkateParkStrings, 'a11y.controlPointNode.accessibleObjectResponseStringProperty' ), [{"name":"xCoordinate"},{"name":"yCoordinate"}] )
    },
    eraseTracksButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseTracksButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.eraseTracksButton.accessibleNameStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraseTracksButton_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.eraseTracksButton.accessibleContextResponseStringProperty' ) )
    },
    grabSkaterButton: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_grabSkaterButton_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.grabSkaterButton.accessibleHelpTextStringProperty' ) )
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
      _comment_0: new FluentComment( {"comment":"Translatable list formatting for checked energy types (max 4 items).","associatedKey":"checkedEnergiesListOne"} ),
      _comment_1: new FluentComment( {"comment":"Each language can define its own conjunction and comma patterns.","associatedKey":"checkedEnergiesListOne"} ),
      checkedEnergiesListOne: new FluentPattern<{ item1: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_checkedEnergiesListOne', _.get( EnergySkateParkStrings, 'a11y.energyGraph.checkedEnergiesListOneStringProperty' ), [{"name":"item1"}] ),
      checkedEnergiesListTwo: new FluentPattern<{ item1: FluentVariable, item2: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_checkedEnergiesListTwo', _.get( EnergySkateParkStrings, 'a11y.energyGraph.checkedEnergiesListTwoStringProperty' ), [{"name":"item1"},{"name":"item2"}] ),
      checkedEnergiesListThree: new FluentPattern<{ item1: FluentVariable, item2: FluentVariable, item3: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_checkedEnergiesListThree', _.get( EnergySkateParkStrings, 'a11y.energyGraph.checkedEnergiesListThreeStringProperty' ), [{"name":"item1"},{"name":"item2"},{"name":"item3"}] ),
      checkedEnergiesListFour: new FluentPattern<{ item1: FluentVariable, item2: FluentVariable, item3: FluentVariable, item4: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_energyGraph_checkedEnergiesListFour', _.get( EnergySkateParkStrings, 'a11y.energyGraph.checkedEnergiesListFourStringProperty' ), [{"name":"item1"},{"name":"item2"},{"name":"item3"},{"name":"item4"}] ),
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
    trackSelectionRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackSelectionRadioButtonGroup_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackSelectionRadioButtonGroup.accessibleNameStringProperty' ) ),
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackSelectionRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackSelectionRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) )
      },
      rampRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackSelectionRadioButtonGroup_rampRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackSelectionRadioButtonGroup.rampRadioButton.accessibleNameStringProperty' ) )
      },
      doubleWellRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackSelectionRadioButtonGroup_doubleWellRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackSelectionRadioButtonGroup.doubleWellRadioButton.accessibleNameStringProperty' ) )
      },
      loopRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_trackSelectionRadioButtonGroup_loopRadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.trackSelectionRadioButtonGroup.loopRadioButton.accessibleNameStringProperty' ) )
      }
    },
    frictionSlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_frictionSlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.frictionSlider.accessibleHelpTextStringProperty' ) )
    },
    _comment_0: new FluentComment( {"comment":"Gravity and Mass controls are either a Slider or a NumberControl. Help text depends on which type of control.","associatedKey":"gravitySlider"} ),
    gravitySlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravitySlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravitySlider.accessibleHelpTextStringProperty' ) )
    },
    gravityControl: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityControl_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravityControl.accessibleHelpTextStringProperty' ) ),
      accessibleValuePattern: new FluentPattern<{ units: 'metersPerSecondSquared' | 'newtonsPerKilogram' | TReadOnlyProperty<'metersPerSecondSquared' | 'newtonsPerKilogram'>, value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gravityControl_accessibleValuePattern', _.get( EnergySkateParkStrings, 'a11y.gravityControl.accessibleValuePatternStringProperty' ), [{"name":"units","variants":["metersPerSecondSquared","newtonsPerKilogram"]},{"name":"value"}] )
    },
    gravityComboBox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleName', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleHelpTextStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Gravity value with units for screen reader context responses. Example: \"9.8 meters per second squared\"","associatedKey":"gravityValuePattern"} ),
      gravityValuePattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gravityComboBox_gravityValuePattern', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.gravityValuePatternStringProperty' ), [{"name":"value"}] ),
      _comment_1: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
      accessibleContextResponse: new FluentPattern<{ gravityValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_gravityComboBox_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.gravityComboBox.accessibleContextResponseStringProperty' ), [{"name":"gravityValue"}] )
    },
    massSlider: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_massSlider_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.massSlider.accessibleHelpTextStringProperty' ) )
    },
    massControl: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_massControl_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.massControl.accessibleHelpTextStringProperty' ) ),
      accessibleValuePattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_massControl_accessibleValuePattern', _.get( EnergySkateParkStrings, 'a11y.massControl.accessibleValuePatternStringProperty' ), [{"name":"value"}] )
    },
    skaterSelectionControls: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.accessibleHelpTextStringProperty' ) ),
      skater1RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater1RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater1RadioButton.accessibleNameStringProperty' ) )
      },
      skater2RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater2RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater2RadioButton.accessibleNameStringProperty' ) )
      },
      skater3RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater3RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater3RadioButton.accessibleNameStringProperty' ) )
      },
      skater4RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater4RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater4RadioButton.accessibleNameStringProperty' ) )
      },
      skater5RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater5RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater5RadioButton.accessibleNameStringProperty' ) )
      },
      skater6RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_skater6RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.skater6RadioButton.accessibleNameStringProperty' ) )
      },
      animal1RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_animal1RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.animal1RadioButton.accessibleNameStringProperty' ) )
      },
      animal2RadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_skaterSelectionControls_animal2RadioButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.skaterSelectionControls.animal2RadioButton.accessibleNameStringProperty' ) )
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
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleHelpText', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleHelpTextStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToPreviousStartingPositionButton_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToPreviousStartingPositionButton.accessibleContextResponseStringProperty' ) )
    },
    returnSkaterToGroundButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToGroundButton_accessibleName', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToGroundButton.accessibleNameStringProperty' ) ),
      _comment_0: new FluentComment( {"comment":"Context response stating g value when user interacts with ComboBox. Example for Earth: Gravity now 9.8 meters per second squared.","associatedKey":"accessibleContextResponse"} ),
      accessibleContextResponseStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_returnSkaterToGroundButton_accessibleContextResponse', _.get( EnergySkateParkStrings, 'a11y.returnSkaterToGroundButton.accessibleContextResponseStringProperty' ) )
    },
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
