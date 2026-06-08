---
book: physics-of-binary-star-evolution
category: book-chapter
chapter: Evolution of single stars
citekey: TaurisvandenHeuvel+2023
tags:
  - astro-notes/book-chapter
  - astro-notes/physics-of-binary-star-evolution
---
# Evolution of single stars [@TaurisvandenHeuvel+2023]

[[Physics of Binary Star Evolution/Physics of Binary Star Evolution|← Physics of Binary Star Evolution]]

---

## Why stars do stuff *(trying to focus on some of the math here, cause while i conceptually understand it, the math is really neat)*

- A globe of monatomic gas without energy sources and in [[HSEq]] follows
- $$2E_{th} + E_{pot} = 0$$
- $E_{th}$ is given by
- $$E_{th} = \frac{3}{2}Nk\bar{T} = \frac{3}{2}M(\mathcal{R}/\mu)\bar{T}$$
- Where $N$ is the particle number in the star, $k$ is the boltzman constant, $M$ is the mass of the globe $\mathcal{R} = ak/m_h$, the ideal gas constant, $\mu$ is the mean particle mass, in units of $m_h$ of the hydrogen atom
- $E_{pot}$ is given by
- $$E_{pot} = -\alpha GM^2/R$$
- Where $R$ is stellar rad, $G$ is grav const, and $\alpha$ is a constant of proportionality of order unity, which depends on the density distribution of the star.
- From substitution, we find that
- $$\bar{T} = \alpha(\frac{GM}{R}) (\frac{\mu}{3\mathcal{R}})$$
- This is important because it shows that internal temp is only depended on the stellar radius, increasing when the star shrinks
- Energy loss is given by
- $$E_{tot = E_{th} + E_{pot}} = \frac{1}{2}E_{pot} = -\alpha \frac{GM^2}{2R}$$
- This shows that as $E_{tot}$ decreases the radius of the star must decrease
- However, as shown by $\bar{T}$,as the star contracts the internal temp increases
- This means as the star (or cloud of gas) radius heat away, it actually gets hotter, leading to more radiation, and thus more shrinking
- This applies to the star from the moment it is a gas to the end of its life as BH, [[NS]], WD, etc
- These equations work well for [[antibiotic-index]] of  $\gamma = C_p/C_V = 5/3$, which is great for globes of ionized hydrogen and helium. However, generalized forms can be found with eqs 8.6-8.8
- if $\gamma \leq 4/3$, the star **cannot** reach [[HSEq]], and thus must collapse or explode
- Stars of very high mass have very high luminosities, which mean their interior pressure is dominated by [[photon-gas]], which has $\gamma = 4/3$. This sets an upper limit for the mass of a star, also called the [[Eddington Luminosity Limit]]

## Stellar Timescales
---
There are three timescales for single star evo that are relevant for binary stellar evo

### Dynamical Pulsation timescale

> [!theorem] Dynamical-Pulsation-timescale
> $$\tau_{dyn} = \frac{R}{c_s} ∼eq 50 \text{min}\left(\frac{\bar{\rho_{\odot}}}{\bar{\rho}}\right)^{1/2}$$
  Where $\bar{\rho}$ is the mean mass density.


  This is the timescale of how long it takes for a start to restore a perturbation of its HSEq. This can be defined as the time it takes for a sound way with velocity $c_s$ to cross the stellar radius

### Thermal/Kelvin-Helmholtz timescale

Timescale of how long it takes for the star to react to fusion rate not being equal to the radiative energy loss. This is import with pre-main sequence contraction and after the stars fuel has been used

### Nuclear timescale

Time it takes for a star to use all of its available fuel

## [[High mass evolution]] $M \geq 12M_\odot$

- Leave behind a collapsing iron core, which creates a [[NS]] or [[black hole]]

## Stars in the range of $8-12 M_\odot$

- Not very well is known about evolution in this range
- Generally, the carbon in the ore will ignite and leave a degenerate [[ONeMg]] core
- This happens after they eject their hydrogen envelope, but in binaries this envelope is lost through [[mass transfer]]
- This means that the [[ONeMg]] core will grow to the [[Chandrasekhar Limit]], at which point it will then collapse, creating NS and SN explosion
- Might also result in [[TI-SNe]]

## Effects of wind mass loss, metallicity, and rotation

- If a star has very fast spin, the helium in the core can get mixed into the whole star, preventing the star from becoming a giant, instead leading it towards becoming a [[WR-star]] *(This is cool as shit. Blender star my beloved)*. This can happen with stars with of low of mass as $15M_\odot$, as compared to the typical progenitor mass of $∼25M_\odot$
- Non-rotating stars can become much more massive
- [[RSG]]s are much more common which stars of higher (sun-like) metallicities

## Final Evo of stars in the range of $1- 8 M_\odot$

- Unstable pulsing
- Very strong stellar [[winds]]
- If they're low enough mass, ($<8M\odot$), they can become WDs before carbon ignition

## Final Evolution and core collapse of stars more massive than $8M\odot$

### Between 8 and $∼ 10 -12$

- When the core approaches the [[Chandrasekhar Limit]] thus begins the onset of [[core collapse]]
