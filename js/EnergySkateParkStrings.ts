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
    'grabOrReleaseStringProperty': LocalizedStringProperty;
    'moveAlongTrackStringProperty': LocalizedStringProperty;
    'attachToTrackStringProperty': LocalizedStringProperty;
    'moveToStartOfTrackStringProperty': LocalizedStringProperty;
    'moveToEndOfTrackStringProperty': LocalizedStringProperty;
    'restartSkaterStringProperty': LocalizedStringProperty;
    'togglePauseStringProperty': LocalizedStringProperty;
    'scrubThroughDataStringProperty': LocalizedStringProperty;
    'stopwatchAndMeasuringTapeControlsStringProperty': LocalizedStringProperty;
    'removeFromToolboxStringProperty': LocalizedStringProperty;
    'returnToToolboxStringProperty': LocalizedStringProperty;
    'graphCursorControlsStringProperty': LocalizedStringProperty;
    'trackControlsStringProperty': LocalizedStringProperty;
    'cutTrackAtControlPointStringProperty': LocalizedStringProperty;
    'deleteControlPointStringProperty': LocalizedStringProperty;
    'connectTrackEndpoints': {
      'labelStringProperty': LocalizedStringProperty;
      'showOptionsStringProperty': LocalizedStringProperty;
      'moveThroughOptionsStringProperty': LocalizedStringProperty;
      'selectOptionStringProperty': LocalizedStringProperty;
      'cancelStringProperty': LocalizedStringProperty;
    }
  };
  'a11y': {
    'noDataParagraphStringProperty': LocalizedStringProperty;
    'controlPanel': {
      'experimentSettingsHeadingStringProperty': LocalizedStringProperty;
    };
    'keyboardHelpDialog': {
      'connectTrackEndpoints': {
        'showOptionsStringProperty': LocalizedStringProperty;
        'moveThroughOptionsStringProperty': LocalizedStringProperty;
        'selectOptionStringProperty': LocalizedStringProperty;
        'cancelStringProperty': LocalizedStringProperty;
      }
    };
    'skaterNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'onTrackHelpTextStringProperty': LocalizedStringProperty;
      'offTrackHelpTextStringProperty': LocalizedStringProperty;
    };
    'referenceHeightLine': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'toolboxPanel': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
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
    'trackNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'controlPointNode': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'energyReadoutPatternStringProperty': LocalizedStringProperty;
    'energySensorNode': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'nothingToMeasureStringProperty': LocalizedStringProperty;
      'movedOffSamplesStringProperty': LocalizedStringProperty;
      'sampleReadoutPatternStringProperty': LocalizedStringProperty;
    };
    'pieChart': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'positiveEnergyParagraphStringProperty': LocalizedStringProperty;
      'negativeEnergyParagraphStringProperty': LocalizedStringProperty;
      'kineticPercentPatternStringProperty': LocalizedStringProperty;
      'potentialPercentPatternStringProperty': LocalizedStringProperty;
      'thermalPercentPatternStringProperty': LocalizedStringProperty;
      'legendHeadingStringProperty': LocalizedStringProperty;
      'legendKineticStringProperty': LocalizedStringProperty;
      'legendPotentialStringProperty': LocalizedStringProperty;
      'legendThermalStringProperty': LocalizedStringProperty;
      'legendTotalStringProperty': LocalizedStringProperty;
    };
    'energyGraph': {
      'accessibleHelpTextCollapsedStringProperty': LocalizedStringProperty;
      'graphDescriptionParagraphStringProperty': LocalizedStringProperty;
      'variablePositionStringProperty': LocalizedStringProperty;
      'variableTimeStringProperty': LocalizedStringProperty;
      'unitsMetersStringProperty': LocalizedStringProperty;
      'unitsSecondsStringProperty': LocalizedStringProperty;
      'energyKineticStringProperty': LocalizedStringProperty;
      'energyPotentialStringProperty': LocalizedStringProperty;
      'energyThermalStringProperty': LocalizedStringProperty;
      'energyTotalStringProperty': LocalizedStringProperty;
      'energyNoneStringProperty': LocalizedStringProperty;
      'checkboxGroupParagraphStringProperty': LocalizedStringProperty;
      'kineticCheckbox': {
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      };
      'potentialCheckbox': {
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      };
      'thermalCheckbox': {
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      };
      'totalCheckbox': {
        'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
        'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
      };
      'graphCursor': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'movementResponseStringProperty': LocalizedStringProperty;
      };
      'zoomButtonGroup': {
        'zoomIn': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        };
        'zoomOut': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        };
        'zoomLevelResponseStringProperty': LocalizedStringProperty;
      };
      'variableSwitch': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'eraserButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'positionResponseStringProperty': LocalizedStringProperty;
        'timeResponseStringProperty': LocalizedStringProperty;
      }
    };
    'controlPointAttachment': {
      'leftStringProperty': LocalizedStringProperty;
      'rightStringProperty': LocalizedStringProperty;
    };
    'energyBarGraphAccordionBox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextExpandedStringProperty': LocalizedStringProperty;
      'clearThermalButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
        'accessibleContextResponseStringProperty': LocalizedStringProperty;
      };
      'zoomButtonGroup': {
        'zoomIn': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        };
        'zoomOut': {
          'accessibleNameStringProperty': LocalizedStringProperty;
          'accessibleHelpTextStringProperty': LocalizedStringProperty;
        };
        'zoomLevelResponseStringProperty': LocalizedStringProperty;
      }
    };
    'pieChartCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'speedCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'pathCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'stickToTrackCheckbox': {
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'sceneSelectionRadioButtonGroup': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'parabolaRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'rampRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'doubleWellRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'loopRadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      }
    };
    'frictionSlider': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'gravitySlider': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'gravityControl': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'gravityComboBox': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseStringProperty': LocalizedStringProperty;
    };
    'massSlider': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'massControl': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'skaterSetOneControls': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'skater1RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'skater2RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'skater3RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'skater4RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'skater5RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'skater6RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'animal1RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'animal2RadioButton': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      }
    };
    'gridCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'referenceHeightCheckbox': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'accessibleContextResponseCheckedStringProperty': LocalizedStringProperty;
      'accessibleContextResponseUncheckedStringProperty': LocalizedStringProperty;
    };
    'restartSkaterButton': {
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'returnSkaterToPreviousStartingPositionButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
    };
    'returnSkaterToGroundButton': {
      'accessibleNameStringProperty': LocalizedStringProperty;
    };
    'screenButtons': {
      'intro': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'measure': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'graphs': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'playground': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      };
      'friction': {
        'accessibleHelpTextStringProperty': LocalizedStringProperty;
      }
    };
    'preferences': {
      'metersPerSecondSquaredRadioButtonStringProperty': LocalizedStringProperty;
      'newtonsPerKilogramRadioButtonStringProperty': LocalizedStringProperty;
    }
  }
};

const EnergySkateParkStrings = getStringModule( 'ENERGY_SKATE_PARK' ) as StringsType;

energySkatePark.register( 'EnergySkateParkStrings', EnergySkateParkStrings );

export default EnergySkateParkStrings;
