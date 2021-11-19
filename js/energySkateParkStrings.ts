// Copyright 2021, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import energySkatePark from './energySkatePark.js';

type StringsType = {
  'energy-skate-park': {
    'title': string
  },
  'physicalControls': {
    'gravityControls': {
      'gravity': string,
      'earth': string,
      'jupiter': string,
      'moon': string,
      'gravityMetersPerSecondSquaredPattern': string,
      'gravityNewtonsPerKilogramPattern': string
    },
    'massControls': {
      'mass': string,
      'massKilogramsPattern': string
    },
    'friction': string,
    'custom': string,
    'small': string,
    'large': string,
    'lots': string,
    'none': string,
    'tiny': string
  },
  'energies': {
    'thermal': string,
    'total': string,
    'kinetic': string,
    'potential': string,
    'energy': string
  },
  'plots': {
    'barGraph': {
      'label': string
    },
    'energyGraph': {
      'label': string
    },
    'pieChart': {
      'label': string
    },
    'timeSwitchLabel': string,
    'positionSwitchLabel': string,
    'timeLabel': string,
    'positionLabel': string,
    'energyLabel': string
  },
  'visibilityControls': {
    'grid': string,
    'referenceHeight': string,
    'path': string,
    'speed': string
  },
  'skaterControls': {
    'label': string,
    'skater1MassPattern': string,
    'skater2MassPattern': string,
    'skater3MassPattern': string,
    'skater4MassPattern': string,
    'skater5MassPattern': string,
    'dogMassPattern': string,
    'restartSkater': string
  },
  'trackControls': {
    'stickToTrack': string
  },
  'screens': {
    'intro': string,
    'graphs': string,
    'playground': string,
    'measure': string
  },
  'heightLabels': {
    'zeroM': string,
    'heightEqualsZero': string
  },
  'pathSensor': {
    'energyJoulesPattern': string,
    'heightMetersPattern': string,
    'speedMetersPerSecondPattern': string
  },
  'speedometer': {
    'label': string,
    'metersPerSecondPattern': string
  },
  'measuringTape': {
    'units': string
  }
};

const energySkateParkStrings = getStringModule( 'ENERGY_SKATE_PARK' ) as StringsType;

energySkatePark.register( 'energySkateParkStrings', energySkateParkStrings );

export default energySkateParkStrings;
