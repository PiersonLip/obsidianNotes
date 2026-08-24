---
category: class-section
course: physics212
section: Polarization
tags:
  - astro-notes/class-section
  - physics212
---
# Polarization

[[Class Notes/Physics212/Physics212|← Physics212]]

### Problem Setup 1

A monochromatic laser beam of intensity $I_0 = 548 \text{ W/m}^2$ is polarized in the $y$-direction and travels in the $+z$-direction. This beam passes through a quarter-wave plate whose fast axis is oriented at $45^\circ$ clockwise with respect to the $x$-axis (viewed from the $+z$ side), converting the beam to circular polarization. After the quarter-wave plate, the beam passes through two polarizers: the first has its transmission axis aligned with the $x$-axis, and the second has its transmission axis at an angle $\theta_1 = 77^\circ$ relative to the $x$-axis.

![[physics212-polarization-1.png]]

### Questions and Solutions for Setup 1

\textbf{1) What is $I_{\text{mid}}$, the intensity of the beam immediately following the polarizer whose transmission axis is aligned with the $x$-axis?}

**Answer:** $274 \text{ W/m}^2$

**Derivation:** The quarter-wave plate converts the linearly polarized incident beam into a circularly polarized beam. The total intensity remains $I_0 = 548 \text{ W/m}^2$. When circularly polarized light passes through a linear polarizer (regardless of its transmission axis angle), exactly half of the intensity is transmitted.
$$I_{\text{mid}} = \frac{1}{2} I_0 = \frac{548}{2} = 274 \text{ W/m}^2$$

\textbf{2) What is $I_{\text{final}}$, the intensity of the beam immediately following the last polarizer?}

**Answer:** $13.8 \text{ W/m}^2$

**Derivation:** The beam exiting the first polarizer is linearly polarized along the $x$-axis with intensity $I_{\text{mid}} = 274 \text{ W/m}^2$. It then encounters the second polarizer, which has a transmission axis at $\theta_1 = 77^\circ$ relative to the $x$-axis. According to Malus's Law:
$$I_{\text{final}} = I_{\text{mid}} \cos^2(\theta_1)$$
$$I_{\text{final}} = 274 \cos^2(77^\circ) \approx 274 (0.22495)^2 \approx 13.86 \text{ W/m}^2$$

\textbf{3) What is the ratio of $E_{y,\text{final}}$, the maximum value of the $y$-component of the electric field immediately following the last polarizer, to $E_0$, the amplitude of the electric field oscillations in the incident polarized beam?}

**Answer:** $0.155$

**Derivation:** 
The initial electric field amplitude is $E_0$. After the QWP and the first polarizer (aligned with $x$), the electric field amplitude is $E_{\text{mid}} = \frac{E_0}{\sqrt{2}}$.
This field vector is aligned with the $x$-axis. It then projects onto the final polarizer's axis (at $\theta_1 = 77^\circ$):
$$E_{\text{final}} = E_{\text{mid}} \cos(77^\circ) = \frac{E_0}{\sqrt{2}} \cos(77^\circ)$$
This resulting vector $E_{\text{final}}$ points along the $77^\circ$ axis. Its $y$-component is found by multiplying by $\sin(77^\circ)$:
$$E_{y,\text{final}} = E_{\text{final}} \sin(77^\circ) = \frac{E_0}{\sqrt{2}} \cos(77^\circ) \sin(77^\circ)$$
Dividing by $E_0$ yields the ratio:
$$\frac{E_{y,\text{final}}}{E_0} = \frac{1}{\sqrt{2}} \cos(77^\circ) \sin(77^\circ) \approx 0.7071 \times 0.2249 \times 0.9743 \approx 0.155$$

### Problem Setup 2

**4) The positions of the quarter-wave plate and the last polarizer are now interchanged.** The monochromatic laser beam still has intensity $I_0 = 548 \text{ W/m}^2$, is polarized in the $y$-direction, and propagates in the $+z$-direction. It now first passes through two polarizers before entering the quarter-wave plate. The transmission axis of the first polarizer makes an angle $\theta_1 = 77^\circ$ with respect to the $x$-axis. The transmission axis of the second polarizer is aligned with the $x$-axis. The fast axis of the quarter-wave plate makes a $45^\circ$ angle with the $x$-axis.

![[physics212-polarization-2.png]]

### Questions and Solutions for Setup 2

**What is the intensity of the beam after passing through this new arrangement?**

**Answer:** $26.3 \text{ W/m}^2$

**Derivation:** 
1. The incident beam is polarized along the $y$-axis ($90^\circ$ relative to $x$).
2. It hits the first polarizer at $77^\circ$. The angle difference is $\Delta\theta = 90^\circ - 77^\circ = 13^\circ$.
$$I_1 = I_0 \cos^2(13^\circ) = 548 \cos^2(13^\circ) \approx 520.0 \text{ W/m}^2$$
3. The beam hits the second polarizer at $0^\circ$ ($x$-axis). The angle difference is $\Delta\theta = 77^\circ - 0^\circ = 77^\circ$.
$$I_2 = I_1 \cos^2(77^\circ) = 520.0 \cos^2(77^\circ) \approx 26.3 \text{ W/m}^2$$
4. The beam passes through the quarter-wave plate. A wave plate changes the polarization state but does not alter the total intensity of the beam.
$$I_{\text{final}} = I_2 \approx 26.3 \text{ W/m}^2$$

**5) What is the polarization of the beam immediately following the quarter-wave plate?**

**Answer:** Circularly Polarized

**Derivation:** Immediately before entering the QWP, the beam passed through a polarizer aligned with the $x$-axis, meaning the light is linearly polarized along the $x$-axis. The QWP has its fast axis oriented at $45^\circ$ relative to the $x$-axis. When linearly polarized light enters a QWP at exactly $45^\circ$ to its principal axes, it introduces a $90^\circ$ ($\pi/2$) phase shift between the two orthogonal, equal-amplitude components, which produces circularly polarized light.

**6) Suppose you are free to rotate $\theta_1$, the transmission axis of the initial polarizer. How many values of $\theta_1$, where $0^\circ \leq \theta_1 < 180^\circ$, will produce a final intensity of zero after the quarter-wave plate?**

**Answer:** Two

**Derivation:** For the final intensity to be zero, the light must be completely blocked by one of the linear polarizers. 
The system transmission is proportional to: $\cos^2(90^\circ - \theta_1) \cdot \cos^2(\theta_1 - 0^\circ)$.
Setting this to zero means either term can be zero:
1. First term is zero: $\cos(90^\circ - \theta_1) = 0 \implies \theta_1 = 0^\circ$. The first polarizer blocks the incident $y$-polarized light entirely.
2. Second term is zero: $\cos(\theta_1) = 0 \implies \theta_1 = 90^\circ$. The light passes through the first polarizer but is entirely blocked by the second polarizer ($x$-axis).
Therefore, there are two distinct angles ($0^\circ$ and $90^\circ$) within the specified range that yield zero intensity.
