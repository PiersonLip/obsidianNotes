---
category: class-section
course: astro210
section: Orbital Mechanics I
tags:
  - astro-notes/class-section
  - astro210
---
# Orbital Mechanics I

[[Class Notes/Astro210/Astro210|← Astro210]]

### Newtonian mechanics

Parametric vectors

Displacement $\vec{r}(t) = x(t)\hat{i}y(t)\hat{j}+z(t)\hat{k}$ 

distance: $r(t) = |\vec{r}(t)| = \sqrt{\vec{r} · \vec{r}}$ 

### Newtons laws

First law
- Isaac newton(1642-1727)
- an objects' velocity remains constant unless a net outside force acts upon it
- $\vec{v}(t) =\vec{v_0} =const$

second law
- $\vec{F} = m\vec{a}(t)$
- $\vec{F} = \frac{d\vec{p}(t)}{dt}$
- $d\vec{v}/dt =\vec{f}/m$
- force changes velocity
- used a lot in computational math

third law
- forces come in pairs, equal in magnitude, and opposite in direction

Newtonian gravity
- a force, grav, exsits between any two objects having mass m and M, prop to the product of their masses mM and inversely proportinal tothe square of the separtation distance r of their centers
- for coordinates centered on M:
- $\vec{F} = -G\frac{Mm}{|\vec{r}|^2}\hat{r}$

### Displacement vector and polar coordinates

- cartesian coordinates are often written a (x,y,z) in a coordinate system centered on mass M
- Axis orientations are chosen so that [[The planets]] orbits in the x-y plane
- Displacement $\vec{r}(t) =x(t)\hat{i} +y(t)\hat{j}$

velocity vector and polar coordinates
- unit vectors in polar coordinates vary with $\theta(t)$
- $$\frac{d\hat{r}(t)}{dt} = \frac{d\hat{r}(t)}{d\theta} \frac{d\theta(t)}{dt} = \frac{d\theta(t)}{dt} \hat{\theta}(t)$$
- .
- .
- .
- $$\vec{v}(t) = v_r\hat{r} +v_t\hat{\theta}$$
- two velocity components in polar coords

### Kepler laws: angular momentum

- .

### keplers 2nd law = consv, angular momentum

- $$d\vec{L}/dt=0$$
- $$\vec{L} =\vec{R} ×\vec{p} = \vec{r}× m\vec{v}= const$$
- $$⇒ |\vec{v}|=L = mrv_1$$

### Keplers Laws

#### Keplers First Law

- $\frac{d\vec{v}}{dt} = -\frac{GM}{r_2}\hat{r}$
- $$\frac{L}{GMm} \frac{d\vec{v}}{dt} = \frac{d\hat{\theta}}{dt}$$
- $$\frac{L}{GMm}\vec{v} = \hat{\theta} + e\hat{j}$$
- take dot product of both sides with unit vector $\hat{\theta}, using$
- $\hat{j}·\hat{\theta} = \cos\theta$
- $$\vec{v} · \hat{\theta} = v_t = \frac{L}{mr}$$

### Kepler III

- we know that $\frac{dA}{dt} = \frac{l}{2m} = const$
- area of a ellipse $a =\pi ab$ of orb period p.
- $$\therefore \frac{A}{P} = \frac{\pi ab}{P} = \frac{L}{2m}$$
- eclipse geo : $b^2 = a^2(1-e^2)$
- also, $\frac{L^2}{m^2} GMa(1-e^2)$
- $$P^2 = \frac{4\pi^2}{GM}a^3$$
