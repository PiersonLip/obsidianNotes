---
tags:
  - POSYDON
  - python
  - BHSolProject
---
# Notes on the 10 Mill pop 
---


## Failed vs Survived Systems
---
**Why do some of these systems survive through the CE, while most fail and merge?**

### Properties checked/to check
- [x] Orbital period 
- [x] Eccentricity (set to zero before CE anyway)
- [ ] 
##  Eccentricity 
---
~~Where does the eccentricity for the BH-Sol systems originate? It seems to be a sort of normal distribution
~~
✅ It's just coming from the [[SNe]] of S1 (the collapsing into the [[black hole|BH]]) . 
Data was filtered in a way that included `step SNe`, but, bizarrely, this value seems disconnected from natal kick velocity or mass loss? Found the equations in [[POSYDON]], now gotta understand them .\_.   

- There seems to be a very slightly correlation (.2) between `V_sys_y` and the eccentricity, which makes sense


~~The correlation matrix shows that it might be correlated with the final mass of S2?~~
Nevermind, that was because some of the sactual ystems are ending with eccentricties of 0, which makes more sense, but not really?

But the graph doesnt really, except outliers, which I think are systems that are merged 

## Misc Questions
---
- [ ] Why does $\text{SNe}_{S_{2}}$ not contribute to the systems eccentricity like $\text{SNe}_{S_{1}}$?