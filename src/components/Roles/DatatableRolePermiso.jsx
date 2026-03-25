import DataTable from "react-data-table-component";
import { useContext } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

export function DatatableRolePermiso() {
  const { rolesSelect } = useContext(ServicesContext);

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
  ];

  return (
    <div className="dashboard-table-panel__table-shell">
      <DataTable
        columns={column}
        data={rolesSelect}
        pagination
        highlightOnHover
        striped
        theme="dashboard"
        customStyles={dashboardTableCustomStyles}
        noDataComponent={
          <div className="dashboard-table-empty">No hay servicios asignados.</div>
        }
      />
    </div>
  );
}
