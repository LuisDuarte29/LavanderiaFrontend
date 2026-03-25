import { useState, useEffect, useContext, useMemo } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { Counter } from "../../Utils/Counter";
import { ServicesContext } from "../../context/ServicesContext";
import { AccionesArticulosFaltantes } from "./AccionesArticulosFaltantes";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";

ensureDashboardTableTheme();

function ArticulosFaltantes() {
  const { counts } = useContext(ServicesContext);
  const [articulos, setArticulos] = useState([]);
  const [articulosSeleccionados, setArticulosSeleccionados] = useState([]);
  const [precioJusto, setPrecioJusto] = useState([]);
  const [precioTotalCantidad, setPrecioTotalCantidad] = useState(0);

  const FECH_API_ARTICULOS = "https://localhost:7184/api/Service/Articulos";

  useEffect(() => {
    const tokenRecibido = localStorage.getItem("token");

    const fetchArticulos = async () => {
      try {
        const response = await fetch(FECH_API_ARTICULOS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenRecibido}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los articulos");
        }

        const data = await response.json();

        const dataArticulosSelect = data.map((item) => ({
          value: item.idArticulo,
          label: item.nombreArticulo,
          precio: item.precio,
        }));

        setArticulos(dataArticulosSelect);
      } catch (error) {
        console.error("Error al obtener los articulos:", error);
      }
    };

    if (tokenRecibido) {
      fetchArticulos();
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "IdArticulo",
        selector: (row) => row.value,
        sortable: true,
      },
      {
        name: "NombreArticulo",
        selector: (row) => row.label,
        sortable: true,
      },
      {
        name: "Cantidad",
        cell: (row) => <Counter id={row.value} />,
      },
      {
        name: "Precio Unitario",
        selector: (row) => row.precio,
        sortable: true,
      },
      {
        name: "PrecioTotal",
        selector: (row) => {
          const cantidad = counts[row.value] || 1;
          return row.precio * cantidad;
        },
        sortable: true,
      },
      {
        name: "Acciones",
        cell: (row) => (
          <AccionesArticulosFaltantes
            row={row}
            articulosSeleccionados={articulosSeleccionados}
            setArticulosSeleccionados={setArticulosSeleccionados}
          />
        ),
      },
    ],
    [counts, articulosSeleccionados]
  );

  useEffect(() => {
    const precios = articulosSeleccionados.map((row) => {
      const cantidad = counts[row.value] || 1;
      return row.precio * cantidad;
    });

    setPrecioJusto(precios);
  }, [articulosSeleccionados, counts]);

  useEffect(() => {
    setPrecioTotalCantidad(precioJusto.reduce((acc, item) => acc + item, 0));
  }, [precioJusto]);

  return (
    <div className="container-fluid px-0 py-4">
      <DataTablePanel
        title="Articulos Faltantes"
        subtitle="Selecciona articulos, ajusta cantidades y controla el total pendiente."
      >
        <div className="mb-4">
          <Select
            className="bg-white"
            options={articulos}
            value={articulosSeleccionados}
            onChange={(selectedOption) => setArticulosSeleccionados(selectedOption)}
            placeholder="Elige articulos para agregar"
            isSearchable
            isMulti
            noOptionsMessage={() => "No hay opciones"}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 54,
                borderRadius: 18,
                border: "1px solid rgba(22, 50, 74, 0.12)",
                boxShadow: "0 10px 24px rgba(20, 44, 67, 0.06)",
                backgroundColor: "rgba(255,255,255,0.88)",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: "#fff",
                opacity: 1,
                zIndex: 100,
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#eef6ff" : "#fff",
                color: "#16324a",
              }),
              multiValue: (base) => ({
                ...base,
                borderRadius: 12,
                backgroundColor: "rgba(13, 110, 253, 0.08)",
              }),
            }}
          />
        </div>

        <div className="dashboard-table-panel__table-shell">
          <DataTable
            columns={columns}
            data={articulosSeleccionados}
            pagination
            highlightOnHover
            striped
            theme="dashboard"
            customStyles={dashboardTableCustomStyles}
            noDataComponent={
              <div className="dashboard-table-empty">
                No hay articulos seleccionados todavia.
              </div>
            }
          />
        </div>

        <div className="dashboard-table-panel__footer">
          <div className="dashboard-table-panel__summary">
            <strong>{articulosSeleccionados.length}</strong> articulos en seguimiento
          </div>
          <div className="dashboard-table-panel__summary">
            <strong>Precio Total:</strong> {precioTotalCantidad} GS.
          </div>
        </div>
      </DataTablePanel>
    </div>
  );
}

export default ArticulosFaltantes;
