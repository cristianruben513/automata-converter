import { Transiciones } from '@/types/transition';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Props {
  transitions: Transiciones[];
  alphabet: string[];
}

export default function Tabla({ transitions, alphabet }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Estado</TableHead>
          {alphabet.map((symbol, index) => (
            <TableHead key={index}>{symbol}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {transitions.map((combinacion, index) => (
          <TableRow key={index}>
            {Object.entries(combinacion).map(([nombre, transicion]) => (
              <React.Fragment key={nombre}>
                <TableCell>{nombre}</TableCell>
                {alphabet.map((symbol, index) => (
                  <TableCell key={index}>{transicion[symbol]}</TableCell>
                ))}
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
