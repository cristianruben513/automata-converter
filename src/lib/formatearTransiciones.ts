import { Transiciones } from "@/types/transition";

export function formatearTransiciones(datos: any[]): Transiciones {
  const transiciones: Transiciones = {};

  datos.forEach((dato) => {
    const partes = dato.value.split(',');

    const estadoActual = partes[0];
    const simbolo = partes[1];
    const estadoDestino = partes[2].trim();

    if (!transiciones[estadoActual]) {
      transiciones[estadoActual] = {};
    }

    if (!transiciones[estadoActual][simbolo]) {
      transiciones[estadoActual][simbolo] = [];
    }

    if (estadoDestino !== 'ø' && estadoDestino !== '') {
      transiciones[estadoActual][simbolo].push(estadoDestino);
    }
  });

  return transiciones;
}