---
tags:
  - astro-notes/astrobite
---

# Astrobites

```base
filters:
  and:
    - file.inFolder("AstroBites")
    - file.name != "Astrobites.md"
views:
  - type: list
    name: Notes
    order:
      - file.name
```
