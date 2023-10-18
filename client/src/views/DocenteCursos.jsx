import React from "react";

const DocenteCursos = () => {
  const courses = [
    { nombre: "Curso de comida", fechaInicio: "2023-03-01", fechaFinal: "2023-04-01" },
    { nombre: "Curso de mecánica", fechaInicio: "2023-05-01", fechaFinal: "2023-06-01" },
    { nombre: "Curso de inglés", fechaInicio: "2023-07-08", fechaFinal: "2023-10-25" },
    { nombre: "Curso de inglés avanzado", fechaInicio: "2023-11-01", fechaFinal: "2023-12-23" },
    { nombre: "Curso de matemáticas", fechaInicio: "2023-01-10", fechaFinal: "2023-02-28" },
    { nombre: "Curso de historia", fechaInicio: "2023-03-15", fechaFinal: "2023-04-30" },
    { nombre: "Curso de programación", fechaInicio: "2023-05-10", fechaFinal: "2023-06-30" },
    { nombre: "Curso de arte", fechaInicio: "2023-07-01", fechaFinal: "2023-08-31" },
  ];

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
    "#FFFF99",
    "#98FB98",
    "#87CEEB",
    "#FFB6C1",
    "#E6E6FA",
    "#FFDAB9",
    "#40E0D0",
    "#32CD32",
    "#E6E6FA",
    "#FFD700",
    "#00CED1",
    "#FFB6C1",
    "#FFFF99",
    "#87CEEB",
    "#F5F5DC",
    "#E6E6FA",
    "#98FB98",
    "#FF6B6B",
    "#D3D3D3",
    "#93C572",
  ];

  const getRandomColor = () => {
    return colores[Math.floor(Math.random() * colores.length)];
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-3">Proyección de cursos en el año</h1>
      <div className="mx-auto w-11/12 relative border-1 shadow-md p-4 rounded-2xl">
        <div className="flex justify-between mb-2">
          {months.map((month) => (
            <div key={month.name} className="text-center w-1/12 border-1 overflow-hidden px-1">
              {month.name}
            </div>
          ))}
        </div>
        <div className="relative border-1 overflow-hidden">
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
    </>
  );
};

export default DocenteCursos;
