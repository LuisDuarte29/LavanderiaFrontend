import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

function ListaRoles({ isAutenticated }) {
  const [dataRoles, setDataRoles] = useState([]);
  const URL_GET_ROLES = "https://localhost:7184/api/Usuarios/GetRoleList"; // Ajusta la ruta a tu endpoint real

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(URL_GET_ROLES, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("Error al obtener roles");
          return;
        }
        const data = await response.json();
        setDataRoles(data);
        console.log("Estos son los roles obtenidos:", data);
      } catch (err) {
        console.error("Error de red al obtener roles:", err);
      }
    };

    fetchRoles();
  }, [isAutenticated]);

  // Define tu tema personalizado (igual que antes)
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

  // Columnas para RolId y RolName
  const columns = [
    {
      name: "RoleId",
      selector: (row) => row.roleId,
      sortable: true,
    },
    {
      name: "RolName",
      selector: (row) => row.roleName,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => handleVer(row)}
          >
            Editar
          </button>
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  const handleVer = (row) => {
    navigate("/AsignarPermisosRoles/" + row.roleId + "/" + row.roleName);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg mt-5">
        <div className="card-header bg-primary text-white d-flex justify-content-center">
          <h2 className="text-center mb-0">Lista de Roles</h2>
        </div>
        <div className="card-body">
          <div className="mt-3 border rounded p-3 bg-light">
            <div className="card shadow-sm mt-1">
              <DataTable
                columns={columns}
                data={dataRoles}
                pagination
                highlightOnHover
                striped
                theme="custom"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center text-center mt-3">
            <button className="btn btn-success btn-lg px-5 py-2 ">
              <NavLink className="nav-link" to="/CreateRol">
                Crear Rol
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaRoles;
