import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const ListaDocente = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  return (
    <div className="w-full mx-auto">
      <Table isStriped>
        <TableHeader>
          <TableColumn className="font-bold text-lg">Foto</TableColumn>
          <TableColumn className="font-bold text-lg">ID</TableColumn>
          <TableColumn className="font-bold text-lg">Nombre Completo</TableColumn>
          <TableColumn className="font-bold text-lg">Correo</TableColumn>
          <TableColumn className="font-bold text-lg">Ver</TableColumn>
          <TableColumn className="font-bold text-lg">Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Avatar
                  showFallback
                  color="primary"
                  fallback={(row?.nombre + " " + row?.apellido ?? "")
                    .split(" ")
                    .map((palabra) => palabra[0].toUpperCase())
                    .join("")}
                />
              </TableCell>
              <TableCell>{row._id.slice(-6)}</TableCell>
              <TableCell>{row?.nombre + " " + row?.apellido}</TableCell>
              <TableCell>{row.correo}</TableCell>
              <TableCell>
                <Button onClick={setUsuarioSeleccionado(row)} color="primary">
                  Ver
                </Button>
              </TableCell>
              <TableCell>
                <Button color="danger">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{usuarioSeleccionado?.nombre ?? ""}</ModalHeader>
              <ModalBody>
                <h1 className="font-bold text-center text-xl text-gray-500">{usuarioSeleccionado?.nombre}</h1>
                <Table removeWrapper isStriped aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn className="font-bold text-xl">Disponibles</TableColumn>
                    <TableColumn className="font-bold text-xl">
                      {usuarioSeleccionado?.cantidadTotal ?? ""}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="2">
                      <TableCell className="font-bold">Precio</TableCell>
                      <TableCell>{"Q. " + usuarioSeleccionado?.precio ?? ""}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell className="font-bold">Tipo</TableCell>
                      <TableCell>{usuarioSeleccionado?.tipo ?? ""}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mx-auto">
                  <div className="text-center">
                    <p>Seleccione la cantidad a vender</p>
                    <Button className="bg-danger" onClick={() => (restar > 0 ? setRestar(restar - 1) : null)}>
                      -1
                    </Button>
                    <Input
                      type="number"
                      className="w-[60px] inline-flex"
                      defaultValue={restar}
                      min="0"
                      size="lg"
                      isRequired
                      value={restar.toString()}
                      max={`${usuarioSeleccionado?.cantidadTotal}`}
                    />
                    <Button
                      className="bg-success"
                      size=""
                      onClick={() =>
                        usuarioSeleccionado.cantidadTotal > restar ? setRestar(restar + 1) : null
                      }
                    >
                      +1
                    </Button>
                  </div>
                  <Button className="w-full bg-primary mt-4 text-white" onClick={handleVender}>
                    Vender
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Linky
                  to={`/farmacia/medicamento/${usuarioSeleccionado._id}`}
                  state={{ usuarioSeleccionado }}
                  className="bg-warning flex items-center px-4 py-2 rounded-xl hover:bg-warning-400"
                >
                  Editar
                </Linky>

                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListaDocente;
