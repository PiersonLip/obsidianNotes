---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# To-do

^4b46a5

---
- [ ] Better potentials
- [ ] setup with slurm
- [ ] verify everything is resonable-ish
- [ ] proper posydon grids
- [ ] figure out if galaxy center should be inferred or if its actually stored somewhere
- [ ] setup final data output (i.e. locations, velocities, + posydon history)
- [ ] do the star particles die?
- [ ] metallicity distro from fire snapshot 300
- [x] proper sampling of the stars to get 100k (figure out what i gotta do to read headers) 
- [x] dont return full orbits, have as a toggle with default False

# Abstract  
---
With the launch of roman in September (and upcoming Gaia data releases) there will be a lot more detected BHs. Figuring out how these BHs evolved (and in the case of [[natal-kick|natal kicks]], where they came from) as promptly as possible with regards to the data releases is important for yk research, and also politics.

Figure out a sort of pipeline/framework for broad (yet accurate) analysis of where and how binary BHs (and possibly disrupted BHs) originate.  

Using [[FIRE]] to make a map of the milkyway and combining that with kinematics from the evolved systems due to kicks to create a dataset showing the paths and trajectories (both in evolution and in space)

# Ideas
---
- Take the stellar particles, map them each as posydon solar populations based off of the particles total mass

## Possible final demo/results
---
- Synthetic catalog of BHs in the MW, with regions where microlensing is more probable 
- 3d heatmap of BHs in the MW
- some type of script or tool where you plug in some parameters about the system and it returns the most similar simulated candidates  
- firefly(?) visualization of all the disrupted bhs and their vectors 

# Things to work on/look into 
--- 
- [ ] Familiarize myself with [[Roman]], how it works, data format, etc etc
- [x] Look into FIRE, specifically [[milkyway]] models 
- [ ] Gaia BH1-2 paper.
- [x] Lecture
# Current questions 
---
- Should we take a sub-sample of fire sim particles, or, does it make more sense to instead treat each particle as one system?
- Should we really evolve from the entire POSY grid? we really only need a couple of select columns, so it feels like a bit of io overkill to do the entire thing
- Do we want to use the previous script? I'm really tempted to tear it down and start over, as a class based system using np.arrays would probably be much faster on a larger scale (and easier to track), and restarting might be easier then trying to morph the code
- what FIRE dataset provides the actual initial velocities and positions?
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
- Very very very parallelizable  
**Cons**
- Hell of a lot of star particles...
	- Could use some type of binning method to low thbse resolution of the FIRE sim (or only select 1% of them)
		- Gizmo Read has sub-sampling function already :)
	- 
- The middle "mean" interpretation for where the BH SNe happened may be a little too inaccurate?
![[Drawing 2026-06-08 14.35.12.excalidraw|16000]]
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