---
tags:
  - astro-notes/research
---
# Things to work on/look into 
--- 
- [ ] Familiarize myself with [[Roman]], how it works, data format, etc etc
- [ ] Look into FIRE, specifically milkway models 
- [ ] Gaia BH1-2 paper.
- [ ] Lecture
## Questions 
---
- Do we wanna have a large general simulation like that of previous projects, where its our ten million, or do we wanna fit the formation rate of the stars to a prescription similar of that to fire. This is important with specifically disrupted and off-disk BHs and system, where the formation rate and date is key. 
	- Although, I doubt a constant formation rate is *too* bad, it also seems easy enough to avoid and be more accurate 
- what (and how) do we find initial velocities of systems that *don't* have natal kick velocities, assuming on disk is simple enough, but saying something originates from say a globular cluster, how do that? 
### [[FIRE]]
---
- Which fire model and why?
## Ideas
---
- Use the fire sim, then split it into a 3d grid of some resolution, where each cube in the grid is then passed to a posydon simulation, matching star formation rate
- Possibly use a 4d grid. I.e. take the fire simulation, split it into grids each 100 million years (or some other interval), then assume the total number of stars that would be formed in each grid, pass to posydon, calculate trajectories, etc
# Possible Project Analyzing [[Roman]]/[[Gaia]] [[black hole|BHs]] 
---
With the launch of roman in September (and upcoming Gaia data releases) there will be a lot more detected BHs. Figuring out how these BHs evolved (and in the case of [[natal-kick|natal kicks]], where they came from) as promptly as possible with regards to the data releases is important for yk research, and also politics.

Figure out a sort of pipeline/framework for broad (yet accurate) analysis of where and how binary BHs (and possibly disrupted BHs) originate.  

Using [[FIRE]] to make a map of the milkyway and combining that with kinematics from the evolved systems due to kicks to create a dataset showing the paths and trajectories (both in evolution and in space)

## possible final demo/results
---
- 3d heatmap of bhs in the MW
- firefly visualization of all the disrupted bhs and their vectors
- some type of script or tool where you plug in some parameters about the system and it returns the most similar simulated candidates  