import { set } from 'date-fns';
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//Esto hook se encarga de obtener la lista de clientes desde la API como un custom hook puede ser reutilizado en otros componentes
export function useListaCustomerGet(isAuthenticated) {

const [data, setData] = useState([]); // Datos a obtener de la API
const [err, setError] = useState(null); // Manejo de errores
const [loading, setLoading] = useState(false); // Estado de carga
  useEffect(() => {
    console.log("useListaCustomerGet ejecutado: ", isAuthenticated);
  const fechData = () => {
    const tokenRecibido = localStorage.getItem("token");
    console.log(tokenRecibido);
   fetch("https://localhost:7184/api/Customer", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenRecibido}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ha ocurrido un error");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log("Este es la data del customer: " + data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setError(error);
      }).finally(() => {
        setLoading(false); // Cambiar el estado de carga a falso una vez que se complete la solicitud
      });
  };
  if (isAuthenticated) {
    fechData();
  }
}, [isAuthenticated]); // Este efecto solo se ejecutará cuando cambie el estado de autenticación
return { data,err,loading}; // Retornar los datos obtenidos
}

