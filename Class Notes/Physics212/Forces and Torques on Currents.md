---
category: class-section
course: physics212
section: Forces and Torques on Currents
tags:
  - astro-notes/class-section
  - physics212
---
# Forces and Torques on Currents

[[Class Notes/Physics212/Physics212|← Physics212]]

---

\begin{eqboxed}{eq:ForceOnACurentCarryingWire}{Force on a Current Carrying Wire}
{}
\vec{F} = I\vec{L} \times \vec{B}
\end{eqboxed}

> [!example] Force on a Curved Wire Segment
>
> ---
>
>
>
>
>
> ![[physics212-forces-and-torques-on-currents-1.png]]
>
>
>         - When looking at a curved wire inside a magnetic field, the only relavent part is the hight differnece (or perpendicular component). This is because the parrellel component doesn't have an effect, as its cross product w/the field is 0
> - This means to find the total force, you sum up all the vertical components
> - this is the same as adding all of them together
> - which is the same thing after finding the length between the start and end point (denoted as $L$) and taking the cross product of it with the field
> - This gives us the final equation of $F_{wire} = I\vec{L}\times \vec{B}$

\begin{eqboxed}{eq:TorqueOnCurrentLoop}{Torque On Current Loop}
{}
\tau_{loop} = IAB\sin\theta
\end{eqboxed}

\begin{eqboxed}{eq:MagneticDipoleMoment}{Magnetic Dipole Moment}
{Where N is number of coils}
\mu = NI\vec{A}
\end{eqboxed}
\begin{eqboxed}{eq:TorqueOnAloop}{Torque on a Loop}
{}
\vec{\tau} = \vec{\mu} \times \vec{B}
\end{eqboxed}

\begin{eqboxed}{eq:TorqueWork}{Torque Work}
{}
W = \int \tau d\theta
\end{eqboxed}

\begin{eqboxed}{eq:PotentialEnergyofDipoleinBField}{Potential Energy of Dipole in B Field}
{}
U(\theta) = -\vec{\mu} \cdot \vec{B}
\end{eqboxed}

\begin{eqboxed}{eq:workOnCurrentCarryingLoop}{Work on a Current Carrying Loop in a Mangetic Field}
{}
W = \int_{\theta_o}^{\theta_2} (-\mu B \sin\theta)) d\theta 
\end{eqboxed}

### Examples

---

> [!example] Forces and Torques on Current
>
> ---
>
>
>
>
>
> ![[physics212-forces-and-torques-on-currents-2.png]]
>
>
>
> Use [(eq:PotentialEnergyofDipoleinBField)](#eq:PotentialEnergyofDipoleinBField) and [(eq:MagneticDipoleMoment)](#eq:MagneticDipoleMoment)
>
> $$
> U_{\theta_1} = - \mu B \cos45^\circ
> $$
>
>
> $$
> U_{\theta_2} = - \mu B \cos135^\circ
> $$
>
>
> $$
> \Delta U = U(\theta_2) - U(\theta_1)
> $$
>
>
> $$
> \mu = NIA
> $$

> [!example] Square Current Loop with Gravity
>
> ---
>
>
>     A uniform magnetic field $B = 1.8 T$ points in the $+x$ direction. A square loop with side length $d = \text{cm}$, number of turns $20$, and current per turn $I =.85 \text{A}$ pivots without friction around a vertical pin aligned with the -axis.
>
>     The left panel shows a side view of the loop in the xy-plane. The loop is tilted at an angle $\theta = 30 ^\circ$ relative to the vertical xz-plane. The pivot is at the origin. The segment of the loop labeled CD lies in a plane that is rotated about the z-axis by the angle $\theta$. Gravity acts downward along the direction, and the magnetic field points horizontally along +x .
>
>     The right panel shows the top-down view of the loop, which is square with both horizontal and vertical sides of length d. Segment CD lies across the top edge of the square, and current circulates counterclockwise in the loop when viewed from above.
>
>     A mass M is hung from one vertical side of the loop, either from point C or point D. The system is in equilibrium at the angle $\theta$ described above.
>
>
> 
> \tdplotsetmaincoords{70}{120}
>
>
>
> ![[physics212-forces-and-torques-on-currents-3.png]]
>
>
>
>
> $$
> N = 12,   I = .85,   I_{eff} = 10.2,   d = .2\text{m},   B = 1.8 \text{T},   \theta = 30^\circ,   g \approx 9.7 \text{m/s}
> $$
>
>
> Using RHR, the magnetic moment points in the direction of $+y$. Using [(eq:MagneticDipoleMoment)](#eq:MagneticDipoleMoment)…
>
> $$
> \mu = NIA \rightrightarrows NID^2
> $$
>
> Using [(eq:TorqueOnAloop)](#eq:TorqueOnAloop)…
>
> $$
> |\tau_m| = NId^2 B \cos\theta
> $$
