import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useListaCustomerGet } from "../../Hooks/useListaCustomerGet";

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
  const { data, err, loading } = useListaCustomerGet(isAuthenticated); // Obtener los datos de la API

  if (!isAuthenticated) {
    return (
      <div className="alert alert-danger" role="alert">
        No tienes permiso para ver esta página. Por favor, inicia sesión.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        Cargando datos...
      </div>
    );
  }
  if (err != null) {
    return (
      <div className="alert alert-danger" role="alert">
        Ha ocurrido un error al cargar los datos: {err.message}
      </div>
    );
  }
  console.log("Este es el data de la lista: " + data);
  const columnas = [
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
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => handleVer(row)}
          >
            Ver
          </button>
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => handleEditar(row)}
          >
            Editar
          </button>
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  const handleEditar = () => {
    console.log("este es el boton de ver");
  };
  const handleVer = () => {
    console.log("este es el boton de ver");
  };

  return (
    <div className="card shadow-sm p-2 mt-5 col-md-10 mx-auto">
      <h2 className="mb-4">Lista de Clientes</h2>
      <DataTable
        columns={columnas}
        data={data}
        pagination
        highlightOnHover
        striped
        theme="custom"
      />
      <div>
        <button className="col-md-2 btn btn-primary">
          <NavLink className="nav-link" to="/CreateCustomer">
            Crear Cliente
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Lista;
