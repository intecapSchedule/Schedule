import React, { useEffect, useState, useContext } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { contexto } from "../../context/ContextProvider";
import API_URL from "../../config";

const AddCurso = () => {
  //UseState de todos los campos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [dias, setDias] = useState([]);

  //Contexto para recargar la lista de cursos
  const { setCursos, cursos } = useContext(contexto);

  //para los select de talleres
  const [valueTaller, setValueTaller] = useState(new Set([]));
  const [talleres, setTalleres] = useState([]);
  const [tallerSeleccionado, setTallerSeleccionado] = useState("");

  //para los select de docentes
  const [valueDocente, setValueDocente] = useState(new Set([]));
  const [docentes, setDocentes] = useState([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState("");

  //validadores
  const [validado, setValidado] = useState(false);
  const [tallerValidado, setTallerValidado] = useState(true);
  const [docenteValidado, setDocenteValidado] = useState(true);

  //fetch para cargar los talleres
  const buscarTalleres = async () => {
    try {
      const response = await fetch(`${API_URL}/taller/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Error al obtener la lista de talleres");
        throw new Error("Error al filtrar los talleres", {});
      }

      const data = await response.json();
      setTalleres(data);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch para cargar los docentes
  const buscarDocentes = async () => {
    try {
      const response = await fetch(`${API_URL}/user/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Error al obtener la lista de Docentes");
        throw new Error("Error al filtrar los docentes", {});
      }

      const data = await response.json();
      setDocentes(data);
    } catch (error) {
      console.log(error);
    }
  };

  //UseEffect que dispara las funcinoes de fetch para los talleres y docentes existentes
  useEffect(() => {
    buscarTalleres();
    buscarDocentes();
  }, []);

  //Función final que manda a la base de datos los datos recolectados y validadados con anterioridad
  const handleSubmit = async (e) => {
    if (docenteValidado) {
      toast.error("Docente está deshabilitado hasta que ingrese los campos anteriores");
      return;
    }

    if (tallerValidado) {
      toast.error("Taller está deshabilitado hasta que ingrese los campos anteriores");
      return;
    }

    if (
      nombre === "" ||
      fechaInicio === "" ||
      fechaFinal === "" ||
      horarioInicio === "" ||
      horarioFinal === "" ||
      dias.length === 0
    ) {
      toast.error("Debe llenar todos los campos");
      return;
    }

    function calcularHorasIntermedias(horaInicial, horaFinal) {
      const horasIntermedias = [];

      // Expresión regular para validar el formato HH:MM
      const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (regexHora.test(horaInicial) && regexHora.test(horaFinal)) {
        // Crear objetos Date a partir de las cadenas de hora
        const horaActual = new Date(`2023-01-01T${horaInicial}`);
        const horaFin = new Date(`2023-01-01T${horaFinal}`);

        while (horaActual <= horaFin) {
          horasIntermedias.push(horaActual.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
          horaActual.setMinutes(horaActual.getMinutes() + 15);
        }
      } else {
        console.log("Formato de hora no válido");
      }

      return horasIntermedias;
    }
    const horas = calcularHorasIntermedias(horarioInicio, horarioFinal);

    const datos = {
      nombre,
      descripcion,
      fechaInicio,
      fechaFinal,
      horario: horas,
      taller: tallerSeleccionado.nombre,
      docente: docenteSeleccionado.nombre + " " + docenteSeleccionado.apellido,
      dias,
    };

    try {
      const response = await fetch(`${API_URL}/curso/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al añadir el curso", {});
      }

      const response2 = await fetch(`${API_URL}/user/update/${docenteSeleccionado._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cursos: datos }),
        credentials: "include",
      });

      if (!response2.ok) {
        throw new Error("Error al añadir el curso al docente", {});
      }

      await response.json();
      toast.success("Curso añadido correctamente");
      setCursos(!cursos);
      //resetear los valores de los inputs
      setNombre("");
      setDescripcion("");
      setFechaInicio("");
      setFechaFinal("");
      setHorarioInicio("");
      setHorarioFinal("");
      setDias([]);
      setValueTaller(new Set([]));
      setValueDocente(new Set([]));
      setTallerSeleccionado("");
      setDocenteSeleccionado("");
    } catch (error) {
      toast.error("Error al añadir el curso" + error);
    }
  };

  //UseEffect para validar que todos los campos estén llenos y así habilitar el Select de docentes
  useEffect(() => {
    if (horarioFinal && horarioInicio && fechaFinal && fechaInicio && dias.length > 0) {
      setDocenteValidado(false);
    } else {
      setDocenteValidado(true);
    }
  }, [fechaFinal, fechaInicio, horarioFinal, horarioInicio, dias]);

  //UseEffect que se habilita hasta que se haya seleccionado por lo menos algún docente
  useEffect(() => {
    if (docenteSeleccionado !== "") {
      setTallerValidado(false);
    } else {
      setTallerValidado(true);
    }
  }, [docenteSeleccionado]);

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre del curso"
          isRequired
          placeholder="Ingrese el nombre curso"
          value={nombre}
          onValueChange={setNombre}
        />
        <Input
          label="Descripción"
          placeholder="Ingrese una descripción"
          value={descripcion}
          onValueChange={setDescripcion}
        />
        <Input
          type="date"
          placeholder="Fecha Inicio"
          label="Fecha de inicio"
          isRequired
          value={fechaInicio}
          onValueChange={setFechaInicio}
        />
        <Input
          type="date"
          placeholder="Fecha finalización"
          label="Fecha de finalización"
          isRequired
          value={fechaFinal}
          onValueChange={setFechaFinal}
        />
      </div>
      <div className="flex flex-col w-11/12 sm:w-3/5 m-auto">
        <div className="w-full flex row gap-4 mb-4">
          <Input
            type="time"
            label="Horario empieza"
            placeholder="Horario empieza"
            isRequired
            value={horarioInicio}
            onValueChange={setHorarioInicio}
          />
          <Input
            type="time"
            label="Horario finaliza"
            placeholder="Horario finaliza"
            isRequired
            value={horarioFinal}
            onValueChange={setHorarioFinal}
          />
        </div>
        <CheckboxGroup label="Días" value={dias} onChange={setDias} className="text-xl font-bold">
          <div className="flex gap-2 flex-wrap mb-4 p-3 text-lg font-normal">
            <Checkbox value="Lunes">Lunes</Checkbox>
            <Checkbox value="Martes">Martes</Checkbox>
            <Checkbox value="Miércoles">Miércoles</Checkbox>
            <Checkbox value="Jueves">Jueves</Checkbox>
            <Checkbox value="Viernes">Viernes</Checkbox>
            <Checkbox value="Sábado">Sábado</Checkbox>
            <Checkbox value="Domingo">Domingo</Checkbox>
          </div>
        </CheckboxGroup>
        <div className="flex flex-row gap-4 mb-8">
          <Select
            label="Docente"
            variant="bordered"
            placeholder="Seleccione un docente"
            selectedKeys={valueDocente}
            isDisabled={docenteValidado}
            className="max-w-xs mx-auto"
            onSelectionChange={setValueDocente}
          >
            {docentes.length > 0 ? (
              docentes.map((docente) => (
                <SelectItem key={docente?._id} value={docente?.nombre} onPress={() => setDocenteSeleccionado(docente)}>
                  {docente?.nombre + " " + docente?.apellido}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="cargando" text="Cargando docentes..." disabled />
            )}
          </Select>
          <Select
            label="Taller"
            variant="bordered"
            placeholder="Seleccione un taller o laboratorio"
            selectedKeys={valueTaller}
            className="max-w-xs mx-auto"
            isDisabled={tallerValidado}
            onSelectionChange={setValueTaller}
          >
            {talleres.length > 0 ? (
              talleres.map((taller) => (
                <SelectItem key={taller?._id} value={taller?.nombre} onPress={() => setTallerSeleccionado(taller)}>
                  {taller?.nombre ?? ""}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="cargando" text="Cargando talleres..." disabled />
            )}
          </Select>
        </div>
      </div>
      <Button
        color="success"
        isDisabled={validado}
        onClick={handleSubmit}
        className="w-11/12 m-auto sm:w-3/5 text-white"
      >
        Guardar nuevo curso
      </Button>
    </div>
  );
};

export default AddCurso;
