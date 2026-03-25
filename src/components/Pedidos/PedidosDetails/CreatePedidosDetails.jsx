import DataTable from "react-data-table-component";
import { useContext } from "react";
import { ServicesContext } from "../../../context/ServicesContext";
import { PrecioTotalPedidos } from "../PedidosDetails/PrecioTotalPedidos";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../../Common/dashboardTableTheme";

ensureDashboardTableTheme();

export function CreatePedidosDetails() {
  const { formData, setFormData } = useContext(ServicesContext);

  const column = [
    {
      name: "ServiceId",
      selector: (row) => row.value,
      sortable: true,
    },
    {
      name: "ServiceName",
      selector: (row) => row.label,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.priceItem,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-primary me-1"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                Services: formData.Services.filter(
                  (item) => item.value !== row.value
                ),
              }))
            }
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-table-panel__table-shell">
      <DataTable
        columns={column}
        data={formData.Services}
        pagination
        highlightOnHover
        striped
        theme="dashboard"
        customStyles={dashboardTableCustomStyles}
        noDataComponent={
          <div className="dashboard-table-empty">
            No hay servicios agregados al pedido.
          </div>
        }
      />
      <div>
        <PrecioTotalPedidos />
      </div>
    </div>
  );
}
