---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# To-do 
---
- [ ] Save index and filename 
- [ ] make full doc of how it splits up mw and how each component is modeled 
- [ ] fix -100 bug 
- [ ] have all of the code locations saved 
- [ ] only bhs

# Approach Types
---
With [[Cogsworth]], all of its functionality is built *around* and *for* [[cosmic]], meaning that theres a bunch of things that need too be adapted for it to work with cosmic, and theres a couple different ways to approach this  
## Interpolation Layer 
--- 
This works by converting the [[POSYDON]] data in a comsic like facsimile, which probably will works fine for the kinematic stuff (as all of the kinematics can be handled and then passed *back* to POSYDON using the POSYDON indexes), but this most likely makes compromises with a couple of key functions. 


![[cosmic#Cosmic Data Properties]]
```Python
### NEED TO VERIFY, AI ATM

POSYDON_STATE_TO_KSTAR = {
    "H-rich_Core_H_burning": 1,
    "H-rich_Shell_H_burning": 1,
    "H-rich_non_burning": 1,
    "H-rich_Core_He_burning": 4,
    "H-rich_Core_He_depleted": 5,
    "H-rich_Core_C_burning": 5,
    "H-rich_Core_C_depleted": 6,
    "stripped_He_Core_He_burning": 7,
    "stripped_He_Core_He_depleted": 9,
    "stripped_He_non_burning": 7,
    "accreted_He_Core_He_burning": 7,
    "accreted_He_non_burning": 7,
    "WD": 10,
    "NS": 13,
    "BH": 14,
    "massless_remnant": 15,
}

POSYDON_EVENT_TO_EVOL_TYPE = {
    "ZAMS": 1,
    "oRLO1": 3,
    "oRLO2": 3,
    "oCE1": 7,
    "oCE2": 7,
    "oDoubleCE1": 7,
    "oDoubleCE2": 7,
    "oMerging1": 6,
    "oMerging2": 6,
    "CC1": 15,
    "CC2": 16,
    "END": 10,
    "maxtime": 10,
    "FAILED": 10,
}
```
## Full Backend Rework
---
This involves finding every time where 

# Key Things 
--- 

## Evolutionary State of the Star
---

| kstar | evolutionary state |
|-------|---------------------|
| 0 | Main Sequence (MS), < 0.7 M☉ |
| 1 | MS, > 0.7 M☉ |
| 2 | Hertzsprung Gap |
| 3 | First Giant Branch |
| 4 | Core Helium Burning |
| 5 | Early Asymptotic Giant Branch (AGB) |
| 6 | Thermally Pulsing AGB |
| 7 | Naked Helium Star MS |
| 8 | Naked Helium Star Hertzsprung Gap |
| 9 | Naked Helium Star Giant Branch |
| 10 | Helium White Dwarf |
| 11 | Carbon/Oxygen White Dwarf |
| 12 | Oxygen/Neon White Dwarf |
| 13 | Neutron Star |
| 14 | Black Hole |
| 15 | Massless Remnant |

## Evolve Type
---

| evol_type | evolutionary change |
|:---------:|----------------------|
| 1 | initial state |
| 2 | kstar change |
| 3 | begin Roche lobe overflow |
| 4 | end Roche lobe overflow |
| 5 | contact |
| 6 | coalescence |
| 7 | begin common envelope |
| 8 | end common envelope |
| 9 | no remnant leftover |
| 10 | max evolution time |
| 11 | binary disruption |
| 12 | begin symbiotic phase |
| 13 | end symbiotic phase |
| 14 | blue straggler |
| 15 | supernova of primary |
| 16 | supernova of secondary |

