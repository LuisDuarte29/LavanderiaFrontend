import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink, useNavigate } from "react-router-dom";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

function ListaRoles({ isAutenticated }) {
  const [dataRoles, setDataRoles] = useState([]);
  const navigate = useNavigate();
  const URL_GET_ROLES = "https://localhost:7184/api/Usuarios/GetRoleList";

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
      } catch (err) {
        console.error("Error de red al obtener roles:", err);
      }
    };

    fetchRoles();
  }, [isAutenticated]);

  const handleVer = (row) => {
    navigate(`/AsignarPermisosRoles/${row.roleId}/${row.roleName}`);
  };

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

  return (
    <div className="container-fluid px-0 py-4">
      <DataTablePanel
        title="Lista de Roles"
        subtitle="Gestiona roles y permisos para cada perfil del sistema."
        action={
          <NavLink className="dashboard-table-action" to="/CreateRol">
            Crear Rol
          </NavLink>
        }
      >
        <div className="dashboard-table-panel__table-shell">
          <DataTable
            columns={columns}
            data={dataRoles}
            pagination
            highlightOnHover
            striped
            theme="dashboard"
            customStyles={dashboardTableCustomStyles}
          />
        </div>
      </DataTablePanel>
    </div>
  );
}

export default ListaRoles;

ListaRoles.propTypes = {
  isAutenticated: PropTypes.bool,
};

ListaRoles.defaultProps = {
  isAutenticated: false,
};
