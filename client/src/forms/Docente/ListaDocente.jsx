import React, { useState, useContext } from "react";
import { format, addDays } from "date-fns";
import {
  Input,
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
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import API_URL from "../../config.js";
import toast, { Toaster } from "react-hot-toast";
import { contexto } from "../../context/ContextProvider.jsx";

const ListaDocente = ({ data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const roles = [
    {
      value: "admin",
      label: "Administrador",
    },
    {
      value: "docente",
      label: "Docente",
    },
  ];
  const [valueUsuario, setValueUsuario] = useState(roles);
  const [usuarios, setUsuarios] = useState(null);

  const [popOver, setPopOver] = useState(false);

  const { setDocentes, docentes } = useContext(contexto);

  ///////////////// USESTATE DE TODOS LOS CAMPOS //////////////////////////
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [rol, setRol] = useState("docente");

  const ActualizarDatos = (datos) => {
    setNombre(datos?.nombre ?? "");
    setApellido(datos?.apellido ?? "");
    setCorreo(datos?.correo ?? "");
    setUsername(datos?.username ?? "");
    setRol(datos?.rol ?? "");
  };

  const ActualizarDatosServer = async () => {
    const data = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      username: username,
      rol: rol?.currentKey ?? rol,
    };
    try {
      const response = await fetch(`${API_URL}/user/update/${usuarioSeleccionado?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario", {});
      }
      await response.json();
      toast.success("Usuario actualizado correctamente");
      setDocentes(!docentes);
      onOpenChange();
    } catch (error) {
      toast.error("Error al actualizar el usuario" + error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`${API_URL}/user/delete/${usuarioSeleccionado?._id ?? id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: false }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario", {});
      }
      await response.json();
      toast.success("Usuario eliminado correctamente");
      setDocentes(!docentes);
      onOpenChange();
    } catch (error) {
      toast.error("Error al eliminar el usuario" + error);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Toaster />
      <Table isStriped>
        <TableHeader>
          <TableColumn className="font-bold text-lg">Foto</TableColumn>
          <TableColumn className="font-bold text-lg">ID</TableColumn>
          <TableColumn className="font-bold text-lg">Nombre Completo</TableColumn>
          <TableColumn className="font-bold text-lg">Correo</TableColumn>
          <TableColumn className="font-bold text-lg">Ver</TableColumn>
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
                <Button
                  onClick={() => {
                    setUsuarioSeleccionado(row);
                    ActualizarDatos(row);
                    onOpen();
                  }}
                  color="primary"
                >
                  Ver
                </Button>
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
                <h1 className="font-bold text-center text-xl text-gray-500">
                  {"Información sobre " + usuarioSeleccionado?.nombre + " " + usuarioSeleccionado?.apellido ?? ""}
                </h1>
                <div className="flex flex-col gap-2 mt-4 w-full mx-auto">
                  <Input
                    label="Nombres"
                    type="text"
                    placeholder="Nombre"
                    defaultValue={usuarioSeleccionado?.nombre ?? ""}
                    value={nombre}
                    onValueChange={setNombre}
                  />
                  <Input
                    label="Apellidos"
                    type="text"
                    placeholder="Apellido"
                    defaultValue={usuarioSeleccionado?.apellido ?? ""}
                    value={apellido}
                    onValueChange={setApellido}
                  />
                  <Input
                    label="Correo"
                    type="email"
                    placeholder="Correo"
                    defaultValue={usuarioSeleccionado?.correo ?? ""}
                    value={correo}
                    onValueChange={setCorreo}
                  />
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Username"
                    defaultValue={usuarioSeleccionado?.username ?? ""}
                    value={username}
                    onValueChange={setUsername}
                  />
                  <p className="font-bold text-[17px] sm:hidden -mb-2 ">Seleccione el rol:</p>
                  <Select
                    label="Roles de usuario"
                    variant="bordered"
                    placeholder={usuarioSeleccionado?.rol}
                    selectedKeys={usuarios}
                    className="w-full"
                    onSelectionChange={setRol}
                  >
                    {valueUsuario.length > 0 ? (
                      valueUsuario.map((usuario) => (
                        <SelectItem key={usuario?.value} value={usuario?.value} s>
                          {usuario?.label ?? ""}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="cargando" text="Cargando retiroes..." disabled />
                    )}
                  </Select>
                  <div>
                    {usuarioSeleccionado?.cursos.length === 0 ? null : (
                      <h1 className="font-bold text-center mx-auto text-2xl">Cursos a cargo</h1>
                    )}
                    <div className="flex flex-col gap-2">
                      {usuarioSeleccionado?.cursos?.map((curso, index) => (
                        <div key={index} className="bg-slate-200 p-4 rounded-lg">
                          <h2>
                            <span className="font-bold">Nombre:</span> {curso?.nombre ?? ""}
                          </h2>
                          <h2>
                            <span className="font-bold">Descripcion: </span>
                            {curso?.descripcion ?? ""}
                          </h2>
                          <h2>
                            <span className="font-bold">Fecha Inicio:</span>{" "}
                            {format(addDays(new Date(curso?.fechaInicio), 1), "dd-MM-yyyy") ?? ""}
                          </h2>
                          <h2>
                            <span className="font-bold">Fecha Final:</span>{" "}
                            {format(addDays(new Date(curso?.fechaFinal), 1), "dd-MM-yyyy") ?? ""}
                          </h2>
                          <h2>
                            <span className="font-bold">Horario inicio: </span>
                            {curso?.horario[0] ?? ""}
                          </h2>
                          <h2>
                            <span className="font-bold">Días: </span>
                            {curso?.dias.join(", ") ?? ""}
                          </h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={ActualizarDatosServer}>
                  Actualizar datos
                </Button>
                <Popover placement="top" color="danger" isOpen={popOver}>
                  <PopoverTrigger>
                    <Button color="danger" onClick={() => setPopOver(true)}>
                      Eliminar usuario
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">¿Está seguro de querer eliminar al usuario?</div>
                      <div className="text-tiny">¡Esta acción no se puede deshacer!, ¿Desea continuar?</div>
                      <div className="mx-auto m-2 text-center">
                        <Button color="warning" className="mr-2" onClick={handleEliminar}>
                          Sí, deseo eliminarlo
                        </Button>
                        <Button color="primary" onClick={() => setPopOver(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                >
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
