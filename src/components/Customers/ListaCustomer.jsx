import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useListaCustomerGet } from "../../Hooks/useListaCustomerGet";
import { usePermisosHabilitacion } from "../../Hooks/usePermisosHabilitacion";
import AccionesListaCustomer from "./AccionesListaCustomer";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

const Lista = ({ isAuthenticated }) => {
  const rolId = localStorage.getItem("rolId");
  const { data, err, loading } = useListaCustomerGet(isAuthenticated);

  const { habilitacionPermisos } = usePermisosHabilitacion(
    isAuthenticated,
    "ListaCustomer",
    rolId
  );

  const handleEditar = useCallback(() => {
    console.log("este es el boton de ver");
  }, []);

  const handleVer = useCallback(() => {
    console.log("este es el boton de ver");
  }, []);

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
        No tienes permiso para ver esta pagina.
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
    <div className="container-fluid px-0 py-4">
      <DataTablePanel
        title="Lista de Clientes"
        subtitle="Consulta y administra la cartera de clientes del sistema."
        action={
          habilitacionPermisos.Crear ? (
            <NavLink to="/CreateCustomer" className="dashboard-table-action">
              Crear Cliente
            </NavLink>
          ) : null
        }
      >
        <div className="dashboard-table-panel__table-shell">
          <DataTable
            columns={columnas}
            data={data}
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
};

export default Lista;

Lista.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
