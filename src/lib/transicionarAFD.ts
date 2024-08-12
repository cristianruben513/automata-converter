interface Transicion {
  [simbolo: string]: string[];
}

interface AFD {
  [estado: string]: Transicion;
}

export function convertirArregloAAFD(arreglo: Array<{ [estado: string]: Transicion }>): AFD {
  const afd: AFD = {};

  for (const item of arreglo) {
    const estado = Object.keys(item)[0];
    afd[estado] = { ...item[estado] };
  }

  return afd;
}

