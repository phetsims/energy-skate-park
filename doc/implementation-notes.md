# Hooke's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## IMPLEMENTATION HISTORY NOTES
HTML5 version of energy-skate-park-basics was created before energy-skate-park, and so the "basics" repo was created
before the full version as well. We decided to `git --mirror` energy-skate-park-basics into energy-skate-park, and make
energy-skate-park the repo that maintains sim implementation while energy-skate-park-basics was a  "thin shell" running
screens of the full sim with particular settings.

After the `git --mirror` we had to rename files and directories with `git mv`, but this made history difficult to find.
It is possible to use the GitHub UI at https://github.com/phetsims/energy-skate-park/commits/master to "Browse the
repository at this point in history" and check out old SHAs. But `git log` shows no history prior to the `git mv`, and
history cannot be seen directly in editors or the GitHub UI.

## Model

TODO

## View

TODO

## Miscellaneous

TODO
