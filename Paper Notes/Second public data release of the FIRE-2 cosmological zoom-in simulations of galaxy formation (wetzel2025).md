---
category: paper
citekey: wetzel2025
aliases:
  - wetzel2025
tags:
  - astro-notes/paper
---
# Second public data release of the FIRE-2 cosmological zoom-in simulations of galaxy formation [@wetzel2025]

---

> [!info] Metadata
> **Citekey:** wetzel2025
> **Year:** 2025
> **FirstAuthor:** Wetzel, Andrew> **Author:** Samuel, Jenna> **Author:** Gandhi, Pratik J.> **Author:** Ponnada, Sam B.> **Author:** Su, Kung-Yi> **Author:** Arora, Arpit> **Author:** Angles-Alcazar, Daniel> **Author:** Hayward, Christopher C.> **Author:** Sanderson, Robyn E.> **Author:** Feldmann, Robert> **Author:** Cochrane, Rachel> **Author:** Nikakhtar, Farnik> **Author:** Panithanpaisal, Nondh> **Author:** Benavides, Jose A.> **Author:** Pandya, Viraj> **Author:** Grudic, Mike> **Author:** Hummels, Cameron> **Author:** Gurvich, Alexander B.> **Author:** Hafen, Zachary> **Author:** Ma, Xiangcheng> **Author:** Garrison-Kimmel, Shea> **Author:** Sameie, Omid> **Author:** Chan, T. K> **Author:** El-Badry, Kareem> **Author:** Necib, Lina> **Author:** Loebman, Sarah> **Author:** Wellons, Sarah> **Author:** Robles, Victor H.> **Author:** Wheeler, Coral> **Author:** Moreno, Jorge> **Author:** Stern, Jonathan> **Author:** Boylan-Kolchin, Michael> **Author:** Bullock, James S.> **Author:** Faucher-Giguere, Claude-Andre> **Author:** Keres, Dusan> **Author:** Quataert, Eliot> **Author:** Hopkins, Philip F.

> **DOI:** 10.48550/ARXIV.2508.06608
> **PDF:** [PDF](file:///home/pierson/Zotero/storage/5WTGRWDY/Wetzel%20et%20al.%20-%202025%20-%20Second%20public%20data%20release%20of%20the%20FIRE-2%20cosmological%20zoom-in%20simulations%20of%20galaxy%20formation.pdf)
## Abstract

We describe the second data release (DR2) of the FIRE-2 cosmological zoom-in simulations of galaxy formation, from the Feedback In Realistic Environments ([[FIRE]]) project, available at flathub.flatironinstitute.org/fire. DR2 includes all snapshots for most simulations, starting at z ≈ 99, with all snapshot time spacings ≲ 25 Myr. The Core suite—comprising 14 Milky Way-mass galaxies, 5 SMC/LMC-mass galaxies, and 4 lower-mass galaxies—includes 601 snapshots to z = 0. For the Core suite, we also release resimulations with physics variations: (1) dark-matter-only versions; (2) a modified ultraviolet background with later reionization at z ≈ 7.8; (3) magnetohydrodynamics, anisotropic conduction, and viscosity in gas; and (4) a model for cosmic-ray injection, transport, and feedback (assuming a constant diffusion coefficient). The Massive Halo suite now includes 8 massive galaxies with 278 snapshots to z = 1. The High Redshift suite includes 34 simulations: in addition to the 22 simulations run to z = 5, we now include 12 additional simulations run to z = 7 and z = 9. We also release 4 dark-matter-only cosmological boxes used to generate zoom-in initial conditions for many FIRE simulations. Most simulations include catalogs of (sub)halos and galaxies at all available snapshots, and most Core simulations to z = 0 include full halo merger trees.
## Zotero notes
---
## Other

12 pages. Data available at http://flathub.flatironinstitute.org/fire
## Annotations

%% begin annotations %%


### Imported 2026-06-06 16:01



> [!quote] p. 1
> DR2 includes all snapshots for most simulations, starting at z ≈ 99, with all snapshot time spacings ≲ 25 Myr.


> These intervals can be what is used for being passed to the POSYDON simulations

> [!quote] p. 2
> For the MW-mass simulations, we also include low–order basis–function expansion models of the mass distribution of the host halo mass (Arora et al. 2022; Arora et al. 2024), provided as spherical-harmonic coefficients for dark matter and hot gas (Tgas > 104 K) and azimuthal-harmonic coefficients for stars and cold gas, in the directory potential/10kpc/.


> [!quote] p. 3
> We request users of the Core simulations with Base Physics to cite the work that introduced each simulation as listed in Table 1 of Wetzel et al. (2023).

> [!quote] p. 4
> As Wetzel et al. (2023) described, almost all FIRE-2 simulations in DR1 (except m09, m10q, m10v, m11b, Romulus&Remus) also inadvertently suffer from spurious heating from cosmic rays in neutral gas at temperatures ≲ 1000 K at z ≳ 10 (before reionization). The combination of the too-early reionization model and cosmic-ray heating bug suppresses early star formation in low-mass halos and overheats intergalactic gas at these high redshifts. For most purposes, such as the properties of massive galaxies at lower redshifts, the high-redshift perturbations from these two issues are likely not significant. Whether or not this cosmic ray heating bug is significant depends on the application, and users should assess it on a case-by-case basis. The Later Reionization resimulations address both of these issues, by fixing the cosmic-ray heating term and by using a modified version of the ultraviolet background from Faucher-Gigu`ere et al. (2009).


> [!quote] p. 4
> For Later Reionization resimulations of m12f, m12i, and m12m, all particles at all snapshots also store:  • Acceleration [h km s−1 Gyr−1] - 3-D acceleration; multiply by h to convert to km s−1 Gyr−1






> [!quote] p. 5
> We request users of the Later Reionization simulations to cite as follows: for m09 cite Gandhi et al. (2022); for m12f, m12i, m12m cite this article (Wetzel et al. 2025).






%% end annotations %%


%% Import Date: 2026-06-06T16:01:26.448-05:00 %%
