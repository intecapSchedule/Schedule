import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const DocenteView = () => {
  return (
    <div className="flex w-11/12 flex-col mx-auto">
      <Tabs color="primary">
        <Tab key="photos" title="Lista de docentes">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Añadir Docente">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DocenteView;
