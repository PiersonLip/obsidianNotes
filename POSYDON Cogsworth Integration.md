---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# To-do 
---
- [ ] . 

# Approach Types
---
With Cogsworth, all of its functionality is built *around* and *for* [[cosmic]], meaning that theres a bunch of things that need too be adapted for it to work with cosmic, and theres a couple different ways to approach this  
## Interpolation Layer 
--- 
This works by converting the POSYDON

## State Conversions 
---

There's a couple different ways to approach this, but I think the easiest one is to just add an interpolation layer for POSYDON to COSMIC for the critical parts that COSMIC needs for integration. 

### Cosmic Properties 
---
![[cosmic#Properties]]
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
# Key Things 
--- 
