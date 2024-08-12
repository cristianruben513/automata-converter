export const grafoOriginal = `
  digraph { 
    node [shape = circle]
    rankdir=LR;

    inicio [style = invis] 
    inicio -> q0 
    q0 -> q0 [label="0"]; 
    q0 -> q1 [label="0"]; 
    q0 -> q0 [label="1"]; 
    q1 -> q2 [label="0"]; 
    q1 -> q0 [label="1"]; 
    q1 -> q2 [label="1"]; 

    q2 [shape = doublecircle] 
  } 
`

export const grafoResultante = `
  digraph { 
    node [shape = circle] 
  }
`