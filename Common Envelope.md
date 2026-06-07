---
aliases:
  - CE
tags:
  - astro-notes/generalNotes
---
## Common Envelope
---
A stage in [[binary star evolution]] where where star engulfs its binary pair in its envelope. This is most common when one star evolves into the [[giant]] phase. Happens on the timescale of $\sim10^3$ yr 

This process very commonly leads to in-spiraling and merger, as the orbital motion of one of the stars through the others leads to friction, shrinking the orbit. However, the energy dissipated into the shell from the loss of [[GPE]] can actually cause the ejection of said shell, created a low period system.  [@TaurisvandenHeuvel+2023] 

Very difficult to simulate due to the many magnitude range in both timescale and distance. 
# Onset and Main Phases of CE Evo
---
Onset of CE is believed to be connected with *one of the following situations*
- [[runaway-RLOF|runaway RLOF]]
- occurrence of [[Darwin instability]]
- Expansion of the [[accretor|accreting star]]

- [[mass transfer]] from a massive donor to a less massive causes an ***shrinking*** of the orbital period and the system, which would eventually lead to one star being engulfed by the other
- If the sum of spin angular moment is greater then a third of the total orbital angular momentum, ($|\vec{J_{1}}| + |\vec{J_{2}}| > 1/3 |\vec{L}|$), then there will be a violent shrinking of the orbit due to [[tidal forces]].
- If the accretor cannot hold onto all of the in-falling material, it will swell up, fill its [[Roche lobe]], and the system will become a [[contact binary]]
## Phases
---
- loss of [[co-rotation]]
- plunge-in
- slow (self-regulating) spiral-in 
- envelope ejection
## Asides
---
- This can also happen if the star has a large enough planet orbiting around it, producing low-mass He [[White Dwarf|WD]]
## Common Envelope ejection [@tauris2023]
---
- Whether not the envelope will be ejected is dependent on how good the system is at converting the [[GPE]] into [[KE]], this added KE can then eject the envelope
- This can be described as the efficiency $\alpha_{CE}$ of converting orbital energy $\Delta E_{orb}$
 $$E_{bind} = \alpha_{CE}\Delta E_{orb}$$

- Ability to eject a CE depends heavily on the evolutionary status of the donor at the onset of CE
- Separation post CE ejection is about 100-1000x smaller than at onset
$$
E_{bind} \equiv -\frac{GM_{donor} M_{env}}{\lambda R_{donor}}
$$
- $\lambda$ various heavily on stellar mass and evolutionary status
- For low max systems the envelopes of the donors are typically ejected, as $|E_{bind}|$ is typically quite small
- Many [[HMXB]]s with NSs will not survive CE and hence [[DNS]] mergers are rare, although these do theoretically form [[Thorne-Zytkov objects]]