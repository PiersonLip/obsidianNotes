---
citekey: TaurisvandenHeuvel+2023
tags:
  - astro-notes/book
  - astro-notes/physics-of-binary-star-evolution
---

# Physics of Binary Star Evolution [@TaurisvandenHeuvel+2023]

**\large Importance of binaries**
- Plays a key role in the evolution of massive stars
- first presumed to exist because of [[algol type]] stars. These stars were explained with [[mass transfer]]
- Mergers are a key source of strongest [[GWR|Gravitational Wave Radiation]], [[GRBs|Gamma-Ray Burst]], and have r-process elements. (i.e. in [[kilonova]])
- Likely cause of [[SNe]] Ia, Ib, Ic (SN with a lack of hydrogen in their spectra)
- cause of low-intermediate mass stars with odd chemical compositions, ex. [[barium stars.]]

```base
filters:
  and:
    - file.inFolder("Physics of Binary Star Evolution")
    - file.name != "Physics of Binary Star Evolution.md"
views:
  - type: list
    name: Chapters
    order:
      - file.name
```
