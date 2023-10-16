import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaDocente from "../forms/Docente/ListaDocente";
import AddDocente from "../forms/Docente/AddDocente";
import { useNavigate, Navigate } from "react-router-dom";
import { contexto } from "../context/ContextProvider";
import API_URL from "../config";

const DocenteView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario, docentes } = useContext(contexto);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDocentes();
  }, [docentes]);

  const obtenerDocentes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los medicamentos");
        throw new Error("Error al filtrar los medicamentos", {});
      }

      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (usuario) {
    if (usuario.rol == "admin") {
      return (
        <div className="flex w-11/12 flex-col mx-auto">
          <Tabs color="primary">
            <Tab key="photos" title="Lista de docentes">
              <Card>
                <CardBody>
                  <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white text-primary">
                    Listado de docentes
                  </h2>
                  <ListaDocente data={data} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Añadir Docente">
              <Card>
                <CardBody>
                  <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white text-primary">
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
  } else {
    return <Navigate to={"/"} />;
  }
};

export default DocenteView;
