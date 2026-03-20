// Copyright 2026, University of Colorado Boulder

/**
 * A dashed-circle highlight node for showing the current attachment target during keyboard-driven
 * track connection.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Circle from '../../../../scenery/js/nodes/Circle.js';

export default class AttachmentHighlightNode extends Circle {
  public constructor() {

    // REVIEW: Isn't there a specified highlight ColorProperty in common code already?
    super( 30, { stroke: 'red', lineWidth: 3, lineDash: [ 6, 4 ], visible: false } );
  }
}
