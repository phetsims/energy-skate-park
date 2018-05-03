# Hooke's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## IMPLEMENTATION HISTORY
HTML5 version of energy-skate-park-basics was created before energy-skate-park, and so the "basics" repo was created
before the full version as well. We decided to `git --mirror` energy-skate-park-basics into energy-skate-park, and make
energy-skate-park the repo that maintains sim implementation while energy-skate-park-basics is a "thin shell" running
full version with particular settings.

After the `git --mirror` we had to rename files and directories with `git mv`, but this made history difficult to find.
`git log` shows no history prior to the `git mv`, and history cannot be seen directly in editors or the GitHub UI.
However, it is possible to find git history a few ways:
 - Use `git log --follow ./path/to/file` to see file history prior to `git mv`
 - Check out an old SHA and browse locally.
 - Use the GitHub UI at https://github.com/phetsims/energy-skate-park/commits/master to "Browse the repository at this point in history".

`git --mirror` was done on 5/2/18, which may be helpful if you need to find code prior to this set up.

See https://github.com/phetsims/energy-skate-park/issues/6 for additional details.

## Model

TODO

## View

TODO

## Miscellaneous

TODO
