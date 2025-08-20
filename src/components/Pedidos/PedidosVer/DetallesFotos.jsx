import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
function DetallesFotos() {
    const [dataPedido, setDataPedido] = useState(null);
    const { appointmentId } = useParams();

    useEffect(() => {
        const URL_PEDIDOS= `https://localhost:7184/api/Appointment/${appointmentId}`;
        const fetchData = async () => {
            const token =localStorage.getItem("token");
            const response = await fetch(URL_PEDIDOS, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.error("Error al obtener los pedidos");
                return;
            }
            const data = await response.json();
            setDataPedido(data);
            console.log("Datos de pedidos obtenidos:", data);
        }   
        fetchData();
    }, []);



  return (
    <div className="container mt-5">
        <div className="card mx-auto mt-5">
    <div className="card-header bg-primary text-white d-flex justify-content-center">
          <h2 className="mb-0">Detalles del Pedido</h2>
        </div>
        <div className='card-body'>
            
 {dataPedido ? 
      (
        <div className=''>
       <h2>Pedido ID: {dataPedido.appointmentId}</h2>
       <div className='list-group d-flex flex-row mx-auto flex-wrap justify-content-around'>
 <ul className=''>
     <h4>Detalles</h4>
                { 
                   
                    <li key={dataPedido.appointmentId}>
                 
                        <p>Fecha: {dataPedido.appointmentDate}</p>
                        <p>Vehiculo: {dataPedido.vehicle}</p>
                        <p>Empleado: {dataPedido.employee}</p>
                        <p>Comentario: {dataPedido.comments}</p>
                    </li>
                }
      
            </ul>
            <ul>
                      <h4>Servicios</h4>
                       { 
                   
                   dataPedido.services && dataPedido.services.map((service) => (
                        <li key={service.serviceId}>
                            <p>{service.serviceName}</p>
                        </li>
                    ))
                }
            </ul>
       </div>
       
        </div>
    
            
        ) : (
            <p>Cargando pedidos...</p>
        )}

        <div>
            <h2>Foto Antes</h2>
            <img src="ruta/a/la/foto/antes.jpg" alt="Foto Antes" />

        </div>
        <div>
            <h2>Foto Después</h2>
            <img src="ruta/a/la/foto/despues.jpg" alt="Foto Después" />
        </div>
      
        </div>
       
        </div>
        
    </div>
  )
}

export default DetallesFotos
