// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for ControlPointNode
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var energySkatePark = require( 'ENERGY_SKATE_PARK/energySkatePark' );
  var NodeIO = require( 'SCENERY/nodes/NodeIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );

  /**
   * @param {ControlPointNode} controlPointNode
   * @param {string} phetioID
   * @constructor
   */
  function ControlPointNodeIO( controlPointNode, phetioID ) {
    assert && assertInstanceOf( controlPointNode, phet.energySkatePark.ControlPointNode );
    NodeIO.call( this, controlPointNode, phetioID );
  }

  /**
   * Control point or null
   */
  phetioInherit( NodeIO, 'ControlPointNodeIO', ControlPointNodeIO, {}, {
    documentation: 'The view element for a control point.'
  } );

  energySkatePark.register( 'ControlPointNodeIO', ControlPointNodeIO );

  return ControlPointNodeIO;
} );