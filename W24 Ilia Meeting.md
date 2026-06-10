---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# General Questions 
---
- Is there a space I could work at ciera? I imagine the sky lounge is gonna get swamped with reach kids 
	- Sasha said to ask if a desk would be possible 👀 
- Commuter parking pass?
- Could I attend some of the colloquium meetings?
- Cool if I sat in on the group meetings?
- Also, very curious about attending more conferences/presentation type things, any good resources for that?


# FIRE Introduction
---
- Uses massive N-body particle simulations 
	- Calculated using hydrodynamical methods from gizmo and also gravitational 
- Publicly available data is saved in snapshots, where the snapshots go from Z=99 to Z=0, with snapshot intervals $\lesssim 25\text{Myr}$ 
![[Pasted image 20260610140250.png# screen# normal]]
### Caveats 
---
- While they have "milkyway-like" sims, these sims don't end looking exactly like our MW, instead they're just similar masses, metalicities, etc [^1]
[^1]: I imagine the statistical quantity of how many stars we'll be simulating and fitting will make this difference small, but still very important detail

## Pipeline ideas
---
*Ordered by lowest resolution and feasibility to highest* 
- [[POSYDON + FIRE BH Prediction Pipeline#Fitting Galore]]
- [[POSYDON + FIRE BH Prediction Pipeline#**"4D Grid Method"**]]
- [[POSYDON + FIRE BH Prediction Pipeline#**"Simplified" Model**]]
- [[POSYDON + FIRE BH Prediction Pipeline#POSYDON Particle Fitting]]

## Project Questions
---
- How fine do we want to/can we be with our results? 
	- Most of this will come with time (generally based off of sub-sampling rate), but initial model choice is a big consideration.
- Final result goals/usability
	- Plug in the properties of a BH from a gaia data release (or Roman) an be able to do a nearest neighbor with its variables to the synthetic catalog to then find how and where said BH evolved from
	- BH density mapping[^1]
- When would we want/need this to be done by? With Roman launching in august I feel like we don't have a lot of time 

[^1]: I imagine this would be underwhelming and just sorta show a density matching that of star formation, but it'll be easy enough