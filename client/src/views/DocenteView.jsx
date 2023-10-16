import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaDocente from "../forms/Docente/ListaDocente";
import AddDocente from "../forms/Docente/AddDocente";
import { useNavigate } from "react-router-dom";
import { contexto } from "../context/ContextProvider";
import API_URL from "../config";

const DocenteView = () => {
  const { usuario } = useContext(contexto);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const obtenerDocentes = async () => {
    const respuesta = await fetch(`${API_URL}/user/getall`);
    const datos = await respuesta.json();
    setData(datos);
  };

  useEffect(() => {
    obtenerDocentes();
  }, []);

  console.log(data);

  if (usuario === null) {
    navigate("/");
  } else if (usuario.rol == "admin") {
    return (
      <div className="flex w-11/12 flex-col mx-auto">
        <Tabs color="primary">
          <Tab key="photos" title="Lista de docentes">
            <Card>
              <CardBody>
                <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                  Listado de docentes
                </h2>
                <ListaDocente data={data} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Añadir Docente">
            <Card>
              <CardBody>
                <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                  Añadir nuevo docente
                </h2>
                <AddDocente />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    );
  } else if (usuario.rol == "docente") {
    navigate("/home");
  }
};

export default DocenteView;
