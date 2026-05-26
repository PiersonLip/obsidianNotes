---
aliases:
tags:
  - python
---
[Documenation](https://docs.python.org/3/library/multiprocessing.html)

Notes on Python [[multiprocessing]] module 

## Caveats 
---
- **doesn't work in notebooks** [^1]


[^1]: sorta, if the function is it's own file (i.e. `func.py` and its imported, )


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

```run-python
from multiprocessing import Pool, cpu_count
import numpy as np
import pandas as pd

# ---- dummy data ----
def make_dummy_df():
    np.random.seed(42)
    n = 1_000
    return pd.DataFrame({
        'value': np.random.randint(0, 100, n),
        'label': np.random.choice(['cat', 'dog', 'bird'], n),
    })

# ---- worker function (runs in each subprocess) ----
def filter_chunk(args):
    df_chunk, threshold = args

    mask = (df_chunk['value'] > threshold) & (df_chunk['label'] == 'cat')
    return df_chunk[mask]

# ---- main orchestrator ----
def process(df, threshold, n_workers=cpu_workers):
    chunks = np.array_split(df, n_workers)

    job_args = [(chunk, threshold) for chunk in chunks]

    # Pool spins up n_workers subprocesses
    # .map() sends each element of job_args to filter_chunk in parallel
    # blocks until ALL workers are done, then returns list of results
    with Pool(n_workers) as pool:
        results = pool.map(filter_chunk, job_args)

    # results is a list of dataframes, one per worker — concat them back together
    return pd.concat(results)

if __name__ == "__main__":          # required on some platforms for multiprocessing
    df = make_dummy_df()
    print(f"Total rows: {len(df)}")

    filtered = process(df, threshold=50, n_workers=4)
    print(f"Filtered rows: {len(filtered)}")
    print(filtered.head())
```

[^1]: 
