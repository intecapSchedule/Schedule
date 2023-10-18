import React, { useContext } from "react";
import { contexto } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";

const Homepage = () => {
  const { usuario } = useContext(contexto);
  if (usuario) {
    if (usuario.rol == "docente") {
      return <Navigate to={"/miscursos"} />;
    } else if (usuario.rol === "admin") {
      return <Navigate to={"/docentes"} />;
    }
  } else {
    return <Navigate to={"/"} />;
  }
};

export default Homepage;
