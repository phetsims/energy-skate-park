// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import energySkatePark from './energySkatePark.js';

type StringsType = {
  'energy-skate-park': {
    'titleStringProperty': LinkableProperty<string>;
  };
  'physicalControls': {
    'gravityControls': {
      'gravityStringProperty': LinkableProperty<string>;
      'earthStringProperty': LinkableProperty<string>;
      'jupiterStringProperty': LinkableProperty<string>;
      'moonStringProperty': LinkableProperty<string>;
      'gravityMetersPerSecondSquaredPatternStringProperty': LinkableProperty<string>;
      'gravityNewtonsPerKilogramPatternStringProperty': LinkableProperty<string>;
    };
    'massControls': {
      'massStringProperty': LinkableProperty<string>;
      'massKilogramsPatternStringProperty': LinkableProperty<string>;
    };
    'frictionStringProperty': LinkableProperty<string>;
    'customStringProperty': LinkableProperty<string>;
    'smallStringProperty': LinkableProperty<string>;
    'largeStringProperty': LinkableProperty<string>;
    'lotsStringProperty': LinkableProperty<string>;
    'noneStringProperty': LinkableProperty<string>;
    'tinyStringProperty': LinkableProperty<string>;
  };
  'energies': {
    'thermalStringProperty': LinkableProperty<string>;
    'totalStringProperty': LinkableProperty<string>;
    'kineticStringProperty': LinkableProperty<string>;
    'potentialStringProperty': LinkableProperty<string>;
    'energyStringProperty': LinkableProperty<string>;
  };
  'plots': {
    'barGraph': {
      'labelStringProperty': LinkableProperty<string>;
    };
    'energyGraph': {
      'labelStringProperty': LinkableProperty<string>;
    };
    'pieChart': {
      'labelStringProperty': LinkableProperty<string>;
    };
    'timeSwitchLabelStringProperty': LinkableProperty<string>;
    'positionSwitchLabelStringProperty': LinkableProperty<string>;
    'timeLabelStringProperty': LinkableProperty<string>;
    'positionLabelStringProperty': LinkableProperty<string>;
    'energyLabelStringProperty': LinkableProperty<string>;
  };
  'visibilityControls': {
    'gridStringProperty': LinkableProperty<string>;
    'referenceHeightStringProperty': LinkableProperty<string>;
    'pathStringProperty': LinkableProperty<string>;
    'speedStringProperty': LinkableProperty<string>;
  };
  'skaterControls': {
    'labelStringProperty': LinkableProperty<string>;
    'skater1MassPatternStringProperty': LinkableProperty<string>;
    'skater2MassPatternStringProperty': LinkableProperty<string>;
    'skater3MassPatternStringProperty': LinkableProperty<string>;
    'skater4MassPatternStringProperty': LinkableProperty<string>;
    'skater5MassPatternStringProperty': LinkableProperty<string>;
    'dogMassPatternStringProperty': LinkableProperty<string>;
    'restartSkaterStringProperty': LinkableProperty<string>;
  };
  'trackControls': {
    'stickToTrackStringProperty': LinkableProperty<string>;
  };
  'screens': {
    'introStringProperty': LinkableProperty<string>;
    'graphsStringProperty': LinkableProperty<string>;
    'playgroundStringProperty': LinkableProperty<string>;
    'measureStringProperty': LinkableProperty<string>;
  };
  'heightLabels': {
    'zeroMStringProperty': LinkableProperty<string>;
    'heightEqualsZeroStringProperty': LinkableProperty<string>;
  };
  'pathSensor': {
    'energyJoulesPatternStringProperty': LinkableProperty<string>;
    'heightMetersPatternStringProperty': LinkableProperty<string>;
    'speedMetersPerSecondPatternStringProperty': LinkableProperty<string>;
  };
  'speedometer': {
    'labelStringProperty': LinkableProperty<string>;
    'metersPerSecondPatternStringProperty': LinkableProperty<string>;
  };
  'measuringTape': {
    'unitsStringProperty': LinkableProperty<string>;
  }
};

const EnergySkateParkStrings = getStringModule( 'ENERGY_SKATE_PARK' ) as StringsType;

energySkatePark.register( 'EnergySkateParkStrings', EnergySkateParkStrings );

export default EnergySkateParkStrings;
