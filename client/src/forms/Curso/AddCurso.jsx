import React, { useEffect, useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const AddCurso = () => {
  //useState para todas las variables de ingreso
  const [nombre, setNombre] = useState("");
  const [horario, setHorario] = useState("");
  const [capacidad, setCapacidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");

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
          type="text"
          label="Horario"
          placeholder="Ingrese el Horario"
          value={horario}
          onValueChange={setHorario}
        />
        <Input
          type="number"
          label="Capacidad"
          placeholder="Ingrese la capacidad de estudiantes"
          value={capacidad}
          onValueChange={setCapacidad}
        />

        <Textarea
          type="text"
          placeholder="Ingrese alguna observación"
          label="Observaciones"
          value={observaciones}
          onValueChange={setObservaciones}
        ></Textarea>
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5 text-white">
        Guardar
      </Button>
    </div>
  );
};

export default AddCurso;
