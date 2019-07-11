// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for ControlPointNode.  TODO: This file seems like it doesn't add anything valuable, can it be deleted?
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var NodeIO = require( 'SCENERY/nodes/NodeIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  /**
   * @param {ControlPointNode} controlPointNode
   * @param {string} phetioID
   * @constructor
   */
  function ControlPointNodeIO( controlPointNode, phetioID ) {
    NodeIO.call( this, controlPointNode, phetioID );
  }

  /**
   * Control point or null
   */
  phetioInherit( NodeIO, 'ControlPointNodeIO', ControlPointNodeIO, {}, {
    documentation: 'The view element for a control point.',
    validator: { isValidValue: v => v instanceof phet.energySkatePark.ControlPointNode }
  } );

  energySkatePark.register( 'ControlPointNodeIO', ControlPointNodeIO );

  return ControlPointNodeIO;
} );