---
tags:
  - POSYDON
  - programming/python
---
## POSYDON [[Common Envelope]] step
---
Upon envelope ejection ...

```Python
# Adjust binary properties
        binary.separation = separation_f
        binary.orbital_period = orbital_period_f
        binary.eccentricity = 0.0
        binary.state = 'detached'
        binary.event = None
```
Where `seperation_f` and `orbital_period_f` are calculated in a separate function

Import to note that there is *no* eccentricity in the system post CE ejection 