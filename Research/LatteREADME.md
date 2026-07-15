g## Description

Simulation snapshots at z = 0 from the Latte suite of FIRE-2 cosmological zoom-in baryonic simulations of Milky Way-mass galaxies, part of the Feedback In Realistic Environments ([[FIRE]]) simulation project (https://fire.northwestern.edu).

This current public release includes simulations m12f, m12i, and m12m.
These galaxies were used to generate the Ananke synthetic Gaia DR2-like surveys.

contact: Andrew Wetzel <arwetzel@gmail.com>


---
## Contents

### gizmo_read
python package for reading [[GIZMO]] simulation snapshot files at z = 0. Also contains a jupyter notebook tutorial to walk you through reading in a snapshot and manipulating data. This collection includes a static version of this python package, but I recommend that you use the up-to-date Git (version control) version, with further documentation, available at: https://bitbucket.org/awetzel/gizmo_read


### m12f, m12i, m12m - directories for 3 simulations
snapdir_600 - directory that contains the snapshot files at z = 0. Each snapshot is split into multiple files.

m12*_center.txt - position and velocity of galaxy center, as well as rotation vectors to align with principal axes of the stellar disk.

m12*_LSR{0,1,2}.txt - local standard of rest (LSR) coordinates (position and velocity), that is, the assumed solar coordaintes in making the Ananke synthetic Gaia surveys. Three LSR coordinates per simulation.

image - images of star particles in each simulation.


---
## Latte simulation suite
The Latte simulations are a suite of cosmological zoom-in baryonic simulations of individual Milk Way-mass halos with the same resolution, cosmology, and physics model. Latte halos were selected at z = 0 based only on their mass, M_200m = 1 - 2 x 10^12 M_sun, and an isolation criterion (no neighboring halos of similar mass within at least 5 R_200m to limit computational cost). Their selection was agnostic to any halo properties beyond this, including formation history, concentration, spin, or subhalo population.

The Latte halos are simulated in a cosmological volume originally developed as part of the [AGORA Project](https://sites.google.com/site/santacruzcomparisonproject). This periodic volume has box length 60 h^-1 Mpc = 85.5 Mpc with LambdaCDM cosmology:
* Omega_Lambda = 0.728
* Omega_matter = 0.272
* Omega_baryon = 0.0455
* h = 0.702
* sigma_8 = 0.807
* n_s = 0.961

Each of the Latte simulations represents a zoom-in region around a single Milky Way-mass halo. This zoom-in region is simulated at full resolution with dark matter, gas, and stars. This region is embedded within the full cosmological volume, which is simulated self-consistently but at low resolution and with only dark matter. The zoom-in region around each MW-mass halo is typically a few Mpc in size, and all of the Latte halos have zoom-in regions with zero contamination from low-resolution dark matter out to at least 600 kpc at z = 0.

Within the zoom-in region, the particle mass resolution is 35,000 M_sun for dark matter and 7070 M_sun for gas and stars (though because of stellar mass loss, at z = 0 a typical star particle has m_star ~ 5000 M_sun, and individual gas particle masses can be up to 3x higher). Dark matter and stars have fixed gravitational softening of 40 pc and 4 pc (Plummer equivalent), respectively, and the minimum kernel/softening (interparticle) length reached for gas in each simulation is 1 pc.

The Latte suite of FIRE-2 simulations produces galaxies with many properties that reasonably agree with those of the Milky Way, M31, and similar-mass galaxies at z ~ 0, without any 'fine-tuning', including: their stellar-to-halo mass relation, stellar thin plus thick disk morphology and metallicity gradients, HI gas kinematics, giant molecular clouds, circum-galactic medium observations of HI and OVI, realistic populations of satellite dwarf galaxies that do not suffer from the 'missing satellites' or 'too-big-to-fail' problems and have realistic metallicity distributions, and stellar halos. Using the FIRE-1 simulations, which implemented the same stellar physics (though with somewhat different numerical implementations) and used a SPH hydrodynamics solver, we showed that energy and momentum injection by stellar feedback on the scale of star-forming regions as modeled in FIRE self-consistently produces a Kennicutt-Schmidt relation, galactic [[winds]], and high-redshift circum-galactic medium properties in broad agreement with observational constraints. See [Sanderson et al 2018](https://arxiv.org/abs/1806.10564v1) and references therein.


---
## Simulation snapshots

### Units
The Latte simulations were run using the [[Gizmo Read|Gizmo]] code. Gizmo stores quantities in snapshot files using the following units by default:
* mass in [10^10 h^-1 M_sun]
* position, distance, radius in [h^-1 kpc comoving]
* velocity in [sqrt(scalefactor) km/s]
* time in [scalefactor]
* elemental abundance in [(linear) mass fraction]

where scalefactor = 1/(1+z) is the expansion scale factor (at z = 0, scalefactor = 1).
Full documentation for units in Gizmo snapshots: http://www.tapir.caltech.edu/~phopkins/Site/GIZMO_files/gizmo_documentation.html#snaps-units

However, the enclosed python reader converts quantities to more convenient and physical units.
Unless otherwise noted, this reader converts all quantities to the following units (and combinations thereof):
* mass in [M_sun]
* position, distance, radius in [kpc physical]
* velocity in [km / s]
* time, age in [Gyr]
* elemental abundance in [(linear) mass fraction]
* metallicity in log10(mass_fraction / mass_fraction_solar), assuming Asplund et al 2009 for solar


### Contents of snapshots
Each snapshot contains four types of particle species:
```python
'dark' : # dark matter at the highest resolution
'dark.2' : # dark matter at lower resolution (outside of the zoom-in region)
'gas' : # gas
'star' : # stars
```

All particle species have the following properties:
```python
'id' : # ID (indexing starts at 0)
'position' : # 3-D position wrt galaxy center, aligned with galaxy principal axes [kpc physical]
'velocity' : # 3-D velocity wrt galaxy center, aligned with galaxy principal axes [km / s]
'mass' : # mass [M_sun]
'potential' : # potential (computed using all particles in the simulation) [km^2 / s^2 physical]
```

Star and gas particles also have:
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

Star particles also have:
```python
'form.scalefactor' : # expansion scale-factor when the star particle formed [0 to 1]
'age' : # current age (t_now - t_form) [Gyr]
```

Gas particles also have:
```python
'density' : # [M_sun / kpc^3]
'temperature' : # [K]
'electron.fraction' : # free-electron number per proton, averaged over mass of particle
'hydrogen.neutral.fraction' : # fraction of hydrogen that is neutral (not ionized)
'sfr' : # instantaneous star formation rate [M_sun / yr]
'smooth.length' : # smoothing/kernel length, stored as Plummer-equivalent (for consistency with force softening) [kpc physical]
```


---
## Visualization
Interactive visualizations are in the folder `firefly visualizations` in this collection.

---
## Documentation
[Gizmo users guide](http://www.tapir.caltech.edu/~phopkins/Site/GIZMO_files/gizmo_documentation.html) provides comprehensive documentation of the Gizmo code and contents of simulation snapshots.

[Gizmo source code (publicly available version)](https://bitbucket.org/phopkins/gizmo-public)

[Hopkins 2015](http://adsabs.harvard.edu/abs/2015MNRAS.450...53H) describes the Gizmo code and MFM hydrodynamics method.

[Hopkins et al 2018](https://ui.adsabs.harvard.edu/#abs/2017arXiv170206148H) describes the FIRE-2 physics model.

[Wetzel et al 2016](https://ui.adsabs.harvard.edu/#abs/2016ApJ...827L..23W) introduces the Latte suite of FIRE-2 simulations of Milky Way-mass galaxies.

[Sanderson et al 2018](https://arxiv.org/abs/1806.10564v1) describes the Ananke framework for generating synthetic Gaia-DR2 surveys from m12f, m12i, and m12m of the Latte suite and presents the properties of these simulations in detail.

[FIRE project website](https://fire.northwestern.edu)


---
## Citation

If you use any of the Latte FIRE-2 simulations, please including the following citation:

"The Latte suite of FIRE-2 cosmological zoom-in baryonic simulations of Milky Way-mass galaxies (Wetzel et al 2016), part of the Feedback In Realistic Environments (FIRE) simulation project, were run using the Gizmo gravity plus hydrodynamics code in meshless finite-mass (MFM) mode (Hopkins 2015) and the FIRE-2 physics model (Hopkins et al 2018)."


Furthermore, if you use the Ananke synthetic Gaia DR2 surveys of the Latte simulations, please including the following citation:

"Synthetic Gaia DR2-like surveys of the Latte suite of FIRE-2 simulations were created via the Ananke framework (Sanderson et al 2018)."


---
## License

These simulation data are available under the Creative Commons BY 4.0 license:
https://creativecommons.org/licenses/by/4.0
