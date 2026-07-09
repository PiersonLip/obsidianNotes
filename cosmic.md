---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
[docs](https://cosmic-popsynth.github.io/COSMIC/)

# Properties 
---
Cosmic uses ***integers*** for evo states, this means that the final results are more compressed, but also way trickier to work with [^1]


## Binary states
---

| kstar | evolutionary state                  |
| ----- | ----------------------------------- |
| 0     | Main Sequence (MS), < 0.7 M☉        |
| 1     | MS, > 0.7 M☉                        |
| 2     | Hertzsprung Gap                     |
| 3     | First Giant Branch                  |
| 4     | Core Helium Burning                 |
| 5     | Early Asymptotic Giant Branch (AGB) |
| 6     | Thermally Pulsing AGB               |
| 7     | Naked Helium Star MS                |
| 8     | Naked Helium Star Hertzsprung Gap   |
| 9     | Naked Helium Star Giant Branch      |
| 10    | Helium White Dwarf                  |
| 11    | Carbon/Oxygen White Dwarf           |
| 12    | Oxygen/Neon White Dwarf             |
| 13    | Neutron Star                        |
| 14    | Black Hole                          |
| 15    | Massless Remnant                    |
## Evolve Type
---

| evol_type | evolutionary change              |
| :-------: | -------------------------------- |
|     1     | initial state                    |
|     2     | kstar change                     |
|     3     | begin Roche lobe overflow        |
|     4     | end Roche lobe overflow          |
|     5     | contact                          |
|     6     | coalescence                      |
|     7     | begin common envelope            |
|     8     | end common envelope              |
|     9     | no remnant leftover              |
|    10     | max evolution time               |
|    11     | binary disruption                |
|    12     | begin symbiotic phase            |
|    13     | end symbiotic phase              |
|    14     | blue straggler                   |
|    15     | supernova of primary             |
|    16     | supernova of secondary           |
|    100    | RLOF interpolation timeout error |

[^1]: Maybe im tweaking, but or doesnt this system only make sense if you provide a dictionary of mappings of ints. Like i feel like it would be very easier to just import dics and then use them for said events, but probably dunning kurger...
