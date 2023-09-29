import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Avatar } from "@nextui-org/react";

const ListaDocente = ({ data }) => {
  return (
    <div className="w-full mx-auto">
      <Table isStriped>
        <TableHeader>
          <TableColumn className="font-bold text-lg">Foto</TableColumn>
          <TableColumn className="font-bold text-lg">ID</TableColumn>
          <TableColumn className="font-bold text-lg">Nombre Completo</TableColumn>
          <TableColumn className="font-bold text-lg">Teléfono</TableColumn>
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
              <TableCell>{row.uuid}</TableCell>
              <TableCell>{row.nombreCompleto}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>
                <Button color="primary">Ver</Button>
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

export default ListaDocente;
