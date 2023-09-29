import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import comunidad from "/intecap.svg";

const Navibar = () => {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <RouterLink to={"/"} className="py-2 -mx-3 px-3 text-[16px]">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className="mr-2 dark:fill-white">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </RouterLink>
          <p className=" font-bold text-inherit text-left">
            <RouterLink to={"/home"} className="py-2 -mx-3 px-3 text-[16px]">
              INTECAP
            </RouterLink>
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-1 md:ml-6" justify="center">
        <NavbarItem isActive>
          <Button className="bg-transparent hover:bg-primary-100">
            <RouterLink to={"/docentes"} className="py-2 -mx-3 px-3 flex gap-1">
              Docentes
            </RouterLink>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-transparent hover:bg-success-100" variant="flat">
            <RouterLink to={"/cursos"} className="py-2 -mx-3 px-3 flex gap-1">
              Cursos
            </RouterLink>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-transparent hover:bg-warning-100">
            <RouterLink to={"/talleres"} className="py-2 -mx-3 px-3 flex gap-1">
              Talleres
            </RouterLink>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button className="bg-red-600 text-white hover:bg-red-800">
            <RouterLink to={"/"} className="py-2 -mx-3 px-3 flex gap-1">
              Cerrar sesión
            </RouterLink>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <Dropdown placement="bottom-end" className="sm:hidden">
        <DropdownTrigger className="sm:hidden">
          <Avatar as="button" className="transition-transform sm:hidden bg-transparent" size="md" alt="usuario" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Menu Actions" variant="flat">
          <DropdownItem key="comunidad">
            <Link to={"/home"} className="pr-28 pl-3 flex gap-2">
              INTECAP
            </Link>
          </DropdownItem>
          <DropdownItem key="farmacia">
            <Link to={"/docentes"} className="pr-28 pl-3 flex gap-2">
              Docentes
            </Link>
          </DropdownItem>
          <DropdownItem key="social">
            <Link to={"/cursos"} className="pr-28 pl-3 flex gap-2">
              Cursos
            </Link>
          </DropdownItem>
          <DropdownItem key="usuarios">
            <Link to={"/talleres"} className="pr-28 pl-3 flex gap-2">
              Talleres
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" className="text-danger" color="danger">
            <Link to={"/"} className="pr-28 pl-3">
              Cerrar Sesión
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default Navibar;
