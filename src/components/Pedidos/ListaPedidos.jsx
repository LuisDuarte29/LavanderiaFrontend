import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { usePermisosHabilitacion } from "../../Hooks/usePermisosHabilitacion";
import AccionesListaPedidos from "../Pedidos/PedidosDetails/AccionesListaPedidos";
import DetallePedido from "../Pedidos/PedidosDetails/DetallePedido";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

const DetallePedidos = ({ data }) => {
  return <DetallePedido data={data} />;
};

const ListadoPedidos = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const rolId = localStorage.getItem("rolId");

  const { habilitacionPermisos } = usePermisosHabilitacion(
    isAuthenticated,
    "ListaPedidos",
    rolId
  );

  useEffect(() => {
    const abort = new AbortController();

    const listaPedidos = async () => {
      try {
        const tokenRecibido = localStorage.getItem("token");

        const response = await fetch("https://localhost:7184/api/Pedidos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenRecibido}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Ha ocurrido un error");
        }

        const pedidos = await response.json();
        setData(pedidos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (isAuthenticated) {
      listaPedidos();
    }

    return () => {
      abort.abort();
    };
  }, [isAuthenticated]);

  const handleEditar = useCallback(
    (row) => {
      navigate(`/CreatePedidos/${row.appointmentId}`);
    },
    [navigate]
  );

  const handleVer = useCallback(
    (row) => {
      navigate(`/DetallesFotos/${row.appointmentId}`);
    },
    [navigate]
  );

  const columnas = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.appointmentId,
        sortable: true,
      },
      {
        name: "Vehiculo",
        selector: (row) => row.vehicle,
        sortable: true,
      },
      {
        name: "Empleado",
        selector: (row) => row.employee,
      },
      {
        name: "Comentarios",
        selector: (row) => row.comments,
      },
      {
        name: "Acciones",
        cell: (row) => (
          <AccionesListaPedidos
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

  if (!isAuthenticated || habilitacionPermisos.Leer === false) {
    return (
      <div className="alert alert-danger" role="alert">
        No tienes permiso para ver esta pagina.
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 py-4">
      <DataTablePanel
        title="Lista de Pedidos"
        subtitle="Visualiza pedidos, su detalle operativo y las acciones disponibles."
        action={
          habilitacionPermisos.Crear ? (
            <NavLink to="/CreatePedidos" className="dashboard-table-action">
              Crear Pedido
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
            expandableRows
            expandableRowsComponent={DetallePedidos}
          />
        </div>
      </DataTablePanel>
    </div>
  );
};

export default ListadoPedidos;

DetallePedidos.propTypes = {
  data: PropTypes.object.isRequired,
};

ListadoPedidos.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
