---
course: astro210
tags:
  - astro-notes/class
  - astro210
---

# Astro210

```base
filters:
  and:
    - file.inFolder("Class Notes/Astro210")
    - file.name != "Astro210.md"
views:
  - type: list
    name: Topics
    order:
      - file.name
```
