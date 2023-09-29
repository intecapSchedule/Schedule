import React from "react";
import { Routes, Route } from "react-router-dom";
import ContextProvider from "./context/ContextProvider.jsx";

import Homepage from "./views/Homepage";
import Login from "./views/Login";
import NotFoundPage from "./views/NotFoundPage";
import Navibar from "./components/Navibar";

const App = () => {
  return (
    <ContextProvider>
      <Navibar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
