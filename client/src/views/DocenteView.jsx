import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ListaDocente from "../forms/Docente/ListaDocente";
import AddDocente from "../forms/Docente/AddDocente";

const DocenteView = () => {
  const data = [
    {
      fotoSrc: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      uuid: "UUID1",
      nombreCompleto: "Cristopher Paiz López",
      telefono: "43400044",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=b042581f4e29026024d",
      uuid: "UUID2",
      nombreCompleto: "Ana García",
      telefono: "55512345",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=c042581f4e29026024d",
      uuid: "UUID3",
      nombreCompleto: "Juan Pérez",
      telefono: "67898765",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=d042581f4e29026024d",
      uuid: "UUID4",
      nombreCompleto: "Laura Smith",
      telefono: "77745678",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=e042581f4e29026024d",
      uuid: "UUID5",
      nombreCompleto: "Pedro Rodríguez",
      telefono: "32109876",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=f042581f4e29026024d",
      uuid: "UUID6",
      nombreCompleto: "María González",
      telefono: "99933322",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=g042581f4e29026024d",
      uuid: "UUID7",
      nombreCompleto: "Carlos Fernández",
      telefono: "44488899",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=h042581f4e29026024d",
      uuid: "UUID8",
      nombreCompleto: "Isabel López",
      telefono: "55566677",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=i042581f4e29026024d",
      uuid: "UUID9",
      nombreCompleto: "Luis Martínez",
      telefono: "12345678",
    },
    {
      fotoSrc: "https://i.pravatar.cc/150?u=j042581f4e29026024d",
      uuid: "UUID10",
      nombreCompleto: "Elena Ramírez",
      telefono: "98765432",
    },
  ];
  return (
    <div className="flex w-11/12 flex-col mx-auto">
      <Tabs color="primary">
        <Tab key="photos" title="Lista de docentes">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                Listado de docentes
              </h2>
              <ListaDocente data={data} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Añadir Docente">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-3xl text-center font-extrabold  md:text-5xl lg:text-3xl dark:text-white">
                Añadir nuevo docente
              </h2>
              <AddDocente />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DocenteView;
