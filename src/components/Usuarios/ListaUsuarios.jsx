import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

function ListaUsuarios({ isAutenticated }) {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const URL_GET_USUARIOS = "https://localhost:7184/api/Usuarios/GetUsuarios";

  useEffect(() => {
    const listaUsuarios = async () => {
      const token = localStorage.getItem("token");
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
    };

    listaUsuarios();
  }, [isAutenticated]);

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
    <div className="container-fluid px-0 py-4">
      <DataTablePanel
        title="Lista de Usuarios"
        subtitle="Administra accesos, roles asignados y relacion con empleados."
        action={
          <NavLink to="/CreateUsuarios" className="dashboard-table-action">
            Crear Usuario
          </NavLink>
        }
      >
        <div className="dashboard-table-panel__table-shell">
          <DataTable
            columns={columns}
            data={dataUsuarios}
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

export default ListaUsuarios;

ListaUsuarios.propTypes = {
  isAutenticated: PropTypes.bool,
};

ListaUsuarios.defaultProps = {
  isAutenticated: false,
};
