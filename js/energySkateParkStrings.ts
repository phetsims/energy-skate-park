// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import energySkatePark from './energySkatePark.js';

type StringsType = {
  'energy-skate-park': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'physicalControls': {
    'gravityControls': {
      'gravity': string;
      'gravityStringProperty': TReadOnlyProperty<string>;
      'earth': string;
      'earthStringProperty': TReadOnlyProperty<string>;
      'jupiter': string;
      'jupiterStringProperty': TReadOnlyProperty<string>;
      'moon': string;
      'moonStringProperty': TReadOnlyProperty<string>;
      'gravityMetersPerSecondSquaredPattern': string;
      'gravityMetersPerSecondSquaredPatternStringProperty': TReadOnlyProperty<string>;
      'gravityNewtonsPerKilogramPattern': string;
      'gravityNewtonsPerKilogramPatternStringProperty': TReadOnlyProperty<string>;
    };
    'massControls': {
      'mass': string;
      'massStringProperty': TReadOnlyProperty<string>;
      'massKilogramsPattern': string;
      'massKilogramsPatternStringProperty': TReadOnlyProperty<string>;
    };
    'friction': string;
    'frictionStringProperty': TReadOnlyProperty<string>;
    'custom': string;
    'customStringProperty': TReadOnlyProperty<string>;
    'small': string;
    'smallStringProperty': TReadOnlyProperty<string>;
    'large': string;
    'largeStringProperty': TReadOnlyProperty<string>;
    'lots': string;
    'lotsStringProperty': TReadOnlyProperty<string>;
    'none': string;
    'noneStringProperty': TReadOnlyProperty<string>;
    'tiny': string;
    'tinyStringProperty': TReadOnlyProperty<string>;
  };
  'energies': {
    'thermal': string;
    'thermalStringProperty': TReadOnlyProperty<string>;
    'total': string;
    'totalStringProperty': TReadOnlyProperty<string>;
    'kinetic': string;
    'kineticStringProperty': TReadOnlyProperty<string>;
    'potential': string;
    'potentialStringProperty': TReadOnlyProperty<string>;
    'energy': string;
    'energyStringProperty': TReadOnlyProperty<string>;
  };
  'plots': {
    'barGraph': {
      'label': string;
      'labelStringProperty': TReadOnlyProperty<string>;
    };
    'energyGraph': {
      'label': string;
      'labelStringProperty': TReadOnlyProperty<string>;
    };
    'pieChart': {
      'label': string;
      'labelStringProperty': TReadOnlyProperty<string>;
    };
    'timeSwitchLabel': string;
    'timeSwitchLabelStringProperty': TReadOnlyProperty<string>;
    'positionSwitchLabel': string;
    'positionSwitchLabelStringProperty': TReadOnlyProperty<string>;
    'timeLabel': string;
    'timeLabelStringProperty': TReadOnlyProperty<string>;
    'positionLabel': string;
    'positionLabelStringProperty': TReadOnlyProperty<string>;
    'energyLabel': string;
    'energyLabelStringProperty': TReadOnlyProperty<string>;
  };
  'visibilityControls': {
    'grid': string;
    'gridStringProperty': TReadOnlyProperty<string>;
    'referenceHeight': string;
    'referenceHeightStringProperty': TReadOnlyProperty<string>;
    'path': string;
    'pathStringProperty': TReadOnlyProperty<string>;
    'speed': string;
    'speedStringProperty': TReadOnlyProperty<string>;
  };
  'skaterControls': {
    'label': string;
    'labelStringProperty': TReadOnlyProperty<string>;
    'skater1MassPattern': string;
    'skater1MassPatternStringProperty': TReadOnlyProperty<string>;
    'skater2MassPattern': string;
    'skater2MassPatternStringProperty': TReadOnlyProperty<string>;
    'skater3MassPattern': string;
    'skater3MassPatternStringProperty': TReadOnlyProperty<string>;
    'skater4MassPattern': string;
    'skater4MassPatternStringProperty': TReadOnlyProperty<string>;
    'skater5MassPattern': string;
    'skater5MassPatternStringProperty': TReadOnlyProperty<string>;
    'dogMassPattern': string;
    'dogMassPatternStringProperty': TReadOnlyProperty<string>;
    'restartSkater': string;
    'restartSkaterStringProperty': TReadOnlyProperty<string>;
  };
  'trackControls': {
    'stickToTrack': string;
    'stickToTrackStringProperty': TReadOnlyProperty<string>;
  };
  'screens': {
    'intro': string;
    'introStringProperty': TReadOnlyProperty<string>;
    'graphs': string;
    'graphsStringProperty': TReadOnlyProperty<string>;
    'playground': string;
    'playgroundStringProperty': TReadOnlyProperty<string>;
    'measure': string;
    'measureStringProperty': TReadOnlyProperty<string>;
  };
  'heightLabels': {
    'zeroM': string;
    'zeroMStringProperty': TReadOnlyProperty<string>;
    'heightEqualsZero': string;
    'heightEqualsZeroStringProperty': TReadOnlyProperty<string>;
  };
  'pathSensor': {
    'energyJoulesPattern': string;
    'energyJoulesPatternStringProperty': TReadOnlyProperty<string>;
    'heightMetersPattern': string;
    'heightMetersPatternStringProperty': TReadOnlyProperty<string>;
    'speedMetersPerSecondPattern': string;
    'speedMetersPerSecondPatternStringProperty': TReadOnlyProperty<string>;
  };
  'speedometer': {
    'label': string;
    'labelStringProperty': TReadOnlyProperty<string>;
    'metersPerSecondPattern': string;
    'metersPerSecondPatternStringProperty': TReadOnlyProperty<string>;
  };
  'measuringTape': {
    'units': string;
    'unitsStringProperty': TReadOnlyProperty<string>;
  }
};

const energySkateParkStrings = getStringModule( 'ENERGY_SKATE_PARK' ) as StringsType;

energySkatePark.register( 'energySkateParkStrings', energySkateParkStrings );

export default energySkateParkStrings;
