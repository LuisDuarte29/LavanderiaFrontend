import DataTable, { createTheme } from "react-data-table-component";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useListaCustomerGet } from "../../Hooks/useListaCustomerGet";
import { usePermisosHabilitacion } from "../../Hooks/usePermisosHabilitacion";
import { ServicesContext } from "../../context/ServicesContext";
import AccionesListaCustomer from "./AccionesListaCustomer";

// 1. Crear el tema personalizado FUERA del componente
createTheme("custom", {
  text: {
    primary: "#2c3e50",
    secondary: "#7f8c8d",
  },
  background: {
    default: "#f8f9fa",
  },
  context: {
    background: "#d6f3ff",
    text: "#2c3e50",
  },
  divider: {
    default: "#e0e0e0",
  },
  action: {
    button: "#3498db",
    hover: "#2980b9",
    disabled: "#bdc3c7",
  },
  highlight: {
    primary: "#e74c3c",
    secondary: "#2ecc71",
  },
});

const Lista = ({ isAuthenticated }) => {
  // Aquí se obtiene el estado de autenticación desde el componente padre
  // y se pasa como prop al hook useListaCustomerGet para que me devuelva los datos de la api y reutilizar el
  // componente en otros lugares si es necesario.

  const rolId = localStorage.getItem("rolId");
  const { data, err, loading } = useListaCustomerGet(isAuthenticated); // Obtener los datos de la API

  const { habilitacionPermisos } = usePermisosHabilitacion(
    isAuthenticated,
    "ListaCustomer",
    rolId
  );
  const handleEditar = useCallback((row) => {
    console.log("este es el boton de ver");
  }, []);
  const handleVer = useCallback((row) => {
    console.log("este es el boton de ver");
  }, []);
  console.log("Permisos habilitados dentro de lista: ", habilitacionPermisos);

  console.log("Este es el data de la lista: " + data);
  const columnas = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Nombre",
        selector: (row) => row.firstName,
        sortable: true,
      },
      {
        name: "Correo",
        selector: (row) => row.email,
      },
      {
        name: "Acciones",
        cell: (row) => (
          <AccionesListaCustomer
            row={row}
            habilitacionPermisos={habilitacionPermisos}
            handleEditar={handleEditar}
            handleVer={handleVer}
          />
        ),
      },
    ],
    [habilitacionPermisos, handleEditar, handleVer]
  );
  if (!isAuthenticated || !habilitacionPermisos.Leer) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        No tienes permiso para ver esta página.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="alert alert-info mt-5" role="alert">
        Cargando datos...
      </div>
    );
  }
  if (err != null) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        Ha ocurrido un error al cargar los datos: {err.message}
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <div className="card shadow-lg mt-5 col-md-10 mx-auto">
        {/* Cabecera */}
        <div className="card-header bg-primary text-white d-flex justify-content-center">
          <h2 className="mb-0">Lista de Clientes</h2>
        </div>

        {/* Wrapper gris con borde redondeado */}
        <div className="mt-3 border rounded p-3 bg-light">
          {/* Tarjeta blanca con sombra pequeña */}
          <div className="card shadow-sm mt-1">
            {/* DataTable envuelto directamente por la card */}
            <DataTable
              columns={columnas}
              data={data}
              pagination
              highlightOnHover
              striped
              theme="custom"
              // Alternativamente, podrías usar wrapperClasses en lugar de los <div> anteriores:
              // wrapperClasses="border rounded p-3 bg-light"
            />
          </div>
        </div>

        {/* Botón de crear cliente, solo si tiene permiso */}
        {habilitacionPermisos.Crear && (
          <div className="text-center mt-2 mb-1">
            <NavLink
              to="/CreateCustomer"
              className="btn btn-success btn-lg px-5 py-2"
            >
              <i className="bi bi-plus-lg me-2" />
              Crear Cliente
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lista;
