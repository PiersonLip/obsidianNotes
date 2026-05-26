---
aliases:
tags:
  - python
---
[Documenation](https://docs.python.org/3/library/multiprocessing.html)

Notes on Python [[multiprocessing]] module 


## Implementation consists of...
---
- Breaking task into "chunks"
- These chunks are then each assigned to a cpu core using the `pool` [[object]]
- Pool($n$) where $n$ is the number of cores  
```python 
from multiprocessing import Pool

def f(x):
    return x*x

if __name__ == '__main__':
    with Pool(5) as p:
        print(p.map(f, [1, 2, 3]))
```

```python
[1,4,9]
```
