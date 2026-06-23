---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
[GitHub Repo](https://github.com/PiersonLip/Olympus)
# Updates
---
## Done 
---
- Matching and sampling POSYDON data to FIRE based on metallicity and formation time
- basic integration to hubble time (incorrect potential, using bovy2014, around ~4kpc of error, treats both kicks as one vector, so only one integration)
- "final" data format (i.e. posy grid initial formations positions and velocities, current positions and velocities, gala orbits)
- Currently just using two snapshots. checks for all the new particles in the first snapshot, and then integrates to the second, "final", snapshot ($Z = 0$ /hubble time)

![[POSYDON + FIRE BH Prediction Pipeline#To-do]]
## FIRE Data 
---
![[Pasted image 20260623133455.png# screen]]

## Preliminary Results 
---
### Scattered Systems 
---
![[Pasted image 20260623133329.png# screen]]
### Neat Orbits
---
Gala integrated with bovy2014 treating kicks + fire particle data as initial vector
![[orbit_57.gif]]![[orbit_15.gif# screen]]
![[Pasted image 20260623133937.png# screen]]
![[Pasted image 20260623133959.png# screen]]