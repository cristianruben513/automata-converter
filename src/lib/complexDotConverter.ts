import { Transiciones } from "@/types/transition";

export function ComplexDotConverter(
  transiciones: Transiciones[],
  initialState: string,
): string {
  let dotCode = ""

  dotCode = 'digraph {\n';

  // agregar setup
  dotCode += `
    rankdir=LR;
    node [shape = circle]
  `

  // agregar el estado inicial
  dotCode += `
    inicio [style = invis]
    inicio -> ${initialState}
  `

  for (const transicion of transiciones) {
    // Agregar aristas al código DOT
    for (const estado in transicion) {
      for (const simbolo in transicion[estado]) {
        const destinos = transicion[estado][simbolo];
        for (const destino of destinos) {
          dotCode += `  ${estado} -> ${destino} [label="${simbolo}"];\n`;
        }
      }
    }
  }


  dotCode += '}';

  return dotCode;
}
