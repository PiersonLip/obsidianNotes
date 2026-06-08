---
tags:
  - astro-notes/research
  - POSYDON_FireProject
custom-width: 78
---
## Ideas
---
- Use the fire sim, then split it into a 3d grid of some resolution, where each cube in the grid is then passed to a posydon simulation, matching star formation rate
- Possibly use a 4d grid. I.e. take the fire simulation, split it into grids each 100 million years (or some other interval), then assume the total number of stars that would be formed in each grid, pass to posydon, calculate trajectories, etc
# Possible Project Analyzing [[Roman]]/[[Gaia]] [[black hole|BHs]] 
---
With the launch of roman in September (and upcoming Gaia data releases) there will be a lot more detected BHs. Figuring out how these BHs evolved (and in the case of [[natal-kick|natal kicks]], where they came from) as promptly as possible with regards to the data releases is important for yk research, and also politics.

Figure out a sort of pipeline/framework for broad (yet accurate) analysis of where and how binary BHs (and possibly disrupted BHs) originate.  

Using [[FIRE]] to make a map of the milkyway and combining that with kinematics from the evolved systems due to kicks to create a dataset showing the paths and trajectories (both in evolution and in space)

## Possible final demo/results
---
- 3d heatmap of bhs in the MW
- firefly visualization of all the disrupted bhs and their vectors
- some type of script or tool where you plug in some parameters about the system and it returns the most similar simulated candidates  

# Things to work on/look into 
--- 
- [ ] Familiarize myself with [[Roman]], how it works, data format, etc etc
- [ ] Look into FIRE, specifically [[milkyway]] models 
- [ ] Gaia BH1-2 paper.
- [ ] Lecture
## Questions 
---
- Do we wanna have a large general simulation like that of previous projects, where its our ten million, or do we wanna fit the formation rate of the stars to a prescription similar of that to fire. This is important with specifically disrupted and off-disk BHs and system, where the formation rate and date is key. 
	- Although, I doubt a constant formation rate is *too* bad, it also seems easy enough to avoid and be more accurate 
- what (and how) do we find initial velocities of systems that *don't* have natal kick velocities, assuming on disk is simple enough, but saying something originates from say a globular cluster, how do we account that? 
# Pipeline Possibilities
---
## POSYDON to FIRE 
---
## POSYDON Particle Fitting
---
- Each time a new particle is made/found in the fire sim (or, more likely, a sample of said new particles) assign it a comparable number of stars from a posy sim
- Then, move a snapshot forward, if in that time forward from the snapshot (most likely 15Myr), one of the stars assigned population has gone SNe into a BH figure out the middle point in the particle between the two snapshot, save said mean x,y,v variables and use that for later BH trajectory calculations
**Pros**
- By far the most accurate method of doing this, both metallicity and position wise
- Doesn't require a large quantity of POSY sims, instead can use "master" sims 
- Very very very parrelizable 
**Cons**
- Hell of a lot of star particles...
- The middle "mean" interpretation for where the BH SNe happened may be a little too inaccurate?s

![[Drawing 2026-06-08 14.46.56.excalidraw|600]]
## Fitting Galore
---
Take a POSYDON grid, then fit it onto a FIRE simulation at various sample times based on the formation rate at said time
Probably just wanna make a couple very large simulations at various metalicities and map those onto it as time

**Pros**
- Massively simplifies the POSYDON simulation overhead. Can just make one large posy sim, then fit that to a preexisting FIRE sim
Cons
- Metallicitiy woes, which, as we see in [@olejak2020], is very important for the masses (and formation rates) of the BHs
![[POSYtoFIREPipleine.excalidraw|1600]]
## FIRE to POSYDON
---
### **"4D Grid Method"**
---
Take the FIRE simulation, and each snapshot timestep ($\sim 15 \text{Myr}$) [@rodriguez2023] split the entire snapshot into a 3d grid, then take each tile (and its properties) of said grid and pass that to a posy simulation, which then pass its BHs to the trajectory script.   
**Pros**
- Can account for region metalicities and change of metalicity over time 
- Most likely would have a finer resolution? But hard to really know without trying
**Cons**
- Much more computationally intensive (although it is VERY parrelizable, and the trajectory computation would probably be massively aided by gpu compute)
- A lot more CS overhead in terms of dev time
- Literally 10s of thousands of POSYDON simulations, which is not what POSY is meant (or optimized) for...
![[FIREtoPOSYPipeline.excalidraw|1600]]
### **"Simplified" Model** 
---
One grid per snapshot, then map said grid onto said snapshot.
**Pros**
- Accounts for metallicity (albeit not very region dependent)
- Resolution tweakable with two major parameters (posydon grid size per snapshot)
**Cons** 
- Still a lot of POSY grids (max 601 :/), but, very manageable
![[Drawing 2026-06-08 13.38.57.excalidraw|1600]]
## [[FIRE]]
---
### Which fire model and why?
---
#### Later Ionization
- Provides acceleration information, which may be very useful for figuring out final positions 