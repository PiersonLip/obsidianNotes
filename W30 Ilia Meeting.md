---
status: stub
tags:
  - astro-notes/research
---
# Things to consider, assumptions, etc etc 
 - [ ] Blauuw kicks .\_., not currently implemented (maybe), but the mass loss kicks will have an pretty large effect... do we wanna just plow forward or should implement this 

# MW model ****
----

For the low/high Fe disks 

As reported by Licquia and newmen 2015, bulge mass is $.9 \times 10^{10} M_{\odot}$
and stellar disk mass is $5.2 \times 10^{10} M_{\odot}$, which is split equally between both metallicity components 

## SFR 
---
For the disks...
$$
p(\tau) \propto \exp\left(- \frac{(\tau_{m} - \tau )}{ \tau_{SFR}}\right) 
$$
Where $\tau$ is the lookback time, and $\tau_{SFR} = 6.8$ Gyr is the star formation timescale. 

The disks have two distinct sfr periods, i.e. low metallicty disk has formation in the early uni (8-12 Gyr ago) and low fe forms more recent (0-8Gyr)


## Radial Distribution 
---
All of the components radially evolve such as...
$$
p(R) = \exp\left( - \frac{R} {R_{d} }\right) \frac{R}{R^2_{d}}
$$
But with different scale lengths ($R_{d}$)