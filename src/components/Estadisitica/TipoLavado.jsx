import React, { useState, useEffect,useMemo} from 'react';
import { data } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function TiposDeLavado() {
  const [dataTipoLavado, setDataTipoLavado] = useState([]); // importante: array por defecto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulo fetch; reemplaza con tu fetch real (fetch/axios)
    async function load() {
      try {
        // const resp = await fetch('/api/tiposlavado'); const data = await resp.json();
        // Ejemplo local:
        const data = {
          lista: [
            { idService: 1, serviceName: 'Lavado Exterior', cantidadTotal: 4 },
            { idService: 2, serviceName: 'Limpieza Interior', cantidadTotal: 2 },
            { idService: 3, serviceName: 'Encerado', cantidadTotal: 3 },
            { idService: 4, serviceName: 'LavadoLigero', cantidadTotal: 2 }
          ]
        };

        // Transformación: mapeo al formato que quiero en el frontend
        const listaTransformada = data.lista.map(t => ({
          idTipoLavado: t.idService,
          nombre: t.serviceName,
          cantidadTotal: t.cantidadTotal
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


    const chartData = Object.values(dataTipoLavado)
  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className='text-center mt-5'>Tipos de Lavado</h1>

      <div className='container mt-5'>
        <div className='card mx-auto mt-5'>
          <div className='card-header bg-primary text-white d-flex justify-content-center'>
            <h2 className='mb-0'>Estadísticas de Tipos de Lavado</h2>
          </div>
          <div className='card-body'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>ID Tipo de Lavado</th>
                  <th>Nombre</th>
                  <th>Cantidad Total</th>
                </tr>
              </thead>
              <tbody>
                {dataTipoLavado.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No hay datos</td>
                  </tr>
                ) : (
                  dataTipoLavado.map(item => (
                    <tr key={item.idTipoLavado}>
                      <td>{item.idTipoLavado}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cantidadTotal}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>



      <div style={{ width: '100%', height: 320, marginTop: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* dataKey en el eje X debe ser la propiedad que contiene el nombre */}
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            {/* dataKey en la Line debe ser la propiedad numérica */}
            <Line type="monotone" dataKey="cantidadTotal" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
