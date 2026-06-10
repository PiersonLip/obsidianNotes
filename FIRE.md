---
tags:
  - astro-notes/research
  - POSYDON_FireProject
---
# **FIRE** (Feedback In Realistic Environments) [@wetzel2025]
---
- Simulation suite for accurate simulation of galaxies of varying properties and constraints 
- Simulates millions of particles using both gravitational and hydro-dynamical methods (and sometimes more (ex. later reionzation, MHD, etc))
	- Uses [[GIZMO]], which is a hydro-dynamical suite


# Data **Format** (see [[LatteREADME]]) 
---
Particle based results, with parsec resolutions

Has particles of type gas, star, [[HDRM]], [[LRDM]] with properties 
```python
'id' : # ID (indexing starts at 0)
'position' : # 3-D position wrt galaxy center, aligned with galaxy principal axes [kpc physical]
'velocity' : # 3-D velocity wrt galaxy center, aligned with galaxy principal axes [km / s]
'mass' : # mass [M_sun]
'potential' : # potential (computed using all particles in the simulation) [km^2 / s^2 physical]
```
Note that some models (ex. later re-ionization) also have `acceleration`

## Star and gas particles also have:
---
```python
'massfraction' : # fraction of the mass that is in different elemental abundances, stored as an array for each particle, with indexes as follows:
# 0 = all metals (everything not H, He), 1 = He, 2 = C, 3 = N, 4 = O, 5 = Ne, 6 = Mg, 7 = Si, 8 = S, 9 = Ca, 10 = Fe
# these also are stored as metallicity := log10(mass_fraction / mass_fraction_solar), where mass_fraction_solar is from Asplund et al 2009
'metallicity.total' : everything not H, He
'metallicity.he' : # Helium
'metallicity.c' : # Carbon
'metallicity.n' : # Nitrogen
'metallicity.o' : # Oxygen
'metallicity.ne' : # Neon
'metallicity.mg' : # Magnesium
'metallicity.si' : # Silicon
'metallicity.s' : # Sulfur
'metallicity.ca' : # Calcium
'metallicity.fe' : # Iron
```
---
## Star particles also have:
---
```python
'form.scalefactor' : # expansion scale-factor when the star particle formed [0 to 1]
'age' : # current age (t_now - t_form) [Gyr]
```

##  [Data example and basic Tutorial](https://girder.hub.yt/#item/5b4e5966323d12000104c4bb) 