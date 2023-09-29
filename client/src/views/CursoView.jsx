import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaCurso from "../forms/Curso/ListaCurso";
import AddCurso from "../forms/Curso/AddCurso";
const CursoView = () => {
  const data = [
    {
      fotoSrc: "https://example.com/curso1.jpg",
      idCurso: "CURSO001",
      nombreCurso: "Programación Avanzada",
      horario: "08:00 AM a 09:00 AM",
    },
    {
      fotoSrc: "https://example.com/curso2.jpg",
      idCurso: "CURSO002",
      nombreCurso: "Diseño Gráfico",
      horario: "09:00 AM a 10:00 AM",
    },
  ];
  return (
    <div className="flex w-11/12 flex-col mx-auto">
      <Tabs color="success">
        <Tab key="courses" title="Lista de cursos">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                Listado de cursos
              </h2>
              <ListaCurso data={data} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="addCourse" title="Añadir Curso">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                Añadir nuevo curso
              </h2>
              <AddCurso />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CursoView;
