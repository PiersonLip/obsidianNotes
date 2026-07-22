---
status: stub
tags:
  - nvim
---
# Man this is a horrid idea

## Selecting dropdown options 
Tab :P 

## Running stuff 
 <leader> nA  - run all above
 <leader> nB  - run all below
 <leader> nR  - run all

Typical flow:

1.

Connect to Quest and open your notebook as usual (

:JupynvimConnect quest

, then open the

.ipynb

)

2.

Get a compute allocation on the cluster (in

:JupynvimTerm

or another SSH session), e.g.

salloc

/ interactive job, then note the

job id

(

squeue -u $USER

)

3.

Point jupynvim at that job: :JupynvimUseJob quest 12345678

Replace

12345678

with your real Slurm job id. That wraps the backend in

srun --jobid=… --overlap --unbuffered

so kernels run on the compute node.

4.

Restart the kernel if one was already running:

:JupynvimRestart

Clear it (back to login node): :JupynvimUseJob quest
 
 