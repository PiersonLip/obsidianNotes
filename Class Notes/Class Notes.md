---
tags:
  - astro-notes/class
---

# Class Notes

```base
filters:
  and:
    - file.path.startsWith("Class Notes/")
    - 'file.path.split("/").slice(-1)[0].slice(0, -3) == file.path.split("/").slice(-2, -1)[0]'
views:
  - type: list
    name: Courses
    order:
      - file.name
```
