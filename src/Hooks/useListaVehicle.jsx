import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useListaVehicle(isAuthenticated) {
      const [dataVehicle1, setDataVehicle] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const tokenRecibido = localStorage.getItem("token");

        const response = await fetch(
          "https://localhost:7184/api/PaginaBase/vehicle",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenRecibido}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ha ocurrido un error");
        }

        const data = await response.json();
        console.log("Esta es la data del vehicle bruto:", data);
        const dataVehicleBruto = data.map((item) => ({
          value: item.idVehicle,
          label: item.vehicleName,
        }));
        setDataVehicle(dataVehicleBruto);

        console.log("Esta es la data del vehicle:", dataVehicleBruto);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return { dataVehicle1 };
}

