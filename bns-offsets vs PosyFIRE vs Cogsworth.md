---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# Abstract 
--- 
The only real key difference between the three methods is how we get the initial positions and velocities for integrating with Gala.

Utilizing the more analytical dns-offset script allows for the entire project to be self-enclosed, and makes the full scope simpler, however creating and using a largely empirical galaxy model is both less accurate and places a lot of the validity of the results of the project on said model.

Using FIRE increases *logistical* complexity (i.e. getting access to the datasets, where to store them, etc etc), but actually reduces the code complexity and (imo) makes major errors less likely. 

Note that integrating with Gala is actually the easy part (see below). 
## Code Ex
---
```python
w0 = gd.PhaseSpacePosition(
pos=[row['x'], row['y'], row['z']] * u.kpc,
vel=[row['vx'], row['vy'], row['vz']] * u.km / u.s,
)

orbit = potential.integrate_orbit(
w0,
dt=dt_myr * u.Myr,
t1=t_start_gyr * u.Gyr,
t2=hubble_time_gyr * u.Gyr,
)

x_final = orbit.xyz[0, -1].to_value(u.kpc)
y_final = orbit.xyz[1, -1].to_value(u.kpc)
z_final = orbit.xyz[2, -1].to_value(u.kpc)

return orbit, x_final, y_final, z_final
```

# bns-offsets 
---
## Summary 
---
[repo](https://github.com/PiersonLip/bns-offsets-redux)
## Pros vs Cons 
---
### Pros 
- Already has some basic galaxy modeling for initial position and velocities on formation
- potential is already modeled and handled with gala
- (currently) three integrations $SN_{1} \rightarrow SN_{2} \rightarrow t \sim 13.8 \text{Gyr}$ 
### Cons 
- Initial position and velocity sampling is ***not*** related (besides initial time) to the POSYDON grid. I.e system metallicty/mass is not taken into account when drawing samples
- Doesn't account for galaxy evolution, static model
- Setup (as of 6/30) for mainly *non-milkyway* host galaxies
### Assumptions 
- Galaxy is *static*, both size and metallicity wise
## Pipeline
---
![[bns-offset vs PosyFIRE 2026-06-25 12.38.28.excalidraw|1600]]
## Galaxy Modeling 
---
Models a simplified galaxy based on relationships between the brightness to then the density of stars. This is currently setup to allow for evolving many dns in many different host galaxies, whereas we *just* need a accurate MW model. Could of course fit a galaxy using this same parameters, but, using another model like the one in [@wagg2022] might more accurate for little work 

> [!quote]
> ### 1. Inputs from the host-galaxy table
For each host, the public input parameters are the ones provided by Gaspari in Table I:
$\{\mathrm{Host\ type},\ M_B,\ \log_{10} M_\star,\ R_{\rm half},\ n,\ R_{\rm half}^{\rm ms}\}.$
Here:
>- $M_B$ is the rest-frame absolute \(B\)-band magnitude.
>- $M_{\star}$ is the stellar mass.
>- $R_{\rm half}$ is the observed half-light radius when a Sersic fit exists.
>- $n$ is the observed Sérsic index when available.
>- $R_{\rm half}^{\rm ms}$ is the fallback half-light radius from the mass-size relation.
>### 2. Host classification
>We can adopt the Gaspari convention:
>- **late-type hosts** $\rightarrow$ stellar component modeled as a **disk**
>- **early-type hosts** $\rightarrow$ stellar component modeled as a **spheroid**

> [!quote] Galaxy Evolution Logic
> The logic is
>$$
M_{B,0} \rightarrow \text{halo parameters at } z=0 \rightarrow M_{{\rm halo},0}
\rightarrow M_{\rm halo}(z) \rightarrow M_B(z)
>$$
> for the halo side, and
>$$
M_{\star,0} \rightarrow M_\star(z) \rightarrow R_{\rm half}(z), R_{\rm half}^{\rm ms}(z), Z(z)
>$$
>for the stellar mass side.

> [!quote] Halo Mass Evolution Methodology
> Once the evolved halo mass Mhalo(z)Mhalo​(z) is known, the script converts it to an approximate halo velocity using the virial relation, then **inverts the same `MB \rightarrow v_h` relation used by the host builder**.
> So the new `MB(z)` is not assigned by a stellar population model or by preserving M⋆/LBM⋆​/LB​. Instead, it is chosen precisely so that, when passed back into the builder, it recreates the intended halo scaling at the target redshift.
> ### Consequence
> In the current script, `MB(z)` is fundamentally a **halo anchor**, not a luminosity-evolution prediction.
That is an important conceptual point.

> [!quote]
> ## 11. Physical implications for binary seeding
> With increasing redshift, the script generally produces:
> - a smaller halo mass,
>- a smaller stellar mass,
> - a smaller half-light radius,
>- a lower metallicity.
>For your binary-host problem, this has two competing effects:
>1. **smaller birth radii**  
    >Because the stellar light profile becomes more compact, binaries are seeded closer to the galaxy center on average.
>2. **shallower potential**  
    >Because the halo and stellar mass are lower, kicked binaries may be less tightly bound and can be displaced more easily.    

## Figures
---
![[Pasted image 20260630170446.png# screen]]

# Cogsworth
---

## Summary 
---
This is solves all of the problems that we run into with the analytical model (i.e. how do we model and sample the galaxy, as well as integration, how to deal with disrupted systems, etc etc). However, Tom is already trying to get that working with POSYDON (according to Dean), so definelty should figure out the current state of implementation first.
## Pros vs Cons 
---
### Pros 
 - Most likely one of the more accurate analytical models
 - Handles the majority of the physics methods that are important to us in (mostly) tried and true methodology 
	 - Disrupted systems, evolving mw overtime 
 Cons 
 - Large amount of work and interpolation to get it working with POSYDON
## Pipeline 
---
![[bns-offsets vs PosyFIRE vs Cogsworth 2026-06-30 17.05.37.excalidraw|1600]]

# FIRE
---
## Summary
---
We would use FIRE star particles to get the initial position, velocity, and metallicity of our systems. We would then map our POSYDON grids *onto* those star particles  

Possibly more accurate for a final distribution, due to the very accurate initial position, velocities, and metallicities, However, scope wise, it has by far the most that needs to be done. FIRE would be used for star formation rate, metallicity evolution, initial position and velocity distributions, but would ***not*** be used for the integration (but could possibly be used for potential modeling) 
## Pros vs Cons
---
### Pros 
- We don't need to actually do all of the modeling of the galaxy's evolution (i.e. size, metallicity, star density, velocity, etc) and can rely on FIREs methodology 
- Possibly more accurate results  
### Cons 
- need to figure out how we could model a possibly evolving potential 
- How do we scale (and do we need to) from our final model to actual mw rates
- Fo![[Pasted image 20260630174305.png]]r it to be the highest resolution, we'd need to use all of the snapshots, which are incredibly large[^2]
## Notes 
---
- Uses FIRE star particle times as the source of truth (i.e. ZAMS time of the POSYDON star *becomes* the FIRE birth time)[^3]
## Pipeline 
---
![[bns-offsets vs PosyFIRE 2026-06-25 13.55.42.excalidraw|1600]]
## Graphs/Examples
---
### New Star Positions Over Time
---
![[Pasted image 20260630165906.png# screen]]
![[Pasted image 20260630170008.png# screen]]
![[Pasted image 20260630165922.png# screen]]
![[Pasted image 20260630165929.png# screen]]

[^1]: 

[^2]: but could easily sub-sample them for lower resolution, i.e. use snapshot 0, 50, 100, 150, etc
