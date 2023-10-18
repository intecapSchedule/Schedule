import React, { useState, useEffect, useContext } from "react";
import API_URL from "../config";

const DocenteCursos = () => {
  const [cursos, setCursos] = useState([]);

  const obtenerCursos = async () => {
    const usuario = JSON.parse(localStorage.getItem("demasdatosINTECAP"));
    try {
      const response = await fetch(`${API_URL}/user/getbyid/${usuario._id}`, {
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
      setCursos(data);
    } catch (error) {}
  };

  useEffect(() => {
    obtenerCursos();
  }, []);

  const courses = cursos;

  courses.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));

  const months = [
    { name: "Enero", days: 31 },
    { name: "Febrero", days: 28 },
    { name: "Marzo", days: 31 },
    { name: "Abril", days: 30 },
    { name: "Mayo", days: 31 },
    { name: "Junio", days: 30 },
    { name: "Julio", days: 31 },
    { name: "Agosto", days: 31 },
    { name: "Septiembre", days: 30 },
    { name: "Octubre", days: 31 },
    { name: "Noviembre", days: 30 },
    { name: "Diciembre", days: 31 },
  ];

  const totalDaysInYear = months.reduce((acc, month) => acc + month.days, 0);

  const colores = [
    "#4496f7",
    "#459af8",
    "#46a0f8",
    "#48a5f8",
    "#49a9f9",
    "#4aaff9",
    "#4cb4f9",
    "#4db9fa",
    "#4fbcfa",
    "#50c2fa",
    "#51c6fb",
    "#E9F1FD",
    "#FFFFFF",
    "#FFFFF9",
  ];

  const getRandomColor = () => {
    return colores[Math.floor(Math.random() * colores.length)];
  };

  return (
    <>
      <div className="mx-auto w-11/12 relative border-1 shadow-md p-4 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold text-center mb-3 -mt-1 text-primary">Proyección de cursos en el año</h1>
        <div className="flex justify-between">
          {months.map((month) => (
            <div key={month.name} className="text-center w-1/12 border-1 border-blue-600 overflow-hidden px-1">
              {month.name}
            </div>
          ))}
        </div>
        <div className="relative border-1 border-blue-600 rounded-b-lg overflow-hidden">
          {courses.map((course) => {
            const startDate = new Date(course.fechaInicio);
            const endDate = new Date(course.fechaFinal);

            const daysFromStart =
              months.slice(0, startDate.getMonth()).reduce((acc, month) => acc + month.days, 0) +
              startDate.getDate() -
              1;

            const courseWidth = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

            const randomColor = getRandomColor();

            const courseStyle = {
              backgroundColor: randomColor,
              border: "1px solid #000", // Agrega un borde de 1px a los elementos de curso
              borderRadius: "4px",
              width: `${(courseWidth / totalDaysInYear) * 100}%`,
              height: "30px", // Aumenta la altura para el texto
              marginBottom: "1px",
              marginLeft: "0.35rem",
              marginBottom: "3px",
              marginTop: "3px",
              position: "relative",
              left: `${(daysFromStart / totalDaysInYear) * 100}%`,
            };

            const lineStyle = {
              position: "absolute",
              width: "2px", // Ancho de la línea
              background: "black", // Color de la línea
              height: "100%", // Ocupa todo el alto del contenedor
              left: "0",
              top: "0",
            };

            const textStyle = {
              position: "absolute",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: "3px",
              marginLeft: "5px",
              paddingTop: "2px",
              fontSize: "13px",
              maxWidth: `${(courseWidth / totalDaysInYear) * 1100 - 1}%`,
            };

            return (
              <div key={course.nombre} style={courseStyle}>
                <div style={lineStyle} />
                <div style={textStyle} className="overflow-hidden hover:overflow-visible cursor-pointer">
                  {course.nombre}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-auto w-11/12 relative border-1 shadow-md p-4 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold text-center mb-3 -mt-1 text-primary">Lista de cursos</h1>
      </div>
    </>
  );
};

export default DocenteCursos;
