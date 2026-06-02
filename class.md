---
tags:
  - python
---
## Class
---
A "blueprint" used to create objects. Serves as a way to create a object that has a bunch of properties and functions it it of itself.

### Example
--- 
```python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canine"

    # Constructor / Initializer
    def __init__(self, name, breed):
        self.name = name        # Instance attribute
        self.breed = breed      # Instance attribute

    # Instance Method
    def bark(self):
        return f"{self.name} says Woof!"

```

```python
dog1 = Dog("dog of all time", "retriver")
dog1.name
dog1.breed
dog1.bark()
```
