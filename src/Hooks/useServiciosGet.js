import { useEffect,useState } from "react";
export function useServiciosGet(isAuthenticated) {

  const [dataServicio, setDataServicio] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRecibido = localStorage.getItem("token");

        const response = await fetch(
          "https://localhost:7184/api/PaginaBase/servicios",
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
        console.log("Esta es la data del Servicio bruto:", data);
        const dataServicioBruto = data.map((item) => ({
          value: item.serviceId,
          label: item.serviceName,
          priceItem: item.precio,
        }));
        setDataServicio(dataServicioBruto);

        console.log("Esta es la data del servicio:", dataServicioBruto);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [isAuthenticated]);
  return { dataServicio };
}