---
category: class-section
course: astro210
section: Cosmology
tags:
  - astro-notes/class-section
  - astro210
---
# Cosmology

[[Class Notes/Astro210/Astro210|← Astro210]]

---

### CMB

- $ct ⇒$ theoretical size of the universe
- Does not account for expansion of the uni while the light is travelling
- [[surf-of-last-scatterting]], point where the universe becomes opaque, also the CMB

#### olbers paradox

- We do not see a galaxy everywhere we look
- this is because the universe is finite, not infinitly large

#### Equivalence principle

> [!equation] Gravitational Mass
> <a id="grav-mass"></a>
> 

$$
F_{grav} = \frac{-GM_gm_g}{r^2}
$$

> [!equation] Interial mass
> <a id="inert-mass"></a>
> 

$$
a = \frac{F}{m_i}
$$

> [!equation] Equivalence Principle
> <a id="equiv-princp"></a>
> 

$$
m_g = m_i
$$

#### Einstein v Newton

- In a small volume of space the downward pull of gravity cannot be distinguished from an upward acceleration of the observer

### General relativity

- Space and time bind together to form curved spacetime
- `free-fall' is motion in a straight line in 4d spacetime (this is grav acceleration)
- Matter (Mass-energy) tells spacetime how to curve
- Curved spacetime tells matter how to move

#### Predictions of GR

- Gravtional field sdeflect light (grav lensing)
- more accurate orbit for Mercury
- grav fields slow clocks
- moving objects will produce gravitational waves

\begin{center} 
  \huge
  
![[mainNotes-figure2.png]]

\end{center}

### Surface of spacetime

- How do we know the curvature and angles?
- If we draw a triangle what do the angles add up to?

> [!equation] Curvature and Angles of a triangle in 4d space
> <a id="curv-and-angles"></a>
> Where $\alpha + \beta + \gamma$ are angles of an equilateral triangle. 
Flat is $\kappa = 0$, spherical is $\kappa = 1$, Hyperbolic is $\kappa = -1$

$$
\alpha + \beta + \gamma = \pi + \frac{\kappa A}{r^2_{c,0}}
$$

> [!equation] Newtonian Friedmann Equation
> <a id="newt-friedmann-equation"></a>
> Newtonian version of Friedman equation

$$
\frac{\dot{a}}{a}^2 = \frac{8\pi G }{3} \rho(t + 2\frac{k}{r^2} \frac{1}{a^2(t)})
$$

> [!equation] Relativistic Friedmann equation
> <a id="rel-friedmann-equation"></a>
> where $\kappa$ is curvature parameter

$$
\left(\frac{\dot{a}}{a}\right)^2 =
\frac{8\pi G}{3c^2}
- \frac{\kappa c^2}{r_{c,0}^2} \frac{1}{a^2(t)}
+ \frac{\alpha}{3}
$$

Currently, $\dot{a} > 0$, thus the universe is expanding

#### Measuring curvature

- Look at angular diam vs distance
- We look at something which we know the size of, a `standard ruler'
- if flat... $\Rightarrow \alpha = \frac{D}{d}$
- Can't use galaxies, non standardized size
- Use sound saves before recombination 
\begin{list}{-}{}
- Use sound waves! $t< 380000 yr $
- Sound waves in early fluid like plasma in universe
- wave equation for sound waves relates wavelength to the properties of the gas

\item Apply the sound wave logic to the CMB
\item the reason that the CMB is not homogeneous is because of the sound waves traveling through the plasma in early universe
\item If universe was curved, the light traveling from the CMB would take a different path, resulting in a different angular resolution
\end{list}

#### Predicting angular scale distribution in CMB from sound waves

- large fluctuations are caused by patches of varying temperature
- small fluctuations are from
- Look at how CMB is `distorted' from the sound waves
- Then infer wavelength of soundwaves
- Then apply previous logic for measuring angular res and comparing it to known wavelength

### Density of the universe

- $$\Omega_m = \frac{M/V}{\rho_c}$$
- Matter ...
- $$\Omega_m ∼ .3$$
- Radiation ...
- $$\Omega_{rad} ∼ .00007$$
- Something else ...
- $$\Omega_{rest} ∼ .7$$
- Because the universe is flat we know that
- $$\Omega_{m} + \Omega_{rad} + \Omega_{res} ∼ 1 $$

#### Energy density components

- Looking for a solution for $a(t)$
- Wavelength of a photon scales with the size of the universe
- Lambda cosmological constant
- $$\Omega_\Lambda ∼ .7$$
- Non-Relativistic particles:
- $$\Omega_{m,0} ∼ .3$$
- $$\Omega_{(bary,0)} ∼ .04$$
- Relativistic particles
- $$\Omega_{r,0} = \Omega_{cmb,0} + \Omega_{v,0} ∼ 8.4 × 10^{-5}$$

> [!equation] Behavior of nonrelatvistic partciles
> <a id="nonrelparticles"></a>
> If matter is conserved

$$
n(t) ∝ V^{-1}(t)∝ a^{-3}(t)
$$

#### Cosmological redshift

> [!equation] Redshift Z
> <a id="redshift"></a>
> 

$$
Z = \frac{\lambda_0 - \lambda_e}{\lambda_e}
$$

If we use [[#redshift]] combined with expansion of the universe ...  
$$1+Z = \frac{1}{a(t)}$$

#### Universe at different stages

- Solve [[#rel-friedmann-equation]] for different $\Omega$s
- We find that all are decelerating, except for $\Omega_\Lambda$ (Dark Energy)

> [!equation] Friedmann Consensus Model
> <a id="eq:friedmannConsensusModel"></a>
> unitless acceleration of the universe

$$
\dot{a} = H_0\left[\frac{\Omega_{r,0}}{a^2} + \frac{\Omega_{m,0}}{a}+ \Omega_{\lambda,0}a^2\right]^{1/2}
$$

#### Standard candles for expanding universe

> [!equation] Flux
> <a id="eq:flux"></a>
> 

$$
L = \frac{L}{4\pi r^2}
$$

> [!equation] Photon Energy
> <a id="eq:photonenergy"></a>
> 

$$
\epsilon = \frac{hc}{\lambda_e}; \quad \epsilon_0 = \frac{hc}{\lambda_0}
$$

- One can combine [[#redshift]] and \refeq{eq:photonenergy}
- We can use type 1a SN as a standard candle
- Plot the redshift and distance, see what expected path it lies on (based on DE DM content)

## Equations

*(equation index from LaTeX — see source)*
