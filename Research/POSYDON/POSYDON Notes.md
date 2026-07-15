---
category: tools
tags:
  - astro-notes/tools
---
## Evolution

- Consists of a large number and variety of ``steps'' or solvers
- Each time a system evolves through one of steps, or meets some other criteria, it is then ``handed off'' to one of these solvers, which then calculates how it evolves
- These steps are largely from MESA (?)

**\large Use**
- You create a class, like ``pop''
- onto this class you pass all of your evolution augments, properties, configs, etc
- this largely boils down to *how* to evolve and *what* to evolve
- then you ``evolve'' this class
- that allows you to use a ``manager'' to view the simulated data. This manager is a subclass called by ``pop''.manager
- the simulated binaries are stored as objects, where each object is the binary, *which itself* also holds objects for each of the stars

**\large Custom Single Binary Evolution**
- you can once more create a class with the properties of your system. This includes initial time, masses, states, etc
- then you pass .evolve to it again
- then you can repeat above

\printglossaries
