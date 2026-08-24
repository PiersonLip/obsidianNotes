---
category: class-section
course: physics212
section: Conductors and Capacitance
tags:
  - astro-notes/class-section
  - physics212
---
# Conductors and Capacitance

[[Class Notes/Physics212/Physics212|← Physics212]]

---

### Conductors

- Every point in a conductor is at equipotential, this is because the electric field at any point is zero.
- Contuining with Gausses law, no matter the location of a charge contained *inside* a shell (but not overlapping the shell itself), the outside of the shell will have the same charge distribution, however the inside may not.
- When looking at the inverse, (a particle placed *outside* of a conductor), we find that the charges move to the surface to cancel out the exerted field, meaning that the inside of the object will have a net charge of 0.
- Importantly, this still applies when a cavity is made *within the conductor*
- This allows for the shielding of an object if it is placed within a conductor  (Think Faraday cage (maybe))

> [!example] Equipotential difference in two Spheres
>
> ---
>
>
> ![[physics212-conductors-and-capacitance-1.png]]
>
>
> $$
>
> V_A = - \int_{\infty}^{R_A} \vec{E}_A \cdot \vec{dl},
>
> V_B = - \int_{\infty}^{R_B} \vec{E}_B \cdot \vec{dl}
>
> $$
>
> Given a point charge …
>
> $$
>
> \vec{E} = k\frac{Q}{r^2} 
> \rightarrow 
> -\int_{\infty}^{r} k \frac{Q}{r^2} = k \frac{Q}{r}
> \rightarrow 
>
> $$
>
> For a point charge…
>
> $$
> V = k \frac{Q}{r}
> $$
>
>
> $$
>
> V_A = k \frac{Q}{R_A},
>
> V_B = k \frac{Q}{4 R_B}
>
> $$
>
>
> $$
>
> 4 \times V_A = V_B 
>
> $$
>
> Once connected, become a single conductor which wishes to reach equipotential. To find final charges …
>
> $$
>
> V_A = V_B 
> \rightrightarrows
> k \frac{Q_A}{R_A} = k \frac{Q_B}{R_B}
>
> $$
>
>
> $$
>
> \cancel{k} \frac{Q_A}{R_A} = \cancel{k} \frac{Q_B}{4 R_A}
>
> $$
>
>
> $$
>
> 4Q_A = Q_B
>
> $$

### Capacitance

> [!equation] [[Equations/Capacitance|Capacitance]]
> <a id="eq:Capacitance"></a>
> Units of Farads, or Coulombs per volt
>

$$
C \equiv \frac{Q}{\Delta V}
$$

- Measure of field between to oppositely charged objects
- Ex. A plate of Q and -Q placed a distance d away from one another
- Stores the energy *in* the magnetic field induced between said objects

> [!example] Capacitance between two plates
>
> ---
>
>
> ![[physics212-conductors-and-capacitance-2.png]]
>
> To calculate E field between plates …
>
> $$
>
> E_{bot} = \frac{1}{2} \frac{\sigma}{\epsilon_0},
>
> E_{top} = \frac{1}{2} \frac{\sigma}{\epsilon_0}
>
> $$
>
>
> $$
>
> \sigma = \frac{Q}{A}
>
> $$
>
>
> $$
>
> E_{bot} = \frac{1}{2} \frac{Q}{\epsilon_0 A },
>
> E_{top} = \frac{1}{2} \frac{Q}{\epsilon_0 A}
>
> $$
>
> Since field lines are the same direction…
>
> $$
>
> E_{tot} = \frac{Q}{\epsilon_0 A}
>
> $$
>
>
> To find capacitance…
>
> $$
>
> C \equiv \frac{Q}{\Delta V}
>
> $$
>
>
> $$
>
> \left|\Delta V\right| = \int_{bot}^{top} \vec{E} \cdot dl 
> \rightrightarrows
> \Delta V = \frac{Q}{\epsilon_0 A} \int_{bot}^{top} dl 
>
> $$
>
>
> $$
>
> \Delta V = \frac{Q}{\epsilon_0 A} d
>
> $$
>
>
> $$
>
> C = \frac{\epsilon_0 A}{d}
>
> $$

> [!equation] [[Equations/Capacitance for Parallel Plates|Capacitance for Parallel Plates]]
> <a id="eq:capacitance_for_parrel_plates"></a>
>

$$
C = \frac{\epsilon_0 A}{d}
$$

> [!example] Parallel Plate Capacitor
>
> ---
>
>
> ![[physics212-conductors-and-capacitance-3.png]]
>
> To calculate the work needed to move a particle from the bottom plate to the top plate 
>
> $$
> dW = dq E d
> $$
>
> Since we know that the energy from the electric field is equal to $\frac{V}{d}$…
>
> $$
>
> dW = dq \frac{V}{\cancel{d}} \cancel{d}
>
> $$
>
>
> $$
>
> dU = V dq
>
> $$
>
> This holds true for *any system*. Note that dU is *not* constant because for each particle moved, it becomes requires more work for the next. 
>
> To calculate potential of a capacitor…
>
>
> $$
>
> U = \int_{0}^{Q} V dq 
> \rightrightarrows
> U = \int_{0}^{Q} \frac{q}{c} dq
>
> $$
>
> Thus …
>
> $$
>
> U = \frac{1}{2} \frac{Q^2}{C}
>
> $$

> [!equation] [[Equations/Potential of a Capacitor|Potential of a Capacitor]]
> <a id="eq:Capacitor_potential"></a>
>

$$
U = \frac{1}{2} \frac{Q^2}{C}   
U = \frac{1}{2} CV^2   
U = \frac{1}{2} QV
$$

> [!equation] [[Equations/Energy density of a capacitor|Energy density of a capacitor]]
> <a id="eq:capacitor_energy_density"></a>
>

$$
u = \frac{1}{2} \epsilon_0 E^2
$$
