// Copyright 2021-2026, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import energySkatePark from './energySkatePark.js';

type StringsType = {
  'energy-skate-park': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screens': {
    'introStringProperty': LocalizedStringProperty;
    'graphsStringProperty': LocalizedStringProperty;
    'playgroundStringProperty': LocalizedStringProperty;
    'measureStringProperty': LocalizedStringProperty;
  };
  'physicalControls': {
    'gravityControls': {
      'gravityStringProperty': LocalizedStringProperty;
      'earthStringProperty': LocalizedStringProperty;
      'jupiterStringProperty': LocalizedStringProperty;
      'moonStringProperty': LocalizedStringProperty;
      'gravityMetersPerSecondSquaredPatternStringProperty': LocalizedStringProperty;
      'gravityNewtonsPerKilogramPatternStringProperty': LocalizedStringProperty;
    };
    'massControls': {
      'massStringProperty': LocalizedStringProperty;
      'massKilogramsPatternStringProperty': LocalizedStringProperty;
    };
    'frictionStringProperty': LocalizedStringProperty;
    'customStringProperty': LocalizedStringProperty;
    'smallStringProperty': LocalizedStringProperty;
    'largeStringProperty': LocalizedStringProperty;
    'lotsStringProperty': LocalizedStringProperty;
    'noneStringProperty': LocalizedStringProperty;
    'tinyStringProperty': LocalizedStringProperty;
  };
  'energies': {
    'thermalStringProperty': LocalizedStringProperty;
    'totalStringProperty': LocalizedStringProperty;
    'kineticStringProperty': LocalizedStringProperty;
    'potentialStringProperty': LocalizedStringProperty;
    'energyStringProperty': LocalizedStringProperty;
  };
  'plots': {
    'barGraph': {
      'labelStringProperty': LocalizedStringProperty;
    };
    'energyGraph': {
      'labelStringProperty': LocalizedStringProperty;
    };
    'pieChart': {
      'labelStringProperty': LocalizedStringProperty;
    };
    'timeSwitchLabelStringProperty': LocalizedStringProperty;
    'positionSwitchLabelStringProperty': LocalizedStringProperty;
    'timeLabelStringProperty': LocalizedStringProperty;
    'positionLabelStringProperty': LocalizedStringProperty;
    'energyLabelStringProperty': LocalizedStringProperty;
  };
  'visibilityControls': {
    'gridStringProperty': LocalizedStringProperty;
    'referenceHeightStringProperty': LocalizedStringProperty;
    'pathStringProperty': LocalizedStringProperty;
    'speedStringProperty': LocalizedStringProperty;
  };
  'skaterControls': {
    'labelStringProperty': LocalizedStringProperty;
    'skater1MassPatternStringProperty': LocalizedStringProperty;
    'restartSkaterStringProperty': LocalizedStringProperty;
  };
  'trackControls': {
    'stickToTrackStringProperty': LocalizedStringProperty;
  };
  'heightLabels': {
    'zeroMStringProperty': LocalizedStringProperty;
    'heightEqualsZeroStringProperty': LocalizedStringProperty;
  };
  'pathSensor': {
    'energyJoulesPatternStringProperty': LocalizedStringProperty;
    'heightMetersPatternStringProperty': LocalizedStringProperty;
    'speedMetersPerSecondPatternStringProperty': LocalizedStringProperty;
  };
  'speedometer': {
    'labelStringProperty': LocalizedStringProperty;
    'metersPerSecondPatternStringProperty': LocalizedStringProperty;
  };
  'measuringTape': {
    'unitsStringProperty': LocalizedStringProperty;
  };
  'preferences': {
    'accelerationUnitsStringProperty': LocalizedStringProperty;
    'accelerationUnitsDescriptionStringProperty': LocalizedStringProperty;
    'metersPerSecondSquaredStringProperty': LocalizedStringProperty;
    'newtonsPerKilogramStringProperty': LocalizedStringProperty;
  };
  'keyboardHelpDialog': {
    'skaterControlsStringProperty': LocalizedStringProperty;
    'moveSkaterStringProperty': LocalizedStringProperty;
    'moveSkaterSlowerStringProperty': LocalizedStringProperty;
    'moveAlongTrackStringProperty': LocalizedStringProperty;
    'detachFromTrackStringProperty': LocalizedStringProperty;
    'attachToTrackStringProperty': LocalizedStringProperty;
    'moveReferenceHeightStringProperty': LocalizedStringProperty;
    'simShortcutsStringProperty': LocalizedStringProperty;
    'restartSkaterStringProperty': LocalizedStringProperty;
  };
  'a11y': {
    'skaterNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'onTrackHelpTextStringProperty': LocalizedStringProperty;
      'offTrackHelpTextStringProperty': LocalizedStringProperty;
    };
    'referenceHeightLine': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'helpTextStringProperty': LocalizedStringProperty;
    };
    'toolboxPanel': {
      'stopwatch': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'measuringTape': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      }
    };
    'trackToolboxPanel': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'controlPointNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'pathSensorNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'energyChart': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'controlPointAttachment': {
      'leftStringProperty': LocalizedStringProperty;
      'rightStringProperty': LocalizedStringProperty;
    };
    'preferences': {
      'metersPerSecondSquaredRadioButtonStringProperty': LocalizedStringProperty;
      'newtonsPerKilogramRadioButtonStringProperty': LocalizedStringProperty;
    };
    'keyboardHelpDialog': {
      'moveSkaterDescriptionStringProperty': LocalizedStringProperty;
      'moveAlongTrackDescriptionStringProperty': LocalizedStringProperty;
      'detachFromTrackDescriptionStringProperty': LocalizedStringProperty;
      'attachToTrackDescriptionStringProperty': LocalizedStringProperty;
      'moveReferenceHeightDescriptionStringProperty': LocalizedStringProperty;
      'restartSkaterDescriptionStringProperty': LocalizedStringProperty;
    }
  }
};

const EnergySkateParkStrings = getStringModule( 'ENERGY_SKATE_PARK' ) as StringsType;

energySkatePark.register( 'EnergySkateParkStrings', EnergySkateParkStrings );

export default EnergySkateParkStrings;
