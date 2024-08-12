interface Transicion {
  [simbolo: string]: string[];
}

interface AFD {
  [estado: string]: Transicion;
}

export function simplificarAFDtest(afd: AFD, initialState: string): AFD {
  // Paso 1: Eliminar estados inalcanzables
  const alcanzables = new Set<string>();

  const stack = [initialState]; // Iniciar desde el estado inicial

  while (stack.length > 0) {
    const estadoActual = stack.pop()!;
    alcanzables.add(estadoActual);
    const transiciones = afd[estadoActual];
    for (const simbolo in transiciones) {
      const destinos = transiciones[simbolo];
      for (const destino of destinos) {
        if (!alcanzables.has(destino)) {
          stack.push(destino);
        }
      }
    }
  }

  // Filtrar estados alcanzables
  const afdAlcanzable: AFD = {};
  for (const estado of alcanzables) {
    afdAlcanzable[estado] = { ...afd[estado] };
  }

  // Paso 2: Unir estados equivalentes (opcional, dependiendo del contexto)
  // Para este paso, necesitarías una función que determine la equivalencia entre estados.

  // Paso 3: Consolidar transiciones redundantes
  for (const estado in afdAlcanzable) {
    const transiciones = afdAlcanzable[estado];
    for (const simbolo in transiciones) {
      // Eliminar duplicados y ordenar
      transiciones[simbolo] = [...new Set(transiciones[simbolo])].sort();
    }
  }

  return afdAlcanzable;
}

export function simplificarAFD(afd: AFD): AFD {
  // Paso 1: Eliminar estados inalcanzables
  const alcanzables = new Set<string>();

  const stack = ['q0']; // Iniciar desde el estado inicial

  while (stack.length > 0) {
    const estadoActual = stack.pop()!;
    alcanzables.add(estadoActual);
    const transiciones = afd[estadoActual];
    for (const simbolo in transiciones) {
      const destinos = transiciones[simbolo];
      for (const destino of destinos) {
        if (!alcanzables.has(destino)) {
          stack.push(destino);
        }
      }
    }
  }

  // Filtrar estados alcanzables
  const afdAlcanzable: AFD = {};
  for (const estado of alcanzables) {
    afdAlcanzable[estado] = { ...afd[estado] };
  }

  // Paso 2: Unir estados equivalentes (opcional, dependiendo del contexto)
  // Para este paso, necesitarías una función que determine la equivalencia entre estados.

  // Paso 3: Consolidar transiciones redundantes
  for (const estado in afdAlcanzable) {
    const transiciones = afdAlcanzable[estado];
    for (const simbolo in transiciones) {
      // Eliminar duplicados y ordenar
      transiciones[simbolo] = [...new Set(transiciones[simbolo])].sort();
    }
  }

  return afdAlcanzable;
}

// formatear el afd para poder ingresarlo:
export function convertirArregloAAFD(arreglo: Array<{ [estado: string]: Transicion }>): AFD {
  const afd: AFD = {};

  for (const item of arreglo) {
    const estado = Object.keys(item)[0];
    afd[estado] = { ...item[estado] };
  }

  return afd;
}

// Ejemplo de uso
const afdOriginal: AFD = {
  'q0': { '0': ['q0q1'], '1': ['q0'] },
  'q1': { '0': [], '1': ['q2'] },
  'q2': { '0': [], '1': [] },
  'q0q1': { '0': ['q0q1'], '1': ['q0q2'] },
  'q0q2': { '0': ['q0q1'], '1': ['q0'] },
  'q1q2': { '0': [], '1': ['q2'] },
  'q0q1q2': { '0': ['q0q1'], '1': ['q0q2'] },
};

const afdSimplificado = simplificarAFD(afdOriginal);

console.log(afdSimplificado);
