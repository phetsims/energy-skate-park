# Energy Skate Park model

This document describes the equations for energy used extensively in Energy Skate Park. Skater motion and state
is determined by these equations.<br>
@author Jesse Greenberg

# Friction
Force of friction is calculated by
Ff = &#956; * N

where:
 - Ff is the force of friction
 - &#956; is the coefficient due to friction
 - N is the normal force, perpendicular to the surface

# Energy

The following fundamental energy equations are used heavily throughout the simulation/

KE = 0.5 * m * v<sup>2</sup>
PE = m * g * h
TE = Ff * d
T = KE + PE + TE

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

