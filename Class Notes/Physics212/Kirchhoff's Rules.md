---
category: class-section
course: physics212
section: Kirchhoff's Rules
tags:
  - astro-notes/class-section
  - physics212
---
# Kirchhoff's Rules

[[Class Notes/Physics212/Physics212|← Physics212]]

---

\begin{eqboxed}{eq:KirchhoffVoltageRule}{Kirchhoff Voltage Rule}
{In a ***closed*** circuit, if you return to the same location, no matter what path you take, the change in voltage will be 0. Very similar to conservation of energy in a magnetic field.}
\sum\Delta V_n = 0 
\end{eqboxed}

\begin{eqboxed}{eq:KirchhoffCurrentRule}{Kirchhoff Current Rule}
{At any node (location where two or more paths/wires meet), the current in must be equal to the current out (of said node)}
**$\sum I_{in$** = \sum I_{out}}, \text{at any node}
\end{eqboxed}

> [!example] Single Loop Example
        

![[physics212-kirchhoffs-rules-1.png]]

        Can be simply solved by using Ohms law and doing $I = \frac{V_b}{R_1 +R_2}$, or using Kirchhoff\\ 
        
        Using Kirchhoff's Voltage Rule ([(eq:KirchhoffVoltageRule)](#eq:KirchhoffVoltageRule)) we find the drop in current between $a \rightarrow b \rightarrow c \rightarrow V_b$
        
$$
\Delta V_1 = +IR_1,   \Delta V_1 = +IR_2,   \Delta V_1 = -V_b
$$

        
$$
 IR_1 + IR_2 - V_b = 0   \rightrightarrows   I = \frac{V_b}{R_1 +R_2 }
$$

<<<EXAMPLE_BODY_END>>>

> [!example] Two Loop Example
        
            

![[physics212-kirchhoffs-rules-2.png]]

        Using Kirchhoff's Current Rule([(eq:KirchhoffCurrentRule)](#eq:KirchhoffCurrentRule)) we find that $I_1 + I_2 +I_3 = 0$. To solve this we need equations with $I_1, I_2, I_3$

        Using Kirchhoff's Voltage Rule ([(eq:KirchhoffVoltageRule)](#eq:KirchhoffVoltageRule)) on the *outer* loop we get 
        
$$
I_3R_3 + V_2 + I_3R_1 - V_1
$$

        On the inner/left loop 
        
$$
I_2R_2 + I_1R_1 -V_1
$$

<<<EXAMPLE_BODY_END>>>
