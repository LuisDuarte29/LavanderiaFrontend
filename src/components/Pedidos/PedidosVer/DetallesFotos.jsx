import React from 'react'
import { useState,useEffect } from 'react';

function DetallesFotos() {
    const [dataPedido, setDataPedido] = useState(null);


    useEffect(() => {
        const URL_PEDIDOS= "https://localhost:7184/api/Pedidos";
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
    <div>
        <h1>Detalles de Fotos</h1>
        {dataPedido ? (
            <ul>
                {dataPedido.map((pedido) => (
                    <li key={pedido.appointmentId}>
                        <h2>Pedido ID: {pedido.appointmentId}</h2>
                        <p>Fecha: {pedido.appointmentDate}</p>
                        <p>Vehiculo: {pedido.vehicle}</p>
                        <p>Empleado: {pedido.employee}</p>
                        <p>Comentario: {pedido.comments}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Cargando pedidos...</p>
        )}

/* Debo generar una seccion para alzar dos fotos de antes y depues uno a lado del otro
        <div>
            <h2>Foto Antes</h2>
            <img src="ruta/a/la/foto/antes.jpg" alt="Foto Antes" />

        </div>
        <div>
            <h2>Foto Después</h2>
            <img src="ruta/a/la/foto/despues.jpg" alt="Foto Después" />
        </div>
      
    </div>
  )
}

export default DetallesFotos
