import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import DataTablePanel from "../Common/DataTablePanel";
import {
  dashboardTableCustomStyles,
  ensureDashboardTableTheme,
} from "../Common/dashboardTableTheme";
import "./TipoLavado.css";

ensureDashboardTableTheme();

export default function TiposDeLavado() {
  const [dataTipoLavado, setDataTipoLavado] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = {
          lista: [
            { idService: 1, serviceName: "Lavado Exterior", cantidadTotal: 4 },
            { idService: 2, serviceName: "Limpieza Interior", cantidadTotal: 2 },
            { idService: 3, serviceName: "Encerado", cantidadTotal: 3 },
            { idService: 4, serviceName: "Lavado Ligero", cantidadTotal: 2 },
          ],
        };

        const listaTransformada = data.lista.map((item) => ({
          idTipoLavado: item.idService,
          nombre: item.serviceName,
          cantidadTotal: item.cantidadTotal,
        }));

        setDataTipoLavado(listaTransformada);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.idTipoLavado,
        sortable: true,
      },
      {
        name: "Tipo de Lavado",
        selector: (row) => row.nombre,
        sortable: true,
      },
      {
        name: "Cantidad Total",
        selector: (row) => row.cantidadTotal,
        sortable: true,
      },
    ],
    []
  );

  const totalServicios = useMemo(
    () =>
      dataTipoLavado.reduce((accumulator, item) => accumulator + item.cantidadTotal, 0),
    [dataTipoLavado]
  );

  const servicioMasSolicitado = useMemo(() => {
    if (dataTipoLavado.length === 0) {
      return "Sin datos";
    }

    return [...dataTipoLavado].sort(
      (current, next) => next.cantidadTotal - current.cantidadTotal
    )[0].nombre;
  }, [dataTipoLavado]);

  if (loading) {
    return (
      <div className="alert alert-info mt-4" role="alert">
        Cargando estadisticas...
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 py-4">
      <div className="dashboard-home-grid">
        <div className="dashboard-home-kpi">
          <span className="dashboard-home-kpi__label">Servicios registrados</span>
          <strong className="dashboard-home-kpi__value">{dataTipoLavado.length}</strong>
        </div>

        <div className="dashboard-home-kpi">
          <span className="dashboard-home-kpi__label">Total de lavados</span>
          <strong className="dashboard-home-kpi__value">{totalServicios}</strong>
        </div>

        <div className="dashboard-home-kpi dashboard-home-kpi--wide">
          <span className="dashboard-home-kpi__label">Mas solicitado</span>
          <strong className="dashboard-home-kpi__value">
            {servicioMasSolicitado}
          </strong>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-7">
          <DataTablePanel
            title="Tipos de Lavado"
            subtitle="Resumen operativo de servicios mas utilizados."
          >
            <div className="dashboard-table-panel__table-shell">
              <DataTable
                columns={columns}
                data={dataTipoLavado}
                pagination
                highlightOnHover
                striped
                theme="dashboard"
                customStyles={dashboardTableCustomStyles}
                noDataComponent={
                  <div className="dashboard-table-empty">
                    No hay datos disponibles.
                  </div>
                }
              />
            </div>
          </DataTablePanel>
        </div>

        <div className="col-12 col-xl-5">
          <section className="dashboard-table-panel dashboard-chart-panel">
            <div className="dashboard-table-panel__header">
              <div>
                <span className="dashboard-table-panel__eyebrow">Tendencia</span>
                <h2 className="dashboard-table-panel__title">Demanda por servicio</h2>
                <p className="dashboard-table-panel__subtitle">
                  Visualiza rapidamente la distribucion actual de lavados.
                </p>
              </div>
            </div>

            <div className="dashboard-table-panel__body">
              <div className="dashboard-chart-shell">
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={dataTipoLavado}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(22, 50, 74, 0.12)" />
                    <XAxis dataKey="nombre" tick={{ fill: "#5f7689", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#5f7689", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "1px solid rgba(22, 50, 74, 0.1)",
                        boxShadow: "0 18px 32px rgba(20, 44, 67, 0.12)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cantidadTotal"
                      stroke="#0d6efd"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#1aa7a1" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
