interface AFD {
  [estado: string]: {
    [simbolo: string]: string[];
  };
}

export function convertirAFDAArreglo(afd: AFD): Array<{ [estado: string]: { [simbolo: string]: string[] } }> {
  return Object.keys(afd).map(estado => ({ [estado]: afd[estado] }));
}

// Ejemplo de uso
const afd: AFD = {
  'q0': { '0': ['q0q1'], '1': ['q0'] },
  'q0q1': { '0': ['q0q1'], '1': ['q0q2'] },
  'q0q2': { '0': ['q0q1'], '1': ['q0'] },
};

const afdEnArreglo = convertirAFDAArreglo(afd);

console.log(afdEnArreglo);
