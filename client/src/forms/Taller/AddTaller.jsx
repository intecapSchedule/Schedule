import React, { useEffect, useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const AddTaller = () => {
  //useState para todas las variables de ingreso
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre del taller o laboratorio"
          isRequired
          placeholder="Ingrese el nombre el nombre del taller o laboratorio"
          value={nombre}
          onValueChange={setNombre}
        />
        <Input
          type="text"
          label="Ingrese la ubicación del salón"
          placeholder="Ingrese el salón"
          value={ubicacion}
          onValueChange={setUbicacion}
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

export default AddTaller;
