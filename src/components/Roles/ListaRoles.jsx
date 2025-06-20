import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
    navigate("/AsignarPermisosRoles/" + row.roleId);
  };

  return (
    <div className="card shadow-sm p-2 mt-5 col-md-6 mx-auto">
      <div className="mt-3">
        <h2 className="mb-4">Lista de Roles</h2>
        <DataTable
          columns={columns}
          data={dataRoles}
          pagination
          highlightOnHover
          striped
          theme="custom"
        />
      </div>
      <button className="col-md-3 btn btn-primary">
        <NavLink className="nav-link" to="/CreateRol">
          Crear Rol
        </NavLink>
      </button>
    </div>
  );
}

export default ListaRoles;
