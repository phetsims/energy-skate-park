// Copyright 2013-2026, University of Colorado Boulder

/**
 * EnergySkateParkConstants used throughout the simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import Range from '../../../dot/js/Range.js';
import { CreditsData } from '../../../joist/js/CreditsNode.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { PanelOptions } from '../../../sun/js/Panel.js';
import EnergySkateParkColors from './EnergySkateParkColors.js';

// for zoom buttons for bar graphs, pressing button will increase/decrease scale by this much
const ZOOM_FACTOR_DELTA = 1 / 60;

// precision of constants here must match precision of the physical control so that user
// can find this exact value so that it is correctly labeled
const EARTH_GRAVITY = 9.8;
const MOON_GRAVITY = 1.6;
const JUPITER_GRAVITY = 24.8;

// maximum coefficient of friction
const MIN_FRICTION = 0;
const MAX_FRICTION = 0.1;

const PANEL_CORNER_RADIUS = 5;

const PANEL_OPTIONS: PanelOptions = {
  cornerRadius: PANEL_CORNER_RADIUS,
  fill: EnergySkateParkColors.panelFillProperty,
  stroke: EnergySkateParkColors.panelStrokeProperty
};

export default class EnergySkateParkConstants {

  //----------------------------------------------------------------------------------------
  // Credits are shared by energy-skate-park and energy-skate-park-basics.

  public static readonly CREDITS: CreditsData = {
    leadDesign: 'Ariel Paul, Noah Podolefsky, Sam Reid, Amy Rouinfar',
    softwareDevelopment: 'Sam Reid, Jesse Greenberg, Marla Schulz, Agust\u00EDn Vallejo, Luisa Vargas',
    team: 'Michael Dubson, Bryce Gruneich, Trish Loeblein, Diana López Tavares, Emily B. Moore, Kathy Perkins',
    graphicArts: 'Mariah Hermsmeyer, Megan Lai, Amanda McGarry, Sharon Siman-Tov',
    qualityAssurance: 'Jaspe Arias, Catherine Carter, Steele Dalton, Jaron Droder, Megan Lai, Brooklyn Lash, ' +
                      'Emily Miller, Matthew Moore, Oliver Orejola, Valentina Pérez, Arnab Purkayastha, Devon Quispe, ' +
                      'Sam Reid, Nancy Salpepi, Kathryn Woessner, Bryan Yoelin'
  };

  public static readonly SLIDER_OPTIONS = {
    thumbSize: new Dimension2( 12, 23 ),
    trackSize: new Dimension2( 95, 3 ),
    tickLabelSpacing: 0,
    majorTickLength: 11,
    thumbTouchAreaYDilation: 8
  };

  // for radio buttons
  public static readonly RADIO_BUTTON_CONTENT_MARGIN = 3;
  public static readonly RADIO_BUTTON_CORNER_RADIUS = 2;

  // consistent width for all checkboxes
  public static readonly CHECKBOX_WIDTH = 14.7;
  public static readonly CHECKBOX_LABEL_FONT = new PhetFont( { size: 14.7 } );

  public static readonly CONTROL_LABEL_FONT = new PhetFont( { size: 14.7 } );

  // font for labels of physical controls
  public static readonly CONTROL_TITLE_FONT = new PhetFont( { weight: 'bold', size: 14.7 } );
  public static readonly CONTROL_TICK_LABEL_OPTIONS = {
    font: new PhetFont( 12.3 ),
    maxWidth: 31 // selected by choosing the length of widest English string in ?stringTest=double
  };

  // options for boxes and panels
  public static readonly PANEL_CORNER_RADIUS = PANEL_CORNER_RADIUS;
  public static readonly PANEL_OPTIONS = PANEL_OPTIONS;

  public static readonly GRAPH_PANEL_OPTIONS = merge( {}, PANEL_OPTIONS, {
    fill: EnergySkateParkColors.chartPanelFillProperty
  } );

  public static readonly COMBO_BOX_ITEM_OPTIONS = { font: new PhetFont( 13.5 ), maxWidth: 98 };

  // Control points are replenished in the toolbox as they are destroyed (by connecting) in the play area
  // This is the maximum number of control points available to the user.
  public static readonly MAX_NUMBER_CONTROL_POINTS = 15;

  // for the bar graphs, factors multiplied by physical values to produce heights in view coordinates
  public static readonly ZOOM_FACTOR_DELTA = ZOOM_FACTOR_DELTA;
  public static readonly MAX_ZOOM_FACTOR = 9 * ZOOM_FACTOR_DELTA;
  public static readonly MIN_ZOOM_FACTOR = ZOOM_FACTOR_DELTA / 3;

  // coefficients of friction, default values are not common
  public static readonly MIN_FRICTION = MIN_FRICTION;
  public static readonly MAX_FRICTION = MAX_FRICTION;

  // it was decided that default friction for this sim should be zero on all screens
  public static readonly DEFAULT_FRICTION = MIN_FRICTION;

  // in m/s^2, including direction (naming aligned with magnitude for readability at usages)
  public static readonly MAX_GRAVITY = -26; // maximum value of gravity, as requested by design
  public static readonly MIN_GRAVITY = -1; // minimum value for gravity, as requested by design team

  // pre-determined gravities
  public static readonly EARTH_GRAVITY = EARTH_GRAVITY;
  public static readonly MOON_GRAVITY = MOON_GRAVITY;
  public static readonly JUPITER_GRAVITY = JUPITER_GRAVITY;

  public static readonly REFERENCE_HEIGHT_RANGE = new Range( 0, 8 ); // in meters

  // Threshold below which energy values are considered zero for accessibility descriptions
  public static readonly ENERGY_THRESHOLD = 1E-4;

  // Threshold below which residual thermal energy is treated as visually negligible. This matches the clear-thermal
  // button cutoff so we don't show an un-clearable sliver after the skater has effectively come to rest.
  public static readonly THERMAL_ENERGY_CLEAR_THRESHOLD = 1E-2;

  // The model origin is at center-screen, but the E(x) graph and accessibility descriptions use a
  // coordinate frame where x=0 is at the left edge of the track, 5 meters left of the model origin.
  public static readonly POSITION_PLOT_OFFSET = 5;
}
