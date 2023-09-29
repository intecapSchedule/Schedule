import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Avatar } from "@nextui-org/react";

const ListaTaller = ({ data }) => {
  // Cambiamos el nombre del componente
  return (
    <div className="w-full mx-auto">
      <Table isStriped>
        <TableHeader>
          <TableColumn className="font-bold text-lg">Foto</TableColumn>
          <TableColumn className="font-bold text-lg">ID</TableColumn>
          <TableColumn className="font-bold text-lg">Nombre Taller</TableColumn>
          <TableColumn className="font-bold text-lg">Número de Salón</TableColumn>
          <TableColumn className="font-bold text-lg">Ver</TableColumn>
          <TableColumn className="font-bold text-lg">Editar</TableColumn>
          <TableColumn className="font-bold text-lg">Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Avatar src={row.fotoSrc} />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombreTaller}</TableCell>
              <TableCell>{row.numeroSalon}</TableCell>
              <TableCell>
                <Button color="secondary">Ver</Button>
              </TableCell>
              <TableCell>
                <Button color="warning">Editar</Button>
              </TableCell>
              <TableCell>
                <Button color="danger">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaTaller; // Cambiamos el nombre del componente
