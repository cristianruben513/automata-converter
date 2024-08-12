import { Transiciones } from "@/types/transition";

export function SimpleDotConverter(
  transiciones: Transiciones,
  initialState: string,
  finalStates: string[]
): string {
  let dotCode = 'digraph {\n';

  // agregar setup
  dotCode += `
    fontname = "Helvetica,Arial,sans-serif"
    node [fontname = "Helvetica,Arial,sans-serif"]
    edge [fontname = "Helvetica,Arial,sans-serif"]
    rankdir=LR;
    node [shape = circle]
  `

  // agregar el estado inicial
  dotCode += `
    inicio [style = invis]
    inicio -> ${initialState}
  `

  // Agregar aristas al código DOT
  for (const estado in transiciones) {
    for (const simbolo in transiciones[estado]) {
      const destinos = transiciones[estado][simbolo];
      for (const destino of destinos) {
        dotCode += `  ${estado} -> ${destino} [label="${simbolo}"];\n`;
      }
    }
  }

  // agregar los estados finales
  for (const finalState of finalStates) {
    dotCode += `
        ${finalState} [shape = doublecircle]
      `
  }

  dotCode += '}';
  return dotCode;
}
