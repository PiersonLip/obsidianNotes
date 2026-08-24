---
category: class-section
course: physics212
section: Capacitors
tags:
  - astro-notes/class-section
  - physics212
---
# Capacitors

[[Class Notes/Physics212/Physics212|← Physics212]]

---

**What happens if we pull apart a parallel plate capacitor?**
- $Q$ remains constant
- $E$ increases
- $\Delta V$ increases
- $C$ decreases
- $U$ increases

### Dielectrics

- Material where positive and negative charges in individual molecules can change, but no through the entire material
- When placed between a capacitor all of the charges align themselves to the field
- This creates a material full of little dipoles
- This induced field is the *opposite* of the one from the plates
- This has the effect of *reducing* the electric field within the capacitor, which then reduces the potential diff ($V$), which then *increases* the capacitance
- 
$$
C = \frac{Q}{V}
$$

- The amount a capacitance increases is called the [[Dielectric Constant]] and is calculated via $C_{old} = \kappa C_{new}$

> [!example] Example
>
> Adding a Dielectric to a Capacitor
>
>
> ---
>
>
> ![[physics212-capacitors-1.png]]
>
> - Capacitance increases
> - $V_c = V_b$
> - Because $C = \frac{Q}{V} \rightrightarrows Q\uparrow$
> - Because $ U = \frac{1}{2} Q V_c \rightrightarrows U \uparrow$

### Capacitors in Parallel

- When wired in parallel they can be treated as one capacitor with a larger area
- this equivalent capacitor has… 
$$
V_{equiv} = V_1 = V_2    C_{equiv} = C_1 + C_2,    Q_{equiv} = Q_1 + Q_2
$$

### Capacitor in series

- When wired in series they act like a capacitor with a large distance
- This equivalent capacitor has … 
$$
Q_{equiv} = Q_1 = Q_2    \frac{1}{C_{equiv}} = \frac{1}{C_1} + \frac{1}{C_2},    V_{equiv} =V_1 + V_2
$$

> [!example] Combination of Capacitors
>
> ---
>
>
> ![[physics212-capacitors-2.png]]
>
> Simply into single capacitors 
>
> $$
> C_2, C_3 \rightarrow \frac{1}{C_{23}} = \frac{1}{C_2} + \frac{1}{C_3} = 1.2\text{mF}
> $$
>
> $$
> C_1, C_{23} \rightarrow C_1 + C_{23} = C_{123}= 2.2\text{mF}
> $$
