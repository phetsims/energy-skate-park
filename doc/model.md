# Energy Skate Park model

This document describes the equations for energy used extensively in Energy Skate Park. Skater motion and state
is determined by these equations.<br>
@author Jesse Greenberg (PhET Interactive Simulations)

 ## Skater
 
 The skater is the object that possesses energy in the simulation. It is treated as a point mass in all calculations.

## Tracks

Tracks are modeled using a set of control points and cubic splines. They use an algorithm for interpolation provided by [numericjs](http://www.numericjs.com/).
 
 ## Skater motion
 
 Skater motion is determined by the equation
 F = m * a
 
 where:
   - F is the total force on the skater
   - m is the skater mass
   - a is the acceleration due to gravity
 
 The model uses the Euler method to move the skater along the track each time step. For more information see https://en.wikipedia.org/wiki/Euler_method, and
 the implementation in EnergySkateParkModel.stepEuler.

## Friction
Force of friction is calculated by
Ff = &#956; * N

where:
 - Ff is the force of friction
 - &#956; is the coefficient due to friction
 - N is the normal force, perpendicular to the surface

## Energy

The following fundamental energy equations are used heavily throughout the simulation

KE = 0.5 * m * v<sup>2</sup><br>
PE = m * g * h<br>
TE = Ff * d<br>
T = KE + PE + TE<br>

where:
 - KE is kinetic energy
 - PE is potential energy
 - TE is thermal energy
 - T is total energy
 - m is skater mass
 - v is the velocity vector
 - g is the acceleration due to gravity
 - Ff is the force of friction
 - d is the distance the skater moved
 
Rotational energy and inertia of the skater are not included in this model.  

Energy in this simulation is conserved except in cases where the user modifies the system, such as dragging the skater
or modifying the track that the skater is on. There are some places throughout the model where heuristics are used to
ensure that total energy is conserved. In these cases, one of the other components of energy may be modified. 