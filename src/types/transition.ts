export interface Transiciones {
  [estado: string]: {
    [simbolo: string]: string[];
  };
}
