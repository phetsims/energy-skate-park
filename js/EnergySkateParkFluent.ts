// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from energy-skate-park-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
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
addToMapIfDefined( 'preferences_metersPerSecondSquared', 'preferences.metersPerSecondSquaredStringProperty' );
addToMapIfDefined( 'preferences_newtonsPerKilogram', 'preferences.newtonsPerKilogramStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_skaterControls', 'keyboardHelpDialog.skaterControlsStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveSkater', 'keyboardHelpDialog.moveSkaterStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveSkaterSlower', 'keyboardHelpDialog.moveSkaterSlowerStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveAlongTrack', 'keyboardHelpDialog.moveAlongTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_detachFromTrack', 'keyboardHelpDialog.detachFromTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_attachToTrack', 'keyboardHelpDialog.attachToTrackStringProperty' );
addToMapIfDefined( 'keyboardHelpDialog_moveReferenceHeight', 'keyboardHelpDialog.moveReferenceHeightStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_accessibleName', 'a11y.skaterNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_onTrackHelpText', 'a11y.skaterNode.onTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_skaterNode_offTrackHelpText', 'a11y.skaterNode.offTrackHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_accessibleName', 'a11y.referenceHeightLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceHeightLine_helpText', 'a11y.referenceHeightLine.helpTextStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_stopwatch_accessibleName', 'a11y.toolboxPanel.stopwatch.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_toolboxPanel_measuringTape_accessibleName', 'a11y.toolboxPanel.measuringTape.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_trackToolboxPanel_accessibleName', 'a11y.trackToolboxPanel.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointNode_accessibleName', 'a11y.controlPointNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_pathSensorNode_accessibleName', 'a11y.pathSensorNode.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_energyChart_accessibleName', 'a11y.energyChart.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_controlPointAttachment_left', 'a11y.controlPointAttachment.leftStringProperty' );
addToMapIfDefined( 'a11y_controlPointAttachment_right', 'a11y.controlPointAttachment.rightStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveSkaterDescription', 'a11y.keyboardHelpDialog.moveSkaterDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveAlongTrackDescription', 'a11y.keyboardHelpDialog.moveAlongTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_detachFromTrackDescription', 'a11y.keyboardHelpDialog.detachFromTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_attachToTrackDescription', 'a11y.keyboardHelpDialog.attachToTrackDescriptionStringProperty' );
addToMapIfDefined( 'a11y_keyboardHelpDialog_moveReferenceHeightDescription', 'a11y.keyboardHelpDialog.moveReferenceHeightDescriptionStringProperty' );

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
    moveReferenceHeightStringProperty: _.get( EnergySkateParkStrings, 'keyboardHelpDialog.moveReferenceHeightStringProperty' )
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
    keyboardHelpDialog: {
      moveSkaterDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveSkaterDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveSkaterDescriptionStringProperty' ) ),
      moveAlongTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveAlongTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveAlongTrackDescriptionStringProperty' ) ),
      detachFromTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_detachFromTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.detachFromTrackDescriptionStringProperty' ) ),
      attachToTrackDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_attachToTrackDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.attachToTrackDescriptionStringProperty' ) ),
      moveReferenceHeightDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_keyboardHelpDialog_moveReferenceHeightDescription', _.get( EnergySkateParkStrings, 'a11y.keyboardHelpDialog.moveReferenceHeightDescriptionStringProperty' ) )
    }
  }
};

export default EnergySkateParkFluent;

energySkatePark.register('EnergySkateParkFluent', EnergySkateParkFluent);
