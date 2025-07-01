import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { NavLink } from "react-router-dom";

function ListaUsuarios({ isAutenticated }) {
  const [dataUsuarios, setDataUsuarios] = useState();
  const URL_GET_USUARIOS = "https://localhost:7184/api/Usuarios/GetUsuarios";
  useEffect(() => {
    console.log("Se ejecuto el useefecct");
    const ListaUsuarios = async () => {
      const token = localStorage.getItem("token");
      console.log("Se ejecuto la constante");
      const response = await fetch(URL_GET_USUARIOS, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Ocurrio un error");
      }
      const data = await response.json();
      setDataUsuarios(data);
      console.log("Estos son los datos del usuario: " + dataUsuarios);
    };

    ListaUsuarios();
  }, [isAutenticated]);
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
  const columns = [
    {
      name: "ID",
      selector: (row) => row.idUsuario,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.roles,
      sortable: true,
    },
    {
      name: "Empleado",
      selector: (row) => row.customer,
      sortable: true,
    },
  ];

  return (
    <div className="card shadow-sm p-2 mt-5 col-md-10 mx-auto">
      <div className="mt-3">
        <h2 className="mb-4">Lista de Usuarios</h2>
        <DataTable
          columns={columns}
          data={dataUsuarios}
          pagination
          highlightOnHover
          striped
          theme="custom"
        />
      </div>
      <button className="col-md-2 btn btn-primary">
        <NavLink className="nav-link" to="/CreateUsuarios">
          Crear Usuario
        </NavLink>
      </button>
    </div>
  );
}

export default ListaUsuarios;
