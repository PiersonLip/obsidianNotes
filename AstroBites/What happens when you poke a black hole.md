---
astrobites-url: https://astrobites.org/2026/02/18/what-happens-when-you-poke-a-black-hole/
citekey: Mittal2026
tags:
  - astro-notes/astrobite
---

# What happens when you poke a black hole? [@Mittal2026]

[Astrobites post](https://astrobites.org/2026/02/18/what-happens-when-you-poke-a-black-hole/)

---

## Abstract and intro

---

What happens when you perturb the perfect shape of a [[black hole|black hole]] (or any other object of symmetrically and spherically distorting spacetime)?

In 1950 John Wheeler and Tullio Regge were studying spherically symmetric spacetimes outside spherical masses. Note that this was being done *before* [[black hole]]s were known.  

## How do you poke a BH?

---

To `poke` a BH One can disturb the shape of its spacetime. Regge and Wheeler did this by utilizing spherical harmonics. They used two types of perturbations, [[odd modes]] and [[Even Modes]]. Even those these don't necessarily completely represent real physical distortions in spacetime, this simplified version became the Regge-Wheeler gauge, which serves as a modern benchmark for how these calculations are done.

## The Regge-Wheeler Equation

---

> [!equation] Regge-Wheeler Equation
> <a id="eq:ReggeWheeler"></a>
> Q measures the size of a perturbation, $r^*$ is the [[Turtle Coordinate]], $\omega$ is the frequency of the perturbation, and $V_{RW}$ is an effective potential for the BHs sensitivity to perturbations. *Note that this is for [[odd modes]]!!*

$$
\frac{d^2}{dr^{*2}} + \left[\omega^2 V_{RW} (r)\right]Q = 0
$$

> [!equation] Turtle Coordinate
> <a id="eq:turtleCoordinate"></a>
> Because the Schwarzschild time coordinate approaches infinity as something (a light ray, observer, object, etc.) approaches the event horizon, it is useful to have a coordinate which approaches negative infinity in order to still allow for calculations

$$
r^* = r + 2GM \ln\left|\frac{r}{2GM}-1\right|
$$

This equation ([[#eq:ReggeWheeler]]) looks very similar to the [[Schrödinger equation]], allowing predictions of its behavior to be easily made. Because of this, it is easily predicted that the system will oscillate and then return to a low energy state. 

![[bhPertubation.png]]

The "ring-down" phase detected with [[LIGO]] after a BH merger is described using this same method.
