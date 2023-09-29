import React, { useEffect, useState } from "react";
import { Input, Button, CheckboxGroup, Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const AddTaller = () => {
  //useState para todas las variables de ingreso
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  const [imagenes, setImagenes] = useState([]);
  //////////////////////////////////////////////////////////////////////////////

  //código para subir a cloudinary
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Create an array to store the compressed images
    const compressedImages = [];

    for (const file of files) {
      // Compress the image using image-resize-compress library
      try {
        const compressedImage = await fromBlob(file, 80, "auto", 800, "webp"); // Comprimir la imagen con calidad 80 y formato webp
        compressedImages.push(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        // If there's an error in compression, add the original image
        compressedImages.push(file);
      }
    }

    // Set the compressed images to the state
    setImagenes([...imagenes, ...compressedImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...imagenes];
    newImages.splice(index, 1);
    setImagenes(newImages);
  };

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
      <p className="font-bold text-[18px] mx-auto mb-4">Ingrese fotografía:</p>
      <div className="flex items-center justify-center w-11/12 m-auto sm:w-3/5 mb-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Toca para subir</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="flex flex-wrap flex-row w-11/12 m-auto sm:w-3/5 mb-8 gap-2">
        {imagenes.map((file, index) => (
          <div key={index}>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Previsualización ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "2px",
                }}
              />
              <Button
                size="tiny"
                onClick={() => handleRemoveImage(index)}
                className="text-white bg-danger"
                style={{
                  marginTop: "5px",
                  width: "70px",
                  textAlign: "center",
                }}
              >
                X
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button color="success" className="w-11/12 m-auto sm:w-3/5 text-white">
        Guardar
      </Button>
    </div>
  );
};

export default AddTaller;
