import DataTable, { createTheme } from "react-data-table-component";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { usePermisosHabilitacion } from "../../Hooks/usePermisosHabilitacion";
import AccionesListaPedidos from "../Pedidos/PedidosDetails/AccionesListaPedidos";
import DetallePedido from "../Pedidos/PedidosDetails/DetallePedido";
// Creamos el tema custom una vez
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

// Componente de fila expandible para ver servicios
const DetallePedidos = ({ data }) => {
  return <DetallePedido data={data}></DetallePedido>;
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
    const ListaPedidos = async () => {
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

        const data = await response.json();
        setData(data);
        console.log("Esta es la data del customer:", data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (isAuthenticated) {
      ListaPedidos();
    }
    return () => {
      // Limpiar el efecto para evitar fugas de memoria
      abort.abort();
    };
  }, [isAuthenticated]);

  const handleEditar = useCallback(
    (row) => {
      navigate(`/CreatePedidos/${row.appointmentId}`);
    },
    [navigate]
  );
  const handleVer = useCallback(() => {
    console.log("este es el boton de ver");
  }, []);

  const columnas = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.appointmentId,
        sortable: true,
      },
      {
        name: "Vehículo",
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
    [
      habilitacionPermisos.Actualizar,
      habilitacionPermisos.Eliminar,
      handleEditar,
      handleVer,
    ]
  );

  if (!isAuthenticated || habilitacionPermisos.Leer === false) {
    return (
      <div className="alert alert-danger" role="alert">
        No tienes permiso para ver esta página.
      </div>
    );
  }
  return (
    <div className="mt-5">
      <div className="card shadow-sm p-2 mt-5 col-md-10 mx-auto">
        <h2 className="mb-4">Lista de Pedidos</h2>
        <DataTable
          columns={columnas}
          data={data}
          pagination
          highlightOnHover
          striped
          theme="custom"
          expandableRows
          expandableRowsComponent={DetallePedidos}
        />
        {habilitacionPermisos.Crear ? (
          <button className="col-md-2 btn btn-primary">
            <NavLink className="nav-link" to="/CreatePedidos">
              Crear Pedido
            </NavLink>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ListadoPedidos;
