import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaTaller from "../forms/Taller/ListaTaller"; // Cambiamos el nombre del componente
import AddTaller from "../forms/Taller/AddTaller"; // Cambiamos el nombre del componente

const Taller = () => {
  // Cambiamos el nombre del componente
  const data = [
    {
      id: "TALLER001", // ID del taller
      nombreTaller: "Taller de Programación", // Nombre del taller
      numeroSalon: "Salón A", // Número de salón
    },
    {
      id: "TALLER002",
      nombreTaller: "Taller de Diseño Gráfico",
      numeroSalon: "Salón B",
    },
    // Agrega más datos de talleres aquí si es necesario
  ];

  return (
    <div className="flex w-11/12 flex-col mx-auto">
      <Tabs color="secondary">
        <Tab key="workshops" title="Lista de talleres">
          {" "}
          {/* Cambiamos el título del tab */}
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold md:text-5xl lg:text-3xl dark:text-white">
                Listado de talleres
              </h2>
              <ListaTaller data={data} /> {/* Cambiamos el nombre del componente */}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="addWorkshop" title="Añadir Taller">
          {" "}
          {/* Cambiamos el título del tab */}
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold md:text-5xl lg:text-3xl dark:text-white">
                Añadir nuevo taller
              </h2>
              <AddTaller /> {/* Cambiamos el nombre del componente */}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Taller; // Cambiamos el nombre del componente
