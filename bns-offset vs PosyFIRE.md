# bns-offset 
---
Pipeline 
![[bns-offset vs PosyFIRE 2026-06-25 12.38.28.excalidraw]]
## Galaxy Modeling 
---
```python
host_cfg = {

"galaxy_type": "spheroid", # or "spheroid" #Gaspari+2024, Table 1, Column 2

"MB": -19.12, #Gaspari+2024, Table 1, Column 5

"logMstar":10.61, #Gaspari+2024, Table 1, Column 6

"Rhalf": 3.3, #Gaspari+2024, Table 1, Column 9

"n": 3.9, #Gaspari+2024, Table 1, Column 10

"Rms_half": 3.88, #Gaspari+2024, Table 1, Column 11

"include_halo": True,

"exp_z": False,

}
```