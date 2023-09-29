import React from "react";
import { Routes, Route } from "react-router-dom";
import ContextProvider from "./context/ContextProvider.jsx";

import Homepage from "./views/Homepage";
import Login from "./views/Login";
import NotFoundPage from "./views/NotFoundPage";
import Navibar from "./components/Navibar";
import DocenteView from "./views/DocenteView";
import CursoView from "./views/CursoView";
import Horario from "./views/Horario";
import Taller from "./views/Taller";

const App = () => {
  return (
    <ContextProvider>
      <Navibar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/docentes" element={<DocenteView />} />
        <Route path="/cursos" element={<CursoView />} />
        <Route path="/talleres" element={<Taller />} />
        <Route path="/horarios" element={<Horario />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
