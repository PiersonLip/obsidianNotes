---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# Overview 
---
## Summary 
--- 
The only real key difference between the two methods is how we get the initial positions and velocities for integrating with Gala. 

Utilizing the more analytical dns-offset script allows for the entire project to be self-enclosed, and makes the full scope simpler, however creating and using a largely empirical galaxy model is both less accurate and places a lot of the validity of the results of the project on said model

Using FIRE increases *logistical* complexity (i.e. getting access to the datasets, where to store them, etc etc), but actually greatly reduces the code complexity and (imo) makes major errors less likely
### Code Ex
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
## FIRE
---
### pros 
- We don't need to actually do all of the modeling of the galaxy's evolution (i.e. size, metallicity, star density, velocity, etc)
- more accurate results 
### cons 
- How do we scale (and do we need to) from our final model to actual mw rates [^2]
- For it to be the highest resolution, we'd need to use all of the snapshots (but could easily sub-sample them for lower resolution, i.e. use snapshot 0, 50, 100, 150, etc)
## bns-offsets
---
### Pros 
- Already has some basic galaxy modeling* for initial position and velocities on formation
Cons 
- Personally, I'm hesitant to fully trust the code. This is mostly due to how much of it is ai coded math that makes relatively large assumptions, would need to do a lot of in-depth verification of methodology
- Currently written in a way that isn't super efficient on batch processing (i/o operations on entire posy grid)
- Initial position and velocity sampling is ***not*** related (besides initial time) to the POSYDON grid. I.e system metallicty/mass is not taken into account when drawing samples
- Doesn't scale to galactic rates (but also doesnt really need to)

# FIRE
---
## Notes 
---
- Uses FIRE star particle times as the source of truth (i.e. ZAMS time of the POSYDON star *becomes* the FIRE birth time)[^3]
## Pipeline 
---
![[bns-offsets vs PosyFIRE 2026-06-25 13.55.42.excalidraw|1600]]
# bns-offsets
---
## Pipeline
---
![[bns-offset vs PosyFIRE 2026-06-25 12.38.28.excalidraw|1600]]
## Galaxy Modeling 
---
Models a simplified galaxy based on empirical relationships, uses these relationships to evolve the model in time.

These evolution accounts for size, velocities, metallicity[^1], and redshift
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

### Disclaimers
---
The script, and the reasoning behind it, seems to be mostly ai, so definitely need to put in the work making sure that it is actually working and not hallucinating. There's things in the markdown explanation files that don't exist in the actual code itself, and vice versa

[^1]: while it *says* it accounts for metallicity, it is not used for the sampling of the posydon grid (nor do i see it used in any other capacity(?), although some of the markdown references evolving redshift overtime, but (i think) there isnt actually a script which does that) 

[^2]: I think this doesnt actually mater, if the final goal is just a density prediction, *overprediciting* the actual quantity of the BHs is a good thing, as it gives the final density map higher resolution`

[^3]: this of course raises the issue of posydon grids being evolved longer then hubble time, however, I think if we just took the last timestep before hubble time, presented that as the "observable state", but also presented the rest of the posy gird that 
