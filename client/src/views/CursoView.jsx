import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaCurso from "../forms/Curso/ListaCurso";
import AddCurso from "../forms/Curso/AddCurso";
import { Navigate } from "react-router-dom";
import { contexto } from "../context/ContextProvider";
import API_URL from "../config";

const CursoView = () => {
  const [data, setData] = useState([]);
  const { usuario, cursos } = useContext(contexto);

  useEffect(() => {
    obtenerCursos();
  }, [cursos]);

  const obtenerCursos = async () => {
    try {
      const response = await fetch(`${API_URL}/curso/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los cursos");
        throw new Error("Error al filtrar los cursos", {});
      }

      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {}
  };

  if (usuario) {
    return (
      <div className="flex w-11/12 flex-col mx-auto">
        <Tabs color="success">
          <Tab key="courses" title="Lista de cursos">
            <Card>
              <CardBody>
                <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white text-success">
                  Listado de cursos
                </h2>
                <ListaCurso data={data} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="addCourse" title="Añadir Curso">
            <Card>
              <CardBody>
                <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white text-success">
                  Añadir nuevo curso
                </h2>
                <AddCurso />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default CursoView;
