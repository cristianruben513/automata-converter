import { Transiciones } from "@/types/transition";

type NestedObject = {
  [key: string]: string[];
};

type InputObject = {
  [key: string]: NestedObject;
};

function combinarObjetosInternos(transicion: Transiciones): Transiciones {
  const resultado: Transiciones = {};

  const claves = Object.keys(transicion);
  if (claves.length === 1) {
    return transicion;
  }

  const claveCombinada = claves.join('');

  for (const estado in transicion) {
    for (const simbolo in transicion[estado]) {
      if (!resultado[claveCombinada]) {
        resultado[claveCombinada] = {};
      }

      if (!resultado[claveCombinada][simbolo]) {
        resultado[claveCombinada][simbolo] = [];
      }

      // Eliminar duplicados antes de concatenar
      resultado[claveCombinada][simbolo] = Array.from(
        new Set(resultado[claveCombinada][simbolo].concat(transicion[estado][simbolo]))
      );
    }
  }

  return resultado;
}

export function obtenerCombinacionesTransiciones(transiciones: Transiciones): Transiciones[] {
  const estados = Object.keys(transiciones);
  const combinaciones: Transiciones[] = [];

  function combinar(actual: Transiciones, restantes: string[]): void {
    combinaciones.push(combinarObjetosInternos(actual));

    for (let i = 0; i < restantes.length; i++) {
      const estado = restantes[i];
      actual[estado] = { ...transiciones[estado] };
      combinar({ ...actual }, restantes.slice(i + 1));
      delete actual[estado];
    }
  }

  combinar({}, estados);

  // Ordenar las combinaciones por longitud del nombre principal
  combinaciones.sort((a, b) => {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    const lengthA = keysA[0]?.length || 0;
    const lengthB = keysB[0]?.length || 0;

    if (lengthA !== lengthB) {
      return lengthA - lengthB;
    }

    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    return aStr.localeCompare(bStr);
  });

  const concatenatedArray: InputObject[] = combinaciones.map((item) => {
    const newObject: InputObject = {};
  
    for (const key in item) {
      const nestedObject: NestedObject = item[key];
      const newNestedObject: NestedObject = {};
  
      for (const subKey in nestedObject) {
        const values = nestedObject[subKey];
        const concatenatedValue: string[] | string = values.length > 0 ? [values.join('')] : [];
        newNestedObject[subKey] = concatenatedValue;
      }
  
      newObject[key] = newNestedObject;
    }
  
    return newObject;
  });

  return concatenatedArray;
}

