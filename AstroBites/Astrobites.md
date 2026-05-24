---
tags:
  - astro-notes/astrobite
---

# Astrobites

```base
filters:
  and:
    - file.tags.contains("astro-notes/astrobite")
    - file.name != "Astrobites.md"
views:
  - type: list
    name: Notes
    order:
      - file.name
```
