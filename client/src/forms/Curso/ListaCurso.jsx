import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { format, addDays } from "date-fns";
import API_URL from "../../config.js";
import toast, { Toaster } from "react-hot-toast";
import { contexto } from "../../context/ContextProvider.jsx";

const ListaCurso = ({ data }) => {
  return (
    <div className="w-full mx-auto">
      <Table isStriped>
        <TableHeader>
          <TableColumn className="font-bold text-lg">Ícono</TableColumn>
          <TableColumn className="font-bold text-lg">ID Curso</TableColumn>
          <TableColumn className="font-bold text-lg">Nombre Curso</TableColumn>
          <TableColumn className="font-bold text-lg">Duración</TableColumn>
          <TableColumn className="font-bold text-lg">Horario</TableColumn>
          <TableColumn className="font-bold text-lg text-center" width="200">
            Días
          </TableColumn>
          <TableColumn className="font-bold text-lg" width={3}>
            Taller/Laboratorio
          </TableColumn>
          <TableColumn className="font-bold text-lg text-center" align="center">
            Ver
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Avatar
                  showFallback
                  color="success"
                  fallback={(row?.nombre ?? "")
                    .split(" ")
                    .map((palabra) => palabra[0].toUpperCase())
                    .join("")}
                />
              </TableCell>
              <TableCell>{row._id.slice(-6)}</TableCell>
              <TableCell>{row?.nombre ?? ""}</TableCell>
              <TableCell>
                <div>
                  {format(addDays(new Date(row?.fechaInicio), 1), "dd-MM-yyyy") ?? ""} <br />
                  {format(addDays(new Date(row?.fechaFinal), 1), "dd-MM-yyyy") ?? ""}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  De: {row?.horario[0] ?? ""} <br /> A: {row?.horario[row?.horario.length - 1] ?? ""}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {row?.dias.map((dia) => (
                    <Chip
                      classNames={{
                        base: `${
                          dia === "Lunes"
                            ? "bg-[#FFD700]"
                            : dia === "Martes"
                            ? "bg-[#87CEEB]"
                            : dia === "Miércoles"
                            ? "bg-[#98FB98]"
                            : dia === "Jueves"
                            ? "bg-[#FFA07A]"
                            : dia === "Viernes"
                            ? "bg-[#AFB6F1]"
                            : dia === "Sábado"
                            ? "bg-[#D8BFD8]"
                            : dia === "Domingo"
                            ? "bg-[#BFE4B5]"
                            : "bg-neutral-300"
                        }`,
                        content: "w-[75px] text-center",
                      }}
                    >
                      {dia}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>{row?.taller ?? ""}</TableCell>
              <TableCell>
                <Button color="success">Ver</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListaCurso; // Cambiamos el nombre del componente
