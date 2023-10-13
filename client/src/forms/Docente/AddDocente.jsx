import React, { useEffect, useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const AddDocente = () => {
  //useState para todas las variables de ingreso
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [DPI, setDPI] = useState("");
  const [observaciones, setObservaciones] = useState("");

  return (
    <div className="flex w-full flex-col">
      <Toaster />
      <div className="grid gap-6 mb-6 md:grid-cols-2 w-11/12 m-auto sm:w-3/5 ">
        <Input
          type="text"
          label="Nombre completo"
          isRequired
          placeholder="Ingrese el nombre completo"
          value={nombre}
          onValueChange={setNombre}
        />
        <Input
          type="text"
          label="Teléfono"
          placeholder="Ingrese el número de teléfono"
          value={telefono}
          onValueChange={setTelefono}
        />
        <Input type="text" label="DPI" placeholder="Ingrese el número de DPI" value={DPI} onValueChange={setDPI} />

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

export default AddDocente;
